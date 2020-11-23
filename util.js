var fs = require('fs');
const faker = require('faker')
const RandExp = require('randexp');
const parseRegex = require("regex-parser")

function regexFromString (string) {
    var match = /^\/(.*)\/([a-z]*)$/.exec(string)
    return new RegExp(match[1], match[2])
  }

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
generate = function (n) {
    var add = 1, max = 12 - add; 
    if ( n > max ) {
        return this.generate(max) + this.generate(n - max);
    }
    max        = Math.pow(10, n+add);
    var min    = max/10; 
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ("" + number).substring(add).toString(); 
}

/**
 * Takes a Javascript date as input and converts it to mm/dd/yyyy format
 * 
 * @param {Date} date The Javascript Date
 * @returns {Date} The Date in mm/dd/yyyy format
 */
getFormattedDate = function (date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}

/**
 * Takes the fakeData array as an input, maps it to a csv file in the memory and writes it to a file on the disk
 * @param {Array} fakeData The FakeData array.
 * @returns {void} 
 */
exports.generateCSV = function(fakeData) {
    let file = fs.createWriteStream('data.csv');
    file.on('error', function(err) { /* error handling */ });
    fakeData.forEach(function(v) { file.write(v + '\n'); });
    file.end();
}

/**
 * Takes number of iterations as the input, picks up a random format from the row format list and 
 * generates the fake data
 * @param {number} iterations The number of iterations of the for loop
 * @param {object} rowFormats An object containing the formats from which any one can be randomly picked
 * @returns {Array} The array containing the fake data.
 */
exports.generateFakeData = function(iterations, rowFormats) {
    let fakeData = []
    let file = fs.createWriteStream('data.csv');
    for(var i=0; i < iterations; i++){
        let dataString = ''
        for(let j in rowFormats) {
            switch(rowFormats[j].type) {
                case "STRING": 
                dataString = dataString + ',' + generate(4)
                break;
                case "regex":
                dataString = dataString + ',' + new RandExp(parseRegex(rowFormats[j].subType)).gen()
                break;
                case "array":
                let index = getRandomInt(0, rowFormats[j].subType.length-1)
                dataString = dataString + ',' + rowFormats[j].subType[index]
                break;
                case "date":
                dataString = dataString + ',' + getFormattedDate(faker.date.past())
                break;
                default:
                let type = rowFormats[j].type
                let subType = rowFormats[j].subType                
                dataString = dataString + ',' + eval(`faker.${type}.${subType}()`)
            }
        }
        file.write(dataString + '\n');
    }
    file.end();
}