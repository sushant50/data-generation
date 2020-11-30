const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const datasetId = makeid(7)

async function deleteDataset() {

    const dataset = bigquery.dataset(datasetId);

    await dataset.delete({force: true});
    console.log(`Dataset ${dataset.id} deleted.`);
  }
 
async function createDataset() {

    const options = {
      location: 'US',
    };

    // Create a new dataset
    const [dataset] = await bigquery.createDataset(datasetId, options);
    console.log(`Dataset ${dataset.id} created.`);
  }

async function loadData(file, tableName, schemaObj) {
    const metadata = {
        sourceFormat: 'CSV',
        createDisposition: 'CREATE_IF_NEEDED',
        writeDisposition: 'WRITE_TRUNCATE',
        schema: schemaObj
    }

    const [job] = await bigquery
    .dataset(datasetId)
    .table(tableName)
    .load(file, metadata);

    console.log(`Job ${job.id} completed.`);

    // Check the job's status for errors
    const errors = job.status.errors;
    if (errors && errors.length > 0) {
    throw errors;
    }

}

async function runQueries(query) {

    const options = {
        query: query,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
    };

    // Run the query
    try {
        const [rows] = await bigquery.query(options);
        console.log(query, "finished")
    }
    catch (err) {
        console.log(err)
    }
}

async function createTempData(values) {
    for(let i in values) {
        val = values[i].stdout.replace(/\n/g, '')
        schema = {fields:require(`../table_loader_${val.split(".")[0]}.json`)}
        schema.fields.push({"mode" : "nullable", "type" : "String", "name": "id"})
        await loadData(`./${val}`, val.split(".")[0], schema)
    }
}

async function writeActualData(relationJson, iterations) {
    const relations = require(`../${relationJson}`)
    for (let i in relations) {
        parent = relations[i].parent
        child  = relations[i].child
        rowsFromParent = Math.floor(iterations * relations[i].ratio)
        rowsFromChild = iterations - rowsFromParent
        let parentColums = 'Select '
        let childColumnsToBeExcluded = ''
        const obj = relations[i].relation
        for(let i in obj) {
            parentColums += `${parent}.${i} as ${obj[i]},`
            childColumnsToBeExcluded += `${obj[i]},`
        }
        let ParentQuery = `Create table ${relations[i].parentDataset}.${parent} as SELECT * except(id) from ${datasetId}.${parent}`
        let childQuery = `Create table ${relations[i].childDataset}.${child} as (${parentColums} ${child}.* except(${childColumnsToBeExcluded}id)
            FROM ${datasetId}.${parent} ${parent}
              JOIN ${datasetId}.${child} ${child} ON ${parent}.id = ${child}.id ORDER by Cast(${child}.id as int64) LIMIT ${rowsFromParent} )
        UNION ALL
        (Select * except(id) from ${datasetId}.${child} Order by Cast(id as int64) DESC LIMIT  ${rowsFromChild} )`
        await runQueries(`Drop table ${relations[i].parentDataset}.${parent}`)
        await runQueries(`Drop table ${relations[i].childDataset}.${child}`)
        await runQueries(ParentQuery)
        await runQueries(childQuery)

    }
}

exports.writeToBQ = async function(values, relationJson, iterations, rl) {
    await createDataset();
    await createTempData(values)
    await writeActualData(relationJson, iterations)
    await deleteDataset()
    rl.close()
}