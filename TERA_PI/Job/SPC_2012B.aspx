﻿<%@ Page Language="C#" MasterPageFile="~/Master/Page_10.master" AutoEventWireup="true"
    CodeFile="SPC_2012B.aspx.cs" Inherits="Job_SPC_2012B" Title="" %>

<%@ Register Assembly="DevExpress.Web.v15.1, Version=15.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="../Style/theme-smoothness/jquery-ui-1.8.9.custom.css"
        rel="stylesheet" type="text/css" />
    <link id="style_theme_tab" href="../Style/theme-smoothness/jquery-ui-1.8.9.custom.css"
        rel="stylesheet" type="text/css" />
    <script src="js/SPC.2012B.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {

            gw_job_process.ready();

        });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentOption_1" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentMenu_1" runat="Server">
    <div id="lyrMenu_1">
    </div>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="objContentOption_2" runat="Server">
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="objContentMenu_2" runat="Server">
    <div id="lyrMenu_2">
    </div>
    <div style="position: absolute; z-index: 10; width: 100%; top: 100;">
        <form id="frmOption" action="">
        </form>
    </div>
    <div id="lyrRemark" align="left">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentToggle" runat="Server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentRemark" runat="Server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentData_1" runat="Server">
    <form id="frmServer" runat="server">
    <div id="lyrServer" class="form_3">
        <dx:ASPxUploadControl ID="ctlUpload" runat="server" ClientInstanceName="ctlUpload"
            OnFileUploadComplete="ctlUpload_FileUploadComplete" Width="100%" CancelButtonSpacing="2px"
            ShowProgressPanel="True">
            <ValidationSettings FileDoesNotExistErrorText="파일이 존재하지 않습니다." GeneralErrorText="파일 업로드 중에 에러가 발생하였습니다."
                MaxFileSize="15360000" MaxFileSizeErrorText="파일 크기는 15M Byte를 넘을 수 없습니다." 
                NotAllowedFileExtensionErrorText="첨부하신 파일의 확장자는 허용되지 않습니다." 
                AllowedFileExtensions=".xls">
                <ErrorStyle Wrap="False" />
            </ValidationSettings>
            <CancelButton Text="취소">
            </CancelButton>
            <ClientSideEvents FileUploadComplete="function(s, e) { e.handler_success = successUpload; gw_com_DX.event_fileuploadcomplete(e); }" />
        </dx:ASPxUploadControl>
    </div>
    </form>
    <div style="margin-top: 2px; margin-left: 10px; margin-bottom: 10px; text-decoration: underline;">
        * 파일 크기는 15M Byte를 넘을 수 없습니다.&nbsp;확장자가 XLS (엑셀 2007 이전 버전)인 파일만 가능합니다.
    </div>
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="objContentData_2" runat="Server">
    <form id="frmData_정보" action="">
    </form>
    <div id="lyrTab">
        <div id="grdData_적용">
        </div>
        <div id="grdData_엑셀">
        </div>
    </div>
</asp:Content>
