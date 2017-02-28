/**
 * Created by feint on 17/2/25.
 */
function workPath(relaPath){
     return "http://120.77.34.140:8080/"+relaPath;

    //debug
    //return "http://localhost:8080/"+relaPath;
}
String.prototype.replaceAll=function(oldString,newString){
    return this.replace(new RegExp(oldString,"gm"),newString);
}

String.prototype.paragraph=function () {
    var paras=this.split("\n");
    var result="";
    paras.forEach(function (para) {
        result=result+"<p>"+para+"</p>";
    })

    return result;
}

function show_bottom(id,bottom) {
    console.log($(window).height()+" "+$("#"+id).height());
    $('#'+id).on('show.bs.modal', function () {  // 执行一些动作...}
        $(this).css({
            "margin-top":$(window).height()-$("#"+id).height()-bottom+"px"
        });
    });
}

function CacheUtil() {

}
CacheUtil.prototype={
    "getCache":function (key) {
        if($.cookie("key")!=undefined)
            return $.cookie("key");
        else
            return localStorage.getItem(key);
    },
    "setCache":function (key,value) {
        $.cookie(key,value);
        localStorage.setItem(key,value);
    }
}

function Feint() {

}
Feint.prototype={
    "cache":function () {
        return new CacheUtil();
    }
}

var fei=new Feint();