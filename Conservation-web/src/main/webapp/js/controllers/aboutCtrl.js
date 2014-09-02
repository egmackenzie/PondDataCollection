conservationModule.controller('aboutCtrl', ['$scope', '$location',
    function($scope, $location){
    $scope.isActive = function (viewLocation){
        return viewLocation === $location.path();
    }
}]);
