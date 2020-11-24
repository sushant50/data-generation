var fs = require('fs');
const faker = require('faker')
const moment = require('moment')
const RandExp = require('randexp');
const parseRegex = require("regex-parser")
const {BigQuery} = require('@google-cloud/bigquery');

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
 * Takes number of iterations as the input, picks up a random format from the row format list and 
 * generates the fake data
 * @param {number} iterations The number of iterations of the for loop
 * @param {object} rowFormats An object containing the formats from which any one can be randomly picked
 * @returns {Array} The array containing the fake data.
 */
exports.generateFakeData = function(iterations, rowFormats) {
    let file = fs.createWriteStream('data.csv');
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
                case "date":
                if(!rowFormats[j].subType) {
                    dataString.push(`${moment(faker.date.past()).format('MM/DD/YYYY')}`)
                }
                else {
                    dataString.push(`${moment(faker.date.past()).format(rowFormats[j].subType)}`)
                }
                break;
                default:
                let type = rowFormats[j].type
                let subType = rowFormats[j].subType   
                dataString.push(`${eval(`faker.${type}.${subType}().replace(/,/g, ' ');`)}`)             
            }
        }
        file.write(dataString.join(",") + '\n');
    }
    file.end();
}

exports.insertData = function(datasetName, tableName, rl) {
    const bigquery = new BigQuery();
    const dataset = bigquery.dataset(datasetName);
    const table = dataset.table(tableName);
    const metadata = {
        sourceFormat: 'CSV',
        createDisposition: 'CREATE_IF_NEEDED',
        writeDisposition: 'WRITE_TRUNCATE'
        
      };
    table.load('./data.csv', metadata, (err, apiResponse) => {console.log(err, apiResponse); rl.close()});

}