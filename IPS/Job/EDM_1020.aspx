﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Page_9.master" AutoEventWireup="true"
    CodeFile="EDM_1020.aspx.cs" Inherits="JOB_EDM_1020" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <script src="js/EDM.1020.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });

    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentOption" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentMenu" runat="Server">
    <div id="lyrMenu_Main">
    </div>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmOption" action="">
    </form>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentRemark" runat="Server">
    <div id="lyrRemark">
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentData_1" runat="Server">
    <div id="grdData_Main">
    </div>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentData_2" runat="Server">
    <form id="frmData_Main" action="">
    </form>
            <div id="lyrMenu_Sub" align="right">
            </div>
            <div id="grdData_Sub">
            </div>
        <div id="lyrMenu_Detail" align="right">
        </div>
        <div id="grdData_Detail">
        </div>
</asp:Content>
