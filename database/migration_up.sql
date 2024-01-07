
-- Role Enum
CREATE TYPE Role AS ENUM ('ADMIN', 'USER');

-- Size Enum
CREATE TYPE Size AS ENUM ('S', 'M', 'L', 'XL');

-- OrderStatus Enum
CREATE TYPE OrderStatus AS ENUM ('ORDERED', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED', 'REVIEWED');

-- PaymentMethod Enum
CREATE TYPE PaymentMethod AS ENUM ('COD', 'INTERNET_BANKING');

-- User Table
CREATE TABLE User (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE,
    phone VARCHAR UNIQUE,
    passwordHash VARCHAR,
    role Role DEFAULT 'USER',
    name VARCHAR,
    avatar VARCHAR,
    isBanned BOOLEAN DEFAULT false
);

-- Address Type
CREATE TYPE Address AS (
    unitNumber VARCHAR,
    street VARCHAR,
    district VARCHAR,
    city VARCHAR
);

-- CartItem Type
CREATE TYPE CartItem AS (
    metadataId VARCHAR,
    name VARCHAR,
    image VARCHAR,
    price FLOAT,
    sizeName Size,
    toppingNames VARCHAR[],
    quantity INT
);

-- ToppingMetadata Table
CREATE TABLE ToppingMetadata (
    id VARCHAR PRIMARY KEY,
    name VARCHAR UNIQUE,
    desc VARCHAR,
    image VARCHAR,
    price FLOAT,
    stock INT
);

-- ProductTopping Table
CREATE TABLE ProductTopping (
    id VARCHAR PRIMARY KEY,
    toppingMetadataId VARCHAR REFERENCES ToppingMetadata(id),
    productMetadataId VARCHAR
);

-- ProductSize Table
CREATE TABLE ProductSize (
    id VARCHAR PRIMARY KEY,
    size Size,
    price FLOAT,
    stock INT,
    productMetadataId VARCHAR
);

-- Category Table
CREATE TABLE Category (
    id VARCHAR PRIMARY KEY,
    name VARCHAR UNIQUE,
    desc VARCHAR,
    image VARCHAR,
    itemCount INT
);

-- ProductMetadata Table
CREATE TABLE ProductMetadata (
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    desc VARCHAR,
    images VARCHAR[], -- Assuming array of strings for images
    basePrice FLOAT,
    category VARCHAR,
    availableSizes VARCHAR[],
    availableToppings VARCHAR[],
    reviews VARCHAR[]
);

-- Order Table
CREATE TABLE Order (
    id VARCHAR PRIMARY KEY,
    userId VARCHAR REFERENCES User(id),
    status OrderStatus,
    shippingAddress Address,
    cart CartItem[],
    price FLOAT,
    paymentMethod PaymentMethod,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review Table
CREATE TABLE Review (
    id VARCHAR PRIMARY KEY,
    userId VARCHAR REFERENCES User(id),
    productMetadataId VARCHAR REFERENCES ProductMetadata(id),
    rating INT,
    comment VARCHAR,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
