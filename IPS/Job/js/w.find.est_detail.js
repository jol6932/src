﻿//------------------------------------------
// Process about Job Process.
//                Created by Professor.X, GoodWare (2011.04)
//------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// variables.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var v_global = {
    event: {
        type: null,
        object: null,
        row: null,
        element: null
    },
    process: {
        param: null,
        init: false,
        entry: null,
        act: null,
        handler: null,
        current: {},
        prev: {}
    },
    data: null,
    logic: {}
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

        //----------
        var args = {
            request: [
                {
                    type: "PAGE", name: "화폐", query: "dddw_mat_monetary_unit"
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
            targetid: "lyrMenu_1",
            type: "FREE",
            element: [
                {
                    name: "조회",
                    value: "조회",
                    act: true
                },
				{
				    name: "닫기",
				    value: "닫기"
				}
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "lyrMenu_2",
            type: "FREE",
            element: [
				{
				    name: "추가",
				    value: "선택복사",
				    icon: "추가"
				},
                {
                    name: "전송",
                    value: "내역전송",
                    icon: "실행"
                }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "frmOption",
            type: "FREE",
            title: "조회 조건",
            width: "240px",
            trans: true,
            show: true,
            border: false,
            align: "left",
            editable: {
                focus: "est_nm",
                validate: true
            },
            content: {
                row: [
                    {
                        element: [
				            {
				                name: "est_nm",
				                label: {
				                    title: "견적명 :"
				                },
				                mask: "search",
				                editable: {
				                    type: "text",
				                    size: 20,
				                    readonly: true,
				                    validate: {
				                        rule: "required",
				                        message: "견적명"
				                    }
				                }
				            },
                            {
                                name: "est_key",
                                hidden: true
                            },
                            {
                                name: "revision",
                                hidden: true
                            },
				            {
				                name: "실행",
				                act: true,
				                show: false,
				                format: {
				                    type: "button"
				                }
				            }
				        ]
                    }
				]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_목록",
            query: "w_find_est_detail_M_1",
            title: "을지 목록",
            height: 307,
            pager: false,
            show: true,
            element: [
				{
				    header: "제품분류",
				    name: "model_nm",
				    width: 270,
				    align: "left",
				    mask: "search"
				},
				{
				    header: "수량",
				    name: "model_qty",
				    width: 50,
				    align: "center",
				    mask: "numeric-int"
				},
				{
				    header: "견적금액(￦)",
				    name: "est_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "견적합계(￦)",
				    name: "est_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "NEGO율(%)",
				    name: "nego_rate",
				    width: 60,
				    align: "center",
				    mask: "numeric-float"
				},
				{
				    header: "NEGO금액(￦)",
				    name: "nego_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "NEGO합계(￦)",
				    name: "nego_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "자재금액(￦)",
				    name: "mat_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "자재합계(￦)",
				    name: "mat_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "추가분류(1)",
				    name: "index_div1",
				    width: 150,
				    align: "left"
				},
				{
				    header: "추가분류(2)",
				    name: "index_div2",
				    width: 150,
				    align: "left"
				},
				{
				    header: "추가분류(3)",
				    name: "index_div3",
				    width: 150,
				    align: "left"
				},
				{
				    header: "비고",
				    name: "rmk",
				    width: 400,
				    align: "left"
				},
				{
				    name: "model_class1",
				    hidden: true
				},
				{
				    name: "model_class2",
				    hidden: true
				},
				{
				    name: "model_class3",
				    hidden: true
				},
				{
				    name: "est_key",
				    hidden: true
				},
				{
				    name: "revision",
				    hidden: true
				},
				{
				    name: "model_seq",
				    hidden: true
				}
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_내역",
            query: "w_find_est_detail_M_2",
            title: "세부 내역",
            height: 307,
            pager: false,
            show: true,
            multi: true,
            key: true,
            group: [
                { element: "title_div2", show: false, summary: false }
            ],
            nogroup: true,
            element: [
                {
                    header: "분류",
                    name: "title_div2",
                    width: 150,
                    align: "left"
                },
				{
				    header: "품명",
				    name: "mat_nm",
				    width: 200,
				    align: "left",
				    summary: { title: "  ▶ 소계" }
				},
				{
				    header: "규격",
				    name: "mat_spec",
				    width: 200,
				    align: "left"
				},
				{
				    header: "단위",
				    name: "mat_unit",
				    width: 50,
				    align: "center"
				},
				{
				    header: "수량",
				    name: "item_qty",
				    width: 60,
				    align: "right",
				    mask: "numeric-float",
				    summary: { type: "sum" }
				},
				{
				    header: "견적단가(￦)",
				    name: "est_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int",
				    summary: { type: "sum" }
				},
				{
				    header: "견적금액(￦)",
				    name: "est_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int",
				    summary: { type: "sum" }
				},
				{
				    header: "자재화폐",
				    name: "monetary_nm",
				    width: 60,
				    align: "center",
				    format: {
				        type: "select",
				        data: {
				            memory: "화폐"
				        }
				    }
				},
				{
				    header: "자재원가",
				    name: "mat_price",
				    width: 100,
				    align: "right",
				    mask: "currency-float"
				},
				{
				    header: "자재단가",
				    name: "mat_ucost",
				    width: 100,
				    align: "right",
				    mask: "currency-float"
				},
				{
				    header: "자재금액",
				    name: "mat_uamt",
				    width: 100,
				    align: "right",
				    mask: "currency-float"
				},
				{
				    header: "자재단가(￦)",
				    name: "mat_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int",
				    summary: { type: "sum" }
				},
				{
				    header: "자재금액(￦)",
				    name: "mat_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int",
				    summary: { type: "sum" }
				},
				{
				    header: "자재표시명",
				    name: "mat_tnm",
				    width: 200,
				    align: "left"
				},
				{
				    header: "자재그룹",
				    name: "mat_group",
				    width: 150,
				    align: "center"
				},
				{
				    header: "자재번호",
				    name: "mat_sno",
				    width: 100,
				    align: "center"
				},
				{
				    header: "비고",
				    name: "rmk",
				    width: 400,
				    align: "left"
				},
				{
				    name: "title_div1",
				    hidden: true
				},
				{
				    name: "sort_num",
				    hidden: true
				},
				{
				    name: "mat_cd",
				    hidden: true
				},
				{
				    name: "mat_categorize",
				    hidden: true
				},
				{
				    name: "mat_maker",
				    hidden: true
				},
				{
				    name: "monetary_unit",
				    hidden: true
				},
				{
				    name: "est_key",
				    hidden: true
				},
				{
				    name: "revision",
				    hidden: true
				},
                {
                    name: "model_seq",
                    hidden: true
                },
				{
				    name: "item_seq",
				    hidden: true
				}
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_선택",
            title: "선택 내역",
            caption: true,
            height: 307,
            pager: false,
            show: true,
            key: true,
            nogroup: true,
            element: [
                {
                    header: "분류",
                    name: "title_div2",
                    width: 150,
                    align: "left"
                },
				{
				    header: "품명",
				    name: "mat_nm",
				    width: 200,
				    align: "left"
				},
				{
				    header: "규격",
				    name: "mat_spec",
				    width: 200,
				    align: "left"
				},
				{
				    header: "단위",
				    name: "mat_unit",
				    width: 50,
				    align: "center"
				},
				{
				    header: "수량",
				    name: "item_qty",
				    width: 60,
				    align: "right",
				    mask: "numeric-float"
				},
				{
				    header: "견적단가(￦)",
				    name: "est_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "견적금액(￦)",
				    name: "est_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "자재화폐",
				    name: "monetary_nm",
				    width: 60,
				    align: "center",
				    format: {
				        type: "select",
				        data: {
				            memory: "화폐"
				        }
				    }
				},
				{
				    header: "자재원가",
				    name: "mat_price",
				    width: 100,
				    align: "right",
				    mask: "currency-float"
				},
				{
				    header: "자재단가",
				    name: "mat_ucost",
				    width: 100,
				    align: "right",
				    mask: "currency-float"
				},
				{
				    header: "자재금액",
				    name: "mat_uamt",
				    width: 100,
				    align: "right",
				    mask: "currency-float"
				},
				{
				    header: "자재단가(￦)",
				    name: "mat_cost",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "자재금액(￦)",
				    name: "mat_amt",
				    width: 100,
				    align: "right",
				    mask: "currency-int"
				},
				{
				    header: "자재표시명",
				    name: "mat_tnm",
				    width: 200,
				    align: "left"
				},
				{
				    header: "자재그룹",
				    name: "mat_group",
				    width: 150,
				    align: "center"
				},
				{
				    header: "자재번호",
				    name: "mat_sno",
				    width: 100,
				    align: "center"
				},
				{
				    header: "비고",
				    name: "rmk",
				    width: 400,
				    align: "left"
				},
				{
				    name: "title_div1",
				    hidden: true
				},
				{
				    name: "sort_num",
				    hidden: true
				},
				{
				    name: "mat_cd",
				    hidden: true
				},
				{
				    name: "mat_categorize",
				    hidden: true
				},
				{
				    name: "mat_maker",
				    hidden: true
				},
				{
				    name: "monetary_unit",
				    hidden: true
				},
				{
				    name: "est_key",
				    hidden: true
				},
				{
				    name: "revision",
				    hidden: true
				},
                {
                    name: "model_seq",
                    hidden: true
                },
				{
				    name: "item_seq",
				    hidden: true
				}
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            tabid: "lyrTab",
            target: [
				{
				    type: "GRID",
				    id: "grdData_목록",
				    title: "을지 목록"
				},
				{
				    type: "GRID",
				    id: "grdData_내역",
				    title: "세부 내역"
				}
			]
        };
        //----------
        gw_com_module.convertTab(args);
        //=====================================================================================
        var args = {
            target: [
                {
                    type: "GRID",
                    id: "grdData_목록",
                    offset: 8
                },
				{
				    type: "GRID",
				    id: "grdData_내역",
				    offset: 8
				},
				{
				    type: "GRID",
				    id: "grdData_선택",
				    offset: 8
				},
				{
				    type: "TAB",
				    id: "lyrTab",
				    offset: 8
				}
			]
        };
        //----------
        gw_com_module.objResize(args);
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

        //----------
        var args = {
            targetid: "lyrMenu_1",
            element: "조회",
            event: "click",
            handler: click_lyrMenu_1_조회
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu_1",
            element: "닫기",
            event: "click",
            handler: click_lyrMenu_1_닫기
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu_2",
            element: "추가",
            event: "click",
            handler: click_lyrMenu_2_추가
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu_2",
            element: "전송",
            event: "click",
            handler: click_lyrMenu_2_전송
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "frmOption",
            element: "실행",
            event: "click",
            handler: click_frmOption_실행
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "frmOption",
            event: "itemdblclick",
            handler: itemdblclick_frmOption
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "frmOption",
            event: "itemkeyenter",
            handler: itemdblclick_frmOption
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrTab",
            event: "tabselect",
            handler: click_lyrTab_tabselect
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "grdData_목록",
            grid: true,
            event: "rowselected",
            handler: rowselected_grdData_목록
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "grdData_목록",
            grid: true,
            event: "rowdblclick",
            handler: rowdblclick_grdData_목록
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "grdData_선택",
            grid: true,
            event: "rowdblclick",
            handler: rowdblclick_grdData_선택
        };
        gw_com_module.eventBind(args);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // event handler.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        function click_lyrMenu_1_조회() {

            v_global.process.handler = processRetrieve;

            //if (!checkSendable({ check: true })) return;

            processRetrieve({});

        }
        //----------
        function click_lyrMenu_1_닫기(ui) {

            v_global.process.handler = processClose;

            if (!checkSendable({ check: true })) return;

            processClose({});

        }
        //----------
        function click_lyrMenu_2_추가() {

            v_global.process.handler = processCopy;

            if (!checkSendable({ copy: true })) return;

            processCopy({});

        }
        //----------
        function click_lyrMenu_2_전송() {

            v_global.process.handler = informResult;

            if (!checkSendable({})) return;

            informResult({});

        }
        //---------
        function click_frmOption_실행(ui) {

            v_global.process.handler = processRetrieve;

            //if (!checkSendable({ check: true })) return;

            processRetrieve({});

        }
        //----------
        function click_lyrTab_tabselect(ui) {

            v_global.process.current.tab = ui.row;

        }
        //----------
        function rowselected_grdData_목록(ui) {

            processLink({});

        };
        //----------
        function rowdblclick_grdData_목록(ui) {

            gw_com_api.selectTab("lyrTab", 2);

        }
        //----------
        function rowdblclick_grdData_선택(ui) {

            var args = {
                targetid: ui.object,
                row: ui.row,
                remove: true
            };
            gw_com_module.gridDelete(args);

        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // startup process.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        gw_com_module.startPage();
        //----------
        v_global.process.current.tab = 1;
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
function itemdblclick_frmOption(ui) {

    switch (ui.element) {
        case "est_nm":
            {
                v_global.event.type = ui.type;
                v_global.event.object = ui.object;
                v_global.event.row = ui.row;
                v_global.event.element = ui.element;
                var args = {
                    type: "PAGE",
                    page: "w_find_est_info",
                    title: "견적정보 검색",
                    width: 790,
                    height: 470,
                    locate: ["center", "top"],
                    open: true
                };
                if (gw_com_module.dialoguePrepare(args) == false) {
                    var args = {
                        page: "w_find_est_info",
                        param: {
                            ID: gw_com_api.v_Stream.msg_selectEstimate/*,
                                    data: {
                                        est_nm: gw_com_api.getValue(ui.object, ui.row, ui.element)
                                    }*/
                        }
                    };
                    gw_com_module.dialogueOpen(args);
                }
            }
            break;
    }

}
//----------
function checkSendable(param) {

    gw_com_api.selectTab("lyrTab", 2);

    var source = "grdData_내역";
    var target = "grdData_선택";
    if (param.check) {
        if (gw_com_api.getRowCount(target) > 0) {
            gw_com_api.messageBox([
                { text: "전송되지 않은 데이터가 있습니다. 전송하시겠습니까?" }
            ], 420, gw_com_api.v_Message.msg_confirmSend, "YESNOCANCEL");
            return false;
        }
    }
    else if (param.copy) {
        if (gw_com_api.getSelectedRow(source, true).length <= 0) {
            gw_com_api.messageBox([
                    { text: "선택된 내역이 없습니다." }
                ], 300);
            return false;
        }
    }
    else {
        if (gw_com_api.getRowCount(target) <= 0) {
            gw_com_api.messageBox([
                { text: "전송할 대상이 없습니다." },
                { text: "먼저 전송할 대상을 선택한 후 추가해 주세요." }
            ], 400);
            return false;
        }
    }
    return true;

}
//----------
function processRetrieve(param) {

    gw_com_api.selectTab("lyrTab", 1);

    var args = {
        target: [
            {
                type: "FORM",
                id: "frmOption"
            }
        ]
    };
    if (gw_com_module.objValidate(args) == false) return false;

    var args = {
        source: {
            type: "FORM",
            id: "frmOption",
            element: [
				{
				    name: "est_key",
				    argument: "arg_est_key"
				},
                {
                    name: "revision",
                    argument: "arg_revision"
                }
			]
        },
        target: [
            { type: "GRID", id: "grdData_목록", select: true }
        ],
        clear: [
			{
			    type: "GRID",
			    id: "grdData_내역"
			}
		],
        key: param.key

    };
    gw_com_module.objRetrieve(args);

}
//----------
function processLink(param) {

    var args = {
        source: {
            type: "GRID",
            id: "grdData_목록",
            row: "selected",
            block: true,
            element: [
				{
				    name: "est_key",
				    argument: "arg_est_key"
				},
				{
				    name: "revision",
				    argument: "arg_revision"
				},
				{
				    name: "model_seq",
				    argument: "arg_model_seq"
				}
			]
        },
        target: [
			{
			    type: "GRID",
			    id: "grdData_내역"
			}
		],
        key: param.key
    };
    gw_com_module.objRetrieve(args);

}
//----------
function processCopy(param) {

    var source = "grdData_내역";
    var target = "grdData_선택";
    var args = {
        sourceid: source,
        targetid: target,
        multi: true
    };
    gw_com_module.gridCopy(args);
    gw_com_api.selectRow(source, "reset");

}
//----------
function processClear(param) {

    var target = "grdData_선택";
    var args = {
        target: [
            {
                type: "GRID",
                id: target
            }
        ]
    };
    gw_com_module.objClear(args);

}
//----------
function processClose(param) {

    processClear({});

    var args = {
        ID: gw_com_api.v_Stream.msg_closeDialogue
    };
    gw_com_module.streamInterface(args);

}
//----------
function closeDialogue(param) {

    var args = {
        page: param.page
    };
    gw_com_module.dialogueClose(args);
    if (param.focus) {
        gw_com_api.setFocus(v_global.event.object,
	                        v_global.event.row,
	                        v_global.event.element,
	                        (v_global.event.type == "GRID") ? true : false);
    }

}
//----------
function informResult(param) {

    var source = "grdData_선택";
    var rows = [];
    var ids = gw_com_api.getRowIDs(source);
    $.each(ids, function () {
        rows.push(gw_com_api.getRowData(source, this));
    });
    var args = {
        ID: gw_com_api.v_Stream.msg_selectedPreEstimate,
        data: {
            rows: rows
        }
    };
    gw_com_module.streamInterface(args);

    processClear({});

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_selectPreEstimate:
            {
                var retrieve = false;
                if (!v_global.process.init) {
                    v_global.process.init = true;
                    retrieve = true;
                }
                if (retrieve) {
                    //processRetrieve({});
                    itemdblclick_frmOption({
                        type: "FORM",
                        object: "frmOption",
                        row: 1,
                        element: "est_nm"
                    });
                }
                else
                    gw_com_api.setFocus("frmOption", 1, "est_nm");
            }
            break;
        case gw_com_api.v_Stream.msg_resultMessage:
            {
                if (param.data.page != gw_com_api.getPageID()) {
                    param.to = {
                        type: "POPUP",
                        page: param.data.page
                    };
                    gw_com_module.streamInterface(param);
                    break;
                }
                switch (param.data.ID) {
                    case gw_com_api.v_Message.msg_confirmSend:
                        {
                            if (param.data.result == "YES")
                                informResult({});
                            else {
                                if (v_global.process.handler != null)
                                    v_global.process.handler({});
                            }
                        }
                        break;
                }
            }
            break;
        case gw_com_api.v_Stream.msg_selectedEstimate:
            {
                gw_com_api.setValue(v_global.event.object,
			                        v_global.event.row,
			                        "est_key",
			                        param.data.est_key,
			                        (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object,
			                        v_global.event.row,
			                        "revision",
			                        param.data.revision,
			                        (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object,
			                        v_global.event.row,
			                        "est_nm",
			                        param.data.est_nm,
			                        (v_global.event.type == "GRID") ? true : false);
                closeDialogue({ page: param.from.page, focus: true });
                processRetrieve({});
            }
            break;
        case gw_com_api.v_Stream.msg_openedDialogue:
            {
                var args = {
                    to: {
                        type: "POPUP",
                        page: param.from.page
                    }
                };
                switch (param.from.page) {
                    case "w_find_est_info":
                        {
                            args.ID = gw_com_api.v_Stream.msg_selectEstimate;
                            /*
                            args.data = {
                            est_nm: gw_com_api.getValue(
                            v_global.event.object,
                            v_global.event.row,
                            v_global.event.element,
                            (v_global.event.type == "GRID") ? true : false)
                            };
                            */
                        }
                        break;
                }
                gw_com_module.streamInterface(args);
            }
            break;
        case gw_com_api.v_Stream.msg_closeDialogue:
            {
                closeDialogue({ page: param.from.page });
            }
            break;
    }

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//