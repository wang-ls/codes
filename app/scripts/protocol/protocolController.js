//  Protocol controller
(function () {
    'use strict';
    angular.module('app')
        .controller('protocolController', ['protocolService', '$q', '$location', '$window','$scope','mdcDateTimeDialog', ProtocolController]);
    function ProtocolController(protocolService, $q, $location, $window, $scope, mdcDateTimeDialog) {
        var self = this;
        self.selected = null;
        self.protocols  = [];
        self.patients  = [];
        self.states = 'list';
        self.selectedIndex = -1;
        self.filterText = null;
        self.patient = "";
        self.welcome = 0;
        self.selectProtocol = selectProtocol;
        self.selectPatient = selectPatient;
        // self.deleteProtocol = deleteProtocol;
        self.saveProtocol = saveProtocol;
        self.createProtocol = createProtocol;
        self.cancelProtocol = cancelProtocol;
        self.filter = filterProtocol;
        self.success = successFunction;
        self.filterPatient = filterPatient;
        self.year = new Date().getFullYear();
        self.cdate = new Date();
        $scope.date = new Date();
        $scope.time = new Date();
        self.sze = -1;
        $scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.maxDate = moment().add(1, 'month');
        self.no = 0;
        $scope.displayDialog = function () {
          mdcDateTimeDialog.show({
          })
            .then(function (date) {
              $scope.selectedDateTime = date;

            });
        };
        // Load initial data
        getAllProtocols ();

        //----------------------
        // Internal functions
        //----------------------
        function selectProtocol(protocol, index) {
            self.selected = angular.isNumber(protocol) ? self.protocols [protocol] : protocol;
            self.selectedIndex = angular.isNumber(protocol) ? protocol: index;
            self.states = 'edit';
        }
        function successFunction() {
            demo.showSwal('success-message');
        }
        function errorFunction() {
            demo.showSwal('error-message');
        }
        function selectPatient(protocol, index) {
            self.selected.patient = self.patients[index].patient;
            self.patients  = [];

        }


        function saveProtocol($event) {
            var i = self.protocols.length;
            if (self.selected.patient == undefined || self.selected.name == undefined || self.selected.date == undefined || self.selected.note == undefined) {
                errorFunction();
            }else{
              if (self.selected != null && self.selected.protocol_id != null) {
                  protocolService.update(self.selected).then(function (affectedRows) {

                  });
                  successFunction();
              }
              else {
                  protocolService.create(self.selected, i).then(function (affectedRows) {

                  });
                  successFunction();
              }
              self.states = 'list';
              getAllProtocols ();
            }

        }
        function cancelProtocol() {
            self.states = 'list';
            getAllProtocols ();
        }

        function createProtocol() {

            self.selected = {};
            self.selectedIndex = null;
            self.states = 'edit';

        }

        function getAllProtocols () {
            protocolService.getProtocols ().then(function (protocols ) {
                self.protocols  = [].concat(protocols );
                self.selected = protocols [0];
                self.sze = protocols.length;
            });
            if (self.welcome === 0) {
                demo.showNotification('top','right','Welcome to Simple Protocol Recorder Version 1.0 !');
                self.welcome = 1;
            }

        }
        function filterProtocol() {
            if (self.filterText == null || self.filterText == "") {
                getAllProtocols ();
            }
            else {
                protocolService.searchData(self.filterText).then(function (protocols ) {
                    self.protocols  = [].concat(protocols );
                    self.selected = protocols [0];
                });
            }
        }
        function filterPatient() {
          if (self.selected.patient != undefined) {
            if (self.selected.patient.length > 1) {
              protocolService.searchPatient(self.selected.patient).then(function (patients ) {
                  self.patients  = [].concat(patients );
              });

            }else{
              self.patients  = [];
            }

          }

        }
    }

})();
