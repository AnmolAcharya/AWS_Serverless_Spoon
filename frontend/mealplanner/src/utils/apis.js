const API_BASE_URL = import.meta.env.VITE_API_URL;


const getAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    const oidcContext = JSON.parse(sessionStorage.getItem(oidcKey) || "{}");
    const accessToken = oidcContext?.access_token;
    return accessToken;
};

export const deleteAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    sessionStorage.removeItem(oidcKey);
}

export const fetchMeals = async () => {
    const response = await fetch(`${API_BASE_URL}/meal`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.json();
};

export const getMeal = async (userID, itemID) => {
    const response = await fetch(`${API_BASE_URL}/meal/${userID}/${itemID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.json();
};

export const createMeal = async (meal) => {
    const response = await fetch(`${API_BASE_URL}/meal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(meal),
    });
    return response.json();
};

export const updateMeal = async (userID, itemID, meal) => {
    const response = await fetch(`${API_BASE_URL}/meal/${userID}/${itemID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(meal),
    });
    return response.json();
};

export const deleteMeal = async (userID, itemID) => {
    const response = await fetch(`${API_BASE_URL}/meal/${userID}/${itemID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return response.json();
};





// // Placeholder API functions for CRUD operations
// // Replace URLs with your AWS API Gateway endpoints

// export async function fetchItems() {
//   // Example: return fetch('https://your-api/items').then(res => res.json());
//   return { Items: [] };
// }

// export async function createItem(item) {
//   // Example: return fetch('https://your-api/items', { method: 'POST', body: JSON.stringify(item) });
//   return { success: true };
// }

// export async function getItem(id) {
//   // Example: return fetch(`https://your-api/items/${id}`).then(res => res.json());
//   return { Item: null };
// }

// export async function updateItem(id, item) {
//   // Example: return fetch(`https://your-api/items/${id}`, { method: 'PUT', body: JSON.stringify(item) });
//   return { success: true };
// }

// export async function deleteItem(id) {
//   // Example: return fetch(`https://your-api/items/${id}`, { method: 'DELETE' });
//   return { success: true };
