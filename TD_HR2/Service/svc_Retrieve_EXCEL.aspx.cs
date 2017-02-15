﻿//------------------------------------------
// svc_Data_Retrieve_EXCEL
//      : Select Data from DB -> Convert to EXCEL.
//		: Created by Professor.X, GoodWare (2011.05)
//------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections.Specialized;
using System.Web.Script.Serialization;

/// <summary>
/// svc_Data_Retrieve_EXCEL
///     : Data Retrieve from DB.
///     : Convert to EXCEL File.
///     : input
///         - QRY_ID : Select Query ID
///         - QRY_COLS : Ordered Columns
///         - OPTION : 추가 Option
///         - Arguments : Query Arguments
///     : output 
///         - success : Data + User Data (cProcessed)
///         - else : User Data (cProcessed)
/// </summary>
public partial class Service_svc_Retrieve_EXCEL : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        NameValueCollection lstParam = Request.QueryString;
        if (string.IsNullOrEmpty(lstParam["TITLE"])
            || string.IsNullOrEmpty(lstParam["QRY_ID"])
            //|| string.IsNullOrEmpty(lstParam["QRY_HDRS"])
            || string.IsNullOrEmpty(lstParam["QRY_COLS"])
            || string.IsNullOrEmpty(lstParam["OPTION"]))
        {
            Response.Write(
                new JavaScriptSerializer().Serialize(
                    new entityProcessed<string>(
                            codeProcessed.ERR_PARAM,
                            "잘못된 호출입니다.")
                    )
                );
            return;
        }

        int iDefault = 5;
        string strTitle = lstParam["TITLE"];
        string strQueryID = lstParam["QRY_ID"];
        string[] strHeader = HttpUtility.UrlDecode(lstParam["QRY_HDRS"].ToString()) == "" ? new string[] {} : HttpUtility.UrlDecode(lstParam["QRY_HDRS"].ToString()).Split(',');
        string[] strColumn = HttpUtility.UrlDecode(lstParam["QRY_COLS"].ToString()).Split(',');
        string strSQL = string.Empty;
        string strBody = string.Empty;

        SqlConnection objCon = null;
        SqlDataReader objDr = null;
        try
        {
            try
            {
                objCon = new SqlConnection(
                    ConfigurationManager.ConnectionStrings["PLMDB"].ConnectionString);
                objCon.Open();

                strSQL = string.Format(@"
                            SELECT
                                qry_sel AS QUERY_SELECT
                            FROM ZQUERY
                            WHERE qry_id = '{0}'",
                            strQueryID);
                SqlCommand objCmd = new SqlCommand(strSQL, objCon);
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

            if (lstParam.Count > iDefault)
            {
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
                                strQueryID
                                );
                    SqlCommand objCmd = new SqlCommand(strSQL, objCon);
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
                                "Query Parameter 조회에 실패하였습니다.\n- " + ex.Message)
                            )
                        );
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        new JavaScriptSerializer().Serialize(
                            new entityProcessed<string>(
                                codeProcessed.ERR_PROCESS,
                                "Query Parameter 조회에 실패하였습니다.\n- " + ex.Message)
                            )
                        );
                }

                try
                {
                    for (int iAry = iDefault; iAry < lstParam.Count; iAry++)
                    {
                        string strKey = lstParam.Keys[iAry].ToString();
                        cDBArgument objArg = (cDBArgument)tblSelect[strKey];
                        if (objArg == null)
                        {
                            continue;
                            //throw new Exception(
                            //    "관련 Argument를 찾을 수 없습니다.");
                        }
                        else
                            strBody = objArg.convertWhere(
                                                strBody,
                                                strQueryID,
                                                strKey,
                                                HttpUtility.UrlDecode(lstParam[iAry])
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
            }

            try
            {
                SqlCommand objCmd = new SqlCommand(strBody, objCon);
                objDr = objCmd.ExecuteReader(CommandBehavior.CloseConnection);
                StringBuilder strExcel = new StringBuilder(string.Empty);

                int iData = 0;
                if (objDr.HasRows)
                {
                    strExcel.Append("<STYLE> TD { mso-number-format:\\@; } </STYLE>");
                    strExcel.Append("<TABLE border=\"1\">\n");
                    if (strHeader.Length > 0)
                    {
                        strExcel.Append("<TR>\n");
                        for (int iAry = 0; iAry < strHeader.Length; iAry++)
                        {
                            strExcel.Append("<TD>" + strHeader[iAry] + "</TD>\n");
                        }
                        strExcel.Append("</TR>\n");
                    }
                    while (objDr.Read())
                    {
                        strExcel.Append("<TR>\n");
                        for (int iAry = 0; iAry < strColumn.Length; iAry++)
                        {
                            try
                            {
                                iData = objDr.GetOrdinal(strColumn[iAry]);
                                strExcel.Append(
                                    "<TD>" + objDr[iData].ToString() + "</TD>\n"
                                );
                            }
                            catch (Exception)
                            {
                                strExcel.Append("</TR>\n");
                            }
                        }
                        strExcel.Append("</TR>\n");
                    }
                    strExcel.Append("</TABLE>");

                    Response.Clear();
                    Response.AddHeader("content-disposition", "attachment; filename=" + Server.UrlEncode(strTitle.Replace(" ", "")) + ".xls");
                    Response.ContentType = "application/vnd.ms-excel";
                    //Response.Charset = "euc-kr";
                    //Response.ContentEncoding = Encoding.UTF8;
                    Response.ContentEncoding = Encoding.GetEncoding(949);
                    Response.Write(strExcel.ToString());
                    Response.Flush();
                    Response.Close();
                    Response.End();
                }
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
                            "Data 조회에 실패하였습니다.\n- " + ex.Message)
                        )
                    );
            }
        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
        }
        finally
        {
            if (objDr != null)
                objDr.Close();
            if (objCon != null)
                objCon.Close();
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//