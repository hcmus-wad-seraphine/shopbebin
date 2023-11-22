CREATE TYPE "Size" AS ENUM (
  'S',
  'M',
  'L',
  'XL'
);

CREATE TYPE "PaymentMethod" AS ENUM (
  'COD',
  'Bank',
  'EWallet'
);

CREATE TABLE "Product" (
  "id" uuid PRIMARY KEY,
  "name" string NOT NULL,
  "desc" string,
  "images" string[]
);

CREATE TABLE "ProductSize" (
  "id" uuid PRIMARY KEY,
  "productId" uuid NOT NULL,
  "size" Size NOT NULL,
  "price" decimal NOT NULL
);

CREATE TABLE "Topping" (
  "id" uuid PRIMARY KEY,
  "name" string NOT NULL,
  "price" decimal NOT NULL
);

CREATE TABLE "ProductTopping" (
  "id" uuid PRIMARY KEY,
  "productId" uuid NOT NULL,
  "toppingId" uuid NOT NULL
);

CREATE TABLE "Order" (
  "id" uuid PRIMARY KEY,
  "sizeId" uuid NOT NULL,
  "toppingId" uuid NOT NULL,
  "userId" uuid NOT NULL,
  "createdAt" timestamptz NOT NULL
);

CREATE TABLE "ProductReview" (
  "id" uuid PRIMARY KEY,
  "productId" uuid NOT NULL,
  "userId" uuid NOT NULL,
  "star" int NOT NULL,
  "comment" string,
  "createdAt" timestamptz NOT NULL
);

CREATE TABLE "User" (
  "id" uuid PRIMARY KEY,
  "phoneNumber" varchar NOT NULL,
  "email" varchar NOT NULL,
  "passwordHashed" varchar NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "Address" (
  "id" uuid PRIMARY KEY,
  "unitNumber" varchar NOT NULL,
  "street" varchar NOT NULL,
  "district" varchar NOT NULL,
  "city" varchar NOT NULL
);

CREATE TABLE "UserShippingAddress" (
  "userId" uuid NOT NULL,
  "addressId" uuid NOT NULL,
  "isDefault" bool
);

CREATE TABLE "UserPayment" (
  "userId" uuid NOT NULL,
  "paymentId" uuid NOT NULL,
  "isDefault" bool
);

CREATE TABLE "PaymentProvider" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "apiKey" string,
  "metadata" json
);

CREATE TABLE "Payment" (
  "id" uuid PRIMARY KEY,
  "method" PaymentMethod NOT NULL,
  "providerId" uuid NOT NULL,
  "providerAccountId" varchar NOT NULL
);

COMMENT ON COLUMN "ProductReview"."star" IS '0 -> 5';

COMMENT ON COLUMN "Payment"."providerAccountId" IS 'This can be a phone number (E-Wallet) or a bank account number (Bank)';

ALTER TABLE "ProductSize" ADD FOREIGN KEY ("productId") REFERENCES "Product" ("id");

ALTER TABLE "ProductTopping" ADD FOREIGN KEY ("productId") REFERENCES "Product" ("id");

ALTER TABLE "ProductTopping" ADD FOREIGN KEY ("toppingId") REFERENCES "Topping" ("id");

ALTER TABLE "Order" ADD FOREIGN KEY ("sizeId") REFERENCES "ProductSize" ("id");

ALTER TABLE "Topping" ADD FOREIGN KEY ("id") REFERENCES "Order" ("toppingId");

ALTER TABLE "Order" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "ProductReview" ADD FOREIGN KEY ("productId") REFERENCES "Product" ("id");

ALTER TABLE "ProductReview" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "UserShippingAddress" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "UserShippingAddress" ADD FOREIGN KEY ("addressId") REFERENCES "Address" ("id");

ALTER TABLE "UserPayment" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "UserPayment" ADD FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id");

ALTER TABLE "Payment" ADD FOREIGN KEY ("providerId") REFERENCES "PaymentProvider" ("id");
