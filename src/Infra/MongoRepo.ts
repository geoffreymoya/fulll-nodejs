
import { MongoClient } from "mongodb";
import { Fleet } from "../Domain/Fleet.js";
import { User } from "../Domain/User.js";
import { Vehicle } from "../Domain/Vehicle.js";
import { IRepo } from "./IRepo.js";

export class MongoRepo implements IRepo {

    client:MongoClient;
    dbName:string;
    
    constructor(uri:string,dbName) {
        this.client = new MongoClient(uri);
        this.dbName = dbName;
    }
    async connect () {
        await this.client.connect();
    }

    async saveUser(u:User):Promise<string> {
        await this.client.db(this.dbName).collection(User.dbname).updateOne(
            {id:u.getUserId()},
            {$set:{id:u.getUserId()}},
            {upsert:true})
        return u.getUserId()
    }

    async saveVehicle(v:Vehicle):Promise<string> {
        let loc = v.getLocation();
        await this.client.db(this.dbName).collection(Vehicle.dbname).updateOne(
            {id:v.getVehicleId()},
            {$set:{
                fleets:v.getFleets(),
                location:{lat:loc.lat,lng:loc.lng,alt:loc.alt}
            }},
            {upsert:true})
        return v.getVehicleId();
    }

    async saveFleet(f:Fleet):Promise<string> {
        await this.client.db(this.dbName).collection(Fleet.dbname).updateOne(
            {id:f.getFleetId()},
            {$set:{
               id:f.getFleetId(),
               userid:f.getUser()
            }},
            {upsert:true})
        return f.getFleetId()
    }

    async getUserbyId(id:string) : Promise<User> {
        
        let u = await this.client.db(this.dbName).collection(User.dbname).findOne({id})
        return new User(u.id);
        
    }

    async getVehiclebyId(id:string) : Promise<Vehicle>  {
       
        let v = await this.client.db(this.dbName).collection(Vehicle.dbname).findOne({id})
       return new Vehicle(v.id,v.fleets,v.location.lat,v.location.lng,v.location.alt);
    }

    async getFleetbyId(id:string) :  Promise<Fleet>  {
        
        let f = await this.client.db(this.dbName).collection(Fleet.dbname).findOne({id})
        return new Fleet(f.userid,f.id);
       
    }
    async close () {
        await this.client.close();
    }
}