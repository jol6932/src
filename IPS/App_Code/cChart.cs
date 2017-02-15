﻿//----------------------------------------
// cChart
//      : Control Chart Object
//      : Created by Professor.X, GoodWare (2011.04)
//----------------------------------------

using DevExpress.XtraCharts;
using System;
using System.Collections;
using System.Collections.Specialized;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI.WebControls;

#region cChart : Control Chart Object

/// <summary>
/// cChart : Control Chart Object
/// </summary>
public class cChart
{

    public byte transparancy = 100;

    #region Constructor : Filed 초기화 및 설정.

    /// <summary>
    /// Constructor : Filed 초기화 및 설정.
    /// </summary>
	public cChart()   {}

    #endregion

    #region bindData() : Query를 Chart Object에 Binding.

    /// <summary>
    /// bindData() : Query를 Chart Object에 Binding.
    /// </summary>
    public void bindData(string strData, SqlDataSource objDB, DevExpress.XtraCharts.Web.WebChartControl objChart)
    {
        NameValueCollection lstParam = parseData(strData);
        setFormat(lstParam, objChart);
        objDB.SelectCommand = setQuery(lstParam);
        //objDB.SelectCommand = createQuery(strData);
        objChart.DataBind();
    }

    #endregion

    #region parseData() : parse Request Data.

    /// <summary>
    /// parseData() : parse Request Data.
    /// </summary>
    public NameValueCollection parseData(string strData)
    {
        NameValueCollection lstParam = new NameValueCollection();
        try
        {
            string[] strParam = strData.Split('&', '=');
            for (int iAry = 0; iAry < strParam.Length; iAry += 2)
                lstParam[strParam[iAry]] = strParam[iAry + 1];
            if (string.IsNullOrEmpty(lstParam["T"])
                || string.IsNullOrEmpty(lstParam["R"])
                || string.IsNullOrEmpty(lstParam["V"])
                || string.IsNullOrEmpty(lstParam["ACT"])
                || string.IsNullOrEmpty(lstParam["QRY_ID"]))
                throw new Exception("전달된 인수가 올바르지 않습니다.");
        }
        catch (Exception ex)
        {
            throw new Exception("잘못된 호출입니다.\n- " + ex.Message);
        }
        return lstParam;
    }

    #endregion

    #region setFormat() : set Chart Format.

