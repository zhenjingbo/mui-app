(function(window) {
	//公共方法对象
	var uni = {
		/*-----------------dep none-------------*/
		//获取哈希表
		getHash: function() {
			return new uni.hash();
		},
		//判断是否在数组内
		isInArray: function(v, arr) {
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == v)
					return true;
			}
			return false;
		},
		//复制对象
		getObj: function(i) {
			var objClone;
			if(!i) {
				console.log('uni.getObj null');
				return null;
			}
			if(i.constructor == Object) {
				objClone = new i.constructor();
			} else {
				objClone = new i.constructor(i.valueOf());
			}
			for(var key in i) {
				if(objClone[key] != i[key]) {
					objClone[key] = typeof(i[key]) == 'object' ? this.getObj(i[key]) : i[key];
				}
			}
			return objClone;
		},
		//email格式检查
		ckEmail: function(str) {
			var regex = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
			return regex.test(str);
		},
		//判断对象有无属性
		isEmpty: function(obj) {
			for(var name in obj)
				return false;
			return true;
		},
		//判断是否图片
		isImg: function(ext) {
			if(ext == "jpeg" || ext == "jpg" || ext == "png" || ext == "gif"||ext=="bmp") {
				return true;
			} else {
				return false;
			}
		},
		//获取拓展名
		getExt: function(name) {
			var ext = "";
			if(name) {
				var arr = name.split('.');
				if(arr.length > 1) {
					ext = arr[arr.length - 1].toLowerCase();
				}
			}
			return ext;
		},
		//读取表单数据生成对象
		formToObj: function(dom) {
			var arr = dom.querySelectorAll("select[name],input[name]");
			var obj = {};
			for(var i = 0; i < arr.length; i++) {
				var key = arr[i].name;
				var value = arr[i].value;
				obj[key] = value;
			}
			return obj;
		},
		//日期字符串转Date类型
		parseDate: function(str, s) {
			if(!str || typeof(str) != 'string') return null;
			str = str.split(s || '-');
			var y = str[0];
			var M = str[1];
			str = str[2].split(' ');
			var d = str[0];
			var H, m, s;
			if(str.length > 1) {
				H = str[1].split(':')[0] || 0;
				m = str[1].split(':')[1] || 0;
				s = str[1].split(':')[2] || 0;
			} else {
				H = 0;
				m = 0;
				s = 0;
			}
			var date = new Date();
			date.setFullYear(y, M - 1, d);
			date.setHours(H, m, s, 0);
			return date;
		},
		//格式化日期
		formatDate: function(fmt, date) {
			var d = date || new Date();
			if(d instanceof Date) return d.format(fmt);
			return "type error";
		},
		//比较日期 s参数为 h细化到时  m到分 默认天 返回dt1-dt2
		compareDate: function(dt1, dt2, s) {
			var date1, date2;
			if(typeof(dt1) == "string") date1 = this.parseDate(dt1);
			else date1 = this.getObj(dt1);
			if(typeof(dt2) == "string") date2 = this.parseDate(dt2);
			else date2 = this.getObj(dt2);
			if(!date1 || !date2) {
				alert("compareDate error");
				return;
			}
			var d1, d2;
			if(s == "m") {
				d1 = parseInt(date1.getTime() / 1000 / 60);
				d2 = parseInt(date2.getTime() / 1000 / 60);
			} else if(s == "h") {
				date1.setMinutes(0);
				date2.setMinutes(0);
				d1 = parseInt(date1.getTime() / 1000 / 60);
				d2 = parseInt(date2.getTime() / 1000 / 60);
				d1 = d1 / 60;
				d2 = d2 / 60;
			} else { // day
				date1.setHours(0);
				date2.setHours(0);
				date1.setMinutes(0);
				date2.setMinutes(0);
				d1 = parseInt(date1.getTime() / 1000 / 60);
				d2 = parseInt(date2.getTime() / 1000 / 60);
				d1 = d1 / 1440;
				d2 = d2 / 1440;
			}
			return parseInt(d1) - parseInt(d2);
		},
		//客户端QueryString对象
		_QueryString: function(uri) {
			var name, value, i;
			var str = uri;
			var num = str.indexOf("?")
			str = str.substr(num + 1);
			str = str.split("#")[0];
			var arrtmp = str.split("&");
			for(i = 0; i < arrtmp.length; i++) {
				num = arrtmp[i].indexOf("=");
				if(num > 0) {
					name = arrtmp[i].substring(0, num);
					value = arrtmp[i].substr(num + 1);
					this[name] = value;
				}
			}
		},
		//获取req
		getReq: function(uri) {
			if(typeof(uri) != "string") return {};
			var req = new this._QueryString(uri);
			return req;
		}
	}
	//哈希表
	uni.hash = function() {
		this.clear = hashtable_clear;
		this.containsKey = hashtable_containsKey;
		this.containsValue = hashtable_containsValue;
		this.get = hashtable_get;
		this.isEmpty = hashtable_isEmpty;
		this.keys = hashtable_keys;
		this.set = hashtable_put;
		this.remove = hashtable_remove;
		this.size = hashtable_size;
		this.join = hashtable_toString;
		this.values = hashtable_values;
		this.hashtable = new Array();
		this.onSet = undefined;
		this.onRemove = undefined;

		function hashtable_clear() {
			this.hashtable = new Array();
		}

		function hashtable_containsKey(key) {
			var exists = false;
			for(var i in this.hashtable) {
				if(i == key && this.hashtable[i] != null) {
					exists = true;
					break;
				}
			}
			return exists;
		}

		function hashtable_containsValue(value) {
			var contains = false;
			if(value != null) {
				for(var i in this.hashtable) {
					if(this.hashtable[i] == value) {
						contains = true;
						break;
					}
				}
			}
			return contains;
		}

		function hashtable_get(key) {
			return this.hashtable[key];
		}

		function hashtable_isEmpty() {
			return(this.size == 0) ? true : false;
		}

		function hashtable_keys() {
			var keys = new Array();
			for(var i in this.hashtable) {
				if(this.hashtable[i] != null)
					keys.push(i);
			}
			return keys;
		}

		function hashtable_put(key, value) {
			if(key == null || value == null) {
				throw 'NullPointerException {' + key + '},{' + value + '}';
			} else {
				this.hashtable[key] = value;
				if(this.onSet) this.onSet(key, value);
			}
		}

		function hashtable_remove(key) {
			var rtn = this.hashtable[key];
			var old_value = (this.hashtable[key]);
			if(this.onRemove) {
				this.onRemove(key, uni.getObj(this.hashtable[key]));
			}
			//this.hashtable.splice(key, 1);
			this.hashtable[key] = null;
			return rtn;
		}

		function hashtable_size() {
			var size = 0;
			for(var i in this.hashtable) {
				if(this.hashtable[i] != null)
					size++;
			}
			return size;
		}

		function hashtable_toString(x) {
			var result = '';
			if(!x) x = ',';
			for(var i in this.hashtable) {
				var v = this.hashtable[i];
				if(v != null) {
					if(typeof(v) == "string" || typeof(v) == "number" || typeof(v) == "boolean")
						result += v + x;
					else if(typeof(v) == "object") {
						if($.toJSON) //需jqeury json 支持
							result += $.toJSON(v) + x;
					}
				}
			}
			if(result != '') result = result.substr(0, result.length - 1);
			return result;
		}

		function hashtable_values() {
			var values = new Array();
			for(var i in this.hashtable) {
				if(this.hashtable[i] != null)
					values.push(this.hashtable[i]);
			}
			return values;
		}
	}
	window.uni = uni;
	/*---------------dep plus mui------------------*/
	//---------------ajax相关操作
	var j = {
		//访问记录
		history: [],
		//loading开关
		swit: 0,
		//错误信息
		error: null,
		//默认ajax 连接错误回调函数
		_ajaxErr: function(error, info) {
			var msg = "异步连接出现异常";
			if(error.statusText == "timeout" || error.statusText == "") {
				info == "timeout" && plus.webview.currentWebview().isVisible() && plus.nativeUI.toast("连接超时");
				msg = "网络不通或服务未响应";
			}
			this.error = error;
			console.log(msg + "/status:" + error.statusText)
			console.log(error.responseText);
		},
		getOptions: function(opt) {
			if(opt) {} else {
				opt = {};
			}
			return opt;
		},
		//基础ajax方法 get方式
		_get: function(url, data, success, opt, err) {
			var d = data;
			if(d) {
				if(typeof(d) === 'object') {
					d = this.obj2Url(data);
				}
				if(d.length > 2000) { //当参数超出url长度限制，转post方式
					this.post(url, data, success, opt, err);
					return;
				} else {
					url = url + "?" + d;
				}
			}
			opt = this.getOptions(opt);
			var len = this.history.length;
			if(len > 0) {
				var last = this.history[len - 1];
				if(last.act == url && last.ajax_state == "sending") {
					return; //重复提交 丢弃
				}
			}
			var sta = {
				ajax_state: "sending",
				act: url
			};
			this.history.push(sta);
			console.log((new Date()).format("yyyy/MM/dd HH:mm:ss ") + "开始调用:" + url);
			var ajaxData = {
				type: "GET",
				cache: false,
				timeout: opt.outTime || 20000,
				dataType: "json",
				success: function(rlt) {
					//返回重提
					if(rlt.ret == -2) {
						if(sta.ajax_state == "sending") { //重提
							console.log((new Date()).format("yyyy/MM/dd HH:mm:ss ") + "重新提交:" + sta.act);
							sta.ajax_state = "re_submit";
							mui.ajax(url, ajaxData);
						} else if(sta.ajax_state == "re_submit") { //已重提，转正常
							sta.ajax_state = "sending";
							success(rlt);
						}
					} else {
						success(rlt);
					}
				},
				error: err,
				beforeSend: function() {
					if(sta.ajax_state == "sending") {
						j.swit++;
						opt.isShowWaiting && plus.nativeUI.showWaiting();
						if(opt.beforeSend) opt.beforeSend();
					}
				},
				complete: function() {
					if(sta.ajax_state == "sending") {
						console.log((new Date()).format("yyyy/MM/dd HH:mm:ss ") + "调用完成:" + sta.act);
						j.swit--;
						opt.isShowWaiting && plus.nativeUI.closeWaiting();
						if(opt.complete) opt.complete();
						sta.ajax_state = "complete";
					}
				}
			};
			mui.ajax(url, ajaxData);
		},
		//基础ajax方法 post方式
		_post: function(url, data, suc, opt, err) {
			opt = this.getOptions(opt);
			var d = uni.getObj(data);
			var len = this.history.length;
			if(len > 0) {
				var last = this.history[len - 1];
				if(last.act == d.act && last.ajax_state == "sending") {
					return; //重复提交 丢弃
				}
			}
			var sta = {
				ajax_state: "sending",
				act: d.act,
				data: d
			};
			console.log((new Date()).format("yyyy/MM/dd HH:mm:ss ") + "开始调用:" + url+",data:"+JSON.stringify(d));
			this.history.push(sta);
			mui.ajax(url, {
				type: "POST",
				timeout: opt.outTime || 20000,
				data: d,
				dataType: "json",
				success: suc,
				error: err,
				beforeSend: function() {
					opt.isShowWaiting && plus.nativeUI.showWaiting();
					if(opt.beforeSend) opt.beforeSend();
				},
				complete: function() {
					console.log((new Date()).format("yyyy/MM/dd HH:mm:ss ") + "调用完成:" + sta.act);
					opt.isShowWaiting && plus.nativeUI.closeWaiting();
					if(opt.complete) opt.complete();
					sta.ajax_state = "complete";
				}
			});
		},
		//post方式 js对象提交
		post: function(url, obj, suc, fail, opt, err) {
			this._post(url, obj, function(rlt) {
				j.checkRLT(rlt, suc, fail);
			}, opt, err || this._ajaxErr);
		},
		//get方式 js对象提交
		get: function(url, obj, suc, fail, opt, err) {
			this._get(url, obj, function(rlt) {
				j.checkRLT(rlt, suc, fail);
			}, opt, err || this._ajaxErr);
		},
		//js对象转url参数
		obj2Url: function(obj) {
			var ret = [];
			for(var key in obj) {
				key = encodeURIComponent(key);
				var values = obj[key];
				if(values == undefined) continue;
				if(values && values.constructor == Array) { //数组 
					var queryValues = [];
					for(var i = 0, len = values.length, value; i < len; i++) {
						value = values[i];
						queryValues.push(_toQueryPair(key, value));
					}
					ret = ret.concat(queryValues);
				} else { //字符串 
					ret.push(_toQueryPair(key, values));
				}
			}
			return ret.join('&');
			//url参数 键值拼接
			function _toQueryPair(key, value) {
				if(typeof value == 'undefined') {
					return key;
				}
				return key + '=' + encodeURIComponent(value === null ? '' : String(value));
			}
		},
		//sessionout 处理sessionout 需定义
		//onsessionout:undefined,
		//检查返回值
		checkRLT: function(rlt, suc, fail) {
			var isVisible = true;
			if(typeof plus != "undefined"){
				isVisible = plus.webview.currentWebview().isVisible();
			}
			if(rlt == undefined) {
				isVisible && mui.alert("返回了空值！", "error");
				return false;
			} else {
				if(rlt.ret > 0) { //成功
					if(suc == undefined) {
						isVisible && mui.toast(rlt.msg);
					} else suc(rlt);
				} else { //失败
				  console.log(suc);
					console.log("fail:" + rlt.act);
					console.log(rlt.msg);
					if(rlt.ret == -1) { //登录超时
						if(plus) {
							console.log(plus.webview.currentWebview().id + " " + rlt.act + " sessionout");
							mui.fire(plus.webview.currentWebview(), "sessionout", rlt);
						}
					} else {
						if(typeof(fail) == "function") {
							fail(rlt);
						} else if(fail) {
							isVisible && mui.alert(rlt.msg,"",function(){},"div");
						}
					}
				}
				return true;
			}
		}
	}
	uni.j = j;
	//---------------layer Dialog
	/**
	 * 必填项:
	 * content:"内容" (字符串; 可为html)
	 * 选填项:
	 * title:"标题" (字符串; 不传值默认 "温馨提示:";传空串"",则不显示标题;)
	 * btn:["按钮1","按钮2",...] (数组; 空则不显示按钮)
	 * event:[回调1,回调2,...] (数组; 和按钮数组对应;如果回调return true,则点击按钮后不关闭对话框)
	 * shadeClose:false (布尔值; 点击对话框外面是否关闭; 默认false不关闭)
	 * backClose:true (布尔值; Android点击back键关闭; 默认true关闭)
	 * closeEvent:function (对话框关闭的回调)
	 * style:{"title":"样式","content":"样式","btn":"样式"}//自定义样式(标题,内容,按钮)
	 */
	uni.dlg = function(content, title, btn, event, closeEvent, style, backClose, shadeClose) {
		layerOpen({
			content: content,
			title: title,
//			btn: btn,
			event: event,
			closeEvent: closeEvent,
			backClose: backClose,
			shadeClose: shadeClose,
			style: style
		});
	}
	uni.closeDLG = function(closeEvent) {
		layerClose(closeEvent);
	}
	uni.msgDLG = function(content, title, okFun, closeFun, okText, closeText, style, backClose) {
		var btn = [];
		var ev = [];
		if(okFun) {
			btn.push(okText || "确定");
			ev.push(okFun);
		}
		if(closeFun) {
			btn.push(closeText || "返回");
		}
		uni.dlg(content, title, btn, ev, closeFun, style, (typeof(backClose) == "boolean" ? backClose : true));
	}
	uni.alertDLG = function(content, title, okFun, okText, style) {
		var btn = [];
		var ev = [];
		if(okFun) {
			btn.push(okText || "确定");
			ev.push(okFun);
		}
		uni.dlg(content, title, btn, ev, undefined, style, false);
	}

	function layerOpen(options) {
		if(!options || !options.content) return;
		var old_root = document.getElementById("layer_root");
		if(old_root) {
			if(old_root.parentNode) {
				old_root.parentNode.removeChild(old_root);
			}
		}
		//根布局
		var layer_root = document.createElement("div");
		layer_root.setAttribute("id", "layer_root");
		var layer_cls = "layer_root opacityIn";
		if(options.style && options.style.layerClass) {
			layer_cls += (" " + options.style.layerClass);
		}
		layer_root.setAttribute("class", layer_cls);
		//标题
		var layer_title;
		var layer_title_style = 'class="layer_title"';
		if(options.style && options.style.title) {
			layer_title_style += " style='" + options.style.title + "'";
		}
		if(options.title == null) {
			//1.如果不传,则默认标题:温馨提示
			layer_title = '<div ' + layer_title_style + '>温馨提示:</div>';
		} else if(options.title == "") {
			//2.如果传空串"",则不显示标题
			layer_title = "";
		} else {
			//3.如果有值,则显示对应的值
			layer_title = '<div ' + layer_title_style + '>' + options.title + '</div>'
		}
		//按钮
		var layer_btns = "";
		var layer_btns_style = 'id="layer_btns" class="layer_btns"';
		if(options.style && options.style.btn != null) {
			layer_btns_style += " style='" + options.style.btn + "'";
		}
		if(options.btn) {
			var btn_count = options.btn.length;
			if(btn_count == 1) {
				//1.只有一个按钮
				layer_btns = '<table ' + layer_btns_style + '><tr><td id="0" class="layer_btn_single">' + options.btn[0] + '</td></tr></table>';
			} else if(btn_count == 2) {
				//2.只有两个按钮
				layer_btns = '<table ' + layer_btns_style + '><tr><td id="0" class="layer_btn_left">' + options.btn[0] + '</td><td id="1" class="layer_btn_right">' + options.btn[1] + '</td></tr></table>';
			} else if(btn_count > 2) {
				//3.有多个按钮
				for(var i = 0; i < btn_count; i++) {
					if(i == 0) {
						layer_btns += '<td id="0" class="layer_btn_left">' + options.btn[i] + '</td>'; //最左边的按钮
					} else if(i < btn_count - 1) {
						layer_btns += '<td id="' + i + '" class="layer_btn_middle">' + options.btn[i] + '</td>'; //中间的按钮
					} else {
						layer_btns += '<td id="' + i + '" class="layer_btn_right">' + options.btn[i] + '</td>'; //最右边的按钮
					}
				}
				layer_btns = '<table ' + layer_btns_style + '><tr>' + layer_btns + '</tr></table>';
			}
		}
		//拼接主体:标题,内容,按钮
		var layer_content_style = 'class="layer_content"';
		if(options.style && options.style.content != null) {
			layer_content_style = " style='" + options.style.content + "'";
		}
		var layerHTML = '<div class="layer_main scaleIn opacityIn" id="layer_main">' + layer_title + '<div ' + layer_content_style + '>' + options.content + '</div>' + layer_btns + '</div>';
		layer_root.innerHTML = layerHTML;
		//加入到body中显示
		document.body.appendChild(layer_root);
		//按钮点击事件
		if(layer_btns) {
			var layer_btns_dom = document.getElementById("layer_btns");
			if(layer_btns_dom) {
				layer_btns_dom.addEventListener("tap", function(e) {
					var tagId = e.target.getAttribute("id");
					if(tagId) {
						var index = Number(tagId);
						if(options.event && options.event.length > index) {
							var event = options.event[index];
							if(event && event()) return; //执行回调返回true,则继续显示对话框
						}
						layerClose(options.closeEvent, index);
					}
				});
			}
		}
		//对话框主体,阻止事件冒泡
		var layer_main = document.getElementById("layer_main");
		layer_main.addEventListener("tap", function(e) {
			e.stopPropagation();
		});
		//点击对话框外是否关闭
		if(options.shadeClose) {
			document.getElementById("layer_root").addEventListener("touchmove", function(e) {
				e.preventDefault();
			});
			layer_root.addEventListener("tap", function() {
				layerClose(options.closeEvent);
			});
		}
		//Android点击back键是否关闭,默认不传,则为true关闭
		if(options.backClose != false && mui.os.android) {
			var old_back = mui.back;
			//重写back方法
			mui.back = function() {
				layerClose(options.closeEvent);
			}
			//关闭后需还原
			androidBackEvent = function() {
				mui.back = old_back;
			}
		}
	}
	/*
	 * 关闭对话框
	 */
	var androidBackEvent; //Android点击后退键关闭对话框的回调
	function layerClose(closeEvent, e) {
		var layer_root = document.getElementById("layer_root");
		if(layer_root) {
			//关闭动画380毫秒,比360毫秒长一点,防止闪烁
			var layer_main = document.getElementById("layer_main");
			layer_main.classList.add("scaleOut");
			layer_main.classList.add("opacityOut");
			layer_root.classList.add("opacityOut");
			//延时关闭,防止事件穿透
			setTimeout(function() {
				if(layer_root.parentNode) { //不存在说明已关闭
					layer_root.parentNode.removeChild(layer_root);
				}
			}, 360);
		}
		//对话框关闭的回调
		closeEvent && closeEvent(e);
		//Android点击后退键关闭对话框的回调
		androidBackEvent && androidBackEvent();
	}
})(window);

