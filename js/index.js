/**
 * Created by feint on 17/2/25.
 */
$(".list").hide();
$(".quesType").hide();
var app=angular.module('index',[]);
app.controller('indexController',function($scope,$http,$location){
    $scope.typeShow=false;
    $scope.page=1;
    function requestList(page) {
        $http.post(workPath("question/list"),{"data":{"page":page,"type":0,"order":"difficulty"}}).success(function (data) {
            $scope.questions=data.data.questions;
            $scope.pages=data.data.pages;
            $(".list").show();
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

    $scope.detail=function(id){
        $.cookie("qid",id);
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