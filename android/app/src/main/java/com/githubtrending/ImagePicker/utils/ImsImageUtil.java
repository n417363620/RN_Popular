package com.githubtrending.ImagePicker.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by NewYyoung on 2017/9/29.
 */

public class ImsImageUtil {
    /** 图片处理：裁剪. */
    public static final int CUTIMG = 0;

    /** 图片处理：缩放. */
    public static final int SCALEIMG = 1;

    /** 图片处理：不处理. */
    public static final int ORIGINALIMG = 2;

    /** 图片最大宽度. */
    public static final int MAX_WIDTH = 4096/2;

    /** 图片最大高度. */
    public static final int MAX_HEIGHT = 4096/2;
    /**
     * 描述：缩放图片.
     *
     * @param bitmap
     *            the bitmap
     * @param desiredWidth
     *            新图片的宽
     * @param desiredHeight
     *            新图片的高
     * @return Bitmap 新图片
     */
    public static Bitmap getScaleBitmap(Bitmap bitmap, int desiredWidth, int desiredHeight) {

        if (!checkBitmap(bitmap)) {
            return null;
        }
        Bitmap resizeBmp = null;

        // 获得图片的宽高
        int srcWidth = bitmap.getWidth();
        int srcHeight = bitmap.getHeight();

        int[] size = resizeToMaxSize(srcWidth, srcHeight, desiredWidth, desiredHeight);
        desiredWidth = size[0];
        desiredHeight = size[1];

        float scale = getScaleMax(srcWidth, srcHeight, desiredWidth, desiredHeight);
        resizeBmp = scaleBitmap(bitmap, scale);
        //超出的裁掉
        if (resizeBmp.getWidth() > desiredWidth || resizeBmp.getHeight() > desiredHeight) {
            resizeBmp  = getCutBitmap(resizeBmp,desiredWidth,desiredHeight);
        }
        return resizeBmp;
    }
    /**
     * 描述：缩放图片.
     *
     * @param file
     *            File对象
     * @param desiredWidth
     *            新图片的宽
     * @param desiredHeight
     *            新图片的高
     * @return Bitmap 新图片
     */
    public static Bitmap getScaleBitmap(File file, int desiredWidth, int desiredHeight) {

        Bitmap resizeBmp = null;
        BitmapFactory.Options opts = new BitmapFactory.Options();
        // 设置为true,decodeFile先不创建内存 只获取一些解码边界信息即图片大小信息
        opts.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(file.getPath(), opts);

        // 获取图片的原始宽度高度
        int srcWidth = opts.outWidth;
        int srcHeight = opts.outHeight;
        int[] size = resizeToMaxSize(srcWidth, srcHeight, desiredWidth, desiredHeight);
        desiredWidth = size[0];
        desiredHeight = size[1];

        // 缩放的比例
        float scale = getScaleMax(srcWidth, srcHeight, desiredWidth, desiredHeight);
        int destWidth = srcWidth;
        int destHeight = srcHeight;
        if (scale != 0) {
            destWidth = (int) (srcWidth * scale);
            destHeight = (int) (srcHeight * scale);
        }

        // 默认为ARGB_8888.
        opts.inPreferredConfig = Bitmap.Config.RGB_565;
        // 以下两个字段需一起使用：
        // 产生的位图将得到像素空间，如果系统gc，那么将被清空。当像素再次被访问，如果Bitmap已经decode，那么将被自动重新解码
        opts.inPurgeable = true;
        // 位图可以共享一个参考输入数据(inputstream、阵列等)
        opts.inInputShareable = true;
        // 缩放的比例，缩放是很难按准备的比例进行缩放的，通过inSampleSize来进行缩放，其值表明缩放的倍数，SDK中建议其值是2的指数值
        int sampleSize = findBestSampleSize(srcWidth,srcHeight,destWidth,destHeight);
        opts.inSampleSize = sampleSize;

        // 设置大小
        opts.outWidth = destWidth;
        opts.outHeight = destHeight;

        // 创建内存
        opts.inJustDecodeBounds = false;
        // 使图片不抖动
        opts.inDither = false;

        resizeBmp = BitmapFactory.decodeFile(file.getPath(), opts);
        // 缩小或者放大
        resizeBmp = scaleBitmap(resizeBmp, scale);
        //超出的裁掉
        if (resizeBmp.getWidth() > desiredWidth || resizeBmp.getHeight() > desiredHeight) {
            resizeBmp  = getCutBitmap(resizeBmp,desiredWidth,desiredHeight);
        }
        return resizeBmp;
    }

