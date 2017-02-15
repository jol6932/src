﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DevExpress.XtraCharts;
using System.Collections;
using System.Text;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections.Specialized;
using System.Web.Script.Serialization;

public partial class JOB_EHM_5225 : System.Web.UI.Page
{
    cChart objChart;

    protected void Page_Load(object sender, EventArgs e)
    {
        objChart = new cChart();
    }
    protected void ctlChart_1_CustomCallback(object sender, DevExpress.XtraCharts.Web.CustomCallbackEventArgs e)
    {
        objChart.bindData( e.Parameter.ToString(), this.ctlDB_1, this.ctlChart_1);
        ctlChart_1.Legend.Visible = true;

        if (ctlChart_1.Series.Count == 1)
        {
            // view.
            ctlChart_1.Series[0].ChangeView(ViewType.Line);
            ctlChart_1.Series[0].PointOptions.Pattern = "{V}";
            ctlChart_1.Legend.Visible = false;
            ((SeriesViewColorEachSupportBase)ctlChart_1.Series[0].View).ColorEach = true;
            ((DevExpress.XtraCharts.XYDiagram)ctlChart_1.Diagram).AxisY.Interlaced = true;
            // rotate.
            //((DevExpress.XtraCharts.XYDiagram)objChart.Diagram).Rotated = (lstParam["R"] == "1") ? true : false;
            // reverse.
            //((DevExpress.XtraCharts.XYDiagram)objChart.Diagram).AxisX.Label.Angle = (lstParam["V"] == "1") ? 90 : 0;
        }
        else
        {
            // view.
            //ctlChart_1.SeriesTemplate.ChangeView(ViewType.Line);
            ctlChart_1.SeriesTemplate.PointOptions.Pattern = "";    //{S} {V}%
            
            ctlChart_1.Legend.Visible = true;
            ctlChart_1.SeriesTemplate.LegendPointOptions.Pattern = "{S}";
            ctlChart_1.SeriesTemplate.LegendPointOptions.PointView = PointView.SeriesName;
            ((SeriesViewColorEachSupportBase)ctlChart_1.SeriesTemplate.View).ColorEach = false;
            //((DevExpress.XtraCharts.XYDiagram)ctlChart_1.Diagram).AxisY.Interlaced = true;
        }
    }
}

