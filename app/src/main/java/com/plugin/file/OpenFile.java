package com.plugin.file;

/**
 * Created by li on 2017/12/26.
 */
        import android.content.Intent;
        import android.database.Cursor;
        import android.net.Uri;
        import android.os.Bundle;
        import android.provider.MediaStore;
        import android.util.Log;

        import cn.com.justprint.JustprintApp.R;
        import io.dcloud.common.DHInterface.IWebview;
        import io.dcloud.common.DHInterface.StandardFeature;
        import io.dcloud.common.util.JSUtil;

        import org.json.JSONArray;
        import org.json.JSONException;
        import org.json.JSONObject;

        import java.io.File;

        import static io.dcloud.common.util.ReflectUtils.getApplicationContext;

public class OpenFile extends StandardFeature
{
    public void OpenFileFunction(IWebview pWebview, JSONArray array)
    {
        String CallBackID = array.optString(0);

        Uri uri = pWebview.getActivity().getIntent().getData();
        File file = null;
        String[] proj = { MediaStore.Images.Media.DATA };
        Cursor cursor = getApplicationContext().getContentResolver().query(uri, proj, null,null, null);
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String filepath = cursor.getString(column_index);
//        JSONArray newArray = new JSONArray();
//        newArray.put(array.optString(1));
//        newArray.put(array.optString(2));
//        newArray.put(array.optString(3));
//        newArray.put(array.optString(4));


        JSUtil.execCallback(pWebview, CallBackID, filepath, JSUtil.OK, false);

    }

    public void OpenFileFunctionArrayArgu(IWebview pWebview, JSONArray array)
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

    public String OpenFileFunctionSyncArrayArgu(IWebview pWebview, JSONArray array)
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

    public String OpenFileFunctionSync(IWebview pWebview, JSONArray array)
    {
        String inValue1 = array.optString(0);
        String inValue2 = array.optString(1);
        String inValue3 = array.optString(2);
        String inValue4 = array.optString(3);

        String ReturnValue = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        return JSUtil.wrapJsVar(ReturnValue,true);
    }
}

