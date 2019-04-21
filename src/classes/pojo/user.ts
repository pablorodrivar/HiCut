export class User{

    constructor(
        public id:number=null,
        public email:string=null,
        public name:string=null,
        public surname:string=null,
        public country:string=null,
        public state:string=null,
        public city:string=null,
        public address:string=null,
        public phone:string=null,
        public dni:string=null,
        public type:number=null,
        ){

    }
    public static fromArray(array) {
        var tmp:User = new User();
        Object.keys(array).forEach((key)=> {
            var val = array[key];
            if (tmp.hasOwnProperty(key)){
                tmp[key]=val;
            }
        });
        return tmp;
    }
}