    /// <summary>
    /// setFormat() : set Chart Format.
    /// </summary>
    public void setFormat(NameValueCollection lstParam, DevExpress.XtraCharts.Web.WebChartControl objChart)
    {
        try
        {
            //byte transparancy = 100;
            objChart.Theme = "Aqua";
            System.Drawing.Font fontPointView = new System.Drawing.Font("굴림체", 8, System.Drawing.FontStyle.Regular);

            if (objChart.Series.Count == 1)
            {
                // view.
                string strARG = lstParam["T"];
                switch (strARG)
                {
                    case "1":
                        objChart.Series[0].ChangeView(ViewType.Bar);
                        ((BarSeriesView)objChart.Series[0].View).Transparency = transparancy;
                        //((XYDiagram)objChart.Diagram).Rotated = true;
                        break;
                    case "2":
                        objChart.Series[0].ChangeView(ViewType.Point);
                        break;
                    case "3":
                        objChart.Series[0].ChangeView(ViewType.Line);
                        break;
                    case "4":
                        objChart.Series[0].ChangeView(ViewType.Spline);
                        break;
                    case "5":
                        objChart.Series[0].ChangeView(ViewType.Area);
                        ((AreaSeriesView)objChart.Series[0].View).Transparency = transparancy;
                        break;
                    case "6":
                        objChart.Series[0].ChangeView(ViewType.Pie);
                        break;
                    case "7":
                        objChart.Series[0].ChangeView(ViewType.Doughnut);
                        break;
                    case "8":
                        objChart.Series[0].ChangeView(ViewType.RadarArea);
                        ((RadarDiagram)objChart.Diagram).DrawingStyle = RadarDiagramDrawingStyle.Polygon;
                        ((RadarDiagram)objChart.Diagram).AxisY.Interlaced = true;
                        ((RadarAreaSeriesView)objChart.Series[0].View).Transparency = transparancy;
                        ((RadarAreaSeriesView)objChart.Series[0].View).ColorEach = true;
                        break;
                    case "9":
                        objChart.Series[0].ChangeView(ViewType.StackedBar);
                        ((BarSeriesView)objChart.Series[0].View).Transparency = transparancy;
                        objChart.Series[0].SeriesPointsSortingKey = SeriesPointKey.Argument;
                        //((XYDiagram)objChart.Diagram).Rotated = true;
                        break;
                    case "10":
                        objChart.Series[0].ChangeView(ViewType.SideBySideFullStackedBar);
                        ((BarSeriesView)objChart.Series[0].View).Transparency = transparancy;
                        objChart.Series[0].SeriesPointsSortingKey = SeriesPointKey.Argument;
                        //((XYDiagram)objChart.Diagram).Rotated = true;
                        break;
                }
                if (strARG == "9" || strARG == "10")
                {
                    objChart.Series[0].Label.TextPattern = "{V:F1}";
                    objChart.Legend.Visibility = DevExpress.Utils.DefaultBoolean.False;
                }
                else if (strARG == "8")
                {
                    objChart.Series[0].Label.TextPattern = "{V}";
                    objChart.Legend.Visibility = DevExpress.Utils.DefaultBoolean.False;
                }
                else if (strARG == "6" || strARG == "7")
                {
                    objChart.Series[0].PointOptions.Pattern = "{A} : {V}";
                    objChart.Series[0].PointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
                    objChart.Series[0].PointOptions.ValueNumericOptions.Precision = 1;
                    objChart.Series[0].LegendPointOptions.Pattern = "{A} : {V}";
                    objChart.Series[0].LegendPointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
                    objChart.Series[0].LegendPointOptions.ValueNumericOptions.Precision = 1;
                    objChart.Legend.Visibility = DevExpress.Utils.DefaultBoolean.False;
                }
                else
                {
                    objChart.Series[0].PointOptions.Pattern = "{V}";
                    objChart.Series[0].PointOptions.ValueNumericOptions.Format = NumericFormat.General;
                    objChart.Series[0].PointOptions.ValueNumericOptions.Precision = 0;
                    objChart.Legend.Visibility = DevExpress.Utils.DefaultBoolean.False;
                    ((SeriesViewColorEachSupportBase)objChart.Series[0].View).ColorEach = true;
                    ((XYDiagram)objChart.Diagram).AxisY.Interlaced = true;
                    // rotate.f
                    ((XYDiagram)objChart.Diagram).Rotated = (lstParam["R"] == "1") ? true : false;
                    // reverse.
                    ((XYDiagram)objChart.Diagram).AxisX.Label.Angle = (lstParam["V"] == "1") ? 90 : 0;
                }
                objChart.Series[0].Label.Font = fontPointView;
            }
            else
            {
                // view.
                string strARG = lstParam["T"];
                switch (strARG)
                {
                    case "1":
                        objChart.SeriesTemplate.ChangeView(ViewType.Bar);
                        ((BarSeriesView)objChart.SeriesTemplate.View).Transparency = transparancy;
                        //((XYDiagram)objChart.Diagram).Rotated = true;
                        break;
                    case "2":
                        objChart.SeriesTemplate.ChangeView(ViewType.Point);
                        break;
                    case "3":
                        objChart.SeriesTemplate.ChangeView(ViewType.Line);
                        break;
                    case "4":
                        objChart.SeriesTemplate.ChangeView(ViewType.Spline);
                        break;
                    case "5":
                        objChart.SeriesTemplate.ChangeView(ViewType.Area);
                        ((AreaSeriesView)objChart.SeriesTemplate.View).Transparency = transparancy;
                        break;
                    case "6":
                        objChart.SeriesTemplate.ChangeView(ViewType.Pie);
                        break;
                    case "7":
                        objChart.SeriesTemplate.ChangeView(ViewType.Doughnut);
                        break;
                    case "8":
                        objChart.SeriesTemplate.ChangeView(ViewType.RadarArea);
                        ((RadarDiagram)objChart.Diagram).DrawingStyle = RadarDiagramDrawingStyle.Polygon;
                        ((RadarDiagram)objChart.Diagram).AxisY.Interlaced = true;
                        ((RadarAreaSeriesView)objChart.SeriesTemplate.View).Transparency = transparancy;
                        ((RadarAreaSeriesView)objChart.SeriesTemplate.View).ColorEach = true;
                        break;
                    case "9":
                        objChart.SeriesTemplate.ChangeView(ViewType.StackedBar);
                        ((BarSeriesView)objChart.SeriesTemplate.View).Transparency = transparancy;
                        objChart.SeriesTemplate.SeriesPointsSortingKey = SeriesPointKey.Argument;
                        //((XYDiagram)objChart.Diagram).Rotated = true;
                        break;
                    case "10":
                        objChart.SeriesTemplate.ChangeView(ViewType.SideBySideFullStackedBar);
                        ((BarSeriesView)objChart.SeriesTemplate.View).Transparency = transparancy;
                        objChart.SeriesTemplate.SeriesPointsSortingKey = SeriesPointKey.Argument;
                        //((XYDiagram)objChart.Diagram).Rotated = true;
                        break;
                }
                if (strARG == "9" || strARG == "10")
                {
                    objChart.SeriesTemplate.Label.TextPattern = "{V:F1}";
                }
                else if (strARG == "8")
                {
                    objChart.SeriesTemplate.Label.TextPattern = "{V}";
                }
                else if (strARG == "6" || strARG == "7")
                {
                    objChart.SeriesTemplate.PointOptions.Pattern = "{A} : {V}";
                    objChart.SeriesTemplate.PointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
                    objChart.SeriesTemplate.PointOptions.ValueNumericOptions.Precision = 1;
                    //objChart.SeriesTemplate.LegendPointOptions.Pattern = "{A} : {V}";
                    //objChart.SeriesTemplate.LegendPointOptions.ValueNumericOptions.Format = NumericFormat.Percent;
                    //objChart.SeriesTemplate.LegendPointOptions.ValueNumericOptions.Precision = 0;
                    objChart.Legend.Visibility = DevExpress.Utils.DefaultBoolean.False;
                }
                else
                {
                    objChart.SeriesTemplate.PointOptions.Pattern = "{V}";
                    objChart.SeriesTemplate.PointOptions.ValueNumericOptions.Format = NumericFormat.General;
                    objChart.SeriesTemplate.PointOptions.ValueNumericOptions.Precision = 0;
                    //objChart.SeriesTemplate.LegendPointOptions.Pattern = "{S}";
                    //objChart.SeriesTemplate.LegendPointOptions.PointView = PointView.SeriesName;
                    objChart.Legend.Visibility = DevExpress.Utils.DefaultBoolean.False;
                    ((SeriesViewColorEachSupportBase)objChart.SeriesTemplate.View).ColorEach = (strARG == "1") ? false : true;
                    ((XYDiagram)objChart.Diagram).AxisY.Interlaced = true;
                    // rotate.
                    ((XYDiagram)objChart.Diagram).Rotated = (lstParam["R"] == "1") ? true : false;
                    // reverse.
                    ((XYDiagram)objChart.Diagram).AxisX.Label.Angle = (lstParam["V"] == "1") ? 90 : 0;
                }
                objChart.SeriesTemplate.Label.Font = fontPointView;
            }
        }
        catch (Exception)
        {
            throw new Exception("현재 유형은 해당 기능을 지원하지 않습니다.");
        }
    }

