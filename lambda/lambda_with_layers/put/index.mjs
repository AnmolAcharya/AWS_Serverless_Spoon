import { docClient, UpdateCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "mealPlannerTable";

export const updateMealItem = async (event) => {
    const { pathParameters, body } = event;

    const userID = pathParameters?.userID;
    const itemID = pathParameters?.itemID;

    if (!userID || !itemID) {
        return createResponse(400, { error: "Missing userID or itemID in path parameters." });
    }

    const {
        itemName,
        itemQty,
        itemUnit,
        itemCategory,
        Expired
    } = JSON.parse(body || "{}");

    if (
        !itemName &&
        itemQty === undefined &&
        !itemUnit &&
        !itemCategory &&
        Expired === undefined
    ) {
        return createResponse(400, { error: "Nothing to update!" });
    }

    // Dynamically build update expression
    let updateExpression = "SET ";
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (itemName) {
        updateExpression += "#itemName = :itemName, ";
        expressionAttributeNames["#itemName"] = "itemName";
        expressionAttributeValues[":itemName"] = itemName;
    }

    if (itemQty !== undefined) {
        updateExpression += "itemQty = :itemQty, ";
        expressionAttributeValues[":itemQty"] = itemQty;
    }

    if (itemUnit) {
        updateExpression += "itemUnit = :itemUnit, ";
        expressionAttributeValues[":itemUnit"] = itemUnit;
    }

    if (itemCategory) {
        updateExpression += "itemCategory = :itemCategory, ";
        expressionAttributeValues[":itemCategory"] = itemCategory;
    }

    if (Expired !== undefined) {
        updateExpression += "Expired = :Expired, ";
        expressionAttributeValues[":Expired"] = Expired;
    }

    // Remove trailing comma and space
    updateExpression = updateExpression.slice(0, -2);

    try {
        const command = new UpdateCommand({
            TableName: tableName,
            Key: {
                userID,
                itemID,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: Object.keys(expressionAttributeNames).length ? expressionAttributeNames : undefined,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
            ConditionExpression: "attribute_exists(userID) AND attribute_exists(itemID)", // ensures item exists
        });

        const response = await docClient.send(command);
        console.log("Update response:", response);

        return createResponse(200, {
            message: "Meal item updated successfully!",
            updatedAttributes: response.Attributes,
        });

    } catch (err) {
        if (err.name === "ConditionalCheckFailedException") {
            return createResponse(404, { error: "Item does not exist!" });
        }
        console.error("Error updating meal item:", err);
        return createResponse(500, {
            error: "Internal Server Error!",
            message: err.message,
        });
    }
};