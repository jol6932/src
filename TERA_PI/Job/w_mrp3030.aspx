﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Page_10.master" AutoEventWireup="true"
    CodeFile="w_mrp3030.aspx.cs" Inherits="Job_w_mrp3030" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <link id="style_theme_tab" href="" rel="stylesheet" type="text/css" />
    <script src="js/w.mrp3030.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });
        
    </script>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentOption_1" runat="Server">
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentMenu_1" runat="Server">
    <div id="lyrMenu">
    </div>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="objContentOption_2" runat="Server">
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="objContentMenu_2" runat="Server">
    <form id="frmView" action="">
    </form>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmOption" action="">
    </form>
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="objContentRemark" runat="Server">
    <div id="lyrRemark">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentData_1" runat="Server">
    <div id="grdData_현황">
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentData_2" runat="Server">
    <div id="lyrTab">
        <div id="grdData_공정">
        </div>
        <div id="grdData_핵심">
        </div>
        <div id="grdData_전체">
        </div>
    </div>
</asp:Content>