﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Control_9b.master" AutoEventWireup="true"
    CodeFile="QDM_5520.aspx.cs" Inherits="JOB_QDM_5520" %>

<%@ Register Assembly="DevExpress.XtraCharts.v15.1.Web, Version=15.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register Assembly="DevExpress.XtraCharts.v15.1, Version=15.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraCharts" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <script src="js/QDM.5520.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });
        
    </script>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentOption" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentMenu" runat="Server">
    <div id="lyrMenu">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmOption" action="">
    </form>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="objContentRemark" runat="Server">
    <div id="lyrRemark">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentData_1" runat="Server">
    <div id="grdData_1">
    </div>
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="objContentData_2" runat="Server">
    <div id="grdData_2">
    </div>
</asp:Content>
<asp:Content ID="Content12" ContentPlaceHolderID="objContentData_3" runat="Server">
    <div id="grdData_3">
    </div>
</asp:Content>
<asp:Content ID="Content13" ContentPlaceHolderID="objContentData_4" runat="Server">
    <div id="grdData_4">
    </div>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentControl_1" runat="Server">
    <div id="lyrChart_1">
        <dxchartsui:WebChartControl ID="ctlChart_1" runat="server" Height="270px" Width="550px"
            ClientInstanceName="ctlChart_1" DataSourceID="ctlDB_1" OnCustomCallback="ctlChart_1_CustomCallback"
            ClientVisible="False" SeriesDataMember="series" PaletteName="Mixed">
            <seriestemplate argumentdatamember="category" valuedatamembersserializable="value">
            </seriestemplate>
            <titles><cc1:ChartTitle Font="Tahoma, 12pt" Text="VOC 접수 현황 (건)" /></titles>
        </dxchartsui:WebChartControl>
        <asp:SqlDataSource ID="ctlDB_1" runat="server" ConnectionString="<%$ ConnectionStrings:PLMDB %>">
        </asp:SqlDataSource>
    </div>
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="objContentControl_2" runat="Server">
    <div id="lyrChart_2">
        <dxchartsui:WebChartControl ID="ctlChart_2" runat="server" Height="270px" Width="550px"
            ClientInstanceName="ctlChart_2" DataSourceID="ctlDB_2" OnCustomCallback="ctlChart_2_CustomCallback"
            ClientVisible="False" SeriesDataMember="series" PaletteName="Mixed">
            <seriestemplate argumentdatamember="category" valuedatamembersserializable="value">
            </seriestemplate>
            <titles><cc1:ChartTitle Font="Tahoma, 12pt" Text="Top3 불량 현황 (건)" /></titles>
        </dxchartsui:WebChartControl>
        <asp:SqlDataSource ID="ctlDB_2" runat="server" ConnectionString="<%$ ConnectionStrings:PLMDB %>">
        </asp:SqlDataSource>
    </div>
</asp:Content>
<asp:Content ID="Content10" ContentPlaceHolderID="objContentControl_3" runat="Server">
    <div id="lyrChart_3">
        <dxchartsui:WebChartControl ID="ctlChart_3" runat="server" Height="270px" Width="550px"
            ClientInstanceName="ctlChart_3" DataSourceID="ctlDB_3" OnCustomCallback="ctlChart_3_CustomCallback"
            ClientVisible="False" SeriesDataMember="series" PaletteName="Mixed">
            <DiagramSerializable>
                <cc1:XYDiagram>
                    <secondaryaxesy>
                        <cc1:SecondaryAxisY AxisID="0" Name="Secondary AxisY" VisibleInPanesSerializable="-1">
                            <range sidemarginsenabled="True" />
                        </cc1:SecondaryAxisY>
                    </secondaryaxesy>
                </cc1:XYDiagram>
            </DiagramSerializable>
            <seriestemplate argumentdatamember="category" valuedatamembersserializable="value"></seriestemplate>
            <titles><cc1:ChartTitle Font="Tahoma, 12pt" Text="설비 불량 지수 (%)" /></titles>
        </dxchartsui:WebChartControl>
        <asp:SqlDataSource ID="ctlDB_3" runat="server" ConnectionString="<%$ ConnectionStrings:PLMDB %>">
        </asp:SqlDataSource>
    </div>
</asp:Content>
<asp:Content ID="Content11" ContentPlaceHolderID="objContentControl_4" runat="Server">
    <div id="lyrChart_4">
        <dxchartsui:WebChartControl ID="ctlChart_4" runat="server" Height="270px" Width="550px"
            ClientInstanceName="ctlChart_4" DataSourceID="ctlDB_4" OnCustomCallback="ctlChart_4_CustomCallback"
            ClientVisible="False" SeriesDataMember="series" PaletteName="Mixed">
            <seriestemplate argumentdatamember="category" valuedatamembersserializable="value"> </seriestemplate>
            <titles><cc1:ChartTitle Font="Tahoma, 12pt" Text="설비 다운 지수 (%)" /></titles>
        </dxchartsui:WebChartControl>
        <asp:SqlDataSource ID="ctlDB_4" runat="server" ConnectionString="<%$ ConnectionStrings:PLMDB %>">
        </asp:SqlDataSource>
    </div>
</asp:Content>