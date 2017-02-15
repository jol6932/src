﻿using System;
using System.Collections.Generic;
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
using Microsoft.Office.Core;
using Excel = Microsoft.Office.Interop.Excel;
using System.Reflection;
using Microsoft.Reporting.WebForms;

public partial class Job_SRM_4110 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    
    #region Print() : DB의 Data를 통해 출력물 Create.

    /// <summary>
    /// Print() : DB의 Data를 통해 출력물 Create.
    ///     : input
    ///         - DATA : Query and Argument / Option
    ///     : output 
    ///         - success : 출력물 파일 정보
    ///         - else : entityProcessed (string)
    /// </summary>
    [WebMethod]
    public static string Print(cRetrieveData DATA)
    {
        #region check Argument.

        // check Argument.
        //
        if (string.IsNullOrEmpty(DATA.getQuery()))
        {
            return new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                                codeProcessed.ERR_PARAM,
                                "잘못된 호출입니다.")
                    );  
        }

        #endregion

        string strReturn = string.Empty;

        SqlConnection objCon = null;
        SqlCommand objCmd = null;
        SqlDataReader objDr = null;
        Excel.Application objExcel = null;
        try
        {
            #region connect to DB.

            //  connect to DB.
            //
            try
            {
                objCon = new SqlConnection(
                                    ConfigurationManager.ConnectionStrings["PLMDB"].ConnectionString);
                objCon.Open();
            }
            catch (SqlException ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_SQL,
                            "Database에 연결할 수 없습니다.\n- " + ex.Message)
                        )
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_PROCESS,
                            "Database 연결 중에 오류가 발생하였습니다.\n- " + ex.Message)
                        )
                    );
            }

            #endregion

            #region get Query from DB.

            string strSQL = string.Empty;
            string strBody = string.Empty;

            try
            {
                strSQL = string.Format(@"
                            SELECT qry_sel AS QUERY_SELECT
                            FROM ZQUERY
                            WHERE qry_id = '{0}'",
                            DATA.getQuery());
                objCmd = new SqlCommand(strSQL, objCon);
                objDr = objCmd.ExecuteReader();
                
                if (objDr.Read())
                {
                    strBody = objDr["QUERY_SELECT"].ToString();
                    objDr.Close();
                }
                else
                {
                    throw new Exception(
                        "관련 Query를 찾을 수 없습니다.");
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_SQL,
                            "Query 조회에 실패하였습니다.\n- " + ex.Message)
                        )
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_PROCESS,
                            "Query 조회에 실패하였습니다.\n- " + ex.Message)
                        )
                    );
            }

            #endregion

            #region create Query.

            if (DATA.getArgument().getSize() > 0)
            {
                #region get Argument from DB.

                Hashtable tblSelect = new Hashtable();
                try
                {
                    strSQL = string.Format(@"
                                SELECT
                                    arg_id AS ARG_ID,
                                    arg_tp AS ARG_TYPE,
                                    arg_qry AS ARG_QUERY
                                FROM ZQUERY_ARG
                                WHERE qry_id = '{0}'",
                                DATA.getQuery()
                                );
                    objCmd.CommandText = strSQL;
                    objDr = objCmd.ExecuteReader();

                    while (objDr.Read())
                    {
                        tblSelect.Add(
                            objDr["ARG_ID"].ToString(),
                            new cDBArgument(
                                objDr["ARG_TYPE"].ToString(),
                                objDr["ARG_QUERY"].ToString())
                            );
                    }
                    objDr.Close();
                }
                catch (SqlException ex)
                {
                    throw new Exception(
                        new JavaScriptSerializer().Serialize(
                            new entityProcessed<string>(
                                codeProcessed.ERR_SQL,
                                "Query Argument 조회에 실패하였습니다.\n- " + ex.Message)
                            )
                        );
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        new JavaScriptSerializer().Serialize(
                            new entityProcessed<string>(
                                codeProcessed.ERR_PROCESS,
                                "Query Argument 조회에 실패하였습니다.\n- " + ex.Message)
                            )
                        );
                }

                #endregion

                #region bind Argument to Query.

                try
                {
                    for (int iAry = 0; iAry < DATA.getArgument().getSize(); iAry++)
                    {
                        string strArg = DATA.ARGUMENT.NAME[iAry];
                        cDBArgument objArg = (cDBArgument)tblSelect[strArg];
                        if (objArg == null)
                        {
                            throw new Exception(
                                strArg + " - 관련 Argument를 찾을 수 없습니다.");
                        }
                        strBody = objArg.convertWhere(
                                            strBody,
                                            DATA.getQuery(),
                                            strArg,
                                            HttpUtility.UrlDecode(DATA.ARGUMENT.VALUE[iAry])
                                        );
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        new JavaScriptSerializer().Serialize(
                            new entityProcessed<string>(
                                    codeProcessed.ERR_PROCESS,
                                    "Query 생성에 실패하였습니다.\n- " + ex.Message)
                            )
                        );
                }

                #endregion
            }

            #endregion

            #region prepare Office object.

            string strPrint = DATA.getOption("PRINT");
            string strPage = DATA.getOption("PAGE");
            string strUser = DATA.getOption("USER");
            string strKey = DATA.getOption("KEY");
            string strTitle = DATA.getOption("TITLE");
            string strRows = DATA.getOption("ROWS");
            string sToday = DateTime.Now.ToString("yyyyMMdd");

            string sFileIdSrc = (strTitle == "납품서") ? "DeliveryS" : "ItemLabelA";
            string sFileIdTrg = sFileIdSrc + "_" + strUser + "_" + strKey;
            string sFileNmTrg = sToday + "/" + sFileIdTrg + "." + strPrint;
            string strRoot = HttpContext.Current.Server.MapPath("~/");
            string strSource = strRoot + "Report/" + strPage + "/" + sFileIdSrc + ".xls";
            if (!System.IO.Directory.Exists(strRoot + "Report/" + strPage + "/" + sToday)) System.IO.Directory.CreateDirectory(strRoot + "Report/" + strPage + "/" + sToday);
            string strTarget = strRoot + "Report/" + strPage + "/" + sToday + "/" + sFileIdTrg;
            object objMissing = Type.Missing;
            object varMissing = System.Reflection.Missing.Value;

            Excel._Workbook objWorkBook;
            Excel._Worksheet objWorkSheet, objWorkSheet2;
            Excel.Range objRange;
            Excel.XlFixedFormatType enTarget = Excel.XlFixedFormatType.xlTypePDF;
            Excel.XlFixedFormatQuality enQuality = Excel.XlFixedFormatQuality.xlQualityStandard;
            Excel.XlFileFormat enSource = Excel.XlFileFormat.xlExcel8;

            try
            {
                objExcel = new Excel.Application();
                objExcel.DisplayAlerts = false;
                objExcel.Visible = false;
                objExcel.DisplayAlerts = false;
                objExcel.Visible = false;
                objWorkBook = objExcel.Workbooks.Open(
                                strSource,
                                false,
                                true,
                                varMissing, varMissing, varMissing, varMissing, varMissing, varMissing, varMissing, varMissing, varMissing
                                , true, varMissing, varMissing);
                objWorkSheet = (Excel.Worksheet)objWorkBook.Sheets[1];
            }
            catch (Exception ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_PROCESS,
                            "Office 설정 중에 오류가 발생하였습니다.\n- " + ex.Message)
                        )
                    );
            }

            #endregion

            #region process Query & set to Print.

            try
            {
                objCmd.CommandText = strBody;
                objDr = objCmd.ExecuteReader();

                if (strTitle == "납품서")
                {
                    int iRow = 7; // refer to Proto file.
                    decimal fTotal = 0;
                    bool bHeader = true;

                    while (objDr.Read())
                    {
                        if (bHeader)
                        {
                            objWorkSheet.Cells[3, 8] = (objDr["barcode"].ToString()==""?"":"*" + objDr["barcode"].ToString() + "*");    // Barcode
                            //objWorkSheet.Cells[3, 8] = objDr["barcode"].ToString();    // Barcode
                            objWorkSheet.Cells[2, 4] = objDr["supp_nm"].ToString();
                            objWorkSheet.Cells[3, 4] = objDr["dlv_date"].ToString();
                            bHeader = false;
                        }

                        objWorkSheet.Cells[iRow, 2] = iRow - 6; //순번
                        objWorkSheet.Cells[iRow, 3] = objDr["item_cd"].ToString();
                        objWorkSheet.Cells[iRow, 5] = objDr["item_nm"].ToString();
                        objWorkSheet.Cells[iRow, 9] = objDr["item_spec"].ToString();
                        objWorkSheet.Cells[iRow, 13] = objDr["pur_no"].ToString();
                        objWorkSheet.Cells[iRow, 15] = objDr["proj_no"].ToString();
                        objWorkSheet.Cells[iRow, 17] = objDr["prc_cd"].ToString();
                        objWorkSheet.Cells[iRow, 19] = objDr["pur_unit"].ToString();
                        objWorkSheet.Cells[iRow, 20] = Convert.ToDecimal(objDr["pur_qty"]);
                        objWorkSheet.Cells[iRow, 21] = Convert.ToDecimal(objDr["dlv_qty"]);
                        objWorkSheet.Cells[iRow, 22] = objDr["req_date"].ToString();
                        objWorkSheet.Cells[iRow, 23] = objDr["consigned_yn"].ToString();
                        objRange = objWorkSheet.get_Range("C" + iRow.ToString(), "D" + iRow.ToString());
                        objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                        objRange = objWorkSheet.get_Range("E" + iRow.ToString(), "H" + iRow.ToString());
                        objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignLeft;
                        objRange = objWorkSheet.get_Range("I" + iRow.ToString(), "L" + iRow.ToString());
                        objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignLeft;
                        objRange = objWorkSheet.get_Range("M" + iRow.ToString(), "N" + iRow.ToString());
                        objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                        objRange = objWorkSheet.get_Range("O" + iRow.ToString(), "P" + iRow.ToString());
                        objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                        objRange = objWorkSheet.get_Range("Q" + iRow.ToString(), "R" + iRow.ToString());
                        objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;

                        objRange = objWorkSheet.get_Range("S" + iRow.ToString(), "U" + iRow.ToString());
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;

                        //objRange = objWorkSheet.get_Range("V" + iRow.ToString(), "W" + iRow.ToString());
                        //objRange.MergeCells = true;
                        objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                        objRange = objWorkSheet.get_Range("B" + iRow.ToString(), "W" + iRow.ToString());
                        cExcel.drawLine(objRange, 1);
                        fTotal += Convert.ToDecimal(objDr["dlv_qty"]);
                        iRow++;
                    }

                    objWorkSheet.Cells[iRow, 2] = "총 납품 - " + (iRow - 7).ToString() + " 건 ( 수량 : " + fTotal.ToString() + " )     ";
                    objRange = objWorkSheet.get_Range("B" + iRow.ToString(), "W" + iRow.ToString());
                    objRange.MergeCells = true;
                    objRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignRight;
                    cExcel.drawLine(objRange, 1);
                }
                else if (strTitle == "물품라벨")
                {
                    int iRow = 1;
                    int iCell = 0;
                    int iCount = 0;
                    int iCountAll = 0;
                    //                    int iCell = 3;
                    //                    int iCount = 1;
                    bool bRead = true;
                    objWorkSheet2 = (Excel.Worksheet)objWorkBook.Sheets[2];     //Barcode Template Sheet
                    objWorkSheet.VPageBreaks.Add(objWorkSheet.get_Range("R1", "R1"));

                    bRead = objDr.Read();
                    while (true)
                    {
                        if (bRead)
                        {
                            iCountAll++;
                            foreach (string strDlvSeq in strRows.Split(new char[] { ',' }))
                            {
                                if (strDlvSeq.Equals(objDr["dlv_seq"].ToString()))
                                {
                                    iCell += 5;
                                    iCount++;

                                    objWorkSheet2.Cells[2, iCell] = objDr["item_cd"].ToString();                    //품번
                                    objWorkSheet2.Cells[3, iCell] = objDr["item_nm"].ToString();                    //품목명
                                    objWorkSheet2.Cells[4, iCell] = objDr["item_spec"].ToString();                  //규격
                                    objWorkSheet2.Cells[5, iCell] = objDr["proj_no"].ToString() + (objDr["pallet_no"].ToString() == "" ? "" : " / " + objDr["pallet_no"].ToString());              //Tracking / Pallet No.
                                    objWorkSheet2.Cells[6, iCell] = objDr["dlv_qty"].ToString();                    //수량
                                    objWorkSheet2.Cells[6, iCell + 2] = objDr["dlv_date"].ToString();               //납품일자
                                    objWorkSheet2.Cells[7, iCell - 1] = "*" + objDr["barcoded"].ToString() + "*";   //바코드
                                    //objWorkSheet2.Cells[8, iCell - 1] = objDr["barcoded"].ToString();               //바코드번호
                                    //objWorkSheet2.Cells[8, iCell + 1] = objDr["supp_nm"].ToString();                //업체명
                                    objWorkSheet2.Cells[8, iCell - 1] = objDr["barcoded"].ToString() + " - " + objDr["supp_nm"].ToString();    //바코드번호 + 업체명
                                }
                            }
                        }
                        else
                        {
                            iCell += 5;
                            iCount++;
                        }
                        bRead = objDr.Read();

                        if (iCount % 3 == 0)
                        {
                            objWorkSheet2.get_Range("A2", "A8").EntireRow.Copy(objWorkSheet.get_Range(objWorkSheet.Cells[iRow, 1], objWorkSheet.Cells[iRow + 6, 1]).EntireRow);
                            if (!bRead) break;

                            if (iCountAll % 24 == 0)
                            {
                                iRow += 7;
                                objRange = objWorkSheet.get_Range(objWorkSheet.Cells[iRow, 1], objWorkSheet.Cells[iRow, 1]);
                                objWorkSheet.HPageBreaks.Add(objRange);
                            }
                            else
                            {
                                iRow += 8;
                            }

                            iCell = 0;
                            iCount = 0;

                            objWorkSheet2.Cells[2, iCell + 5] = "";
                            objWorkSheet2.Cells[3, iCell + 5] = "";
                            objWorkSheet2.Cells[4, iCell + 5] = "";
                            objWorkSheet2.Cells[5, iCell + 5] = "";
                            objWorkSheet2.Cells[6, iCell + 5] = "";
                            objWorkSheet2.Cells[6, iCell + 7] = "";
                            objWorkSheet2.Cells[7, iCell + 4] = "";
                            objWorkSheet2.Cells[8, iCell + 4] = "";

                            objWorkSheet2.Cells[2, iCell + 10] = "";
                            objWorkSheet2.Cells[3, iCell + 10] = "";
                            objWorkSheet2.Cells[4, iCell + 10] = "";
                            objWorkSheet2.Cells[5, iCell + 10] = "";
                            objWorkSheet2.Cells[6, iCell + 10] = "";
                            objWorkSheet2.Cells[6, iCell + 12] = "";
                            objWorkSheet2.Cells[7, iCell + 9] = "";
                            objWorkSheet2.Cells[8, iCell + 9] = "";

                            objWorkSheet2.Cells[2, iCell + 15] = "";
                            objWorkSheet2.Cells[3, iCell + 15] = "";
                            objWorkSheet2.Cells[4, iCell + 15] = "";
                            objWorkSheet2.Cells[5, iCell + 15] = "";
                            objWorkSheet2.Cells[6, iCell + 15] = "";
                            objWorkSheet2.Cells[6, iCell + 17] = "";
                            objWorkSheet2.Cells[7, iCell + 14] = "";
                            objWorkSheet2.Cells[8, iCell + 14] = "";
                        }
                    }
                }
                else
                {
                    DataSet dsBarcode = new DataSet1();
                    dsBarcode.Tables[0].Load(objDr);
                    objDr.Close();

                    ReportViewer rptBarcode = new ReportViewer();
                    rptBarcode.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("Report.rdlc");
                    //ReportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("Report.rdlc");

                    ReportDataSource rds = new ReportDataSource();
                    rds.Name = "DataSet1";
                    rds.Value = dsBarcode.Tables[0];
                    rptBarcode.LocalReport.DataSources.Add(rds);
                    rptBarcode.LocalReport.Refresh();

                    string strReportType = "PDF";   // Excel, PDF, Image
                    Warning[] warnings;
                    string[] streamids;
                    string mimeType;
                    string encoding;
                    string extension;

                    byte[] bytes = rptBarcode.LocalReport.Render(strReportType, null, out mimeType, out encoding, out extension, out streamids, out warnings);

                    //var context = HttpContext.Current;

                    //context.Response.Clear();
                    //context.Response.ClearContent();
                    //context.Response.ClearHeaders();
                    //context.Response.ContentType = mimeType;
                    //context.Response.AddHeader("Content-Disposition", "attachment");
                    //context.Response.BinaryWrite(bytes);
                    //context.Response.Flush();
                    //context.Response.End();

                    try
                    {
                        System.IO.FileStream fs = new System.IO.FileStream(strTarget + "." + extension, System.IO.FileMode.Create);
                        //if (System.IO.File.Exists(strTarget + "." + extension)) System.IO.File.Delete(strTarget + "." + extension);
                        fs.Write(bytes, 0, bytes.Length);
                        fs.Close();

                        strReturn = new JavaScriptSerializer().Serialize(
                                        new entityProcessed<string>(codeProcessed.SUCCESS, sFileNmTrg)
                                    );

                        return strReturn;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(
                            new JavaScriptSerializer().Serialize(
                                new entityProcessed<string>(
                                    codeProcessed.ERR_PROCESS,
                                    "Print 생성 중에 오류가 발생하였습니다.\n- " + ex.Message)
                                )
                            );
                    }
                }
                objDr.Close();
            }
            catch (SqlException ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_SQL,
                            "Data 조회에 실패하였습니다.\n- " + ex.Message)
                        )
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_PROCESS,
                            "Data 조회 중에 오류가 발생하였습니다.\n- " + ex.Message)
                        )
                    );
            }

            #endregion

            #region save to File.

            try
            {
                if (System.IO.File.Exists(strTarget)) System.IO.File.Delete(strTarget);
                objWorkSheet.SaveAs( strTarget, enSource, varMissing, varMissing, varMissing, varMissing, varMissing, varMissing, varMissing, varMissing);
                if (strPrint.ToUpper() != "XLS")
                {
                    if (System.IO.File.Exists(strTarget)) System.IO.File.Delete(strTarget);
                    if (System.IO.File.Exists(strTarget + "." + strPrint)) System.IO.File.Delete(strTarget + "." + strPrint);
                    objWorkSheet.ExportAsFixedFormat(enTarget, strTarget, enQuality, true, true, 1, 20, false, varMissing);
                }

                strReturn = new JavaScriptSerializer().Serialize(
                                new entityProcessed<string>( codeProcessed.SUCCESS, sFileNmTrg)
                            );
            }
            catch (Exception ex)
            {
                throw new Exception(
                    new JavaScriptSerializer().Serialize(
                        new entityProcessed<string>(
                            codeProcessed.ERR_PROCESS,
                            "Print 생성 중에 오류가 발생하였습니다.\n- " + ex.Message)
                        )
                    );
            }

            #endregion
        }
        catch (Exception ex)
        {
            #region abnormal Closing.

            // abnormal Closing.
            //
            strReturn = ex.Message;

            #endregion
        }
        finally
        {
            #region release.

            // release.
            //
            if (objDr != null) objDr.Close();
            if (objCon != null) objCon.Close();
            if (objExcel != null)
            {
                objExcel.Workbooks.Close();
                objExcel.Quit();
                if (objExcel != null)
                {
                    System.Diagnostics.Process[] pProcess;
                    pProcess = System.Diagnostics.Process.GetProcessesByName("Excel");
                    pProcess[0].Kill();
                }
            }

            #endregion
        }

        return strReturn;
    }

    #endregion

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