    private static boolean checkBitmap(Bitmap bitmap) {
        if (bitmap == null) {
            return false;
        }

        if (bitmap.getWidth() <= 0 || bitmap.getHeight() <= 0) {
            return false;
        }
        return true;
    }

    private static boolean checkSize(int desiredWidth, int desiredHeight) {
        if (desiredWidth <= 0 || desiredHeight <= 0) {
            return false;
        }
        return true;
    }

    /**
     *
     * 获取缩小的比例.
     * @param srcWidth
     * @param srcHeight
     * @param desiredWidth
     * @param desiredHeight
     * @return
     */
    private static float getScaleMax(int srcWidth, int srcHeight, int desiredWidth,
                                     int desiredHeight) {
        // 缩放的比例
        float scale = 0;
        // 计算缩放比例，宽高的最小比例
        float scaleWidth = (float) desiredWidth / srcWidth;
        float scaleHeight = (float) desiredHeight / srcHeight;
        if (scaleWidth > scaleHeight) {
            scale = scaleWidth;
        } else {
            scale = scaleHeight;
        }

        return scale;
    }


    /**
     * 找到最合适的SampleSize
     * @param actualWidth
     * @param actualHeight
     * @param desiredWidth
     * @param desiredHeight
     * @return
     */
    private static int findBestSampleSize(int actualWidth, int actualHeight, int desiredWidth, int desiredHeight) {
        double wr = (double) actualWidth / desiredWidth;
        double hr = (double) actualHeight / desiredHeight;
        double ratio = Math.min(wr, hr);
        float n = 1.0f;
        while ((n * 2) <= ratio) {
            n *= 2;
        }
        return (int) n;
    }

    /**
     * 描述：根据等比例缩放图片.
     *
     * @param bitmap
     *            the bitmap
     * @param scale
     *            比例
     * @return Bitmap 新图片
     */
    public static Bitmap scaleBitmap(Bitmap bitmap, float scale) {

        if (!checkBitmap(bitmap)) {
            return null;
        }

        if (scale == 1) {
            return bitmap;
        }

        Bitmap resizeBmp = null;
        try {
            // 获取Bitmap资源的宽和高
            int bmpW = bitmap.getWidth();
            int bmpH = bitmap.getHeight();

            // 注意这个Matirx是android.graphics底下的那个
            Matrix matrix = new Matrix();
            // 设置缩放系数，分别为原来的0.8和0.8
            matrix.postScale(scale, scale);
            resizeBmp = Bitmap.createBitmap(bitmap, 0, 0, bmpW, bmpH, matrix, true);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (resizeBmp != bitmap) {
                bitmap.recycle();
            }
        }
        return resizeBmp;
    }

    /**
     * 描述：裁剪图片.
     *
     * @param bitmap
     *            the bitmap
     * @param desiredWidth
     *            新图片的宽
     * @param desiredHeight
     *            新图片的高
     * @return Bitmap 新图片
     */
    public static Bitmap getCutBitmap(Bitmap bitmap, int desiredWidth, int desiredHeight) {

        if (!checkBitmap(bitmap)) {
            return null;
        }

        if (!checkSize(desiredWidth, desiredHeight)) {
            return null;
        }

        Bitmap resizeBmp = null;

        try {
            int width = bitmap.getWidth();
            int height = bitmap.getHeight();

            int offsetX = 0;
            int offsetY = 0;

            if (width > desiredWidth) {
                offsetX = (width - desiredWidth) / 2;
            } else {
                desiredWidth = width;
            }

            if (height > desiredHeight) {
                offsetY = (height - desiredHeight) / 2;
            } else {
                desiredHeight = height;
            }

            resizeBmp = Bitmap.createBitmap(bitmap, offsetX, offsetY, desiredWidth,desiredHeight);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (resizeBmp != bitmap) {
                bitmap.recycle();
            }
        }
        return resizeBmp;
    }


