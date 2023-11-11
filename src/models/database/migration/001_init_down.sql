-- 001_init_down.sql

-- Drop foreign key constraints

-- Order matters when dropping constraints; follow the reverse order of creation

-- Drop foreign key constraints from "OrderItem"
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_order_id_fkey";

-- Drop foreign key constraint from "Order"
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- Drop foreign key constraints from "ProductImage"
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_product_id_fkey";

-- Drop foreign key constraint from "Product"
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendor_id_fkey";
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- Drop foreign key constraints from "ProductCategory"
-- (Note: Assuming the constraint name is generated automatically)
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_id_fkey";

-- Drop foreign key constraints from "Payment"
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_provider_id_fkey";

-- Drop foreign key constraints from "UserPayment"
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_payment_id_fkey";
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_user_id_fkey";

-- Drop foreign key constraints from "UserShippingAddress"
ALTER TABLE "UserShippingAddress" DROP CONSTRAINT "UserShippingAddress_address_id_fkey";
ALTER TABLE "UserShippingAddress" DROP CONSTRAINT "UserShippingAddress_user_id_fkey";

-- Drop foreign key constraints from "PaymentProvider"
-- (Note: Assuming the constraint name is generated automatically)
ALTER TABLE "PaymentProvider" DROP CONSTRAINT "PaymentProvider_id_fkey";

-- Drop tables
DROP TABLE "UserReview";
DROP TABLE "OrderItem";
DROP TABLE "Order";
DROP TABLE "Vendor";
DROP TABLE "ProductImage";
DROP TABLE "Product";
DROP TABLE "ProductCategory";
DROP TABLE "Payment";
DROP TABLE "PaymentProvider";
DROP TABLE "UserPayment";
DROP TABLE "UserShippingAddress";
DROP TABLE "Address";
DROP TABLE "User";

-- Drop enumeration type
DROP TYPE "PaymentMethod";
