/**
 * Created by feint on 17/2/25.
 */
function workPath(relaPath){
    return "http://120.77.34.140:8080/"+relaPath;
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

