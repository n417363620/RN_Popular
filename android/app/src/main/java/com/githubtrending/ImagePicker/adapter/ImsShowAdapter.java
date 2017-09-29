package com.githubtrending.ImagePicker.adapter;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import com.githubtrending.R;

import java.util.List;



/**
 * Created by UI2 on 2015/11/9.
 */
public class ImsShowAdapter extends BaseAdapter {
    Context context;
    List<Bitmap> list;

    public ImsShowAdapter(Context context, List<Bitmap> list) {
        this.list = list;
        this.context = context;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ImageView imageView = null;
        convertView = LayoutInflater.from(context).inflate(R.layout.ims_grid_item, null);
        imageView = (ImageView) convertView.findViewById(R.id.cover);
        imageView.setImageBitmap(list.get(position));
        return convertView;
    }
}
