
import { GPSLocation } from "../Domain/GPSLocation.js";
import { Vehicle } from "../Domain/Vehicle.js";
import { IRepo } from "../Infra/IRepo.js";



export class Queries {
    repo:IRepo
    constructor(repo:IRepo) {
        this.repo = repo;
    }

    async isRegistered(plateNumber:string,fleetId:string):Promise<boolean> {
        let v:Vehicle = await this.repo.getVehiclebyId(plateNumber);
        return v.isInFleet(fleetId)
    }
    async whereisVehicle(plateNumber:string):Promise<GPSLocation> {
        let v:Vehicle = await this.repo.getVehiclebyId(plateNumber);
        return v.getLocation()
    }

}