(function () {
    'use strict';
    var mysql = require('mysql');

    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "protocol_manager"
    });

    angular.module('app')
        .service('protocolService', ['$q', ProtocolService]);

    function ProtocolService($q) {
        return {
            getProtocols: getProtocols,
            getById: getProtocolById,
            searchData: searchData,
            // Search patients recorded in db for autocomplete
            searchPatient: searchPatient,
            create: createProtocol,
            destroy: deleteProtocol,
            update: updateProtocol
        };

        function getProtocols() {
            var deferred = $q.defer();
            var query = "SELECT * FROM protocols";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getProtocolById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM protocols WHERE protocol_id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
// Defautlt search function
        function searchData(value) {
            var deferred = $q.defer();
            var query = "SELECT * FROM protocols WHERE name LIKE  '" + value + "%' OR patient LIKE  '" + value + "%' OR note LIKE  '" + value + "%'" ;
            connection.query(query, [value], function (err, rows) {
                console.log(err)
                if (err) deferred.reject(err);

                deferred.resolve(rows);
            });
            return deferred.promise;
        }

// Search patient recorded

        function searchPatient(value) {
            var deferred = $q.defer();
            var query = "SELECT distinct patient FROM protocols WHERE patient LIKE  '" + value + "%'" ;
            connection.query(query, [value], function (err, rows) {
                console.log(err)
                if (err) deferred.reject(err);

                deferred.resolve(rows);
            });
            return deferred.promise;
        }
//  this function is use to create new protocol
        function createProtocol(protocol) {
            var deferred = $q.defer();
            var query = "INSERT INTO protocols SET ?";
            connection.query(query, protocol, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
// This function is not use yet
        function deleteProtocol(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM protocols WHERE protocol_id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                console.log(res);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }

        function updateProtocol(protocol) {
            var deferred = $q.defer();
            var query = "UPDATE protocols SET name = ?, patient = ?, note = ?, date = ? WHERE protocol_id = ?";
            connection.query(query, [protocol.name, protocol.patient, protocol.note, protocol.date, protocol.protocol_id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();
//
// CREATE TABLE `protocol_manager`.`protocols` (
//   `protocol_id` INT NOT NULL AUTO_INCREMENT,
//   `name` VARCHAR(45) NOT NULL,
//   `date` datetime,
//   `patient` VARCHAR(45) NULL,
//   `note` VARCHAR(500) NULL, PRIMARY KEY (`protocol_id`)
// );
