package com.githubtrending;


//import com.hyphenate.easeui.EaseConstant;

public class Constant {
//        extends EaseConstant {

    public static final boolean DEBUG = true;
    public static final String sharePath = "dts_share";
    public static final String DTS_TEST_SERVER = "https://apitest.datousuan.com.cn";
    public static final String DTS_ONLINE_SERVER = "https://api.datousuan.com.cn";
    public static final String DTS_DEBUG_SERVER = "https://apitest.datousuan.com.cn";
    public static final String ANDROIDMODULE = "dts_module";
    public static final String USERSID = "user";
    //页面默认显示成都，登陆后显示注册用户的城市
    public static final String CITY_ID = "cityId";
    public static final String CITY_NAME = "cityName";
    public static final String DEFAULT_CITY_ID = "1001";
    public static final String DEFAULT_CITY_NAME = "成都";

    public static final String CERTIFICATION_VERSION = "2.8.0";
    public static final String DEVICE_TYPE = "ANDROID";
    public static final int IMAGE_WIDTH_STANDARD = 1280;//标准图片宽度
    public static final double DEFAULT_STORE_QUANTITY = -99999.0;//默认库存数量
    public static final float DEFAULT_PRICE = -9999999999f;//默认价格
    public static final int DEFAULT_COMMODITY_AFTER_MONTH = 12;
    public static final int MAX_COMMODITY_IMAGE_COUNT = 16;//每个商品的最大图片数量是16张

    //本地数据缓存的KEY
    public static final String cacheBrandKey = "recentBrand";
    public static final String CUSTOMERGROUPINFOS = "customerGroupInfos";
    public static final String addressBookKey = "addressBook";
    public static final String SERVER_PATH = "serverPath";
    public static final String ERROR = "error";
    public static final String SHOP = "shop";
    public static final String STAFFS = "staffs";
    public static final String MODULES = "modules";
    public static final String MODULESTAG = "modulesTag";
    public static final String NETSPLASH= "netsplash";
    public static final String JPushmessage = "JPushmessage";
    public static final String updateTime = "updateTime";
    public static final String TOKEN = "token";

    //cookies
    public static final String USER_ID_COOKIE = "cookieUserId";
    public static final String USER_NAME_COOKIE = "cookieUserName";
    public static final String USER_PASSWORD_COOKIE = "cookiePassword";
    public static final String USER_LOGIN_SIGN_COOKIE = "cookieLoginSign";
    public static final String USER_PASSWORD_REMEMBER_COOKIE = "cookiePasswordRemember";
    public static final String USER_CERTIFICATION_COOKIE = "cookieCertification";

    public static final String SHOP_ID_COOKIE = "cookieShopId";
    public static final String SHOP_NAME_COOKIE = "cookieShopName";

    public static final String IS_FIRST_START = "isfirstStart";
    public static final String VERSION = "version";

    // 连接超时
    public static final int timeOut = 12000;
    // 建立连接
    public static final int connectOut = 12000;
    // 获取数据
    public static final int getOut = 60000;

    //1表示已下载完成
    public static final int downloadComplete = 1;
    //1表示未开始下载
    public static final int undownLoad = 0;
    //2表示已开始下载
    public static final int downInProgress = 2;
    //3表示下载暂停
    public static final int downLoadPause = 3;

    public static final String BASEURL = "http://www.datousuan.com.cn/";


// 	//应用的key
// 	//1512528
// 	public final static String APPID = "1512528";
// 		
// 	//jfa97P4HIhjxrAgfUdq1NoKC
// 	public final static String APIKEY = "jfa97P4HIhjxrAgfUdq1NoKC";

 	public final static String EASE_PASSWORD = "c6359ehomeOYXb512a#a4df6*8ea3e9b";
 	public final static String EASE_USERNAME = "dts_shop_";
 	public final static String EASE_CUSTOMER_USERNAME = "dts_customer_";


    //    ----------------环信-------------
    public static final String NEW_FRIENDS_USERNAME = "item_new_friends";
    public static final String GROUP_USERNAME = "item_groups";
    public static final String CHAT_ROOM = "item_chatroom";
    public static final String ACCOUNT_REMOVED = "account_removed";
    public static final String ACCOUNT_CONFLICT = "conflict";
    public static final String CHAT_ROBOT = "item_robots";
    public static final String MESSAGE_ATTR_ROBOT_MSGTYPE = "msgtype";
    public static final String ACTION_GROUP_CHANAGED = "action_group_changed";
    public static final String ACTION_CONTACT_CHANAGED = "action_contact_changed";

