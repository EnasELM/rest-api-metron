const azure = require('azure-storage');

const tableSvc = azure.createTableService(
    "t2softwaretestenas",
    process.env.AZURE_STORAGE_ACCESS_KEY
);

const insertEntities = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.insertEntity(tableName, entity, { echoContent: true, payloadFormat: "application/json;odata=nometadata" }, (error, result, respons) => {
            if (error) {
                reject(error);
            } else {
                resolve(respons.body)
            }
        })
    })
}

const queryEntities = (tableName, query) => {
    return new Promise((resolve, reject) => {
        tableSvc.queryEntities(tableName, query, null, { payloadformat: "application/json;odata=nometadata" }, (error, result, respons) => {
            if (error) {
                reject(error);
            } else {
                resolve(respons.body)
            }
        })
    })
}


const updateEntities = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableSvc.insertEntity(tableName, entity, (error, result, respons) => {
            if (error) {
                reject(error);
            } else {
                resolve()
            }
        })
    })
}

exports.insertEntities = insertEntities;
exports.queryEntities = queryEntities;
exports.updateEntities = updateEntities;