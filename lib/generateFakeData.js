let fs = require('fs');
const faker = require('faker')
const moment = require('moment')
const RandExp = require('randexp');
const parseRegex = require("regex-parser")

let rowFormats = require(`../${process.argv[2]}`)
let fileName = process.argv[2].split(".")[0]+".csv"
let iterations = process.argv[3]
let format = process.argv[4]
if(format == "csv") {
    let fileName = process.argv[2].split(".")[0]+".csv"
    let file = fs.createWriteStream(fileName);
    generateInCSV(file)
}
else {
    let fileName = process.argv[2].split(".")[0]+"_data.json"
    let file = fs.createWriteStream(fileName);
    generateInJSON(file)    
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ifModeNullabe(jsonVal, value) {
    let choice_arr = [value, "null"]
    if(jsonVal.hasOwnProperty('mode') && jsonVal.mode == "NULLABLE") {
        let index = getRandomInt(0, 1)
            return choice_arr[index]
    }
    else {
        return value
    }
}

/**
 * Generates a pseudo random number of length n
 * 
 * @param {number} n The required length of the random number
 * @returns {number}
 */
function generate (n) {
    var add = 1, max = 12 - add; 
    if ( n > max ) {
        return this.generate(max) + this.generate(n - max);
    }
    max        = Math.pow(10, n+add);
    var min    = max/10; 
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ("" + number).substring(add).toString(); 
}

function whileNested(rowFormats, objs) {
    if(rowFormats.type.toLowerCase() != "repeatedrecords") {
      let data = switchBetweenFormats(rowFormats)
      return data
    }
    else {
      objs = {}
      rowFormats.repeatedValues.map(function(item){
          let data = whileNested(item, objs)
          if(data != 'null') {
            objs[item.name] = data
          }
      })
      return objs
    }
  }

function switchBetweenFormats(rowFormats, obj) {
    switch(rowFormats.type.toLowerCase()) {
        case "string":
        return ifModeNullabe(rowFormats, `${eval(`faker.internet.password(10, false, /[0-9A-Z]/)`)}`)
        break;
        case "regex":
            return ifModeNullabe(rowFormats, `${new RandExp(parseRegex(rowFormats.subType)).gen()}`)
        break;
        case "randchoice":
        let index = getRandomInt(0, rowFormats.choices.length-1)
            return ifModeNullabe(rowFormats,`${rowFormats.choices[index]}`)
        break;
        case "constant":
            return ifModeNullabe(rowFormats, `${rowFormats.defaultVal}`)
        break;
        case "numbers":
            return ifModeNullabe(rowFormats,`${generate(5)}`)
        break;
        case "timestamp":
            return `${moment().subtract(10, 'days').unix()}`
        break;
        case "repeatedstring":
            arr = []
            Array(rowFormats.details.numberOfrepeatedRecords).fill().map((item, i)=>{ 
                let type = rowFormats.details.type
                let subType = rowFormats.details.subType
                arr.push(ifModeNullabe(rowFormats,`${eval(`faker.${type}.${subType}().toString().replace(/,/g, ' ');`)}`))
             })
             let data = ifModeNullabe({"mode":"NULLABLE"}, arr)
             if(data == 'null') {
                 return []
             }
             else {
                 return data
             }
        break;
        case "date":
        if(!rowFormats.subType) {
            return ifModeNullabe(rowFormats,`${moment(faker.date.past()).format('YYYY-MM-DD')}`)
        }
        else {
            return ifModeNullabe(rowFormats,`${moment(faker.date.past()).format(rowFormats.subType)}`)
        }
        break;
        default:
        let type = rowFormats.type
        let subType = rowFormats.subType
        if(typeof eval(`faker.${type}.${subType}()`) == "string") {
            return ifModeNullabe(rowFormats,`${eval(`faker.${type}.${subType}().replace(/,/g, ' ');`)}`)
        }
        else {
            return ifModeNullabe(rowFormats,`${eval(`faker.${type}.${subType}();`)}`)
        }   
    }
}

function generateInCSV(file) {
for(var i=0; i < iterations; i++){
    let dataString = []
    for(let j in rowFormats) {
        switch(rowFormats[j].type.toLowerCase()) {
            case "string":
            dataString.push(ifModeNullabe(rowFormats[j], `${eval(`faker.internet.password(10, false, /[0-9A-Z]/)`)}`))
            break;
            case "regex":
            dataString.push(ifModeNullabe(rowFormats[j], `${new RandExp(parseRegex(rowFormats[j].subType)).gen()}`))
            break;
            case "randchoice":
            let index = getRandomInt(0, rowFormats[j].choices.length-1)
            dataString.push(ifModeNullabe(rowFormats[j],`${rowFormats[j].choices[index]}`))
            break;
            case "constant":
            dataString.push(ifModeNullabe(rowFormats[j], `${rowFormats[j].defaultVal}`))
            break;
            case "numbers":
            dataString.push(ifModeNullabe(rowFormats[j],`${generate(5)}`))
            break;
            case "timestamp":
                dataString.push(`${moment().subtract(10, 'days').unix()}`)
            break;
            case "date":
            if(!rowFormats[j].subType) {
                dataString.push(ifModeNullabe(rowFormats[j],`${moment(faker.date.past()).format('YYYY-MM-DD')}`))
            }
            else {
                dataString.push(ifModeNullabe(rowFormats[j],`${moment(faker.date.past()).format(rowFormats[j].subType)}`))
            }
            break;
            default:
            let type = rowFormats[j].type
            let subType = rowFormats[j].subType
            if(typeof eval(`faker.${type}.${subType}()`) == "string") {
                dataString.push(ifModeNullabe(rowFormats[j],`${eval(`faker.${type}.${subType}().replace(/,/g, ' ');`)}`))
            }
            else {
                dataString.push(ifModeNullabe(rowFormats[j],`${eval(`faker.${type}.${subType}();`)}`))
            }   
        }
    }
    dataString.push(i)
    file.write(dataString.join(",") + '\n');
}
file.end();
}

function generateInJSON(file) {
    for(var i=0; i < iterations; i++){
        let obj = {}
        for(let j in rowFormats) {
            if(rowFormats[j].type.toLowerCase() == "repeatedrecords") {
                obj[`${rowFormats[j].name}`] = whileNested(rowFormats[j], {})
            }
            else {
                let data = switchBetweenFormats(rowFormats[j])
                if(data != 'null') {
                    obj[`${rowFormats[j].name}`] = data
                }
                
            }
        }
        obj["internal_data_gen_id"] = i
        file.write(JSON.stringify(obj) + '\n')
    }
    file.end()
    let fileNameArr = fileName.split(".")[0].split("_")
    console.log(fileNameArr.join("_")+".json")
}