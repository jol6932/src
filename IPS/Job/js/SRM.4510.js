﻿//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 화면명 : 반입 현황
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var v_global = {
    event: { type: null, object: null, row: null, element: null },
    process: { param: null, entry: null, act: null, handler: null, current: {}, prev: {} },
    data: null, logic: {}
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define gw_job_process class : ready(), UI(), procedure()
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var gw_job_process = {

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // entry point. (pre-process section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ready: function () {

        // initialize page.
        v_global.process.param = gw_com_module.initPage({ message: true });
        gw_com_api.changeTheme("style_theme");

        start();

        // Start Process : Create UI & Event
        function start() {
            gw_job_process.UI();
            gw_job_process.procedure();
        }
    },

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // manage UI. (design section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    UI: function () {

        //==== Main Menu : 조회, 추가, 수정, 삭제
        var args = {
            targetid: "lyrMenu", type: "FREE",
            element: [
				{ name: "조회", value: "조회", act: true },
				{ name: "자재", value: "자재반입", icon: "추가" },
				{ name: "일괄", value: "일괄반입", icon: "추가" },
				{ name: "기초", value: "기초재고", icon: "추가" },
                { name: "파일", value: "엑셀양식받기", icon: "기타" },
				{ name: "라벨", value: "라벨출력", icon: "기타" },
				{ name: "라벨2", value: "라벨[A4]", icon: "기타" },
                { name: "수정", value: "수정", icon: "저장" }
            ]
        };
        gw_com_module.buttonMenu(args);

        //==== Search Option : 
        var args = {
            targetid: "frmOption", type: "FREE", title: "조회 조건",
            trans: true, border: true, show: true, remark: "lyrRemark",
            editable: { focus: "ymd_fr", validate: true },
            content: {
                row: [
                        {
                            element: [
                              {
                                  name: "ymd_fr", label: { title: "반입일자 :" }, mask: "date-ymd",
                                  style: { colfloat: "floating" },
                                  editable: { type: "text", size: 7, maxlength: 10 }
                              },
                              {
                                  name: "ymd_to", label: { title: "~" }, mask: "date-ymd",
                                  editable: { type: "text", size: 7, maxlength: 10 }
                              }
                            ]
                        },
                        {
                            element: [
                              {
                                  name: "io_no", label: { title: "관리번호 :" },
                                  editable: { type: "text", size: 12 }
                              }
                            ]
                        },
                        {
                            element: [
                              { name: "실행", value: "실행", act: true, format: { type: "button" } },
                              { name: "취소", value: "취소", format: { type: "button", icon: "닫기" } }
                            ], align: "right"
                        }
                ]
            }
        };
        gw_com_module.formCreate(args);


        //==== Main Grid : 반입 현황
        var args = {
            targetid: "grdData_Main", query: "SRM_4510_M_1", title: "반입 현황",
            height: 150, show: true, selectable: true, number: true, // dynamic: true, multi: true, checkrow: true,
            element: [
				{ header: "진행상태", name: "pstat", width: 60, align: "center" },
				{ header: "관리번호", name: "io_no", width: 70, align: "center" },
				{ header: "반입일자", name: "io_date", width: 70, align: "center", mask: "date-ymd" },
                { header: "구분", name: "io_cd", width: 70, align: "center" },
				{ header: "품목수", name: "item_cnt", width: 60, align: "right" },
				{ header: "전체수량", name: "item_qty", width: 60, align: "right" },
				{ header: "등록자", name: "ins_usr_nm", width: 60, align: "center" },
				{ header: "등록일시", name: "ins_dt", width: 100, align: "center" },
				{ name: "io_tp", hidden: true },
				{ name: "rqst_dept", hidden: true },
				{ name: "rqst_user", hidden: true },
				{ name: "acpt_user", hidden: true }
            ]
        };
        gw_com_module.gridCreate(args);

        //==== Sub Grid : 반입 목록
        var args = {
            targetid: "grdData_Sub", query: "SRM_4510_S_1", title: "반입 목록",
            caption: true, height: 350, pager: true, show: true, number: true, multi: true, checkrow: true,
            element: [
				{ header: "품번", name: "item_cd", width: 70, align: "center" },
				{ header: "품명", name: "item_nm", width: 120, align: "left" },
				{ header: "규격", name: "item_spec", width: 120, align: "left" },
				{ header: "Tracking", name: "track_no", width: 80, align: "center" },
				{ header: "단위", name: "io_unit", width: 40, align: "center" },
				{ header: "입고수량", name: "io_qty", width: 50, align: "right" },
                { header: "바코드", name: "barcode", width: 70, align: "center" },
                { name: "io_no", hidden: true },
                { name: "io_seq", hidden: true },
                { name: "root_no", hidden: true },
                { name: "root_seq", hidden: true }
            ]
        };
        gw_com_module.gridCreate(args);

        //==== File Download Layer
        var args = { targetid: "lyrDown", width: 0, height: 0, show: false };
        gw_com_module.pageCreate(args);

        //==== Resize Objects
        var args = {
            target: [
				{ type: "GRID", id: "grdData_Main", offset: 8 },
                { type: "GRID", id: "grdData_Sub", offset: 8 }
            ]
        };
        gw_com_module.objResize(args);
        gw_com_module.informSize();

    },

    //==== manage process. (program section)
    procedure: function () {

        //==== Button Click ====
        var args = { targetid: "lyrMenu", element: "조회", event: "click", handler: viewOption };
        gw_com_module.eventBind(args);
        function viewOption(ui) {
            var args = { target: [{ id: "frmOption", focus: true }] };
            gw_com_module.objToggle(args);
        }
        //----------
        var args = { targetid: "lyrMenu", element: "자재", event: "click", handler: processInsert };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu", element: "일괄", event: "click", handler: processInsert };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu", element: "기초", event: "click", handler: processInsert };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu", element: "파일", event: "click", handler: fileDownload };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu", element: "라벨", event: "click", handler: processExport };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu", element: "라벨2", event: "click", handler: processExport };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu", element: "수정", event: "click", handler: processEdit };
        gw_com_module.eventBind(args);
        //----------

        //==== Button Click : Search Option ====
        var args = { targetid: "frmOption", element: "실행", event: "click", handler: processRetrieve };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmOption", element: "취소", event: "click", handler: hideOption };
        gw_com_module.eventBind(args);
        function hideOption(ui) { gw_com_api.hide("frmOption"); }
        //----------

        //==== Grid Events : Main
        var args = { targetid: "grdData_Main", grid: true, event: "rowselected", handler: processLink };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_Main", grid: true, event: "rowdblclick", handler: popupDetail };
        gw_com_module.eventBind(args);
        var args = { targetid: "grdData_Main", grid: true, event: "rowkeyenter", handler: popupDetail };
        gw_com_module.eventBind(args);

        //==== startup process.
        gw_com_api.setValue("frmOption", 1, "ymd_fr", gw_com_api.getDate("", { day: v_global.logic.HideSupp ? -30 : -5 }));
        gw_com_api.setValue("frmOption", 1, "ymd_to", gw_com_api.getDate("", { day: 1 }));
        gw_com_module.startPage();

    }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//---------- Sub Functions : Checking
