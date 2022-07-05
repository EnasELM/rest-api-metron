const azure = require('azure-storage');
const { updateEntities } = require("../services/tableService")
module.exports = async function(context, req) {
    try {


        if (!req.body) {
            context.res = {
                status: 400,
                body: "please pass request body"
            };
            return
        }
        const { title, content } = req.body
        if (!title && !content) {
            context.res = {
                status: 400,
                body: "please pass title or content"
            };
            return
        }
        const { blog, id } = context.bindingData.blog
        const entity = {
            PartitionKey: { '_': blog },
            // RowKey: { "_": new Date().getTime().toString() },'
            RowKey: { "_": id.toString() },

        }
        if (title) entity.title = { _: title }
        if (content) entity.content = { _: content }
        await ("testInputData", entity)
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}