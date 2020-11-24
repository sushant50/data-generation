const util = require('./lib/util')
const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Number of iterations to run.
 * @type {number}
 */
var iterations; 

/**
 * The temp variable that stores the fake data.
 * @type {Array}
 */
let fakeData = [];



process.argv.forEach(function (val, index, array) {
  if(index == 3) {
    iterations = val;
  }
  else if(index == 2) {
    /**
     * require the js file containing the schema
     * @type {Object}
     */
    schema = require(`./${val}`)
  }
});

let rowFormats = schema;
util.generateFakeData(iterations, rowFormats);

rl.question("Do you also want to insert these rows in bigquery? (choices: y/n)  ", function(doInsert) {
  if(doInsert.toLowerCase() == 'n') {
    rl.close()
  }
  else {
    rl.question("Provide dataset and table names separated by a comma:  ", function(tableParams) {
      let dataset = tableParams.split(',')[0].trim()
      let table = tableParams.split(',')[1].trim()
      util.insertData(dataset, table, rl)
    });
  }

});

rl.on("close", function() {
  console.log("\nAdios!");
  process.exit(0);
});