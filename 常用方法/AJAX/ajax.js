/**
 * Created by sheyude on 2017/7/2.
 */
/**
 * AJAX 请求
 * @param opt 配置请求参数
 * @constructor
 * opt 参数解释
 *      url:请求地址，必填，get传输数据必须手动拼接，解决缓存问题加一个时间戳，
 *      中文需要编码encodeURL
 *      type:请求方式 "get" "post"
 *      mode: 是否异步  默认异步
 *      // todo 正在实现jsonp
 *      dataType: 想要的数据类型，默认说字符串，可以传递json
 *
 *      data: 需要发送的数据jq可以传入对象，正在实现
 *      success: 成功后执行的的函数
 */
function AJAX(opt) {
    this.xhr = null;
    this.default = {
        type:"GET", // 请求方式
        mode:true, // 是否异步
        dataType:null, // 想要的数据类型
        data:null, // 发送的数据
        success:function () {
            // 请求成功
            console.log("请配置执行成功参数！'success'")
        },
    };
    // 有配置文件就启用外部配置文件，没有就启用默认配置
    this.copy(this.default, opt);
    // 创建ajax对象
    try {
        // IE 7以上浏览器
        this.xhr = new XMLHttpRequest();
    } catch(e){
        // IE6 浏览器兼容
        this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
    };
    // 请求地址
    this.xhr.open(this.default.type, this.default.url, this.default.mode);
    // 告诉后端发送数据的编码类型
    this.xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    // 发送请求,如果接收是null 或者是已经转换完成的字符串，直接发送请求
    // todo 没有判断字符串是否符合url规则后续添加方法
    if(this.default.data == null || typeof this.default.data == "string"){
        this.xhr.send(this.default.data);
    }else if(typeof this.default.data == "object"){
        // 如果接收过来的数据是对象把对象转换为成url识别的字符串
        this.xhr.send(this.switchStr(this.default.data));
    };
    // 准备状态改变的时候
    var This = this;
    this.xhr.onreadystatechange = function () {
        // 请求成功，并且服务器状态返回说200
        if(This.xhr.readyState == 4 && This.xhr.status == 200){
            if(This.default.dataType == null){ // 返回正常数据
                This.default.success(This.xhr.responseText);
            }else if(This.default.dataType == "json"){ // 返回json数据
                This.default.success(JSON.parse(This.xhr.responseText));
            };
        };
    };
};
/**
 * 对象转浏览器url字符串拼接
 * @param data  object
 * @returns {string} 返回浏览器拼接的url字符串
 */
AJAX.prototype.switchStr = function(data) {
    var str = "";
    for (var arr in data){
        str += arr + "=" + data[arr] + "&";
    };
    return str
};
/**
 * 原型继承
 * @param objA 默认
 * @param objB 外面继承
 */
AJAX.prototype.copy = function(objA, objB){
    for(var attr in objB){
        objA[attr] = objB[attr];
    };
};
