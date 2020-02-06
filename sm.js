const constants  = require('./constants');

const location = ["America", "India", "Austrailia", "china", "Russia", "Brazil", "Germany"];
const cpu = ["1", "2", "3", "4", "8", "9", "12"];
let  toweIds,smIds;

let getSm = function(serialNumber ){
    this.sm_data = {};
    this.sm_data[smIds[serialNumber%smIds.length]]={
        name : "sm",        
        cpu : cpu[serialNumber%7],
        parent_Device : toweIds[serialNumber%toweIds.length],
        loc:location[serialNumber%7], 
        fbData:null,
        youTubeData:null,
        googleData:null,
        attached_Device : [],
        timeStamp:Date.now()
    }
    return this.sm_data;
}

let getSms = function(numberOfSms, numberOfTowers){
    smIds = constants.generateSmIds(numberOfSms);
    toweIds = constants.generateTowerIds(numberOfTowers);
    let sms = {};
    for(i=1; i<=numberOfSms; i++){
       let sm = new getSm(i);
       for(var key in sm){
           if(sm.hasOwnProperty(key)){
               sms[key] = sm[key]; 
           }
       }
    }
    return sms;
}

let updateDeviceInDb = function(numberOfDevice, numberOfWifis){
    smIds = constants.generateSmIds(numberOfSms);
    toweIds = constants.generateTowerIds(numberOfTowers);
    for(i=1; i<=numberOfDevice; i++){
       dev = new getDevice(i);
       for(var key in dev){
        if(dev.hasOwnProperty(key)){
            mongo.doInsert("network",dev[key].name, dev);
        }
      }   
    }
}
exports.getSms = getSms;