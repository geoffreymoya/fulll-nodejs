import { Fleet } from "../Domain/Fleet.js";
import { GPSLocation } from "../Domain/GPSLocation.js";
import { User } from "../Domain/User.js";
import { Vehicle } from "../Domain/Vehicle.js";
import { IRepo } from "../Infra/IRepo.js";


export class Commands {
    repo:IRepo
    constructor(repo:IRepo) {
        this.repo = repo;
    }
    async createUser():Promise<string> {
        let u:User = new User();
        return await this.repo.saveUser(u);
    }

    async createVehicle(plateNumber:string):Promise<string> {
        let v:Vehicle = new Vehicle(plateNumber);
        return await this.repo.saveVehicle(v);
    }
    async createFleet(userId:string):Promise<string> {
       let f:Fleet = new Fleet(userId);
       return await this.repo.saveFleet(f)
    }
    async localizeVehicle(plateNumber:string,lat:number,lng:number,alt?:number):Promise<string> {
        let v:Vehicle = await this.repo.getVehiclebyId(plateNumber)
        v.setLocation(new GPSLocation(lat,lng,alt));
        return await this.repo.saveVehicle(v);
    }
    async registerVehicle(plateNumber:string,fleetId:string):Promise<string> {
        let v:Vehicle = await this.repo.getVehiclebyId(plateNumber)
        v.addFleet(fleetId)
        return await this.repo.saveVehicle(v);
    }
}




 

