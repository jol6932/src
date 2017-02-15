﻿
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define Global variables.
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

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // entry point. (pre-process section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ready: function () {

        // initialize page.
        v_global.process.param = gw_com_module.initPage({ message: true });
        gw_com_api.changeTheme("style_theme");

        //----------
        var args = {
            request: [
                { type: "PAGE", name: "진행상태", query: "dddw_zcode",
                    param: [ { argument: "arg_hcode", value: "ECCB42" } ]
                },
				{ type: "PAGE", name: "제품유형", query: "DDDW_CM_CODE",
				    param: [ { argument: "arg_hcode", value: "ISCM25" } ]
				},
				{ type: "PAGE", name: "분류1", query: "dddw_zcode",
				    param: [ { argument: "arg_hcode", value: "ECCB05" } ]
				},
				{ type: "PAGE", name: "분류2", query: "dddw_zcode",
				    param: [ { argument: "arg_hcode", value: "ECCB06" } ]
				},
				{ type: "PAGE", name: "분류3", query: "dddw_zcode",
				    param: [ { argument: "arg_hcode", value: "ECCB07" } ]
				},
				{ type: "PAGE", name: "DEPT_AREA_FIND", query: "dddw_deptarea",
				    param: [{ argument: "arg_type", value: gw_com_module.v_Session.DEPT_AUTH}] 
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
        var args = { targetid: "lyrMenu", type: "FREE",
            element: [
				{
				    name: "조회",
				    value: "조회",
				    act: true
				},
				{
				    name: "상세",
				    value: "상세정보",
				    icon: "기타"
				},
				{
				    name: "추가",
				    value: "추가"
				},
				{
				    name: "수정",
				    value: "수정",
				    icon: "기타"
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
        var args = { targetid: "frmOption", type: "FREE", title: "조회 조건", remark: "lyrRemark",
            trans: true, border: true, show: true,
            editable: { focus: "ymd_fr", validate: true },
            content: { row: [
                { element: [
                        { name: "ymd_fr", label: { title: "기간 :" }, mask: "date-ymd", style: { colfloat: "floating" },
                            editable: { type: "text", size: 7, maxlength: 10 }
                        },
			            { name: "ymd_to", label: { title: "~" }, mask: "date-ymd",
			                editable: { type: "text", size: 7, maxlength: 10 }
			            },
                        { name: "dept_area", label: { title: "사업부 :" },
                            editable: { type: "select", size: 7, maxlength: 20, data: { memory: "DEPT_AREA_FIND", unshift: [{ title: "전체", value: "%" }] } }
                        },
			            { name: "act_emp", label: { title: "담당자 :" },
			                editable: { type: "text", size: 7, maxlength: 20 }
			            },
			            { name: "pstat", label: { title: "진행상태 :" }, style: { colfloat: "floating" },
			                editable: { type: "select"
			                	, data: { memory: "진행상태", unshift: [ { title: "전체", value: "%" } ] }
			                	//, change: [ { name: "astat", memory: "처리상태", key: [ "pstat" ] } ] 
			                }
			            }
			        ]
                },
                { element: [
                        { name: "ecr_title", label: { title: "개선제안명 :" },
                            editable: { type: "text", size: 27, maxlength: 50 }
                        },
                        { name: "eco_title", label: { title: "ECO 제목 :" },
                            editable: { type: "text", size: 27, maxlength: 50 }
                        }
			        ]
                },
                { element: [
                        { name: "prod_type", label: { title: "제품유형 :" },
                            editable: { type: "select", data: { memory: "제품유형", unshift: [ { title: "전체", value: "%" } ] } }
                        },
                        { name: "act_region", label: { title: "분류 :" }, style: { colfloat: "floating" },
                            editable: { type: "select", data: { memory: "분류1", unshift: [ { title: "전체", value: "%" } ] } }
                        },
                        { name: "act_module", 
                            editable: { type: "select", data: { memory: "분류2", unshift: [ { title: "전체", value: "%" } ] } }
                        },
                        { name: "mp_class", 
                            editable: { type: "select", data: { memory: "분류3", unshift: [ { title: "전체", value: "%" } ] } }
                        }
			        ]
                },
                { align: "right",
                  element: [
                        { name: "실행", value: "실행", act: true, format: { type: "button" } },
                        { name: "취소", value: "취소", act: true, format: { type: "button", icon: "닫기" } }
			        ]
                }
		    ] }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = { targetid: "grdData_현황", query: "w_eccb4012_M_1", title: "ECO 현황",
            height: 442,
            show: true,
            selectable: true,
            key: true,
            dynamic: true,
            element: [
				{
				    header: "ECO No.",
				    name: "eco_no",
				    width: 90,
				    align: "center"
				},
				{
				    header: "제목",
				    name: "eco_title",
				    width: 300,
				    align: "left"
				},
                {
                    header: "관련근거",
                    name: "ecr_no",
                    width: 90,
                    align: "center"
                },
				{
				    header: "개선제안명",
				    name: "ecr_title",
				    width: 300,
				    align: "left"
				},
				{
				    header: "진행상태",
				    name: "pstat_text",
				    width: 80,
				    align: "center"
				},
				{
				    header: "제픔유형",
				    name: "prod_type",
				    width: 100,
				    align: "center"
				},
				{
				    header: "적용시점",
				    name: "act_time_text",
				    width: 150,
				    align: "center"
				},
				{
				    header: "적용영역",
				    name: "act_region",
				    width: 150,
				    align: "center"
				},
				{
				    header: "적용모듈",
				    name: "act_module",
				    width: 150,
				    align: "center"
				},
				{
				    header: "MP분류",
				    name: "mp_class",
				    width: 150,
				    align: "center"
				},
				{
				    header: "도면조치",
				    name: "dwg_proc_text",
				    width: 150,
				    align: "center"
				},
				{
				    header: "담당자",
				    name: "act_emp",
				    width: 70,
				    align: "center"
				},
				{
				    header: "시작일",
				    name: "str_dt",
				    width: 80,
				    align: "center",
				    mask: "date-ymd"
				},
				{
				    header: "완료일",
				    name: "end_dt",
				    width: 80,
				    align: "center",
				    mask: "date-ymd"
				},
				{
				    header: "작성일",
				    name: "eco_dt",
				    width: 80,
				    align: "center",
				    mask: "date-ymd"
				},
				{
				    header: "작성부서",
				    name: "eco_dept_nm",
				    width: 70,
				    align: "center"
				},
				{
				    header: "작성자",
				    name: "eco_emp_nm",
				    width: 70,
				    align: "center"
				}/*,
				{
				    header: "완료보고일",
				    name: "rpt_dt",
				    width: 80,
				    align: "center",
				    mask: "date-ymd"
				},
				{
				    header: "보고부서",
				    name: "rpt_dept_nm",
				    width: 70,
				    align: "center"
				},
				{
				    header: "보고자",
				    name: "rpt_emp_nm",
				    width: 70,
				    align: "center"
				}*/,
				{
				    header: "승인상태",
				    name: "gw_astat_nm",
				    width: 80,
				    align: "center"
				},
				{
				    header: "승인자",
				    name: "gw_aemp",
				    width: 70,
				    align: "center"
				},
				{
				    header: "승인일시",
				    name: "gw_adate",
				    width: 160,
				    align: "center"
				},
				{
				    name: "pstat",
				    hidden: true
				},
				{
				    name: "ins_usr",
				    hidden: true
				}
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            target: [
				{
				    type: "GRID",
				    id: "grdData_현황",
				    offset: 8
				}
			]
        };
        //----------
        gw_com_module.objResize(args);
        //====================================================================================
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
            targetid: "lyrMenu",
            element: "조회",
            event: "click",
            handler: click_lyrMenu_조회
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu",
            element: "상세",
            event: "click",
            handler: click_lyrMenu_상세
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu",
            element: "추가",
            event: "click",
            handler: click_lyrMenu_추가
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu",
            element: "수정",
            event: "click",
            handler: click_lyrMenu_수정
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu",
            element: "닫기",
            event: "click",
            handler: click_lyrMenu_닫기
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
            element: "취소",
            event: "click",
            handler: click_frmOption_취소
        };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_현황", grid: true, event: "rowdblclick", handler: click_lyrMenu_상세 };
        gw_com_module.eventBind(args);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // event handler.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        function click_lyrMenu_조회() {

            var args = {
                target: [
					{
					    id: "frmOption",
					    focus: true
					}
				]
            };
            gw_com_module.objToggle(args);

        }
        //----------
        function click_lyrMenu_상세(ui) {

            var args = {
                ID: gw_com_api.v_Stream.msg_linkPage,
                to: {
                    type: "MAIN"
                },
                data: {
                    page: "w_eccb4010",
                    title: "ECO 정보",
                    param: [
                        { name: "AUTH", value: "R" },
                        { name: "eco_no", value: gw_com_api.getValue("grdData_현황", "selected", "eco_no", true) }
                    ]
                }
            };
            gw_com_module.streamInterface(args);

        }
        //----------
        function click_lyrMenu_추가(ui) {

            var args = {
                ID: gw_com_api.v_Stream.msg_linkPage,
                to: {
                    type: "MAIN"
                },
                data: {
                    page: "w_eccb4010",
                    title: "ECO 등록"
                }
            };
            gw_com_module.streamInterface(args);

        }
        //----------
        function click_lyrMenu_수정(ui) {

            var user = gw_com_api.getValue("grdData_현황", "selected", "ins_usr", true);
            var status = gw_com_api.getValue("grdData_현황", "selected", "gw_astat_nm", true);
            //if (user != gw_com_module.v_Session.USR_ID) {
            //    gw_com_api.messageBox([
            //        { text: "수정 권한이 없습니다." }
            //    ], 300);
            //    return false;
            //}
            //else if (status != '없슴' && status != '미처리' && status != '반송' && status != '회수') {
            //    gw_com_api.messageBox([
            //        { text: "결재 " + status + " 자료이므로 수정할 수 없습니다." }
            //    ], 420);
            //    return false;
            //}

            var args = {
                ID: gw_com_api.v_Stream.msg_linkPage,
                to: {
                    type: "MAIN"
                },
                data: {
                    page: "w_eccb4010",
                    title: "ECO 등록",
                    param: [
                        { name: "eco_no", value: gw_com_api.getValue("grdData_현황", "selected", "eco_no", true) }
                    ]
                }
            };
            gw_com_module.streamInterface(args);

        }
        //----------
        function click_lyrMenu_닫기(ui) {

            processClose({});

        }
        //----------
        function click_frmOption_실행(ui) {

            processRetrieve({});

        }
        //----------
        function click_frmOption_취소(ui) {

            closeOption({});

        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // startup process.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        gw_com_api.setValue("frmOption", 1, "ymd_fr", gw_com_api.getDate("", { month: -1 }));
        gw_com_api.setValue("frmOption", 1, "ymd_to", gw_com_api.getDate(""));
        //gw_com_api.setValue("frmOption", 1, "dept_area", gw_com_module.v_Session.DEPT_AREA );
        //----------
        gw_com_module.startPage();

    }
    //#endregion

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
function processRetrieve(param) {
    var args = { target: [ { type: "FORM", id: "frmOption" } ] };
    if (gw_com_module.objValidate(args) == false) return false;

    var args = { key: param.key,
        source: { type: "FORM", id: "frmOption", hide: true,
            element: [
				{ name: "ymd_fr", argument: "arg_ymd_fr" },
				{ name: "ymd_to", argument: "arg_ymd_to" },
				{ name: "ecr_title", argument: "arg_ecr_title" },
				{ name: "eco_title", argument: "arg_eco_title" },
				{ name: "act_emp", argument: "arg_act_emp" },
				{ name: "prod_type", argument: "arg_prod_type" },
				{ name: "act_region", argument: "arg_act_region" },
				{ name: "act_module", argument: "arg_act_module" },
				{ name: "mp_class", argument: "arg_mp_class" },
				{ name: "pstat", argument: "arg_pstat" },
				{ name: "dept_area", argument: "arg_dept_area" }
            ],
            argument: [
                { name: "arg_eco_no", value: "%" }
            ],
            remark: [
	            { infix: "~", element: [ { name: "ymd_fr" }, { name: "ymd_to" } ] },
	            { element: [{ name: "dept_area"}] },
		        { element: [{ name: "ecr_title"}] },
		        { element: [{ name: "eco_title"}] },
		        { element: [{ name: "act_emp" }] },
		        { element: [{ name: "prod_type"}] },
		        { element: [{ name: "act_region"}] },
		        { element: [{ name: "act_module"}] },
		        { element: [{ name: "mp_class"}] },
                { element: [ { name: "pstat" } ] }
		    ]
        },
        target: [
			{ type: "GRID", id: "grdData_현황", select: true, focus: true }
		]
    };
    gw_com_module.objRetrieve(args);

}
//----------
function processClose(param) {

    var args = {
        ID: gw_com_api.v_Stream.msg_closePage
    };
    gw_com_module.streamInterface(args);

}
//----------
function closeOption(param) {

    gw_com_api.hide("frmOption");

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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_showMessage:
            {
                gw_com_module.streamInterface(param);
            }
            break;
        case gw_com_api.v_Stream.msg_resultMessage:
            {
                if (param.data.page != gw_com_api.getPageID())
                    break;
            }
            break;
        /*
        case gw_com_api.v_Stream.msg_openedDialogue:
        {
        var args = {
        to: {
        type: "POPUP",
        page: param.from.page
        }
        };
        switch (param.from.page) {
        case "w_find_as":
        {
        args.ID = gw_com_api.v_Stream.msg_infoAS;
        args.data = {
        issue_no: gw_com_api.getValue("grdData_현황", "selected", "issue_no", true)
        };
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
        */ 
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//