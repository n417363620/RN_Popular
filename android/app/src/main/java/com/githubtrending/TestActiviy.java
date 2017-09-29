package com.githubtrending;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.githubtrending.ImagePicker.activity.ImageSelect;

import java.util.ArrayList;

public class TestActiviy extends AppCompatActivity {

    private android.widget.TextView tvtestSelect;
    private ArrayList<String> mSelectPath=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_activiy);
        this.tvtestSelect = (TextView) findViewById(R.id.tv_testSelect);
        tvtestSelect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ImageSelect.selectImageFormSD(TestActiviy.this, ImageSelect.MODE_MULTI, mSelectPath,20);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == ImageSelect.REQUEST_SELECT_IMAGE) {
            mSelectPath = ImageSelect.ImageFrom(data);
            Log.e("Test===",mSelectPath.get(0));
        }
    }
}
