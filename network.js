const constants  = require('./constants');
const tower  = require('./tower');
const sm  = require('./sm');
const wifi  = require('./wifi');
const device  = require('./device');
const mongo = require('./mongodb');

let buildNetwork = async function(startId,endId,numberOfWifis, numberOfSms, numberOfTowers){

    let buildNetowrkPromise = new Promise(function(resolve,err){
    //let startTime = Date.now();
    let devices = device.getDevices(startId,endId,numberOfWifis);
    let wifis = wifi.getWifis(numberOfWifis, numberOfSms);
    let sms = sm.getSms(numberOfSms, numberOfTowers);
    let towers = tower.getTowers(numberOfTowers); 

    interlinkDevices(devices, wifis);
    interlinkDevices(wifis, sms);
    interlinkDevices(sms, towers);
    insertTopEntity(towers);
    
    setTimeout(()=>{
        console.log("id reached: " + endId)
        resolve("id reached: " + endId);
        },
        200);
    });
    let completeNetwork = await buildNetowrkPromise;
    return "task finished";
}
let  interlinkDevices = function(childDevices, parentDevices ){
    let insertArray = [], collectionName;
    for(var key in childDevices){
        if(childDevices.hasOwnProperty(key)){
            let parentId =  childDevices[key].parent_Device;
            if(parentId != null && parentId != undefined){
                parentDevices[parentId].attached_Device.push(key);
            }
                childDevices[key]["id"] = key;
                insertArray.push(childDevices[key]);
                if(!collectionName){
                    collectionName = childDevices[key].name;
                }
                
        }
    }
    mongo.doInsert("usa_network",collectionName, insertArray);
}
let insertTopEntity = function(parentMostDevice){
    let insertArray = [], collectionName;
    for(var key in parentMostDevice){
        if(parentMostDevice.hasOwnProperty(key)){
            parentMostDevice[key]["id"] = key;
            insertArray.push(parentMostDevice[key]);
            if(!collectionName){
                collectionName = parentMostDevice[key].name;
            }
        }
    }
    mongo.doInsert("usa_network",collectionName, insertArray);
}

let buildBatch = function(bsDevs, numberOfDevice){
    let batchDev = numberOfDevice/bsDevs;
    return batchDev;
}

let establishNetwork = function(numberOfDevice, numberOfWifis, numberOfSms, numberOfTowers){
    let startTime = Date.now();
    let numberOfBatches = 500;
    let batchSize = buildBatch(numberOfBatches, numberOfDevice);
    let startId =1,i=1;
    let getRecursively = function(sId,iter){
        if(iter<= numberOfBatches){
            let endId = iter*batchSize;
            iter++;
            buildNetwork(sId,endId, numberOfWifis, numberOfSms, numberOfTowers).then((resolve)=>{
                console.log(resolve);
                getRecursively(endId,iter);
            });
        }
    }
    getRecursively(startId,i); 
    let endTime = Date.now();
    console.log("total time taken to complete process in seconds : "+ (endTime-startTime)/1000);
}
establishNetwork(10000000,10000,2000,800);
//console.log(generateWifiIds(10, 10, 10, 10));