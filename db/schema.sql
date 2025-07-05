-- items table
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL
);

-- combinations table
CREATE TABLE combinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  combination_text JSON NOT NULL
);

-- responses table (optimized for cache lookup)
CREATE TABLE responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  length INT NOT NULL,
  items TEXT NOT NULL,
  UNIQUE KEY unique_input (length, items(255)),
  response_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);