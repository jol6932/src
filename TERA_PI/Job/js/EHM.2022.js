﻿//------------------------------------------
// Process about Job Process.
//                Created by Professor.X, GoodWare (2011.04)
//------------------------------------------

var v_global = {
    event: { type: null, object: null, row: null, element: null },
    process: {  param: null,  entry: null, act: null, handler: null, current: {},  prev: {} },
    logic: {}
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// process.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var gw_job_process = {  

    //#region
    ready: function () { 
        // initialize page. 
        //v_global.process.param = gw_com_module.initPage({ authority: true, message: true });
        v_global.process.param = gw_com_module.initPage({ message: true }); 
        gw_com_api.changeTheme("style_theme");

        // set data.
        
        var args = {
            request: [
				{ type: "PAGE", name: "설비군", query: "DDDW_CM_CODE",
				  param: [{ argument: "arg_hcode", value: "IEHM06"}]
				},
				{ type: "PAGE", name: "제품유형", query: "DDDW_CM_CODE",
				  param: [  { argument: "arg_hcode", value: "ISCM25" }]
				},
                { type: "PAGE", name: "고객사", query: "DDDW_CM_CODE",
                  param: [  { argument: "arg_hcode", value: "ISCM29" }]
                },
				{ type: "PAGE", name: "LINE", query: "DDDW_CM_CODED",
				  param: [ { argument: "arg_hcode", value: "IEHM02" }  ]
				},
                { type: "PAGE", name: "발생구분", query: "DDDW_ISSUE_TP",
                  param: [{ argument: "arg_rcode", value: "AS" } ]
                },
                { type: "INLINE", name: "Warranty",
                    data: [ { title: "IN", value: "IN" }, { title: "OUT", value: "OUT" } ]
                },
                { type: "INLINE", name: "YesNo",
                  data: [ { title: "Yes", value: "1" }, { title: "No", value: "0" } ]
                },
                { type: "INLINE", name: "중요도",
                  data: [ { title: "상", value: "상" }, { title: "중", value: "중" }, { title: "하", value: "하" } ]
                },
				{ type: "PAGE", name: "상태", query: "DDDW_CM_CODE",
				  param: [ { argument: "arg_hcode", value: "IEHM13" } ]
				},
				{ type: "PAGE", name: "모듈", query: "DDDW_CM_CODE",
				  param: [{ argument: "arg_hcode", value: "IEHM05"}]
				},
                {
                  type: "PAGE", name: "발생현상(대)", query: "DDDW_CM_FCODE1",
                  param: [{ argument: "arg_hcode", value: "IEHM21" }]
                },
                { type: "PAGE", name: "현상분류", query: "DDDW_CM_CODEF1",
                  param: [{ argument: "arg_hcode", value: "IEHM21" }]
                },
				{ type: "PAGE", name: "현상구분", query: "DDDW_CM_CODEF",
				  param: [{ argument: "arg_hcode", value: "IEHM31" }]
				},
				{ type: "PAGE", name: "원인부위분류", query: "DDDW_CM_CODEF",
				  param: [  { argument: "arg_hcode", value: "IEHM22" }]
				},
                { type: "PAGE", name: "원인부위구분", query: "DDDW_CM_CODEF",
                  param: [{ argument: "arg_hcode", value: "IEHM32" }]
                },
				{ type: "PAGE", name: "원인분류", query: "DDDW_CM_CODEF",
				  param: [ { argument: "arg_hcode", value: "IEHM23" }]
				},
				{ type: "PAGE", name: "원인구분", query: "DDDW_CM_CODEF",
				  param: [ { argument: "arg_hcode", value: "IEHM33" }]
				},
                { type: "PAGE", name: "귀책분류", query: "DDDW_CM_CODEF",
                  param: [  { argument: "arg_hcode", value: "IEHM25" } ]
                },
				{ type: "PAGE", name: "귀책구분", query: "DDDW_CM_CODEF",
				  param: [ { argument: "arg_hcode", value: "IEHM35" } ]
				},
				{ type: "PAGE", name: "조치분류", query: "DDDW_CM_CODEF",
				  param: [ { argument: "arg_hcode", value: "IEHM24" } ]
				},
				{ type: "PAGE", name: "조치구분", query: "DDDW_CM_CODEF",
				  param: [ { argument: "arg_hcode", value: "IEHM34" } ]
				},
				{ type: "PAGE", name: "조치상태", query: "DDDW_CM_CODE",
				  param: [ { argument: "arg_hcode", value: "IEHM13" } ]
				},
				{ type: "PAGE", name: "교체구분", query: "DDDW_CM_CODE",
				  param: [ { argument: "arg_hcode", value: "IEHM12" } ]
				},
				{ type: "PAGE", name: "부품상태", query: "DDDW_CM_CODE",
				  param: [ { argument: "arg_hcode", value: "IEHM40" } ]
				},
				{ type: "PAGE", name: "부품군", query: "DDDW_CM_CODEF",
				  param: [ { argument: "arg_hcode", value: "IEHM29" } ]
				},
				{ type: "PAGE", name: "진행상태", query: "DDDW_CM_CODE",
				  param: [{ argument: "arg_hcode", value: "IEHM10" } ]
				},
                { type: "INLINE", name: "보기",
                  data: [ { title: "축약", value: "S" }, { title: "확장", value: "L" }]
                },
				{
				    type: "PAGE", name: "1차원인", query: "DDDW_CM_CODE",
				    param: [{ argument: "arg_hcode", value: "IEHM73" }]
				},
                {
                    type: "INLINE", name: "유/무",
                    data: [{ title: "유", value: "1" }, { title: "무", value: "0" }]
                },
                {
                    type: "INLINE", name: "준수여부",
                    data: [{ title: "준수", value: "1" }, { title: "미준수", value: "0" }]
                }
			],
            starter: start
        };
        gw_com_module.selectSet(args);

       // start();

        
        // go next.
        
        function start() {

            gw_job_process.UI();

        }

    },
    //#endregion 
     
    // manage UI. (design section) 

    //#region
    UI: function () { 
     
        // define UI.
      
        var args = { targetid: "lyrMenu_1_1", type: "FREE",
		            element: [ 
		            	//{name: "조회", value: "조회", act: true }, 
		                { name: "추가", value: "추가" },
		                { name: "저장", value: "저장" },
						{ name: "삭제", value: "삭제" },
		                { name: "출력", value: "출력", icon: "출력" },
						{ name: "NCR", value: "NCR 접수", icon: "실행" },
						{ name: "ECR", value: "개선제안", icon: "실행" },
						{ name: "닫기", value: "닫기" }
					]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_1_2", type: "FREE",
            show: false,
            element: [ {  name: "닫기", value: "닫기" } ]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_2", type: "FREE",
            element: [ 
            	{ name: "추가", value: "추가" }, 
            	{ name: "삭제", value: "삭제" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_3", type: "FREE",
            element: [
            	{  name: "추가",  value: "추가" },
				{  name: "삭제", value: "삭제" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_4", type: "FREE",
            element: [
				{ name: "추가", value: "추가" },
				{ name: "삭제", value: "삭제" },
				{ name: "성적표등록", value: "성적표등록", icon: "추가" },
				{ name: "성적표보기", value: "성적표보기", icon: "실행" },
				{ name: "성적표삭제", value: "성적표삭제", icon: "삭제" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_5", type: "FREE",
            element: [
				{  name: "추가", value: "추가" },
				{  name: "삭제",  value: "삭제" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_6", type: "FREE",
            element: [
				{  name: "편집",  value: "편집", icon: "추가" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "frmOption", type: "FREE", title: "조회 조건", remark: "lyrRemark",
            trans: true, border: true, show: true,
            editable: { focus: "ymd_fr", validate: true },
            content: {
                row: [
                    {
                        element: [
				            {
				                style: { colfloat: "floating"  },
				                name: "ymd_fr",
				                label: {  title: "발생일자 :" },
				                mask: "date-ymd",
				                editable: {  type: "text", size: 7, maxlength: 10 }
				            },
				            {
				                name: "ymd_to",
				                label: { title: "~" },
				                mask: "date-ymd",
				                editable: { type: "text", size: 7, maxlength: 10 }
				            },
				            {
				                name: "prod_type",
				                label: { title: "제품유형 :" },
				                editable: {
				                    type: "select",
				                    data: { memory: "제품유형", unshift: [{ title: "전체", value: "%"}] }
				                }
				            }
				        ]
                    },
                    {
                        element: [
				            {
				                name: "cust_cd",
				                label: { title: "고객사 :" },
				                editable: { type: "select", 
				                	        data: { memory: "고객사", unshift: [ { title: "전체", value: "%" } ]
				                    },
				                    change: [ { name: "cust_dept", memory: "LINE", key: [ "cust_cd" ] } ]
				                }
				            },
				            {
				                name: "cust_dept",
				                label: { title: "LINE :" },
				                editable: {
				                    type: "select",
				                    data: { memory: "LINE", unshift: [{ title: "전체", value: "%"}], key: ["cust_cd"]
				                    }
				                }
				            },
				            {
				                name: "cust_prod_nm",
				                label: { title: "설비명 :" },
				                editable: { type: "text", size: 12, maxlength: 20 }
				            },
				            {   name: "proj_no", hidden: true }
				        ]
                    },
                    {
                        align: "right",
                        element: [
				            {
				                name: "prod_group",
				                label: { title: "설비군 :" },
				                editable: {
				                    type: "select",
				                    data: { memory: "설비군", unshift: [ { title: "전체", value: "%" } ] }
				                }
				            },
                            {
                                name: "issue_stat",
                                label: { title: "상태 :" },
                                editable: {
                                    type: "select",
                                    data: { memory: "진행상태", unshift: [ { title: "전체", value: "%" } ] }
                                }
                            },
				            {
				                name: "실행", value: "실행",act: true,
				                format: { type: "button" }
				            },
				            {
				                name: "취소", value: "취소",
				                format: { type: "button", icon: "닫기"
				             }
				            }
				        ]
                    }
			    ]
            }
        };
        //----------
      //  gw_com_module.formCreate(args);
        
        var args = { targetid: "frmView", type: "FREE", trans: true, show: true, border: false, align: "left",
            editable: { bind: "open", validate: true },
            content: {
                row: [
                    {
                        element: [
				            { name: "view", label: {  title: "보기 :"  }, value: "L",
				              editable: { type: "select",  data: { memory: "보기" } }
				            },
				            { name: "실행", act: true, show: false,  format: { type: "button"  }
				            }
				        ]
                    }
				]
            }
        };
        
        gw_com_module.formCreate(args);
       
        var args = { targetid: "frmView1", type: "FREE", trans: true, show: true, border: false, align: "left",
            editable: { bind: "open", validate: true },
            content: {
                row: [
                    {
                        element: [
				            { name: "view1", label: { title: "보기 :" }, value: "L",
				              editable: { type: "select", data: {  memory: "보기" } }
				            },
				            {  name: "실행", act: true, show: false, format: { type: "button"  }
				            }
				        ]
                    }
				]
            }
        };
       
       // gw_com_module.formCreate(args);
        //=====================================================================================
        var args = { targetid: "grdData_발생정보", query: "EHM_2010_M_1", title: "발생 정보",
            caption: true,
            height: 130,
            dynamic: true,
            show: true,
            selectable: true,
            element: [
				{  header: "관리번호",  name: "issue_no", width: 80, align: "center"
				},
				{  header: "발생일자",  name: "issue_dt", width: 80, align: "center",
				    mask: "date-ymd"
				},
				{  header: "발생구분",  name: "issue_tp", width: 90, align: "center"
				},
				{  header: "고객사",  name: "cust_nm", width: 70, align: "center"
				},
				{  header: "Line",  name: "cust_dept", width: 80, align: "center"
				},
				{  header: "Process",  name: "cust_proc", width: 100, align: "center"
				},
				{  header: "고객설비명",  name: "cust_prod_nm", width: 120, align: "center"
				},
                { header: "제품유형", name: "prod_type", width: 100, align: "center"
                },
				{  header: "제품명",  name: "prod_nm", width: 250, align: "left"
				},
				{  header: "발생Module",  name: "prod_sub", width: 100, align: "center"
				},
				{  header: "Warranty",  name: "wrnt_io", width: 60, align: "center"
				},
				{  header: "진행상태",  name: "istat", width: 80, align: "center"
				},
				{  header: "발생현상",  name: "rmk", width: 300, align: "left"
				}/*,
				{  header: "확인자",  name: "aemp", width: 70, align: "center"
				},
				{  header: "확인일시",  name: "adate", width: 160, align: "center"
				}*/,
				{  header: "품질확인자",  name: "qemp", width: 70, align: "center"
				},
				{  header: "품질확인일시",  name: "qdate", width: 160, align: "center"
				},
				{  header: "등록자",  name: "ins_usr", width: 70, align: "center"
				},
				{  header: "등록일시",  name: "ins_dt", width: 160, align: "center"
				},
				{  header: "수정자",  name: "upd_usr", width: 70, align: "center"
				},
				{  header: "수정일시",  name: "upd_dt", width: 160, align: "center"
				},
				{  name: "prod_key",  hidden: true }
			]
        };
        //----------
        //gw_com_module.gridCreate(args);
        
        //frmData_발생정보==================================================================
        var args = { targetid: "frmData_발생정보", query: "EHM_2010_M_2", type: "TABLE", title: "발생 정보",
            caption: true, show: true, selectable: true,
            editable: { bind: "select", focus: "issue_time", validate: true },
            content: { width: { label: 80, field: 190 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true,  value: "관리번호", format: { type: "label" } },
                            { name: "issue_no", editable: { type: "hidden" } },
                            { header: true,  value: "발생일시", format: { type: "label" } },
                            { style: { colfloat: "float"}, name: "issue_dt",  mask: "date-ymd", format: { type: "text", width: 62 },
                              editable: {validate: { rule: "required" },type: "text",width: 80}
                            },
                            { style: { colfloat: "floated" },name: "issue_time", mask: "time-hh", format: { type: "text",width: 30 },
                              editable: { type: "text", width: 30 }
                            },
                            { header: true, value: "발생구분", format: { type: "label" } },
                            { name: "issue_tp", editable: { validate: { rule: "required" }, type: "select", data: { memory: "발생구분" } } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "고객사", format: { type: "label" } },
                            { name: "cust_nm", mask: "search",  editable: {  validate: { rule: "required" }, type: "text" } },
                            { header: true, value: "Line", format: { type: "label" } },
                            { name: "cust_dept", editable: { type: "hidden" } },
                            { header: true, value: "Process", format: { type: "label" } },
                            { name: "cust_proc", editable: { type: "hidden" } },
                            { name: "cust_cd", hidden: true, editable: { type: "hidden" } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "설비명",  format: { type: "label" } },
                            { name: "cust_prod_nm", display: true, editable: { type: "hidden" } },
                            { header: true, value: "제품명", format: { type: "label" } },
                            { name: "prod_nm", display: true, format: { type: "text", width: 458 },  editable: { type: "hidden" } },
                            { header: true, value: "발생Module", format: {  type: "label" } },
                            { name: "prod_sub", editable: { type: "select", data: { memory: "모듈"  } } },
                            { name: "prod_type", hidden: true, editable: {type: "hidden"} },
                            { name: "prod_key",hidden: true,editable: { type: "hidden" } }
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
                            { style: { colspan: 5 }, name: "rmk", format: { type: "text", width: 734 },  editable: { type: "text", width: 734 } }
                        ]
                    },
                    {
                        element: [
                            {  header: true,  value: "등록자",  format: {  type: "label" }  },
                            {  name: "ins_usr"  },
                            {  header: true, value: "수정자", format: { type: "label" }  },
                            {  name: "upd_usr" },
                            {  header: true, value: "작성일시",  format: { type: "label" } },
                            {  name: "upd_dt" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "CS표준유무", format: { type: "label" } },
                            { name: "standard_yn", editable: { type: "select", data: { memory: "유/무" } } },
                            { header: true, value: "CS표준준수여부", format: { type: "label" } },
                            { name: "follow_yn", editable: { type: "select", data: { memory: "준수여부" } } },
                            { header: true, value: "표준번호", format: { type: "label" } },
                            { name: "standard_no", editable: { type: "text", maxlength: 20, width: 254 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "제조Test유무", format: { type: "label" } },
                            { name: "ptest_yn", editable: { type: "select", data: { memory: "유/무" } } },
                            { header: true, value: "1차원인선택", format: { type: "label" } },
                            { name: "factor_tp", editable: { type: "select", data: { memory: "1차원인" } } },
                            { header: true, value: "1차원인근거", format: { type: "label" } },
                            { name: "basis_rmk", editable: { type: "text", maxlength: 100, width: 254 } }
                        ]
                    }
                    //{
                    //    element: [
                    //        { header: true, value: "품질확인",  format: { type: "label" }  },
                    //        {  name: "qstat" },
                    //        { header: true,  value: "품질확인자", format: { type: "label" } },
                    //        {  name: "qemp" },
                    //        { header: true, value: "품질확인일시", format: { type: "label" } },
                    //        { name: "qdate" }
                    //    ]
                    //},
                    //{
                    //    element: [
                    //        { header: true, value: "품질확인메모", format: {  type: "label" }  },
                    //        { style: { colspan: 5 }, name: "qnote" },
                    //        { name: "ncr_stat", hidden: true }
                    //    ]
                    //}
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        
        //grdData_발생내역====================================================================
        var args = { targetid: "grdData_발생내역", query: "EHM_2010_S_1_1", title: "발생 내역",
            caption: true, height: "100%", pager: false, show: true, selectable: true,
            editable: { master: true, multi: true, bind: "select", focus: "status_tp1", validate: true },
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
				{  header: "발생Module",  name: "prod_sub", width: 80, align: "center",
				    format: {  type: "select",  data: { memory: "모듈"  } },
				    editable: { validate: { rule: "required" }, type: "select",
				        data: {  memory: "모듈", unshift: [ { title: "-", value: "" }  ] }
				    }
				},
				{  header: "발생현상(대)", name: "status_grp", width: 80, align: "center",
				    format: { type: "select", data: { memory: "발생현상(대)"} },
				    editable: { validate: { rule: "required" }, type: "select",
				        data: { memory: "발생현상(대)", unshift: [{ title: "-", value: ""}] },
				        change: [
							{ name: "status_tp1", memory: "현상분류", unshift: [{ title: "-", value: ""}],
							   by: [{ source: { id: "frmData_발생정보", row: 1, key: "prod_type"} } , { key: "status_grp"}]
							}
						]
				    }
				},
				{  header: "발생현상(중)", name: "status_tp1", width: 130, align: "center",
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
				{  header: "발생현상(소)", name: "status_tp2", width: 130, align: "center",
				    format: { type: "select", data: { memory: "현상구분"} },
				    editable: {
				        validate: { rule: "required" }, type: "select",
				        data: { memory: "현상구분", unshift: [{ title: "-", value: ""}],
				            by: [ { source: { id: "frmData_발생정보", row: 1, key: "prod_type"} },  { key: "status_tp1" }] }
				    }
				},
				{  header: "원인부위분류",  name: "part_tp1", width: 90, align: "center",
				    format: { type: "select", data: { memory: "원인부위분류"} },
				    editable: {
				        type: "select",
				        data: { memory: "원인부위분류", unshift: [{ title: "-", value: ""}],
				            by: [ { source: { id: "frmData_발생정보", row: 1, key: "prod_type" } }  ]
				        },
				        change: [
							{  name: "part_tp2", memory: "원인부위구분",  unshift: [ { title: "-", value: "" } ],
							    by: [ {  source: {  id: "frmData_발생정보", row: 1, key: "prod_type" } },
                                    { key: "part_tp1" }
                                ]
							}
						]
				    }
				},
				{  header: "원인부위구분",  name: "part_tp2", width: 130, align: "center",
				    format: {  type: "select", data: {  memory: "원인부위구분" }  },
				    editable: { type: "select",  data: {  memory: "원인부위구분", unshift: [  { title: "-", value: "" }   ],
				            by: [  {  source: {  id: "frmData_발생정보", row: 1, key: "prod_type" } }, { key: "part_tp1" }  ]
				        }
				    }
				},
				{  header: "원인분류",  name: "reason_tp1", width: 90, align: "center",
				    format: {  type: "select",  data: {  memory: "원인분류"  } },
				    editable: { validate: { rule: "required" }, type: "select",
				        data: {  memory: "원인분류",  unshift: [  { title: "-", value: "" } ],
				            by: [ { source: {  id: "frmData_발생정보", row: 1, key: "prod_type"  }  }  ]
				        },
				        change: [
							{ name: "reason_tp2",   memory: "원인구분",  unshift: [  { title: "-", value: "" } ],
							    by: [  { source: { id: "frmData_발생정보", row: 1, key: "prod_type" } },
                                    { key: "reason_tp1" }
                                ]
							}
						]
				    }
				},
				{  header: "원인구분",  name: "reason_tp2", width: 130, align: "center",
				    format: { type: "select", data: { memory: "원인구분"} },
				    editable: { validate: { rule: "required" }, type: "select",
				        data: {  memory: "원인구분",  unshift: [ { title: "-", value: "" } ],
				            by: [  {  source: { id: "frmData_발생정보", row: 1, key: "prod_type" } },
                                { key: "reason_tp1" }
                            ]
				        }
				    }
				},
				{  header: "귀책분류",  name: "duty_tp1", width: 90, align: "center",
				    format: {  type: "select",  data: { memory: "귀책분류"  } },
				    editable: {
				        type: "select",  data: {  memory: "귀책분류",  unshift: [ { title: "-", value: "" }  ],
				            by: [  { source: {  id: "frmData_발생정보", row: 1, key: "prod_type" } } ]
				        },
				        change: [
							{  name: "duty_tp2", memory: "귀책구분", unshift: [  { title: "-", value: "" } ],
							    by: [  { source: { id: "frmData_발생정보", row: 1, key: "prod_type"  } },  { key: "duty_tp1" } ]
							}
						]
				    }
				},
				{  header: "귀책구분",  name: "duty_tp2", width: 130, align: "center",
				    format: {  type: "select",  data: { memory: "귀책구분"  }  },
				    editable: {  type: "select",  data: {  memory: "귀책구분", unshift: [ { title: "-", value: "" }  ],
				            by: [  { source: { id: "frmData_발생정보", row: 1, key: "prod_type"  }  },  { key: "duty_tp1" } ] }
				    }
				},
                { name: "prod_type", hidden: true,  editable: { type: "hidden" } },
                { name: "issue_no",  hidden: true, editable: {  type: "hidden" }  }
			]
        };
        //----------
        gw_com_module.gridCreate(args);

        //frmData_발생내용====================================================================
        var args = {targetid: "frmData_발생내용", query: "EHM_2010_S_2",  type: "TABLE", title: "발생 내용", width: "100%", show: true,
            selectable: true,  editable: {  bind: "select",  //focus: "rmk_text",
                validate: true },
            content: {  height: 25, width: { label: 80,  field: 720  },
                row: [
                    {
                        element: [
                            { header: true,  value: "발생내용", format: {  type: "label" } },
                            { name: "rmk_text", format: { type: "textarea", rows: 7, width: 734  },
                              editable: { type: "textarea",  rows: 7, width: 734  } },
                            { name: "rmk_cd",  hidden: true,  editable: {  type: "hidden" } },
                            { name: "issue_no",hidden: true,editable: {type: "hidden"}}
                           ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);

        //grdData_조치내역=====================================================================
        var args = { targetid: "grdData_조치내역", query: "EHM_2010_S_3_1", title: "조치 내역",
            caption: true, height: "100%", pager: false, show: true, selectable: true,
            editable: { multi: true, bind: "select", focus: "work_dt", validate: true },
            element: [
				{ header: "순번", name: "issue_seq", width: 35, align: "center",
				  editable: { type: "hidden" }
				},
				{  header: "조치일자",  name: "work_dt", width: 92, align: "center",mask: "date-ymd",
				   editable: {  validate: { rule: "required" },  type: "text" }
				},
				{  header: "조치분류",  name: "work_tp1", width: 125, align: "center", format: { type: "select", data: { memory: "조치분류" } },
				    editable: {  validate: { rule: "required" },  type: "select",
				        data: {  memory: "조치분류",  unshift: [  { title: "-", value: "" }  ],
				            by: [  { source: { id: "frmData_발생정보", row: 1, key: "prod_type" } }  ]
				        },
				        change: [
							{  name: "work_tp2",  memory: "조치구분",  unshift: [  { title: "-", value: "" }  ],
							    by: [ {source: {   id: "frmData_발생정보", row: 1, key: "prod_type" }  },  { key: "work_tp1" } ]
							}
						]
				    }
				},
				{  header: "조치구분",  name: "work_tp2", width: 120, align: "center",
				    format: {  type: "select",  data: { memory: "조치구분" }  },
				    editable: { validate: { rule: "required" },  type: "select",
				        data: {  memory: "조치구분",  unshift: [ { title: "-", value: "" }  ],
				            by: [  {  source: {  id: "frmData_발생정보", row: 1, key: "prod_type" }  }, { key: "work_tp1" } ]  }
				    }
				},
				{  header: "작업시간",  name: "work_time", width: 60, align: "center",  mask: "numeric-float", editable: {  validate: { rule: "required" },  type: "text" } },
				{  header: "작업자1",  name: "work_man1", width: 80, align: "center", editable: {  type: "text" } },
				{  header: "작업자2",  name: "work_man2", width: 80, align: "center",  editable: { type: "text"  } },
				{  header: "작업자3",  name: "work_man3", width: 80, align: "center", editable: {  type: "text"  } },
				{  header: "작업자4",  name: "work_man4", width: 80, align: "center",  editable: { type: "text"  } },
				{  header: "작업자5",  name: "work_man5", width: 80, align: "center", editable: { type: "text" } },
				{  header: "상태",  name: "pstat", width: 70, align: "center",  format: { type: "select", data: {  memory: "조치상태" }  },
				   editable: { validate: { rule: "required" }, type: "select",  data: { memory: "조치상태",  unshift: [ { title: "-", value: "" }  ] }  }
				},
				{  header: "완료일자",  name: "end_dt", width: 92, align: "center", mask: "date-ymd",  editable: {  type: "text"  } },
				{  header: "완료시각",  name: "end_time", width: 60, align: "center",  mask: "time-hh", editable: { type: "text" } },
                {  name: "work_seq",  hidden: true,  editable: {  type: "hidden"  } },
                {  name: "issue_no",  hidden: true, editable: { type: "hidden" } }
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = { targetid: "frmData_조치내용", query: "EHM_2010_S_4", type: "TABLE",  title: "조치 내용", width: "100%",  show: true, selectable: true,
            editable: { bind: "select",  validate: true },
            content: { height: 25,  width: { label: 80, field: 720  },
                row: [
                    { element: [
                            { header: true,  value: "조치내용",   format: { type: "label"  } },
                            { name: "rmk_text", format: { type: "textarea", rows: 10, width: 734 },
                              editable: {type: "textarea", rows: 10,  width: 734  }
                            },
                            { name: "rmk_cd", hidden: true, editable: {  type: "hidden"  } },
                            { name: "issue_no", hidden: true,  editable: {  type: "hidden" }  }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_교체PART", query: "EHM_2010_S_5_1", title: "교체 PART", caption: true, height: "100%", pager: false, show: true, selectable: true,
            editable: { multi: true, bind: "select", focus: "change_tp", validate: true },
            element: [
				{ header: "순번", name: "issue_seq", width: 35, align: "center", editable: { type: "hidden" } },
            /*{
            header: "교체구분",
            name: "change_tp",
            width: 80,
            align: "center",
            format: {
            type: "select",
            data: {
            memory: "교체구분"
            }
            },
            editable: {
            type: "select",
            data: {
            memory: "교체구분"
            }
            }
            },*/
				{ header: "교체일자", name: "change_dt", width: 92, align: "center", mask: "date-ymd", editable: {  validate: { rule: "required" },  type: "text" } },
				{ header: "수급시간",  name: "change_time", width: 70, align: "center", mask: "numeric-float",  editable: { validate: { rule: "required" },  type: "text" } },
				{ header: "수량",  name: "change_qty", width: 50, align: "center", mask: "numeric-int", editable: { validate: { rule: "required" }, type: "text"  } },
				{ header: "참원인부품", name: "reason_yn", width: 60, align: "center", format: { type: "checkbox", title: "", value: 1, offval: 0 }, editable: { type: "checkbox", title: "", value: 1, offval: 0 } },
				{ header: "반입", name: "reinput_yn", width: 40, align: "center", format: { type: "checkbox", title: "", value: 1, offval: 0 }, editable: { type: "checkbox", title: "", value: 1, offval: 0 }},
				{ header: "부품상태",  name: "part_stat", width: 80, align: "center", format: { type: "select",  data: { memory: "부품상태" } },
				  editable: {  validate: { rule: "required" }, type: "select", data: { memory: "부품상태",  unshift: [  { title: "-", value: "" } ] }  }
				},
				{  header: "기장착부품군",  name: "apart_tp", width: 120, align: "center",format: {type: "select",data: {memory: "부품군" }},
				   editable: { validate: { rule: "required" }, type: "select",
				   data: { memory: "부품군", unshift: [ { title: "-", value: "" } ],  push: [ { title: "기타", value: "기타" } ],
				   by: [ { source: { id: "frmData_발생정보", row: 1, key: "prod_type" } } ] } }
				},
				{  header: "기장착부품코드",  name: "apart_cd", width: 120, align: "center", mask: "search",
				   editable: { type: "text",  readonly: false }
				},
				{  header: "기장착부품명",  name: "apart_nm", width: 200, align: "left",
				   editable: { validate: { rule: "required" }, type: "text"  }
				},
				{  header: "제조사",  name: "apart_supp", width: 150, align: "left" },
				{  header: "모델",  name: "apart_model", width: 150, align: "center" },
				{  header: "규격(REV)",  name: "apart_rev", width: 150, align: "center" },
				{  header: "비고(REV)",  name: "apart_rmk", width: 300, align: "left" },
				{  header: "발생현상",  name: "status_tp1_nm", width: 150, align: "center",  mask: "search",  display: true,
				   editable: {  type: "text",  readonly: true  } },
				{  header: "세부현상",  name: "status_tp2_nm", width: 150, align: "center", display: true,
				   editable: {type: "text",  readonly: true } },
				{  header: "현상비고",  name: "status_rmk", width: 300, align: "left",
				   editable: { type: "text", readonly: true }
				},
				{  header: "기장착부품 Ser.No.",  name: "apart_sno", width: 150, align: "center", editable: {  type: "text" } },
				{  header: "교체부품군",  name: "bpart_tp", width: 120, align: "center", format: {  type: "select", data: { memory: "부품군"  }  },
				   editable: { validate: { rule: "required" },  type: "select",
				   data: {  memory: "부품군",   unshift: [  { title: "-", value: "" }  ], push: [ { title: "기타", value: "기타" } ],
				   by: [ {  source: { id: "frmData_발생정보", row: 1, key: "prod_type" }  }  ]  } }
				},
				{  header: "교체부품코드",  name: "bpart_cd", width: 120, align: "center", mask: "search",
				   editable: {type: "text", readonly: false } },
				{  header: "교체부품명",  name: "bpart_nm", width: 200, align: "left",
				   editable: { validate: { rule: "required" },  type: "text" }
				},
				{ header: "구매요청", name: "charge_cs", width: 70, align: "center", format: { type: "select", data: { memory: "YesNo"} },
				  editable: { type: "select", validate: { rule: "required" },  data: { memory: "YesNo", unshift: [{ title: "-", value: ""}] } }
				},
				{  header: "제조사",  name: "bpart_supp", width: 150, align: "left" },
				{  header: "모델",  name: "bpart_model", width: 150, align: "center" },
				{  header: "규격(REV)",  name: "bpart_rev", width: 150, align: "center" },
				{ header: "비고(REV)", name: "bpart_rmk", width: 300, align: "left" },
				{  header: "교체부품 Ser.No.",  name: "bpart_sno", width: 150, align: "center",
				   editable: {  type: "text" } },
				{ name: "charge_yn", hidden: true, editable: { type: "hidden"} },
				{ header: "상태", name: "pstat", width: 70, align: "center", editable: { type: "text"} },
				{ header: "성적표 파일", name: "file_nm", width: 200, align: "left", editable: { type: "text", readonly: true} },
                { name: "file_id", hidden: true, editable: { type: "hidden"} },
                { name: "file_path", hidden: true, editable: { type: "hidden"} },
            /*                {
            name: "apart_key",
            hidden: true,
            editable: { type: "hidden" }
            },
            {
            name: "bpart_key",
            hidden: true,
            editable: {
            type: "hidden"
            }
            },
            {
            name: "apart_bom",
            hidden: true,
            editable: {
            type: "hidden"
            }
            },
            {
            name: "bpart_bom",
            hidden: true,
            editable: {
            type: "hidden"
            }
            }, */
                { name: "status_etc", hidden: true },
                { name: "status_tp1", hidden: true, editable: { type: "hidden" } },
                { name: "status_tp2",  hidden: true, editable: {type: "hidden" }},
                { name: "change_tp", hidden: true,  editable: { type: "hidden"  } },
                { name: "change_div", hidden: true, editable: { type: "hidden" }  },
                { name: "prod_type",  hidden: true, editable: {  type: "hidden" } },
                { name: "part_seq", hidden: true, editable: {  type: "hidden"  } },
                { name: "issue_no", hidden: true, editable: { type: "hidden" } }
			]
        };
        //----------
        gw_com_module.gridCreate(args);

        //=====================================================================================
        var args = {
            targetid: "frmData_교체PART", query: "EHM_2010_S_5_2", type: "TABLE", title: "교체 PART",
            show: true, selectable: true,
            editable: { bind: "select", focus: "work_tp1", validate: true },
            content: {
                width: { label: 80, field: 190 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "교체일자", format: { type: "label" } },
                            { name: "change_dt", editable: { type: "text" } },
                            { header: true, value: "기장착부품명", format: { type: "label" } },
                            { name: "change_time", editable: { type: "text" } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "구매요청", format: { type: "label" } },
                            { name: "change_dt", editable: { type: "text" } },
                            { header: true, value: "반입여부", format: { type: "label" } },
                            { name: "change_time", editable: { type: "text" } }
                        ]
                    }
                ]
            }
        };
        //----------
        //gw_com_module.formCreate(args);


        //=====================================================================================
        var args = {
            targetid: "frmData_교체내용", query: "EHM_2010_S_6", type: "TABLE", title: "교체 내용",  width: "100%",  show: true, selectable: true,
            editable: {  bind: "select",  validate: true },
            content: { width: { label: 80, field: 720 },  height: 25,
                row: [
                    {
                        element: [
                            {  header: true,  value: "교체내용",  format: {  type: "label" }  },
                            {
                                name: "rmk_text", format: { type: "textarea", rows: 4, width: 734 },
                                editable: { type: "textarea", rows: 4, width: 734 }
                            },
                            {  name: "rmk_cd",  hidden: true, editable: { type: "hidden"  }  },
                            { name: "issue_no", hidden: true, editable: {  type: "hidden" }  }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_처리결과", query: "EHM_2010_S_0_2", type: "TABLE", title: "처리 결과",
            caption: true, show: false, selectable: true,
            content: {  width: {  label: 80,  field: 190  },  height: 25,
                row: [
                    {
                        element: [
                            { header: true,  value: "처리일자",  format: {  type: "label" } }, { name: "rslt_date",  mask: "date-ymd" },
                            { header: true,  value: "유형분류", format: {   type: "label"  } },  {  name: "issue_cd" },
                            { header: true, value: "유형구분", format: {    type: "label" } }, {  name: "issue_tp" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "처리결과", format: { type: "label"  }  },  { name: "rslt_tp" },
                            { header: true, value: "발생구분", format: { type: "label"  } },   { name: "reason_cd" },
                            { header: true, value: "관리구분", format: { type: "label"  }  },  {  name: "mng_cd" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "해당업체", format: { type: "label" }  }, { name: "supp_nm" },
                            { header: true, value: "귀책구분", format: { type: "label" } }, { name: "duty_cd" },
                            { header: true, value: "반출일자", format: { type: "label" } }, { name: "mout_date",  mask: "date-ymd" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "처리자",   format: {  type: "label" } }, { name: "rslt_emp" },
                            { header: true, value: "작성일시", format: {  type: "label"  } }, { name: "upd_dt" },
                            { header: true, value: "처리완료", format: {  type: "label" } }, {  name: "complete_yn", format: {  type: "checkbox",  title: "완료", value: "1" }}
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "개선대책<br>및<br>처리내역", format: { type: "label" } },
                            { style: { colspan: 5 },  name: "rslt_rmk1", format: { type: "textarea", rows: 5, width: 734 } }
                        ]
                    },
                    {
                        element: [
                            {  header: true,  value: "특이사항", format: {  type: "label" } },
                            {  style: { colspan: 5  },  name: "rslt_rmk2", format: { type: "textarea", rows: 5,  width: 734  }  },
            				{  name: "issue_no",  value: "",  hidden: true }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_첨부파일", query: "EHM_2010_S_7", title: "첨부 파일", caption: true, height: "100%", pager: false, show: true, number: true, selectable: true,
            editable: { multi: true, bind: "_edit_yn", focus: "file_desc", validate: true },
            element: [
				{ header: "파일명", name: "file_nm", width: 270, align: "left" },
				{ header: "다운로드", name: "download", width: 60, align: "center", format: { type: "link", value: "다운로드" } },
                { header: "등록자", name: "upd_usr", width: 70, align: "center" },
                { header: "부서", name: "upd_dept", width: 80, align: "center" },
				{ header: "설명", name: "file_desc", width: 330, align: "left", editable: { type: "text" } },
                { name: "file_path", hidden: true },
                { name: "file_id", hidden: true, editable: { type: "hidden" } },
				{ name: "_edit_yn", hidden: true }
			]
        };
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_상세메모", query: "EHM_2010_S_8", type: "TABLE", title: "상세 메모", caption: true, width: "100%", show: true, selectable: true,
            content: { width: { field: "100%"  },  height: 200,
                row: [
                    {
                        element: [
                            {  name: "memo_text", format: {  type: "html",  height: 200 } },
                            {  name: "issue_no", hidden: true, editable: { type: "hidden" } }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = { targetid: "lyrDown", width: 0, height: 0, show: false };
        gw_com_module.pageCreate(args);
        //=====================================================================================
        var args = {
            target: [
				//{ type: "GRID", id: "grdData_발생정보", offset: 8 },
				{ type: "FORM", id: "frmData_발생정보", offset: 8 },
				{ type: "GRID", id: "grdData_발생내역", offset: 8 },
				{ type: "FORM", id: "frmData_발생내용", offset: 8 },
				{ type: "GRID", id: "grdData_조치내역", offset: 8 },
				{ type: "FORM", id: "frmData_조치내용", offset: 8 },
				{ type: "GRID", id: "grdData_교체PART", offset: 8 },
				{ type: "FORM", id: "frmData_교체내용", offset: 8 },
				{ type: "FORM", id: "frmData_처리결과", offset: 8 },
				{ type: "GRID", id: "grdData_첨부파일", offset: 8 },
				{ type: "FORM", id: "frmData_상세메모", offset: 8 }
			]
        };
        //----------
        gw_com_module.objResize(args);
        //=====================================================================================
//        var args = {
//            tabid: "lyrTab",
//            target: [ { type: "LAYER", id: "lyrData_등록", title: "발생 등록" } ]
//        };
//        //----------
//        gw_com_module.convertTab(args);
        //=====================================================================================
        var args = {
            target: [ {  type: "TAB", id: "lyrTab", offset: 8 } ]
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

    
    // manage process. (program section) 
    //#region
    procedure: function () {

      
        // define event.
    
        //var args = { targetid: "lyrMenu_1_1", element: "조회", event: "click", handler: click_lyrMenu_1_1_조회 };
        //gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "추가", event: "click", handler: click_lyrMenu_1_1_추가 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "삭제", event: "click", handler: click_lyrMenu_1_1_삭제 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "저장", event: "click", handler: click_lyrMenu_1_1_저장 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "출력", event: "click", handler: click_lyrMenu_1_1_출력 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "NCR", event: "click", handler: click_lyrMenu_1_1_NCR };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "ECR", event: "click", handler: click_lyrMenu_1_1_ECR };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_1", element: "닫기", event: "click", handler: click_lyrMenu_1_닫기 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_1_2", element: "닫기", event: "click", handler: click_lyrMenu_1_닫기 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_2", element: "추가", event: "click", handler: click_lyrMenu_2_추가 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_2", element: "삭제", event: "click", handler: click_lyrMenu_2_삭제 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_3", element: "추가", event: "click", handler: click_lyrMenu_3_추가 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_3", element: "삭제", event: "click", handler: click_lyrMenu_3_삭제 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_4", element: "추가", event: "click", handler: click_lyrMenu_4_추가 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_4", element: "삭제", event: "click", handler: click_lyrMenu_4_삭제 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_4", element: "성적표등록", event: "click", handler: click_lyrMenu_4_성적표등록 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_4", element: "성적표보기", event: "click", handler: click_lyrMenu_4_성적표보기 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_4", element: "성적표삭제", event: "click", handler: click_lyrMenu_4_성적표삭제 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_5", element: "추가", event: "click", handler: click_lyrMenu_5_추가 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_5", element: "삭제", event: "click", handler: click_lyrMenu_5_삭제 };
        gw_com_module.eventBind(args);
        //----------
        var args = {   targetid: "lyrMenu_6",  element: "편집",  event: "click", handler: click_lyrMenu_6_편집  };
        gw_com_module.eventBind(args);
        //----------
       /* var args = { targetid: "frmOption", element: "실행",  event: "click",  handler: click_frmOption_실행  };
        gw_com_module.eventBind(args);
        //----------
        var args = {  targetid: "frmOption", element: "취소",  event: "click",  handler: click_frmOption_취소 };
        gw_com_module.eventBind(args);
        */
                //----------
        var args = { targetid: "frmView", event: "itemchanged", handler: itemchanged_frmView };
        gw_com_module.eventBind(args);

        /*
        //----------
        var args = { targetid: "frmView1", event: "itemchanged", handler: itemchanged_frmView1  };
        gw_com_module.eventBind(args);
        */


        //----------
        var args = { targetid: "lyrTab", event: "tabselect", handler: click_lyrTab_tabselect };
        gw_com_module.eventBind(args);

        //-- 안쓰는 부분 by 훈
        //----------
        /* var args = { targetid: "grdData_발생정보", grid: true, event: "rowselecting", handler: rowselecting_grdData_발생정보 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_발생정보", grid: true, event: "rowselected", handler: rowselected_grdData_발생정보 };
        gw_com_module.eventBind(args);
        */ 

        //----------
        var args = { targetid: "frmData_발생정보", event: "itemdblclick", handler: itemdblclick_frmData_발생정보 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmData_발생정보", event: "itemkeyenter", handler: itemdblclick_frmData_발생정보 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_발생내역", grid: true, event: "rowselecting", handler: rowselecting_grdData_발생내역 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_발생내역", grid: true, event: "rowselected", handler: rowselected_grdData_발생내역 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_조치내역", grid: true, event: "itemchanged", handler: itemchanged_grdData_조치내역 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_교체PART", grid: true, event: "rowselected", handler: rowselected_grdData_교체PART };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_교체PART", grid: true, event: "itemchanged", handler: itemchanged_grdData_교체PART };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_교체PART", grid: true, event: "itemdblclick", handler: itemdblclick_grdData_교체PART };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_교체PART", grid: true, event: "itemkeyenter", handler: itemdblclick_grdData_교체PART };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmData_발생내용", event: "itemdblclick", handler: itemdblclick_frmData_발생내용  };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmData_조치내용",  event: "click", handler: click_frmData_조치내용 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmData_조치내용", event: "itemdblclick", handler: itemdblclick_frmData_조치내용  };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmData_교체내용", event: "click", handler: click_frmData_교체내용 };
        gw_com_module.eventBind(args);
        //----------
        var args = {  targetid: "frmData_교체내용", event: "itemdblclick", handler: itemdblclick_frmData_교체내용 };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdData_첨부파일", grid: true, element: "download", event: "click", handler: click_grdData_첨부파일_download };
        gw_com_module.eventBind(args);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // event handler.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        /*function click_lyrMenu_1_1_조회(ui) {
            var args = { target: [{ id: "frmOption", focus: true}] };
            gw_com_module.objToggle(args);
        }
        */
        //----------
        function click_lyrMenu_1_1_추가(ui) {
            v_global.process.handler = processInsert;
            if (!checkUpdatable({})) return;
            processInsert({});

        }
        //----------
        function click_lyrMenu_1_1_삭제(ui) {
            if (!checkManipulate({})) return;
            v_global.process.handler = processRemove;
            checkRemovable({});
        }
        //----------
        function click_lyrMenu_1_1_저장(ui) {
            closeOption({});
            processSave({});
        }
        //----------
        function click_lyrMenu_1_1_출력(ui) {
            if (!checkManipulate({})) return;
            if (!checkUpdatable({ check: true })) return false;
            if (!checkExportable({})) return;
            processExport();
        }
        //----------
        function click_lyrMenu_1_1_NCR(ui) {
            if (!checkManipulate({})) return;
            if (!checkUpdatable({ check: true })) return false;
            var sNcrStat = gw_com_api.getValue("frmData_발생정보", 1, "ncr_stat");
            if (sNcrStat != "발생") {
                gw_com_api.messageBox([{ text: "이미 NCR 접수가 진행 중인 건입니다." }], 300);
                return;
            }

            var args = {
                url: "COM", procedure: "PROC_NCR_CreateFromIssue", nomessage: true,
                input: [
                    { name: "IssueNo", value: gw_com_api.getValue("frmData_발생정보", 1, "issue_no") },
                    { name: "UserId", value: gw_com_module.v_Session.USR_ID, type: "varchar" },
                    { name: "UserDept", value: gw_com_module.v_Session.DEPT_CD, type: "varchar" }
                ]
            };
            gw_com_module.callProcedure(args);
            gw_com_api.showMessage("NCR 접수 완료!", "success")
            ////response.VALUE[0]
            //gw_com_api.messageBox([
            //    { text: "NCR 접수 완료!" }  
            //    ], 420, gw_com_api.v_Message.msg_informBatched, "ALERT",
            //    { handler: successRun, response: response });

        }
        //----------
        function click_lyrMenu_1_1_ECR(ui) {
            if (!checkManipulate({})) return;
            if (!checkUpdatable({ check: true })) return false;

            var args = {
                ID: gw_com_api.v_Stream.msg_linkPage,
                to: { type: "MAIN" },
                data: { page: "w_eccb1010", title: "ECR 등록",
                    param: [
                        { name: "issue_no", value: gw_com_api.getValue("frmData_발생정보", "1", "issue_no") }
                    ]
                }
            };
            gw_com_module.streamInterface(args);

        }
        //----------
        function click_lyrMenu_1_닫기(ui) {
            checkClosable({});
        }
        //----------
        function click_lyrMenu_2_추가(ui) {
            if (!checkManipulate({})) return;
            v_global.process.handler = processInsert;
            if (!checkUpdatable({ sub: true })) return;
            processInsert({ sub: true });
        }
        //----------
        function click_lyrMenu_2_삭제(ui) {
            if (!checkManipulate({})) return;
            if (gw_com_api.getRowCount("grdData_발생내역") < 2) {
                gw_com_api.messageBox([
                    { text: "발생 내역은 최소 한 건은 입력되어야 합니다." }
                ]);
                return false;
            }
            v_global.process.handler = processRemove;
            checkRemovable({ sub: true });
        }
        //----------
        function click_lyrMenu_3_추가(ui) {

            if (!checkManipulate({ sub: true })) return;

            var args = {
                targetid: "grdData_조치내역",
                edit: true,
                updatable: true,
                data: [
                    { name: "issue_seq", value: gw_com_api.getValue("grdData_발생내역", "selected", "issue_seq", true) },
                    { name: "work_man1", rule: "COPY", row: "prev", value: gw_com_module.v_Session.USR_NM}/*,
                    { name: "work_dt", rule: "COPY", row: "prev" },
                    { name: "work_time", rule: "COPY", row: "prev" },
                    { name: "work_tp1", rule: "COPY", row: "prev" },
                    { name: "work_tp2", rule: "COPY", row: "prev" },
                    { name: "work_man2", rule: "COPY", row: "prev" },
                    { name: "work_man3", rule: "COPY", row: "prev" },
                    { name: "work_man4", rule: "COPY", row: "prev" },
                    { name: "work_man5", rule: "COPY", row: "prev" },
                    { name: "pstat", rule: "COPY", row: "prev" }*/
                ]
            };
            gw_com_module.gridInsert(args);
            if (gw_com_api.getCRUD("frmData_조치내용") == "none") {
                args = {
                    targetid: "frmData_조치내용", edit: true, updatable: true,
                    data: [
                        { name: "rmk_cd", value: "WORK" },
                        { name: "rmk_text", value: "조치부서에서 이해할 수 있도록 6하원칙에 의거하여 작성하시오" }
                    ]
                };
                gw_com_module.formInsert(args);
            }

        }
        //----------
        function click_lyrMenu_3_삭제(ui) {

            if (!checkManipulate({ sub: true })) return;

            var args = {
                targetid: "grdData_조치내역",
                row: "selected"
            }
            gw_com_module.gridDelete(args);

        }
        //----------
        function click_lyrMenu_4_추가(ui) {

            if (!checkManipulate({ sub: true })) return;

            var args = { targetid: "grdData_교체PART", edit: true, updatable: true,
                data: [
                    { name: "issue_seq", value: gw_com_api.getValue("grdData_발생내역", "selected", "issue_seq", true) },
                    { name: "prod_type", rule: "COPY", row: "prev", value: gw_com_api.getValue("frmData_발생정보", 1, "prod_type")}/*,
                    { name: "change_div", rule: "COPY", row: "prev" },
                    { name: "change_tp", rule: "COPY", row: "prev" },                    
                    { name: "change_dt", rule: "COPY", row: "prev" },
                    { name: "change_time", rule: "COPY", row: "prev" },
                    { name: "change_qty", rule: "COPY", row: "prev" },
                    { name: "part_stat", rule: "COPY", row: "prev" },
                    { name: "apart_tp", rule: "COPY", row: "prev" },
                    { name: "apart_cd", rule: "COPY", row: "prev" },
                    { name: "apart_nm", rule: "COPY", row: "prev" },
                    { name: "apart_sno", rule: "COPY", row: "prev" },
                    { name: "bpart_tp", rule: "COPY", row: "prev" },
                    { name: "bpart_cd", rule: "COPY", row: "prev" },
                    { name: "bpart_nm", rule: "COPY", row: "prev" },
                    { name: "bpart_sno", rule: "COPY", row: "prev" },
                    { name: "status_tp1", rule: "COPY", row: "prev" },
                    { name: "status_tp2", rule: "COPY", row: "prev" },
                    { name: "status_tp1_nm", rule: "COPY", row: "prev" },
                    { name: "status_tp2_nm", rule: "COPY", row: "prev" },
                    { name: "status_rmk", rule: "COPY", row: "prev" },
                    { name: "charge_cs", rule: "COPY", row: "prev" },
                    { name: "charge_yn", rule: "COPY", row: "prev" },
                    { name: "pstat", rule: "COPY", row: "prev" }*/
                ]
            };
            gw_com_module.gridInsert(args);
            if (gw_com_api.getCRUD("frmData_교체내용") == "none") {
                args = {
                    targetid: "frmData_교체내용",
                    edit: true,
                    updatable: true,
                    data: [
                        { name: "rmk_cd", value: "PART" }
                    ]
                };
                gw_com_module.formInsert(args);
            }

        }
        //----------
        function click_lyrMenu_4_삭제(ui) {

            if (!checkManipulate({ sub: true })) return;

            var args = { targetid: "grdData_교체PART", row: "selected" }
            gw_com_module.gridDelete(args);

        }
        //----------
        function click_lyrMenu_4_성적표등록(ui) {

            if (!checkManipulate({ part: true })) return;

            var args = { type: "PAGE", page: "w_upload_aspart", title: "성적표 파일 업로드",
                width: 650, height: 200, locate: ["center", 910], open: true
            };
            if (gw_com_module.dialoguePrepare(args) == false) {
                var args = { page: "w_upload_aspart",
                    param: {
                        ID: gw_com_api.v_Stream.msg_upload_ECCB,
                        data: { user: gw_com_module.v_Session.USR_ID,
                            key: gw_com_api.getValue("grdData_교체PART", "selected", "issue_no", true),
                            seq: gw_com_api.getValue("grdData_교체PART", "selected", "issue_seq", true),
                            part_seq: gw_com_api.getValue("grdData_교체PART", "selected", "part_seq", true)
                        }
                    }
                };
                gw_com_module.dialogueOpen(args);
            }

        }
        //----------
        function click_lyrMenu_4_성적표보기(ui) {
            if (!checkManipulate({ part: true })) return;

            var FileId = gw_com_api.getValue("grdData_교체PART", "selected", "file_id", true);
            if (FileId < "  ") {
                gw_com_api.showMessage("등록된 성적표가 없습니다.", "yes");
                return;
            }

            var args = {
                source: { id: "grdData_교체PART", row: ui.row },
                targetid: "lyrDown"
            };
            gw_com_module.downloadFile(args);

        }
        //----------
        function click_lyrMenu_4_성적표삭제(ui) {
            if (!checkManipulate({ part: true })) return;

            gw_com_api.setValue("grdData_교체PART", "selected", "file_id", "", true);
            gw_com_api.setValue("grdData_교체PART", "selected", "file_nm", "", true);
            gw_com_api.setValue("grdData_교체PART", "selected", "file_path", "", true);

        }
        //----------
        function click_lyrMenu_5_추가(ui) {

            if (!checkManipulate({})) return;
            if (!checkUpdatable({ check: true })) return false;

            var args = { type: "PAGE", page: "w_upload_asissue", title: "파일 업로드",
                width: 650, height: 200, locate: ["center", 910], open: true
            };
            if (gw_com_module.dialoguePrepare(args) == false) {
                var args = { page: "w_upload_asissue",
                    param: {
                        ID: gw_com_api.v_Stream.msg_upload_ASISSUE,
                        data: { user: gw_com_module.v_Session.USR_ID,
                            key: gw_com_api.getValue("frmData_발생정보", "1", "issue_no"),
                            seq: 0
                        }
                    }
                };
                gw_com_module.dialogueOpen(args);
            }

        }
        //----------
        function click_lyrMenu_5_삭제(ui) {

            if (!checkManipulate({})) return;

            var args = { targetid: "grdData_첨부파일", row: "selected", check: "_edit_yn" }
            gw_com_module.gridDelete(args);

        }
        //----------
        function click_lyrMenu_6_편집(ui) {

            if (!checkManipulate({})) return;
            if (!checkUpdatable({ check: true })) return false;

            var args = {
                type: "PAGE", page: "w_edit_asissue",  title: "상세 메모", width: 700, height: 600, locate: ["center", "bottom"],  open: true
            };
            if (gw_com_module.dialoguePrepare(args) == false) {
                var args = {
                    page: "w_edit_asissue",
                    param: {
                        ID: gw_com_api.v_Stream.msg_edit_ASISSUE,
                        data: {
                            issue_no: gw_com_api.getValue("frmData_발생정보", "1", "issue_no")
                        }
                    }
                };
                gw_com_module.dialogueOpen(args);
            }

        }

        /* -- 실행 
        //----------
        function click_frmOption_실행(ui) {
            v_global.process.handler = processRetrieve;
            if (!checkUpdatable({})) return false;
            processRetrieve({});

        }
        //----------
        function click_frmOption_취소(ui) {

            closeOption({});

        }
        */

        //----------
        function itemchanged_frmView(ui) {

            switch (ui.element) {
                case "view":
                    {
                        if (ui.value.current == "S")
                            gw_com_api.hideCols("grdData_교체PART", [
                                "apart_supp", "apart_model", "apart_rev", "apart_rmk",
                                "bpart_supp", "bpart_model", "bpart_rev", "bpart_rmk"
                            ]);
                        else
                            gw_com_api.showCols("grdData_교체PART", [
                                "apart_supp", "apart_model", "apart_rev", "apart_rmk",
                                "bpart_supp", "bpart_model", "bpart_rev", "bpart_rmk"
                            ]);
                        gw_com_module.objResize({
                            target: [{
                                type: "GRID", id: "grdData_교체PART", offset: 8
                            }]
                        });
                    }
                    break;
            }

        }
        //----------
        function itemchanged_frmView1(ui) {

            //switch (ui.element) {
            //    case "view1":
            //        {
            //            if (ui.value.current == "S")
            //                gw_com_api.hideCols("grdData_발생정보", [
            //                    "issue_no", "cust_nm", "prod_type",
            //                    "qemp", "qdate"
            //                ]);
            //            else
            //                gw_com_api.showCols("grdData_발생정보", [
            //                    "issue_no", "cust_nm", "prod_type",
            //                    "qemp", "qdate"
            //                ]);
            //            gw_com_module.objResize({
            //                target: [{
            //                    type: "GRID", id: "grdData_발생정보", offset: 8
            //                }]
            //            });
            //        }
            //        break;
            //}

        }
        //----------
        function click_lyrTab_tabselect(ui) {

            closeOption({});
            gw_com_api.hide("lyrMenu_1_" + v_global.process.current.tab);
            v_global.process.current.tab = ui.row;
            gw_com_api.show("lyrMenu_1_" + v_global.process.current.tab);

        }


        /*  -- 필요없는 부분 
        //----------
        function rowselecting_grdData_발생정보(ui) {

            v_global.process.handler = processSelect;
            v_global.process.current.master = ui.row;

            return checkUpdatable({});

        }
        //----------
        function rowselected_grdData_발생정보(ui) {
            v_global.process.prev.master = ui.row;
            processLink({ master: true });
        };
        */


        //----------
        function itemdblclick_frmData_발생정보(ui) {

            switch (ui.element) {
                case "cust_nm":
                    {
                        v_global.event.type = ui.type;
                        v_global.event.object = ui.object;
                        v_global.event.row = ui.row;
                        v_global.event.element = ui.element;
                        var args = {
                            type: "PAGE", page: "w_find_prod_ehm", title: "장비 검색", width: 1100,  height: 460, locate: ["center", "top"], open: true
                        };
                        if (gw_com_module.dialoguePrepare(args) == false) {
                            var args = {
                                page: "w_find_prod_ehm",  param: {  ID: gw_com_api.v_Stream.msg_selectProduct_EHM }
                            };
                            gw_com_module.dialogueOpen(args);
                        }
                    }
                    break;
            }
        }
        //----------
        function rowselecting_grdData_발생내역(ui) {

            v_global.process.handler = processSelect;
            v_global.process.current.sub = ui.row;

            return checkUpdatable({ sub: true });

        }
        //----------
        function rowselected_grdData_발생내역(ui) {

            v_global.process.prev.sub = ui.row;

            processLink({ sub: true });

        };
        //----------
        function itemchanged_grdData_조치내역(ui) {

            switch (ui.element) {
                case "pstat":
                    {
                        if (ui.value.current != "완료") {
                            gw_com_api.setValue(ui.object, ui.row, "end_dt", "", true);
                            gw_com_api.setValue(ui.object, ui.row, "end_time", "", true);
                        }
                        if (ui.value.current == "완료") {
                            gw_com_api.messageBox(
                        		[{ text: "발생정보의 상태를 완료로 바꾸시겠습니까?"}], 420
        							, gw_com_api.v_Message.msg_confirmRemove, "YESNO", { itemchange: true });

                            gw_com_api.setValue(ui.object, ui.row, "end_dt", "", true);
                            gw_com_api.setValue(ui.object, ui.row, "end_time", "", true);
                        }
                    }
                    break;
            }
        }
        //----------
        function rowselected_grdData_교체PART(ui) {

            var toggle = (gw_com_api.getValue(ui.object, ui.row, "apart_tp", true) == "기타") ? false : true;
            gw_com_api.setAttribute(ui.object, ui.row, "apart_cd", "readonly", toggle, true);
            gw_com_api.setAttribute(ui.object, ui.row, "apart_nm", "readonly", toggle, true);

            toggle = (gw_com_api.getValue(ui.object, ui.row, "bpart_tp", true) == "기타") ? false : true;
            gw_com_api.setAttribute(ui.object, ui.row, "bpart_cd", "readonly", toggle, true);
            gw_com_api.setAttribute(ui.object, ui.row, "bpart_nm", "readonly", toggle, true);

            toggle = (gw_com_api.getValue(ui.object, ui.row, "status_etc", true) == "1") ? false : true;
            gw_com_api.setAttribute(ui.object, ui.row, "status_tp1_nm", "readonly", toggle, true);
            gw_com_api.setAttribute(ui.object, ui.row, "status_tp2_nm", "readonly", toggle, true);

        };
        //----------
        function itemchanged_grdData_교체PART(ui) {

            switch (ui.element) {
                case "apart_tp":
                    {
                        gw_com_api.clearValue(ui.object, ui.row, "apart_cd", true);
                        gw_com_api.clearValue(ui.object, ui.row, "apart_nm", true);
                        gw_com_api.clearValue(ui.object, ui.row, "apart_supp", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "apart_model", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "apart_rev", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "apart_rmk", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "status_etc", true);
                        gw_com_api.clearValue(ui.object, ui.row, "status_tp1", true);
                        gw_com_api.clearValue(ui.object, ui.row, "status_tp2", true);
                        gw_com_api.clearValue(ui.object, ui.row, "status_tp1_nm", true);
                        gw_com_api.clearValue(ui.object, ui.row, "status_tp2_nm", true);
                        gw_com_api.clearValue(ui.object, ui.row, "status_rmk", true);
                        var toggle = (ui.value.current == "기타") ? false : true;
                        gw_com_api.setAttribute(ui.object, ui.row, "apart_cd", "readonly", toggle, true);
                        gw_com_api.setAttribute(ui.object, ui.row, "apart_nm", "readonly", toggle, true);
                        if (toggle == true)
                            gw_com_api.setValue(ui.object, ui.row, "change_qty", "1", true);
                    }
                    break;
                case "bpart_tp":
                    {
                        gw_com_api.clearValue(ui.object, ui.row, "bpart_cd", true);
                        gw_com_api.clearValue(ui.object, ui.row, "bpart_nm", true);
                        gw_com_api.clearValue(ui.object, ui.row, "bpart_supp", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "bpart_model", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "bpart_rev", true, true);
                        gw_com_api.clearValue(ui.object, ui.row, "bpart_rmk", true, true);
                        var toggle = (ui.value.current == "기타") ? false : true;
                        gw_com_api.setAttribute(ui.object, ui.row, "bpart_cd", "readonly", toggle, true);
                        gw_com_api.setAttribute(ui.object, ui.row, "bpart_nm", "readonly", toggle, true);
                    }
                    break;
                case "status_tp1_nm":
                case "status_tp2_nm":
                    {
                        //if (gw_com_api.getValue(ui.object, ui.row, "status_etc", true) == 1)
                        gw_com_api.setValue(ui.object, ui.row, ui.element.substr(0, 10), ui.value.current, true);
                    }
                    break;
            }

        }
        //----------
        function itemdblclick_grdData_교체PART(ui) {

            switch (ui.element) {
                case "apart_cd":
                case "bpart_cd":
                    {
                        var tp = ui.element.substr(0, 1);
                        if (gw_com_api.getValue(ui.object, ui.row, tp + "part_tp", true) == "") {
                            gw_com_api.messageBox([
                                { text: "부품군을 먼저 선택해 주세요." }
                            ]);
                            return false;
                        }

                        v_global.event.type = ui.type;
                        v_global.event.object = ui.object;
                        v_global.event.row = ui.row;
                        v_global.event.element = ui.element;
                        if (gw_com_api.getValue(ui.object, ui.row, tp + "part_tp", true) == "기타") {
                            var args = {
                                type: "PAGE",  page: "w_find_part_ehm",  title: "부품 선택",  width: 1100,  height: 500,  open: true
                            };
                            if (gw_com_module.dialoguePrepare(args) == false) {
                                var args = {
                                    page: "w_find_part_ehm",
                                    param: {
                                        ID: gw_com_api.v_Stream.msg_selectPart_EHM,
                                        data: {
                                            tab: 2,
                                            prod_key: gw_com_api.getValue("frmData_발생정보", 1, "prod_key"),
                                            prod_nm: gw_com_api.getValue("frmData_발생정보", 1, "prod_nm")
                                        }
                                    }
                                };
                                gw_com_module.dialogueOpen(args);
                            }
                        }
                        else {
                            var args = {
                                type: "PAGE",  page: "DLG_PART_EHM_1", title: "부품 선택",  width: 1100,  height: 460, open: true
                            };
                            if (gw_com_module.dialoguePrepare(args) == false) {
                                var args = {
                                    page: "DLG_PART_EHM_1",
                                    param: {
                                        ID: gw_com_api.v_Stream.msg_selectPart_EHM,
                                        data: {
                                            prod_type: gw_com_api.getValue("frmData_발생정보", 1, "prod_type"),
                                            part_tp: gw_com_api.getValue(ui.object, ui.row, tp + "part_tp", true),
                                            part_tp_nm: gw_com_api.getText(ui.object, ui.row, tp + "part_tp", true)
                                        }
                                    }
                                };
                                gw_com_module.dialogueOpen(args);
                            }
                        }
                    }
                    break;
                case "status_tp1_nm":
                    {
                        if (gw_com_api.getValue(ui.object, ui.row, "apart_tp", true) == ""
                            || gw_com_api.getValue(ui.object, ui.row, "apart_tp", true) == "기타")
                            return false;

                        v_global.event.type = ui.type;
                        v_global.event.object = ui.object;
                        v_global.event.row = ui.row;
                        v_global.event.element = ui.element;
                        var args = {
                            type: "PAGE",  page: "DLG_PART_EHM_2",  title: "현상 선택",  width: 1100,   height: 460,  open: true
                        };
                        if (gw_com_module.dialoguePrepare(args) == false) {
                            var args = {
                                page: "DLG_PART_EHM_2",
                                param: {
                                    ID: gw_com_api.v_Stream.msg_selectPart_EHM,
                                    data: {
                                        prod_type: gw_com_api.getValue("frmData_발생정보", 1, "prod_type"),
                                        part_tp: gw_com_api.getValue(ui.object, ui.row, "apart_tp", true),
                                        part_tp_nm: gw_com_api.getText(ui.object, ui.row, "apart_tp", true)
                                    }
                                }
                            };
                            gw_com_module.dialogueOpen(args);
                        }
                    }
                    break;
            }
        }
        //----------
        function itemdblclick_frmData_발생내용(ui) {

            switch (ui.element) {
                case "rmk_text":
                    {
                        v_global.logic.memo = "발생 내용";
                        processMemo({
                            type: ui.type,
                            object: ui.object,
                            row: ui.row,
                            element: ui.element
                        });
                    }
                    break;
            }

        }
        //----------
        function click_frmData_조치내용(ui) {

            if (gw_com_api.getCRUD("frmData_조치내용") == "none") {
                gw_com_api.messageBox([
                    { text: "조치 내용은 조치 내역을 먼저 추가한 후에" },
                    { text: "입력할 수 있습니다." }
                ]);
            }

            return true;

        }
        //----------
        function itemdblclick_frmData_조치내용(ui) {

            switch (ui.element) {
                case "rmk_text":
                    {
                        v_global.logic.memo = "조치 내용";
                        processMemo({
                            type: ui.type,
                            object: ui.object,
                            row: ui.row,
                            element: ui.element
                        });
                    }
                    break;
            }

        }
        //----------
        function click_frmData_교체내용(ui) {

            if (gw_com_api.getCRUD("frmData_교체내용") == "none") {
                gw_com_api.messageBox([
                    { text: "교체 내용은 교체 PART를 먼저 추가한 후에" },
                    { text: "입력할 수 있습니다." }
                ]);
            }

            return true;

        }
        //----------
        function itemdblclick_frmData_교체내용(ui) {

            switch (ui.element) {
                case "rmk_text":
                    {
                        v_global.logic.memo = "교체 내용";
                        processMemo({
                            type: ui.type,
                            object: ui.object,
                            row: ui.row,
                            element: ui.element
                        });
                    }
                    break;
            }

        }
        //----------
        function click_grdData_첨부파일_download(ui) {

            var args = {
                source: { id: "grdData_첨부파일", row: ui.row },
                targetid: "lyrDown"
            };
            gw_com_module.downloadFile(args);

        }

         
        // startup process.
       
        //gw_com_api.setValue("frmOption", 1, "ymd_fr", gw_com_api.getDate("", { day: -10 }));
        //gw_com_api.setValue("frmOption", 1, "ymd_to", gw_com_api.getDate("")); 
        gw_com_module.startPage();

        //-- 추가 되는 부분 시작
        if (gw_com_api.getPageParameter("act") != "I")
        {
            v_global.logic.issue_no = gw_com_api.getPageParameter("issue_no");
            processLink({ master: true });
        }
        else
            processInsert({});
        // -- 추가되는 부분 끝 

        v_global.process.current.tab = 1;

    }
    //#endregion

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
function checkCRUD(param) {

	if (param.sub)
		return gw_com_api.getCRUD("grdData_발생내역", "selected", true);
	else if (param.part)
		return gw_com_api.getCRUD("grdData_교체PART", "selected", true);
    else 
    	return gw_com_api.getCRUD("frmData_발생정보");

}
//----------
function checkManipulate(param) {

    closeOption({});

    if (checkCRUD(param) == "none") {
        gw_com_api.messageBox([ { text: "NOMASTER" } ]);
        return false;
    }
    return true;

}
//----------
function checkUpdatable(param) {

    closeOption({});

    var args = {
        check: param.check,
        target: [
            {
                type: "FORM",
                id: "frmData_발생정보"
            },
			{
			    type: "GRID",
			    id: "grdData_발생내역"
			},
			{
			    type: "FORM",
			    id: "frmData_발생내용"
			},
			{
			    type: "GRID",
			    id: "grdData_조치내역"
			},
			{
			    type: "FORM",
			    id: "frmData_조치내용"
			},
			{
			    type: "GRID",
			    id: "grdData_교체PART"
			},
			{
			    type: "FORM",
			    id: "frmData_교체내용"
			},
			{
			    type: "GRID",
			    id: "grdData_첨부파일"
			},
			{
			    type: "FORM",
			    id: "frmData_상세메모"
			}
		],
        param: param
    };
    return gw_com_module.objUpdatable(args);

}
//----------
function checkRemovable(param) {

    var status = checkCRUD(param);
    if (status == "initialize" || status == "create") {
        (param.sub) ? processDelete(param) : processClear({});
    }
    else
        gw_com_api.messageBox([ { text: "REMOVE" } ], 420
        	, gw_com_api.v_Message.msg_confirmRemove, "YESNO", param);

}
//----------
function checkExportable(param) {

    closeOption({});

    return true;

}
//----------
function checkClosable(param) {

    closeOption({});
    gw_com_api.selectTab("lyrTab", 1)

    v_global.process.handler = processClose;

    if (!checkUpdatable({})) return;

    processClose({});

}
//----------
function processRetrieve(param) {

    var args = { target: [ { type: "FORM", id: "frmOption" } ] };
    //if (gw_com_module.objValidate(args) == false) {
    //    processClear({ master: true });
    //    return false;
    //}

    if (param.key != undefined) {
        $.each(param.key, function () {
            if (this.QUERY == "EHM_2010_M_2")
                this.QUERY = "EHM_2010_M_1";
        });
    }
    var args = {
        source: { type: "FORM", id: "frmOption", hide: true,
            element: [
				{ name: "ymd_fr", argument: "arg_ymd_fr" },
				{ name: "ymd_to", argument: "arg_ymd_to" },
				{ name: "issue_stat", argument: "arg_issue_stat" },
				{ name: "prod_group", argument: "arg_prod_group" },
				{ name: "prod_type", argument: "arg_prod_type" },
				{ name: "cust_cd", argument: "arg_cust_cd" },
				{ name: "cust_dept", argument: "arg_cust_dept" },
				{ name: "cust_prod_nm", argument: "arg_cust_prod_nm" },
				{ name: "proj_no", argument: "arg_proj_no" }
			],
            argument: [
                { name: "arg_issue_part", value: "AS" }
			],
            remark: [
			    { infix: "~", element: [ { name: "ymd_fr" }, { name: "ymd_to" } ] },
		        { element: [{ name: "prod_group"}] },
		        { element: [{ name: "prod_type"}] },
		        { element: [{ name: "cust_cd"}] },
		        { element: [{ name: "cust_dept"}] },
		        { element: [{ name: "cust_prod_nm"}] },
		        { element: [{ name: "issue_stat"}] }
		    ]
        },
        target: [
			{ type: "GRID", id: "grdData_발생정보", select: true }
		],
        clear: [
		    { type: "FORM", id: "frmData_발생정보" },
		    { type: "GRID", id: "grdData_발생내역" },
			{ type: "FORM", id: "frmData_발생내용" },
			{ type: "GRID", id: "grdData_조치내역" },
			{ type: "FORM", id: "frmData_조치내용" },
			{ type: "GRID", id: "grdData_교체PART" },
			{ type: "FORM", id: "frmData_교체내용" },
            { type: "FORM", id: "frmData_처리결과" },
			{ type: "GRID", id: "grdData_첨부파일" },
			{ type: "FORM", id: "frmData_상세메모" }
		],
        key: param.key
    };
    gw_com_module.objRetrieve(args);

}
//----------
function processLink(param) {

    var args = {};
    if (param.sub) {
        args = {
            source: { type: "GRID", id: "grdData_발생내역", row: "selected", block: true,
                element: [
				    { name: "issue_no", argument: "arg_issue_no" },
                    { name: "issue_seq", argument: "arg_issue_seq" }
                ]
            },
            target: [
                { type: "GRID", id: "grdData_조치내역" },
			    { type: "GRID", id: "grdData_교체PART" }
            ],
            key: param.key
        };
    }
    else if (param.master) {
        //alert(v_global.logic.issue_no);
        args = {
            /*
        	source: { 
        		type: "GRID", id: "grdData_발생정보", row: "selected", block: true,
                element: [ { name: "issue_no", argument: "arg_issue_no" } ]
            },*/
            
            source: {
                type: "INLINE",
                argument: [
                    { name: "arg_issue_no", value: v_global.logic.issue_no }
                ]
            },
            target: [
                { type: "FORM", id: "frmData_발생정보" }
            ],
            key: param.key,
            handler: { complete: processLink, param: {} }
        };
    }
    else {
        args = {
            source: {
                type: "FORM", id: "frmData_발생정보", row: "1", block: true,
                element: [
				    { name: "issue_no", argument: "arg_issue_no" }
			    ]
            },
            target: [
                { type: "FORM", id: "frmData_발생정보", edit: true },
                { type: "GRID", id: "grdData_발생내역", select: true },
			    { type: "FORM", id: "frmData_발생내용", edit: true },
			    { type: "FORM", id: "frmData_조치내용", clear: true, edit: true },
			    { type: "FORM", id: "frmData_교체내용", clear: true, edit: true },
                { type: "FORM", id: "frmData_처리결과" },
			    { type: "GRID", id: "grdData_첨부파일" },
			    { type: "FORM", id: "frmData_상세메모" }
		    ],
            clear: [
			    { type: "FORM", id: "frmData_발생내용" },
			    { type: "GRID", id: "grdData_조치내역" },
			    { type: "FORM", id: "frmData_조치내용" },
			    { type: "GRID", id: "grdData_교체PART" },
			    { type: "FORM", id: "frmData_교체내용" },
                { type: "FORM", id: "frmData_처리결과" },
			    { type: "GRID", id: "grdData_첨부파일" },
			    { type: "FORM", id: "frmData_상세메모" }
		    ],
            key: param.key
        };
    }
    gw_com_module.objRetrieve(args);

}
//----------
function processSelect(param) {

    (param.sub)
        ? gw_com_api.selectRow("grdData_발생내역", v_global.process.current.sub, true, false)
        : gw_com_api.selectRow("grdData_발생정보", v_global.process.current.master, true, false);

}
//----------
function processInsert(param) {

    if (param.sub) {
        var args = {
            targetid: "grdData_발생내역",
            edit: true,
            updatable: true,
            data: [
                { name: "issue_seq", rule: "INCREMENT", value: 1 },
                { name: "prod_type", rule: "COPY", row: "prev", value: gw_com_api.getValue("frmData_발생정보", 1, "prod_type")}/*,
                { name: "issue_tp", rule: "COPY", row: "prev", value: gw_com_api.getValue("frmData_발생정보", 1, "issue_tp") },                ,
                { name: "prod_sub", rule: "COPY", row: "prev", value: gw_com_api.getValue("frmData_발생정보", 1, "prod_sub") },
                { name: "status_tp1", rule: "COPY", row: "prev" },
                { name: "status_tp2", rule: "COPY", row: "prev" },
                { name: "part_tp1", rule: "COPY", row: "prev" },
                { name: "part_tp2", rule: "COPY", row: "prev" },
                { name: "reason_tp1", rule: "COPY", row: "prev" },
                { name: "reason_tp2", rule: "COPY", row: "prev" },
                { name: "duty_tp1", rule: "COPY", row: "prev" },
                { name: "duty_tp2", rule: "COPY", row: "prev" }*/
            ],
            clear: [
		        { type: "GRID", id: "grdData_조치내역" },
			    { type: "GRID", id: "grdData_교체PART" }
	        ]
        };
        gw_com_module.gridInsert(args);
    }
    else {
       // gw_com_api.selectRow("grdData_발생정보", "reset");
        var args = {
            targetid: "frmData_발생정보",
            edit: true,
            updatable: true,
            data: [
                { name: "issue_dt", value: gw_com_api.getDate() }
            ],
            clear: [
		        { type: "GRID", id: "grdData_발생내역" },
		        { type: "GRID", id: "grdData_조치내역" },
		        { type: "GRID", id: "grdData_교체PART" },
		        { type: "FORM", id: "frmData_조치내용" },
		        { type: "FORM", id: "frmData_교체내용" },
		        { type: "GRID", id: "grdData_첨부파일" }
	        ]
        };
        gw_com_module.formInsert(args);
        var args = { targetid: "grdData_발생내역", edit: true, updatable: true,
            data: [
                { name: "issue_seq", rule: "INCREMENT", value: 1 }
            ]
        };
        gw_com_module.gridInsert(args);
        var args = {
            targetid: "frmData_발생내용",
            edit: true,
            updatable: true,
            data: [
                { name: "rmk_cd", value: "STATUS" },
                { name: "rmk_text", value: "조치부서에서 이해할 수 있도록 6하원칙에 의거하여 작성하시오" }
            ]
        };
        gw_com_module.formInsert(args);
        /*
        var args = {
        targetid: "frmData_조치내용",
        edit: true,
        updatable: true,
        data: [
        { name: "rmk_cd", value: "WORK" }
        ]
        };
        gw_com_module.formInsert(args);
        var args = {
        targetid: "frmData_교체내용",
        edit: true,
        updatable: true,
        data: [
        { name: "rmk_cd", value: "PART" }
        ]
        };
        gw_com_module.formInsert(args);
        */
        var args = {
            targetid: "frmData_상세메모",
            edit: true,
            updatable: true
        };
        gw_com_module.formInsert(args);

        v_global.event.type = "FORM";
        v_global.event.object = "frmData_발생정보";
        v_global.event.row = 1;
        v_global.event.element = "issue_time";
        var args = {
            type: "PAGE",
            page: "w_find_prod_ehm",
            title: "장비 검색",
            width: 1100,
            height: 460,
            locate: ["center", "top"],
            open: true
        };
        if (gw_com_module.dialoguePrepare(args) == false) {
            var args = {
                page: "w_find_prod_ehm",
                param: {
                    ID: gw_com_api.v_Stream.msg_selectProduct_EHM
                }
            };
            gw_com_module.dialogueOpen(args);
        }
    }

}
//----------
function processDelete(param) {

    if (param.sub) {
        var args = {
            targetid: "grdData_발생내역",
            row: "selected",
            remove: true,
            clear: [
                {
                    type: "GRID",
                    id: "grdData_조치내역"
                },
                {
                    type: "GRID",
                    id: "grdData_교체PART"
                }
            ]
        };
        gw_com_module.gridDelete(args);
    }
    else {
        var args = {
            targetid: "grdData_발생정보",
            row: "selected",
            clear: [
                { type: "FORM", id: "frmData_발생정보" },
                { type: "GRID", id: "grdData_발생내역" },
                { type: "FORM", id: "frmData_발생내용" },
                { type: "GRID", id: "grdData_조치내역" },
                { type: "FORM", id: "frmData_조치내용" },
                { type: "GRID", id: "grdData_교체PART" },
                { type: "FORM", id: "frmData_교체내용" },
                { type: "FORM", id: "frmData_처리결과" },
                { type: "GRID", id: "grdData_첨부파일" },
                { type: "FORM", id: "frmData_상세메모" }
            ]
        };
       // gw_com_module.gridDelete(args);
    }

}
//----------
function processMemo(param) {

    v_global.event.type = param.type;
    v_global.event.object = param.object;
    v_global.event.row = param.row;
    v_global.event.element = param.element;
    var args = {
        type: "PAGE", page: "w_edit_memo", title: "상세 내용",  width: 790, height: 585, open: true
    };
    if (gw_com_module.dialoguePrepare(args) == false) {
        var args = {
            page: "w_edit_memo",
            param: {
                ID: gw_com_api.v_Stream.msg_edit_Memo,
                data: {
                    edit: true, title: v_global.logic.memo,
                    text: gw_com_api.getValue(v_global.event.object, v_global.event.row, v_global.event.element)
                }
            }
        };
        gw_com_module.dialogueOpen(args);
    }

}
//----------
function processSave(param) {

    var args = {
        target: [
            { type: "FORM", id: "frmData_발생정보" },
			{ type: "GRID", id: "grdData_발생내역" },
			{ type: "FORM", id: "frmData_발생내용" },
			{ type: "GRID", id: "grdData_조치내역" },
			{ type: "FORM", id: "frmData_조치내용" },
			{ type: "GRID", id: "grdData_교체PART" },
			{ type: "FORM", id: "frmData_교체내용" },
			{ type: "GRID", id: "grdData_첨부파일" },
			{ type: "FORM", id: "frmData_상세메모" }
		]
    };
    if (gw_com_module.objValidate(args) == false) return false;
    
    //발생정보 입력 오류 확인
    var obj = "frmData_발생정보";
    var issue_date = gw_com_api.getValue(obj, 1, "issue_dt");
    var issue_time = gw_com_api.getValue(obj, 1, "issue_time");
    var crud = gw_com_api.getCRUD(obj);
    if (crud == "create" || crud == "update") {
        if (issue_time.length < 1 || (issue_time * 1) <= 0) {
            gw_com_api.messageBox([
                { text: "발생 일시의 발생 시각을 확인해 주세요." }
            ]);
            gw_com_api.setError(true, obj, 1, "issue_time", false);
            return false;
        }
    }
    gw_com_api.setError(false, obj, 1, "issue_time", false);
    
    //조치내역 입력 오류 확인
    var obj = "grdData_조치내역";
    var ids = gw_com_api.getRowIDs(obj);
    var err = false;
    for (var i = 0; i < ids.length; i++) {
        var crud = gw_com_api.getCRUD(obj, ids[i], true);
        if (crud == "create" || crud == "update") {
            var stat = gw_com_api.getValue(obj, ids[i], "pstat", true);
            var end_date = gw_com_api.getValue(obj, ids[i], "end_dt", true);
            var end_time = gw_com_api.getValue(obj, ids[i], "end_time", true);
            if (stat == "완료") {
                if (end_date.length < 8 || end_time.length < 1) {
                    gw_com_api.messageBox([
                        { text: "조치 내역의 완료 일자/시각을 확인해 주세요." }
                    ]);
                    gw_com_api.setError(true, obj, ids[i], "end_dt", true);
                    gw_com_api.setError(true, obj, ids[i], "end_time", true);
                    //err = true;
                    return false;
                }
                else if (end_date < issue_date
                        || (end_date == issue_date && (end_time * 1) < (issue_time * 1))) {
                    gw_com_api.messageBox([
                        { text: "완료 일자/시각은 발생일자/시각보다 커야 합니다." }
                    ]);
                    gw_com_api.setError(true, obj, ids[i], "end_dt", true);
                    gw_com_api.setError(true, obj, ids[i], "end_time", true);
                    //err = true;
                    return false;
                }
            }
        }
    };
    if (err) return false;

    //교체PART 입력 오류 확인
    var obj = "grdData_교체PART";
    var ids = gw_com_api.getRowIDs(obj);
    var err = false;
    for (var i = 0; i < ids.length; i++) {
        var crud = gw_com_api.getCRUD(obj, ids[i], true);
        if (crud == "create" || crud == "update") {
            var part_tp = gw_com_api.getValue(obj, ids[i], "apart_tp", true);
            var status_tp = gw_com_api.getValue(obj, ids[i], "status_tp1", true);
            if (part_tp != "기타" && status_tp.length < 1) {
                gw_com_api.messageBox([
                    { text: "교체 PART의 발생 현상을 확인해 주세요." }
                ]);
                gw_com_api.setError(true, obj, ids[i], "status_tp1_nm", true);
                err = true;
                break;
            }
            var part_sno = gw_com_api.getValue(obj, ids[i], "apart_sno", true);
            if (part_tp != "기타" && part_sno.length < 1) {
                gw_com_api.messageBox([
                    { text: "기장착부품 Serial No.를 확인해 주세요." }
                ]);
                gw_com_api.setError(true, obj, ids[i], "apart_sno", true);
                err = true;
                break;
            }
            part_tp = gw_com_api.getValue(obj, ids[i], "bpart_tp", true);
            part_sno = gw_com_api.getValue(obj, ids[i], "bpart_sno", true);
            if (part_tp != "기타" && part_sno.length < 1) {
                gw_com_api.messageBox([
                    { text: "교체부품 Serial No.를 확인해 주세요." }
                ]);
                gw_com_api.setError(true, obj, ids[i], "bpart_sno", true);
                err = true;
                break;
            }
        }
    };
    if (err) return false;
    gw_com_api.setError(false, obj, ids[i], "end_dt", true);
    gw_com_api.setError(false, obj, ids[i], "end_time", true);
    gw_com_api.setError(false, obj, ids[i], "apart_sno", true);
    gw_com_api.setError(false, obj, ids[i], "bpart_sno", true);

    args.handler = { success: successSave, param: param };
    gw_com_module.objSave(args);

}
//----------
function processRemove(param) {

    var args = {};
    if (param.sub) {
        args = {
            target: [
		        {
		            type: "GRID",
		            id: "grdData_발생내역",
		            key: [  {  row: "selected", element: [  { name: "issue_no" },  { name: "issue_seq" }  ] }  ]
		        }
	        ]
        };
    }
    else {
        args = {
            target: [
		        {
		            type: "FORM",
		            id: "frmData_발생정보",
		            key: {  element: [ { name: "issue_no" } ]  }
		        }
	        ]
        };
    }
    args.handler = {
        success: successRemove,
        param: param
    };
    gw_com_module.objRemove(args);

}
//----------
function processExport() {

    var args = {
        source: {
            type: "FORM",  id: "frmData_발생정보", row: "selected", json: true,
            element: [
                { name: "issue_no", argument: "arg_issue_no" }
            ]
        },
        option: [
            { name: "PRINT", value: "PDF" }, { name: "PAGE", value: gw_com_module.v_Current.window }
        ],
        target: {
            type: "TAB", id: "lyrTab", name: "보고서",
            index: gw_com_api.getValue("frmData_발생정보", 1, "issue_no"),
            height: 1310
        },
        handler: {
            success: successExport
        }
    };
    gw_com_module.objExport(args);

}
//----------
function processRestore(param) {

    var args = {
        targetid: "grdData_발생내역",
        row: v_global.process.prev.sub
    };
    gw_com_module.gridRestore(args);

}
//----------
function processClear(param) {

    var args = {
        target: [
            {  type: "FORM", id: "frmData_발생정보" },
            {  type: "GRID", id: "grdData_발생내역" },
            {  type: "FORM", id: "frmData_발생내용" },
            {  type: "GRID", id: "grdData_조치내역" },
            {  type: "FORM", id: "frmData_조치내용" },
            {  type: "GRID", id: "grdData_교체PART" },
            {  type: "FORM", id: "frmData_교체내용" },
            {  type: "FORM", id: "frmData_처리결과" },
            {  type: "GRID", id: "grdData_첨부파일" },
            {  type: "FORM", id: "frmData_상세메모" }
        ]
    };
    if (param.master)
        args.target.unshift({
            type: "GRID",
            id: "grdData_발생정보"
        });
   // gw_com_module.objClear(args);

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
//----------
function successSave(response, param) {

    var status = checkCRUD({});
    if (status == "create" || status == "update")
        processLink({ master: true });
    else {
        status = checkCRUD({ sub: true });
        if (status == "create" || status == "update"
            || gw_com_api.getUpdatable("frmData_발생내용")
            || gw_com_api.getUpdatable("frmData_조치내용")
            || gw_com_api.getUpdatable("frmData_교체내용")
            || gw_com_api.getUpdatable("grdData_첨부파일", true)
            || gw_com_api.getUpdatable("frmData_상세메모"))
            processLink({ key: response });
        else
            processLink({ sub: true, key: response });
    }

}
//----------
function successRemove(response, param) {

    processDelete(param);

}
//----------
function successExport(response, param) {

}

// stream handler. (network section)
 
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
                if (param.data.page != gw_com_api.getPageID()) {
                    param.to = { type: "POPUP", page: param.data.page };
                    gw_com_module.streamInterface(param);
                    break;
                }
                switch (param.data.ID) {
                    case gw_com_api.v_Message.msg_confirmSave:
                        {
                            if (param.data.result == "YES")
                                processSave(param.data.arg);
                            else {
                                if (param.data.arg.sub) {
                                    var status = checkCRUD({});
                                    if (status == "initialize" || status == "create")
                                        processClear({});
                                    else if (status == "update"
                                        || gw_com_api.getUpdatable("frmData_발생내용")
                                        || gw_com_api.getUpdatable("frmData_조치내용")
                                        || gw_com_api.getUpdatable("frmData_교체내용")
                                        || gw_com_api.getUpdatable("grdData_첨부파일", true)
                                        || gw_com_api.getUpdatable("frmData_상세메모"))
                                        processLink({ master: true });
                                    else {
                                        var status = checkCRUD(param.data.arg);
                                        if (status == "initialize" || status == "create")
                                            processDelete(param.data.arg);
                                        else if (status == "update")
                                            processRestore(param.data.arg);
                                        if (v_global.process.handler != null)
                                            v_global.process.handler(param.data.arg);
                                    }
                                }
                                else
                                    if (v_global.process.handler != null)
                                        v_global.process.handler({});
                            }
                        }
                        break;
                    case gw_com_api.v_Message.msg_confirmRemove:
                        {
                            if (param.data.arg.itemchange == true) {
                                if (param.data.result == "YES")
                                    gw_com_api.setValue("frmData_발생정보", 1, "pstat", "완료", false);
                        		}
                        	else if (param.data.result == "YES")
                                processRemove(param.data.arg);
                        }
                        break;
                    case gw_com_api.v_Message.msg_informSaved:
                        {
                            param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                        }
                        break;
                    case gw_com_api.v_Message.msg_informRemoved:
                        {
                            param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                        }
                        break;
                }
            }
            break;
        case gw_com_api.v_Stream.msg_selectedProduct_EHM:
            {
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "cust_nm", param.data.cust_nm, (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "cust_cd", param.data.cust_cd,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "cust_dept", param.data.cust_dept,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "cust_proc",  param.data.cust_proc,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object,  v_global.event.row, "cust_prod_nm", param.data.cust_prod_nm, (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object,  v_global.event.row, "prod_key", param.data.prod_key,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "prod_type", param.data.prod_type,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object,  v_global.event.row, "prod_nm",  param.data.prod_nm,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "wrnt_io",  param.data.wrnt_io,  (v_global.event.type == "GRID") ? true : false);
                var ids = gw_com_api.getRowIDs("grdData_발생내역");
                $.each(ids, function () {
                    gw_com_api.setValue("grdData_발생내역", this, "prod_type", param.data.prod_type, true);
                    gw_com_api.filterSelect("grdData_발생내역", this, "status_tp1",
                                            {
                                                memory: "현상분류",  unshift: [ { title: "-", value: "" } ],
                                                by: [{  source: { id: "frmData_발생정보", row: 1, key: "prod_type" } }]
                                            },
                                            true);
                    gw_com_api.filterSelect("grdData_발생내역", this, "part_tp1",
                                            {
                                                memory: "원인부위분류", unshift: [ { title: "-", value: "" } ],
                                                by: [{ source: { id: "frmData_발생정보", row: 1, key: "prod_type" } }]
                                            },
                                            true);
                    gw_com_api.filterSelect("grdData_발생내역", this, "reason_tp1",
                                            {
                                                memory: "원인분류", unshift: [ { title: "-", value: "" } ],
                                                by: [{ source: { id: "frmData_발생정보", row: 1, key: "prod_type" } }]
                                            },
                                            true);
                    gw_com_api.filterSelect("grdData_발생내역", this, "duty_tp1",
                                            {
                                                memory: "귀책분류", unshift: [ { title: "-", value: "" } ],
                                                by: [{ source:  { id: "frmData_발생정보", row: 1, key: "prod_type" } }]
                                            },
                                            true);
                });
                var ids = gw_com_api.getRowIDs("grdData_조치내역");
                $.each(ids, function () {
                    gw_com_api.filterSelect("grdData_조치내역", this, "work_tp1",
                                            {
                                                memory: "조치분류", unshift: [  { title: "-", value: "" } ],
                                                by: [{ source:  { id: "frmData_발생정보", row: 1, key: "prod_type" } }]
                                            },
                                            true);
                });
                var ids = gw_com_api.getRowIDs("grdData_교체PART");
                $.each(ids, function () {
                    gw_com_api.setValue("grdData_교체PART", this, "prod_type", param.data.prod_type, true);
                    gw_com_api.filterSelect("grdData_교체PART", this, "apart_tp",
                                            {
                                                memory: "부품군", unshift: [ { title: "-", value: "" } ],
                                                by: [{ source:  { id: "frmData_발생정보", row: 1, key: "prod_type" }  }]
                                            },
                                            true);
                    gw_com_api.filterSelect("grdData_교체PART", this, "bpart_tp",
                                            {
                                                memory: "부품군",  unshift: [ { title: "-", value: "" } ],
                                                by: [{ source:  { id: "frmData_발생정보", row: 1, key: "prod_type" }  }]
                                            },
                                            true);
                });
                closeDialogue({ page: param.from.page, focus: true });
            }
            break;
        case gw_com_api.v_Stream.msg_selectedPart_EHM:
            {
                if (v_global.event.element == "apart_cd") {
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "apart_cd",  param.data.part_cd, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "apart_nm", param.data.part_nm, (v_global.event.type == "GRID") ? true : false);
                    /*
                    if (gw_com_api.getValue(v_global.event.object,
                    v_global.event.row,
                    "bpart_cd",
                    (v_global.event.type == "GRID") ? true : false) == "") {
                    */
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_tp", "기타", (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_cd", param.data.part_cd,  (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_nm",  param.data.part_nm,  (v_global.event.type == "GRID") ? true : false);
                    /*
                    }
                    */
                }
                else if (v_global.event.element == "bpart_cd") {
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_cd",  param.data.part_cd, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_nm",  param.data.part_nm,
			                            (v_global.event.type == "GRID") ? true : false,
			                            true);
                }
                closeDialogue({ page: param.from.page, focus: true });
            }
            break;
        case gw_com_api.v_Stream.msg_selectedPart_EHM_1:
            {
                if (v_global.event.element == "apart_cd") {
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "apart_cd", param.data.part_cd, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "apart_nm", param.data.part_nm, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "apart_supp",param.data.part_supp, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "apart_model", param.data.part_model,(v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "apart_rev",  param.data.part_rev, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "apart_rmk",  param.data.part_rmk,  (v_global.event.type == "GRID") ? true : false);
                    /*
                    if (gw_com_api.getValue(v_global.event.object,
                    v_global.event.row,
                    "bpart_cd",
                    (v_global.event.type == "GRID") ? true : false) == "") {
                    */
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_tp",  param.data.part_tp,  (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_cd",  param.data.part_cd, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_nm",  param.data.part_nm, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_supp",param.data.part_supp, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_model", param.data.part_model, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_rev",  param.data.part_rev, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "bpart_rmk",  param.data.part_rmk,  (v_global.event.type == "GRID") ? true : false);
                    /*
                    }
                    */
                }
                else if (v_global.event.element == "bpart_cd") {
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_cd", param.data.part_cd,  (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_nm", param.data.part_nm,  (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_supp", param.data.part_supp, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object, v_global.event.row, "bpart_model", param.data.part_model, (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "bpart_rev",  param.data.part_rev,  (v_global.event.type == "GRID") ? true : false);
                    gw_com_api.setValue(v_global.event.object,  v_global.event.row, "bpart_rmk",  param.data.part_rmk,  (v_global.event.type == "GRID") ? true : false);
                }
                closeDialogue({ page: param.from.page, focus: true });
            }
            break;
        case gw_com_api.v_Stream.msg_selectedPart_EHM_2:
            {
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "status_tp1",  param.data.status_tp1,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "status_tp2", param.data.status_tp2, (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "status_tp1_nm", (param.data.status_tp1 == "기타") ? "" : param.data.status_tp1_nm,  (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "status_tp2_nm", (param.data.status_tp1 == "기타") ? "" : param.data.status_tp2_nm, (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "status_rmk", param.data.status_rmk, (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "status_etc", (param.data.status_tp1 == "기타") ? 1 : 0,  (v_global.event.type == "GRID") ? true : false);
                var toggle = (param.data.status_tp1 == "기타") ? false : true;
                gw_com_api.setAttribute(v_global.event.object, v_global.event.row, "status_tp1_nm",
                                        "readonly", toggle, true);
                gw_com_api.setAttribute(v_global.event.object, v_global.event.row, "status_tp2_nm",
                                        "readonly", toggle, true);
                gw_com_api.setAttribute(v_global.event.object, v_global.event.row, "status_rmk",
                                        "readonly", toggle, true);
                closeDialogue({ page: param.from.page, focus: true });
            }
            break;
        case gw_com_api.v_Stream.msg_edited_Memo:
            {
                if (param.data.update)
                    gw_com_api.setValue(v_global.event.object,
                                        v_global.event.row,
                                        v_global.event.element,
			                            param.data.text);
                closeDialogue({ page: param.from.page });
            }
            break;
        case gw_com_api.v_Stream.msg_edited_ASISSUE:
            {
                gw_com_api.setValue("frmData_상세메모", 1, "memo_text",  param.data.html);
                closeDialogue({ page: param.from.page });
            }
            break;
        case gw_com_api.v_Stream.msg_uploaded_ASISSUE: {
                var args = {
                    source: { type: "FORM", id: "frmData_발생정보", row: "selected",
                        element: [
				            { name: "issue_no", argument: "arg_issue_no" }
			            ]
                    },
                    target: [ { type: "GRID", id: "grdData_첨부파일", select: true } ],
                    key: param.key
                };
                gw_com_module.objRetrieve(args);
            } break;
        case gw_com_api.v_Stream.msg_uploaded_ECCB: {
                var args = {
                    source: { type: "GRID", id: "grdData_발생내역", row: "selected",
                        element: [
				            { name: "issue_no", argument: "arg_issue_no" },
				            { name: "issue_seq", argument: "arg_issue_seq" }
			            ]
                    },
                    target: [ { type: "GRID", id: "grdData_교체PART", select: true } ],
                    key: param.key
                };
                gw_com_module.objRetrieve(args);
                closeDialogue({ page: param.from.page });
            } break;
        case gw_com_api.v_Stream.msg_openedDialogue:
            {
                var args = {
                    to: { type: "POPUP",  page: param.from.page  }
                };
                switch (param.from.page) {
                    case "w_find_prod_ehm":
                        {
                            args.ID = gw_com_api.v_Stream.msg_selectProduct_EHM;
                        }
                        break;
                    case "DLG_PART_EHM_1":
                        {
                            args.ID = gw_com_api.v_Stream.msg_selectPart_EHM;
                            args.data = {
                                prod_type: gw_com_api.getValue("frmData_발생정보", 1, "prod_type"),
                                part_tp: gw_com_api.getValue(v_global.event.object,
                                                             v_global.event.row,
                                                             v_global.event.element.substr(0, 1) + "part_tp",
                                                             true),
                                part_tp_nm: gw_com_api.getText(v_global.event.object,
                                                               v_global.event.row,
                                                               v_global.event.element.substr(0, 1) + "part_tp",
                                                               true)
                            };
                        }
                        break;
                    case "DLG_PART_EHM_2":
                        {
                            args.ID = gw_com_api.v_Stream.msg_selectPart_EHM;
                            args.data = {
                                prod_type: gw_com_api.getValue("frmData_발생정보", 1, "prod_type"),
                                part_tp: gw_com_api.getValue(v_global.event.object,
                                                             v_global.event.row,
                                                             "apart_tp",
                                                             true),
                                part_tp_nm: gw_com_api.getText(v_global.event.object,
                                                               v_global.event.row,
                                                               "apart_tp",
                                                               true)
                            };
                        }
                        break;
                    case "w_find_part_ehm":
                        {
                            args.ID = gw_com_api.v_Stream.msg_selectPart_EHM;
                            args.data = {
                                tab: 2,
                                prod_key: gw_com_api.getValue("frmData_발생정보", 1, "prod_key"),
                                prod_nm: gw_com_api.getValue("frmData_발생정보", 1, "prod_nm")
                            };
                        }
                        break;
                    case "w_edit_memo":
                        {
                            args.ID = gw_com_api.v_Stream.msg_edit_Memo;
                            args.data = {
                                edit: true,
                                title: v_global.logic.memo,
                                text: gw_com_api.getValue(v_global.event.object, v_global.event.row, v_global.event.element)
                            };
                        }
                        break;
                    case "w_upload_asissue":
                        { args.ID = gw_com_api.v_Stream.msg_upload_ASISSUE;
                            args.data = { user: gw_com_module.v_Session.USR_ID,
                                key: gw_com_api.getValue("frmData_발생정보", "selected", "issue_no", true),
                                seq: 0
                            };
                        }
                        break;
                    case "w_upload_aspart":
                        { args.ID = gw_com_api.v_Stream.msg_upload_ECCB;
                            args.data = { user: gw_com_module.v_Session.USR_ID,
                                key: gw_com_api.getValue("grdData_교체PART", "selected", "issue_no", true),
                                seq: gw_com_api.getValue("grdData_교체PART", "selected", "issue_seq", true),
                                part_seq: gw_com_api.getValue("grdData_교체PART", "selected", "part_seq", true)
                            };
                        }
                        break;
                    case "w_edit_asissue":
                        {
                            args.ID = gw_com_api.v_Stream.msg_edit_ASISSUE;
                            args.data = {
                                issue_no: gw_com_api.getValue("frmData_발생정보", "selected", "issue_no", true)
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
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//