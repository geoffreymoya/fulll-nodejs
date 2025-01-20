import { Fleet } from "../Domain/Fleet";
import { User } from "../Domain/User";
import { Vehicle } from "../Domain/Vehicle";

export interface IRepo {
    saveUser(u:User): Promise<string> 
    saveVehicle(v:Vehicle):Promise<string> 
    saveFleet(f:Fleet):Promise<string> 
    
    getUserbyId(id:string) : Promise<User>
    getVehiclebyId(id:string) : Promise<Vehicle>
    getFleetbyId(id:string) : Promise<Fleet>

    close()
}