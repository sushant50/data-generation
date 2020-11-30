const {BigQuery} = require('@google-cloud/bigquery');

exports.insertData = function(datasetName, tableName, rl) {
    const bigquery = new BigQuery();
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