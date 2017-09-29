package com.githubtrending.ImagePicker.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.githubtrending.ImagePicker.utils.ImageUitl;
import com.githubtrending.R;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import uk.co.senab.photoview.PhotoView;
import uk.co.senab.photoview.PhotoViewAttacher;

/**
 * Created by UI2 on 2015/12/12.【展示大图】
 */
public class ActPhotoPage extends Activity {
    ViewPager pager;
    List<View> views;
    ArrayList<String> pics;
    int index;
    public static final int TYPE_SALE_ORDER = 2;
    public static final int TYPE_SALE_SHOP = 1;
    int type;

    public static void actionStart(Context context, List pics, int index) {
        Intent intent = new Intent(context, ActPhotoPage.class);
        if (pics.size() != 0) {
            intent.putExtra("photos", (Serializable) pics);
        }
        intent.putExtra("index", index);
        context.startActivity(intent);
    }

    public static void actionStart(Context context, List pics, int index, int type) {
        Intent intent = new Intent(context, ActPhotoPage.class);
        if (pics.size() != 0) {
            intent.putExtra("photos", (Serializable) pics);
        }
        intent.putExtra("index", index);
        intent.putExtra("type", type);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        try {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.act_photo_pager);
            init();
        } catch (Exception e) {
            Log.e("error",e.getMessage());
        }
    }

    private void init() throws Exception {
        pager= (ViewPager) findViewById(R.id.vpPhotoPage);
        pics = (ArrayList<String>) getIntent().getSerializableExtra("photos");
        index = getIntent().getIntExtra("index", 0);
        type = getIntent().getIntExtra("type", 0);
        if (pics.size() == 0) {
            return;
        }
        views = new ArrayList<>();
        for (int i = 0; i < pics.size(); i++) {
            View view = LayoutInflater.from(this).inflate(R.layout.item_photo_pager, null);
            TextView count = (TextView) view.findViewById(R.id.txvIndex);
            count.setTextColor(Color.WHITE);
            views.add(view);
        }
        pager.setOffscreenPageLimit(3);//设置缓存的数量
        MyAdapter adater = new MyAdapter(this, pics);
        pager.setAdapter(adater);
        pager.setCurrentItem(index);
    }

    class MyAdapter extends PagerAdapter {

        Context context;
        List pics;

        public MyAdapter(Context context, List pics) {
            this.context = context;
            this.pics = pics;
        }

        @Override
        public int getCount() {
            return pics.size();
        }

        @Override
        public boolean isViewFromObject(View view, Object o) {
            return view == o;
        }

        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            container.removeView((View) object); // 将view 类型 的object熊容器中移除,根据key
        }

        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            View view = views.get(position);
            // 如果访问网络下载图片，此处可以进行异步加载
            PhotoView img = (PhotoView) view.findViewById(R.id.imgPhotoPage);
            TextView txvIndex = (TextView) view.findViewById(R.id.txvIndex);
//            img.setImageBitmap(BitmapFactory.decodeFile(dir + getFile(position)));
//            ImageUitl.displayCommodityImage(img, pics[position]);
            if (!pics.get(position).toString().startsWith("http")) {
                File file = new File(pics.get(position).toString());
                ImageUitl.displayImageByFileBig(img, file);
            } else if (TYPE_SALE_ORDER == type) {
                ImageUitl.displayOrderImageBig(img, pics.get(position).toString());
            } else if (TYPE_SALE_SHOP == type) {
                ImageUitl.displayShopImageBig(img, pics.get(position).toString());
            } else {
                ImageUitl.displayCommodityImageBig(img, pics.get(position).toString());
            }
            img.setOnPhotoTapListener(new PhotoViewAttacher.OnPhotoTapListener() {
                @Override
                public void onPhotoTap(View view, float x, float y) {

                }
            });
            txvIndex.setText((position + 1) + "/" + pics.size());
            container.addView(view);
            return views.get(position); // 返回该view对象，作为key
        }
    }
}
