import { docClient, DeleteCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "mealPlannerTable";

export const deleteMealItem = async (event) => {
    const { pathParameters } = event;

    const userID = pathParameters?.userID;
    const itemID = pathParameters?.itemID;

    if (!userID || !itemID) {
        return createResponse(400, { error: "Missing userID or itemID in path parameters." });
    }

    try {
        const command = new DeleteCommand({
            TableName: tableName,
            Key: {
                userID,
                itemID,
            },
            ReturnValues: "ALL_OLD", // returns the deleted item attributes
            ConditionExpression: "attribute_exists(userID) AND attribute_exists(itemID)", // ensure exists before delete
        });

        const response = await docClient.send(command);

        return createResponse(200, {
            message: "Meal item deleted successfully!",
            deletedAttributes: response.Attributes,
        });

    } catch (err) {
        if (err.name === "ConditionalCheckFailedException") {
            return createResponse(404, { error: "Item does not exist!" });
        }
        console.error("Error deleting meal item:", err);
        return createResponse(500, {
            error: "Internal Server Error!",
            message: err.message,
        });
    }
};
