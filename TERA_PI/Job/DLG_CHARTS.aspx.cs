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

public partial class JOB_DLG_CHARTS : System.Web.UI.Page
{
    cChart objChart;

    protected void Page_Load(object sender, EventArgs e)
    {
        objChart = new cChart();
    }
    protected void ctlChart_1_CustomCallback(object sender, DevExpress.XtraCharts.Web.CustomCallbackEventArgs e)
    {
        objChart.bindData(
            e.Parameter.ToString(),
            this.ctlDB_1,
            this.ctlChart_1);

        ctlChart_1.Legend.Visible = true;
        ctlChart_1.Legend.AlignmentHorizontal = LegendAlignmentHorizontal.Right;

        if (ctlChart_1.SeriesTemplate.View.ToString() == "Bar"
            || ctlChart_1.SeriesTemplate.View.ToString() == "Line"
            || ctlChart_1.SeriesTemplate.View.ToString() == "Spine"
            || ctlChart_1.SeriesTemplate.View.ToString() == "Point"
            || ctlChart_1.SeriesTemplate.View.ToString() == "Area"
            || ctlChart_1.SeriesTemplate.View.ToString() == "Bar Stacked")
            ((SeriesViewColorEachSupportBase)ctlChart_1.SeriesTemplate.View).ColorEach = false;

    }
}


