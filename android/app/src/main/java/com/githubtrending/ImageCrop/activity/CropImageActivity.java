package com.githubtrending.ImageCrop.activity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.githubtrending.Constant;
import com.githubtrending.ImageCrop.util.EditImage;
import com.githubtrending.ImageCrop.util.ReverseAnimation;
import com.githubtrending.ImageCrop.view.CropImageView;
import com.githubtrending.ImagePicker.utils.ImsImageUtil;
import com.githubtrending.R;

import java.io.File;

public class CropImageActivity extends Activity
{
	private final int STATE_CROP = 0x1;

	/**
	 * ��ת����
	 */
	private ReverseAnimation mReverseAnim;
	private Bitmap mBitmap;

	private Bitmap mTmpBmp;

	private CropImageView mImageView;
	private EditImage mEditImage;

	private int mState;
	public int screenWidth = 0;
	public int screenHeight = 0;

	private TextView tvImgCount;
	private TextView tvTitle;
	private ImageView ivSelectCancel;
	private TextView tvSelectCompelete;

	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.act_crop_image);
		init();
	}

	private void init(){

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
		getWindowWH();
		tvSelectCompelete.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				String path = saveBitmap();
				Intent intent = new Intent();
				intent.putExtra("path", path);

				setResult(RESULT_OK, intent);
				finish();
			}
		});

		Intent intent = getIntent();
		String path = intent.getStringExtra("path");
		if (null == path)
		{
			finish();
		}

//		mBitmap = BitmapFactory.decodeFile(path);

		File mFile = new File(path);
//		mBitmap = AbFileUtil.getBitmapFromSD(mFile, AbImageUtil.SCALEIMG, screenWidth, screenHeight);//压缩图片至手机频幕大小
		mBitmap = ImsImageUtil.getCompressBitmapByStandardSize(mFile, Constant.IMAGE_WIDTH_STANDARD);//图片压缩至标准大小1280

//		mBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.mm);
		mTmpBmp = mBitmap.copy(Bitmap.Config.ARGB_8888, true);
		mImageView = (CropImageView) findViewById(R.id.imgCrop);
		mImageView.setImageBitmap(mBitmap);
		mImageView.setImageBitmapResetBase(mBitmap, true);

		mEditImage = new EditImage(this, mImageView, mBitmap);
		mImageView.setEditImage(mEditImage);

		crop();
	}

	/**
	 * 获取屏幕的高和宽
	 */
	private void getWindowWH(){
		DisplayMetrics dm=new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(dm);
		screenWidth = dm.widthPixels;
		screenHeight = dm.heightPixels;
	}

	private void prepare(int state, int imageViewState, boolean hideHighlight)
	{
		resetToOriginal();
		mEditImage.mSaving = false;
		if (null != mReverseAnim)
		{
			mReverseAnim.cancel();
			mReverseAnim = null;
		}

		if (hideHighlight)
		{
			mImageView.hideHighlightView();
		}
		mState = state;
		mImageView.setState(imageViewState);
		mImageView.invalidate();
	}

	/**
	 * �ü�
	 */
	private void crop() {
		// ����ü�״̬
		prepare(STATE_CROP, CropImageView.STATE_HIGHLIGHT, false);
		mEditImage.crop(mTmpBmp);
		reset();
	}


	/**
	 * ��������һ��ͼƬ
	 */
	private void reset()
	{
		mImageView.setImageBitmap(mTmpBmp);
		mImageView.invalidate();
	}

	private void resetToOriginal()
	{
		mTmpBmp = mBitmap;
		mImageView.setImageBitmap(mBitmap);
		// �Ѿ�����ͼƬ
		mEditImage.mSaving = true;
		// ��ղü�����
		mImageView.mHighlightViews.clear();
	}


	/**
	 * ����ͼƬ������
	 */
	private String saveBitmap()
	{
		mTmpBmp = mEditImage.cropAndSave(mTmpBmp);
		return mEditImage.saveToLocal(mTmpBmp);
	}
}
