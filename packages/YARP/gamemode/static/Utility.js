'use strict';
/**
 * @file Utility class
 */
 
module.exports = class Utility {
  /**
  * Get formatted date and time.
  * @param {Date} date - date
  */
  static getTimestamp(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    var date = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
    return date;
  }

  /**
  * Round numbers by the amount of decimals.
  *
  * @param {Number} value - value to be rounded
  * @param {Number} decimals - how many decimals
  */
  static round(value, decimals){
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  static Vector3Offset(vector,offset){
    return new mp.Vector3(vector.x+offset.x,vector.y+offset.y,vector.z+offset.z);
  }

  static Vector3Distance(vector1,vector2){
    let dx = vector1.x - vector2.x;
    let dy = vector1.y - vector2.y;
    let dz = vector1.z - vector2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
  }

  static randomString(digits,possible){
    var text = '';

    for (var i = 0; i < digits; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  static getSubstrings(string){
    var current;
    var pattern = /'.*?'/g;
    var result = [];
    while(current = pattern.exec(string)) {
      if (current) {
        result.push(current[0].replace(new RegExp('\'', 'g'), ''));
      }
    }
    return result;
  }

  static getParamNames(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
      result = [];
    return result;
  }

  static parseParams(obj){
    let obj_p = '';
    if (typeof obj === 'string') {
      return '\''+obj+'\'';
    }
    else if (typeof obj === 'boolean' || typeof obj === 'number') {
      return obj.toString();
    }
    else if (obj instanceof Array) {
      obj_p = '['
      for (let o of obj){
        obj_p = obj_p+' '+this.parseParams(o)+','
      }
      if (obj.length > 0){
        obj_p = obj_p.slice(0, -1);
      }
      return obj_p+' ]';
    }
    else if (obj instanceof Object) {
      obj_p = '{'
      for (let k in obj) {
        obj_p = obj_p+' \''+k+'\': '+this.parseParams(obj[k])+',';
      }
      if (Object.keys(obj).length > 0){
        obj_p = obj_p.slice(0, -1);
      }
      return obj_p+' }';
    }
    else if (obj instanceof Function) {
      return obj.toString();
    }
    return obj_p;
  }

  static getTimezone(timezone) {
    let date = new Date();
    let h = date.getUTCHours() + timezone;
    let m = date.getUTCMinutes();
    let s = date.getUTCSeconds();
    let dd = date.getUTCDate();
    let mm = date.getUTCMonth()+1; // January is 0
    let yy = date.getUTCFullYear();
    if (timezone < 0) {
      if (h < 0) {
        h = 24 + h;
        dd--;
      }
      if (dd == 0) {
        mm--;
        if (mm == 0) {
          mm = 12;
          yy--;
        }
        if (mm == 2) {
          if (yy % 100 != 0 && yy % 4 == 0 || yy % 400 == 0) {
            dd = 29;
          } else {
            dd = 28;
          }
        } else if (mm % 2 == 0) {
          dd = 30;
        } else {
          dd = 31;
        }
      }
    } else if (timezone > 0) {
      if (h > 23) {
        h = h - 24;
        dd++;
      }
      if (mm == 2) {
        if (yy % 100 != 0 && yy % 4 == 0 || yy % 400 == 0) {
          if (dd > 29) {
            dd = 1;
            mm++;
          }
        } else {
          if (dd > 28) {
            dd = 1;
            mm++;
          }
        }
      } else if (mm % 2 == 0) {
        if (dd > 30) {
          dd = 1;
          mm++; // ^
        }
      } else {
        if (dd > 31) {
          dd = 1;
          mm++;
        }
      }
      if (mm > 12) {
        mm = 1;
        yy++
      }
    }
    return {h:h,m:m,s:s,dd:dd,mm:mm,yy:yy};
  }
}
