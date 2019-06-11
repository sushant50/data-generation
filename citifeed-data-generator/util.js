var fs = require('fs');

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
    const csv = fakeData.map(row => row.map(item => (typeof item === 'string' && item.indexOf(',') >= 0) ? `"${item}"`: String(item)).join(',')).join('\n');
    fs.writeFile('data.csv', csv, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log('It\'s saved!');
        }
    });
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
        let index = Math.floor(Math.random() * 18) + 1  
        const data = rowFormats[index]()
        fakeData.push(data)
    }
    return fakeData;
}