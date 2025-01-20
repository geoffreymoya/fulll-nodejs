import { Fleet } from "../Domain/Fleet.js"
import { User } from "../Domain/User.js"
import { Vehicle } from "../Domain/Vehicle.js"
import { IRepo } from "./IRepo.js"

export class MemRepo implements IRepo {
    users:Map<string,User>
    vehicles:Map<string,Vehicle>
    fleets:Map<string,Fleet>
    constructor() {
        this.users = new Map<string,User>();
        this.vehicles = new Map<string,Vehicle>();
        this.fleets = new Map<string,Fleet>();
    }

    saveUser(u:User):Promise<string> {
        this.users.set(u.getUserId(),u)
        return new Promise<string>((resolve, reject) => {
            resolve(u.getUserId())
        }) 
    }

    saveVehicle(v:Vehicle):Promise<string> {
        this.vehicles.set(v.getVehicleId(), v)
        return new Promise<string>((resolve, reject) => {
            resolve(v.getVehicleId())
        }) 
    }

    saveFleet(f:Fleet):Promise<string> {
        this.fleets.set(f.getFleetId(),f)
        return new Promise<string>((resolve, reject) => {
            resolve(f.getFleetId())
        }) 
    }

    getUserbyId(id:string) : Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve(this.users.get(id))
        })   
    }

    getVehiclebyId(id:string) : Promise<Vehicle> {
        return new Promise<Vehicle>((resolve, reject) => {
            resolve(this.vehicles.get(id))
        }) 
    }

    getFleetbyId(id:string) :Promise<Fleet>  {
        return new Promise<Fleet>((resolve, reject) => {
            resolve(this.fleets.get(id))
        }) 
       
    }
    close() {
        
    }
}


