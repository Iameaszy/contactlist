describe("Controller", function() {
  let scope;
  let controller;
  let httpBackend;
  beforeEach(angular.mock.module("myApp"));
  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    controller = $controller;
    httpBackend = $httpBackend;
  }));
  it("should have contactlist with length two", function() {
    httpBackend.expectGET("/contactlist").respond([{}, {}]);
    controller("AppCtrl", { $scope: scope });
    httpBackend.flush();
    expect(scope.contactlist.length).toEqual(2);
  });

  it("should test scope.contact", function() {
    httpBackend.expectGET("/contactlist").respond([{}, {}]);
    controller("AppCtrl", { $scope: scope });
    httpBackend.flush();
    expect(scope.contact).toBeDefined();
  });

  it("should call scope deselect method", function() {
    controller("AppCtrl", { $scope: scope });
    scope.contact = null;
    const deselectSpy = spyOn(scope, "deselect");
    scope.deselect();
    expect(deselectSpy).toHaveBeenCalled();
  });

  it("should call scope edit method", function() {
    controller("AppCtrl", { $scope: scope });
    scope.contact = null;
    const editSpy = spyOn(scope, "edit");
    scope.edit(5);
    expect(editSpy).toHaveBeenCalledWith(5);
  });
});
