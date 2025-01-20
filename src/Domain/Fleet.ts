export  class Fleet {
    id:string;
    UserId:string;
    static dbname = "fleet";
    constructor(UserId:string,id?:string) {
      if(typeof id == 'undefined')
        this.id = crypto.randomUUID()
      else
        this.id = id
      this.UserId = UserId;
      }
      getFleetId():string {
        return this.id;
      }
      getUser():string {
        return this.UserId;
      }
}