var fs = require('fs');
const faker = require('faker')
const RandExp = require('randexp');

/**
 * Generates a pseudo random number of length n
 * 
 * @param {number} n The required length of the random number
 * @returns {number}
 */
exports.generate = function (n) {
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
exports.getFormattedDate = function (date) {
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
    for(var i=0; i < iterations; i++){
        let dataString = ''
        for(let j in rowFormats) {
            switch(rowFormats[j].type) {
                case "STRING": 
                dataString = dataString + ',' + module.exports.generate(4)
            }
        }
        fakeData.push(dataString)
    }
    return fakeData;
}