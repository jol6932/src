﻿//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 화면명 : 시정조치 요구서 발행
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

    // entry point. (pre-process section)
    ready: function () {

        // initialize page.
        v_global.process.param = gw_com_module.initPage({ message: true });
        gw_com_api.changeTheme("style_theme");

        // set data for DDDW List
        var args = {
            request: [
                    {
                        type: "PAGE", name: "발생구분", query: "dddw_zcode",
                        param: [{ argument: "arg_hcode", value: "QDM010" }]
                    },
                    //{ type: "PAGE", name: "접수구분", query: "dddw_zcode",
                    //    param: [{ argument: "arg_hcode", value: "QDM020"}]
                    //},
                    {
                        type: "PAGE", name: "발행구분", query: "dddw_zcode",
                        param: [{ argument: "arg_hcode", value: "QDM021" }]
                    },
                    {
                        type: "PAGE", name: "진행상태", query: "dddw_zcode",
                        param: [{ argument: "arg_hcode", value: "QDM025" }]
                    },
                    {
                        type: "PAGE", name: "QDM026", query: "dddw_zcode",
                        param: [{ argument: "arg_hcode", value: "QDM026" }]
                    },
                    //{ type: "PAGE", name: "발행근거", query: "dddw_zcode",
                    //    param: [{ argument: "arg_hcode", value: "QDM030"}]
                    //},
                    //{ type: "PAGE", name: "처리방안", query: "dddw_zcode",
                    //    param: [{ argument: "arg_hcode", value: "QDM035"}]
                    //},
                    {
                        type: "PAGE", name: "처리상태", query: "dddw_zcode",
                        param: [{ argument: "arg_hcode", value: "QDM025" }]
                    },
                    //{ type: "INLINE", name: "합불판정",
                    //    data: [ { title: "합격", value: "1" }, { title: "불합격", value: "0" } ]
                    //},
                    {
                        type: "PAGE", name: "고객사", query: "DDDW_CM_CODE",
                        param: [{ argument: "arg_hcode", value: "ISCM29" }]
                    },
                    {
                        type: "PAGE", name: "LINE", query: "DDDW_CM_CODED",
                        param: [{ argument: "arg_hcode", value: "IEHM02" }]
                    },
                    {
                        type: "PAGE", name: "DEPT_AREA_FIND", query: "dddw_deptarea",
                        param: [{ argument: "arg_type", value: gw_com_module.v_Session.DEPT_AUTH }]
                    },
                    {
                        type: "INLINE", name: "일자",
                        data: [
                            { title: "발생일자", value: "발생일자" },
                            { title: "발행일자", value: "발행일자" }
                        ]
                    }
            ],
            starter: start
        };
        gw_com_module.selectSet(args);

        //----------
        function start() { 
        	gw_job_process.UI(); 
        	gw_job_process.procedure();
        }
    },

    // manage UI. (design section)
    UI: function () {

        //==== Main Menu : 조회, 접수, 반려, 닫기
        var args = {
            targetid: "lyrMenu", type: "FREE",
            element: [
				{ name: "조회", value: "조회", act: true },
				{ name: "상세", value: "NCR 조회", icon: "기타" },
				{ name: "추가", value: "시정조치발행/수정", icon: "추가" },
				//{ name: "저장", value: "NCR 수정", icon: "저장" },
				{ name: "닫기", value: "닫기" }
            ]
        };
        gw_com_module.buttonMenu(args);
        
        //==== Search Option : 
        var args = {
            targetid: "frmOption", type: "FREE", title: "조회 조건",
            trans: true, border: true, show: true, remark: "lyrRemark",
            editable: { focus: "astat", validate: true },
            content: {
                row: [
                        {
                            element: [
                                {
                                    name: "date_tp", label: { title: "" },
                                    style: { colfloat: "float" },
                                    editable: {
                                        type: "select",
                                        data: { memory: "일자" }
                                    }
                                },
                                {
                                    name: "ymd_fr", label: { title: "발생일자 :" }, mask: "date-ymd",
                                    style: { colfloat: "floating" },
                                    editable: { type: "text", size: 7, maxlength: 10 }
                                },
                                {
                                    name: "ymd_to", label: { title: "~" }, mask: "date-ymd",
                                    style: { colfloat: "floated" },
                                    editable: { type: "text", size: 7, maxlength: 10 }
                                },
                                {
                                    name: "issue_tp", label: { title: "발생구분 :" },
                                    editable: {
                                        type: "select", size: 7, maxlength: 20,
                                        data: { memory: "발생구분", unshift: [{ title: "전체", value: "" }] }
                                    }
                                },
                                {
                                    name: "astat", label: { title: "발행구분 :" }, value: "미발행",
                                    editable: {
                                        type: "select", size: 7, maxlength: 20,
                                        data: { memory: "발행구분", unshift: [{ title: "전체", value: "" }] }
                                    }
                                },
                                {
                                    name: "astat2", label: { title: "처리상태 :" },
                                    editable: {
                                        type: "select", size: 7, maxlength: 20,
                                        data: { memory: "처리상태", unshift: [{ title: "전체", value: "" }, { title: "미확인", value: "미확인" }] }
                                    }
                                }
                            ]
                        },
                        {
                            element: [
                                {
                                    name: "cust_cd", label: { title: "고객사 :" },
                                    editable: {
                                        type: "select", size: 1,
                                        data: { memory: "고객사", unshift: [{ title: "전체", value: "" }] },
                                        change: [{ name: "cust_dept", memory: "LINE", key: ["cust_cd"] }]
                                    }
                                },
                                {
                                    name: "cust_dept",
                                    label: { title: "LINE :" },
                                    editable: {
                                        type: "select", size: 1,
                                        data: { memory: "LINE", unshift: [{ title: "전체", value: "" }], key: ["cust_cd"] }
                                    }
                                },
                                {
                                    name: "prod_nm", label: { title: "설비명 :" },
                                    editable: { type: "text", size: 20, maxlength: 50 }
                                }
                            ]
                        },
                        {
                            element: [
                                {
                                    name: "issue_no", label: { title: "관리번호 :" },
                                    editable: { type: "text", size: 20, maxlength: 20 }
                                },
                                {
                                    name: "rqst_no", label: { title: "발행번호 :" },
                                    editable: { type: "text", size: 20, maxlength: 20 }
                                }
                            ]
                        },
                        {
                            element: [
                                {
                                    name: "dept_area", label: { title: "사업부 :" },
                                    editable: { type: "select", size: 7, maxlength: 20, data: { memory: "DEPT_AREA_FIND", unshift: [{ title: "전체", value: "%" }] } }
                                },
                                {
                                    name: "dept_nm", label: { title: "담당부서 :" },
                                    editable: { type: "text", size: 10 }, mask: "search"
                                },
                                { name: "dept_cd", hidden: true },
                                {
                                    name: "pstat", label: { title: "진행상태 :" },
                                    editable: { type: "select", size: 7, maxlength: 20, data: { memory: "QDM026", unshift: [{ title: "전체", value: "" }] } }
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
        var obj = document.getElementsByTagName("label");
        for (var i = 0; i < obj.length; i++) {
            var label = obj[i];
            if (label.innerHTML == "발생일자 :" || label.innerHTML == "발행일자 :") {
                label.style.display = "none";
            }
        }

        //==== Main Grid : 발생 내역
        var args = {
            targetid: "grdData_현황", query: "QDM_6210_M_1", title: "NCR 발행 내역",
            height: 400, show: true, selectable: true, dynamic: true, // number: true, multi: true, checkrow: true,
            color: { row: true },
            element: [
				{ header: "발행번호", name: "rqst_no", width: 70, align: "center" },
				{ header: "진행상태", name: "ncr_stat", width: 70, align: "center" },
				{ header: "진행상태", name: "pstat", width: 60, align: "center", editable: { type: "hidden" }, hidden: true },
				{ header: "발행일시", name: "astat_dt", width: 100, align: "center", hidden: true },
				{ header: "발행일자", name: "rqst_dt", width: 70, align: "center", mask: "date-ymd" },
				{ header: "발행자", name: "astat_user", width: 60, align: "center" },
				{ header: "설비명", name: "prod_nm", width: 150 },
				{ header: "부적합현상", name: "rmk", width: 300 },
                { header: "발생일자", name: "issue_dt", width: 70, align: "center", mask: "date-ymd" },
                { header: "처리요구일", name: "actrqst_dt", width: 70, align: "center", mask: "date-ymd" },
				{ header: "담당부서", name: "resp_dept_nm", width: 80 },
				{ header: "발생구분", name: "issue_tp", width: 50, align: "center" },
				{ header: "사업부", name: "dept_area_nm", width: 50, align: "center" },
				{ header: "발생부서", name: "dept_nm", width: 80 },
				{ header: "등록자", name: "issue_ins_usr_nm", width: 60, align: "center" },
				{ header: "관리번호", name: "issue_no", width: 70, align: "center" },
				{ header: "고객사", name: "cust_nm", width: 60 },
				{ header: "Line", name: "cust_dept", width: 60 },
				{ header: "등록일시", name: "ins_dt", width: 100, align: "center", hidden: true },
				{ header: "발행여부", name: "astat", width: 60, align: "center", hidden: true },
				//{ header: "발행비고", name: "astat_rmk", width: 200, align: "center" },
				{ header: "Process", name: "cust_proc", width: 60, hidden: true },
				{ header: "고객설비명", name: "cust_prod_nm", width: 150, hidden: true },
				{ header: "Project No.", name: "proj_no", width: 70, align: "center", hidden: true },
                { header: "제품유형", name: "prod_type", width: 100, align: "center", hidden: true },
				{ header: "Module", name: "prod_sub_nm", width: 100, align: "center", hidden: true },
				{ header: "Warranty", name: "wrnt_io", width: 60, align: "center", hidden: true },
				{ header: "교체부품명", name: "bpart_nm", width: 150, hidden: true },
                { name: "prod_key", hidden: true },
                { name: "dept_cd", hidden: true },
                { name: "cust_cd", hidden: true },
                { name: "color", hidden: true }
            ]
        };
        gw_com_module.gridCreate(args);
        
        //==== Sub Grid : 진행 이력
        var args = {
            targetid: "grdData_이력", query: "QDM_6110_S_1", title: "진행 이력",
            caption: true, height: 100, pager: false, show: true, selectable: true, key: true, dynamic: true,
            element: [
				{ header: "상태구분", name: "pstat", width: 120, align: "center" },
				{ header: "진행구분", name: "astat", width: 120, align: "center" },
				{ header: "최종진행자", name: "astat_user", width: 120, align: "center" },
				{ header: "최종진행일", name: "astat_dt", width: 120, align: "center" },
                { name: "prod_key", hidden: true }
            ]
        };
        gw_com_module.gridCreate(args);

        //==== Resize Objects
        var args = {
            target: [
				{ type: "GRID", id: "grdData_현황", offset: 8 },
                { type: "GRID", id: "grdData_이력", offset: 8 }
			]
        };
        gw_com_module.objResize(args);
        gw_com_module.informSize();

    },

    //==== manage process. (program section)
    procedure: function () {

        //==== Button Click : Main ====
        var args = { targetid: "lyrMenu", element: "조회", event: "click", handler: click_lyrMenu_조회 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_조회(ui) { viewOption(); }
        //----------
        var args = { targetid: "lyrMenu", element: "추가", event: "click", handler: click_lyrMenu_추가 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_추가(ui) { processInsert({ main: true }); }
        //----------
        var args = { targetid: "lyrMenu", element: "저장", event: "click", handler: click_lyrMenu_저장 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_저장(ui) { processSave({ main: true }); }
        //----------
        var args = { targetid: "lyrMenu", element: "상세", event: "click", handler: click_lyrMenu_상세 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_상세(ui) { processDetail(ui); }
        //----------
        var args = { targetid: "lyrMenu", element: "닫기", event: "click", handler: click_lyrMenu_닫기 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_닫기(ui) { processClose({}); }
        //----------
        
        //==== Button Click : Search Option ====
        var args = { targetid: "frmOption", element: "실행", event: "click", handler: click_frmOption_실행 };
        gw_com_module.eventBind(args);
        function click_frmOption_실행(ui) { processRetrieve({}); }
        //----------
        var args = { targetid: "frmOption", element: "취소", event: "click", handler: click_frmOption_취소 };
        gw_com_module.eventBind(args);
        function click_frmOption_취소(ui) { gw_com_api.hide("frmOption"); }
        //----------
        var args = { targetid: "frmOption", event: "itemdblclick", handler: processFind };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmOption", event: "itemkeyenter", handler: processFind };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmOption", event: "itemchanged", handler: processItemchanged };
        gw_com_module.eventBind(args);
        //----------

        //==== Grid Events : Main
        var args = { targetid: "grdData_현황", grid: true, event: "rowselected", handler: rowselected_grdData_현황 };
        gw_com_module.eventBind(args);
        function rowselected_grdData_현황(ui) { processLink(ui); }
        //----------
        var args = { targetid: "grdData_현황", grid: true, event: "rowdblclick", handler: rowdblclick_grdData_현황 };
        gw_com_module.eventBind(args);
        var args = { targetid: "grdData_현황", grid: true, event: "rowkeyenter", handler: rowdblclick_grdData_현황 };
        gw_com_module.eventBind(args);
        function rowdblclick_grdData_현황(ui) { popupDetail(ui); }

        //==== startup process.
        gw_com_api.setValue("frmOption", 1, "ymd_fr", gw_com_api.getDate("", { month: -1 }));
        gw_com_api.setValue("frmOption", 1, "ymd_to", gw_com_api.getDate(""));
        //gw_com_api.setValue("frmOption", 1, "dept_cd", gw_com_module.v_Session.DEPT_CD);
        //gw_com_api.setValue("frmOption", 1, "dept_nm", gw_com_module.v_Session.DEPT_NM);
        gw_com_module.startPage();

    }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//----------
function viewOption() {
    var args = { target: [ { id: "frmOption", focus: true } ] };
    gw_com_module.objToggle(args);
}
//----------
function processItemchanged(param) {
    if (param.object == "frmOption") {
        switch (param.element) {
            case "dept_nm":
                if (param.value.current == "") {
                    gw_com_api.setValue(param.object, param.row, param.element.substr(0, param.element.length - 2) + "cd", "", false, true, false);
                }
                break;
            case "date_tp":
                gw_com_api.setAttribute(param.object, 1, "ymd_fr", "label", param.value.current + " :");
                var obj = document.getElementsByTagName("label");
                for (var i = 0; i < obj.length; i++) {
                    var label = obj[i];
                    if (label.innerHTML == "발생일자 :" || label.innerHTML == "발행일자 :") {
                        label.innerHTML = param.value.current + " :"
                    }
                }
                break;
        }
    }
}
//----------
function processInsert(param) {
	
    if (gw_com_api.getSelectedRow("grdData_현황") == null) {
        gw_com_api.messageBox([ { text: "선택된 대상이 없습니다." } ], 300);
        return false;
    }

    var IssueNo = gw_com_api.getValue("grdData_현황", "selected", "issue_no", true);
    var IssueTp = gw_com_api.getValue("grdData_현황", "selected", "issue_tp", true);
    var IssueDept = gw_com_api.getValue("grdData_현황", "selected", "dept_nm", true);
    var IssueDt = gw_com_api.getValue("grdData_현황", "selected", "issue_dt", true);
    var ProdNm = gw_com_api.getValue("grdData_현황", "selected", "prod_nm", true);
    var ProcStat = gw_com_api.getValue("grdData_현황", "selected", "pstat", true);
    var RqstNo = getRqstNo({ issue_no: IssueNo });

    if (RqstNo != "") {

        processSave({ issue_no: IssueNo, rqst_no: RqstNo });

    } else if (ProcStat != "발생" && ProcStat != "반려" && ProcStat != "취소") {

        var args = {
            ID: gw_com_api.v_Stream.msg_linkPage,
            to: { type: "MAIN" },
            data: { page: "QDM_6220", title: "NCR 등록", 
                    param: [
                        { name: "issue_no", value: IssueNo },
                        { name: "issue_tp", value: IssueTp },
                        { name: "issue_dept", value: IssueDept },
                        { name: "issue_dt", value: IssueDt },
                        { name: "prod_nm", value: ProdNm }
                    ]
            }
        };
        gw_com_module.streamInterface(args);

    }
    else {

        gw_com_api.messageBox([{ text: "NCR 발행 가능 상태가 아닙니다." }], 300);
        return false;

    }
    
	return true;
}
//----------
function processSave( param ) {
	
    if (gw_com_api.getSelectedRow("grdData_현황") == null) {
        gw_com_api.messageBox([ { text: "선택된 대상이 없습니다." } ], 300);
        return false;
    }

    var ProcStat = gw_com_api.getValue("grdData_현황", "selected", "pstat", true);
    
    if ( ProcStat == "완료" || ProcStat == "취소" ) {
        gw_com_api.messageBox([
            { text: ProcStat + " 자료이므로 수정할 수 없습니다." }
        ], 420);
        return false;
    }

    var args = { ID: gw_com_api.v_Stream.msg_linkPage,
        to: { type: "MAIN" },
        data: { page: "QDM_6220", title: "NCR 수정",
            param: [
                { name: "issue_no", value: (param.issue_no ? param.issue_no : gw_com_api.getValue("grdData_현황", "selected", "issue_no", true)) },
                { name: "rqst_no", value: (param.rqst_no ? param.rqst_no : gw_com_api.getValue("grdData_현황", "selected", "rqst_no", true)) }
            ]
        }
    };
    gw_com_module.streamInterface(args);

}
//----------
function processDetail( param ) {
	
    if (gw_com_api.getSelectedRow("grdData_현황") == null) {
        gw_com_api.messageBox([ { text: "선택된 대상이 없습니다." } ], 300);
        return false;
    }

    var ProcStat = gw_com_api.getValue("grdData_현황", "selected", "pstat", true);
    
//    if ( ProcStat == "완료" || ProcStat == "취소" ) {
//        gw_com_api.messageBox([
//            { text: status + " 자료이므로 수정할 수 없습니다." }
//        ], 420);
//        return false;
//    }

    var args = { ID: gw_com_api.v_Stream.msg_linkPage,
        to: { type: "MAIN" },
        data: { page: "QDM_6220", title: "NCR 보기",
            param: [
            	{ name: "AUTH", value: "R" },
                { name: "issue_no", value: gw_com_api.getValue("grdData_현황", "selected", "issue_no", true) },
                { name: "rqst_no", value: gw_com_api.getValue("grdData_현황", "selected", "rqst_no", true) }
            ]
        }
    };
    gw_com_module.streamInterface(args);

}
//----------
function successSave(response, param) {
	processRetrieve({});
//    $.each(response, function () {
//        $.each(this.KEY, function () { 
//        	if (this.NAME == "issue_no") { 
//        		v_global.logic.key = this.VALUE;
//                processRetrieve({ key: v_global.logic.key }); 
//            }
//        });
//    });
}
//----------
function processDelete() {
}
//----------
function popupDetail(ui) {
    v_global.event.type = ui.type;
    v_global.event.object = ui.object;
    v_global.event.row = ui.row;
    v_global.event.element = ui.element;

    if (ui.object = "grdData_현황") {
        var LinkPage = "";
        var LinkID = gw_com_api.v_Stream.msg_infoECR;

        var LinkType = gw_com_api.getValue(ui.object, ui.row, "issue_tp", true);
        if (LinkType == "VOC") {
            LinkPage = "INFO_VOC";
            LinkID = gw_com_api.v_Stream.msg_infoECR;
        }
        else if (LinkType == "SPC") {
            LinkPage = "INFO_SPC";
            LinkID = gw_com_api.v_Stream.msg_infoECR;
        }
        else {
            LinkPage = "DLG_ISSUE";
            LinkID = gw_com_api.v_Stream.msg_infoAS;
        }

        var args = {
            type: "PAGE", page: LinkPage, title: "문제발생 상세 정보",
            width: 1100, height: 600, scroll: true, open: true, control: true, locate: ["center", "top"]
        };

        if (gw_com_module.dialoguePrepare(args) == false) {
            var args = { page: LinkPage,
                param: { ID: LinkID,
                    data: {
                        issue_no: gw_com_api.getValue(ui.object, ui.row, "issue_no", true),
                        voc_no: gw_com_api.getValue(ui.object, ui.row, "issue_no", true)
                    }
                }
            }
            gw_com_module.dialogueOpen(args);
        }
    }
}
//----------
function processRetrieve(param) {

	// Validate Inupt Options
    var args = { target: [ { type: "FORM", id: "frmOption" } ] };
    if (gw_com_module.objValidate(args) == false) return false;

    // Remark
    var remark = [
		{ element: [{ name: "issue_tp" }] },
		{ element: [{ name: "astat" }] },
		{ element: [{ name: "astat2" }] },
		{ element: [{ name: "cust_cd" }] },
		{ element: [{ name: "cust_dept" }] },
        { element: [{ name: "prod_nm" }] },
        { element: [{ name: "issue_no" }] },
        { element: [{ name: "rqst_no" }] },
        { element: [{ name: "dept_area" }] },
        { element: [{ name: "dept_nm" }] },
        { element: [{ name: "pstat" }] }
    ];
    if (gw_com_api.getValue("frmOption", 1, "issue_no") == "" && gw_com_api.getValue("frmOption", 1, "rqst_no") == "")
        remark.unshift({ infix: "~", element: [{ name: "ymd_fr" }, { name: "ymd_to" }] });

    // Retrieve
    var args = { key: param.key,
        source: {
            type: "FORM", id: "frmOption", hide: true,
            element: [
				{ name: "ymd_fr", argument: "arg_ymd_fr" },
				{ name: "ymd_to", argument: "arg_ymd_to" },
				{ name: "cust_cd", argument: "arg_cust_cd" },
				{ name: "cust_dept", argument: "arg_cust_dept" },
				{ name: "prod_nm", argument: "arg_prod_nm" },
                { name: "issue_tp", argument: "arg_issue_tp" },
                { name: "issue_no", argument: "arg_issue_no" },
                { name: "rqst_no", argument: "arg_rqst_no" },
                { name: "astat", argument: "arg_astat" },
                { name: "dept_area", argument: "arg_dept_area" },
                { name: "dept_cd", argument: "arg_dept_cd" },
                { name: "pstat", argument: "arg_pstat" },
                { name: "astat2", argument: "arg_d2_astat" },
                { name: "date_tp", argument: "arg_date_tp" }
            ],
            remark: remark
        },
        target: [
            { type: "GRID", id: "grdData_현황", focus: true, select: true }
	    ],
        clear: [
			{ type: "GRID", id: "grdData_이력" }
        ]
    };
    gw_com_module.objRetrieve(args);

}
//----------
function processLink(param) {

    var args = { key: param.key,
        source: { type: "GRID", id: "grdData_현황", row: "selected", block: true,
            element: [
				{ name: "issue_no", argument: "arg_issue_no" }
			]
        },
        target: [
            { type: "GRID", id: "grdData_이력" }
        ]
    };
    gw_com_module.objRetrieve(args);

}
//----------
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
function processFind(param) {
    v_global.event.type = param.type;
    v_global.event.object = param.object;
    v_global.event.row = param.row;
    v_global.event.element = param.element;

    var args;
    switch (param.element) {
        case "dept_nm":
            args = {
                type: "PAGE", page: "w_find_dept", title: "부서 검색",
                width: 600, height: 450, locate: ["center", "top"], open: true,
                id: gw_com_api.v_Stream.msg_selectDepartment,
                data: {
                    dept_nm: gw_com_api.getValue(v_global.event.object, v_global.event.row, v_global.event.element, (v_global.event.type == "GRID" ? true : false))
                }
            };
            break;
    }

    if (gw_com_module.dialoguePrepare(args) == false) {
        args = { page: args.page, param: { ID: args.id, data: args.data } };
        gw_com_module.dialogueOpen(args);
    }
}
//----------
function getRqstNo(param) {

    var rtn = "";
    var args = {
        request: "PAGE",
        url: "../Service/svc_Data_Retrieve_JSONs.aspx" +
                "?QRY_ID=QDM_6210_RQST" +
                "&QRY_COLS=rqst_no" +
                "&CRUD=R" +
                "&arg_issue_no=" + param.issue_no,
        handler_success: successRequest
    };
    //=================== async : false ========================
    $.ajaxSetup({ async: false });
    //----------
    gw_com_module.callRequest(args);
    function successRequest(data) {
        rtn = data[0].DATA[0];
    }
    //----------
    $.ajaxSetup({ async: true });
    //=================== async : true ========================
    return rtn

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
                    case gw_com_api.v_Message.msg_confirmSave:
                        {
                            if (param.data.result == "YES") processSave(param.data.arg);
                            else { var status = checkCRUD({});
                                if (status == "initialize" || status == "create") processDelete({});
                                else if (status == "update") processRestore({});
                                if (v_global.process.handler != null) v_global.process.handler(param.data.arg);
                            }
                        } break;
                    case gw_com_api.v_Message.msg_confirmRemove:
                        { if (param.data.result == "YES") processRemove(param.data.arg); } break;
                    case gw_com_api.v_Message.msg_informSaved:
                        {
                            param.data.arg.handler(param.data.arg.response, param.data.arg.param); 
                        } break;
                    case gw_com_api.v_Message.msg_informRemoved:
                        { param.data.arg.handler(param.data.arg.response, param.data.arg.param); } break;
                    case gw_com_api.v_Message.msg_informBatched:
                        { param.data.arg.handler(param.data.arg.response, param.data.arg.param); } break;
			    }   // End of switch (param.data.ID)
			} break;    // End of case gw_com_api.v_Stream.msg_resultMessage
        case gw_com_api.v_Stream.msg_retrieve:
            {
                processRetrieve({ key: param.data.key });
            }
            break;
        case gw_com_api.v_Stream.msg_remove:
            {
                var args = { targetid: "grdData_현황", row: v_global.event.row }
                gw_com_module.gridDelete(args);
            } break;
        case gw_com_api.v_Stream.msg_openedDialogue: {   
            	var args = { to: { type: "POPUP", page: param.from.page } };
                switch (param.from.page) {
                    case "INFO_VOC": {
                        args.ID = gw_com_api.v_Stream.msg_infoECR;
                        args.data = {
                            issue_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true),
                            voc_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true)
                        }
                    } break;
                    case "INFO_SPC": {
                        args.ID = gw_com_api.v_Stream.msg_infoECR;
                        args.data = {
                            issue_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true),
                            voc_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true)
                        }
                    } break;
                    case "DLG_ISSUE": {
                        args.ID = gw_com_api.v_Stream.msg_infoAS;
                        args.data = {
                            issue_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true),
                            voc_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true)
                        }
                    } break;
                    case "w_find_dept":
                        {
                            args.ID = gw_com_api.v_Stream.msg_selectDepartment;
                            args.data = {
                                dept_nm: gw_com_api.getValue(v_global.event.object, v_global.event.row, v_global.event.element, (v_global.event.type == "GRID" ? true : false))
                            }
                        }
                        break;
                }
                gw_com_module.streamInterface(args);
            } break;
        case gw_com_api.v_Stream.msg_closeDialogue:
            {
                switch (param.from.page) {
                    case "":
                        break;
                }
                closeDialogue({ page: param.from.page });
            }
            break;
        case gw_com_api.v_Stream.msg_selectedDepartment:
            {
                gw_com_api.setValue(
                                    v_global.event.object,
                                    v_global.event.row,
                                    v_global.event.element,
                                    param.data.dept_nm,
                                    (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(
                                    v_global.event.object,
			                        v_global.event.row,
			                        v_global.event.element.substr(0, v_global.event.element.length - 2) + "cd",
			                        param.data.dept_cd,
			                        (v_global.event.type == "GRID") ? true : false);
                closeDialogue({ page: param.from.page, focus: true });

            }
            break;
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//