    private static int[] resizeToMaxSize(int srcWidth, int srcHeight,
                                         int desiredWidth, int desiredHeight) {
        int[] size = new int[2];
        if(desiredWidth <= 0){
            desiredWidth = srcWidth;
        }
        if(desiredHeight <= 0){
            desiredHeight = srcHeight;
        }
        if (desiredWidth > MAX_WIDTH) {
            // 重新计算大小
            desiredWidth = MAX_WIDTH;
            float scaleWidth = (float) desiredWidth / srcWidth;
            desiredHeight = (int) (desiredHeight * scaleWidth);
        }

        if (desiredHeight > MAX_HEIGHT) {
            // 重新计算大小
            desiredHeight = MAX_HEIGHT;
            float scaleHeight = (float) desiredHeight / srcHeight;
            desiredWidth = (int) (desiredWidth * scaleHeight);
        }
        size[0] = desiredWidth;
        size[1] = desiredHeight;
        return size;
    }
    public static Bitmap getCompressBitmapByStandardSize(File file, int standardSize) {

        Bitmap resizeBmp = null;
        BitmapFactory.Options opts = new BitmapFactory.Options();
        // 设置为true,decodeFile先不创建内存 只获取一些解码边界信息即图片大小信息
        opts.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(file.getPath(), opts);

        // 获取图片的原始宽度高度
        int srcWidth = opts.outWidth;
        int srcHeight = opts.outHeight;

        float scale = 1;

        //如果宽度或高度超过标准尺寸，则进行缩放
        if(srcWidth > standardSize
                ||srcHeight > standardSize){
            // 缩放的比例
            scale = getScaleMin(srcWidth, srcHeight, standardSize, standardSize);
        }

        resizeBmp = getBitmap(file);
        if(scale == 1){
            //无需缩放，则返回原图
            return resizeBmp;
        }

        // 缩小图片
        resizeBmp = scaleBitmap(resizeBmp, scale);

        return resizeBmp;
    }
    /**
     *
     * 获取缩小的比例.
     * @param srcWidth
     * @param srcHeight
     * @param desiredWidth
     * @param desiredHeight
     * @return
     */
    private static float getScaleMin(int srcWidth, int srcHeight, int desiredWidth,
                                     int desiredHeight) {
        // 缩放的比例
        float scale = 0;
        // 计算缩放比例，宽高的最小比例
        float scaleWidth = (float) desiredWidth / srcWidth;
        float scaleHeight = (float) desiredHeight / srcHeight;
        if (scaleWidth < scaleHeight) {
            scale = scaleWidth;
        } else {
            scale = scaleHeight;
        }

        return scale;
    }
    /**
     * 从互联网上获取原始大小图片.
     *
     * @param url
     *            要下载文件的网络地址
     * @return Bitmap 新图片
     */
    public static Bitmap getBitmap(String url) {
        Bitmap bitmap = null;
        URLConnection con = null;
        InputStream is = null;
        try {
            URL imageURL = new URL(url);
            con = imageURL.openConnection();
            con.setDoInput(true);
            con.connect();
            is = con.getInputStream();
            // 获取资源图片
            bitmap = BitmapFactory.decodeStream(is, null, null);
        } catch (Exception e) {
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return bitmap;
    }
    /**
     * 描述：获取原图.
     *
     * @param file
     *            File对象
     * @return Bitmap 图片
     */
    public static Bitmap getBitmap(File file) {
        Bitmap resizeBmp = null;
        try {
            resizeBmp = BitmapFactory.decodeFile(file.getPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resizeBmp;
    }

}
