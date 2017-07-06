function Session(){
    this.sum = 0;
}
// 初始化
Session.prototype.init = function(){
    console.log(this.getSum())
    if( this.getSum() == null){
        sessionStorage.setItem("sum",1);
    }
    this.interval();
};
// 在线一个小时添加一次次数
Session.prototype.interval = function () {
    var This = this;
    setInterval(function () {
        This.sum = +sessionStorage.getItem("sum") + 1;
        sessionStorage.setItem("sum",This.sum);
    },3600000) // 3600000
}
// 获取 次数
Session.prototype.getSum = function(){
    return this.sum = sessionStorage.getItem("sum");
}
// 调用一次删除一次机会
Session.prototype.delsum = function () {
    if(+sessionStorage.getItem("sum") >= 1){
        this.sum = +sessionStorage.getItem("sum") - 1;
        sessionStorage.setItem("sum",this.sum);
    }
}

/**
 * 抽奖cookie程序
 * @constructor
 */
function SetCookie(){
    this.sum = 0; // 初始次数
    this.date = 0;
    // 初始化
    this.init = function(){
        // 判断如果没有写入过就写入
        if(isNaN(this.getSum())){
            this.write(1);
        }
        // 调用计时器
        this.interval();
    };

    // 在线一个小时添加一次次数
    this.interval = function () {
        var This = this;
        setInterval(function () {
            This.sum = This.getSum() + 1;
            This.write(This.sum);
            console.log(This.getSum())
        },3600000) // 3600000
    };

    /**
     * 写入cookie
     * @param sum 当前的次数
     */
    this.write = function (sum) {
        this.date=new Date();
        this.date.setDate(this.date.getDate()+7);
        document.cookie='sum='+ sum +';expires=' + this.date+ "'";
    };
}
/**
 * 获取cookie次数
 * @returns {number}
 */
SetCookie.prototype.getSum = function(){
    return this.sum = +document.cookie.split("=")[1];
}
/**
 * 调用一次删除一次机会 删除成功返回true 失败返回false
 * @returns {boolean}
 */
SetCookie.prototype.delSum = function () {
    if(this.getSum() >= 1){
        this.sum = this.getSum() - 1;
        this.write(this.sum);
        return true
    }else{
        return false
    }
}
