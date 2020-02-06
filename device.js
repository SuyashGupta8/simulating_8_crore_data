const mongo = require('./mongodb');
const constants  = require('./constants');
const uuidv1 = require('uuid/v1')
const location = ["America", "India", "Austrailia", "china", "Russia", "Brazil", "Germany"];
const cpu = ["1", "2", "3", "4", "8", "9", "12"];
let  wifiIds, deviceIds;
const delimiter = "-";

let getDevice = function(serialNumber ){
    this.devcie_data = {};
    this.subscriptionId = uuidv1();
    this.devcie_data[this.subscriptionId + delimiter + deviceIds[serialNumber%deviceIds.length]] ={
        name: "device",        
        cpu: cpu[serialNumber%7],
        loc:location[serialNumber%7], 
        fbData:Math.random(),
        youTubeData:Math.random(),
        googleData:Math.random(),
        parent_Device : wifiIds[serialNumber%wifiIds.length],
        timeStamp:Date.now()
    }
    return this.devcie_data;
}

let getDevices = function(devStartid,deviceEndId, numberOfWifis){
    deviceIds=constants.generateDeviceIds(devStartid,deviceEndId);
    wifiIds=constants.generateWifiIds(numberOfWifis);
    let devices = {};
    for(i=devStartid; i<=deviceEndId; i++){
       dev = new getDevice(i);
       for(var key in dev){
           if(dev.hasOwnProperty(key)){
               devices[key] = dev[key]; 
           }
       }
    }
    return devices;
}

let updateDeviceInDb = function(numberOfDevice, numberOfWifis){
    deviceIds=constants.generateDeviceIds(numberOfDevice);
    wifiIds=constants.generateWifiIds(numberOfWifis);
    for(i=1; i<=numberOfDevice; i++){
       let dev = new getDevice(i);
       for(var key in dev){
        if(dev.hasOwnProperty(key)){
            mongo.doInsert("network",dev[key].name, dev);
        }
      }   
    }
}

exports.getDevices = getDevices;
exports.updateDeviceInDb = updateDeviceInDb;