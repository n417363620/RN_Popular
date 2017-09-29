package com.githubtrending.ImagePicker.model;

/**
 * ͼƬʵ��
 * Created by Nereo on 2015/4/7.
 */
public class ImsImage {
    public String path;
    public String name;
    public long time;

    public ImsImage(String path, String name, long time){
        this.path = path;
        this.name = name;
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        try {
            ImsImage other = (ImsImage) o;
            return this.path.equalsIgnoreCase(other.path);
        }catch (ClassCastException e){
            e.printStackTrace();
        }
        return super.equals(o);
    }
}
