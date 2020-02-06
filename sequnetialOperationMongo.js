const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:23456';

let findSequnetially = function(dbName, collectionName, query){
    let promise = new Promise(function(resolve, error){
        const client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect(function(err) {
            if(err){
                error(err);
            }
            const db = client.db(dbName);
            db.collection(collectionName).findOne(query, function(err, document){
                if(err){
                    error(err);
                }
                client.close();
                resolve(document);
            });
          });
    });
    return promise;
}

let updateSequentially = function(dbName, collectionName, entity){
    let promise = new Promise(function(resolve, error){
        const client = new MongoClient(url, { useUnifiedTopology: true });
        client.connect(function(err) {
            if(err){
                error(err);
            }
            const db = client.db(dbName);
            db.collection(collectionName).update(entity, {$set: {name:"mobile devices"}});
            client.close();
            resolve("updated successfully");
        });
    });
    return promise;
}

let deleteSequentially = function(dbName, collectionName, entity){
    let promise = new Promise(function(resolve, error){
        const client = new MongoClient(url, { useUnifiedTopology: true});
        client.connect(function(err) {
            if(err){
                error(err);
            }
            const db = client.db(dbName);
            db.collection(collectionName).deleteOne(entity, function(err, document){
                if(err){
                    error(err);
                }
                client.close();
                resolve(document);
            });
        });
    });
    return promise;
}

let findSequnetiallyInDb = function(dbName, collectionName, queryArr, searchIndex){
    let startTime = Date.now();
    findSequnetially(dbName, collectionName, queryArr[searchIndex]).then((document) => {
        let endTime = Date.now();
        console.log("total time taken for sequrential find in seconds: "+ (endTime-startTime)/1000);
        console.log(document);
        searchIndex++;
        if(searchIndex < queryArr.length){
            console.log(searchIndex);
            findSequnetiallyInDb(dbName,  collectionName, queryArr, searchIndex);
        }
    }).catch();
}

let updateSequentiallyInDb = function(dbName, collectionName, queryArray, searchIndex){
    let startTime = Date.now();
    updateSequentially(dbName, collectionName, queryArray[searchIndex]).then((document) => {
        let endTime = Date.now();
        console.log("total time taken for sequrential update in seconds: "+ (endTime-startTime)/1000);
        console.log(document);
        searchIndex++;
        if(searchIndex < queryArray.length){
            updateSequentiallyInDb(dbName, collectionName, queryArray, searchIndex);
        }
    }).catch((err) =>{
        console.log(err);
    }); 
}

let deleteSequentiallyInDb = function(dbName, collectionName, queryArray, searchIndex){
    let startTime = Date.now();
    deleteSequentially(dbName, collectionName, queryArray[searchIndex]).then((document) => {
        let endTime = Date.now();
        console.log("total time taken for sequrential Delete in seconds: "+ (endTime-startTime)/1000);
        console.log(document);
        searchIndex++;
        if(searchIndex < queryArray.length){
            deleteSequentiallyInDb(dbName, collectionName, queryArray, searchIndex);
        }
    }).catch((err) =>{
        console.log(err);
    });
}
exports.findSequnetiallyInDb = findSequnetiallyInDb;
exports.updateSequentiallyInDb = updateSequentiallyInDb;
exports.deleteSequentially = deleteSequentiallyInDb;