﻿//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 화면명 : 고분보 관리 > A/S 조회
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
        var args = { request: [
                { type: "PAGE", name: "발생구분", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM010"}] 
                },
                { type: "PAGE", name: "접수구분", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM020"}]
                },
                { type: "PAGE", name: "발행구분", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM021"}]
                },
                { type: "PAGE", name: "진행상태", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM025"}]
                },
                { type: "PAGE", name: "발행근거", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM030"}]
                },
                { type: "PAGE", name: "처리방안", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM035"}]
                },
                { type: "PAGE", name: "처리상태", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM025"}]
                },
                { type: "INLINE", name: "합불판정",
                    data: [ { title: "합격", value: "1" }, { title: "불합격", value: "0" } ]
                },
                { type: "PAGE", name: "고객사", query: "DDDW_CM_CODE",
                    param: [ { argument: "arg_hcode", value: "ISCM29" } ]
                },
				{ type: "PAGE", name: "LINE", query: "DDDW_CM_CODED",
				    param: [ { argument: "arg_hcode", value: "IEHM02" } ]
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
        var args = { targetid: "lyrMenu", type: "FREE",
            element: [
				{ name: "조회", value: "조회", act: true },
				{ name: "상세", value: "고분보 조회", icon: "기타" },
				{ name: "추가", value: "고분보 추가", icon: "추가" },
				{ name: "저장", value: "고분보 수정", icon: "저장" },
				{ name: "닫기", value: "닫기" }
			]
        };
        gw_com_module.buttonMenu(args);
        
        //==== Search Option : 
        var args = { targetid: "frmOption", type: "FREE", title: "조회 조건",
            trans: true, border: true, show: true, remark: "lyrRemark",
            editable: { focus: "astat", validate: true },
            content: { row: [
                    { element: [
			            { name: "ymd_fr", label: { title: "발생일자 :" }, mask: "date-ymd",
			                style: { colfloat: "floating" },
			                editable: { type: "text", size: 7, maxlength: 10 }
			            },
			            { name: "ymd_to", label: { title: "~" }, mask: "date-ymd",
			                editable: { type: "text", size: 7, maxlength: 10 }
			            },
                        { name: "issue_tp", label: { title: "발생구분 :" },
                            editable: { type: "select", size: 7, maxlength: 20 , 
                            	data: { memory: "발생구분", unshift: [{ title: "전체", value: ""}] } }
                        },
                        { name: "astat", label: { title: "발행구분 :" }, //value: "미발행",
                            editable: { type: "select", size: 7, maxlength: 20,
                                data: { memory: "발행구분", unshift: [{ title: "전체", value: ""}] } 
                                }
                        }
                    	]
                    },
                    { element: [
			            { name: "cust_cd", label: { title: "고객사 :" },
			                editable: { type: "select", size: 1,
			                    data: { memory: "고객사", unshift: [ { title: "전체", value: "" } ] },
			                    change: [ { name: "cust_dept", memory: "LINE", key: [ "cust_cd" ] } ]
			                }
			            },
			            { name: "cust_dept",
			                label: { title: "LINE :" },
			                editable: { type: "select", size: 1,
			                    data: { memory: "LINE", unshift: [ { title: "전체", value: "" } ], key: [ "cust_cd" ] }
			                }
			            },
                        { name: "prod_nm", label: { title: "설비명 :" },
                            editable: { type: "text", size: 20, maxlength: 50 }
                        }
				        ]
                    },
                    { element: [
                        { name: "issue_no", label: { title: "관리번호 :" },
                            editable: { type: "text", size: 20, maxlength: 20 }
                        },
                        { name: "rqst_no", label: { title: "발행번호 :" },
                            editable: { type: "text", size: 20, maxlength: 20 }
                        }
				        ]
                    },
                    { element: [
			            { name: "실행", value: "실행", act: true, format: { type: "button" } },
			            { name: "취소", value: "취소", format: { type: "button", icon: "닫기" } }
				        ], align: "right"
                    }
			    ]
            }
        };
        gw_com_module.formCreate(args);

        //==== Main Grid : 발생 내역
        var args = { targetid: "grdData_현황", query: "EHM_2311_M_1", title: "발생 정보",
            caption: true, height: 150, dynamic: true, show: true, selectable: true, // number: true, multi: true, checkrow: true,
            element: [
				{ header: "관리번호",  name: "issue_no", width: 80, align: "center" },
				{ header: "발생일자",  name: "issue_dt", width: 80, align: "center", mask: "date-ymd" },
				{ header: "발생구분",  name: "issue_tp", width: 90, align: "center" },
				{ header: "고객사",  name: "cust_nm", width: 70, align: "center" },
				{ header: "Line",  name: "cust_dept", width: 80, align: "center" },
				{ header: "Process",  name: "cust_proc", width: 100, align: "center" },
				{ header: "고객설비명",  name: "cust_prod_nm", width: 120, align: "center" },
                { header: "제품유형", name: "prod_type", width: 100, align: "center" },
				{ header: "제품명",  name: "prod_nm", width: 250, align: "left" },
				{ header: "발생Module",  name: "prod_sub", width: 100, align: "center" },
				{ header: "Warranty",  name: "wrnt_io", width: 60, align: "center" },
				{ header: "진행상태",  name: "istat", width: 80, align: "center" },
				{ header: "발생현상",  name: "rmk", width: 300, align: "left" }/*,
				{ header: "확인자",  name: "aemp", width: 70, align: "center" },
				{ header: "확인일시",  name: "adate", width: 160, align: "center" }*/,
				{ header: "품질확인자",  name: "qemp", width: 70, align: "center" },
				{ header: "품질확인일시",  name: "qdate", width: 160, align: "center" },
				{ header: "등록자",  name: "ins_usr", width: 70, align: "center" },
				{ header: "등록일시",  name: "ins_dt", width: 160, align: "center" },
				{ header: "수정자",  name: "upd_usr", width: 70, align: "center" },
				{ header: "수정일시",  name: "upd_dt", width: 160, align: "center" },
				{ name: "prod_key", hidden: true }
			]
        };
        gw_com_module.gridCreate(args);
        
        //frmData_발생정보==================================================================
        var args = { targetid: "frmData_발생정보", query: "EHM_2311_M_2", type: "TABLE", title: "발생 정보",
            show: true, selectable: true,
            editable: { bind: "select", focus: "issue_time", validate: true },
            content: { width: { label: 80, field: 190 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "관리번호", format: { type: "label" } },
                            { name: "issue_no", editable: { type: "hidden" } },
                            { header: true, value: "발생일시", format: { type: "label" } },
                            { style: { colfloat: "float" }, name: "issue_dt", mask: "date-ymd", format: { type: "text",     width: 62
                                }, editable: { validate: { rule: "required" },     type: "text",     width: 80 } },
                            { style: { colfloat: "floated" }, name: "issue_time", mask: "time-hh", format: { type: "text",     width: 30
                                }, editable: { type: "text",     width: 30 } },
                            { header: true, value: "발생구분", format: { type: "label" } },
                            { name: "issue_tp"
                            	, editable: { validate: { rule: "required" },     type: "select",     data: { memory: "발생구분"
                                    } } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "고객사", format: { type: "label" } },
                            { name: "cust_nm", mask: "search", editable: { validate: { rule: "required" },     type: "text" } },
                            { header: true, value: "Line", format: { type: "label" } },
                            { name: "cust_dept", editable: { type: "hidden" } },
                            { header: true, value: "Process", format: { type: "label" } },
                            { name: "cust_proc", editable: { type: "hidden" } },
                            { name: "cust_cd", hidden: true, editable: { type: "hidden" } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "설비명", format: { type: "label" } },
                            { name: "cust_prod_nm", display: true, editable: { type: "hidden" } },
                            { header: true, value: "제품명", format: { type: "label" } },
                            { name: "prod_nm", display: true, format: { type: "text", width: 458 }, editable: { type: "hidden" } },
                            { header: true, value: "발생Module", format: { type: "label" } },
                            { name: "prod_sub", editable: { type: "select",     data: { memory: "모듈" } } },
                            { name: "prod_type", hidden: true, editable: { type: "hidden" } },
                            { name: "prod_key", hidden: true, editable: { type: "hidden" } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "Warranty", format: { type: "label"} },
                            { name: "wrnt_io", editable: { type: "select", data: { memory: "Warranty"}} },
                            { header: true, value: "", format: { type: "label"} },
                            { header: false, value: "", format: { type: "label"} },
                            { header: true, value: "상태", format: { type: "label"} },
                            { name: "pstat", editable: { type: "select", data: { memory: "상태"} } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "발생현상", format: { type: "label" } },
                            { style: { colspan: 5 }, name: "rmk", format: { type: "text",     width: 734
                                }, editable: { type: "text",     width: 734 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "등록자", format: { type: "label" } },
                            { name: "ins_usr" },
                            { header: true, value: "수정자", format: { type: "label" } },
                            { name: "upd_usr" },
                            { header: true, value: "작성일시", format: { type: "label" } },
                            { name: "upd_dt" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "품질확인", format: { type: "label" } },
                            { name: "qstat" },
                            { header: true, value: "품질확인자", format: { type: "label" } },
                            { name: "qemp" },
                            { header: true, value: "품질확인일시", format: { type: "label" } },
                            { name: "qdate" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "품질확인메모", format: { type: "label" } },
                            { style: { colspan: 5 }, name: "qnote" }
                        ]
                    }
                ]
            }
        };
        
        //grdData_발생내역====================================================================
        var args = { targetid: "grdData_발생내역", query: "EHM_2311_S_1_1", title: "발생 내역",
            caption: true, height: "50", pager: false, show: true, selectable: true,
            element: [
                { header: "순번", name: "issue_seq", width: 35, align: "center",
                    editable: { type: "hidden" }
                },
				{ header: "발생구분", name: "issue_tp", width: 100, align: "center",
				    format: { type: "select", data: { memory: "발생구분"} },
				    editable: { validate: { rule: "required" }, type: "select",
				        data: { memory: "발생구분", unshift: [{ title: "-", value: ""}] }
				    }
				},
				{ header: "발생Module",  name: "prod_sub", width: 80, align: "center",
				    format: { type: "select", data: { memory: "모듈" } },
				    editable: {
				        validate: { rule: "required" },
				        type: "select",
				        data: { memory: "모듈", unshift: [ { title: "-", value: "" } ] }
				    }
				},
				{ header: "발생현상(대)", name: "status_grp", width: 80, align: "center",
				    format: { type: "select", data: { memory: "발생현상(대)"} },
				    editable: {
				        validate: { rule: "required" }, type: "select",
				        data: { memory: "발생현상(대)", unshift: [{ title: "-", value: ""}] },
				        change: [
							{ name: "status_tp1", memory: "현상분류", unshift: [{ title: "-", value: ""}],
							    by: [{ source: { id: "frmData_발생정보", row: 1, key: "prod_type"} }
							    , { key: "status_grp"}]
							}
						]
				    }
				},
				{ header: "발생현상(중)", name: "status_tp1", width: 130, align: "center",
				    format: { type: "select", data: { memory: "현상분류"} },
				    editable: {
				        validate: { rule: "required" }, type: "select",
				        data: { memory: "현상분류", unshift: [{ title: "-", value: ""}],
				            by: [{ source: { id: "frmData_발생정보", row: 1, key: "prod_type"} }, { key: "status_grp"}]
				        },
				        change: [
							{ name: "status_tp2", memory: "현상구분", unshift: [{ title: "-", value: ""}],
							    by: [{ source: { id: "frmData_발생정보", row: 1, key: "prod_type"} }, { key: "status_tp1"}]
							}
						]
				    }
				},
				{ header: "발생현상(소)", name: "status_tp2", width: 130, align: "center",
				    format: { type: "select", data: { memory: "현상구분"} },
				    editable: {
				        validate: { rule: "required" }, type: "select",
				        data: { memory: "현상구분", unshift: [{ title: "-", value: ""}],
				            by: [
                                { source: { id: "frmData_발생정보", row: 1, key: "prod_type"} }, { key: "status_tp1" }
                            ]
				        }
				    }
				},
				{ header: "원인부위분류",  name: "part_tp1", width: 90, align: "center",
				    format: { type: "select", data: { memory: "원인부위분류"} },
				    editable: {
				        type: "select",
				        data: { memory: "원인부위분류", unshift: [{ title: "-", value: ""}],
				            by: [ { source: { id: "frmData_발생정보", row: 1, key: "prod_type" } } ]
				        },
				        change: [
							{ name: "part_tp2", memory: "원인부위구분", unshift: [ { title: "-", value: "" } ],
							    by: [
                                    { source: { id: "frmData_발생정보", row: 1, key: "prod_type" } }, { key: "part_tp1" }
                                ]
							}
						]
				    }
				},
				{ header: "원인부위구분",  name: "part_tp2", width: 130, align: "center",
				    format: { type: "select",
				        data: { memory: "원인부위구분" }
				    },
				    editable: {
				        type: "select",
				        data: {
				            memory: "원인부위구분",
				            unshift: [
				                { title: "-", value: "" }
				            ],
				            by: [
                                { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                    }
                                }, { key: "part_tp1" }
                            ]
				        }
				    }
				},
				{ header: "원인분류",  name: "reason_tp1", width: 90, align: "center",
				    format: {
				        type: "select",
				        data: {
				            memory: "원인분류"
				        }
				    },
				    editable: {
				        validate: { rule: "required" },
				        type: "select",
				        data: {
				            memory: "원인분류",
				            unshift: [
				                { title: "-", value: "" }
				            ],
				            by: [
                                { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                    }
                                }
                            ]
				        },
				        change: [
							{
							    name: "reason_tp2",
							    memory: "원인구분",
							    unshift: [
				                    { title: "-", value: "" }
				                ],
							    by: [
                                    { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                        }
                                    },     { key: "reason_tp1" }
                                ]
							}
						]
				    }
				},
				{ header: "원인구분",  name: "reason_tp2", width: 130, align: "center",
				    format: { type: "select", data: { memory: "원인구분"} },
				    editable: {
				        validate: { rule: "required" },
				        type: "select",
				        data: {
				            memory: "원인구분",
				            unshift: [
				                { title: "-", value: "" }
				            ],
				            by: [
                                { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                    }
                                }, { key: "reason_tp1" }
                            ]
				        }
				    }
				},
				{ header: "귀책분류",  name: "duty_tp1", width: 90, align: "center",
				    format: {
				        type: "select",
				        data: {
				            memory: "귀책분류"
				        }
				    },
				    editable: {
				        type: "select",
				        data: {
				            memory: "귀책분류",
				            unshift: [
				                { title: "-", value: "" }
				            ],
				            by: [
                                { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                    }
                                }
                            ]
				        },
				        change: [
							{
							    name: "duty_tp2",
							    memory: "귀책구분",
							    unshift: [
				                    { title: "-", value: "" }
				                ],
							    by: [
                                    { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                        }
                                    },     { key: "duty_tp1" }
								]
							}
						]
				    }
				},
				{ header: "귀책구분",  name: "duty_tp2", width: 130, align: "center",
				    format: {
				        type: "select",
				        data: {
				            memory: "귀책구분"
				        }
				    },
				    editable: {
				        type: "select",
				        data: {
				            memory: "귀책구분",
				            unshift: [
				                { title: "-", value: "" }
				            ],
				            by: [
                                { source: { id: "frmData_발생정보", row: 1, key: "prod_type"
                                    }
                                }, { key: "duty_tp1" }
							]
				        }
				    }
				},
                {
                    name: "prod_type",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    name: "issue_no",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                }
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        
        //==== Resize Objects
        var args = {
            target: [
				{ type: "GRID", id: "grdData_현황", offset: 8 },
                { type: "FORM", id: "frmData_발생정보", offset: 8 },
                { type: "GRID", id: "grdData_발생내역", offset: 8 }
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
function processInsert( param ) {
	
    if (gw_com_api.getSelectedRow("grdData_현황") == null) {
        gw_com_api.messageBox([ { text: "선택된 대상이 없습니다." } ], 300);
        return false;
    }

    var ProcStat = gw_com_api.getValue("grdData_현황", "selected", "pstat", true);
    
    if ( ProcStat != "발생" && ProcStat != "반려" && ProcStat != "취소" ) {
    	var IssueNo = gw_com_api.getValue("grdData_현황", "selected", "issue_no", true);
    	var IssueTp = gw_com_api.getValue("grdData_현황", "selected", "issue_tp", true);
    	var IssueDept = gw_com_api.getValue("grdData_현황", "selected", "dept_nm", true);
    	var IssueDt = gw_com_api.getValue("grdData_현황", "selected", "issue_dt", true);
    	var ProdNm = gw_com_api.getValue("grdData_현황", "selected", "prod_nm", true);
        var args = { ID: gw_com_api.v_Stream.msg_linkPage,
            to: { type: "MAIN" },
            data: { page: "EHM_2320", title: "고분보 등록", 
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
        gw_com_api.messageBox([ { text: "고분보 발행 가능 상태가 아닙니다." } ], 300);
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
            { text: status + " 자료이므로 수정할 수 없습니다." }
        ], 420);
        return false;
    }

    var args = { ID: gw_com_api.v_Stream.msg_linkPage,
        to: { type: "MAIN" },
        data: { page: "QDM_6220", title: "고분보 수정",
            param: [
                { name: "rqst_no", value: gw_com_api.getValue("grdData_현황", "selected", "rqst_no", true) }
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
        data: { page: "QDM_6220", title: "고분보 보기",
            param: [
            	{ name: "AUTH", value: "R" },
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
                { name: "astat", argument: "arg_astat" }
			],
            remark: [
	            { infix: "~",  element: [ { name: "ymd_fr" }, { name: "ymd_to" } ] },
		        { element: [{ name: "issue_tp"}] },
		        { element: [{ name: "astat"}] },
		        { element: [{ name: "cust_cd"}] },
		        { element: [{ name: "cust_dept"}] },
                { element: [{ name: "prod_nm"}] }
		    ]
        },
        target: [
            { type: "GRID", id: "grdData_현황", focus: true, select: true }
	    ],
        clear: [
			{ type: "GRID", id: "grdData_발생내역" }
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
            { type: "FORM", id: "frmData_발생정보" },
            { type: "GRID", id: "grdData_발생내역" }
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
                    } break;
                    case "INFO_SPC": {
                        args.ID = gw_com_api.v_Stream.msg_infoECR;
                    } break;
                    case "DLG_ISSUE": {
                        args.ID = gw_com_api.v_Stream.msg_infoAS;
                    } break;
                }
                args.data = {
                    issue_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true),
                    voc_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", true)
                }
                gw_com_module.streamInterface(args);
            } break;
        case gw_com_api.v_Stream.msg_closeDialogue:
            {
                closeDialogue({ page: param.from.page });
            }
            break;
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//