document.addEventListener( "plusready",  function()
{
// 声明的JS“扩展插件别名”
    var _BARCODE = 'AlilogPlugin',
        B = window.plus.bridge;
    var AlilogPlugin = 
{
// 声明异步返回方法
        AlilogPluginFunction : function (Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback ) 
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
            return B.exec(_BARCODE, "AlilogPluginFunction", [callbackID, Argus1, Argus2, Argus3, Argus4]);
        },
        AlilogPluginFunctionArrayArgu : function (Argus, successCallback, errorCallback ) 
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
            return B.exec(_BARCODE, "AlilogPluginFunctionArrayArgu", [callbackID, Argus]);
        },      
        // 声明同步返回方法
        AlilogPluginFunctionSync : function (Argus1, Argus2, Argus3, Argus4) 
        {            
       // 通知Native层plugintest扩展插件运行“PluginTestFunctionSync”方法并同步返回结果
            return B.execSync(_BARCODE, "AlilogPluginFunctionSync", [Argus1, Argus2, Argus3, Argus4]);
        },
        AlilogPluginFunctionSyncArrayArgu : function (Argus) 
        {                                   
            return B.execSync(_BARCODE, "AlilogPluginFunctionSyncArrayArgu", [Argus]);
        }
    };
    window.plus.AlilogPlugin = AlilogPlugin;
}, true );