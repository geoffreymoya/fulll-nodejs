export class GPSLocation {
    id:string;
    lat:number | null;
    lng:number | null;
    alt:number | null;
    constructor(lat:number,lng:number,alt?:number) {
        this.lat = lat
        this.lng = lng
        this.alt = typeof alt !== 'undefined'?alt:-1
      }
      equals (location:GPSLocation):boolean {
        if(this.lat !== -1 && this.alt != location.alt)
            return false
        else
            return this.lat == location.lat && this.lng == location.lng
      }
}