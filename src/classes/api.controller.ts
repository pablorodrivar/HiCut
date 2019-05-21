import {User} from './pojo/user';
import {Globals} from '../app/globals';
import {Storage} from '@ionic/storage';
import {HttpHeaders} from '@angular/common/http';
import { Comment } from './pojo/comment';


export class ApiController {

    public currentUser: User = null;
    public token: string = null;

    private static api_url = 'http://80.211.65.79:8000/api/v1/';

    public cancelreservation(id, callback: (status, msg)=>void){
        if (!this.isLoged()) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        Globals.http.get(ApiController.api_url + 'cancelreservation/'+id, {headers: new HttpHeaders().set('Content-Type', 'application/json').set(
            'Authorization', this.token)}).subscribe((data: any) => {
            callback("OK","");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public reservation(id, callback: (status, msg)=>void){
        if (!this.isLoged()) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        Globals.http.get(ApiController.api_url + 'reservation/'+id, {headers: new HttpHeaders().set('Content-Type', 'application/json').set(
            'Authorization', this.token)}).subscribe((data: any) => {
            callback(data.reservation,"");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public postReservation(hairdresser,date,paid,services, callback: (status, msg)=>void){
        if (!this.isLoged()) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        var data = JSON.stringify({hairdresser:hairdresser,date:date,paid:paid,services:services});
        Globals.http.post(ApiController.api_url + 'reservation',data, {headers: new HttpHeaders().set('Content-Type', 'application/json').set(
            'Authorization', this.token)}).subscribe((data: any) => {
            callback("OK","");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public rate(hairdressing: number,rate: number,callback: (status, msg) => void){
        if (!this.isLoged()) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        var r = JSON.stringify({hairdressing:hairdressing,rate:rate});
        Globals.http.post(ApiController.api_url + 'rating',r, {headers: new HttpHeaders().set('Content-Type', 'application/json').set(
            'Authorization', this.token)}).subscribe((data: any) => {
            callback("OK","");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public setProfile(user:User, callback: (status,msg) => void){
        if (!this.isLoged()) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        var newUserData = JSON.stringify(user);
        Globals.http.post(ApiController.api_url+"editprofile", 
        newUserData,{headers:new HttpHeaders().set("Authorization",this.token)}).subscribe((data) => {
            callback("OK","");
        },(error)=>{
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public getHairdressers(brb_id: number,callback: (hairdressers, msg) => void){
        Globals.http.get(ApiController.api_url + 'hairdressers/'+brb_id, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            callback(data.hairdressers,"");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public comment(comment: any,callback: (msg) => void){
        if (!this.isLoged()) {
            callback(this.errorParse('error.not_loged'));
            return;
        }
        //var c: any = JSON.stringify(comment);
        Globals.http.put(ApiController.api_url + 'comment',comment, {headers: new HttpHeaders().set('Content-Type', 'application/json').set(
            'Authorization', this.token)}).subscribe((data: any) => {
            callback(data.msg);
        }, (error) => {
            console.log(error);
            callback(this.errorParse(error.error.msg));
        });
    }

    private getHEveryFifteen(start,end){
        var hours = [];
        var h = parseInt(start.split(':')[0]);
        var m = parseInt(start.split(':')[1]);
        var max_h = parseInt(end.split(':')[0]);
        var max_m = parseInt(end.split(':')[1]);
        while(h<max_h || h==max_h && m<max_m){
            hours.push(h+':'+m);
            m+=15;
            if (m>=60){
                h++;
                m = m-60;
            }
        }

        return hours;
    }

    public getComments(brb_id: number,callback: (comments, msg) => void){
        Globals.http.get(ApiController.api_url + 'getcomments/'+brb_id, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            callback(data.comments,"");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }
    
    public getServices(brb_id: number,callback: (services, msg) => void){
        Globals.http.get(ApiController.api_url + 'getservices/'+brb_id, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            callback(data.services,"");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public getHours(brb_id: number,callback: (hours, msg) => void){
        Globals.http.get(ApiController.api_url + 'gethours/'+brb_id, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            for (var key in data.hours) {
                var day = data.hours[key];
                for(var i = 0;i<day.length;i++){
                    var range = day[i];
                    range.hours = this.getHEveryFifteen(range.range_start,range.range_end)
                }
            }
            callback(data.hours,"");
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public getListReservations(callback: (list, msg) => void) {
        if (!this.isLoged()) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        Globals.http.get(ApiController.api_url + 'reservations',
            {
                headers:
                    new HttpHeaders().set(
                        'Authorization', this.token)
            }).subscribe((data: any) => {
            callback(data.reservations, '');
            return;
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public getRating(hairdressing_id, callback: (rate, error) => void) {
        Globals.http.get(ApiController.api_url + 'rating/' + hairdressing_id, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            if (data.status === 200 && data.msg === 'OK') {
                callback(data.rating, '');
                return;
            }
            callback(null, this.errorParse('error.unknown'));
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
            return;
        });
    }

    public doRegister(user: User, password: string, password_confirmation: string, callback: (token, msg) => void) {
        var u: any = JSON.stringify(user);
        if (u.address === '' ||
            u.city === '' ||
            u.country === '' ||
            u.dni === '' ||
            u.email === '' ||
            u.name === '' ||
            password === '' ||
            password_confirmation === '' ||
            u.phone === '' ||
            u.state === '' ||
            u.surname === '') {
            callback(null, this.errorParse('error.all_fields_required'));
            return;
        }
        if (password != password_confirmation) {
            callback(null, this.errorParse('error.password_not_match'));
            return;
        }
        u = JSON.parse(u);
        u.password = password;
        u.password_confirmation = password_confirmation;
        u = JSON.stringify(u);
        Globals.http.put(ApiController.api_url + 'register', u,
            {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            if (data.status === 201 && data.msg === 'OK') {
                this.token = data.token;
                this.getProfile(null,(user, msg) => {
                    if (user != null) {
                        this.currentUser = user;
                        this.currentStorage.set('token', this.token).then((data) => {
                            callback('OK', '');
                            return;
                        }, (error) => {
                            this.token = null;
                            this.currentUser = null;
                            callback(null, this.errorParse('error.error_saving'));
                            return;
                        });
                        return;
                    } else {
                        callback(null, this.errorParse('error.connecting'));
                    }
                });
                return;
            }
            callback(null, this.errorParse('error.unknown'));
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
            return;
        });
    }

    public getHairdressing(filter, callback: (list, error) => void) {
        const filterData = JSON.stringify(filter);
        Globals.http.post(ApiController.api_url + 'hairdressing', filterData, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            if (data.status === 200 && data.msg === 'OK') {
                callback(data.list, '');
                return;
            }
            callback(null, this.errorParse('error.unknown'));
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
            return;
        });
    }

    private errorParse(error) {
        if (error === null) {
            return 'error.unknown';
        }
        if (typeof error === 'string') {
            return error;
        }
        return error[Object.keys(error)[0]];
    }

    constructor(public currentStorage: Storage) {
        currentStorage.get('token').then((data) => {
            if (data != null) {
                this.token = data;
                this.getProfile(null,(user: User, msg) => {
                    if (user == null) { // el usuario ya no es valido
                        this.token = null;
                        this.currentUser = null;
                        return;
                    } else { // el usuario es valido lo asignamos
                        this.currentUser = user;
                        return;
                    }
                });
            } else {// no hay token
                this.token = null;
                this.token = null;
                this.currentUser = null;
            }
        }, (error) => { // error de lectura?
            console.log(error);
        });
    }

    public getProfile(id,callback: (profile, msg) => void) {
        if (!this.isLoged() && id === null) {
            callback(null, this.errorParse('error.not_loged'));
            return;
        }
        Globals.http.get(ApiController.api_url + 'profile'+(id!==null?'/'+id:''), {headers: new HttpHeaders().set('Authorization', this.token)}).subscribe((data: any) => {
            callback(data.user, '');
        }, (error) => {
            callback(null, this.errorParse(error.error.msg));
        });
    }

    public doLogout() {
        this.currentStorage.set('token', null).then((data) => {
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
        if (login == null || login == '' || password == null || password == '') {
            callback(false, this.errorParse('error.no_input_data'));
            return;
        }
        var loginData = JSON.stringify({'email': login, 'password': password});
        Globals.http.post(ApiController.api_url + 'login', loginData, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe((data: any) => {
            if (data.status == 200) {
                this.token = data.token;
                this.getProfile(null,(user: User, msg) => {
                    if (user == null) {
                        this.token = null;
                        callback(false, this.errorParse('error.unknown'));
                        return;
                    } else {
                        this.currentUser = user;
                        this.currentStorage.set('token', this.token).then((data) => {
                            callback(true, '');
                            return;
                        }, (error) => {
                            this.token = null;
                            this.currentUser = null;
                            callback(false, this.errorParse('storage.error_saving'));
                            return;
                        });
                        return;
                    }
                });
                return;
            }
            callback(false, this.errorParse('error.unknown'));
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
