import { User } from './pojo/user';
import { Globals } from '../app/app.module';
import { Storage } from '@ionic/storage';


export class ApiController{

    public currentUser:User = null;
    
    constructor(public currentStorage:Storage){
        currentStorage.get("user").then((data) => {
            if (data!=null){
                this.currentUser = new User(5,"paco","Paco","Hernandez","a@a.a");
            }
            else{
                this.currentUser = null;
            }
        },(error) => {
            console.log(error);
        });
    }

    public isLoged(){
        return this.currentUser!=null;
    }

    public login(login:string,password:string,callback:()=>void){
        Globals.http.post("https://api.ipify.org/",null,{responseType: 'text'}).subscribe((x)=>{
            console.log(x);
        });
    }

    public getHairdressing(lat:number,long:number){
        
    }

}