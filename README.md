# 🚀 Combinations API

## 📋 Purpose  
Create an API using Node.js and MySQL to generate unique combinations from a list of items—applying a rule that items starting with the same letter **cannot** be combined. Cache results to avoid recomputation.

---

## 📦 What This Project Does  
1. Accepts `POST /api/combination` with:
   - `length`: number of items to combine  
   - `items`: array of integers (e.g. `[2,1,3]`) to build item sets like `[[A1, A2], [B1], [C1, C2, C3]]`  
2. Checks MySQL for identical input (matching `length` and `items` CSV).  
3. If found in cache: returns existing response.  
4. Otherwise:
   - Generates valid combinations  
   - Inserts data (`length`, `items`, JSON result) into `responses` within a MySQL transaction  
   - Returns the newly created result

---

## 🗄️ MySQL Setup
1.	Copy the example.env file to a new .env in your project root.
    Set your MySQL connection credentials there:

```
# Database Configuration
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=combinations_db
    MYSQL_PORT=3306

```

2.	Create the database and tables, without using any ORM:
```
    mysql -u root -p < db/schema.js
```

This will run the SQL in schema.js to create the necessary tables:
   - responses (to store combinations and cache them)
3.	Start the Node.js app:
```bash
    node app.js
```

## 📬 API Usage

POST /api/combination

Request Body: 
```json
{
  "items": [2, 1, 3],
  "length": 2
}
```


✅ Success Response (200) 
```json
{
  "success": true,
  "result": {
    "id": 72,
    "combinations": [
      ["A1","B1"],
      ["A2","B1"],
      ["A1","C1"],
      ["A1","C2"],
      ["A1","C3"],
      ["A2","C1"],
      ["A2","C2"],
      ["A2","C3"],
      ["B1","C1"],
      ["B1","C2"],
      ["B1","C3"]
    ]
  }
}
```


❌ Validation Errors (400) 
```json
{
  "success": false,
  "message": "Length must be at least 1"
}
```

## 🛠️ Tech Stack & Architecture
   -  Node.js + Express
   -  MySQL with manual SQL scripts (no ORM)
   -  Celebrate + Joi for input validation with custom messages
   -  MySQL transactions for caching input–output pairs