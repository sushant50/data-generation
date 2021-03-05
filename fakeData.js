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
let iterations, format; 

process.argv.forEach(function (val, index, array) {
  if(index == 4 ) {
    format = val
  }
  else if(index == 3) {
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
  else {

  }
});

for (const elem of schemaString.split(",")) {
  processes.push(exec(`node lib/generateFakeData.js ${elem.trim()} ${iterations} ${format}`))
}

Promise.all(processes).then((values) => {
  rl.question("Do you also want to insert these rows in bigquery? (choices: y/n)  ", function(doInsert) {
    if(doInsert.toLowerCase() == 'n') {
      rl.close()
    }
    else {

      rl.question("Provide the relationship json:  ", function(JsonFile) {
          const relationJson = require(`./${JsonFile}`)
          if(util.checkRelations(relationJson, values)) {
            util.writeToBQ(values,relationJson, iterations, rl)
          }
          else {
            rl.close()
          }
          
        
      });
    }
  
  });
  
  rl.on("close", function() {
    console.log("\nAdios!");
    process.exit(0);
  });
})
