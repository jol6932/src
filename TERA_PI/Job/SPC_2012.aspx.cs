﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Text;
using System.Collections;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Data.OleDb;

public partial class Job_SPC_2012 : System.Web.UI.Page
{
    string strData = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
    }
    protected void ctlUpload_FileUploadComplete(object sender, DevExpress.Web.FileUploadCompleteEventArgs e)
    {
        #region 1. Mapping Argument.

        // 1. Mapping Argument.
        //
        /*
        NameValueCollection lstParam = Request.QueryString;
        if (string.IsNullOrEmpty(lstParam["DATA_TYPE"]))
        {
            throw new Exception("처리할 데이터 종류를 확인할 수 없습니다.");
        }
        strData = lstParam["DATA_TYPE"].ToString();
        */
        strData = "SPC_QCRESULT";

        string strName = e.UploadedFile.FileName;
        string[] strFile = strName.Split('.');
        string strType = (strFile.Length > 1) ? strFile[strFile.Length - 1] : string.Empty;
        string strID = strData +
                        "-" + String.Format("{0:yyyyMMdd-HHmmss}", DateTime.Now);
        string strPath = Server.MapPath("~/Import/") + strID + "." + strType;

        #endregion

        #region 2. Save File.

        // 2. Save File.
        //
        try
        {
            e.UploadedFile.SaveAs(strPath);

            OleDbConnection oleCon = null;

            #region Open Excel & Get Environment.

            DataTable objSheet = new DataTable();
            // Open Excel & Get Environment.
            //
            try
            {
                #region Connect to OLE & Get Names of Sheets.

                // Connect to OLE.
                //
                string strProvider =
                    //"Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + strPath + "; Extended Properties=\"Excel 8.0; IMEX=1;\"";
                "Provider=Microsoft.ACE.OLEDB.12.0; Data Source=" + strPath + "; Extended Properties=Excel 12.0";
                oleCon = new OleDbConnection(strProvider);
                oleCon.Open();

                // Get Names of Sheets.
                //
                objSheet = oleCon.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                if (objSheet == null)
                    throw new Exception("Sheet 정보를 확인할 수 없습니다.");
                string strSheet = string.Empty;
                string strTable = string.Empty;
                for (int iAry = 0; iAry < objSheet.Rows.Count; iAry++)
                {
                    strTable = objSheet.Rows[iAry]["TABLE_NAME"].ToString().Trim('\'').Replace("$", "");
                    if (!strTable.Contains("Print") && !strTable.EndsWith("_"))
                        strSheet += (((iAry == 0) ? "" : ",") + strTable);
                }

                #endregion

                e.CallbackData = strID + "@" + strName + "@" + strType + "@" + strPath + "@" + strSheet;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                // release.
                //
                objSheet.Dispose();
                if (oleCon != null) oleCon.Close();
            }

            #endregion
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
        }

        #endregion
    }

    #region Import() : Import Excel Data

    /// <summary>
    /// Import() : Import Excel Data
    ///     : Get Excel Data and Save to Temporary DB
    ///     input : 
    ///         - DATA - Client Data (cSaveData)
    ///     output:
    ///         - success : Key List (cSavedData)
    ///         - else : entityProcessed (string)
    /// </summary>
    [WebMethod]
    public static string Import(cImportData DATA)
    {
        #region check Argument.

        // check Argument.
        //
        if (!DATA.validData())
        {
            return new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                                codeProcessed.ERR_PARAM,
                                "잘못된 호출입니다.")
                    );
        }

        #endregion

        string strReturn = string.Empty;

        #region Read Data from Excel & Save to Temporary DB.

        // Read Data from Excel
        //  & Save to Temporary DB.
        //
        try
        {
            OleDbConnection oleCon = null;
            OleDbDataReader oleDr = null;
            cUpdate objUpdate = new cUpdate();
            int iRow = 0, iNum = 1;
            try
            {
                #region Connect to OLE & Get Names of Sheets.

                // Connect to OLE.
                //
                string strProvider =
                //"Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + DATA.getPath() + "; Extended Properties=\"Excel 8.0; IMEX=1;\"";
                    "Provider=Microsoft.ACE.OLEDB.12.0; Data Source=" + DATA.getPath() + "; Extended Properties=Excel 12.0";
                oleCon = new OleDbConnection(strProvider);
                oleCon.Open();

                #endregion

                #region Connect to DB & Open Transaction.

                // Connect to DB & Open Transaction.
                //
                objUpdate.initialize(false);
                objUpdate.beginTran();

                #endregion

                #region Read Data from Excel & Save.

                // Read Data from Excel & Save.
                //
                    // select data from excel.
                string strSQL = "SELECT * FROM [" + DATA.getSheet() + "$]";
                OleDbCommand oleCmd = new OleDbCommand(strSQL, oleCon);
                oleDr = oleCmd.ExecuteReader(CommandBehavior.CloseConnection);
                if (!oleDr.HasRows)
                {
                    throw new Exception("Sheet에 읽을 데이터가 없습니다.");
                }

                    // delete existed data.
                string strQuery = string.Format(@" DELETE FROM SPC_QCRESULT_EXCEL WHERE FILE_ID = '{0}' AND SHEET_NM = '{1}'",
                    DATA.getKey(), DATA.getSheet());
                new cDBQuery(ruleQuery.INLINE, strQuery).executeQuery(objUpdate.objCmd, true);

                strQuery = string.Format(
                    @"DELETE FROM SPC_QCRESULT_D_EXCEL WHERE FILE_ID = '{0}' AND SHEET_NM = '{1}'",
                    DATA.getKey(), DATA.getSheet());
                new cDBQuery(ruleQuery.INLINE, strQuery) .executeQuery(objUpdate.objCmd, true);

                    // read and update data.
                string sColsM = "FILE_ID, SHEET_NM, INS_USR, INS_DT";
                string sColsD = "FILE_ID, SHEET_NM, seq, str01, str02, str03, str04, str05, str06, str07, str08, str09, str10";
                string sValsM = "'" + DATA.getKey() + "', '" + DATA.getSheet() + "'";
                int nColsDetail = 10;

                string strUser = DATA.getUser();
                string strDate = DateTime.Today.ToShortDateString();
                string[] sPrevData = new string[nColsDetail];
                for (int i = 0; i < sPrevData.Length; i++) sPrevData[i] = "";

                while (oleDr.Read())
                {
                    #region Save to Temporary DB.

                    // Save to Temporary DB.
                    if (iRow == 0)
                    {
                        sValsM = sValsM + ",'" + strUser + "'" + ",'" + strDate + "'";
                        strQuery = string.Format( "INSERT INTO dbo.SPC_QCRESULT_EXCEL ({0}) VALUES ({1})" , sColsM, sValsM);
                        new cDBQuery(ruleQuery.INLINE, strQuery).executeQuery(objUpdate.objCmd, false);
                    }
                    
                    if (!string.IsNullOrEmpty(oleDr[0].ToString().Trim()) && !string.IsNullOrEmpty(oleDr[8].ToString().Trim()))
                    {
                        string sValsD = "'" + DATA.getKey() + "', '" + DATA.getSheet() + "'";

                        // Value List 작성
                        sValsD += "," + iNum.ToString();    // Seq No.
                        for (int i = 0; i < nColsDetail; i++)
                        {
                            if (i >= oleDr.FieldCount) sValsD += ",''";
                            else if (i == 0) sValsD += ",'" + getDbString(oleDr[i], sPrevData[i]).Substring(0, 10) + "'";   //일자 데이터
                            else if (i == 8) 
                                sValsD += ",'" + string.Format("{0:#.000}", Convert.ToDouble(oleDr[i]) * Math.Pow(10,6)) + "'";   //일자 데이터
                            else sValsD += ",'" + getDbString(oleDr[i], sPrevData[i]) + "'";
                        }

                        strQuery = string.Format(
                                        "INSERT INTO dbo.SPC_QCRESULT_D_EXCEL ({0}) VALUES ({1})", sColsD, sValsD);
                        new cDBQuery(ruleQuery.INLINE, strQuery).executeQuery(objUpdate.objCmd, false);

                        // Backup Data
                        for (int i = 0; i < sPrevData.Length; i++)
                        {
                            if (!string.IsNullOrEmpty(oleDr[i].ToString().Trim())) sPrevData[i] = oleDr[i].ToString();
                        }

                        iNum++;
                    }

                    iRow++;
                    #endregion
                }

                objUpdate.close(doTransaction.COMMIT);
                strReturn = new JavaScriptSerializer().Serialize(
                                new entityProcessed<string>( codeProcessed.SUCCESS, "success")
                            );

                #endregion
            }
            catch (SqlException ex)
            {
                // abnormal Closing.
                //
                objUpdate.close(doTransaction.ROLLBACK);

                throw new Exception(
                        new JavaScriptSerializer().Serialize(
                            new entityProcessed<string>( codeProcessed.ERR_SQL,
                                "데이터 저장에 실패하였습니다. (" + iRow + 2 + "행)\n- " + ex.Message)
                            )
                        );
            }
            catch (Exception ex)
            {
                // abnormal Closing.
                //
                objUpdate.close(doTransaction.ROLLBACK);

                throw new Exception(
                        new JavaScriptSerializer().Serialize(
                            new entityProcessed<string>( codeProcessed.ERR_PROCESS,
                                "데이터 저장 중에 오류가 발생하였습니다.\n- " + ex.Message)
                            )
                        );
            }
            finally
            {
                // release.
                //
                if (oleDr != null) { oleDr.Close(); oleDr.Dispose(); }
                if (oleCon != null) oleCon.Close();
                objUpdate.release();
            }
        }
        catch (Exception ex)
        { strReturn = ex.Message; }
        finally
        { }

        #endregion

        return strReturn;
    }

    private static void getDbCodeByName(OleDbDataReader oleDr, cUpdate objUpdate)
    {
        // get code data.
        string strName = getDbString(oleDr[3]);
        string strCode = string.Empty;
        string sQuery = string.Format(@"
                                        SELECT CUST_CD FROM EM_CUST_INFO
                                        WHERE UPPER(REPLACE(CUST_NAME, ' ', '')) = UPPER(REPLACE('{0}', ' ', ''))",
            strName);
        objUpdate.objDr = (new cDBQuery(ruleQuery.INLINE, sQuery)).retrieveQuery(objUpdate.objCmd);
        if (objUpdate.objDr.Read()) strCode = objUpdate.objDr[0].ToString();
        objUpdate.objDr.Close();
    }

    private static string getDbString(object oleDrCol)
    {
        return oleDrCol.ToString().Trim().Replace("'", "''");
    }

    private static string getDbString(object oleDrCol, string sPrev)
    {
        string sRtn = string.Empty;

        if (string.IsNullOrEmpty(oleDrCol.ToString().Trim())) 
            sRtn = sPrev.Trim().Replace("'", "''");
        else 
            sRtn = oleDrCol.ToString().Trim().Replace("'", "''");

        return sRtn;
    }

    #endregion
}
