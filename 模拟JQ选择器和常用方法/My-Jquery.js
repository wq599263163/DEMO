/**
 * Created by sheyude on 2017/6/15.
 */
function $(vArg){
    return new Vquery(vArg)
};
/**
 * 绑定事件
 * @param obj  需要绑定事件的元素
 * @param events 事件名称，不要on
 * @param fn  需要执行的函数
 */
function bindEvent(obj, events, fn){
    if(obj.addEventListener){
        obj.addEventListener(events, fn, false);
    }else{
        // 低版本ie兼容
        obj.attachEvent('on'+events, fn)
    }
};
/**
 * 获取class
 * @param parent 父级元素
 * @param klass  传入的Class
 */
function getClass(parent,klass){
    var arr = [];
    var eles = parent.getElementsByTagName("*");
    for(var i = 0; i < eles.length; i++){
        if(eles[i].className === klass){
            arr.push(eles[i])
        }
    }
    return arr;
};
/**
 * 把获取的标签伪数组转换为数组
 * @param ele 需要获取的标签名字
 * @returns {Array}
 */
function toArray(ele){
    var arr = [];
    var eles = document.getElementsByTagName(ele);
    for(var i = 0; i < eles.length; i++){
        arr.push(eles[i]);
    }
    return arr;
};
/**
 * 获取style属性
 * @param obj  需要获取的元素
 * @param attr 需要获取的元素
 * @returns {*}
 */
function getStyle(obj, attr){
    // ie自娱自乐兼容
    if(obj.currentStyle){
        if(attr === undefined){
            return obj.currentStyle;
        }else{
            return obj.currentStyle[attr];
        }
    }else{ // 现代浏览器
        if(attr === undefined){ // 没有指定参数获取全部
            return getComputedStyle(obj, false);
        }else{  // 有参数获取有参数的
            return getComputedStyle(obj, false)[attr];
        }
    }

};
/**
 * 主框架
 * @param vArg
 * @constructor
 */
function Vquery(vArg){
    this.elements = []; // 选择元素集合
    // console.log(typeof vArg);
    switch(typeof vArg){
        // 参数是函数
        case "function":
            bindEvent(window, "load", vArg);
            break;
        // 参数是字符串
        case "string":
            // 判断传入字符串的第一位
            switch(vArg.charAt(0)){
                case "#":  // 证明传入是id选择器
                    this.elements.push(document.getElementById(vArg.substr(1)));
                    break;
                case ".":  // 证明传入是class选择器
                    this.elements = getClass(document,vArg.substr(1));

                    break;
                default:
                    // 标签
                    this.elements = toArray(vArg);
            }
            break;
        case 'object':
            // 兼容处理，
            if( vArg.constructor == Array ){
                this.elements = vArg;
            }
            else{
                this.elements.push( vArg );
            }
            break;
    }
};

/**
 * 设置或读取css
 * @param attr 设置或读取css的属性
 * @param value 需要设置的值
 */
Vquery.prototype.css = function(attr, value){
    // 没有参数代表获取第一位的全部
    var arr =[];
    if(arguments.length === 0){
        for(var x = 0; x < this.elements.length; x++){
            arr.push(getStyle(this.elements[x]));
        }
        console.log(arr);
        return arr;
    }else if(arguments.length === 1){
        // 判断传入数组代表设置参数
        if(typeof attr === "object"){
            for( var a in attr){
                for(var k = 0; k < this.elements.length; k++){
                    this.elements[k].style[a] = attr[a];
                }
            }
        }else{ // 一个参数和不是数组代表获取
            for(var i = 0; i < this.elements.length; i++){
                arr.push(getStyle(this.elements[i], attr));
            }
            console.log(arr);
            return arr;
        }
    }else if(arguments.length === 2){ // 2个参数代表设置属性
        for(var j = 0; j < this.elements.length; j++){
            this.elements[j].style[attr] = value;
        }
    }
};
/**
 * 获取和设置html
 * @param str
 */
Vquery.prototype.html = function(str){
    for(var i = 0; i < this.elements.length; i++){
        // 没有传入参数就是获取html
        if(str === undefined){
            console.log(this.elements[i].innerHTML);
        }else{  // 已经传入了参数
            this.elements[i].innerHTML = str;
        }
    }
};
/**
 * on方法,可以被其他方法调用
 * @param eve 执行事件的名称
 * @param fn 需要执行的函数
 */
Vquery.prototype.on = function(eve, fn){
    for(var i = 0; i < this.elements.length; i++){
        bindEvent(this.elements[i], eve, fn)
    }
};
// 隐藏
Vquery.prototype.hide = function(){
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].style.display = "none"
    }
};
// 显示
Vquery.prototype.show = function(){
    for(var i = 0; i < this.elements.length; i++){
        // 清除后，后面才能检测标签类型
        this.elements[i].style.display = "";
        //获取元素值
        var attr = getStyle(this.elements[i],"display");
        // 行内元素
        if( attr === "inline" ){
            this.elements[i].style.display = "inline-block";
        }else{  // 块级元素
            this.elements[i].style.display = "block";
        }
    }
};
// 点击事件
Vquery.prototype.click = function(fn){
    this.on("click",fn);
};
// 移入移出
Vquery.prototype.hover = function(fnOver, fnOut){
    this.on("mouseover", fnOver);
    this.on("mouseout", fnOut);
};
// 移入
Vquery.prototype.mouseover = function(fn){
    this.on("mouseover", fn);
};
// 移出
Vquery.prototype.mouseout = function(fn){
    this.on("mouseout", fn);
};
// 设置属性
Vquery.prototype.attr = function(attr, value){
    var arr = [];
    for(var i = 0; i < this.elements.length; i++){
        if(value){
            this.elements[i].setAttribute(attr, value);
        }else{
            arr.push(this.elements[i].getAttribute(attr));
        }
    }
    return arr;
};
// 选择
Vquery.prototype.eq = function(sum){
    return $(this.elements[sum]);
};
// 索引
Vquery.prototype.index = function(){
    // 找到他父节点，再找子节点
    var eles = this.elements[0].parentNode.children;
};
// 获取全部兄弟节点
// todo 有问题
Vquery.prototype.siblings = function(){
    var arr = [];
    var eles =  this.elements[0].parentNode.children;
    for(var i = 0; i < eles.length; i++){
        arr.push(eles[i])
    }
    return $(arr);
};
