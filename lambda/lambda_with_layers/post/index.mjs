import { docClient, PutCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "mealPlannerTable";

export const createMealItem = async (event) => {
    const { body } = event;
    const {
        userID,
        itemID,
        itemName,
        itemQty,
        itemUnit,
        itemCategory,
        Expired
    } = JSON.parse(body || "{}");

    console.log("Values:", userID, itemID, itemName, itemQty, itemUnit, itemCategory, Expired);

    // Validate required fields
    if (!userID || !itemID || !itemName || itemQty === undefined || !itemUnit) {
        return createResponse(409, {
            error: "Missing required attributes: userID, itemID, itemName, itemQty, itemUnit."
        });
    }

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            userID,
            itemID,
            itemName,
            itemQty,
            itemUnit,
            itemCategory,
            Expired
        },
        ConditionExpression: "attribute_not_exists(userID) AND attribute_not_exists(itemID)", // Avoid overwriting existing
    });

    try {
        const response = await docClient.send(command);
        return createResponse(201, {
            message: "Meal item created successfully!",
            response
        });
    }
    catch (err) {
        console.error("Error:", err);
        if (err.name === "ConditionalCheckFailedException") {
            return createResponse(409, { error: "Item already exists!" });
        } else {
            return createResponse(500, {
                error: "Internal Server Error!",
                message: err.message,
            });
        }
    }
};
