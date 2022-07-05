const azure = require('azure-storage');
const { queryEntities } = require("../services/tableService")
module.exports = async function(context, req) {
        try {
            const { blog, id } = context.bindingData.blog
            var query = new azure.TableQuery().where("PartitionKey eq ? and RowKey eq ?", blog, id.toString());
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
    // const azure = require('azure-storage');
    // const { queryEntities } = require("../services/tableService")
    // module.exports = async function(context, req) {



//     try {
//         const blog = context.bindingData.blog
//         var query = new azure.TableQuery().where("partitionKey eq ?", blog);
//         const result = await queryEntities("testInputData", query)
//         context.res = {

//             body: result
//         };
//     } catch (error) {
//         context.res = {
//             status: 500,
//             body: error.message
//         };
//     }


// }