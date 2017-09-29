package com.githubtrending.ImageCrop.util;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;

import java.io.ByteArrayOutputStream;

/**
 * Bitmap Drawable byte[] 数组之间转换
 * @author maylian7700@126.com
 *
 */
public class ImageSwitch
{

	/**
	 * byte数组转换成Bitmap
	 * @param bmp
	 * @return
	 */
	public static byte[] bitmap2Byte(Bitmap bmp)
	{
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		bmp.compress(Bitmap.CompressFormat.PNG, 100, baos);
		return baos.toByteArray();
	}
	
	/**
	 * 数组转换成Bitmap
	 * @param buffer
	 * @return
	 */
	public static Bitmap byte2Bitmap(byte[] buffer)
	{
		return BitmapFactory.decodeByteArray(buffer, 0, buffer.length);
	}
	
	/**
	 * Bitmap转换成Drawable
	 * @param bmp
	 * @return
	 */
	public static Drawable bitmap2Drawable(Bitmap bmp)
	{
		return new BitmapDrawable(bmp);
	}
	
	/**
	 * BitmapDrawable转换成Bitmap
	 * @param drawable
	 * @return
	 */
	public static Bitmap drawable2Bitmap(BitmapDrawable drawable)
	{
		return drawable.getBitmap();
	}
	
}
