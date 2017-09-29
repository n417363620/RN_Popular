package com.githubtrending.React_Modules;

import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by NewYyoung on 2017/9/28.
 */

public class ToastModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @Override
    public String getName() {
        return "ToastExample";
    }
    @ReactMethod
    public void show(String message, int duration, Promise promise) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        promise.resolve("Toast成功！！！");
    }
}
