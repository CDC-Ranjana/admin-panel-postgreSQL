CREATE DATABASE adminPanel;

--Table for admins      
CREATE TABLE admins(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(10) UNIQUE NOT NULL,
  phone NUMBER(10) UNIQUE NOT NULL,
  role VARCHAR(50) CHECK(role IN('admin', 'super_admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Table for posts(for both admins and super_admin)
CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  uploaded_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  admin_id INT REFERENCES admins(id) ON DELETE CASCADE,
  images TEXT[], 
  videos TEXT[]
);

--Table for bulletins(for super_admin only)
CREATE TABLE bulletins(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  super_admin_id INT REFERENCES admins(id) ON DELETE CASCADE
);
