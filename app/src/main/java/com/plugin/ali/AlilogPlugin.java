package com.plugin.ali;

import io.dcloud.PandoraEntryActivity;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.FragmentActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.AuthTask;

import java.util.Map;

/**
 * Created by li on 2017/12/19.
 */
public class AlilogPlugin extends StandardFeature {
    private JSONArray newArray;
    private IWebview pWebview;
    public void AlilogPluginFunction(IWebview pWebview, JSONArray array)
    {
         this.pWebview = pWebview;

        newArray = new JSONArray();
        String id = array.optString(0);
//        newArray.put(array.optString(1));
//        newArray.put(array.optString(2));
//        newArray.put(array.optString(3));
//        newArray.put(array.optString(4));

        String authInfo = array.optString(1);
        String PID = array.optString(2);
        String TARGET_ID = array.optString(3);
        String RSA2_PRIVATE = array.optString(4);
        //在这里调用支付宝的登录，上面是参数
        PayDemo pay = new PayDemo(authInfo,id);
        pay.authV2();

    }

    public void AlilogPluginFunctionArrayArgu(IWebview pWebview, JSONArray array)
    {
        String ReturnString = null;
        String CallBackID =  array.optString(0);
        JSONArray newArray = null;
        try {

            newArray = new JSONArray( array.optString(1));
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);
            ReturnString = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        JSUtil.execCallback(pWebview, CallBackID, ReturnString, JSUtil.OK, false);
    }

    public String AlilogPluginFunctionSyncArrayArgu(IWebview pWebview, JSONArray array)
    {
        JSONArray newArray = null;
        JSONObject retJSONObj = null;
        try {

            newArray = array.optJSONArray(0);
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);

            retJSONObj = new JSONObject();
            retJSONObj.putOpt("RetArgu1", inValue1);
            retJSONObj.putOpt("RetArgu2", inValue2);
            retJSONObj.putOpt("RetArgu3", inValue3);
            retJSONObj.putOpt("RetArgu4", inValue4);

        } catch (JSONException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        return JSUtil.wrapJsVar(retJSONObj);
    }

    public String AlilogPluginFunctionSync(IWebview pWebview, JSONArray array)
    {
        String inValue1 = array.optString(0);
        String inValue2 = array.optString(1);
        String inValue3 = array.optString(2);
        String inValue4 = array.optString(3);

        String ReturnValue = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        return JSUtil.wrapJsVar(ReturnValue,true);
    }

    public class PayDemo{

        /**
         * 支付宝支付业务：入参app_id
         */
        private  String APPID = "";
        /**
         * 支付宝账户登录授权业务：入参pid值
         */
        private String PID = "";
        /**
         * 支付宝账户登录授权业务：入参target_id值
         */
        private  String TARGET_ID = "";
        private String result_auth = "";


        /** 商户私钥，pkcs8格式 */
        /** 如下私钥，RSA2_PRIVATE 或者 RSA_PRIVATE 只需要填入一个 */
        /** 如果商户两个都设置了，优先使用 RSA2_PRIVATE */
        /** RSA2_PRIVATE 可以保证商户交易在更加安全的环境下进行，建议使用 RSA2_PRIVATE */
        /** 获取 RSA2_PRIVATE，建议使用支付宝提供的公私钥生成工具生成， */
        /**
         * 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1
         */
        private String RSA2_PRIVATE = "";
        public static final String RSA_PRIVATE = "";
         String authInfo = "";
        String CallBackID = "";
        private static final int SDK_PAY_FLAG = 1;
        private static final int SDK_AUTH_FLAG = 2;

        public PayDemo(String authInfo,String id) {
            this.authInfo=authInfo;
            this.CallBackID = id;
        }

        /**
         * 支付宝账户授权业务
         *
         * @param
         */
        public void authV2() {

//            if (TextUtils.isEmpty(PID) || TextUtils.isEmpty(APPID)
//                    || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))
//                    || TextUtils.isEmpty(TARGET_ID)) {
//                /* new AlertDialog.Builder(this).setTitle("警告").setMessage("需要配置PARTNER |APP_ID| RSA_PRIVATE| TARGET_ID")
//                        .setPositiveButton("确定", new DialogInterface.OnClickListener() {
//                            public void onClick(DialogInterface dialoginterface, int i) {
//                            }
//                        }).show(); */
//                Log.d("支付宝参数错误", "需要配置PARTNER");
//                return;
//            }
//
//            /**
//             * 这里只是为了方便直接向商户展示支付宝的整个支付流程；所以Demo中加签过程直接放在客户端完成；
//             * 真实App里，privateKey等数据严禁放在客户端，加签过程务必要放在服务端完成；
//             * 防止商户私密数据泄露，造成不必要的资金损失，及面临各种安全风险；
//             *
//             * authInfo的获取必须来自服务端；
//             */
//            boolean rsa2 = (RSA2_PRIVATE.length() > 0);
//            Map<String, String> authInfoMap = OrderInfoUtil2_0.buildAuthInfoMap(PID, APPID, TARGET_ID, rsa2);
//            String info = OrderInfoUtil2_0.buildOrderParam(authInfoMap);
//
//            String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
//            String sign = OrderInfoUtil2_0.getSign(authInfoMap, privateKey, rsa2);
//            final String authInfo = ;
            Runnable authRunnable = new Runnable() {

                @Override
                public void run() {
                    // 构造AuthTask 对象
                    AuthTask authTask = new AuthTask(pWebview.getActivity());
                    // 调用授权接口，获取授权结果
                    Map<String, String> result = authTask.authV2(authInfo, true);
//                    Message msg = new Message();
//                    msg.what = SDK_AUTH_FLAG;
//                    msg.obj = result;
//                    mHandler.sendMessage(msg);
                    AuthResult authResult = new AuthResult((Map<String, String>)result, true);
                    String resultStatus = authResult.getResultStatus();

                    // 判断resultStatus 为“9000”且result_code
                    // 为“200”则代表授权成功，具体状态码代表含义可参考授权接口文档
                    if (TextUtils.equals(resultStatus, "9000") && TextUtils.equals(authResult.getResultCode(), "200")) {
                        // 获取alipay_open_id，调支付时作为参数extern_token 的value
                        // 传入，则支付账户为该授权账户
                        result_auth =
                                "授权成功\n" + String.format("authCode:%s", authResult.getAuthCode());
//                        String CallBackID = "0";
//                        String info = String.format(authResult.getAuthCode());
//                        JSUtil.execCallback(pWebview, CallBackID, info, JSUtil.OK, false);
                    } else {
                        // 其他状态值则为授权失败
                        result_auth =
                                "授权失败" + String.format("authCode:%s", authResult.getAuthCode());
                    }

                    String info = String.format(authResult.getAuthCode());
                    JSUtil.execCallback(pWebview, CallBackID, info, JSUtil.OK, false);
                }
            };

            // 必须异步调用
            Thread authThread = new Thread(authRunnable);
            authThread.start();
        }
    }
}
