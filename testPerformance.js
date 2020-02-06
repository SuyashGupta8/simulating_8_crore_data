const sequentialOperation = require('./sequnetialOperationMongo');
const mongo = require('./mongodb');

let devDataToFind = [{ "timeStamp": 1580749301064, "id": "d9318cfc-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999719" }, { "timeStamp": 1580749301064, "id": "d9318cfb-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999718" }, { "timeStamp": 1580749301064, "id": "d9318cf9-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999716" }, { "timeStamp": 1580749301064, "id": "d9318cf7-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999714" }, { "timeStamp": 1580749301064, "id": "d9318cf6-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999713" }, { "timeStamp": 1580749301064, "id": "d9318cf5-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999712" }, { "timeStamp": 1580749301064, "id": "d9318cf4-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999711" }, { "timeStamp": 1580749301064, "id": "d9318cee-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999705" }, { "timeStamp": 1580749301064, "id": "d9318cec-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999703" }, { "timeStamp": 1580749301064, "id": "d9318ceb-46a6-11ea-9d5b-43fa667cec99-device-new_id_c-9999702" }];

let wifiDataToFind = [{ "timeStamp": 1580749301083, "id": "new wi-fi-4720" }, { "timeStamp": 1580749301083, "id": "new wi-fi-4718" }, { "timeStamp": 1580749301082, "id": "new wi-fi-4706" }, { "timeStamp": 1580749301083, "id": "new wi-fi-4709" }, { "timeStamp": 1580749301083, "id": "new wi-fi-4708" }, { "timeStamp": 1580749301083, "id": "new wi-fi-4712" }, { "timeStamp": 1580749301082, "id": "new wi-fi-4703" }, { "timeStamp": 1580749301083, "id": "new wi-fi-4713" }, { "timeStamp": 1580749301083, "id": "new wi-fi-4716" }, { "timeStamp": 1580749301082, "id": "new wi-fi-4707" }];


let findInDb = function (dbName, collectionName, query) {
    let startTime = Date.now();
    let findDevicecPromise = mongo.find(dbName, collectionName, query);
    findDevicecPromise.then(() => {
        console.log("total time taken for finding " + collectionName + " in second  :" + (Date.now() - startTime) / 1000);
    }).catch((err) => {

    });
}

let findsOneSequentially = function (dbName, collectionName, querryArray) {
    sequentialOperation.findSequnetiallyInDb(dbName, collectionName, querryArray, 0);
}

let findsOneAsynchronusly = function (dbName, collectionName, querryArray) {
    let startTime = Date.now();
    let findWifiPromise = mongo.findAsynchronusInDb(dbName, collectionName, querryArray);
    findWifiPromise.then(() => {
        console.log("total time taken for finding " + collectionName + " in second  :" + (Date.now() - startTime) / 1000);
    }).catch((err) => {

    });
}

let updateInDb = function (dbName, collectionName, querryArray) {
    let startTime = Date.now();
    let updateDevicecPromise = mongo.updateAsynchronusInDb(dbName, collectionName, querryArray);
    updateDevicecPromise.then(() => {
        console.log("total time taken for updating " + collectionName + " in second  :" + (Date.now() - startTime) / 1000);
    }).catch((err) => {

    });

}

//testing code
/* findInDb("network", "device", { "name": 'multi purpose devices' });
findsOneSequentially("network", "device", wifiDataToFind);
findsOneAsynchronusly("network", "device", wifiDataToFind);
updateInDb("network", "device", [{ "name": "old devices" }]); */