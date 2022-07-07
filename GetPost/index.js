const azure = require('azure-storage');
const { queryEntities } = require("../services/tableService")
module.exports = async function(context, req) {
    function hex_to_ascii(str1) {
        var hex = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    }
    try {
        const { blog, id } = context.bindingData
        var query = new azure.TableQuery().where("PartitionKey eq ? and RowKey eq ?", blog, id.toString());
        const result = await queryEntities("testInputData", query)
        let val = hex_to_ascii(result.value[0].InputData)
        result.value[0].InputData = val
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