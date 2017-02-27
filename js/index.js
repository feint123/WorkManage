/**
 * Created by feint on 17/2/25.
 */
$(".quesType").hide();
var app=angular.module('index',[]);
app.controller('indexController',function($scope,$http,$location){
    $("#app").css("display","block")
    $scope.loadList=false;
    $scope.typeShow=false;
    $scope.page=1;
    function requestList(page) {
        $http.post(workPath("question/list"),{"data":{"page":page,"type":0,"order":"difficulty"}}).success(function (data) {
            $scope.questions=[];
            $scope.type=["在线","离线","投票","分组"]
            data.data.questions.forEach(function (ques) {
                var date=new Date(ques.upload)
                var question={
                    "qid":ques.qid,
                    "title":ques.title,
                    "tip":ques.tip,
                    "upload":date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日",
                    "type":ques.type
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
        $.cookie("qid",id);
        $.cookie("ques_type",type);
        window.location="work_description.html";
    }

    $scope.showQuestionType=function () {
        if($scope.typeShow) {
            $(".quesType").hide();
        }else
            $(".quesType").show();
        $scope.typeShow=!$scope.typeShow;
    }

    $scope.editQuestion=function (type) {
        $.cookie("ques_type",type);
        window.location="question.html";
    }
});