﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Page_10.master" AutoEventWireup="true"
    CodeFile="w_hcem2020.aspx.cs" Inherits="Job_w_hcem2020" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <script src="js/w.hcem2020.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });
        
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentOption_1" runat="Server">
    <div id="lyrNotice">
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentMenu_1" runat="Server">
    <div id="lyrMenu_1">
    </div>
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="objContentOption_2" runat="Server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentMenu_2" runat="Server">
    <div id="lyrMenu_2">
    </div>
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmOption" action="">
    </form>
</asp:Content>
<asp:Content ID="Content10" ContentPlaceHolderID="objContentRemark" runat="Server">
    <div id="lyrRemark">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentData_1" runat="Server">
    <div id="grdData_현황">
    </div>
     <form id="frmData_상세" action="">
    </form>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="objContentData_2" runat="Server">
    <div id="grdData_이력">
    </div>
</asp:Content>
