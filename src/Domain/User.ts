export class User {
    id:string;
    static dbname = "user";
    constructor(id?:string) {
        if(typeof id =='undefined')
          this.id = crypto.randomUUID()
        else
        this.id = id;
    }
    
    getUserId():string {
        return this.id;
    }
}