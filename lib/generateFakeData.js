let fs = require('fs');
const faker = require('faker')
const moment = require('moment')
const RandExp = require('randexp');
const parseRegex = require("regex-parser")

let rowFormats = require(`../${process.argv[2]}`)
let fileName = process.argv[2].split(".")[0]+".csv"
let iterations = process.argv[3]
let file = fs.createWriteStream(fileName);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

for(var i=0; i < iterations; i++){
    let dataString = []
    for(let j in rowFormats) {
        switch(rowFormats[j].type.toLowerCase()) {
            case "string":
            dataString.push(`${eval(`faker.internet.password(10, false, /[0-9A-Z]/)`)}`)
            break;
            case "regex":
            dataString.push(`${new RandExp(parseRegex(rowFormats[j].subType)).gen()}`)
            break;
            case "randchoice":
            let index = getRandomInt(0, rowFormats[j].choices.length-1)
            dataString.push(`${rowFormats[j].choices[index]}`)
            break;
            case "constant":
            dataString.push(`${rowFormats[j].defaultVal}`)
            break;
            case "numbers":
            dataString.push(`${generate(5)}`)
            break;
            case "date":
            if(!rowFormats[j].subType) {
                dataString.push(`${moment(faker.date.past()).format('YYYY-MM-DD')}`)
            }
            else {
                dataString.push(`${moment(faker.date.past()).format(rowFormats[j].subType)}`)
            }
            break;
            default:
            let type = rowFormats[j].type
            let subType = rowFormats[j].subType
            if(typeof eval(`faker.${type}.${subType}()`) == "string") {
                dataString.push(`${eval(`faker.${type}.${subType}().replace(/,/g, ' ');`)}`) 
            }
            else {
                dataString.push(`${eval(`faker.${type}.${subType}();`)}`)
            }   
        }
    }
    dataString.push(i)
    file.write(dataString.join(",") + '\n');
}
file.end();
console.log(fileName)