package com.githubtrending.ImagePicker.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.githubtrending.ImagePicker.model.ImsFolder;
import com.githubtrending.R;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * 文件夹Adapter
 * Created by Nereo on 2015/4/7.
 */
public class ImsFolderAdapter extends BaseAdapter {

    private Context mContext;
    private LayoutInflater mInflater;

    private List<ImsFolder> mImsFolders = new ArrayList<ImsFolder>();

    int mImageSize;

    int lastSelected = 0;

    public ImsFolderAdapter(Context context){
        mContext = context;
        mInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mImageSize = mContext.getResources().getDimensionPixelOffset(R.dimen.folder_cover_size);
    }

    /**
     * 设置数据集
     * @param imsFolders
     */
    public void setData(List<ImsFolder> imsFolders) {
        if(imsFolders != null && imsFolders.size()>0){
            mImsFolders = imsFolders;
        }else{
            mImsFolders.clear();
        }
        notifyDataSetChanged();
    }

    @Override
    public int getCount() {
        return mImsFolders.size()+1;
    }

    @Override
    public ImsFolder getItem(int i) {
        if(i == 0) return null;
        return mImsFolders.get(i-1);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        ViewHolder holder;
        if(view == null){
            view = mInflater.inflate(R.layout.ims_list_item_folder, viewGroup, false);
            holder = new ViewHolder(view);
        }else{
            holder = (ViewHolder) view.getTag();
        }
        if (holder != null) {
            if(i == 0){
                holder.name.setText("所有图片");
                holder.size.setText(getTotalImageSize()+"张");
                if(mImsFolders.size()>0){
                    ImsFolder f = mImsFolders.get(0);
                    Glide.with(mContext)
                            .load(new File(f.cover.path))
                            .error(R.drawable.ims_default_error)
                            .override(mImageSize, mImageSize)
                            .centerCrop()
                            .into(holder.cover);
                }
            }else {
                holder.bindData(getItem(i));
            }
            if(lastSelected == i){
                holder.indicator.setVisibility(View.VISIBLE);
            }else{
                holder.indicator.setVisibility(View.INVISIBLE);
            }
        }
        return view;
    }

    private int getTotalImageSize(){
        int result = 0;
        if(mImsFolders != null && mImsFolders.size()>0){
            for (ImsFolder f: mImsFolders){
                result += f.images.size();
            }
        }
        return result;
    }

    public void setSelectIndex(int i) {
        if(lastSelected == i) return;

        lastSelected = i;
        notifyDataSetChanged();
    }

    public int getSelectIndex(){
        return lastSelected;
    }

    class ViewHolder{
        ImageView cover;
        TextView name;
        TextView size;
        ImageView indicator;
        ViewHolder(View view){
            cover = (ImageView)view.findViewById(R.id.cover);
            name = (TextView) view.findViewById(R.id.name);
            size = (TextView) view.findViewById(R.id.size);
            indicator = (ImageView) view.findViewById(R.id.indicator);
            view.setTag(this);
        }

        void bindData(ImsFolder data) {
            name.setText(data.name);
            size.setText(data.images.size()+"张");
            // 显示图片
            Glide.with(mContext)
                    .load(new File(data.cover.path))
                    .placeholder(R.drawable.ims_default_error)
                    .override(mImageSize, mImageSize)
                    .centerCrop()
                    .into(cover);
            // TODO 选择标识
        }
    }

}