/*--------------------------Date对象拓展-------------------------------------*/

//格式化
Date.prototype.format = function(fmt) {
	if(isNaN(this.getFullYear())) return '';
	var week = ['日', '一', '二', '三', '四', '五', '六'];
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"E": week[this.getDay()], //周
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
Date.prototype.addMinutes = function(m) {
	m = parseInt(m);
	this.setMinutes(this.getMinutes() + m);
	return this;
};
Date.prototype.addHours = function(h) {
	h = parseInt(h);
	this.setHours(this.getHours() + h);
	return this;
};
Date.prototype.addDays = function(d) {
	d = parseInt(d);
	this.setDate(this.getDate() + d);
	return this;
};
Date.prototype.addWeeks = function(w) {
	w = parseInt(w);
	this.addDays(w * 7);
	return this;
};
Date.prototype.addMonths = function(m) {
	m = parseInt(m);
	var d = this.getDate();
	this.setMonth(this.getMonth() + m);
	if(this.getDate() < d)
		this.setDate(0);
	return this;
};
Date.prototype.addYears = function(y) {
	y = parseInt(y);
	var m = this.getMonth();
	this.setFullYear(this.getFullYear() + y);
	if(m < this.getMonth()) {
		this.setDate(0);
	}
	return this;
};
Date.prototype.getWeek = function() {
	return 6 - ((7 - this.getDay()) % 7); //0-6
};
//获取对象
Date.prototype.getObj = function() {
	var t = this;
	var date = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
	return date;
};