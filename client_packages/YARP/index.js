'use strict';
/**
* @file YARP server main
*/

global.yarp = {}
yarp.utils = require('./YARP/gamemode/static/Utility.js');

//Load RAGE.MP Events
require('./YARP/events/ragemp/browser.js');
require('./YARP/events/ragemp/checkpoint.js');
require('./YARP/events/ragemp/colshape.js');
require('./YARP/events/ragemp/player.js');
require('./YARP/events/ragemp/stream.js');
require('./YARP/events/ragemp/ui.js');
require('./YARP/events/ragemp/vehicle.js');
require('./YARP/events/ragemp/waypoint.js');

//Load YARP Events
require('./YARP/events/yarp/bank.js');
require('./YARP/events/yarp/character.js');
require('./YARP/events/yarp/command.js');
require('./YARP/events/yarp/gamemode.js');
require('./YARP/events/yarp/inventory.js');
require('./YARP/events/yarp/menu.js');
require('./YARP/events/yarp/weapon.js');
