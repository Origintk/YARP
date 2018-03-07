'use strict';
/**
 * @file Manager class
 */
module.exports = class Manager{

  static save(object){
    let collection = object.constructor.name.toLowerCase()+"s";
    yarp[collection][object._id] = object;
    yarp.db.save(collection, object);
  }

  static load(Class){
    return new Promise((resolve, reject) =>{
      let collection = (new Class).constructor.name.toLowerCase()+"s";
      let result = {};
      yarp.db.find(collection,{}).then((res) =>{
        for (let i = 0; i < res.length; i++){
          result[res[i]._id] = new Class(res[i]);
        }
        yarp[collection] = result;
        resolve();
      });
    });
  }
}