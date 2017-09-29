package com.githubtrending.React_Modules;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.githubtrending.ImagePicker.activity.ImageSelect;
import com.githubtrending.ImagePicker.activity.ImsMultiImageSelectorActivity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.githubtrending.ImagePicker.activity.ImageSelect.REQUEST_SELECT_IMAGE;

/**
 * Created by NewYyoung on 2017/9/29.
 */

public class ImagePickerModule extends ReactContextBaseJavaModule{
    private final  String SELECTEDMODE_SINGLE="SINGLE";
    private final  String SELECTEDMODE_MULTI="MULTI";

    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

    private Promise mPickerPromise;
    private ArrayList<String> mSelectPath=new ArrayList<>();
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == ImageSelect.REQUEST_SELECT_IMAGE) {
                if (mPickerPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPickerPromise.reject(E_PICKER_CANCELLED, "Image picker was cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {
                        mSelectPath = ImageSelect.ImageFrom(intent);
                        if (mSelectPath == null||mSelectPath.size() == 0) {
                            mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found");
                        } else {
                            WritableArray writableArray = new WritableNativeArray();
                            for (int i = 0; i < mSelectPath.size(); i++) {
                                writableArray.pushString(mSelectPath.get(i));
                            }
                            mPickerPromise.resolve(writableArray);
                        }
                    }
                    mPickerPromise = null;
                }
            }
        }
    };

    public ImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }
    /**
     * 跳转至图片选择界面
     * @param selectedMode   0 是单选，1 是多选
     * @param mSelectPath    图片地址的集合（为String类型）
     * @param maxNum         最大图片添加数量
     */
    @ReactMethod
    public  void selectImageFormSDWithCamera(int selectedMode, WritableArray source, int maxNum,final Promise promise){
        this.mPickerPromise=promise;
        Activity activity = getCurrentActivity();
        boolean showCamera = true;//是否显示拍照图片
        ArrayList<String> mSelectPath=new ArrayList<>();
        for (int i = 0; i < source.size(); i++) {
            mSelectPath.add(source.getString(i));
        }
        Intent intent = new Intent(activity, ImsMultiImageSelectorActivity.class);
        // 是否显示拍摄图片
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SHOW_CAMERA, showCamera);
        // 最大可选择图片数量
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_COUNT, maxNum);
        // 选择模式
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_MODE, selectedMode);
        // 默认选择
        if (mSelectPath != null && mSelectPath.size() > 0) {
            intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_DEFAULT_SELECTED_LIST, mSelectPath);
        }

        activity.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }
    @ReactMethod
    public  void selectImageFormSDNeedsCrop(int selectedMode, ReadableArray source, boolean needCrop, final Promise promise){
        this.mPickerPromise=promise;
        Activity activity = getCurrentActivity();
        boolean showCamera = true;//是否显示拍照图片
        ArrayList<String> mSelectPath=new ArrayList<>();
        for (int i = 0; i < source.size(); i++) {
            mSelectPath.add(source.getString(i));
        }

        Intent intent = new Intent(activity, ImsMultiImageSelectorActivity.class);
        //能否裁剪
        intent.putExtra("needCrop",needCrop);
        // 是否显示拍摄图片
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SHOW_CAMERA, showCamera);
        // 最大可选择图片数量
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_COUNT, 1);
        // 选择模式
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_MODE, selectedMode);
        // 默认选择
        if (mSelectPath != null && mSelectPath.size() > 0) {
            intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_DEFAULT_SELECTED_LIST, mSelectPath);
        }
        activity.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }
    @ReactMethod
    public  void selectImageFormSDShowCameraAndNeedsCrop(boolean showCamera,int selectedMode,ReadableArray source,boolean needCrop,final Promise promise){
        this.mPickerPromise=promise;
        Activity activity = getCurrentActivity();
//        boolean showCamera = true;//是否显示拍照图片
        ArrayList<String> mSelectPath=new ArrayList<>();
        for (int i = 0; i < source.size(); i++) {
            mSelectPath.add(source.getString(i));
        }
        Intent intent = new Intent(activity, ImsMultiImageSelectorActivity.class);
        //能否裁剪
        intent.putExtra("needCrop",needCrop);
        // 是否显示拍摄图片
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SHOW_CAMERA, showCamera);
        // 最大可选择图片数量
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_COUNT, 1);
        // 选择模式
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_MODE, selectedMode);
        // 默认选择
        if (mSelectPath != null && mSelectPath.size() > 0) {
            intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_DEFAULT_SELECTED_LIST, mSelectPath);
        }
        activity.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }
    @ReactMethod
    public  void selectImageFormSD(int selectedMode, int maxNum,final Promise promise){
        Activity activity = getCurrentActivity();
        this.mPickerPromise=promise;
        boolean showCamera = true;//是否显示拍照图片
        ArrayList<String> mSelectPath=new ArrayList<>();
        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        Intent intent = new Intent(activity, ImsMultiImageSelectorActivity.class);
        // 是否显示拍摄图片
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SHOW_CAMERA, showCamera);
        // 最大可选择图片数量
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_COUNT, maxNum);
        // 选择模式
        intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_SELECT_MODE, selectedMode);
        // 默认选择
        if (mSelectPath != null && mSelectPath.size() > 0) {
            intent.putExtra(ImsMultiImageSelectorActivity.EXTRA_DEFAULT_SELECTED_LIST, mSelectPath);
        }

        activity.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(SELECTEDMODE_SINGLE, 0);
        constants.put(SELECTEDMODE_MULTI, 1);
        return constants;
    }
    @Override
    public String getName() {
        return "ImagePicker";
    }
}
