var fs = require('fs');
const faker = require('faker')
const moment = require('moment')
const RandExp = require('randexp');
const parseRegex = require("regex-parser")

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

/**
 * Takes a Javascript date as input and converts it to mm/dd/yyyy format
 * 
 * @param {Date} date The Javascript Date
 * @returns {Date} The Date in mm/dd/yyyy format
 */
function getFormattedDate (date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
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
            switch(rowFormats[j].type.toLowerCase()) {
                case "string": 
                dataString = `${dataString},${generate(4)}`
                break;
                case "regex":
                dataString = `${dataString},${new RandExp(parseRegex(rowFormats[j].subType)).gen()}`
                break;
                case "randchoice":
                let index = getRandomInt(0, rowFormats[j].subType.length-1)
                dataString = `${dataString},${rowFormats[j].subType[index]}`
                break;
                case "default":
                dataString = `${dataString},${rowFormats[j].subType}` 
                case "date":
                if(!rowFormats[j].subType) {
                    dataString = `${dataString},${moment(faker.date.past()).format('MM/DD/YYYY')}`
                }
                else {
                    dataString = `${dataString},${moment(faker.date.past()).format(rowFormats[j].subType)}`
                }
                break;
                default:
                let type = rowFormats[j].type
                let subType = rowFormats[j].subType                
                dataString = `${dataString},${eval(`faker.${type}.${subType}()`)}`
            }
        }
        file.write(dataString.substring(1) + '\n');
    }
    file.end();
}