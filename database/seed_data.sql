-- Seed Data for Premium Clothing Brand E-Commerce
-- Sample categories, products, and test data

-- Categories
INSERT INTO categories (name, description, slug) VALUES
('Men', 'Premium clothing for men', 'men'),
('Women', 'Elegant clothing for women', 'women'),
('Accessories', 'Fashion accessories', 'accessories');

-- Products
INSERT INTO products (name, description, price, original_price, sku, category_id, images, sizes, colors, stock_quantity, is_featured) VALUES
-- Men's Products
('Classic White Shirt', 'Premium cotton white shirt for men', 2999.00, 3999.00, 'MWS-001', (SELECT id FROM categories WHERE slug = 'men'), 
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/men-white-shirt-1.jpg', 'https://res.cloudinary.com/demo/image/upload/v1/products/men-white-shirt-2.jpg'],
 ARRAY['S', 'M', 'L', 'XL'], ARRAY['White'], 50, true),

('Navy Blue Blazer', 'Professional navy blue blazer', 4999.00, 6999.00, 'MWB-002', (SELECT id FROM categories WHERE slug = 'men'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/men-navy-blazer-1.jpg'],
 ARRAY['S', 'M', 'L', 'XL'], ARRAY['Navy'], 30, true),

('Black Jeans', 'Slim fit black denim jeans', 2499.00, 3499.00, 'MJB-003', (SELECT id FROM categories WHERE slug = 'men'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/men-black-jeans-1.jpg'],
 ARRAY['28', '30', '32', '34', '36'], ARRAY['Black'], 40, false),

('Grey T-Shirt', 'Comfortable cotton grey t-shirt', 999.00, 1499.00, 'MTG-004', (SELECT id FROM categories WHERE slug = 'men'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/men-grey-tshirt-1.jpg'],
 ARRAY['S', 'M', 'L', 'XL'], ARRAY['Grey'], 60, false),

-- Women's Products
('Floral Summer Dress', 'Elegant floral print summer dress', 3499.00, 4999.00, 'WFD-005', (SELECT id FROM categories WHERE slug = 'women'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/women-floral-dress-1.jpg', 'https://res.cloudinary.com/demo/image/upload/v1/products/women-floral-dress-2.jpg'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Floral'], 25, true),

('Black Evening Gown', 'Sophisticated black evening gown', 7999.00, 9999.00, 'WBG-006', (SELECT id FROM categories WHERE slug = 'women'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/women-black-gown-1.jpg'],
 ARRAY['S', 'M', 'L'], ARRAY['Black'], 15, true),

('Denim Jacket', 'Classic blue denim jacket', 3299.00, 4499.00, 'WDJ-007', (SELECT id FROM categories WHERE slug = 'women'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/women-denim-jacket-1.jpg'],
 ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Blue'], 35, false),

('Silk Scarf', 'Luxurious silk scarf', 1999.00, 2999.00, 'WSS-008', (SELECT id FROM categories WHERE slug = 'women'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/women-silk-scarf-1.jpg'],
 ARRAY['One Size'], ARRAY['Red', 'Blue', 'Black', 'White'], 20, false),

-- Accessories
('Leather Belt', 'Genuine leather belt', 1499.00, 1999.00, 'ALB-009', (SELECT id FROM categories WHERE slug = 'accessories'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/leather-belt-1.jpg'],
 ARRAY['S', 'M', 'L'], ARRAY['Black', 'Brown'], 45, false),

('Sunglasses', 'Premium UV protection sunglasses', 2499.00, 3499.00, 'ASG-010', (SELECT id FROM categories WHERE slug = 'accessories'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/sunglasses-1.jpg'],
 ARRAY['One Size'], ARRAY['Black', 'Tortoise'], 30, true),

('Wrist Watch', 'Elegant analog wrist watch', 4999.00, 6999.00, 'AWW-011', (SELECT id FROM categories WHERE slug = 'accessories'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/wrist-watch-1.jpg'],
 ARRAY['One Size'], ARRAY['Silver', 'Gold', 'Rose Gold'], 25, false),

('Leather Wallet', 'Premium leather wallet', 1999.00, 2999.00, 'ALW-012', (SELECT id FROM categories WHERE slug = 'accessories'),
 ARRAY['https://res.cloudinary.com/demo/image/upload/v1/products/leather-wallet-1.jpg'],
 ARRAY['One Size'], ARRAY['Black', 'Brown'], 40, false);

-- Sample Admin User (for testing)
-- Note: In production, create admin users through the application interface
INSERT INTO users (id, email, full_name, is_admin, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@clothingbrand.com', 'Admin User', true, true)
ON CONFLICT (id) DO NOTHING;

-- Sample Regular Users (for testing)
INSERT INTO users (email, full_name, phone, address) VALUES
('john.doe@example.com', 'John Doe', '+1234567890', '123 Main St, New York, NY 10001'),
('jane.smith@example.com', 'Jane Smith', '+1234567891', '456 Oak Ave, Los Angeles, CA 90001')
ON CONFLICT (email) DO NOTHING;
