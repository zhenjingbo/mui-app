/**
 * 
 */
(function(win) {
  //常量
  var userAgent = navigator.userAgent,
    app = navigator.appVersion;
  var IS_IOS = mui.os.ios; //(userAgent.indexOf('Safari') > -1 && !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
  var LANGUAGE = (navigator.browserLanguage || navigator.language).toLowerCase(); // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp
  var ANISHOW_AUTO = {
    aniShow: IS_IOS ? "pop-in" : "zoom-fade-out",
    duration: 200
  };
  var ANISHOW_SLIDE = {
    aniShow: "pop-in",

    duration: 200
  };
  //百度翻译参数
  
  //存储
  win.storage = localStorage;
  //语言包版本
  storage["app_ver"] = "1.01";
  var app = {
    /*工具方法*/
    //消息
    msgBox: function(msg, fun, title) {
      if(curView && curView.isVisible()) {
        //				plus.nativeUI.alert(msg, fun, title);
        mui.alert(msg, '提示', function(e){}, "div");
      }
    },
    //自动消失消息
    toast: function(msg, opt) {
      curView && curView.isVisible() && plus.nativeUI.toast(msg, opt);
    },
    //confirm
    confirm: function(msg, okFun) {
      mui.confirm(msg, "", ["取消", "确定"], function(e) {
        if(e.index == 1) {
          okFun && okFun();
        }
      }, 'div');
    },
    /*导航方法*/
    backIndex: function(fun) {
      //显示首页一般都因返回操作
      var cur = plus.webview.currentWebview();
      var fa = cur.opener();
      //			alert(JSON.stringify(fa));
      while(fa.id != "HBuilder" && fa.opener()) {
        var tmp = fa.opener();
        if(fa.preload) {
          fa.hide();
        } else {
          fa.close();
        }
        fa = tmp;
      }
      fun && fun(fa);
      mui.back();
    },
    showAbout: function(para) {
      this._autoShow("about", para);
    },
    showLogin: function(para) {
      this._autoShow("login", para);
    },
    showRegister: function(para) {
      this._autoShow("register", para);
    },
    showPassword: function(para) {
      this._autoShow("password", para, true);
    },
    showBindPhone: function(para) {
      this._autoShow("bind_phone", para);
    },
    paperPrint: function(para) {
      this._autoShow("paper_print", para, true);
    },
    showPWDSet: function(para) {
      this._autoShow("password_set", para, true);
    },
    showPWDFind: function(para) {
      this._autoShow("password_find", para);
    },
    showProtocol: function(para) {
      this._autoShow("protocol", para);
    },
    showWallet: function(para) {
      this._autoShow("wallet", para, true);
    },
    showPersonal: function(para) {
      this._autoShow("personal", para, true);
    },
    showEmail: function(para) {
      this._autoShow("email", para, true);
    },
    showQRCode: function(para) {
      this._autoShow("qr_code", para, true);
    },
    showLocation: function(para) {
      this._autoShow("location", para);
    },
    showPrintTask: function(para) {
      this._autoShow("print_task", para);
    },
    showPhotoTask: function(para) {
      this._autoShow("photo_task", para);
    },
    showPrintConfig: function(para) {
      this._autoShow("print_config", para, true);
    },
    showPreview: function(para) {
      this._autoShow("preview", para, true);
    },
    showPrintConfirm: function(para) {
      this._autoShow("print_confirm", para, true);
    },
    showPrintRec: function(para) {
      this._autoShow("print_rec", para, true);
    },
    showDepositRec: function(para) {
      this._autoShow("deposit", para);
    },
    showScanTask: function(para) {
      this._autoShow("scan_task", para, true);
    },
    showFunc:function(para){
      this._autoShow("func", para, true);
    },
    showScanConfirm: function(para) {
      this._autoShow("scan_confirm", para, true);
    },
    showScanProfile: function(para) {
      this._autoShow("scan_profile", para);
    },
    showCopyRecord: function(para) {
      this._autoShow("copy_record", para, true);
    },
    showCopyProfile: function(para) {
      this._autoShow("copy_profile", para);
    },
    showGuide: function(para) {
      this._autoShow("guide", para);
    },
    showInfo: function(para) {
      this._autoShow("info", para);
    },
    showShopList: function(para) {
      this._autoShow("shop_list", para);
    },
    showRecharge: function(para) {
      this._autoShow("recharge", para, true);
    },
    showWatch: function(para) {
      this._autoShow("watch", para);
    },
    showTest: function(para) {
      this._autoShow("test", para);
    },
    showWX: function(para) {
      this._autoShow("wx", para);
    },
    showSearch_file: function(para) {
      this._autoShow("search_file", para);
    },
    showInvocie:function(para){
      this._autoShow("invoice", para);
    },
    showAllRec:function(para) {
      this._autoShow("all_rec", para);
    },
    showPhoto: function(para) {
      this._autoShow("print_photo", para, true);
    },
    showInvoice: function(para) {
      this._autoShow("invoice", para);
    },
    showInvoiceRec: function(para) {
      this._autoShow("invoice_rec", para);
    },
    getInvoice: function(para) {
      this._autoShow("get_invoice", para);
    },
    showPrintEmail: function(para) {
      this._autoShow("print_email", para);
    },
    showAuthResult: function(para) {
      this._autoShow("auth_result", para);
    },
    showDynamic: function(para) {
      this._autoShow("dynamic", para);
    },
    showSelectFile: function(para) {
      this._autoShow("select_file", para, true);
    },
    /*页面初始化系列方法*/
    //页面显示时回调 需plusready
    onPageLoad: function(fun) {
      if(typeof(fun) != "function" || !plus) {
        console.log("onPageLoad fail");
        return;
      }
      if(!curView) {
        app.curView = curView = plus.webview.currentWebview();
      }
      if(curView.preload) {
        if(curView.isVisible()) { //预加载时已显示
          fun(curView.detail || {});
        }
        win.addEventListener("unishow", function(ev) {
          fun(ev.detail || {});
        });
      } else {
        fun(curView.detail || {});
      }
    },
    //预加载页面显示前回调
    onPreload: function(fun) {
      if(typeof(fun) != "function" || !plus) {
        console.log("onPreload fail");
        return;
      }
      if(!curView) {
        app.curView = curView = plus.webview.currentWebview();
      }
      this._reloadFun = fun;
      if(curView.preload) { //预加载
        if(curView.isVisible()) { //预加载时已显示
          this.preload(curView.detail || {});
        }
      } else {
        this.preload(curView.detail || {});
      }
    },
    preload: function(para) {
      var list = document.querySelectorAll(".init-waiting");
      for(var i = 0; i < list.length; i++) {
        list[i].innerHTML = "<div class='ami-loading'><span class='trip trip-bounce1'></span><span class='trip trip-bounce2'></span><span class='trip'></span></div>";
      }
      if(typeof(this._reloadFun) == "function") {
        this._reloadFun(para || {});
      }
    },
    //页面显示状态变化回调
    onUpdateState: function(fun) {
      if(typeof(fun) == "function") {
        if(this.isUpdated) {
          fun();
        }
        this._upStateFun = fun;
      }
    },
    //更新状态(显示和返回时都会触发)
    updateState: function() {
      if(!this.isUpdated) {
        this.isUpdated = true;
      }
      app.isLogin();
      if(typeof(this._upStateFun) == "function") {
        this._upStateFun();
      }
    },
    //id=webviewID 且页面需[id].html;para=传参 预加载后取参监听unishow
    _autoShow: function(id, para, needLogin) {
      if(!curView || !curView.isVisible()) {
        return;
      }
      console.log("show_page(" + curView.id + " --> " + id + ")");
      if(needLogin && !app.isLogin()) {
        app.showLogin();
        return;
      }
      para = para || {};
      para._from = curView.id;
      var p = plus.webview.getWebviewById(id);
      if(p) {
        if(p.preload) {
          p.evalJS("app.preload(" + JSON.stringify(para) + ")");
        }
        mui.fire(p, "unishow", para);
      }
      mui.openWindow({
        url: id + ".html",
        id: id,
        show: ANISHOW_AUTO,
        extras: {
          detail: para
        }
      });
    }
  };
  /*-------初始化---------*/
  var curView;
  var fromView;
  var lan;

  function initDom() {
    var list = document.querySelectorAll(".init-waiting");
    for(var i = 0; i < list.length; i++) {
      list[i].innerHTML = "";
    }
    var vList = document.querySelectorAll(".init-none");
    for(var i = 0; i < vList.length; i++) {
      vList[i].value = "";
    }
  }
  initDom();
  mui.plusReady(function() {

// 声明的JS“扩展插件别名”
    var _BARCODE = 'OpenFile',
        B = window.plus.bridge;
    var OpenFile =
{
// 声明异步返回方法
        OpenFileFunction : function (Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback )
        {
            var success = typeof successCallback !== 'function' ? null : function(args)
            {
                successCallback(args);
            },
            fail = typeof errorCallback !== 'function' ? null : function(code)
            {
                errorCallback(code);
            };
            callbackID = B.callbackId(success, fail);
// 通知Native层plugintest扩展插件运行”PluginTestFunction”方法
            return B.exec(_BARCODE, "OpenFileFunction", [callbackID, Argus1, Argus2, Argus3, Argus4]);
        },
        OpenFileFunctionArrayArgu : function (Argus, successCallback, errorCallback )
        {
            var success = typeof successCallback !== 'function' ? null : function(args)
            {
                successCallback(args);
            },
            fail = typeof errorCallback !== 'function' ? null : function(code)
            {
                errorCallback(code);
            };
            callbackID = B.callbackId(success, fail);
            return B.exec(_BARCODE, "OpenFileFunctionArrayArgu", [callbackID, Argus]);
        },
        // 声明同步返回方法
        OpenFileFunctionSync : function (Argus1, Argus2, Argus3, Argus4)
        {
            // 通知Native层plugintest扩展插件运行“PluginTestFunctionSync”方法并同步返回结果
            return B.execSync(_BARCODE, "OpenFileFunctionSync", [Argus1, Argus2, Argus3, Argus4]);
        },
        OpenFileFunctionSyncArrayArgu : function (Argus)
        {
            return B.execSync(_BARCODE, "OpenFileFunctionSyncArrayArgu", [Argus]);
        }
    };
    window.plus.OpenFile = OpenFile;

    //判断系统语言
    var language = "zh-CN";
    var Build = plus.android.importClass('android.os.Build');
    // 判断是否是7.0
    if(Build.VERSION.SDK_INT >= 24) {
      var main = plus.android.runtimeMainActivity();
      var context = main.getContext();
      var Res = plus.android.importClass("android.content.res.Resources");
      var res = new Res();
      res = context.getResources();
      var Conf = plus.android.importClass("android.content.res.Configuration");
      var conf = new Conf();
      conf = res.getConfiguration();
      var str = conf.getLocales().toString();
      if(str.length > 2) {
        str = str.substr(1, str.length - 2);
        list = str.split(',');
        language = list[0];
      }
    } else {
      var Loc = plus.android.importClass("java.util.Locale");
      language = Loc.getDefault().toString();
    }
//  var iframe = document.createElement('iframe'); 
////    iframe.style.display = "none";
//    iframe.id = "myIframe";
//    iframe.src="https://wmake.com.cn/lang/zh-cn/config.html";  
//    document.body.appendChild(iframe);
//    console.log(document.getElementById("myIframe").contentWindow.document.getElementsByTagName("body")[0].innerText);

//  console.log(storage["lan"]);
//  mui.ajax('https://wmake.com.cn/lang/zh-cn/config.html',{
//      data:{
//
//      },
//      dataType:'json',//服务器返回json格式数据
//      type:'post',//HTTP请求类型
//      timeout:10000,//超时时间设置为10秒；
//      headers:{'Content-Type':'application/json'},                
//      success:function(data){
//     console.log(data);
//     console.log(storage["app_ver"]);
//    if(data.app_ver == storage["app_ver"]) {
//      storage["flag"] = "1";
//      if(language == "zh_CN") {
//        mui.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      } else if(language == "zh_MO_#Hant") {
//        mui.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      } else if(language == "zh_HK_#Hant") {
//        mui.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      } else {
//        $.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      }
//      localStorage.removeItem("lang");
//      localStorage.setItem("lang", lang);
//    } else {
//      storage["flag"] = "2";
//      mui.get("https://wmake.com.cn/lang/cn/strings_zh.json", function(data) {
//        var zh = JSON.stringify(data);
//        localStorage.removeItem("lan");
//        localStorage.setItem("lan", zh);
//      })
//    }
//  
//      },
//      error:function(error){
//        //异常处理；
//        console.log(error);
//      }
//    });
//  mui.post("https://wmake.com.cn/lang/zh-cn/config.html", function(data) {
//     console.log(data);
//     console.log(storage["app_ver"]);
//    if(data.app_ver == storage["app_ver"]) {
//      storage["flag"] = "1";
//      if(language == "zh_CN") {
//        mui.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      } else if(language == "zh_MO_#Hant") {
//        mui.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      } else if(language == "zh_HK_#Hant") {
//        mui.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      } else {
//        $.getJSON("i18n/strings_zh.json", function(data) {
//          var str = JSON.stringify(data)
//          localStorage.setItem("lan", str);
//        })
//      }
//      localStorage.removeItem("lang");
//      localStorage.setItem("lang", lang);
//    } else {
//      storage["flag"] = "2";
//      mui.get("https://wmake.com.cn/lang/cn/strings_zh.json", function(data) {
//        var zh = JSON.stringify(data);
//        localStorage.removeItem("lan");
//        localStorage.setItem("lan", zh);
//      })
//    }
//  }, 'json');

    plus.screen.lockOrientation('portrait-primary'); //锁定竖屏
    if(!curView) {
      app.curView = curView = plus.webview.currentWebview();
    }
    if(curView.detail && curView.detail._from) {
      app.fromView = fromView = plus.webview.getWebviewById(curView.detail._from);
    }
    curView.addEventListener("hide", initDom);
    //初始化状态
    if(curView.preload) { //预加载
      if(curView.isVisible()) { //预加载时已显示
        app.updateState();
      }
      win.addEventListener("unishow", function(ev) {
        if(ev.detail && ev.detail._from) {
          app.fromView = fromView = plus.webview.getWebviewById(ev.detail._from);
        }
        app.updateState();
      });
      curView.addEventListener("hide", function() {
        if(fromView) {
          fromView.evalJS("app.updateState()");
          mui.fire(fromView, "uniback", {
            from: curView.id
          });
        }
      });
    } else { //非预加载
      app.updateState();
      curView.addEventListener("close", function() {
        if(fromView) {
          fromView.evalJS("app.updateState()");
          mui.fire(fromView, "uniback", {
            from: curView.id
          });
        }
      });
    }
  });
  //处理超时
  win.addEventListener("sessionout", function(ev) {
    var rlt = ev.detail;
    var pid = storage["acc"] && JSON.parse(storage["acc"]).pid;
    if(pid) {
      proj.cac.authToken(pid, function() {
        app.msgBox("会话超时重连，请重试");
      }, function(rlt) {
        app.showLogin();
      });
    } else {
      pro.clearState();
      app.showLogin();
    }
  });

  /*-------end---------*/

  /*-------上传下载相关---------*/
  // 从相册中选择图片
  app.galleryImg = function(fun) {
    if(!app.isLogin()) {
      app.showLogin();
      return;
    }
    plus.gallery.pick(fun || function(path) {
      uploadFile(path);
    }, function(error) {
      if(mui.os.ios && error.code == 8) {
        app.msgBox("缺少权限，请到设置-找到本应用-照片，开启访问权限。");
      }
    });
  };
  //拍照
  app.cameraImg = function() {
    var cmr = plus.camera.getCamera();
    if(cmr) {
      cmr.captureImage(function(path) {
        console.log(path);
        uploadFile(path);
      }, function(error) {
        console.log(error.message);
      });
    }
  };
  app.getIOSThirdFile = function(para) {
    //获取第三方传来的文件
//    if(plus.os.name == "iOS") {
  var arg = plus.runtime.arguments;
      if(plus.runtime.arguments != "") {
        if(arg.substr(0, 4) == "file") {
//          if(window.iosThirdFile != arg || para.retry) { //retry=true 不重复性检验
//            window.iosThirdFile = arg; //保存文件地址，防止重复读取
            if(para.auth == "no" || para.auth == "fail") {
              app.msgBox("上传文件打印前需登录", function() {
                app.showLogin({
                  sendThirdFile: true
                });
              });
            } else if(para.auth == "suc") {
               plus.nativeUI.confirm("是否上传本文件打印", function(e) {
               if(e.index==1){
                return
               }else{
                 uploadFile(arg);
               };
              });
            } else if(para.auth == "err") {
              app.msgBox("连接异常，无法打印");
            }
//          }
        }else{
          plus.OpenFile.OpenFileFunction(arg,"123","123","123",function(res){
                 plus.nativeUI.confirm("是否上传本文件打印", function(e) {
                               if(e.index==1){
                                return
                               }else{
                                 uploadFile(res);
                               };
                              });
                   	 },function(res){
                   	 mui.alert(res);
                   	 });
          }
//    }
     plus.runtime.arguments = "";
   }
  };
  //上传文件
  app.uploadFileByPath = function(path) {
    uploadFile(path);
  };
  var dist;
  app.transhant = function(para) {
      var appid = '20171115000095671';
  var key = 'TgQf4m13WVDV5jSzSScV';
  var salt = (new Date).getTime();
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'zh';
  var to = 'cht';
  var str1 = appid + para + salt + key;
  var sign = MD5(str1);
//    mui.ajax('http://api.fanyi.baidu.com/api/trans/vip/translate',{
//    data:{
//    q: para,
//    appid: appid,
//    salt: salt,
//    from: from,
//    to: to,
//    sign: sign
//    },
//    dataType:'json',//服务器返回json格式数据
//    async: false,
//    type:'post',//HTTP请求类型
//    success:function(data){
//      var result = data.trans_result[0].dst;
//    },
//    error:function(xhr,type,errorThrown){
//      //异常处理；
//      console.log(type);
//    }
//  });
   return  result;
  };
  app.transen = function(para) {
      var appid = '20171115000095671';
  var key = 'TgQf4m13WVDV5jSzSScV';
  var salt = (new Date).getTime();
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'zh';
  var en = 'en';
  var str1 = appid + para + salt + key;
  var sign = MD5(str1);
  var result;
  var a = mui.post('http://api.fanyi.baidu.com/api/trans/vip/translate',{
    q: para,appid: appid,salt: salt,from: from,to:en,sign: sign
    },function(data){
      console.log("请求完成");
//     dist = handleData(data);
//     console.log(dist);
      return data.trans_result[0].dst;
    },"json");
 console.log(a);
  };
  function handleData(data){
    var result = data.trans_result[0].dst;
    console.log(result);
    return result;
  }
  function MD5(string) {
  
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
  
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
  
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
  
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
  
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    };
  
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
  
    string = Utf8Encode(string);
  
    x = ConvertToWordArray(string);
  
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
  
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  
    return temp.toLowerCase();
}
  function uploadFile(path) {
    if(!path) {
      app.msgBox("文件读取失败");
      return false;
    }
    if(!app.vfy.isSupFile(path)) {
      app.msgBox("文件格式不支持");
      return false;
    }
    var uploader = getUploader([{
      path: path
    }], function(f, status) {
      //mui.alert("完成了"+status+";"+JSON.stringify(f))
      uploadComplete(f.responseText, status);
    });
    showUpOrDowDLG("上传文件", function() {
      app.toast("取消上传");
      uploader.abort();
    });
    var bar = mui("#u-updowbar");
    uploader.start();
    var it = setInterval(function() {
      if(uploader.uploadedSize) {
        var v = parseInt(uploader.uploadedSize / uploader.totalSize * 100);
        if(bar.length == 0 || v > 99) {
          clearInterval(it);
        }
        bar.progressbar().setProgress(v);
        var upSize = document.getElementById("u-uploadsize");
        if(upSize) {
          upSize.innerText = app.getFileSize(uploader.uploadedSize) + "/" + app.getFileSize(uploader.totalSize);
        }
      }
    }, 500);
  }
  //选择文件
  app.getFile = function(ipt) {
    if(IS_IOS) return;
    if(!app.isLogin()) {
      app.showLogin();
      return;
    }
    plus.nativeUI.showWaiting();
    var main = plus.android.runtimeMainActivity();
    var Intent = plus.android.importClass('android.content.Intent');
    var Build = plus.android.importClass('android.os.Build');
    var Uri = plus.android.importClass('android.net.Uri');
    var intent = new Intent(Intent.ACTION_GET_CONTENT);
    // 判断是否是7.0
    //		if(Build.VERSION.SDK_INT >= 24) {
    //			// 适配android7.0 ，不能直接访问原路径
    //			// 需要对intent 授权
    //			intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    //		}
    //intent.setFlags(Intent.FLAG_ACTIVITY_TASK_ON_HOME);
    //		intent.setAction(Intent.ACTION_CHOOSER); 
    //		var v=new Intent(Intent.ACTION_GET_CONTENT);
    //		v.setType("*/*");
    //		v.addCategory(Intent.CATEGORY_OPENABLE);
    //intent.putExtra(Intent.EXTRA_TITLE, "my chooser");  
    //intent.putExtra(Intent.EXTRA_INTENT,v); 
    intent.setType("*/*");
    intent.addCategory(Intent.CATEGORY_OPENABLE);
    main.onActivityResult = function(requestCode, resultCode, data) {
      if(resultCode == this.RESULT_OK) {
        var uri = new Uri();
        uri = data.getData();
        var path = getPath(this, uri);
        uploadFile(path);
      }
    }
    main.startActivityForResult(intent, 1);
    plus.nativeUI.closeWaiting();

    function getPath(context, uri) {
      var docType = uri.getAuthority();
      var isKitKat = Build.VERSION.SDK_INT > 18;
      var DocumentsContract = plus.android.importClass("android.provider.DocumentsContract");
      // DocumentProvider  
      if(isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
        // ExternalStorageProvider  
        if(isExternalStorageDocument(docType)) {
          var docId = DocumentsContract.getDocumentId(uri);
          var split = docId.split(":");
          var type = split[0];

          if(type.toLowerCase() == "primary") {
            return plus.android.invoke("android.os.Environment", "getExternalStorageDirectory") + "/" + split[1];
          }
        }
        // DownloadsProvider  
        else if(isDownloadsDocument(docType)) {
          var id = DocumentsContract.getDocumentId(uri);
          var contentUri = plus.android.invoke("android.content.ContentUris", "withAppendedId", Uri.parse("content://downloads/public_downloads"), id);
          return getDataColumn(context, contentUri, null, null);
        }
        // MediaProvider  
        else if(isMediaDocument(docType)) {
          var docId = DocumentsContract.getDocumentId(uri);
          var split = docId.split(":");
          var type = split[0];
          var MediaStore = plus.android.importClass("android.provider.MediaStore");
          var contentUri = new Uri();
          if("image" == type) {
            contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
          } else if("video" == type) {
            contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
          } else if("audio" == type) {
            contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
          }

          var selection = "_id=?";
          var selectionArgs = [split[1]];
          return getDataColumn(context, contentUri, selection, selectionArgs);
        }
      }
      // MediaStore (and general)  
      else if("content" == uri.getScheme().toLowerCase()) {
        // Return the remote address  
        if(isGooglePhotosUri(docType))
          return uri.getLastPathSegment();
        return getDataColumn(context, uri, null, null);
      }
      // File  
      else if("file" == uri.getScheme().toLowerCase()) {
        return uri.getPath();
      }
      return null;
    }

    function getDataColumn(context, uri, selection, selectionArgs) {
      var Cursor = plus.android.importClass("android.database.Cursor");
      var cursor = new Cursor();
      var column = "_data";
      var projection = [column];
      try {
        var res = context.getContentResolver();
        plus.android.importClass(res);
        cursor = res.query(uri, projection, selection, selectionArgs, null);
        if(cursor != null && cursor.moveToFirst()) {
          var index = cursor.getColumnIndexOrThrow(column);
          return cursor.getString(index);
        }
      } finally {
        cursor.close();
      }
      return null;
    }

    function isExternalStorageDocument(type) {
      return "com.android.externalstorage.documents" == type;
    }

    function isDownloadsDocument(type) {
      return "com.android.providers.downloads.documents" == type;
    }

    function isMediaDocument(type) {
      return "com.android.providers.media.documents" == type;
    }

    function isGooglePhotosUri(type) {
      return "com.google.android.apps.photos.content" == type;
    }
    //		var ipt = document.createElement("input");
    //		ipt.type = "file";
    //		ipt.click();
    //
    //		var main = plus.android.runtimeMainActivity();
    //		var Intent = plus.android.importClass('android.content.Intent');
    //		var Build = plus.android.importClass('android.os.Build');
    //		var intent = new Intent(Intent.ACTION_GET_CONTENT);
    //		//		if (Build.VERSION.SDK_INT <19) {
    //		//			intent.setAction(Intent.ACTION_GET_CONTENT);
    //		//		}else {
    //		//			intent.setAction(Intent.ACTION_OPEN_DOCUMENT);
    //		//		}
    //		intent.setType("*/*");
    //		intent.addCategory(Intent.CATEGORY_OPENABLE);
    //		main.onActivityResult = function(requestCode, resultCode, data) {
    //			if(resultCode == this.RESULT_OK) {
    //				var Uri = plus.android.importClass('android.net.Uri');
    //				var uri = new Uri();
    //				uri = data.getData();
    //				var path;
    //				if(Build.VERSION.SDK_INT > 18 && uri.getAuthority() == "com.android.providers.media.documents") { //android>4.4
    //					var MediaStore = plus.android.importClass("android.provider.MediaStore");
    //					var proj = [];
    //					proj.push(MediaStore.Images.Media.DATA);
    //					var CursorLoader = plus.android.importClass("android.content.CursorLoader");
    //					var loader = new CursorLoader(this, uri, proj, null, null, null);
    //					var Cursor = plus.android.importClass("android.database.Cursor");
    //					var cursor = new Cursor();
    //					//
    //					//					var m=plus.android.runtimeMainActivity();
    //					//					var res=m.getContentResolver();
    //					//					plus.android.importClass(res);
    //					//					cursor=res.query(uri, proj, null, null, null);
    //					//
    //					cursor = loader.loadInBackground();
    //					//var cursor = this.managedQuery(uri, proj, null, null, null); 
    //					var column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
    //					cursor.moveToFirst();
    //					path = cursor.getString(column_index);
    //				} else {
    //					path = uri.toString();
    //				}
    //				uploadFile(path);
    //			}
    //		}
    //		main.startActivityForResult(intent, 1);
    //		plus.nativeUI.closeWaiting();
    //return;
    //下边的实现方式简直是垃圾 input控件在安卓下总是不能正确获取到文件
    //		ipt.addEventListener("change", function() {
    //			if(this.files.length > 0 && this.files[0].name && this.files[0].size > 0) { //
    //				var fd = new FormData();
    //				fd.append("fileToUpload", this.files[0]);
    //				var xhr = new XMLHttpRequest();
    //				//进度
    //				xhr.upload.addEventListener("progress", uploadProgress, false);
    //				//完成
    //				xhr.addEventListener("load", function(evt) {
    //					uploadComplete(evt.target.responseText, evt.target.status);
    //				}, false);
    //				//错误
    //				xhr.addEventListener("error", function(evt) {
    //					uni.closeDLG();
    //					console.log("上传文件出错:" + evt.target.responseText);
    //					app.msgBox("上传文件出错");
    //				}, false);
    //				//撤销
    //				xhr.addEventListener("abort", function() {
    //					uni.closeDLG();
    //					console.log("撤销上传文件");
    //				}, false);
    //				xhr.open("POST", proj.upload.getUrl()); //修改成自己的接口
    //				//打开上传界面
    //				showUpOrDowDLG("上传文件", function() {
    //					app.toast("取消上传");
    //					xhr.abort();
    //				});
    //				console.log("开始上传")
    //				xhr.send(fd);
    //				ipt.value = "";
    //			} else {
    //				app.msgBox("无法读取到文件");
    //			}
    //		});
    //	
  };

  function getUploader(files, callback) {
  // mui.alert(JSON.stringify(files));
    if(files.length == 0) {
      app.msgBox("没有添加上传文件！");
      return;
    }
    var task = plus.uploader.createUpload(proj.upload.getUrl(), {
        method: "POST"
      },
      callback
    );
    var f = files[0];
    console.log(f.path);
    var name = f.path.split("/");
    //mui.alert(name[name.length-1]);
    task.addFile(f.path, {
      key: "testdoc",name:encodeURI(name[name.length-1])
    });
    return task;
  }

  function showUpOrDowDLG(title, cancel) {
    //		layerOpen({
    //			title: title || "文件传送",
    //			content: "<div id='u-updowbar' class='mui-progressbar'><span></span></div><div id='u-uploadsize' class='mui-text-center'>0/0</div>",
    //			btn: ["取消"],
    //			event: [cancel],
    //			style: {
    //				content: "padding:10px 5px;"
    //			}
    //		});
    uni.msgDLG("<div id='u-updowbar' class='mui-progressbar'><span></span></div><div id='u-uploadsize' class='mui-text-center'>连接中...</div>",
      title || "文件传送",
      undefined,
      cancel,
      "",
      "取消", {
        content: "padding:10px 5px;"
      },
      (cancel ? true : false)
    );
  }

  function uploadProgress(evt) {
    if(evt.lengthComputable) {
      var bar = mui("#u-updowbar");
      if(bar.length > 0) {
        var v = Math.round(evt.loaded * 100 / evt.total);
        bar.progressbar().setProgress(v);
        document.getElementById("u-uploadsize").innerText = app.getFileSize(evt.loaded) + "/" + app.getFileSize(evt.total);
      }
    }
  }

  function uploadComplete(rltText, status) {
    if(!document.getElementById("u-uploadsize")) {
      return; //由于uploader.abort()取消上传任务无效，暂时通过检查上传进度条是否还在来判断是否被取消
    }
    uni.closeDLG();
//    mui.alert(rltText+status);
    setTimeout(function() { //防止残影 等待320ms
      if(status == 200) {
        var rlt = JSON.parse(rltText);
        if(rlt && rlt.ret == 1) {
          console.log("上传文件成功:" + rltText);
          app.showPrintConfig({
            file: rlt.data
          });
          return;
        } else {
          app.msgBox(rlt ? rlt.msg : "上传文件失败");
        }
      } else {
      mui.alert(rltText+status);
        console.log("上传文件失败：" + status + "/" + rltText);
        var rlt = JSON.parse(rltText);
        if(rlt.msg) {
          app.msgBox(rlt.msg)
        } else {
          app.msgBox("上传文件失败");
        }
      }
    }, 320);
  }
  //下载文件
  app.downloadFile = function(url, filename, suc, para) {
    if(!app.isLogin()) {
      app.showLogin();
      return;
    }
    para = para || {};
    var path = "_downloads/" + filename;
    url = encodeURI(url);
    console.log("下载：" + url);
    plus.io.resolveLocalFileSystemURL(path, function(entry) {
      console.log("已下载");
      if(suc) suc(path, entry);
    }, function() {
      var dtask = plus.downloader.createDownload(url, {
        filename: path
      }, function(dl, status) {
        if(status == 200) {
          plus.io.resolveLocalFileSystemURL(path, function(entry) {
            if(suc) suc(path, entry);
          });
        } else {
          app.toast("下载失败");
          console.log("下载失败");
        }
      });
      showUpOrDowDLG("下载文件", para.type == "must" ? null : function() {
        app.toast("取消下载");
        dtask.abort();
      });
      dtask.start();
      dtask.addEventListener("statechanged", function(task, status) {
        if(!dtask) {
          return;
        }
        switch(task.state) {
          case 1: // 开始
            console.log("开始下载...");
            break;
          case 2: // 已连接到服务器
            console.log("链接到服务器...");
            break;
          case 3: // 已接收到数据
            var bar = mui("#u-updowbar");
            if(bar.length > 0) {
              var v = Math.round(task.downloadedSize * 100 / task.totalSize);
              bar.progressbar().setProgress(v);
              document.getElementById("u-uploadsize").innerText = app.getFileSize(task.downloadedSize) + "/" + app.getFileSize(task.totalSize);
            }
            break;
          case 4: // 下载完成
            console.log("下载完成！");
            uni.closeDLG();
            break;
          default:
            console.log(task.state);
            break;
        }
      });
    });

  };
  /*-------end---------*/

  //verify
  var vfy = {
    //手机号
    isPhone: function(v) {
      if(v.length != 11 || isNaN(parseInt(v))) {
        app.msgBox("请输入正确的手机号码");
        return false;
      }
      return true;
    },
    //邮箱
    isEmail: function(v) {
      if(!uni.ckEmail(v)) {
        app.msgBox("请输入正确的邮箱格式");
        return false;
      }
      return true;
    },
    //图片
    isImg: function(v) {
      var arr = v.split('.');
      v = arr[arr.length - 1];
      return uni.isImg(v);
    },
    //支持的文件格式
    isSupFile: function(v) {
      if(v) {
        var tmp = v.split('.');
        if(tmp.length > 0) {
          var ext = tmp[tmp.length - 1].toLowerCase();
          if(this.isImg(ext)) {
            return true;
          }
          var sup = {
            txt: true,
            pdf: true,
            doc: true,
            docx: true,
            xls: true,
            xlsx: true,
            ppt: true,
            pptx: true
          }
          if(sup[ext]) {
            return true;
          }
        }
      }
      return false;
    }
  };
  app.vfy = vfy;
  //convert
  var cvt = {
    //日期
    toDate: function(i) {
      i = i + "";
      var y = i.substr(0, 4);
      var m = i.substr(4, 2);
      var d = i.substr(6, 2);
      return y + "-" + m + "-" + d;
    },
    //时间
    toTime: function(i) {
      i = i + "";
      if(i.length == 5) {
        i = "0" + i;
      } else if(i.length < 4) {
        i = ("0000" + i).substr(-4);
      }
      var h = i.substr(0, 2);
      var m = i.substr(2, 2);
      return h + ":" + m;
    },
    formatDate: function(d) {
      var now = new Date(d);
      var h = now.getHours();
      var m = now.getMinutes();
      var s = now.getSeconds();
      return(h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    },
    //距离
    toDistance: function(m) {
      var ret = "0";
      if(m > 0) {
        if(m > 1000) {
          var arr = ((m / 1000) + "").split('.');
          if(arr.length == 2) {
            var z = arr[0];
            var x = arr[1];
            x = x.substr(0, 2);
            ret = z + "." + x + "km";
          }
        } else {
          ret = m + "m";
        }
      }
      return ret;
    },
    //加星号
    getEncName: function(str) {
      if(str.length < 11) {
        return str;
      }
      var i = str.substr(0, 3);
      var k = str.substr(7);
      return i + "****" + k;
    },
    //根据拓展名获取图标
    getFmtIcon: function(fmt) {
      var suf = "blue icon-suolvetu"
      if(fmt == "pdf") {
        suf = "deepred icon-pdf";
      } else if(fmt == "txt") {
        suf = "blue icon-txt";
      } else if(fmt == "xls" || fmt == "xlsx") {
        suf = "blue icon-excel";
      } else if(fmt == "doc" || fmt == "docx") {
        suf = "blue icon-word";
      } else if(fmt == "ppt" || fmt == "pptx") {
        suf = "blue icon-ppt";
      } else if(fmt == "jpg" || fmt == "jpeg" || fmt == "png" || fmt == "gif") {
        suf = "green icon-img";
      }
      return suf;
    }
  };
  app.cvt = cvt;
  //Login
  app.login = function(pid, pwd, sms) {
    proj.cac.login(pid, pwd, sms, function(rlt) {
      if(pwd == "") {
        app.msgBox("登录成功，请修改密码", function() {
          app.fromView.evalJS("app.showPassword()");
          mui.back();
        });
      } else {
        mui.back();
      }
    });
  };
  app.isLogin = function() {
    if(localStorage["acc"]) {
      pro.acc = JSON.parse(localStorage["acc"]);
    } else {
      pro.acc = null;
    }
    return pro.acc ? true : false;
  };
  //验证码
  app.regVerify = function(dom, pidDom) {
    dom.addEventListener("tap", function() {
      var phone = (pidDom && pidDom.value) || (pro.acc && pro.acc.pid); //pro.acc.phone 手机不全
      if(!phone) {
        app.msgBox("请输入手机号");
        return;
      }
      proj.util.sendSMS(phone, function() {
        app.toast("验证码已发送");
        var t = 60;
        dom.disabled = "disabled";
        var id = setInterval(function() {
          dom.innerText = "重新发送" + t--;
          if(t < 0) {
            dom.disabled = "";
            dom.innerText = "获取验证码";
            clearInterval(id);
          }
        }, 1000);
      }, function(rlt) {
        app.msgBox(rlt.msg);
      });
    });
  };
  //获取余额
  app.getBalance = function(suc, para) {
    proj.cac.getBalance(para, function(rlt) {
      if(suc) suc(app.cvtFee(rlt.data.dwBalance), rlt.data);
    });
  };
  //获取收费标准
  app.getPrintFeeSTD = function(suc, para) {
    proj.print.getFeeSTD(function(rlt) {
      storage["print_fee_std"] = rlt.data;
      if(suc) suc(rlt);
    }, para);
  };
  //支付
  app.pay = function(payChanel, sum, suc, para) {
    if(!isNaN(parseFloat(sum))) {
      var arr = sum.split('.');
      var zs = parseInt(arr[0] || 0);
      var xs = arr[1] || "00";
      if(xs.length > 2) {
        app.toast("金额只支持到分");
        return;
      } else if(xs.length == 1) {
        xs += "0";
      }
      if(zs >= 0) {
        var fee = zs * 100 + parseInt(xs);
        if(checkPayChanel(payChanel)) {
          var type = payChanel.id;
          if(type == "wxpay") { //微信
            proj.pay.payWX(fee, function(rlt) {
              console.log(JSON.stringify(rlt.data));
              plus.payment.request(payChanel, rlt.data, function(result) {
                console.log(JSON.stringify(result));
                suc && suc(result, rlt.data);
              }, function(e) {
                console.log(JSON.stringify(e));
                app.toast("支付失败");
              });
            }, {
              attch: para
            });
          } else if(type == "alipay") { //支付宝
            proj.pay.alipay(fee, function(rlt) {
              plus.payment.request(payChanel, rlt.data, function(result) {
                console.log(JSON.stringify(result));
                suc && suc(result, rlt.data);
              }, function(e) {
                console.log(JSON.stringify(e));
                var msg = e.message.substr(e.message.indexOf(']') + 1);
                if(msg) {
                  app.toast(msg);
                } else {
                  app.toast("支付失败");
                }
              });
            }, para); ///////////////////////////////////////////////////////////////////////////////这里
          } else { //不支持的支付类型
            app.msgBox("不支持的支付类型");
          }
        }
        return;
      }
    }
    app.toast("输入金额有误");
  }
  // 检测支付通道是否安装支付服务
  function checkPayChanel(pc) {
    if(!pc) {
      return false;
    }
    if(!pc.serviceReady) {
      var txt = null;
      switch(pc.id) {
        case "alipay":
          txt = "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
          break;
        default:
          txt = "系统未安装“" + pc.description + "”服务，无法完成支付，是否立即安装？";
          break;
      }
      plus.nativeUI.confirm(txt, function(e) {
        if(e.index == 0) {
          pc.installService();
        }
      }, pc.description);
      return false;
    } else {
      return true;
    }
  }
  //runtime
  app.quit = function() {
    plus.runtime.quit();
  };
  //tools
  app.getFileSize = function(size) {
    var fileSize = 0;
    if(size > 1024 * 1024)
      fileSize = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
      fileSize = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
    return fileSize;
  }
  app.cvtFee = function(fee) {
    var minus = "";
    if(fee < 0) {
      minus = "-";
      fee = -fee;
    }
    var f = fee % 100;
    if(f == 0) f = "00";
    else if(f > 9) f = (f + "0").substr(0, 2);
    else f = "0" + f;
    return minus + parseInt(fee / 100) + "." + f;
  }
  app.get1970DateTime = function(sec, fmt) {
    if(!sec) return "";
    sec = parseInt(sec);
    var dt1970 = new Date(1970, 0, 01, 8, 0, 0);
    dt1970.setSeconds(dt1970.getSeconds() + sec);
    return dt1970.format(fmt || "yyyy-MM-dd HH:mm");
  }
  win.app = app;
})(window);