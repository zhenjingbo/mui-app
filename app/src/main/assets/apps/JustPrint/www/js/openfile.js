document.addEventListener( "plusready",  function()
{
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
}, true );