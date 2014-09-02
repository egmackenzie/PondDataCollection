
conservationModule = angular.module('Conservation', [
    'ui.bootstrap',
    'ngRoute',
    'ngResource']);


conservationModule.config(function($routeProvider) {
    $routeProvider

            .when('/', {
                templateUrl: 'html/home.html',
                controller: 'homeCtrl'
            })
            .when('/survey/new', {
                templateUrl: 'html/survey/newSurvey.html',
                controller: 'newSurveyCtrl'
            })
            .when('/survey/continue', {
                templateUrl: 'html/survey/continueSurvey.html',
                controller: 'continueSurveyCtrl'
            })
            .when('/view', {
                templateUrl: 'html/view.html',
                controller: 'viewCtrl'
            })
            .when('/about', {
                templateUrl: 'html/about.html',
                controller: 'aboutCtrl'
            })
            .when('/contact', {
                templateUrl: 'html/contact.html',
                controller: 'contactCtrl'
            });
});

