import { User } from './pojo/user';
import { Rest } from './rest';

export class ApiController{

    public currentUser:User = null;

    constructor(){

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