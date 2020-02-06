const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:23456';

const assert = require('assert');
const dbName = 'myproject';

let insertInDb = function (dbName, collectionName, entity) {
    let promise = new Promise(function (resolve, error) {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect(function (err) {
            if (err) {
                error(err);
            }
            const db = client.db(dbName);
            db.collection(collectionName).insertMany(entity, function (err, r) {
                if (err) {
                    error(err);
                }
                resolve("inserted successfully");
                client.close();
            });
        });
    });
    return promise;
}

let findSingle = function (dbName, collectionName, query) {
    let promise = new Promise(function (resolve, error) {
        let client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect(function (err) {
            if (err) {
                error(err);
            }
            const db = client.db(dbName);
            db.collection(collectionName).findOne(query, function (err, document) {
                if (err) {
                    error(err);
                }
                client.close();
                resolve(document);
            });
        });
    });
    return promise;
}

let find =  function (dbName, collectionName, query) {
    let promise = new Promise( function (resolve, error) {
        let client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect( async function (err) {
            if (err) {
                error(err);
            }
            const db = client.db(dbName);
            let myCursor = db.collection(collectionName).find(query);
            let numberOfEntries = 0;
            while( await myCursor.hasNext()) {
              const doc = await myCursor.next();
              numberOfEntries++;
              console.log(doc);
            }
            console.log(numberOfEntries);
            client.close();
            resolve("search completed");
        });
    });
    return promise;
}

let updateAsynchronus = function (dbName, collectionName, entity) {
    let promise = new Promise(function (resolve, error) {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect(function (err) {
            if (err) {
                error(err);
            }
            const db = client.db(dbName);
            let updatePromise = db.collection(collectionName).updateMany(entity, { $set: { name: "obsolete devices" } });
            updatePromise.then(() => { 
                client.close(); 
                resolve("updated successfully");
            }).catch();
            
        });
    });
    return promise;
}

let deleteAsynchronus = function (dbName, collectionName, entity) {
    let promise = new Promise(function (resolve, error) {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect(function (err) {
            if (err) {
                error(err);
            }
            const db = client.db(dbName);
            db.collection(collectionName).deleteOne(entity, function (err, document) {
                if (err) {
                    error(err);
                }
                client.close();
                resolve(document);
            });
        });
    });
    return promise;
}

let findAsynchronusInDb = function (dbName, collectionName, queryArray) {
    let index = 1;
    let findPromise = new Promise((resolve, error) => {
        queryArray.forEach((element) => {
            findSingle(dbName, collectionName, element).then((document) => {
                console.log(document);
                index++;
                if (index > queryArray.length) {
                    resolve("job finsinshed");
                }
            }).catch((err) => {
                console.log(error);
                //error(err);
            });
        });
    });
    return findPromise;
}

let updateAsynchronusInDb = function (dbName, collectionName, queryArray) {
    let index = 1;
    let updatePromise = new Promise((resolve, error) => {
        queryArray.forEach((element) => {
            updateAsynchronus(dbName, collectionName, element).then((document) => {
                console.log(document);
                index++;
                if (index > queryArray.length) {
                    resolve("job finsinshed");
                }
            }).catch((err) => {
                //console.log(err);
                //error(err);
            });
        });
    });
    return updatePromise;
}

let deleteAsynchronusInDb = function (dbName, collectionName, queryArray) {
    let index = 1;
    let deletePromise = new Promise((resolve, error) => {
        queryArray.forEach((element) => {
            deleteAsynchronus(dbName, collectionName, element).then((document) => {
                console.log(document);
                index++;
                if (index > queryArray.length) {
                    resolve("job finsinshed");
                }
            }).catch((err) => {
                console.log(err);
                error(err);
            });
        });
    });
    return deletePromise;
}

let doInsert = function (dbName, collectionName, entity) {
    let startTime = Date.now();
    insertInDb(dbName, collectionName, entity).then((message) => {
        let endTime = Date.now();
        console.log("Time taken to insert one batch for " + collectionName + " in seconds is: " + (endTime - startTime) / 1000);
        //console.log(message);
    }).catch((err) => {
        console.log("errror count");
    });
}

exports.findAsynchronusInDb = findAsynchronusInDb;
exports.updateAsynchronusInDb = updateAsynchronusInDb;
exports.deleteAsynchronusInDb = deleteAsynchronusInDb;
exports.find = find;
exports.doInsert = doInsert;