    public static final String MESSAGE_ATTR_IS_ORDER = "type";

    public static String C_ATTR_KEY_MSGTYPE = "json";
//    -----------------------------

    public static int SUIT_BRABD_ID = -1;

    public static final String ACTION_GET_MODULE = "ACTION_GET_MODULE";
    public static final String ACTION_ORDERTIME = "ACTION_ORDERTIME";//待办事项通知 具体扩展在ext的json字段：






    public static final String CMD_MODULES = "CMD_MODULES";//更新权限
    public static final String CMD_LOGOUT = "CMD_LOGOUT";//退出登陆
    public static final String CMD_FORCED_OFFLINE ="CMD_FORCED_OFFLINE";//强制退出
    public static final String CMD_UPDATE_SHOP = "CMD_UPDATE_SHOP";//更新店铺消息
    public static final String CMD_NEWSTUFF_HANDLE = "CMD_NEWSTUFF_HANDLE";//登录冲突
    public static final String CMD_TOKEN_INVALIDE = "CMD_TOKEN_INVALIDE";//登录状态失效CMD_TOKEN_INVALIDE


    /**  UI设计的基准宽度. */
    public static int UI_WIDTH = 720;

    /**  UI设计的基准高度. */
    public static int UI_HEIGHT = 1280;

    /**  UI设计的密度. */
    public static int UI_DENSITY = 2;

    /** 默认 SharePreferences文件名. */
    public static String SHARED_PATH = "app_share";

    /** 默认下载文件地址. */
    public static  String DOWNLOAD_ROOT_DIR = "download";

    /** 默认下载图片文件地址. */
    public static  String DOWNLOAD_IMAGE_DIR = "images";

    /** 默认下载文件地址. */
    public static  String DOWNLOAD_FILE_DIR = "files";

    /** APP缓存目录. */
    public static  String CACHE_DIR = "cache";

    /** DB目录. */
    public static  String DB_DIR = "db";

    /** 默认缓存超时时间设置，毫秒. */
    public static int IMAGE_CACHE_EXPIRES_TIME = 60*10000;

    /** 内存缓存大小  单位10M. */
    public static int MAX_CACHE_SIZE_INBYTES = 10*1024*1024;

    /** 磁盘缓存大小  单位10M. */
    public static int MAX_DISK_USAGE_INBYTES = 10*1024*1024;

    /** The Constant CONNECTEXCEPTION. */
    public static String CONNECT_EXCEPTION = "无法连接到网络";

    /** The Constant UNKNOWNHOSTEXCEPTION. */
    public static String UNKNOWN_HOST_EXCEPTION = "连接远程地址失败";

    /** The Constant SOCKETEXCEPTION. */
    public static String SOCKET_EXCEPTION = "网络连接出错，请重试";

    /** The Constant SOCKETTIMEOUTEXCEPTION. */
    public static String SOCKET_TIMEOUT_EXCEPTION = "连接超时，请重试";

    /** The Constant NULLPOINTEREXCEPTION. */
    public static String NULL_POINTER_EXCEPTION = "抱歉，远程服务出错了";

    /** The Constant NULLMESSAGEEXCEPTION. */
    public static String NULL_MESSAGE_EXCEPTION = "抱歉，程序出错了";

    /** The Constant CLIENTPROTOCOLEXCEPTION. */
    public static String CLIENT_PROTOCOL_EXCEPTION = "Http请求参数错误";

    /** 参数个数不够. */
    public static String MISSING_PARAMETERS = "参数没有包含足够的值";

    /** The Constant REMOTESERVICEEXCEPTION. */
    public static String REMOTE_SERVICE_EXCEPTION = "抱歉，远程服务出错了";

    /** 资源未找到. */
    public static String NOT_FOUND_EXCEPTION = "页面未找到";

    /** 没有权限访问资源. */
    public static String FORBIDDEN_EXCEPTION = "没有权限访问资源";

    /** 其他异常. */
    public static String UNTREATED_EXCEPTION = "未处理的异常";
}
