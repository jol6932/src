﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Page_7.master" AutoEventWireup="true"
    CodeFile="EOM_2190.aspx.cs" Inherits="JOB_EOM_2190" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <script src="js/EOM.2190.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });
        
    </script>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentOption" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentMenu" runat="Server">
    <div id="lyrMenu">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmMain" action="">
    </form>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentRemark" runat="Server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentData" runat="Server">
    <div id="lyrMain">
    </div>
    <div id="grdData_List">
    </div>
</asp:Content>