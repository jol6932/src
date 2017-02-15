﻿//------------------------------------------
// Process about Job Process.
//                Created by Professor.X, GoodWare (2011.04)
//------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// variables.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var v_global = {
    event: { type: null, object: null, row: null, element: null },
    process: { param: null, entry: null, act: null, handler: null, current: {}, prev: {} },
    data: null, logic: {}
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// process.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var gw_job_process = {

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // entry point. (pre-process section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //#region
    ready: function () {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // initialize page.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        v_global.process.param = gw_com_module.initPage({ message: true });
        //----------
        gw_com_api.changeTheme("style_theme");

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // set data.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // set data for DDDW List
        var args = {
            request: [
                {
                    type: "INLINE", name: "교육비구분",
                    data: [
                        { title: "-", value: "0" },
                        { title: "취학전", value: "1" },
                        { title: "초등학교", value: "2" },
                        { title: "중학교", value: "3" },
                        { title: "고등학교", value: "4" },
                        { title: "대학교", value: "5" }
                    ]
                }
            ],
            starter: start
        };
        gw_com_module.selectSet(args);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // go next.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        function start() {

            gw_job_process.UI();

        }

    },
    //#endregion

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // manage UI. (design section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //#region
    UI: function () {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // define UI.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //=====================================================================================
        var args = {
            targetid: "lyrMenu", type: "FREE",
            element: [
				//{ name: "조회", value: "조회", act: true },
				{ name: "저장", value: "확인" },
				{ name: "닫기", value: "닫기" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "frmOption", type: "FREE",
            trans: true, border: true, show: false, remark: "lyrRemark2",
            editable: { bind: "open", focus: "emp_no", validate: true },
            content: {
                row: [
                    {
                        element: [
				            {
				            	name: "emp_no", label: { title: "사원번호 :" },
				                editable: { type: "text", size: 12, maxlength: 20 }
				            },
				            {
				                name: "emp_nm", label: { title: "사원명 :" },
				                editable: { type: "text", size: 12, maxlength: 50 }
				            },
				            {
				                name: "taxadj_year", label: { title: "귀속연도 :" },
				                editable: { type: "text", size: 12, maxlength: 50 }
				            },
				            { name: "실행", act: true, show: false, format: { type: "button" } }
				        ]
                    }
				]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmOption2", type: "FREE", title: "교육비구분",
            trans: true, show: false, border: false, align: "left",
            editable: { bind: "open", focus: "child_yn", validate: true },
            content: {
                row: [
                    {
                        element: [
				            {
				                name: "child_yn", label: { title: "교육비구분 :" },
				                editable: { type: "select", data: { memory: "교육비구분" } }
				            }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        //var args = {
        //    targetid: "frmData_MAIN", query: "HRM_2030_2", type: "TABLE", title: "인적공제",
        //    caption: false, show: true, selectable: true,
        //    editable: { bind: "open", focus: "deduct11_amt", validate: true },
        //    content: {
        //        width: { label: 50, field: 50 }, height: 30,
        //        row: [
        //            {
        //                element: [
        //                    { header: true, value: "국세청", format: { type: "label" }, style: { rowspan: 4 } },
        //                    { header: true, value: "보험료", format: { type: "label" } },
        //                    { name: "deduct11_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "의료비", format: { type: "label" } },
        //                    { name: "deduct21_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "교육비", format: { type: "label" } },
        //                    { name: "deduct61_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "신용카드등", format: { type: "label" } },
        //                    { name: "deduct31_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "직불카드등", format: { type: "label" } },
        //                    { name: "deduct71_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "대중교통이용분", format: { type: "label" } },
        //                    { name: "deduct91_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "현금영수증", format: { type: "label" } },
        //                    { name: "deduct41_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "전통시장분", format: { type: "label" } },
        //                    { name: "deduct81_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "기부금", format: { type: "label" } },
        //                    { name: "deduct51_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "특수교육비", format: { type: "label" } },
        //                    { name: "deducta1_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "", format: { type: "label" } },
        //                    { name: "", editable: { type: "hidden", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "", format: { type: "label" } },
        //                    { name: "", editable: { type: "hidden", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "기타", format: { type: "label" }, style: { rowspan: 4 } },
        //                    { header: true, value: "보험료", format: { type: "label" } },
        //                    { name: "deduct12_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "의료비", format: { type: "label" } },
        //                    { name: "deduct22_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "교육비", format: { type: "label" } },
        //                    { name: "deduct62_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "신용카드등", format: { type: "label" } },
        //                    { name: "deduct32_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "직불카드등", format: { type: "label" } },
        //                    { name: "deduct72_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "대중교통이용분", format: { type: "label" } },
        //                    { name: "deduct92_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "현금영수증", format: { type: "label" } },
        //                    { name: "deduct42_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "전통시장분", format: { type: "label" } },
        //                    { name: "deduct82_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "기부금", format: { type: "label" } },
        //                    { name: "deduct52_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            },
        //            {
        //                element: [
        //                    { header: true, value: "특수교육비", format: { type: "label" } },
        //                    { name: "deducta2_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "", format: { type: "label" } },
        //                    { name: "", editable: { type: "hidden", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
        //                    { header: true, value: "", format: { type: "label" } },
        //                    { name: "", editable: { type: "hidden", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
        //                ]
        //            }
        //        ]
        //    }
        //};
        ////----------
        //gw_com_module.formCreate(args);
        createDW({});
        ////=====================================================================================
        //var args = {
        //    target: [
		//		{ type: "FORM", id: "frmData_MAIN", offset: 8 }
		//	]
        //};
        ////----------
        //gw_com_module.objResize(args);
        //=====================================================================================
        //----------
        gw_com_module.informSize();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // go next.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        gw_job_process.procedure();

    },
    //#endregion

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // manage process. (program section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //#region
    procedure: function () {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // define event.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //=====================================================================================
        //var args = { targetid: "lyrMenu", element: "조회", event: "click", handler: processButton };
        //gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu", element: "저장", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu", element: "닫기", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmOption", element: "실행", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //=====================================================================================
        //var args = { targetid: "frmData_MAIN", event: "itemchanged", handler: processItemchanged };
        //gw_com_module.eventBind(args);
        //=====================================================================================

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // event handler.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        function processButton(param) {
            switch (param.element) {
                case "조회":
                    processRetrieve({});
                    break;
                case "저장":
                    informResult({});
                    break;
                case "닫기":
                    processClose({});
                    break;
                case "실행":
                    processRetrieve({});
                    break;
            }
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // startup process.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        gw_com_module.startPage();
        //----------
        var args = {
            ID: gw_com_api.v_Stream.msg_openedDialogue
        };
        gw_com_module.streamInterface(args);

    }
    //#endregion

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
processRetrieve = function (param) {

    var args = {
        source: {
            type: "FORM", id: "frmOption", hide: true,
            element: [
				{ name: "emp_no", argument: "arg_emp_no" },
                { name: "taxadj_year", argument: "arg_taxadj_year" }
            ],
            remark: [
                { element: [{ name: "taxadj_year" }] },
                { element: [{ name: "emp_nm" }] }
            ]
        },
        target: [
			{ type: "FORM", id: "frmData_MAIN", focus: true, select: true }
		],
        key: param.key
    };
    gw_com_module.objRetrieve(args);

};
//----------
function processItemchanged(param) {

    if (param.object == "frmData_MAIN") {
    }

}
//----------
function processClose(param) {

    var args = {
        ID: gw_com_api.v_Stream.msg_closeDialogue,
        data: param.data
    };
    gw_com_module.streamInterface(args);

}
//----------
function informResult() {

    var data = new Object();

    if (v_global.logic.popup_data.family_rel == "0"){
        data.child_yn = "0";                                               // 본인
    } else {
        data.child_yn = gw_com_api.getValue("frmOption2", 1, "child_yn");  // 가족
        if (Number(gw_com_api.getValue("frmData_MAIN", 1, "deduct61_amt")) > 0
            || Number(gw_com_api.getValue("frmData_MAIN", 1, "deduct62_amt")) > 0) {
            if ($.inArray(data.child_yn, ["", "0"]) >= 0) {
                //gw_com_api.setError(true, "frmOption2", 1, "child_yn");
                //gw_com_api.setFocus("frmOption2", 1, "child_yn");
                gw_com_api.messageBox([{ text: "교육비구분 항목을 입력하세요." }], 320, gw_com_api.v_Message.msg_alert, "ALERT", { type: "chk_child_yn" });
                return;
            }
        }
    }
    //gw_com_api.setError(false, "frmOption2", 1, "child_yn");
    for (var name in v_global.logic.popup_data) {
        if (v_global.logic.popup_data.hasOwnProperty(name)) {
            if (name.substring(0, 1) == "_") continue;
            var val = gw_com_api.getValue("frmData_MAIN", 1, name);
            if (val != undefined)
                data[name] = val;
        }
    }
    processClose({ data: data });
    gw_com_api.setValue("frmOption2", 1, "child_yn", "0");  //초기화

}
//----------
function setRowData() {

    var data = new Array();
    for (var name in v_global.logic.popup_data) {
        if (v_global.logic.popup_data.hasOwnProperty(name)) {
            if (name.substring(0, 1) == "_") continue;
            var val = v_global.logic.popup_data[name];
            if (val != undefined)
                data.push({ name: name, value: val });
        }
    }
    var args = {
        targetid: "frmData_MAIN", edit: true, updatable: true,
        data: data
    };
    gw_com_module.formInsert(args);

    gw_com_api.setValue("frmOption2", 1, "child_yn", v_global.logic.popup_data.child_yn);
    if (v_global.logic.popup_data.family_rel == "0") {
        // 본인
        gw_com_api.hide("frmOption2");
    } else {
        // 가족
        gw_com_api.show("frmOption2");
    }

}
//----------
function createDW(param) {

    //=====================================================================================
    var args = {
        targetid: "frmData_MAIN", query: "HRM_2030_2", type: "TABLE", title: "인적공제",
        caption: false, show: true, selectable: true,
        editable: { bind: "open", focus: "deduct11_amt", validate: true },
        content: {
            width: { label: 50, field: 50 }, height: 30,
            row: [
                {
                    element: [
                        { header: true, value: "국세청", format: { type: "label" }, style: { rowspan: 4 } },
                        { header: true, value: "건강고용보험", format: { type: "label" } },
                        { name: "deductb1_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "보장성보험", format: { type: "label" } },
                        { name: "deduct11_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "보장성보험<br />(장애인전용)", format: { type: "label" } },
                        { name: "deducta1_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "의료비", format: { type: "label" } },
                        { name: "deduct21_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "교육비", format: { type: "label" } },
                        { name: "deduct61_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "", format: { type: "label" } },
                        { name: "" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "신용카드등", format: { type: "label" } },
                        { name: "deduct31_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "직불카드등", format: { type: "label" } },
                        { name: "deduct71_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "대중교통이용분", format: { type: "label" } },
                        { name: "deduct91_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "현금영수증", format: { type: "label" } },
                        { name: "deduct41_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "전통시장분", format: { type: "label" } },
                        { name: "deduct81_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "기부금", format: { type: "label" } },
                        { name: "deduct51_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "기타", format: { type: "label" }, style: { rowspan: 4 } },
                        { header: true, value: "건강고용보험", format: { type: "label" } },
                        { name: "deductb2_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "보장성보험", format: { type: "label" } },
                        { name: "deduct12_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "보장성보험<br />(장애인전용)", format: { type: "label" } },
                        { name: "deducta2_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "의료비", format: { type: "label" } },
                        { name: "deduct22_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "교육비", format: { type: "label" } },
                        { name: "deduct62_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "", format: { type: "label" } },
                        { name: "" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "신용카드등", format: { type: "label" } },
                        { name: "deduct32_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "직불카드등", format: { type: "label" } },
                        { name: "deduct72_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "대중교통이용분", format: { type: "label" } },
                        { name: "deduct92_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
                    ]
                },
                {
                    element: [
                        { header: true, value: "현금영수증", format: { type: "label" } },
                        { name: "deduct42_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "전통시장분", format: { type: "label" } },
                        { name: "deduct82_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" },
                        { header: true, value: "기부금", format: { type: "label" } },
                        { name: "deduct52_amt", editable: { type: "text", maxlength: 10, width: 116 }, align: "right", mask: "numeric-int" }
                    ]
                }
            ]
        }
    };
    //----------
    if (!param.editable) {
        $.each(args.content.row, function () {
            for (i = 0; i < this.element.length; i++) {
                if (this.element[i].editable) {
                    this.element[i].editable.type = "hidden";
                }
            }
        });
    }
    //----------
    gw_com_module.formCreate(args);
    //=====================================================================================
    var args = {
        target: [
            { type: "FORM", id: "frmData_MAIN", offset: 8 }
        ]
    };
    //----------
    gw_com_module.objResize(args);
    //=====================================================================================
    var args = { targetid: "frmData_MAIN", event: "itemchanged", handler: processItemchanged };
    gw_com_module.eventBind(args);
    //=====================================================================================

}
//----------
var TaxAdj = {
    close: function (param) {
        var rtn = false;
        var year = (v_global.logic.popup_data == undefined || v_global.logic.popup_data.taxadj_year == undefined ? "" : v_global.logic.popup_data.taxadj_year);
        var emp_no = (v_global.logic.popup_data == undefined || v_global.logic.popup_data.emp_no == undefined ? "" : v_global.logic.popup_data.emp_no);
        var args = {
            request: "PAGE",
            url: "../Service/svc_Data_Retrieve_JSONs.aspx" +
                    "?QRY_ID=HRM_TAXADJ_MASTER" +
                    "&QRY_COLS=close_yn" +
                    "&CRUD=R" +
                    "&arg_year=" + year + "&arg_emp_no=" + emp_no,
            handler_success: successRequest
        };
        //=================== async : false ========================
        $.ajaxSetup({ async: false });
        //----------
        gw_com_module.callRequest(args);
        function successRequest(data) {
            rtn = (data[0].DATA[0] == "1" ? true : false);
        }
        //----------
        $.ajaxSetup({ async: true });
        //=================== async : true ========================
        return rtn
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_openedDialogue:
            {
                if (!v_global.logic.init) {
                    v_global.logic.init = true;
                    $("#lyrRemark3").css("color", "red");
                    $("#lyrRemark3").css("font-weight", "bold");
                    $("#lyrRemark3").text("[확인] 버튼을 누른 후 [연말정산기준입력] 화면의 [저장] 버튼을 눌러야 변경된 내용이 적용됩니다.");
                }
                v_global.logic.popup_data = param.data;
                v_global.logic.close = TaxAdj.close();
                createDW({ editable: !v_global.logic.close });
                setRowData();
                $("#lyrRemark2").text("[성명 : " + param.data.family_nm + "]");
                if (v_global.logic.close) {
                    gw_com_api.hide("lyrMenu_저장");
                } else {
                    gw_com_api.show("lyrMenu_저장");
                }
            }
            break;
        case gw_com_api.v_Stream.msg_resultMessage:
            {
                if (param.data.page != gw_com_api.getPageID())
                    break;

                switch (param.data.ID) {
                    case gw_com_api.v_Message.msg_alert:
                        switch (param.data.arg.type) {
                            case "chk_child_yn":
                                var $wrapper = $("#frmOption2_child_yn").parent();
                                $("a.jqTransformSelectOpen", $wrapper).click();
                                break;
                        }
                        break;
                }
            }
            break;
    }

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//