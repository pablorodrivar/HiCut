import { User } from './pojo/user';
import { Rest } from './rest';
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

    public login(login:string,password:string,callback:void){
        var data = new Array();
        data["something"]="some2";
        var headers = new Array();
        headers["something"]="some2";
        Rest.http("POST","url", data,headers,function(data){

        });
    }

    public getHairdressing(lat:number,long:number){
        
    }

}