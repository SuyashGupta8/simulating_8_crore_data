const constants  = require('./constants');

let  wifiIds,smIds;
const location = ["America", "India", "Austrailia", "china", "Russia", "Brazil", "Germany"];
const cpu = ["1", "2", "3", "4", "8", "9", "12"];

let getWifi = function(serialNumber ){
    this.wifi_data = {};
    this.wifi_data[wifiIds[serialNumber%wifiIds.length]]={
        name : "wi-fi",        
        cpu : cpu[serialNumber%7],
        parent_Device : smIds[serialNumber%smIds.length],
        loc:location[serialNumber%7], 
        fbData:null,
        youTubeData:null,
        googleData:null,
        attached_Device : [],
        timeStamp:Date.now()
    }
    return this.wifi_data;
}

let getWifis = function(numberOfWifis, numberOfSmIds){
    wifiIds=constants.generateWifiIds(numberOfWifis);
    smIds=constants.generateSmIds(numberOfSmIds);
    let wifis = {};
    for(i=1; i<=numberOfWifis; i++){
       let wifi = new getWifi(i);
       for(var key in wifi){
           if(wifi.hasOwnProperty(key)){
               wifis[key] = wifi[key]; 
           }
       }
    }
    return wifis;
}

exports.getWifis = getWifis;