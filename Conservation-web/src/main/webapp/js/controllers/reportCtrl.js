function BaseSurveyCtrl($scope, $modal) {

    $scope.survey = {
        date: undefined,
        site: {
            name: "",
            code: "",
            location: {latitude: undefined, longitude: undefined}
        },
        pond: {
            code: "",
            description: "",
            size: {width: 0, length: 0},
            marginalComplexity: undefined,
            hasFlows: false,
            landUse5m: [],
            landUse100m: [],
            landUse1km: [],
            coordinates: []
        },
        vegetation: {
            surveyor: "",
            filamentiousAlgae: 0,
            submerged: 0,
            floating: 0,
            emergent: 0,
            waterArea: 0,
            bryophytes: 0,
            bareGround: 0
        },
        overhang: {
            pondArea: 0,
            pondMargin: 0,
            waterArea: 0,
            waterMargin: 0
        }
    };

    $scope.newPondCoord = {area: undefined, easting: undefined, northing: undefined};

    $scope.addNewPondCoordinate = function(area, easting, northing) {
        $scope.survey.pond.coordinates.push({area: area, easting: easting, northing: northing});
    };

    $scope.getLandUse = function() {
        // TODO - get this from database.
        return ["Farm", "Forest", "Road", "Bog", "Other"];
    };



    $scope.addUsage = function(area) {
        var dlgScope = $scope.$new();
        var dlg = $modal.open({
            templateUrl: 'html/survey/dialogs/addLandUseDialog.html',
            size: 'sm',
            scope: dlgScope
        });
        dlgScope.landUse = $scope.getLandUse();
        switch (area)
        {
            // TODO - if other then add to database?
            case 5:
                console.log("5m");
                dlg.result.then(function(use) {
                    $scope.survey.pond.landUse5m.push(use);
                    dlgScope.$destroy;
                });
                break;
            case 100:
                dlg.result.then(function(use) {
                    $scope.survey.pond.landUse100m.push(use);
                    dlgScope.$destroy;
                });
                console.log("100m");
                break;
            case 1000:
                dlg.result.then(function(use) {
                    $scope.survey.pond.landUse1km.push(use);
                    dlgScope.$destroy;
                });
                console.log("1km");
                break;
        }
    };

    $scope.saved = false;

    $scope.$watchCollection('survey', function() {
        $scope.saved = false;
    });

    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datePickerOpened = true;
    };

    $scope.finish = function() {
        var finished = false;
        if (confirm("Are you sure you are finished?"))
        {
            console.log("Finishing...");
            if (!$scope.saved)
            {
                if (confirm("Do you want to save?"))
                {
                    $scope.save();
                }
            }
            finished = true;
        }
        $scope.survey = undefined;
        return finished;
    };

    $scope.save = function() {
        $scope.saved = true;
    };
}

function MapCtrl($scope, $window)
{
    // Location controls
    $scope.supportsGeo = $window.navigator.geolocation;

    $scope.mapModel = {map: undefined};
    $scope.mapMarkers = [];
    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.SATELITE
    };

    $scope.getPosition = function() {
        if ($scope.supportsGeo)
        {
            $scope.supportsGeo.getCurrentPosition(function(position) {
                // Fix map size.
                google.maps.event.trigger($scope.mapModel.map, 'resize');

                // Load values
                $scope.survey.site.location.latitude = position.coords.latitude;
                $scope.survey.site.location.longitude = position.coords.longitude;

                var latlng = new google.maps.LatLng($scope.survey.site.location.latitude, $scope.survey.site.location.longitude);
                // Position map.
                $scope.mapModel.map.setCenter(latlng);
                // Place marker.
                $scope.mapMarkers.push(new google.maps.Marker({map: $scope.mapModel.map, position: latlng}));
            }, function(error) {
                switch (error.code)
                {
                    case error.PERMISSION_DENIED:
                        alert("Unable to provide site location without allowing location usage.");
                        $scope.supportsGeo = false;
                        break;
                    case error.POSITION_UINAVAILABLE:
                        alert("Unable to fetch current location. (POSITION_UNAVAILABLE)");
                        break;
                    case error.TIMEOUT:
                        alert("Unable to fetch current location. (TIMEOUT)");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("Unknown error occured.");
                }
            },
                    {enableHighAccuracy: true, timeout: 60000, maximumAge: 60000});
        }
    };
    // End Location Controls
}


conservationModule.controller('newSurveyCtrl', ['$scope', '$modal', '$injector', "$window",
    function($scope, $modal, $injector, $window) {

        $injector.invoke(BaseSurveyCtrl, this, {$scope: $scope, $modal: $modal});
        $injector.invoke(MapCtrl, this, {$scope: $scope, $window: $window});

        $scope.survey.date = new Date();

    }]);

conservationModule.controller('continueSurveyCtrl', ['$scope', '$modal', '$injector', "$window",
    function($scope, $modal, $injector, $window) {

        $injector.invoke(BaseSurveyCtrl, this, {$scope: $scope, $modal: $modal});
        $injector.invoke(MapCtrl, this, {$scope: $scope, $window: $window});
        
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

    }]);
