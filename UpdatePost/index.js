const azure = require('azure-storage');
const { updateEntities } = require("../services/tableService")
module.exports = async function(context, req) {
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
                body: "please pass request body"
            };
            return
        }
        const { InputData } = req.body
        if (!InputData) {
            context.res = {
                status: 400,
                body: "please pass InputData"
            };
            return
        }
        const { blog, id } = context.bindingData
        const entity = {
            PartitionKey: { _: blog },
            RowKey: { _: id.toString() },

        }
        let val = ascii_to_hex(InputData)
        if (InputData) entity.InputData = { _: val }

        await updateEntities("testInputData", entity)
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}