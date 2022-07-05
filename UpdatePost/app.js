const AzureTables = require("@azure/data-tables");
const { TableServiceClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const account = "t2softwaretestenas";
const accountKey = "GTwJuG7P0OYPp/N6p9IJTQpmbZEMSUpgfEGHgezxKBfEXjhkH6W1yfsS5h4d1699GJpawUXxBPiD+AStV1ZvfA==";
const tableName = "testInputData";

const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
async function main() {
    let tablesIter = serviceClient.listTables();
    let i = 1;
    for await (const table of tablesIter) {
        console.log(`Table${i}: ${table.name}`);
        i++;
        // Output:
        // Table1: testTable1
        // Table1: testTable2
        // Table1: testTable3
        // Table1: testTable4
        // Table1: testTable5
    }
}


async function main() {
    const testEntity = {
        partitionKey: "P1",
        rowKey: "R1",
        foo: "foo",
        bar: 123
    };
    await client.createEntity(testEntity);
}

main();