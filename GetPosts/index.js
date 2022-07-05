const azure = require('azure-storage');
const { queryEntities } = require("../services/tableService")
module.exports = async function(context, req) {

    console.log('hello')

    try {
        const blog = context.bindingData.blog
        var query = new azure.TableQuery().where("partitionKey eq ?", blog);
        const result = await queryEntities("testInputData", query)
        context.res = {

            body: result
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }


}