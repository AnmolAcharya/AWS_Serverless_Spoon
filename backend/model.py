import os
import google.generativeai as genai

api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.7,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048
}

model = genai.GenerativeModel("gemini-2.5-pro", generation_config=generation_config)

def generate_recipes(grocery_list):
    prompt = (
        f"I have these grocery items: {grocery_list}. "
        "Suggest 3 creative dinner recipe ideas using these items. "
        "For each recipe, give ONLY: "
        "- A catchy title (max 5 words) "
        "- One sentence description (max 20 words) "
        "- A very short list of just 3 main ingredients. "
        "Do not include preparation steps, long descriptions, or extra commentary. "
        "Format as:\n"
        "1. Title\n"
        "Description\n"
        "Ingredients: x, y, z\n"
        "2. Title\n"
        "Description\n"
        "Ingredients: x, y, z\n"
        "3. Title\n"
        "Description\n"
        "Ingredients: x, y, z"
    )
    response = model.generate_content(prompt)
    return response.text

# ✅ Lambda handler
def handler(event, context):
    grocery_items = event.get("grocery_items", "")
    if not grocery_items:
        return {
            "statusCode": 400,
            "body": "No grocery items provided in event['grocery_items']"
        }

    recipes = generate_recipes(grocery_items)
    return {
        "statusCode": 200,
        "body": recipes
    }



# from dotenv import load_dotenv
# import os
# import google.generativeai as genai

# # Load .env
# load_dotenv()

# api_key = os.getenv("GOOGLE_API_KEY")
# genai.configure(api_key=api_key)

# generation_config = {
#     "temperature": 0.7,
#     "top_p": 1,
#     "top_k": 1,
#     "max_output_tokens": 2048
# }

# # ✅ Use Gemini model
# model = genai.GenerativeModel("gemini-2.5-pro", generation_config=generation_config)

# def generate_recipes(grocery_list):
#     prompt = (
#         f"I have these grocery items: {grocery_list}. "
#         "Suggest 3 creative dinner recipes using these items. "
#         "Each recipe should have a clear title and a short description, and list the ingredients. "
#         "Format them as 1., 2., and 3."
#     )
#     response = model.generate_content(prompt)
#     return response.text

# if __name__ == "__main__":
#     groceries = input("Enter your grocery items (comma separated): ")
#     recipes = generate_recipes(groceries)
#     print("\nGenerated Recipe Ideas:\n")
#     print(recipes)


