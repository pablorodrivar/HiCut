import { User } from './pojo/user';
import { Globals } from '../app/app.module';
import { HttpHeaders } from '@angular/common/http';
var ApiController = /** @class */ (function () {
    function ApiController(currentStorage) {
        var _this = this;
        this.currentStorage = currentStorage;
        this.currentUser = null;
        this.token = null;
        currentStorage.get("token").then(function (data) {
            if (data != null) {
                _this.token = data;
                _this.getProfile(function (user, msg) {
                    if (user == null) { // el usuario ya no es valido
                        _this.token = null;
                        _this.currentUser = null;
                        return;
                    }
                    else { // el usuario es valido lo asignamos
                        _this.currentUser = user;
                        return;
                    }
                });
            }
            else { //no hay token
                _this.token = null;
                _this.currentUser = null;
            }
        }, function (error) {
            console.log(error);
        });
    }
    ApiController.prototype.isLoged = function () {
        return this.token != null;
    };
    ApiController.prototype.getListReservations = function (callback) {
        if (!this.isLoged()) {
            callback(null);
        }
        Globals.http.get(ApiController.api_url + "listreserv", { headers: new HttpHeaders().set("Authorization", this.token) }).subscribe(function (data) {
            console.log(data);
            //TODO:devolver lista de reservas
            callback(null);
        }, function (error) {
            console.log(error);
            callback(null);
        });
    };
    ApiController.prototype.doLogin = function (login, password, callback) {
        var _this = this;
        if (login == null || login == "" || password == null || password == "") {
            callback(false, "user.no_input_data");
            return;
        }
        var loginData = JSON.stringify({ "email": login, "password": password });
        Globals.http.post(ApiController.api_url + "login", loginData, { headers: new HttpHeaders().set("Content-Type", 'application/json') }).subscribe(function (data) {
            if (data.status == 200) {
                _this.token = data.token;
                _this.getProfile(function (user, msg) {
                    if (user == null) {
                        _this.token = null;
                        callback(false, "error.unknown");
                        return;
                    }
                    else {
                        _this.currentUser = user;
                        _this.currentStorage.set("token", _this.token).then(function (data) {
                            callback(true, "");
                            return;
                        }, function (error) {
                            _this.token = null;
                            _this.currentUser = null;
                            callback(false, "storage.error_saving");
                            return;
                        });
                        return;
                    }
                });
                return;
            }
            callback(false, "error.unknown");
            return;
        }, function (error) {
            console.log(error.error.msg);
            callback(false, error.error.msg);
            return;
        });
    };
    ApiController.prototype.doLogout = function () {
        this.currentStorage.set("token", null).then(function (data) {
        }, function (error) {
            console.log(error);
        });
        this.currentUser = null;
    };
    ApiController.prototype.setProfile = function (user, callback) {
        var newUserData = JSON.stringify(user);
        Globals.http.post(ApiController.api_url + "editprofile", newUserData, { headers: new HttpHeaders().set("Authorization", this.token) }).subscribe(function (data) {
            console.log(data);
            //TODO: devolver usuario editado
            callback(null);
        }, function (error) {
            console.log(error);
            callback(null);
        });
    };
    ApiController.prototype.getlist = function (filter, callback) {
        var filterData = JSON.stringify(filter);
        Globals.http.post(ApiController.api_url + "list", filterData).subscribe(function (data) {
            console.log(data);
            //TODO: devolver lista peluquerias
            callback(null);
        }, function (error) {
            console.log(error);
            callback(null);
        });
    };
    //done
    ApiController.prototype.getProfile = function (callback) {
        if (!this.isLoged()) {
            callback(null, "user.not_loged");
        }
        Globals.http.get(ApiController.api_url + "profile", { headers: new HttpHeaders().set("Authorization", this.token) }).subscribe(function (data) {
            callback(User.fromArray(data.user), "");
        }, function (error) {
            callback(null, error.error.msg);
        });
    };
    ApiController.api_url = "http://127.0.0.1:8000/api/v1/";
    return ApiController;
}());
export { ApiController };
/*this.currentStorage.set("user", "something").then((data) => {
    this.currentUser = new User(5, "paco", "Paco", "Hernandez", "a@a.a");
    callback();
}, (error) => {
    console.log(error);
})*/
/*
{ responseType: 'text' }
*/ 
//# sourceMappingURL=api.controller.js.map