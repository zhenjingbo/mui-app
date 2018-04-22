//dep uni
(function() {
	var pro = {
		//内部版本号
		iVersion: "101200001",
		//翻译
		translate: function(key) {
			return key;
		}
	};
	//用户对象
	pro.acc = { //定义
		pid: null,
		token:null,
		accno: null,
		name: null,
		phone: null,
		email: null,
		wechat: null,
		role: null
	};
	pro.acc = null;
	//站点对象
	pro.staSN = 1; //默认1
	//清除状态
	pro.clearState = function() {
			pro.acc = null;
			localStorage.removeItem("acc");
		}
		//配置信息 来自系统
	pro.config = {};
	//接口地址
	var myDir = "https://justprint.com.cn/"; //"""https://justprint.com.cn/testapi/"
	var uDir = myDir.substring(0,myDir.length-1);
	pro.myDir = myDir;
	pro.uDir = uDir;
	//pro文件夹路径
	var _dir = myDir + "ajax/";
	//二维码认证地址
	var _authUri = myDir + "uniwx/"; //http://justprint.com.cn/
	pro.mapUrl = function(url) {
		if(url[0]=="/")url=url.substr(1);
			return pro.myDir + url;
		}
		//ajax相关操作
	var j = {
		get: function(url, obj, suc, fail, opt, err) {
			obj._from = "app";
			var acc = localStorage["acc"];
			obj.token = (acc&&JSON.parse(acc).token)||"";
			obj.uid = localStorage.getItem("uid")||"";
			obj.sta_sn = pro.staSN;
			obj.i_version = pro.iVersion;
			uni.j.get(url, obj, suc, fail, opt, err);
		},
		post: function(url, obj, suc, fail, opt, err) {
			obj._from = "app";
			var acc = localStorage["acc"];
			obj.token = (acc&&JSON.parse(acc).token)||"";
			obj.uid = localStorage.getItem("uid")||"";
			obj.sta_sn = pro.staSN; 
			obj.i_version = pro.iVersion;
			uni.j.post(url, obj, suc, fail, opt, err);
		}
	};
	//登录相关操作  已查 true
	j.cac = {
		//路径
		p: _dir + "cac.aspx",
		cacAct: function(data, suc, fail, opt, err) {
			if(fail == undefined) fail = true;
			pro.j.post(this.p, data, suc, fail, opt, err);
		},
		//微信验证
		wxLogin:function(access,openid,uid,suc,fail){
		  var data = {
		    "act": "check_app",
		    "access": access,
        "oid": openid,
        "uid": uid
      };
      this.cacAct(data, function(rlt) {
        pro.acc = rlt.data;
        localStorage["acc"]=JSON.stringify(pro.acc);
        if(suc) suc(rlt);
      }, fail, {
        isShowWaiting: false
      });
		},
		//支付宝认证
        		aliLogin:function(code,suc,fail){
              var data = {
                "act": "check_app",
                "type":"alipay",
                "code": code
              };
              this.cacAct(data, function(rlt) {
                pro.acc = rlt.data;
                localStorage["acc"]=JSON.stringify(pro.acc);
                if(suc) suc(rlt);
              }, fail, {
                isShowWaiting: false
              });
            },
		//绑定手机
		bind: function(phone, sms, uid, suc, fail) {
      var data = {
        "act": "bind_phone",
        "phone":phone,
        "sms": sms,
        "uid": uid
      };
      this.cacAct(data, function(rlt) {
        pro.acc = rlt.data;
        localStorage["acc"]=JSON.stringify(pro.acc);
        localStorage['way'] = 'wx';
        localStorage["wx"] = JSON.stringify(rlt.data);
        if(suc) suc(rlt);
      }, fail, {
        isShowWaiting: true
      });
    },
		//登录
		login: function(pid, pwd, sms, suc, fail) {
			var data = {
				"act": "login",
				"pid": pid,
				"pwd": pwd,
				"sms": sms
			};
			this.cacAct(data, function(rlt) {
				pro.acc = rlt.data;
				localStorage["acc"]=JSON.stringify(pro.acc);
				localStorage['way'] = "phone";
				if(suc) suc(rlt);
			}, fail, {
				isShowWaiting: true
			});
		},
		//判断登录 未实现
		isLogin: function(suc, fail) {
			this.cacAct({
				"act": "is_login"
			}, suc, fail);
		},
		//退出登录
		logout: function(suc) {
			var data = {
				act: "logout"
			};
			this.cacAct(data, function() {
				pro.clearState();
				if(suc) suc();
				localStorage["way"] = '';
			});
			localStorage.removeItem("acc");
      localStorage.removeItem("lang");
		},
		//注册用户
		register: function(pid, pwd, sms, suc, fail) {
			var data = {
				"act": "register",
				"pid": pid,
				"pwd": pwd,
				"sms": sms
			};
			this.cacAct(data, function(rlt) {
				pro.acc = rlt.data;
				localStorage.setItem("acc", JSON.stringify(pro.acc));
				if(suc) suc(rlt);
			}, true, {
				isShowWaiting: true
			});
		},
		//签入
		authToken: function(pid, suc, fail, opt, err) {
			this.cacAct({
				act: "auth_token",
				pid: pid
			}, function(rlt) {
				pro.acc = rlt.data;
				console.log(JSON.stringify(pro.acc));
				localStorage.setItem("acc", JSON.stringify(pro.acc));
				suc && suc(rlt);
			}, function(rlt) {
				pro.clearState();
				fail && fail(rlt);
			}, opt, err);
		},
		//修改密码
		changePwd: function(pwd, sms, suc, fail, para) {
			para = para || {};
			para.act = "change_pwd";
			para.pwd = pwd;
			para.sms = sms;
			this.cacAct(para, function(rlt) {
				if(suc) suc(rlt);
			}, fail);
		},
		//设置邮箱
		setEmail: function(email, suc) {
			this.cacAct({
				act: "set_acc",
				email: email
			}, function(rlt) {
				pro.acc = rlt.data;
				localStorage.setItem("acc", JSON.stringify(pro.acc));
				suc && suc(rlt);
			});
		},
		//获取余额
		getBalance: function(para, suc, fail, opt) {
			para = para || {};
			para.act = "get_balance";
			this.cacAct(para, suc, fail || false, opt);
		},
		//申请退款
		applyRefund: function(suc) {
			this.cacAct({
				act: "refund"
			}, suc, true, {
				isShowWaiting: true
			});
		},
		//二维码认证
		appAuth: function(state, code, suc, fail, para) {
			para = para || {};
			para.state = state;
			para.code = code;
			pro.j.get(_authUri+"appAuth.aspx", para, suc, fail, {
				isShowWaiting: true
			});
		},
		//获取登录凭证
		getCode:function(suc,fail,ext){
			this.cacAct({
				act: "get_code",
				info:ext
			}, suc, fail);
		},
		getAppCheckUrl:function(){
			return _authUri+"app_check.aspx";
		}
	};
	 //支付宝登录
  j.oauth = {
    //路径
    p: _dir + "oauth.aspx",
    oauthAct: function(data, suc, nosuc) {
      pro.j.get(this.p, data, suc, nosuc, null, nosuc);
    },
    //获取authtoken
    alilog: function(suc) {
      this.oauthAct({
        act: "get_alipay_infostr"
      },suc);
    },
  };
	 //开具发票
  j.invoice = {
    //路径
    p: _dir + "invoice.aspx",
    invoiceAct: function(data, suc, nosuc) {
      pro.j.get(this.p, data, suc, nosuc, null, nosuc);
    },
    //获取发票记录
    getInvoiceRec: function(suc) {
      this.invoiceAct({
        act: "get_use_rec"
      },suc);
    },
    //获取发票历史
    getInvoiceList: function(suc) {
      this.invoiceAct({
        act: "get_invoice_list"
      },suc);
    },
    //获取发票项目
    getItem: function(suc) {
      this.invoiceAct({
        act: "get_ei_item"
      },suc);
    },
    //获取发票购买方信息
    getBuyer:function(suc) {
      this.invoiceAct({
        act: "get_ei_buyer"
      },suc);
    },
    //申请发票
    apply:function(suc,para, nosuc) {
        para = para || {};
      para.act = "apply_invoice";
      this.invoiceAct(para, suc, nosuc, null, nosuc);
    },
    //发送邮箱
    sendEmail:function(id,email,suc){
      this.invoiceAct({
        act:"email_invoice",
        ei_id:[id],
        email:email
      },suc,true, {
        isShowWaiting: true
      });
    }
  };
	//查询记录
	j.query = {
		//路径
		p: _dir + "query.aspx",
		queryAct: function(data, suc, nosuc) {
			pro.j.get(this.p, data, suc, nosuc, null, nosuc);
		},
		//使用记录
		getUseRec: function(suc) {
			this.queryAct({
				act: "get_use_stat"
			}, suc);
		},
		//获取打印记录
		getPrintRec: function(suc, start, end, nosuc) {
			this.queryAct({
				act: "get_print_rec",
				start: start,
				end: end
			}, suc, nosuc)
		},
		//获取复印记录
		getCopyRec: function(suc, start, end, nosuc) {
			this.queryAct({
				act: "get_copy_rec",
				start: start,
				end: end
			}, suc, nosuc)
		},
		//获取扫描记录
		getScanRec: function(suc, start, end, nosuc) {
			this.queryAct({
				act: "get_scan_rec",
				start: start,
				end: end
			}, suc, nosuc)
		},
		//获取充值记录
    getDepRec: function(suc, start, end, nosuc,ext) {
      this.queryAct({
        act: "get_deposit",
        kind:ext,
        start: start,
        end: end
      }, suc, nosuc)
    }
	};
	//打印相关
	j.print = {
		//路径
		p: _dir + "print.aspx",
		printAct: function(data, suc, fail, opt, err) {
			pro.j.get(this.p, data, suc, fail, opt, err);
		},
		//锁定设备 准备打印
		preparePrint: function(dev_sn, suc, fail, para) {
			para = para || {};
			para.dev_sn = dev_sn;
			para.act = "prepare_print";
			this.printAct(para, suc, fail);
		},
		//获取打印任务
		getPrintTask: function(suc, para, nosuc) {
			para = para || {};
			para.act = "get_print_task";
			this.printAct(para, suc, nosuc, null, nosuc);
		},
		//获取打印记录
		getPrintRec: function(suc, para) {
			para = para || {};
			para.act = "get_print_rec";
			this.printAct(para, suc);
		},
		//获取打印费率
		getFeeSTD: function(suc, para) {
			para = para || {};
			para.act = "get_fee_std";
			this.printAct(para, suc);
		},
		//修改打印任务
		setPrintTask: function(para, suc, fail) {
			para = para || {};
			para.act = "set_print_task";
			this.printAct(para, suc, fail);
		},
		//新建打印任务
		newPrintTask: function(para, suc, fail, opt) {
			para = para || {};
			para.act = "new_print_task";
			this.printAct(para, suc, fail, opt);
		},
		//打印出件
		output: function(para, suc) {
			para = para || {};
			para.act = "output_task";
			this.printAct(para, suc, true, {
				isShowWaiting: true
			});
		},
		//批量打印出件
		outputList: function(para, suc) {
			para = para || {};
			para.act = "output_task_list";
			this.printAct(para, suc, true, {
				isShowWaiting: true
			});
		},
		//删除打印任务
		delPrintTask: function(id, suc) {
			this.printAct({
				act: "del_print_task",
				task_id: id
			}, suc, true, {
				isShowWaiting: true
			});
		},
		//预览状态
		_previewSate: [],
		//预览
		getPreview: function(data, suc, fail) {
			if(data.task_id) {
				var taskKey = data.task_id;
				var pState = this._previewSate[taskKey];
				if(!pState) {
					pState = {
						state: 1
					};
					this._previewSate[taskKey] = pState;
				}
				if(pState.state == 1) { //准备文档
					data.act = "prepare_print_view";
					this.printAct(data, function() {
						pState.state = 3;
					}, function(rlt) {
						console.log("preview_error:" + rlt.msg);
						pState.state = 0;
					}, null, function() {
						pState.state = 0;
					});
				}
				var pNum = "p" + data.page_num || "1";
				if(!pState[pNum]) pState[pNum] = {};
				if(!pState.state) { //无效
					if(fail) fail("文档不能预览");
				} else if(pState.state == 3) { //直取
					data.act = "dir_print_view";
					this.printAct(data, function(rlt) {
						var d = rlt.data;
						if(d.isExist) {
							if(suc) suc(rlt);
						} else {
							pState.state = 1; //重新准备文档
							pro.j.print.getPreview(data, suc, fail);
						}
					}, function(rlt) {
						if(fail) fail(rlt.msg);
					});
				} else if(!pState[pNum].mk) { //轮询!   注意:关闭页面时请终止
					var pNumState = pState[pNum];
					data.act = "get_print_view";
					pNumState.cter = 200;
					pNumState.mk = setInterval(function() {
						proj.print.printAct(data, function(rlt) {
							var d = rlt.data;
							if(d.isExist) {
								if(suc) suc(rlt);
								pNumState.cter = -100;
							}
							ckInterval();
						}, function(rlt) {
							if(!pState.state) {
								if(fail) fail("文档不能预览");
								pNumState.cter = -100;
							}
							ckInterval();
						}, null, function() {
							if(fail) fail("获取文档失败");
							pNumState.cter = -100;
							ckInterval();
						});
					}, 300);

					function ckInterval() {
						if(pNumState.cter < 0) {
							clearInterval(pNumState.mk);
							pNumState.mk = null;
							if(pNumState.cter > -100) {
								if(fail) fail("获取预览文件超时");
							}
						} else {
							pNumState.cter--;
						}
					}
				}
			} else {
				console.log("need task_id");
			}
		}
	};
	//扫描相关
	j.scan = {
		//路径
		p: _dir + "scan.aspx",
		scanAct: function(data, suc, fail, opt, err) {
			pro.j.get(this.p, data, suc, fail, opt, err);
		},
		//获取扫描记录列表
		getScanRec: function(suc, start, end, nosuc) {
			this.scanAct({
				act: "get_scan_rec",
				start: start,
				end: end
			}, suc, nosuc, null, nosuc);
		},
		//获取扫描文件
		getScanFile: function(id, suc) {
			this.scanAct({
				act: "get_scan_file",
				scan_id: id
			}, function(rlt) {
				if(rlt.data) {
					rlt.data = pro.mapUrl(rlt.data);
				}
				if(suc) suc(rlt);
			}, true, {
				isShowWaiting: true
			});
		},
		//删除扫描记录
		delScanRec: function(id, suc) {
			this.scanAct({
				act: "del_scan_file",
				file_id: id
			}, suc, true, {
				isShowWaiting: true
			});
		},
		//发送邮箱
		sendEmail:function(id,email,suc){
			this.scanAct({
				act:"email_scan_file",
				email:email,
				scan_id:id
			},suc,true, {
				isShowWaiting: true
			});
		}
	};
	//上传文件
	j.upload = {
		//路径
		p: _dir + "file.aspx",
		getUrl: function() {
			return this.p + "?act=upload";
		}
	};
	//设备相关
	j.dev = {
		//路径
		p: _dir + "device.aspx",
		devAct: function(data, suc, fail, opt) {
			pro.j.get(this.p, data, suc, fail, opt);
		},
		//获取打印机
		getPrinter: function(suc) {
			var data = {};
			data.act = "get_printer";
			this.devAct(data, suc);
		},
		//获取附近打印机
		getNearPrinter: function(position, suc, para) {
			var data = para || {};
			data.position = position;
			data.act = "get_near_printer";
			this.devAct(data, suc);
		}
	};
	//支付
	j.pay = {
    //路径
    p: _dir + "pay.aspx",
    payAct: function(data, suc, fail) {
      pro.j.get(this.p, data, suc, fail, {
        isShowWaiting: true
      });
    },
    //微信支付
    payWX: function(sum, suc,para) {
      para=para||{};
      para.act="pay_wx";
      para.sum=sum;
      this.payAct(para, suc, true);
    },
    //alipay
    alipay: function(sum, suc,para) {
      para=para||{};
      para.act="pay_alipay";
      para.sum=sum;
      this.payAct(para, suc, true);
    }
  };

	//其它操作
	j.util = {
		//路径
		p: _dir + "util.aspx",
		utilAct: function(data, suc, fail, err) {
			pro.j.get(this.p, data, suc, fail, null, err);
		},
		//发送短信验证码
		sendSMS: function(phone, suc, fail) {
			this.utilAct({
				act: "send_sms",
				phone: phone
			}, suc, fail);
		},
		//初始化
		init: function(para, suc, fail, err) {
			para = para || {};
			para.act = "init_sys";
			pro.j.post(this.p, para, suc, fail, null, err);
		},
		//获取升级版本
		getVer:function(para,suc){
			para = para || {};
			para.act = "get_up_info";
			pro.j.get(this.p,para, suc,true,{
				isShowWaiting: true
			});
		},
		//获取搜索文件目录列表
		getSearchDic:function(suc){
			this.utilAct({
				act: "get_search_dic"
			}, suc);
		}
	};
	pro.j = j;
	window.pro = pro;
	window.proj = j;
})();