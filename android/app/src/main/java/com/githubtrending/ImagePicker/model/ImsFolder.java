package com.githubtrending.ImagePicker.model;

import java.util.List;

/**
 * �ļ���
 * Created by Nereo on 2015/4/7.
 */
public class ImsFolder {
    public String name;
    public String path;
    public ImsImage cover;
    public List<ImsImage> images;

    @Override
    public boolean equals(Object o) {
        try {
            ImsFolder other = (ImsFolder) o;
            return this.path.equalsIgnoreCase(other.path);
        }catch (ClassCastException e){
            e.printStackTrace();
        }
        return super.equals(o);
    }
}
