﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Page_7.master" AutoEventWireup="true"
    CodeFile="EHM_2021.aspx.cs" Inherits="JOB_EHM_2021" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <link id="style_theme_tab" href="" rel="stylesheet" type="text/css" />
    <script src="js/EHM.2021.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });
        
    </script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentOption" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentMenu" runat="Server">
    <div id="lyrMenu_1_1">
    </div>
    <div id="lyrMenu_1_2">
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmOption" action="">
    </form>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentRemark" runat="Server">
    <div id="lyrRemark">
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentData" runat="Server">
    <div id="lyrTab">
        <div id="lyrData_등록">
            <table width="100%" border="0" cellpadding="1" cellspacing="0" style="margin: 0;
                margin-top: 0; padding: 0; white-space: nowrap;">
                <tr>
                    <td align="right" valign="top">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0;">
                            <tr>
                                <td align="right">
                                    <form id="frmView1" action="">
                                    </form>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <div id="grdData_발생정보">
            </div>

            <form id="frmData_발생정보" action="">
            </form>
            <!--  여기까지 나와야한다. -->

             <!-- 
            <div id="lyrMenu_2" align="right">
            </div>

            <div id="grdData_발생내역">
            </div>
            <form id="frmData_발생내용" action="">
            </form>
            <div id="lyrMenu_3" align="right">
            </div>
            <div id="grdData_조치내역">
            </div>
            <form id="frmData_조치내용" action="">
            </form>
                    -->
            <!-- 
            <table width="100%" border="0" cellpadding="1" cellspacing="0" style="margin: 0;
                margin-top: 2px; padding: 0; white-space: nowrap;">
                <tr>
                    <td align="right" valign="top">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0;
                            padding: 0;">
                            <tr>
                                <td align="left">
                                    <form id="frmView" action="">
                                    </form>
                                </td>
                                <td align="right">
                                    <div id="lyrMenu_4" align="right">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
                -->
            <!-- 
            <div id="grdData_교체PART">
            </div>
            <form id="frmData_교체내용" action="">
            </form>
            <form id="frmData_처리결과" action="">
            </form>
            <div id="lyrMenu_5" align="right">
            </div>
            <div id="grdData_첨부파일">
            </div>
            <div id="lyrDown">
            </div>
            <div id="lyrMenu_6" align="right">
            </div>
            <form id="frmData_상세메모" action="">
            </form>
            -->
        </div>
    </div>
</asp:Content>