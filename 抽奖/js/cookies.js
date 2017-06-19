function Session(){
    this.sum = 0;
}
// 初始化
Session.prototype.init = function(){
    if( !this.getSum()){
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
