const util = require('./lib/util')
const readline = require("readline");
const processes = []
var exec = require('child-process-promise').exec;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Number of iterations to run.
 * @type {number}
 */
var iterations; 

process.argv.forEach(function (val, index, array) {
  if(index == 3) {
    iterations = val;
  }
  else if(index == 2) {
    /**
     * require the js file containing the schema
     * @type {String}
     */
    // schema = require(`./${val}`)
    schemaString = val
  }
});
console.log(schemaString,  "here")

for (const elem of schemaString.split(",")) {
  processes.push(exec(`node lib/generateFakeData.js ${elem.trim()} ${iterations}`))
}

Promise.all(processes).then((values) => {
  rl.question("Do you also want to insert these rows in bigquery? (choices: y/n)  ", function(doInsert) {
    if(doInsert.toLowerCase() == 'n') {
      rl.close()
    }
    else {
      rl.question("Provide dataset and table names separated by a comma. Please ensure that the table already exists:  ", function(tableParams) {
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
})
