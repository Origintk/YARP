'use strict';
/**
* @file YARP server main
*/

global.yarp = {};
global.chalk = require('chalk');
(async () => {
  //Loading Requirements
  console.log(chalk.yellowBright('[YARP] ')+'Loading Requirements');
  try {
    yarp.utils = require('./gamemode/static/Utility');
    yarp.db = require('./gamemode/static/MongoDB');
    yarp.dbm = require('./gamemode/static/DBManager');
    yarp.gmo = require('./gamemode/abstract/GMObject');
    await yarp.dbm.connect();
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'RequirementError: '+err.message+'\n'+err.stack);
  }

  //Loading Classes
  console.log(chalk.yellowBright('[YARP] ')+'Loading Objects');
  try {
    yarp.Blip = require('./gamemode/object/Blip');
    yarp.Character = require('./gamemode/object/Character');
    yarp.Checkpoint = require('./gamemode/object/Checkpoint');
    yarp.Colshape = require('./gamemode/object/Colshape');
    yarp.Command = require('./gamemode/object/Command');
    yarp.Door = require('./gamemode/object/Door');
    yarp.Event = require('./gamemode/object/Event');
    yarp.Group = require('./gamemode/object/Group');
    yarp.Hotkey = require('./gamemode/object/Hotkey');
    yarp.Item = require('./gamemode/object/Item');
    yarp.Label = require('./gamemode/object/Label');
    yarp.Location = require('./gamemode/object/Location');
    yarp.Marker = require('./gamemode/object/Marker');
    yarp.Npc = require('./gamemode/object/Npc');
    yarp.Pool = require('./gamemode/object/Pool');
    yarp.Prop = require('./gamemode/object/Prop');
    yarp.Transaction = require('./gamemode/object/Transaction');
    yarp.User = require('./gamemode/object/User');
    yarp.Variable = require('./gamemode/object/Variable');
    yarp.Vehicle = require('./gamemode/object/Vehicle');
    yarp.Weapon = require('./gamemode/object/Weapon');
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'ClassError: '+err.message+'\n'+err.stack);
  }

  //Loading Pools
  try {
    console.log(chalk.yellowBright('[YARP] ')+'Loading Pools');
    yarp.blips = new yarp.Pool(yarp.Blip);
    yarp.characters = new yarp.Pool(yarp.Character);
    yarp.checkpoints = new yarp.Pool(yarp.Checkpoint);
    yarp.colshapes = new yarp.Pool(yarp.Colshape);
    yarp.commands = new yarp.Pool(yarp.Command);
    yarp.doors = new yarp.Pool(yarp.Door);
    yarp.events = new yarp.Pool(yarp.Event);
    yarp.groups = new yarp.Pool(yarp.Group);
    yarp.hotkeys = new yarp.Pool(yarp.Hotkey);
    yarp.items = new yarp.Pool(yarp.Item);
    yarp.labels = new yarp.Pool(yarp.Label);
    yarp.locations = new yarp.Pool(yarp.Location);
    yarp.markers = new yarp.Pool(yarp.Marker);
    yarp.npcs = new yarp.Pool(yarp.Npc);
    yarp.props = new yarp.Pool(yarp.Prop);
    yarp.transactions = new yarp.Pool(yarp.Transaction);
    yarp.users = new yarp.Pool(yarp.User);
    yarp.variables = new yarp.Pool(yarp.Variable);
    yarp.vehicles = new yarp.Pool(yarp.Vehicle);
    yarp.weapons = new yarp.Pool(yarp.Weapon);
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'PoolError: '+err.message+'\n'+err.stack);
  }

  //Loading Data
  console.log(chalk.yellowBright('[YARP] ')+'Loading Data');
  try {
    await yarp.blips.load();
    await yarp.characters.load();
    await yarp.checkpoints.load();
    await yarp.colshapes.load();
    await yarp.commands.load();
    await yarp.doors.load();
    await yarp.events.load();
    await yarp.groups.load();
    await yarp.hotkeys.load();
    await yarp.items.load();
    await yarp.labels.load();
    await yarp.locations.load();
    await yarp.markers.load();
    await yarp.npcs.load();
    await yarp.props.load();
    await yarp.transactions.load();
    await yarp.users.load();
    await yarp.variables.load();
    await yarp.vehicles.load();
    await yarp.weapons.load();
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'DataError: '+err.message+'\n'+err.stack);
  }

  //Loading Config
  try {
    console.log(chalk.yellowBright('[YARP] ')+'Loading Configs');
    yarp.blips.config('../config/blips');
    yarp.characters.config('../config/characters');
    yarp.checkpoints.config('../config/checkpoints');
    yarp.colshapes.config('../config/colshapes');
    yarp.commands.config('../config/commands');
    yarp.doors.config('../config/doors');
    yarp.events.config('../config/events');
    yarp.groups.config('../config/groups');
    yarp.hotkeys.config('../config/hotkeys');
    yarp.items.config('../config/items');
    yarp.labels.config('../config/labels');
    yarp.locations.config('../config/locations');
    yarp.markers.config('../config/markers');
    yarp.npcs.config('../config/npcs');
    yarp.props.config('../config/props');
    yarp.transactions.config('../config/transactions');
    yarp.users.config('../config/users');
    yarp.variables.config('../config/variables');
    yarp.vehicles.config('../config/vehicles');
    yarp.weapons.config('../config/weapons');
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'ConfigError: '+err.message+'\n'+err.stack);
  }

  try {
    //Load RAGE.MP Events
    console.log(chalk.yellowBright('[YARP] ')+'Loading Events');
    require('./events/ragemp/checkpoint.js');
    require('./events/ragemp/colshape.js');
    require('./events/ragemp/entity.js');
    require('./events/ragemp/player.js');
    require('./events/ragemp/stream.js');
    require('./events/ragemp/vehicle.js');
    require('./events/ragemp/waypoint.js');
    require('./events/ragemp/world.js');

    //Load YARP Events
    require('./events/yarp/character.js');
    require('./events/yarp/gamemode.js');
    require('./events/yarp/item.js');
    require('./events/yarp/menu.js');
  } catch(err) {
    console.log(chalk.redBright('[YARP] ')+'EventError: '+err.message+'\n'+err.stack);
  }

  //Loading Complete
  console.log(chalk.greenBright('[YARP] ')+'Loading Complete');

  //Rejoin Players
  mp.players.forEach((player, i) => {
    mp.events.call('playerJoin', player)
  });
})();
