(function contoller() {
  const myApp = angular.module("myApp", []);
  myApp.controller("AppCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
      $scope.contactlist = [];
      $scope.contact = {};
      const refresh = function() {
        $http.get("/contactlist").then(response => {
          $scope.contactlist = response.data || [];
          //console.log("contactlist:", $scope.contactlist);
          $scope.contact = {};
        });
      };

      refresh();
      $scope.addContact = function() {
        $http.post("/contactlist", $scope.contact).then(response => {
          refresh();
        });
      };
      ////////////
      $scope.add = () => 4;
      $scope.remove = function(id) {
        $http.delete("/contactlist/" + id).then(response => {
          refresh();
        });
      };

      $scope.edit = function(id) {
        $http.get("/contactlist/" + id).then(response => {
          $scope.contact = response.data;
        });
      };
      $scope.update = function() {
        $http
          .put("/contactlist/" + $scope.contact._id, $scope.contact)
          .then(response => {
            refresh();
          });
      };
      $scope.deselect = function() {
        $scope.contact = {};
      };
    },
  ]);
})();
