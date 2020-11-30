const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
const faker = require("faker")
const datasetId = faker.internet.password(10, false, /[0-9A-Z]/);

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
    }
    catch (err) {
        console.log("table does not exist")
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

async function writeActualData(relationJson) {
    const relations = require(`../${relationJson}`)
    for (let i in relations) {
        parent = relations[i].parent
        child  = relations[i].child
        let ParentQuery = `Create table ${relations[i].parentDataset}.${parent} as SELECT * except(id) from ${datasetId}.${parent}`
        let childQuery = `(SELECT b.PRODUCTTYPE, a.FSTNAME, a.MIDINIT, a.LSTNAME, b.BUSINESSNAME,  a.id FROM sushant.citi_feed_flat
         a JOIN sushant.personal_table b ON a.id = b.id ORDER by Cast(a.id as int64) LIMIT 50 )
        UNION ALL
        (Select * from .sushant.personal_table Order by Cast(id as int64) DESC LIMIT  50 )`
        await runQueries(`Drop table ${relations[i].parentDataset}.${parent}`)
        await runQueries(`Drop table ${relations[i].childDataset}.${child}`)
        await runQueries(ParentQuery)
        // await runQueries(childQuery)

    }
}

exports.createTempTables = async function(values, relationJson, rl) {
    await createDataset();
    await createTempData(values)
    await writeActualData(relationJson)
    rl.close()
}

exports.insertData = function(datasetName, tableName, rl) {
    const dataset = bigquery.dataset(datasetName);
    const table = dataset.table(tableName);
    const metadata = {
        sourceFormat: 'CSV',
        createDisposition: 'CREATE_IF_NEEDED',
        writeDisposition: 'WRITE_TRUNCATE'
        
      };
    table.load('./exampleDataGen2.csv', metadata, (err, apiResponse) => {
        if(err) {
            console.log("An error occured. Please find the stacktrace below")
            console.log(err)
        }
        else {
            console.log("Rows successfully inserted")
        }
        rl.close()
    });

}