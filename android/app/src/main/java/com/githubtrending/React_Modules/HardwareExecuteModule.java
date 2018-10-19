package com.githubtrending.React_Modules;

import android.hardware.Camera;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by NewYyoung on 2017/10/12.
 */

public class HardwareExecuteModule extends ReactContextBaseJavaModule{
    private Camera camera;
    private Camera.Parameters parameters;
    public HardwareExecuteModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "HardwareExecute";
    }

    /**
     * 手电筒控制方法
     *
     * @param lightStatus
     * @return
     */
    @ReactMethod
    private void lightSwitch(final boolean lightStatus) {
        camera = Camera.open();
        parameters = camera.getParameters();
        if (lightStatus){
            Toast.makeText(getCurrentActivity(), "打开手电筒", Toast.LENGTH_SHORT).show();
            new Thread(new TurnOnLight()).start();
        }
        else{
        Toast.makeText(getCurrentActivity(), "关闭手电筒", Toast.LENGTH_SHORT).show();
            parameters.setFlashMode("off");
            camera.setParameters(parameters);
        }

    }
    private class TurnOnLight implements Runnable{
        @Override
        public void run() {
            parameters.setFlashMode("torch");
            camera.setParameters(parameters);
        }
    }

}
