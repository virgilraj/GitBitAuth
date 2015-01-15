//Global variables
var app = angular.module('myModule', ['ngResource']);

function repCtrl($scope, $resource, $location) {

    $scope.bitRepos = [];
    $scope.gitRepos = [];
    $scope.isBitbucket = false;

    $scope.load = function () {
        var bitbucketurl = 'http://localhost\\:8888/getbitbucket';
        var githuburl = 'http://localhost\\:8888/getgithub';
        var token = typeof ($location.search()).access_token != 'undefined' ? ($location.search()).access_token : '';

        $scope.isBitbucket = token != '' ? false : true;

        var url = $scope.isBitbucket ? bitbucketurl : githuburl;

        var resource = serviceConnection(url);

        resource.get({ token: token }, function processResponse(response) {
            if ($scope.isBitbucket)
            {
                $scope.bitRepos = response.repos;
            }
            else
            {
                $scope.gitRepos = response.respoRes;
            }
        });
        
    }

    function serviceConnection(url) {
        return $resource(url + '?alt=:alt&method=:callback&token=:token',
           { alt: 'json', callback: 'JSON_CALLBACK' },
           {
               get: {
                   method: 'JSONP', headers: [
                       { 'Content-Type': 'application/json' },
                       { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' }]
               }, isArray: true
           });
    }
}