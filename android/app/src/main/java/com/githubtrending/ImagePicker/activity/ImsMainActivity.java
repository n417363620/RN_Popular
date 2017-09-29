package com.githubtrending.ImagePicker.activity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.RadioGroup;
import android.widget.TextView;
import com.githubtrending.ImagePicker.adapter.ImsShowAdapter;
import com.githubtrending.ImagePicker.utils.ImsImageUtil;
import com.githubtrending.R;
import java.util.ArrayList;
import java.util.List;



public class ImsMainActivity extends Activity {

    private static final int REQUEST_IMAGE = 2;
    public static int maxNum = 15;

    private TextView mResultText;
    private RadioGroup mChoiceMode, mShowCamera;
    private EditText mRequestNum;
    private GridView gridView;
    ImsShowAdapter imsShowAdapter;
    List<Bitmap> list;

    private ArrayList<String> mSelectPath;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ims_activity_main);

        mResultText = (TextView) findViewById(R.id.result);
        mChoiceMode = (RadioGroup) findViewById(R.id.choice_mode);
        mShowCamera = (RadioGroup) findViewById(R.id.show_camera);
        mRequestNum = (EditText) findViewById(R.id.request_num);
        gridView = (GridView) findViewById(R.id.grid);

        mChoiceMode.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int checkedId) {
                if (checkedId == R.id.multi) {
                    mRequestNum.setEnabled(true);
                } else {
                    mRequestNum.setEnabled(false);
                    mRequestNum.setText("");
                }
            }
        });

        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                int selectedMode = ImsMultiImageSelectorActivity.MODE_MULTI;

                if (mChoiceMode.getCheckedRadioButtonId() == R.id.single) {
                    selectedMode = ImsMultiImageSelectorActivity.MODE_SINGLE;
                } else {
                    selectedMode = ImsMultiImageSelectorActivity.MODE_MULTI;
                }

                boolean showCamera = mShowCamera.getCheckedRadioButtonId() == R.id.show;

                if (!TextUtils.isEmpty(mRequestNum.getText())) {
                    maxNum = Integer.valueOf(mRequestNum.getText().toString());
                }

                Intent intent = new Intent(ImsMainActivity.this, ImsMultiImageSelectorActivity.class);
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
                startActivityForResult(intent, REQUEST_IMAGE);

            }
        });

/*        findViewById(R.id.button2).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Ims MainActivity.this, GestureImageActivity.class);
                startActivity(intent);
            }
        });*/
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE) {
            if (resultCode == RESULT_OK) {
                list = new ArrayList<Bitmap>();
                mSelectPath = data.getStringArrayListExtra(ImsMultiImageSelectorActivity.EXTRA_RESULT);
                StringBuilder sb = new StringBuilder();
                Bitmap resizeBmp = null;
                for (String p : mSelectPath) {
//                    resizeBmp=BitmapFactory.decodeFile(p, opts);
                    resizeBmp = ImsImageUtil.getScaleBitmap(BitmapFactory.decodeFile(p), 150, 150);

                    list.add(resizeBmp);
                    sb.append(p);
                    sb.append("\n");
                }
                imsShowAdapter = new ImsShowAdapter(this, list);
                gridView.setAdapter(imsShowAdapter);
                mResultText.setText(sb.toString());
            }
        }
    }

}
