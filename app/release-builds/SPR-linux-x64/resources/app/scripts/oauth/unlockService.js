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
        .service('unlockService', ['$q', unlockService]);

    function unlockService($q) {
        return {
            getUserById: getUserById,
            changePassword: changePassword
        };
        function getUserById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM users WHERE password = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function changePassword(f, p, user) {
            var deferred = $q.defer();
            console.log(user.name)
            var query = "UPDATE users SET name = ?, password = ? , login = ? WHERE id = ?";
            connection.query(query, [f, p, user.login, user.id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();
