import { docClient, GetCommand, ScanCommand, createResponse } from '/opt/nodejs/utils.mjs';

const tableName = process.env.tableName || "mealPlannerTable";

export const getMealItem = async (event) => {
    const { pathParameters, queryStringParameters } = event;
    const { id } = pathParameters || {};
    const userId = queryStringParameters?.userId; // Optional: pass ?userId=demoUser

    try {
        let command;

        if (id) {
            // Get single item
            command = new GetCommand({
                TableName: tableName,
                Key: {
                    itemId: id,
                },
            });

            const response = await docClient.send(command);

            // If using userId later, you can check it matches
            if (response.Item && userId && response.Item.userId !== userId) {
                return createResponse(403, { error: "Forbidden. This item does not belong to you." });
            }

            return createResponse(200, response.Item);
        } else {
            // Scan all items for now
            command = new ScanCommand({
                TableName: tableName,
            });

            const response = await docClient.send(command);

            let items = response.Items;

            // If filtering by userId
            if (userId) {
                items = items.filter(item => item.userId === userId);
            }

            return createResponse(200, items);
        }
    } catch (err) {
        console.error("Error fetching data from DynamoDB:", err);
        return createResponse(500, { error: err.message });
    }
};

