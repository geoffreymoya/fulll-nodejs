import { GPSLocation } from "./GPSLocation.js";

export class Vehicle {
    id:string;
    fleets:string[] = [];
    location:GPSLocation;
    static dbname = "vehicle";
    constructor(plateNumber:string,fleets?:[],lat?:number,lng?:number,alt?:number) {
        this.id = plateNumber
        if(typeof fleets !=='undefined')
            this.fleets = fleets
        if(typeof lat !=='undefined' && typeof lng !=='undefined')
            this.location = new GPSLocation(lat,lng,alt)
        else
         this.location = new GPSLocation(-1.0,-1.0,-1.0)
    }
    getVehicleId():string {
        return this.id;
    }
    getFleets():string[] {
        return this.fleets;
    }
    addFleet(idFleet:string):void {
        if (!this.isInFleet(idFleet))
            this.fleets.push(idFleet);
        else
            throw new Error('Vehicle is already registered to this fleet'); 
    }
    isInFleet(idFleet:string):boolean {
        return this.fleets.includes(idFleet);
    }
    getLocation():GPSLocation {
        return this.location;
    }
    setLocation(location:GPSLocation):void {
        if(!this.location)
            this.location = location;
        else if (!this.getLocation().equals(location))
            this.location = location;
        else
            throw new Error('Vehicle is already parked at this location'); 
    }
}