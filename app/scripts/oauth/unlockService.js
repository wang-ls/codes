(function () {
    'use strict';
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('protocol_users.db');
    var check;

    angular.module('app')
        .service('unlockService', ['$q', unlockService]);

    function unlockService($q) {
        return {
            getUserById: getUserById,
            changePassword: changePassword,
            createUser:  createUser,
            insertUser: insertUser
        };
        function getUserById(id) {
            var deferred = $q.defer();
            db.all("SELECT * FROM users", function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;

        }
        function createUser() {
            var deferred = $q.defer();
            db.run("CREATE TABLE if not exists users (user_id integer AUTO_INCREMENT PRIMARY KEY, login text, password text)");
            db.all("SELECT * FROM users", function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function insertUser(password) {
          var deferred = $q.defer();
          db.run("CREATE TABLE if not exists users (user_id integer AUTO_INCREMENT PRIMARY KEY, login text,  password text)");
          var query = db.prepare("INSERT INTO users (user_id, login, password) VALUES (?,?,?)");
          query.run(1, "srp", "123");
          query.finalize();
          return deferred.promise;
        }

        function changePassword(f, p, user) {
           var deferred = $q.defer();
           var query = db.prepare("UPDATE users SET login = ?, password = ?  WHERE user_id = ? ");
           query.run(f, p, user.user_id);
           query.finalize();
          return deferred.promise;
        }
    }
})();
