package com.githubtrending.ImagePicker.utils;

import android.net.Uri;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.githubtrending.R;

import java.io.File;

/**
 * Created by LAN on 2015/7/16.
 */
public class ImageUitl {

    public static void displayImageByFileBig(ImageView view, File file) {

        Glide.with(view.getContext()).load(file).into(view);
    }
    public static void displayShopImageBig(ImageView view, String url) {
        displayImageByUrl(view, url);
    }

    public static void displayCommodityImageBig(ImageView view, String url) {
        displayImageByUrl(view, url);
    }
    public static void displayOrderImageBig(ImageView view, String url) {
        displayImageByUrl(view, url);
    }
    public static void displayImageByUrl(ImageView view, String url) {

        Glide.with(view.getContext())
                .load(Uri.parse(url))
                .asBitmap()
                .skipMemoryCache(true)
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .placeholder(R.drawable.icon_default_dts)
                .into(view);
    }
    public static void displayImageByUrl(ImageView view, String url, int width, int height) {

        Glide.with(view.getContext())
                .load(Uri.parse(url))
                .placeholder(R.drawable.icon_default_dts)
                .override(width, height)
                .diskCacheStrategy(DiskCacheStrategy.RESULT)
                .centerCrop()
//                .fitCenter()
                .into(view);
    }

}
