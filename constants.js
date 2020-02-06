const uuidv1 = require('uuid/v1')
const location = ["America", "India", "Austrailia", "china", "Russia", "Brazil", "Germany"];
const cpu = ["1", "2", "3", "4", "8", "9", "12"];
const delimiter = "-";

let generateWifiIds = function(numberOfIds){
    let wifiIds =  [];
    for(i=1;i<=numberOfIds;i++){
        wifiIds[i] = "new wi" + delimiter+ "fi" + delimiter +i;
    }
    return wifiIds;
}

let generateSmIds = function(numberOfIds){
    let smIds =  [];
    for(i=1;i<=numberOfIds;i++){
        smIds[i] = "new sm" + delimiter+ "id" + delimiter +i;
    }
    return smIds;
}

let generateDeviceIds = function(startId,endId){
    let deviceIds =  [];
    for(i=startId;i<=endId;i++){
        deviceIds[i] = "device" + delimiter+ "new_id_c" + delimiter +i;
    }
    return deviceIds;
}
let generateTowerIds = function(numberOfIds){
    let towerIds =  [];
    for(i=1;i<=numberOfIds;i++){
        towerIds[i] = "new t" + delimiter+ "id" + delimiter +i;
    }
    return towerIds;
}
exports.generateDeviceIds = generateDeviceIds;
exports.generateWifiIds = generateWifiIds;
exports.generateSmIds = generateSmIds;
exports.generateTowerIds = generateTowerIds;