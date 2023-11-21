-- Drop foreign key constraints first to avoid dependency issues
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_paymentId_fkey";
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_userId_fkey";
ALTER TABLE "UserShippingAddress" DROP CONSTRAINT "UserShippingAddress_addressId_fkey";
ALTER TABLE "UserShippingAddress" DROP CONSTRAINT "UserShippingAddress_userId_fkey";
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_userId_fkey";
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_productId_fkey";
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";
ALTER TABLE "Order" DROP CONSTRAINT "Order_toppingId_fkey";
ALTER TABLE "Order" DROP CONSTRAINT "Order_sizeId_fkey";
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_id_fkey";
ALTER TABLE "ProductTopping" DROP CONSTRAINT "ProductTopping_toppingId_fkey";
ALTER TABLE "ProductTopping" DROP CONSTRAINT "ProductTopping_productId_fkey";
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_productId_fkey";

-- Drop tables
DROP TABLE "Payment";
DROP TABLE "PaymentProvider";
DROP TABLE "UserPayment";
DROP TABLE "UserShippingAddress";
DROP TABLE "Address";
DROP TABLE "User";
DROP TABLE "ProductReview";
DROP TABLE "Order";
DROP TABLE "ProductTopping";
DROP TABLE "Topping";
DROP TABLE "ProductSize";
DROP TABLE "Product";

-- Drop types
DROP TYPE "PaymentMethod";
DROP TYPE "Size";
