export class User{

    constructor(
        private id:number,
        private login:string,
        private name:string,
        private surname:string,
        private email:string
        ){

    }

    public getId(){
        return this.id;
    }

    public getLogin() {
        return this.login;
    }

    public getName(){
        return this.name;
    }

    public getSurname(){
        return this.surname;
    }

    public getEmail(){
        return this.email;
    }

    public setId(id:number){
        this.id=id;
    }

    public setLogin(login:string){
        this.login=login;
    }

    public setName(name:string){
        this.name=name;
    }

    public setSurname(surname:string){
        this.surname=surname;
    }

    public setEmail(email:string){
        this.email=email;
    }

}