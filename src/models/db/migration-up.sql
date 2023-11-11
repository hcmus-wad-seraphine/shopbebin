CREATE TYPE "PaymentMethod" AS ENUM (
  'COD',
  'Bank',
  'EWallet'
);

CREATE TABLE "User" (
  "id" uuid PRIMARY KEY,
  "phone_number" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password_hashed" varchar NOT NULL,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL
);

CREATE TABLE "Address" (
  "id" uuid PRIMARY KEY,
  "unit_number" varchar NOT NULL,
  "street" varchar NOT NULL,
  "district" varchar NOT NULL,
  "city" varchar NOT NULL
);

CREATE TABLE "UserShippingAddress" (
  "user_id" uuid NOT NULL,
  "address_id" uuid NOT NULL,
  "is_default" bool
);

CREATE TABLE "UserPayment" (
  "user_id" uuid NOT NULL,
  "payment_id" uuid NOT NULL,
  "is_default" bool
);

CREATE TABLE "PaymentProvider" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "api_key" string,
  "metadata" json
);

CREATE TABLE "Payment" (
  "id" uuid PRIMARY KEY,
  "method" PaymentMethod NOT NULL,
  "provider_id" uuid NOT NULL,
  "provider_account_id" varchar NOT NULL
);

CREATE TABLE "ProductCategory" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "Product" (
  "id" uuid PRIMARY KEY,
  "sku" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar,
  "price" "decimal(10, 2)" NOT NULL,
  "stock_quantity" int NOT NULL,
  "category_id" uuid,
  "vendor_id" uuid,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL
);

CREATE TABLE "ProductImage" (
  "id" uuid PRIMARY KEY,
  "product_id" uuid NOT NULL,
  "url" varchar NOT NULL
);

CREATE TABLE "Vendor" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "contact_person" varchar,
  "phone_number" varchar NOT NULL,
  "email" varchar,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL
);

CREATE TABLE "Order" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL
);

CREATE TABLE "OrderItem" (
  "id" uuid PRIMARY KEY,
  "order_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "quantity" int NOT NULL,
  "price" "decimal(10, 2)" NOT NULL
);

CREATE TABLE "UserReview" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "rating" int NOT NULL,
  "review_text" text,
  "created_at" timestamptz NOT NULL
);

COMMENT ON COLUMN "Payment"."provider_account_id" IS 'This can be a phone number (E-Wallet) or a bank account number (Bank)';

ALTER TABLE "UserShippingAddress" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "UserShippingAddress" ADD FOREIGN KEY ("address_id") REFERENCES "Address" ("id");

ALTER TABLE "UserPayment" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "UserPayment" ADD FOREIGN KEY ("payment_id") REFERENCES "Payment" ("id");

ALTER TABLE "Payment" ADD FOREIGN KEY ("provider_id") REFERENCES "PaymentProvider" ("id");

ALTER TABLE "ProductCategory" ADD FOREIGN KEY ("id") REFERENCES "Product" ("category_id");

ALTER TABLE "Product" ADD FOREIGN KEY ("vendor_id") REFERENCES "Vendor" ("id");

ALTER TABLE "ProductImage" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("id");

ALTER TABLE "Order" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "OrderItem" ADD FOREIGN KEY ("order_id") REFERENCES "Order" ("id");

ALTER TABLE "OrderItem" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("id");

ALTER TABLE "UserReview" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "UserReview" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("id");
