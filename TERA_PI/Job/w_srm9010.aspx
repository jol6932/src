﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Page_10.master" AutoEventWireup="true"
    CodeFile="w_srm9010.aspx.cs" Inherits="Job_w_srm9010" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <script src="../Lib/js/lib.encrypt_1.js" type="text/javascript"></script>
    <script src="js/w.srm9010.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });
        
    </script>
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="objContentOption_1" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentMenu_1" runat="Server">
    <div id="lyrMenu_1">
    </div>
    <div id="lyrNotice" align="center">
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentOption_2" runat="Server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentMenu_2" runat="Server">
    <div id="lyrMenu_2">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmData_PASSWD" action=""></form>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="objContentRemark" runat="Server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentData_1" runat="Server">
    <div id="grdData_협력사">
    </div>
    <form id="frmData_협력사" action="">
    </form>
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="objContentData_2" runat="Server">
    <div id="grdData_담당자">
    </div>
</asp:Content>