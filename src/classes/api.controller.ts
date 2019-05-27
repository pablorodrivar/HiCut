import {User} from './pojo/user';
import {Globals} from '../app/globals';
import {Storage} from '@ionic/storage';
import {HttpHeaders} from '@angular/common/http';
import { Comment } from './pojo/comment';


export class ApiController {

    public currentUser: User = null;
    public token: string = null;

    public static api_url = 'https://gatito-p07470.c9users.io:8082/';

    public cancelreservation(id, callback: (status, msg)=>void){
        this.apiCall('reservation/'+id,null,'delete',true,'msg',callback);
    }

    public reservation(id, callback: (status, msg)=>void){
        this.apiCall('reservation/'+id,null,'get',true,'reservation',callback);
    }

    public postReservation(hairdresser,date,paid,services, callback: (status, msg)=>void){
        var data = JSON.stringify({hairdresser:hairdresser,date:date,paid:paid,services:services});
        this.apiCall('reservation',data,'post',true,'msg',callback);
    }

    public rate(hairdressing: number,rate: number,callback: (status, msg) => void){
        var data = JSON.stringify({hairdressing:hairdressing,rate:rate});
        this.apiCall('rating',data,'post',true,'msg',callback);
    }

    public setProfile(user:User, callback: (status,msg) => void){
        var data = JSON.stringify(user);
        this.apiCall('profile',data,'post',true,'msg',callback);
    }

    public getHairdressers(brb_id: number,callback: (hairdressers, msg) => void){
        this.apiCall('hairdressers/'+brb_id,null,'get',false,'hairdressers',callback);
    }

    public comment(comment: any,callback: (msg) => void){
        this.apiCall('comment',comment,'put',true,'msg',callback);
    }

    private getHEveryFifteen(start,end){
        var hours = [];
        var h = parseInt(start.split(':')[0]);
        var m = parseInt(start.split(':')[1]);
        var max_h = parseInt(end.split(':')[0]);
        var max_m = parseInt(end.split(':')[1]);
        while(h<max_h || h==max_h && m<max_m){
            hours.push((h<10?'0'+h:h)+':'+(m<10?'0'+m:m));
            m+=15;
            if (m>=60){
                h++;
                m = m-60;
            }
        }

        return hours;
    }

    public getComments(brb_id: number,callback: (comments, msg) => void){
        this.apiCall('comments/'+brb_id,null,'get',false,'comments',callback);
    }
    
    public getServices(brb_id: number,callback: (services, msg) => void){
        this.apiCall('services/'+brb_id,null,'get',false,'services',callback);
    }

    public getHours(brb_id: number,callback: (hours, msg) => void){
        this.apiCall('hours/'+brb_id,null,'get',false,null,(data,msg)=>{
            if (msg.length>0){
                callback(null, msg);
                return;
            }
            for (var key in data.hours) {
                var day = data.hours[key];
                for(var i = 0;i<day.length;i++){
                    var range = day[i];
                    range.hours = this.getHEveryFifteen(range.range_start,range.range_end)
                }
            }
            callback(data.hours,"");
        });
    }

    public getListReservations(callback: (list, msg) => void) {
        this.apiCall('reservations',null,'get',true,'reservations',callback);
    }

    public getRating(hairdressing_id, callback: (rate, error) => void) {
        this.apiCall('rating/' + hairdressing_id,null,'get',false,'rating',callback);
    }

    public getProfile(id,callback: (profile, msg) => void) {
        this.apiCall('profile'+(id!==null?'/'+id:''),null,"get",id===null,(id===null?'user':'profile'),callback);
    }

    public getHairdressing(filter, callback: (list, error) => void) {
        var data = JSON.stringify(filter);
        this.apiCall('hairdressing',data,'post',false,'list',callback);
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
                this.token = 'Bearer: '+ data.token;
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
                this.currentUser = null;
            }
        }, (error) => { // error de lectura?
            console.log(error);
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
                this.token = 'Bearer: '+ data.token;
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


    private apiCall(url:string,data:any,method:string,needLogin:Boolean,dataBackName:string, callback: (status, msg)=>void){
        if (needLogin){
            if (!this.isLoged()) {
                callback(null, this.errorParse('error.not_loged'));
                return;
            }
        }

        var headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        if (needLogin){
            headers=headers.set('Authorization', this.token)
        }

        var request;
        if (data!=null){
            request = Globals.http[method](ApiController.api_url + url, data, {headers: headers});
        }
        else{
            request = Globals.http[method](ApiController.api_url + url, {headers: headers});
        }

        request.subscribe((data: any) => {
            if (dataBackName===null){
                callback(data,"");
            }
            else{
                callback(data[dataBackName],"");
            }
        }, (error) => {
            console.log(error);
            callback(null, this.errorParse(error.error.msg));
        });
    }

}


