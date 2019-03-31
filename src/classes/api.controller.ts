import { User } from './pojo/user';
import { Globals } from '../app/app.module';
import { Storage } from '@ionic/storage';


export class ApiController {

    public currentUser: User = null;

    constructor(public currentStorage: Storage) {
        currentStorage.get("user").then((data) => {
            if (data != null) {
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

    public login(login: string, password: string, callback: () => void) {
        this.currentStorage.set("user", "something").then((data) => {
            this.currentUser = new User(5, "paco", "Paco", "Hernandez", "a@a.a");
            callback();
        }, (error) => {
            console.log(error);
        })
        Globals.http.post("https://api.ipify.org/", null, { responseType: 'text' }).subscribe((x) => {
            console.log(x);
        });
    }

    public logout() {
        this.currentStorage.set("user", null).then((data) => {
        }, (error) => {
            console.log(error);
        });
        this.currentUser = null;
    }

    public getHairdressing(lat: number, long: number) {

    }

}