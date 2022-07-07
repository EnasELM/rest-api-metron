const azure = require('azure-storage');
const { queryEntities } = require("../services/tableService")
module.exports = async function(context, req) {
    let val;

    // function hex_to_ascii(str1)
    // {
    //    var hex  = str1.toString();
    //    var str = '';
    //    for (var n = 0; n < hex.length; n += 2) {
    //        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    //    }
    //    return str;
    // }
    try {
        const blog = context.bindingData.blog
        var query = new azure.TableQuery();
        const result = await queryEntities("testInputData", query)
        console.log(query, ' query ')
        context.res = {

            body: result.value
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }


}