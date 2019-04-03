import { User } from './pojo/user';
import { Globals } from '../app/app.module';
import { Storage } from '@ionic/storage';
import { HttpHeaders } from '@angular/common/http';
import { Filter } from './pojo/filter';


export class ApiController {

    public currentUser: User = null;
    public token:string=null;

    private static api_url="http://localhost/";

    constructor(public currentStorage: Storage) {
        currentStorage.get("user").then((data) => {
            if (data != null) {
                //TODO: Verificar que este usuario sigue siendo valido
                //TODO: crear el objeto usuario segun los datos obtenidos de su validacion
                this.currentUser = new User(5, "paco", "Paco", "Hernandez", "a@a.a");
            }
            else {
                this.currentUser = null;
            }
        }, (error) => {
            console.log(error);
        });
    }

    public isLoged() {
        return this.currentUser != null;
    }

    public getProfile(callback: (profile) => void){
        if (!this.isLoged()){
            callback(null);
        }
        Globals.http.get(ApiController.api_url+"profile",{headers:new HttpHeaders().set("Authorization",this.token)}).subscribe((data) => {
            console.log(data);
            //TODO:devolver datos del usuario
            callback(null);
        },(error)=>{
            console.log(error);
            callback(null);
        });
    }

    public getListReservations(callback: (list) => void){
        if (!this.isLoged()){
            callback(null);
        }
        Globals.http.get(ApiController.api_url+"listreserv",{headers:new HttpHeaders().set("Authorization",this.token)}).subscribe((data) => {
            console.log(data);
            //TODO:devolver lista de reservas
            callback(null);
        },(error)=>{
            console.log(error);
            callback(null);
        });
    }

    public doLogin(login: string, password: string, callback: (loged) => void) {
        if (login==null || login=="" || password==null || password==""){
            callback(false);
        }
        var loginData = JSON.stringify({"user":login,"password":password});
        Globals.http.post(ApiController.api_url+"login", loginData).subscribe((data) => {
            console.log(data);
            //TODO: Guardar token y usuario
            callback(true);
        },(error)=>{
            console.log(error);
            callback(false);
        });
    }

    public doLogout() {
        this.currentStorage.set("user", null).then((data) => {
        }, (error) => {
            console.log(error);
        });
        this.currentUser = null;
    }

    public setProfile(user:User, callback: (editedUser) => void){
        var newUserData = JSON.stringify(user);
        Globals.http.post(ApiController.api_url+"editprofile", newUserData,{headers:new HttpHeaders().set("Authorization",this.token)}).subscribe((data) => {
            console.log(data);
            //TODO: devolver usuario editado
            callback(null);
        },(error)=>{
            console.log(error);
            callback(null);
        });
    }

    public getlist(filter:Filter, callback: (list) => void) {
        var filterData = JSON.stringify(filter);
        Globals.http.post(ApiController.api_url+"list", filterData).subscribe((data) => {
            console.log(data);
            //TODO: devolver lista peluquerias
            callback(null);
        },(error)=>{
            console.log(error);
            callback(null);
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