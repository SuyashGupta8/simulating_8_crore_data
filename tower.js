const constants  = require('./constants');

const location = ["America", "India", "Austrailia", "china", "Russia", "Brazil", "Germany"];
const cpu = ["1", "2", "3", "4", "8", "9", "12"];
let  toweIds;

let getTower = function(serialNumber ){
    this.tower_data = {};
    this.tower_data[toweIds[serialNumber%toweIds.length]]={
        name : "tower",        
        cpu : cpu[serialNumber%7],
        loc:location[serialNumber%7], 
        fbData:null,
        youTubeData:null,
        googleData:null,
        attached_Device : [],
        timeStamp:Date.now()
    }
    return this.tower_data;
}

let getTowers = function(numberOfTowers){
    toweIds = constants.generateTowerIds(numberOfTowers);
    let towers = {};
    for(i=1; i<=numberOfTowers; i++){
       let tower = new getTower(i);
       for(var key in tower){
           if(tower.hasOwnProperty(key)){
               towers[key] = tower[key]; 
           }
       }
    }
    return towers;
}

exports.getTowers = getTowers;