    #endregion

    #region setQuery() : set Query to Retrieve.

    /// <summary>
    /// createQuery() : set Query to Retrieve.
    /// </summary>
    public string setQuery(NameValueCollection lstParam)
    {
        if (lstParam["ACT"].ToString() == "clear")
            return "";

        int iDefault = 5;
        string strQueryID = lstParam["QRY_ID"];
        string strSQL = string.Empty;
        string strQuery = string.Empty;
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
                    strQuery = objDr["QUERY_SELECT"].ToString();
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
                    "Query 조회에 실패하였습니다.\n- " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "Query 조회 중에 오류가 발생하였습니다.\n- " + ex.Message);
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
                        "Query Parameter 조회에 실패하였습니다.\n- " + ex.Message);
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        "Query Parameter 조회 중에 오류가 발생하였습니다.\n- " + ex.Message);
                }

                try
                {
                    for (int iAry = iDefault; iAry < lstParam.Count; iAry++)
                    {
                        string strKey = lstParam.Keys[iAry].ToString();
                        cDBArgument objArg = (cDBArgument)tblSelect[strKey];
                        if (objArg == null)
                        {
                            //throw new Exception(
                            //    strKey + " - 관련 Argument를 찾을 수 없습니다.");
                        } else
                        {
                            strQuery = objArg.convertWhere(
                                                strQuery,
                                                strQueryID,
                                                strKey,
                                                HttpUtility.UrlDecode(lstParam[iAry])
                                            );
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        "Query 생성 중에 오류가 발생하였습니다.\n- " + ex.Message);
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (objDr != null)
                objDr.Close();
            if (objCon != null)
                objCon.Close();
        }
        return strQuery;
    }

    #endregion

    #region createQuery() : create Query to Retrieve.

    /// <summary>
    /// createQuery() : create Query to Retrieve.
    /// </summary>
    public string createQuery(string strData)
    {
        NameValueCollection lstParam = new NameValueCollection();
        try
        {
            string[] strParam = strData.Split('&', '=');
            for (int iAry = 0; iAry < strParam.Length; iAry += 2)
                lstParam[strParam[iAry]] = strParam[iAry + 1];
            if (string.IsNullOrEmpty(lstParam["ACT"])
                || string.IsNullOrEmpty(lstParam["QRY_ID"]))
                throw new Exception("Query ID를 찾을 수 없습니다.");
            if (lstParam["ACT"].ToString() == "clear")
                return "";
        }
        catch (Exception ex)
        {
            throw new Exception("잘못된 호출입니다.\n- " + ex.Message);
        }

        int iDefault = 2;
        string strQueryID = lstParam["QRY_ID"];
        string strSQL = string.Empty;
        string strQuery = string.Empty;
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
                    strQuery = objDr["QUERY_SELECT"].ToString();
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
                    "Query 조회에 실패하였습니다.\n- " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "Query 조회 중에 오류가 발생하였습니다.\n- " + ex.Message);
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
                        "Query Parameter 조회에 실패하였습니다.\n- " + ex.Message);
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        "Query Parameter 조회 중에 오류가 발생하였습니다.\n- " + ex.Message);
                }

                try
                {
                    for (int iAry = iDefault; iAry < lstParam.Count; iAry++)
                    {
                        string strKey = lstParam.Keys[iAry].ToString();
                        cDBArgument objArg = (cDBArgument)tblSelect[strKey];
                        if (objArg == null)
                        {
                            throw new Exception(
                                strKey + " - 관련 Argument를 찾을 수 없습니다.");
                        }
                        strQuery = objArg.convertWhere(
                                            strQuery,
                                            strQueryID,
                                            strKey,
                                            HttpUtility.UrlDecode(lstParam[iAry])
                                        );
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        "Query 생성 중에 오류가 발생하였습니다.\n- " + ex.Message);
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (objDr != null)
                objDr.Close();
            if (objCon != null)
                objCon.Close();
        }
        return strQuery;
    }

    #endregion
}

#endregion

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//