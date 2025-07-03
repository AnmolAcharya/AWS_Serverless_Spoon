# 🥄✨ Serverless Spoon — AWS-powered Grocery-to-Meal Generator

## Project Demo: https://www.loom.com/share/554df3d801f345af860d38ab09d372b2?sid=82ac0e06-690a-44d6-a04b-8617dcc2d394

### 🥗 Project Overview

**Serverless Spoon** is an AI-augmented, cloud-native web application that lets users manage grocery items and generate meal ideas based on what they have. Built on a modern, fully serverless AWS architecture, this project demonstrates how to combine React, serverless backend services, and AI integration for an interactive, scalable solution.

---

### 🚀 Features

- Add and manage grocery items (name, category, quantity, units, freshness)
- Visual cards to display current pantry items
- AI-powered chatbot to suggest meal ideas
- Detailed item pages
- Beautiful, modern UI built with React

---

### ⚡ Architecture & Tools Used

#### 🌐 Frontend

- **React** (Vite)
- CSS Modules / Custom CSS for styling
- Deployed on **AWS S3** (static site) + **CloudFront** (CDN)

#### ☁️ Backend

- **AWS Lambda** (API logic)
- **API Gateway** (REST endpoints)
- **DynamoDB** (store grocery items)
- **Amazon Cognito** (optional for user auth)
- **Amazon ECR + Lambda container support** (for AI model inference)

#### 💬 AI & Chatbot

- React-based chatbot UI component
- Connects to an AI recipe suggestion Lambda backend (can integrate with fine-tuned LLMs or Bedrock)

#### 🔐 Authentication (optional)

- AWS Cognito user pools for managing user login/signup

---

### 🗺️ Architecture Diagram

