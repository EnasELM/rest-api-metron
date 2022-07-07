    const { deleteEntity } = require("../services/tableService")
    module.exports = async function(context, req) {
        try {
            const { blog, id } = context.bindingData;
            const entity = {
                PartitionKey: { _: blog },
                RowKey: { _: id.toString() },
            }
            await deleteEntity("testInputData", entity);
        } catch (error) {
            context.res = {
                status: 500,
                body: error.message
            };

        }
    }