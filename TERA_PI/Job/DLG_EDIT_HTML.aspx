﻿<%@ Page Language="C#" MasterPageFile="~/Master/Page_99.master" AutoEventWireup="true" CodeFile="DLG_EDIT_HTML.aspx.cs" Inherits="Job_DLG_EDIT_HTML" %>

<%@ Register assembly="DevExpress.Web.ASPxHtmlEditor.v15.1, Version=15.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxHtmlEditor" tagprefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="objContentHead" runat="Server">
    <link id="style_theme" href="" rel="stylesheet" type="text/css" />
    <script src="js/DLG.EDIT.HTML.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {
            
            gw_job_process.ready();
            
        });
        $(window).resize(function () {
            ctlHTML.SetHeight(window.innerHeight - 70);
        });
        

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="objContentOption" runat="Server">
    <div id="lyrNotice">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="objContentMenu" runat="Server">
    <div id="lyrMenu">
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="objContentToggle" runat="Server">
    <form id="frmOption" action="">
    </form>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="objContentRemark" runat="Server">
    <div id="lyrRemark">
    </div>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="objContentData" runat="Server">
    <form id="frmHTML" action="">
    </form>
    <form id="frmServer" runat="server">
        <div id="lyrControl">
            <dx:ASPxHtmlEditor ID="ASPxctlHTML" runat="server" Width="100%" ClientInstanceName="ctlHTML"
                ClientVisible="False" EnableTheming="True" height="530px" Theme="Default" OnHtmlCorrecting="ASPxHtmlEditor1_HtmlCorrecting">

                <StylesDocument Font-Names="굴림체" />
                <ClientSideEvents HtmlChanged="gw_com_DX.event_htmlchanged"
                     Init="function(s, e) {
	                            processInit({});
                           }" />
                <Toolbars>
                    <dx:HtmlEditorToolbar>
                        <Items>
                            <dx:ToolbarUndoButton>
                            </dx:ToolbarUndoButton>
                            <dx:ToolbarRedoButton>
                            </dx:ToolbarRedoButton>
                            <dx:ToolbarFontNameEdit>
                                <Items>
                                    <dx:ToolbarListEditItem Text="굴림" Value="굴림" />
                                    <dx:ToolbarListEditItem Selected="True" Text="굴림체" Value="굴림체" />
                                    <dx:ToolbarListEditItem Text="Times New Roman" Value="Times New Roman" />
                                    <dx:ToolbarListEditItem Text="Tahoma" Value="Tahoma" />
                                    <dx:ToolbarListEditItem Text="Verdana" Value="Verdana" />
                                    <dx:ToolbarListEditItem Text="Arial" Value="Arial" />
                                    <dx:ToolbarListEditItem Text="MS Sans Serif" Value="MS Sans Serif" />
                                    <dx:ToolbarListEditItem Text="Courier" Value="Courier" />
                                </Items>
                            </dx:ToolbarFontNameEdit>
                            <dx:ToolbarFontSizeEdit>
                                <Items>
                                    <dx:ToolbarListEditItem Text="1 (8pt)" Value="1" />
                                    <dx:ToolbarListEditItem Text="2 (10pt)" Value="2" />
                                    <dx:ToolbarListEditItem Text="3 (12pt)" Value="3" />
                                    <dx:ToolbarListEditItem Text="4 (14pt)" Value="4" />
                                    <dx:ToolbarListEditItem Text="5 (18pt)" Value="5" />
                                    <dx:ToolbarListEditItem Text="6 (24pt)" Value="6" />
                                    <dx:ToolbarListEditItem Text="7 (36pt)" Value="7" />
                                </Items>
                            </dx:ToolbarFontSizeEdit>
                            <dx:ToolbarBoldButton>
                            </dx:ToolbarBoldButton>
                            <dx:ToolbarItalicButton>
                            </dx:ToolbarItalicButton>
                            <dx:ToolbarFontColorButton>
                            </dx:ToolbarFontColorButton>
                            <dx:ToolbarBackColorButton>
                            </dx:ToolbarBackColorButton>
                            <dx:ToolbarJustifyLeftButton>
                            </dx:ToolbarJustifyLeftButton>
                            <dx:ToolbarJustifyCenterButton>
                            </dx:ToolbarJustifyCenterButton>
                            <dx:ToolbarJustifyRightButton>
                            </dx:ToolbarJustifyRightButton>
                            <dx:ToolbarTableOperationsDropDownButton>
                                <Items>
                                    <dx:ToolbarInsertTableDialogButton BeginGroup="True">
                                    </dx:ToolbarInsertTableDialogButton>
                                    <dx:ToolbarTablePropertiesDialogButton BeginGroup="True">
                                    </dx:ToolbarTablePropertiesDialogButton>
                                    <dx:ToolbarTableRowPropertiesDialogButton>
                                    </dx:ToolbarTableRowPropertiesDialogButton>
                                    <dx:ToolbarTableColumnPropertiesDialogButton>
                                    </dx:ToolbarTableColumnPropertiesDialogButton>
                                    <dx:ToolbarTableCellPropertiesDialogButton>
                                    </dx:ToolbarTableCellPropertiesDialogButton>
                                    <dx:ToolbarInsertTableRowAboveButton BeginGroup="True">
                                    </dx:ToolbarInsertTableRowAboveButton>
                                    <dx:ToolbarInsertTableRowBelowButton>
                                    </dx:ToolbarInsertTableRowBelowButton>
                                    <dx:ToolbarInsertTableColumnToLeftButton>
                                    </dx:ToolbarInsertTableColumnToLeftButton>
                                    <dx:ToolbarInsertTableColumnToRightButton>
                                    </dx:ToolbarInsertTableColumnToRightButton>
                                    <dx:ToolbarSplitTableCellHorizontallyButton BeginGroup="True">
                                    </dx:ToolbarSplitTableCellHorizontallyButton>
                                    <dx:ToolbarSplitTableCellVerticallyButton>
                                    </dx:ToolbarSplitTableCellVerticallyButton>
                                    <dx:ToolbarMergeTableCellRightButton>
                                    </dx:ToolbarMergeTableCellRightButton>
                                    <dx:ToolbarMergeTableCellDownButton>
                                    </dx:ToolbarMergeTableCellDownButton>
                                    <dx:ToolbarDeleteTableButton BeginGroup="True">
                                    </dx:ToolbarDeleteTableButton>
                                    <dx:ToolbarDeleteTableRowButton>
                                    </dx:ToolbarDeleteTableRowButton>
                                    <dx:ToolbarDeleteTableColumnButton>
                                    </dx:ToolbarDeleteTableColumnButton>
                                </Items>
                            </dx:ToolbarTableOperationsDropDownButton>
                            <dx:ToolbarInsertImageDialogButton>
                            </dx:ToolbarInsertImageDialogButton>
                            <dx:ToolbarInsertLinkDialogButton>
                            </dx:ToolbarInsertLinkDialogButton>
                        </Items>
                    </dx:HtmlEditorToolbar>
                </Toolbars>
                <SettingsHtmlEditing EnterMode="Default">
                </SettingsHtmlEditing>
                <SettingsDialogs>
                    <InsertImageDialog ShowMoreOptionsButton="False">
                        <SettingsImageUpload UploadFolder="~/Files/EDIT_FILES/images/" UploadImageFolder="~/Files/EDIT_FILES/images/">
                        </SettingsImageUpload>
                        <SettingsImageSelector>
                            <EditingSettings TemporaryFolder="~/Files/EDIT_FILES/temp" />
                        </SettingsImageSelector>
                    </InsertImageDialog>
                </SettingsDialogs>
            </dx:ASPxHtmlEditor>
        </div>
    </form>
</asp:Content>
