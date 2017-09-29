package com.githubtrending.ImageCrop.util;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Environment;

import com.githubtrending.Constant;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by NewYyoung on 2017/9/29.
 */

public class AbFileUtil {
    /** 默认APP根目录. */
    private static  String downloadRootDir = null;

    /** 默认下载图片文件目录. */
    private static  String imageDownloadDir = null;

    /** 默认下载文件目录. */
    private static  String fileDownloadDir = null;

    /** 默认缓存目录. */
    private static  String cacheDownloadDir = null;

    /** 默认下载数据库文件的目录. */
    private static  String dbDownloadDir = null;

    /** 剩余空间大于200M才使用SD缓存. */
    private static int freeSdSpaceNeededToCache = 200*1024*1024;
    /**
     * 获取包信息.
     *
     * @param context the context
     */
    public static PackageInfo getPackageInfo(Context context) {
        PackageInfo info = null;
        try {
            String packageName = context.getPackageName();
            info = context.getPackageManager().getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return info;
    }
    /**
     * 描述：SD卡是否能用.
     *
     * @return true 可用,false不可用
     */
    public static boolean isCanUseSD() {
        try {
            return Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    public static void initFileDir(Context context){

        PackageInfo info = getPackageInfo(context);

        //默认下载文件根目录.
        String downloadRootPath = File.separator + Constant.DOWNLOAD_ROOT_DIR + File.separator + info.packageName + File.separator;

        //默认下载图片文件目录.
        String imageDownloadPath = downloadRootPath + Constant.DOWNLOAD_IMAGE_DIR + File.separator;

        //默认下载文件目录.
        String fileDownloadPath = downloadRootPath + Constant.DOWNLOAD_FILE_DIR + File.separator;

        //默认缓存目录.
        String cacheDownloadPath = downloadRootPath + Constant.CACHE_DIR + File.separator;

        //默认DB目录.
        String dbDownloadPath = downloadRootPath + Constant.DB_DIR + File.separator;

        try {
            if(!isCanUseSD()){
                return;
            }else{

                File root = Environment.getExternalStorageDirectory();
                File downloadDir = new File(root.getAbsolutePath() + downloadRootPath);
                if(!downloadDir.exists()){
                    downloadDir.mkdirs();
                }
                downloadRootDir = downloadDir.getPath();

                File cacheDownloadDirFile = new File(root.getAbsolutePath() + cacheDownloadPath);
                if(!cacheDownloadDirFile.exists()){
                    cacheDownloadDirFile.mkdirs();
                }
                cacheDownloadDir = cacheDownloadDirFile.getPath();

                File imageDownloadDirFile = new File(root.getAbsolutePath() + imageDownloadPath);
                if(!imageDownloadDirFile.exists()){
                    imageDownloadDirFile.mkdirs();
                }
                imageDownloadDir = imageDownloadDirFile.getPath();

                File fileDownloadDirFile = new File(root.getAbsolutePath() + fileDownloadPath);
                if(!fileDownloadDirFile.exists()){
                    fileDownloadDirFile.mkdirs();
                }
                fileDownloadDir = fileDownloadDirFile.getPath();

                File dbDownloadDirFile = new File(root.getAbsolutePath() + dbDownloadPath);
                if(!dbDownloadDirFile.exists()){
                    dbDownloadDirFile.mkdirs();
                }
                dbDownloadDir = dbDownloadDirFile.getPath();

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Gets the image download dir.
     *
     * @param context the context
     * @return the image download dir
     */
    public static String getImageDownloadDir(Context context) {
        if(downloadRootDir == null){
            initFileDir(context);
        }
        return imageDownloadDir;
    }

    /**
     * 将bitmap写入文件.
     * @param path
     * @param bitmap   png
     */
    public static void writeBitmapToSD(String path, Bitmap bitmap, boolean create){

        FileOutputStream fos = null;
        try {
            File file = new File(path);
            //SD卡是否存在
            if(!isCanUseSD()){
                return;
            }
            //文件是否存在
            if(!file.exists()){
                if(create){
                    File parent = file.getParentFile();
                    if(!parent.exists()){
                        parent.mkdirs();
                        file.createNewFile();
                    }
                }
            }
            fos = new FileOutputStream(path);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(fos!=null){
                try {
                    fos.close();
                } catch (Exception e) {
                }
            }
        }
    }
}
