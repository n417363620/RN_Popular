package com.githubtrending.ImagePicker.activity;

import android.app.Activity;
import android.content.Intent;

import java.util.ArrayList;

/**
 * Created by UI2 on 2015/11/10.
 */
public class ImageSelect {
    /** 返回 */
    public static final int REQUEST_SELECT_IMAGE =111;
    /** 单选 */
    public static final int MODE_SINGLE = 0;
    /** 多选 */
    public static final int MODE_MULTI = 1;

    /**
     * 跳转至图片选择界面
     * @param context
     * @param selectedMode   0 是单选，1 是多选
     * @param mSelectPath    图片地址的集合（为String类型）
     * @param maxNum         最大图片添加数量
     */
    public static void selectImageFormSD(Activity context,int selectedMode,ArrayList<String> mSelectPath,int maxNum){

        boolean showCamera = true;//是否显示拍照图片


        Intent intent = new Intent(context, ImsMultiImageSelectorActivity.class);
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
        context.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }


    public static void selectImageFormSD(Activity context,int selectedMode,ArrayList<String> mSelectPath,boolean needCrop){

        boolean showCamera = true;//是否显示拍照图片


        Intent intent = new Intent(context, ImsMultiImageSelectorActivity.class);
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
        context.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }
    public static void selectImageFormSD(Activity context,boolean showCamera,int selectedMode,ArrayList<String> mSelectPath,boolean needCrop){

//        boolean showCamera = true;//是否显示拍照图片


        Intent intent = new Intent(context, ImsMultiImageSelectorActivity.class);
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
        context.startActivityForResult(intent, REQUEST_SELECT_IMAGE);
    }

    /**
     * 选择图片后返回图片的地址
     * @param data        返回的数据
     * @return
     */
    public static ArrayList<String> ImageFrom(Intent data){
        return data.getStringArrayListExtra(ImsMultiImageSelectorActivity.EXTRA_RESULT);
    }
    public static String ImageFromCrop(Intent data){
        return data.getStringExtra("path");
    }
}
