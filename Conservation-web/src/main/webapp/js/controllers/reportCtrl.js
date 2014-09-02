conservationModule.controller('newSurveyCtrl', ['$scope',
    function($scope) {

    }]);

conservationModule.controller('continueSurveyCtrl', ['$scope', '$modal',
    function($scope, $modal) {

        $scope.surveys = [
            {site: {name: "Site 1", code: 1}, 
                pond: {code: "P11", landUse5m: [], landUse100m: [], landUse1km: [],
                coordinates: []}, 
                date: "2014-08-25"},
            {site: {name: "Site 2", code: 2}, 
                pond: {code: "P12", landUse5m: [], landUse100m: [], landUse1km: [],
                coordinates: []},
                date: "2014-08-29"},
            {site: {name: "Site 3", code: 3}, 
                pond: {code: "P21", landUse5m: ["Forrest", "Farm"], landUse100m: [], landUse1km: [],
                coordinates: []}, 
                date: "2014-08-31"}
        ];

        $scope.survey = undefined;

        $scope.loadSurvey = function() {
            //
        };

        $scope.save = function() {
            
        };
        
        $scope.getLandUse = function() {
            return ["Farm", "Forest", "Road", "Bog", "Other"];
        };
        
        $scope.addNewPondCoordinate = function() {
            $scope.survey.pond.coordinates.push({area: $scope.newPondCoordArea,
                easting: $scope.newPondCoordEasting,
                northing: $scope.newPondCoordNorthing
            });
            $scope.newPondCoordArea = undefined;
            $scope.newPondCoordEasting = undefined;
            $scope.newPondCoordNorthing = undefined;
        };
        
        $scope.addUsage = function(area) {
            var dlgScope = $scope.$new();
            var dlg = $modal.open({
                        templateUrl: 'html/survey/dialogs/addLandUseDialog.html',
                        size: 'sm',
                        scope: dlgScope
                    });
            dlgScope.landUse = $scope.getLandUse();
            switch(area)
            {
                case 5:
                    console.log("5m");
                    dlg.result.then(function(use){
                        $scope.survey.pond.landUse5m.push(use);
                        dlgScope.$destroy;
                    });
                    break;
                case 100:
                    dlg.result.then(function(use){
                        $scope.survey.pond.landUse100m.push(use);
                        dlgScope.$destroy;
                    });
                    console.log("100m");
                    break;
                case 1000:
                    dlg.result.then(function(use){
                        $scope.survey.pond.landUse1km.push(use);
                        dlgScope.$destroy;
                    });
                    console.log("1km");
                    break;
            }
            
        };

    }]);