function checkSelected(objid) {
    if (gw_com_api.getSelectedRow(objid) == null) {
        gw_com_api.messageBox([{ text: "선택된 대상이 없습니다." }], 300);
        return false;
    }
    return true;
}
//---------- Insert
function processInsert(param) {
    // 1. Check selection of row for editing
    //var TargetObj = { id: "grdData_Main", type: "GRID", grid: true, row: "selected" };
    //if (!checkSelected(TargetObj.id)) return false;

    // 2. Check status of row data for inserting

    // 3. Open link page to tabpage of parent page
    var args = {
        ID: gw_com_api.v_Stream.msg_linkPage,
        to: { type: "MAIN" },
        data: {
            page: "SRM_4520", title: "반입 등록",
            param: [
                { name: "io_no", value: "new" },
                { name: "element", value: param.element }
            ]
        }
    };
    gw_com_module.streamInterface(args);
}
//---------- Edit
function processEdit(param) {

    // 1. Check selection of row for editing
    var TargetObj = { id: "grdData_Main", type: "GRID", grid: true, row: "selected" };
    if (!checkSelected(TargetObj.id)) return false;

    // 2. Check status of row data for editing
    var ProcStat = gw_com_api.getValue(TargetObj.id, TargetObj.row, "pstat", true);
    if (ProcStat == "완료" || ProcStat == "취소") {
        gw_com_api.messageBox([
            { text: status + " 자료이므로 수정할 수 없습니다." }
        ], 420);
        return false;
    }

    // 3. Open link page to tabpage of parent page
    var args = {
        ID: gw_com_api.v_Stream.msg_linkPage,
        to: { type: "MAIN" },
        data: {
            page: "SRM_4520", title: "반입 수정",
            param: [
                { name: "io_no", value: gw_com_api.getValue(TargetObj.id, TargetObj.row, "io_no", true) }
            ]
        }
    };
    gw_com_module.streamInterface(args);

}
//----------
function processExport(param) {

    var ReportTitle = "";
    var strBarcode = "";
    var ids = gw_com_api.getSelectedRow("grdData_Sub", true);

    if (param.element == "라벨" || param.element == "라벨2") {
        //바코드 라벨 화면
        ReportTitle = (param.element == "라벨2" ? "물품라벨" : "라벨");
        if (ids.length < 1) {
            gw_com_api.messageBox([{ text: "선택된 대상이 없습니다." }]);
            return;
        }

        $.each(ids, function () {
            if (strBarcode.length > 0)
                strBarcode += ",";

            strBarcode += gw_com_api.getCellValue("GRID", "grdData_Sub", this, "barcode");
        });
    }
    else return;

    var args = {
        page: "SRM_4940",
        query: "SRM_4940_P",
        source: {
            type: "INLINE", json: true,
            argument: [
                { name: "arg_barcode", value: strBarcode.replace(/,/gi, "','") }
            ]
        },
        option: [
            { name: "PRINT", value: "PDF" },
            { name: "PAGE", value: "SRM_4940"/*gw_com_module.v_Current.window*/ },
            { name: "USER", value: gw_com_module.v_Session.USR_ID },
            { name: "TITLE", value: ReportTitle },
            { name: "BARCODE", value: strBarcode }
        ],
        target: { type: "FILE", id: "lyrDown", name: ReportTitle }
    };
    gw_com_module.objExport(args);

}
//----------
function processRetrieve(param) {

    // Validate Inupt Options
    var args = { target: [{ type: "FORM", id: "frmOption" }] };
    if (gw_com_module.objValidate(args) == false) return false;

    // Retrieve 
    var args = {
        key: param.key,
        source: {
            type: "FORM", id: "frmOption", hide: true,
            element: [
				{ name: "ymd_fr", argument: "arg_ymd_fr" },
				{ name: "ymd_to", argument: "arg_ymd_to" },
				{ name: "io_no", argument: "arg_io_no" }
            ],
            remark: [
	            { infix: "~", element: [{ name: "ymd_fr" }, { name: "ymd_to" }] },
		        { element: [{ name: "io_no" }] }
            ]
        },
        target: [
            { type: "GRID", id: "grdData_Main", focus: true, select: true }
        ],
        clear: [
			{ type: "GRID", id: "grdData_Sub" }
        ]
    };
    gw_com_module.objRetrieve(args);

}
//----------
function processLink(param) {

    var args = {
        key: param.key,
        source: {
            type: "GRID", id: "grdData_Main", row: "selected", block: true,
            element: [
				{ name: "io_no", argument: "arg_io_no" }
            ]
        },
        target: [
            { type: "GRID", id: "grdData_Sub" } //, focus: true, select: true }
        ]
    };
    gw_com_module.objRetrieve(args);

}
//---------- Start Deleting : processDelete => processRemove => successRemove
/*
function processDelete(ui) {
    gw_com_api.hide("frmOption");	// 조회 조건 입력 창 숨기기

    // 1. 삭제 후 Update까지 완료 : 주로 master data에 적용
    if (ui.object == "lyrMenu") {

        // 1-1. 삭제 대상 설정
        var args = {
            id: "grdData_Sub2", type: "GRID"
        	, grid: true, row: "selected", element: [{ name: "plan_no" }]
        };

        // 1-2. 처리 가능여부 확인
        if (gw_com_module.v_Session.USR_ID != gw_com_api.getValue(args.id, args.row, "acp_user", true)
    	 && gw_com_module.v_Session.USR_ID != gw_com_api.getValue(args.id, args.row, "ins_usr", true)
    	 && gw_com_module.v_Session.USR_ID != gw_com_api.getValue(args.id, args.row, "upd_usr", true)) {
            gw_com_api.messageBox([{ text: "삭제 권한이 없습니다" }], 420);
            return;
        }

        // 1-3. Record CRUD 상태에 따른 처리
        var crud = gw_com_api.getCRUD(args.id, args.row, args.grid);
        if (crud == "none")
            gw_com_api.messageBox([{ text: "NOMASTER" }]);
        else if (crud == "initialize" || crud == "create") 	//신규인 경우 화면 초기화
            gw_com_module.objClear({ target: [args] });
        else {
            // 삭제 여부 확인 후 삭제 처리 
            v_global.process.handler = processRemove;
            gw_com_api.messageBox([{ text: "REMOVE" }], 420, gw_com_api.v_Message.msg_confirmRemove, "YESNO", args);
        }
    }
        // 2. 화면에서만 삭제 : 주로 Sub Grid에 적용
    else if (ui.object == "lyrMenu_Sample") {
        var args = { targetid: "grdData_Sub", row: "selected" }
        gw_com_module.gridDelete(args);
    }
    else return;

}
*/
//---------- After confirmed removing
function processRemove(param) {
    // 주의 : 자체 삭제 처리 시에는 url 제거
    var args = {
        url: "COM",
        target: [{ type: param.type, id: param.id, key: [{ row: param.row, element: param.element }] }]
    };
    args.handler = { success: successRemove, param: param };
    gw_com_module.objRemove(args);
}
//---------- After Removing
function successRemove(response, param) {
    var args = { targetid: param.id, row: param.row }
    gw_com_module.gridDelete(args);
}
//---------- Start Saving : processSave => successSave
function processSave(param) {

    var args = {
        target: [
			{ type: "FORM", id: "frmData_Main" },
            { type: "GRID", id: "grdData_Sub" }
        ]
    };
    if (gw_com_module.objValidate(args) == false) return false;

    args.handler = { success: successSave };
    gw_com_module.objSave(args);

}
//---------- After Saving
function successSave(response, param) {

    $.each(response, function () {
        $.each(this.KEY, function () {
            if (this.NAME == "io_no") {
                v_global.logic.key = this.VALUE;
                processRetrieve({ key: v_global.logic.key });
            }
        });
    });

}
//----------
function popupDetail(ui) {
    //수정모드
}
//---------- Closing Process
function processClose(param) {
    var args = { ID: gw_com_api.v_Stream.msg_closePage };
    gw_com_module.streamInterface(args);
}
//----------
function closeDialogue(param) {

    var args = { page: param.page };
    gw_com_module.dialogueClose(args);
    if (param.focus) {
        gw_com_api.setFocus(v_global.event.object, v_global.event.row, v_global.event.element,
	                        (v_global.event.type == "GRID") ? true : false);
    }

}
//----------
function fileDownload(param) {
    var params =
    "?TYPE=" + encodeURIComponent("REPORT") +
    "&NAME=" + encodeURIComponent("SRM_4520/template_ExcelImport.xls");
    $("#" + "lyrDown_page").attr("src", "../Service/svc_Download.aspx" + params);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_showMessage: {
            gw_com_module.streamInterface(param);
        } break;
        case gw_com_api.v_Stream.msg_resultMessage: {
            if (param.data.page != gw_com_api.getPageID()) {
                param.to = { type: "POPUP", page: param.data.page };
                gw_com_module.streamInterface(param);
                break;
            }
            switch (param.data.ID) {
                case gw_com_api.v_Message.msg_confirmSave: {
                    if (param.data.result == "YES") processEdit(param.data.arg);
                    else if (v_global.process.handler != null) v_global.process.handler(param.data.arg);
                } break;
                case gw_com_api.v_Message.msg_informSaved: {
                    param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                } break;
                case gw_com_api.v_Message.msg_confirmRemove: {
                    if (param.data.result == "YES") processRemove(param.data.arg);
                } break;
                case gw_com_api.v_Message.msg_informRemoved: {
                    param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                } break;
                case gw_com_api.v_Message.msg_informBatched: {
                    param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                } break;
            }   // End of switch (param.data.ID)
        } break;    // End of case gw_com_api.v_Stream.msg_resultMessage
        case gw_com_api.v_Stream.msg_retrieve: {
            processRetrieve({ key: param.data.key });
        } break;
        case gw_com_api.v_Stream.msg_remove: {
            var args = { targetid: "grdData_Main", row: v_global.event.row }
            gw_com_module.gridDelete(args);
        } break;
        case gw_com_api.v_Stream.msg_openedDialogue: {
            var args = { to: { type: "POPUP", page: param.from.page } };
            switch (param.from.page) {
                case "INFO_VOC": {
                    args.ID = gw_com_api.v_Stream.msg_infoECR;
                } break;
            }
            args.data = {
                io_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "io_no", true)
            }
            gw_com_module.streamInterface(args);
        } break;
        case gw_com_api.v_Stream.msg_closeDialogue: {
            closeDialogue({ page: param.from.page });
        } break;
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//