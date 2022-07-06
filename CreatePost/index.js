const azure = require('azure-storage');
const { insertEntities } = require("../services/tableService")
module.exports = async function(context, req) {
    // hexString = yourNumber.toString(16);
    function ascii_to_hex(str) {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }

    try {


        if (!req.body) {
            context.res = {
                status: 400,
                body: "Please pass a request body "
            };
            return
        }
        const { blog, InputData } = req.body
        let arr = ascii_to_hex(InputData)

        if (!blog || !InputData) {
            context.res = {
                status: 400,
                body: "Please pass blog, title and content "

            };
            return
        }

        console.log(arr, 'arr')
        const entity = {
            PartitionKey: { '_': blog },
            RowKey: { "_": new Date().getTime().toString() },
            InputData: { "_": arr },


        }
        const result = await insertEntities("testInputData", entity);

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