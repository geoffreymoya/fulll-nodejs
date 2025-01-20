import * as assert from "assert";
import {Given, When, Then,Before } from "@cucumber/cucumber";
import {GPSLocation} from "../../src/Domain/GPSLocation.js";
import { Commands } from "../../src/App/Command.js";
import { Queries } from "../../src/App/Query.js";
import { MongoRepo } from "../../src/Infra/MongoRepo.js";
import { DBConfig } from "../../src/App/config.js";


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

  Before( async function () {
    let repo:MongoRepo = new MongoRepo(DBConfig.mongoUrl,DBConfig.modbName)
    await repo.connect();
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
Given('I have registered this vehicle into my fleet',async function(this:myWorld) {
    await this.cmd.registerVehicle(this.plateNumber,this.fleetId)
    
})
Given('a location',function(this:myWorld) {
    this.location = new GPSLocation(45.0,5.0,0.0)
    
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






