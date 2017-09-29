package com.githubtrending.ImageCrop.view;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.view.View;

public class ImageMoveView
{
	/**
	 * 是否移动到背景图片的边缘
	 */
	public boolean mIsEdge;
	
	private boolean mIsHide;
	
	private Bitmap mBitmap;
	private Paint mPaint;
	private float mLeft;
	private float mTop;
	
	private Rect mRect;
	private View mView;
	
	private boolean mCanMove;
	
	private float mDeltaLeft;
	private float mDeltaTop;
	
	public ImageMoveView(View v)
	{
		mView = v;
	}
	
	public void setHide(boolean isHide)
	{
		mIsHide = isHide;
	}
	
	public void setBitmap(Bitmap bitmap)
	{
		mBitmap = bitmap;
	}
	
	public void draw(Canvas canvas)
	{
		if (mIsHide || null == mBitmap)
		{
			return;
		}
		
		canvas.drawBitmap(mBitmap, mLeft, mTop, mPaint);
	}
	
	void moveBy(float dx, float dy)
	{
		mView.invalidate();
	}
	
	public void setup(int left, int top, Bitmap bitmap)
	{
		mLeft = left;
		mTop = top;
		mBitmap = bitmap;
		mPaint = new Paint();
		mRect = new Rect(left, top, left + bitmap.getWidth(), top + bitmap.getHeight());
	}
	
	public void getHit(float dx, float dy)
	{
		final int left = mRect.left;
		final int top = mRect.top;
		final int right = mRect.right;
		final int bottom = mRect.bottom;
		if (!((dx > right || dx < left) || (dy < top || dy > bottom))) // 点在涂鸦图片上
		{
			// 向哪个方向移动
			mCanMove = true;
			
			mDeltaLeft = dx - left;
			mDeltaTop = dy - top;
		}
		else
		{
			mCanMove = false;
		}
		
	}
	
	public void handleMotion(float dx, float dy)
	{
		// 检查滑动边界
		checkBound(dx, dy);
		if (mCanMove)
		{
			mLeft = dx - mDeltaLeft;
			mTop = dy - mDeltaTop;
			
			moveBy(mLeft, mTop);
			
			mRect.left = (int) (dx - mDeltaLeft);
			mRect.top = (int) (dy - mDeltaTop);
			mRect.right = (int) (dx + mBitmap.getWidth() - mDeltaLeft);
			mRect.bottom = (int) (dy + mBitmap.getHeight() - mDeltaTop);
		}
		
	}
	
	private void checkBound(float dx, float dy)
	{
		int[] location = new int[2];
		mView.getLocationInWindow(location);
		final int left = location[0];
		final int top = location[1];
		final int right = left + mView.getWidth();
		final int bottom = top + mView.getHeight();
		if (dx - mDeltaLeft < 0 || dy - mDeltaTop < 0 || (left + dx + mBitmap.getWidth() - mDeltaLeft) > right || dy + top + mBitmap.getHeight() - mDeltaTop > bottom) // 移动点超出组件范围
		{
			mCanMove = false;
		}
		
	}
	
	public float getLeft()
	{
		return mLeft;
	}
	
	public float getTop()
	{
		return mTop;
	}
	
}
