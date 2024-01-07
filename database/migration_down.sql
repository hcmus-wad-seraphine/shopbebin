
-- Dropping tables in reverse order of creation
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Order;
DROP TABLE IF EXISTS ProductMetadata;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS ProductSize;
DROP TABLE IF EXISTS ProductTopping;
DROP TABLE IF EXISTS ToppingMetadata;
DROP TABLE IF EXISTS User;

-- Dropping custom types
DROP TYPE IF EXISTS CartItem;
DROP TYPE IF EXISTS Address;
DROP TYPE IF EXISTS Role;
DROP TYPE IF EXISTS Size;
DROP TYPE IF EXISTS OrderStatus;
DROP TYPE IF EXISTS PaymentMethod;
