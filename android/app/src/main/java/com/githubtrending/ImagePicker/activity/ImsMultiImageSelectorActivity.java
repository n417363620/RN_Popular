package com.githubtrending.ImagePicker.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.githubtrending.ImageCrop.activity.CropImageActivity;
import com.githubtrending.R;

import java.io.File;
import java.util.ArrayList;


/**
 * 多图选择
 * Created by Nereo on 2015/4/7.
 */
public class ImsMultiImageSelectorActivity extends FragmentActivity implements ImsMultiImageSelectorFragment.Callback{

    /** 最大图片选择次数，int类型，默认9 */
    public static final String EXTRA_SELECT_COUNT = "max_select_count";
    /** 图片选择模式，默认多选 */
    public static final String EXTRA_SELECT_MODE = "select_count_mode";
    /** 是否显示相机，默认显示 */
    public static final String EXTRA_SHOW_CAMERA = "show_camera";
    /** 选择结果，返回为 ArrayList&lt;String&gt; 图片路径集合  */
    public static final String EXTRA_RESULT = "select_result";
    /** 默认选择集 */
    public static final String EXTRA_DEFAULT_SELECTED_LIST = "default_list";

    /** 单选 */
    public static final int MODE_SINGLE = 0;
    /** 多选 */
    public static final int MODE_MULTI = 1;

    private ArrayList<String> resultList = new ArrayList<String>();
    private int mDefaultCount;
    boolean needCrop = false;
    private ImsMultiImageSelectorFragment imsMultiImageSelectorFragment;

    private TextView tvImgCount;
    private TextView tvTitle;
    private ImageView ivSelectCancel;
    private TextView tvSelectCompelete;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ims_activity_default);
        tvImgCount= (TextView) findViewById(R.id.tv_describle);
        tvTitle= (TextView) findViewById(R.id.tv_title);
        ivSelectCancel= (ImageView) findViewById(R.id.iv_cancel);
        tvSelectCompelete= (TextView) findViewById(R.id.tv_confirm);
        ivSelectCancel.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               setResult(RESULT_CANCELED);
               finish();
            }
       });



        Intent intent = getIntent();
        needCrop=intent.getBooleanExtra("needCrop",false);
        mDefaultCount = intent.getIntExtra(EXTRA_SELECT_COUNT, 15);
        int mode = intent.getIntExtra(EXTRA_SELECT_MODE, MODE_MULTI);
        boolean isShow = intent.getBooleanExtra(EXTRA_SHOW_CAMERA, true);
        if(mode == MODE_MULTI && intent.hasExtra(EXTRA_DEFAULT_SELECTED_LIST)) {
            resultList = intent.getStringArrayListExtra(EXTRA_DEFAULT_SELECTED_LIST);
        }

        Bundle bundle = new Bundle();
        bundle.putInt(ImsMultiImageSelectorFragment.EXTRA_SELECT_COUNT, mDefaultCount);
        bundle.putInt(ImsMultiImageSelectorFragment.EXTRA_SELECT_MODE, mode);
        bundle.putBoolean(ImsMultiImageSelectorFragment.EXTRA_SHOW_CAMERA, isShow);
        bundle.putStringArrayList(ImsMultiImageSelectorFragment.EXTRA_DEFAULT_SELECTED_LIST, resultList);
        imsMultiImageSelectorFragment = new ImsMultiImageSelectorFragment();
        imsMultiImageSelectorFragment.setArguments(bundle);
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.image_grid, imsMultiImageSelectorFragment)
                .commit();

        // 完成按钮

        if(resultList == null || resultList.size()<=0){
           tvImgCount.setText("(" + 0 + "/" + mDefaultCount+")");
            tvSelectCompelete.setEnabled(false);
        }else{
            tvImgCount.setText("(" + resultList.size() + "/" + mDefaultCount+")");
            tvSelectCompelete.setEnabled(true);

        }
        tvSelectCompelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(resultList != null && resultList.size() >0){
                    // 返回已选择的图片数据
                    Intent data = new Intent();
                    data.putStringArrayListExtra(EXTRA_RESULT, resultList);
                    setResult(RESULT_OK, data);
                    finish();
                }
            }
        });
    }
    public static final int RESULT_CROP = 1;
    @Override
    public void onSingleImageSelected(String path) {
        if (needCrop) {
            Intent intent = new Intent(this, CropImageActivity.class);
            intent.putExtra("path",path);
            startActivityForResult(intent,RESULT_CROP);
            return;
        }
        Intent data = new Intent();
        resultList.add(path);
        data.putStringArrayListExtra(EXTRA_RESULT, resultList);
        setResult(RESULT_OK, data);
        finish();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (RESULT_OK == resultCode && requestCode == RESULT_CROP) {
            if (data == null) {
                return;
            }
            setResult(RESULT_OK, data);
            finish();
        }
    }

    @Override
    public void onImageSelected(String path) {
        if(!resultList.contains(path)) {
            resultList.add(path);
        }
        // 有图片之后，改变按钮状态
        if(resultList.size() > 0){
            tvImgCount.setText("(" + resultList.size() + "/" + mDefaultCount+")");
            imsMultiImageSelectorFragment.reCallBackPicCount("(" + resultList.size() + "/" + mDefaultCount+")");
            if(!tvSelectCompelete.isEnabled()){
                tvSelectCompelete.setEnabled(true);
            }
        }
    }

    @Override
    public void onImageUnselected(String path) {
        if(resultList.contains(path)){
            resultList.remove(path);
           tvImgCount.setText("(" + resultList.size() + "/" + mDefaultCount+")");
            imsMultiImageSelectorFragment.reCallBackPicCount("(" + resultList.size() + "/" + mDefaultCount+")");
        }else{
            imsMultiImageSelectorFragment.reCallBackPicCount("(" + resultList.size() + "/" + mDefaultCount+")");
           tvImgCount.setText( "(" + resultList.size() + "/" + mDefaultCount+")");
        }
        // 当为选择图片时候的状态
        if(resultList.size() == 0){
           tvImgCount.setText("(" + resultList.size() + "/" + mDefaultCount+")");
            imsMultiImageSelectorFragment.reCallBackPicCount("(" + resultList.size() + "/" + mDefaultCount+")");
            tvSelectCompelete.setEnabled(false);
        }
    }

    @Override
    public void onCameraShot(File imageFile) {
        if(imageFile != null) {
            Intent data = new Intent();
            resultList.add(imageFile.getAbsolutePath());
            data.putStringArrayListExtra(EXTRA_RESULT, resultList);
            setResult(RESULT_OK, data);
            finish();
        }
    }

    @Override
    public void onConfirm() {
        if(resultList != null && resultList.size() >0){
            // 返回已选择的图片数据
            Intent data = new Intent();
            data.putStringArrayListExtra(EXTRA_RESULT, resultList);
            setResult(RESULT_OK, data);
            finish();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
      //  unbindService(connection);
    }

}
