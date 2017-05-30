(function () {
    'use strict';

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('protocol_management.db');
    var check;


    angular.module('app')
        .service('protocolService', ['$q', ProtocolService]);

    function ProtocolService($q) {
        return {
            getProtocols: getProtocols,
            searchData: searchData,
            // Search patients recorded in db for autocomplete
            searchPatient: searchPatient,
            create: createProtocol,
            update: updateProtocol
        };

        function getProtocols() {
            var deferred = $q.defer();
            db.run("CREATE TABLE if not exists protocols (protocol_id integer AUTO_INCREMENT PRIMARY KEY, name text NOT NULL , date datetime , patient text NOT NULL, note text NOT NULL)");
            db.all("SELECT * FROM protocols", function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }


        function searchData(value) {
            var deferred = $q.defer();
            db.all("SELECT * FROM protocols WHERE name LIKE  '" + value + "%' OR patient LIKE  '" + value + "%' OR note LIKE  '" + value + "%'", function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function searchPatient(value) {
            var deferred = $q.defer();
            db.all("SELECT distinct patient FROM protocols WHERE patient LIKE  '" + value + "%'", function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function createProtocol(protocol, i) {
            var deferred = $q.defer();
            var query = db.prepare("INSERT INTO protocols (protocol_id, name, date, patient, note) VALUES (?,?,?,?,?)");
            query.run(i+1,protocol.name, protocol.date,  protocol.patient,  protocol.note);
            query.finalize();
            return deferred.promise;
        }


        function updateProtocol(protocol) {

           var deferred = $q.defer();
           var query = db.prepare("UPDATE protocols SET name = ?, patient = ?, date = ?, note = ? WHERE protocol_id = ? ");
           query.run(protocol.name, protocol.patient, protocol.date, protocol.note, protocol.protocol_id);
           query.finalize();
          return deferred.promise;
        }
    }
})();
