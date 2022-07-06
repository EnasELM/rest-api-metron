const azure = require('azure-storage');
const { queryEntities } = require("../services/tableService")
module.exports = async function(context, req) {
    let val;
    console.log('hello')

    try {
        const blog = context.bindingData.blog
        var query = new azure.TableQuery();
        const result = await queryEntities("testInputData", query)
        console.log(query, ' query ')
        context.res = {

            body: result.value
        };
        val = context.res.body[0]
        val = val.InputDatat
        val = parseInt(val, 16);

        console.log(val, 'val')
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }


}