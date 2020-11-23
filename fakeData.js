const util = require('./util')

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
    console.log(val)
    /**
     * require the js file containing the schema
     * @type {Object}
     */
    schema = require(`./${val}`)
  }
});

let rowFormats = schema;
util.generateFakeData(iterations, rowFormats);