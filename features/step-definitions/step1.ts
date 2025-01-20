import * as assert from "assert";
import {Given, When, Then,Before } from "@cucumber/cucumber";
import {GPSLocation} from "../../src/Domain/GPSLocation.js";
import { MemRepo } from "../../src/Infra/MemRepo.js";
import { Commands } from "../../src/App/Command.js";
import { Queries } from "../../src/App/Query.js";
import { IRepo } from "../../src/Infra/IRepo.js";


interface myWorld {
    userId: string
    otherUserId:string
    fleetId:string
    otherFleetId:string
    plateNumber:string
    location:GPSLocation
    errorMsg:string
    cmd:Commands
    query:Queries
  }

  Before( function () {
    let repo:IRepo = new MemRepo()
    this.cmd = new Commands(repo)
    this.query = new Queries(repo)

  });

Given('my fleet',async function(this:myWorld) {

    this.userId = await this.cmd.createUser()
    this.fleetId = await this.cmd.createFleet(this.userId)
   
})
Given('a vehicle',async function(this:myWorld) {
    this.plateNumber = await this.cmd.createVehicle("AA-123-AA");
})
   
Given('the fleet of another user',async function(this:myWorld) {
    this.otherUserId = await this.cmd.createUser()
    this.otherFleetId = await this.cmd.createFleet(this.otherUserId)
})

Given('this vehicle has been registered into the other user\'s fleet',async function(this:myWorld) {
    await this.cmd.registerVehicle(this.plateNumber,this.otherFleetId)
    
})
Given('I have registered this vehicle into my fleet',async function(this:myWorld) {
    await this.cmd.registerVehicle(this.plateNumber,this.fleetId)
    
})
Given('a location',function(this:myWorld) {
    this.location = new GPSLocation(45.0,5.0,0.0)
    
})
Given('my vehicle has been parked into this location', async function(this:myWorld) {
    await this.cmd.localizeVehicle(this.plateNumber,this.location.lat,this.location.lng,this.location.alt)
})


When('I register this vehicle into my fleet', async function(this:myWorld) {
    await this.cmd.registerVehicle(this.plateNumber,this.fleetId)
    
})
Then('this vehicle should be part of my vehicle fleet',async function(this:myWorld) {
    assert.ok(await this.query.isRegistered(this.plateNumber,this.fleetId))
   
})

When('I park my vehicle at this location', async function(this:myWorld) {
    await this.cmd.localizeVehicle(this.plateNumber,this.location.lat,this.location.lng,this.location.alt)
    
})
Then('the known location of my vehicle should verify this location',async function(this:myWorld) {
    assert.ok(this.location.equals( await this.query.whereisVehicle(this.plateNumber)))
    
})




When('I try to park my vehicle at this location', async function(this:myWorld) {
    try {  
        await this.cmd.localizeVehicle(this.plateNumber,this.location.lat,this.location.lng,this.location.alt)
    }
    catch(err) {
        this.errorMsg = err.message;
    }
    
    
})
Then('I should be informed that my vehicle is already parked at this location',function(this:myWorld) {
   
    assert.strictEqual(this.errorMsg,"Vehicle is already parked at this location")
   
})




When('I try to register this vehicle into my fleet',async function(this:myWorld) {
    try {  
        await this.cmd.registerVehicle(this.plateNumber,this.fleetId)
    }
    catch(err) {
        this.errorMsg = err.message;
    }
    
})
Then('I should be informed this this vehicle has already been registered into my fleet',function(this:myWorld) {
    assert.strictEqual(this.errorMsg,"Vehicle is already registered to this fleet")
    
})





