import {User} from './pojo/user';
import {Globals} from '../app/app.module';
import {Storage} from '@ionic/storage';
import {HttpHeaders} from '@angular/common/http';
import {Filter} from './pojo/filter';
import {Rate} from './pojo/rate';


export class ApiController {

    public currentUser: User = null;
    public token: string = null;

    private static api_url = "http://80.211.65.79:8000/api/v1/";



    //TODO: cancelReservation
    //TODO: editReservation
    //TODO: getReservationDetail

    /*     public setProfile(user:User, callback: (editedUser) => void){
            var newUserData = JSON.stringify(user);
            Globals.http.post(ApiController.api_url+"editprofile", newUserData,{headers:new HttpHeaders().set("Authorization",this.token)}).subscribe((data) => {
                console.log(data);
                //TODO: devolver usuario editado
                callback(null);
            },(error)=>{
                console.log(error);
                callback(null);
            });
        } */


    //done

    public getListReservations(callback: (list, msg) => void) {
        if (!this.isLoged()) {
            callback(null, this.errorParse("error.not_loged"));
            return;
        }
        Globals.http.get(ApiController.api_url + "reservations", {headers: new HttpHeaders().set("Authorization", this.token)}).subscribe((data: any) => {
            callback(data.reservations, "");
            return;
        }, (error) => {
            console.log(error)
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public getRating(hairdressing_id, callback: (rate: Rate, error) => void) {
        Globals.http.get(ApiController.api_url + "rating/" + hairdressing_id, {headers: new HttpHeaders().set("Content-Type", 'application/json')}).subscribe((data: any) => {
            if (data.status == 200 && data.msg == "OK") {
                callback(data.rating, "")
                return;
            }
            callback(null, this.errorParse("error.unknown"));
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
            return;
        });
    }

    public doRegister(user: User, password: string, password_confirmation: string, callback: (token, msg) => void) {
        var u: any = JSON.stringify(user);
        if (u.address === "" ||
            u.city === "" ||
            u.country === "" ||
            u.dni === "" ||
            u.email === "" ||
            u.name === "" ||
            password === "" ||
            password_confirmation === "" ||
            u.phone === "" ||
            u.state === "" ||
            u.surname === "") {
            callback(null, this.errorParse("error.all_fields_required"));
            return;
        }
        if (password != password_confirmation) {
            callback(null, this.errorParse("error.password_not_match"));
            return;
        }
        u = JSON.parse(u);
        u.password = password;
        u.password_confirmation = password_confirmation;
        u = JSON.stringify(u);
        Globals.http.put(ApiController.api_url + "register", u, {headers: new HttpHeaders().set("Content-Type", 'application/json')}).subscribe((data: any) => {
            if (data.status == 201 && data.msg == "OK") {
                this.token = data.token;
                this.getProfile((user, msg) => {
                    if (user != null) {
                        this.currentUser = user;
                        this.currentStorage.set("token", this.token).then((data) => {
                            callback("OK", "");
                            return;
                        }, (error) => {
                            this.token = null;
                            this.currentUser = null;
                            callback(null, this.errorParse("error.error_saving"));
                            return;
                        });
                        return;
                    } else {
                        callback(null, this.errorParse("error.connecting"));
                    }
                });
                return;
            }
            callback(null, this.errorParse("error.unknown"));
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
            return;
        });
    }

    public getHairdressing(filter: Filter, callback: (list, error) => void) {
        var filterData = JSON.stringify(filter);
        Globals.http.post(ApiController.api_url + "hairdressing", filterData, {headers: new HttpHeaders().set("Content-Type", 'application/json')}).subscribe((data: any) => {
            if (data.status == 200 && data.msg == "OK") {
                callback(data.list, "")
                return;
            }
            callback(null, this.errorParse("error.unknown"));
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
            return;
        });
    }

    private errorParse(error){
        if (error === null){
            return "error.unknown"
        }
        if (typeof error === 'string'){
            return error;
        }
        return error[Object.keys(error)[0]];
    }

    constructor(public currentStorage: Storage) {
        currentStorage.get("token").then((data) => {
            if (data != null) {
                this.token = data;
                this.getProfile((user: User, msg) => {
                    if (user == null) { // el usuario ya no es valido
                        this.token = null;
                        this.currentUser = null;
                        return;
                    } else { // el usuario es valido lo asignamos
                        this.currentUser = user;
                        return;
                    }
                });
            } else {//no hay token
                this.token = null;
                this.token = null;
                this.currentUser = null;
            }
        }, (error) => { //error de lectura?
            console.log(error);
        });
    }

    public getProfile(callback: (profile, msg) => void) {
        if (!this.isLoged()) {
            callback(null, this.errorParse("error.not_loged"));
            return;
        }
        Globals.http.get(ApiController.api_url + "profile", {headers: new HttpHeaders().set("Authorization", this.token)}).subscribe((data: any) => {
            callback(User.fromArray(data.user), "");
        }, (error) => {
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public doLogout() {
        this.currentStorage.set("token", null).then((data) => {
            this.token = null;
            this.currentUser = null;
        }, (error) => {
            console.log(error);
        });
    }

    public isLoged() {
        return this.token != null;
    }

    public doLogin(login: string, password: string, callback: (loged, msg) => void) {
        if (login == null || login == "" || password == null || password == "") {
            callback(false, this.errorParse("error.no_input_data"));
            return;
        }
        var loginData = JSON.stringify({"email": login, "password": password});
        Globals.http.post(ApiController.api_url + "login", loginData, {headers: new HttpHeaders().set("Content-Type", 'application/json')}).subscribe((data: any) => {
            if (data.status == 200) {
                this.token = data.token;
                this.getProfile((user: User, msg) => {
                    if (user == null) {
                        this.token = null;
                        callback(false, this.errorParse("error.unknown"));
                        return;
                    } else {
                        this.currentUser = user;
                        this.currentStorage.set("token", this.token).then((data) => {
                            callback(true, "");
                            return;
                        }, (error) => {
                            this.token = null;
                            this.currentUser = null;
                            callback(false, this.errorParse("storage.error_saving"));
                            return;
                        });
                        return;
                    }
                });
                return;
            }
            callback(false, this.errorParse("error.unknown"));
            return;
        }, (error) => {
            callback(false, this.errorParse(error.error.msg));
            return;
        });
    }
}


/*this.currentStorage.set("user", "something").then((data) => {
    this.currentUser = new User(5, "paco", "Paco", "Hernandez", "a@a.a");
    callback();
}, (error) => {
    console.log(error);
})*/
/*
{ responseType: 'text' }
*/