import { createCommand } from "commander";
import { MongoRepo } from "../Infra/MongoRepo.js";
import { Commands } from "./Command";
import { DBConfig } from "./config";


async function initRepo () {
  let repo = new MongoRepo(DBConfig.mongoUrl,DBConfig.modbName)
  await repo.connect();
  return new Commands(repo)
}


const program = createCommand();
program
  .name('fleet')
  .description('CLI to manage vehicle fleet')
  .version('1.0.0');

program.command('create <userId>')
  .description('create fleet')
  .action(async (userId) => {
    try {
      let cmd = await initRepo();
      let fleetId = await cmd.createFleet(userId);
      console.log(fleetId);
      await cmd.repo.close();
    }
    catch(error) {
      console.error(error.message);
    }
    process.exit();
  });

program.command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('register vehicle in fleet')
  .action(async(fleetId,vehiclePlateNumber) => {
    try {
      let cmd = await initRepo();
      await cmd.registerVehicle(vehiclePlateNumber,fleetId);
      await cmd.repo.close();
      console.log('vehicle registered');
    }
    catch(error) {
      console.error(error.message);
    }
    process.exit();
  });

program.command('localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]')
  .description('localize vehicle')
  .action(async(fleetId,vehiclePlateNumber,lat,lng,alt) => {
    try {
      let cmd = await initRepo();
      await cmd.localizeVehicle(vehiclePlateNumber,lat,lng,alt)
      await cmd.repo.close();
      console.log('vehicle localized');
     
    }
    catch(error) {
      console.error(error.message);
    }
    process.exit();
  });

  program.parseAsync();
