/**
 * Created by feint on 17/2/25.
 */
$(".quesType").hide();
var app=angular.module('index',[]);

app.controller('indexController',function($scope,$http){
    // if(fei.cache().getCache("sNum")==undefined)
    //     window.location="../user/login.html";
    $("#app").css("display","block")
    $scope.loadList=false;
    $scope.page=1;
    $scope.orders=[" 默认 "," 时间 "," 浏览 "," 评论 "];
    $scope.type=["在线","离线","投票","分组"]

    function requestList(page) {
        $scope.loadList=false;
        $http.post(workPath("question/list"),{"data":{"page":page,"type":0,"order":"difficulty"}}).success(function (data) {
            $scope.questions=[];
            data.data.questions.forEach(function (ques) {
                var date=new Date(ques.upload)
                var question={
                    "qid":ques.qid,
                    "title":ques.title,
                    "tip":ques.tip,
                    "upload":date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日",
                    "type":$scope.type[ques.type-1]
                }
                $scope.questions.push(question);
            })

            $scope.pages=data.data.pages;

            $scope.loadList=true;

        })
    }

    requestList($scope.page);

    $scope.nextPage=function(){
        if($scope.page<$scope.pages)
            $scope.page=$scope.page+1;
        requestList($scope.page)
    }

    $scope.prePage=function(){
        if($scope.page>1)
            $scope.page=$scope.page-1;
        requestList($scope.page)
    }

    $scope.detail=function(id,type){
        console.log(type+":type")
        fei.cache().setCache("ques_type",$scope.type.indexOf(type)+1);
        fei.cache().setCache("qid",id);

        window.location="work_description.html";
    }

    $scope.editQuestion=function (type) {
        $.cookie("ques_type",type);
        window.location="question.html";
    }
});