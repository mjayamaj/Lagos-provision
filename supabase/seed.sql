-- Lagos Provision Seed SQL
-- Generated for Supabase Postgres
-- Contains 14 categories, 20 Lagos delivery zones, and 156+ products

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-1', 'Rice, Beans & Grains', 'rice-beans-grains', '🌾', 1, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-2', 'Garri, Flour & Swallow', 'garri-flour-swallow', '🥣', 2, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-3', 'Pasta & Noodles', 'pasta-noodles', '🍝', 3, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-4', 'Oils & Fats', 'oils-fats', '🫒', 4, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-5', 'Tomatoes, Canned Food & Sauces', 'tomatoes-canned-food-sauces', '🥫', 5, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-6', 'Spices & Seasonings', 'spices-seasonings', '🧂', 6, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-7', 'Soup Ingredients & Dried Foods', 'soup-ingredients-dried-foods', '🍲', 7, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-8', 'Beverages & Drinks', 'beverages-drinks', '☕', 8, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-9', 'Cereals, Breakfast & Baby', 'cereals-breakfast-baby', '🥣', 9, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-10', 'Snacks & Biscuits', 'snacks-biscuits', '🍪', 10, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-11', 'Sugar & Baking', 'sugar-baking', '🧁', 11, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-12', 'Household & Cleaning', 'household-cleaning', '🧼', 12, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-13', 'Personal Care', 'personal-care', '🧴', 13, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;
INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES ('cat-14', 'Fresh Produce, Eggs & Frozen', 'fresh-produce-eggs-frozen', '🥬', 14, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;

-- 2. Insert Delivery Zones (All 20 Lagos LGAs @ ₦2,000 flat fee)
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Agege', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Ajeromi-Ifelodun', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Alimosho', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Amuwo-Odofin', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Apapa', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Badagry', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Epe', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Eti-Osa', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Ibeju-Lekki', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Ifako-Ijaiye', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Ikeja', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Ikorodu', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Kosofe', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Lagos Island', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Lagos Mainland', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Mushin', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Ojo', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Oshodi-Isolo', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Shomolu', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;
INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES ('Surulere', 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;

-- 3. Insert Products (156+ items, including exact design products)
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-rice-10kg-design', 'cat-1', 'Parboiled Rice (10kg)', 'parboiled-rice-10kg',
  'Triple-sorted, stone-free Nigerian parboiled rice with long uniform grains that cook perfectly without sticking.', 'Premium Long Grain', '10kg',
  1850000, '/images/products/rice-10kg.jpg', 'Mama Gold', 'bag',
  true, true, false, false,
  ARRAY['rice', 'grains', 'staples', 'carbs'], 1, 150, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-rice-5kg', 'cat-1', 'Parboiled Rice (5kg)', 'parboiled-rice-5kg',
  'Clean stone-free parboiled rice, perfect for family dinners and jollof rice.', 'Premium Long Grain', '5kg',
  950000, '/images/products/rice-5kg.jpg', 'Mama Gold', 'bag',
  false, true, false, true,
  ARRAY['rice', 'grains', 'staples'], 2, 100, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-rice-25kg', 'cat-1', 'Parboiled Rice (25kg)', 'parboiled-rice-25kg',
  'Bulk 25kg parboiled long grain rice for stocking up household supplies.', 'Long Grain Premium', '25kg',
  4400000, '/images/products/rice-25kg.jpg', 'Mama Gold', 'bag',
  true, false, false, true,
  ARRAY['rice', 'bulk', 'staples'], 3, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-rice-50kg', 'cat-1', 'Parboiled Rice (50kg)', 'parboiled-rice-50kg',
  'Full 50kg bag of parboiled rice, stone-free and clean.', 'Full Wholesale Bag', '50kg',
  8600000, '/images/products/rice-50kg.jpg', 'Royal Stallion', 'bag',
  false, false, false, true,
  ARRAY['rice', 'wholesale', 'bulk'], 4, 30, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ofada-rice-2kg', 'cat-1', 'Ofada Rice (2kg)', 'ofada-rice-2kg',
  'Aromatic unpolished local Ofada rice, carefully destoned and packaged clean for traditional ayamase stew.', 'Aromatic Brown Rice', '2kg',
  420000, '/images/products/ofada-rice.jpg', 'Local Roots', 'pack',
  true, true, false, true,
  ARRAY['ofada', 'rice', 'local', 'traditional'], 5, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ofada-rice-5kg', 'cat-1', 'Ofada Rice (5kg)', 'ofada-rice-5kg',
  '5kg pack of sweet aromatic Ofada rice, washed and stone-free.', 'Aromatic Local Rice', '5kg',
  1020000, '/images/products/ofada-rice.jpg', 'Local Roots', 'bag',
  false, false, false, true,
  ARRAY['ofada', 'rice', 'local'], 6, 45, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-stonefree-rice-5kg', 'cat-1', 'Local Stone-free Rice (5kg)', 'local-stonefree-rice-5kg',
  'Delicious locally grown Nigerian rice, machine cleaned to guarantee zero stones.', 'Pure Nigerian Grain', '5kg',
  880000, '/images/products/rice-5kg.jpg', 'Abakaliki Choice', 'bag',
  false, false, false, true,
  ARRAY['rice', 'local', 'abakaliki'], 7, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-stonefree-rice-10kg', 'cat-1', 'Local Stone-free Rice (10kg)', 'local-stonefree-rice-10kg',
  '10kg bag of locally grown stone-free rice, cooks cleanly and naturally sweet.', 'Pure Nigerian Grain', '10kg',
  1720000, '/images/products/rice-10kg.jpg', 'Abakaliki Choice', 'bag',
  false, true, false, true,
  ARRAY['rice', 'local', 'abakaliki'], 8, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-basmati-rice-1kg', 'cat-1', 'Basmati Rice (1kg)', 'basmati-rice-1kg',
  'Extra long grain fragrant Basmati rice, slender and fluffy.', 'Extra Long Fragrant Grain', '1kg',
  380000, '/images/products/basmati.jpg', 'Royal Chef', 'pack',
  false, false, false, true,
  ARRAY['basmati', 'rice', 'premium'], 9, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-basmati-rice-5kg', 'cat-1', 'Basmati Rice (5kg)', 'basmati-rice-5kg',
  '5kg Royal Basmati rice for special fried rice and curry rice recipes.', 'Extra Long Fragrant Grain', '5kg',
  1800000, '/images/products/basmati.jpg', 'Royal Chef', 'bag',
  true, false, false, true,
  ARRAY['basmati', 'rice'], 10, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-oloyin-beans-1kg', 'cat-1', 'Brown Beans / Oloyin (1kg)', 'brown-beans-oloyin-1kg',
  'Sweet honey beans (Ewa Oloyin), handpicked and clean. Softens rapidly when cooked.', 'Sweet Honey Beans', '1kg',
  220000, '/images/products/beans.jpg', 'Mama Farm', 'pack',
  false, true, false, true,
  ARRAY['beans', 'oloyin', 'protein'], 11, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-oloyin-beans-5kg', 'cat-1', 'Brown Beans / Oloyin (5kg)', 'brown-beans-oloyin-5kg',
  '5kg bag of sweet honey beans (Ewa Oloyin), weevil-free and clean.', 'Sweet Honey Beans', '5kg',
  1050000, '/images/products/beans.jpg', 'Mama Farm', 'bag',
  true, true, false, true,
  ARRAY['beans', 'oloyin', 'protein'], 12, 75, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-oloyin-beans-10kg', 'cat-1', 'Brown Beans / Oloyin (10kg)', 'brown-beans-oloyin-10kg',
  '10kg family sack of sweet brown honey beans.', 'Sweet Honey Beans', '10kg',
  2050000, '/images/products/beans.jpg', 'Mama Farm', 'bag',
  false, false, false, true,
  ARRAY['beans', 'oloyin', 'bulk'], 13, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-white-beans-1kg', 'cat-1', 'White Beans / Drum (1kg)', 'white-beans-drum-1kg',
  'Clean white drum beans, ideal for moi-moi, akara, and gbegiri soup.', 'Premium Drum Beans', '1kg',
  210000, '/images/products/beans-white.jpg', 'Mama Farm', 'pack',
  false, false, false, true,
  ARRAY['beans', 'moi-moi', 'akara'], 14, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-white-beans-5kg', 'cat-1', 'White Beans / Drum (5kg)', 'white-beans-drum-5kg',
  '5kg clean white drum beans for making rich akara and smooth moi-moi.', 'Premium Drum Beans', '5kg',
  980000, '/images/products/beans-white.jpg', 'Mama Farm', 'bag',
  false, false, false, true,
  ARRAY['beans', 'moi-moi'], 15, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-white-beans-10kg', 'cat-1', 'White Beans / Drum (10kg)', 'white-beans-drum-10kg',
  '10kg sack of white drum beans.', 'Premium Drum Beans', '10kg',
  1900000, '/images/products/beans-white.jpg', 'Mama Farm', 'bag',
  false, false, false, true,
  ARRAY['beans', 'bulk'], 16, 30, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-millet-1kg', 'cat-1', 'Millet / Gero (1kg)', 'millet-gero-1kg',
  'Whole grain Gero millet for nutritious porridge and fura.', 'Whole Grain Gero', '1kg',
  150000, '/images/products/millet.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['millet', 'grains', 'cereal'], 17, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-millet-5kg', 'cat-1', 'Millet / Gero (5kg)', 'millet-gero-5kg',
  '5kg pack of whole grain Gero millet.', 'Whole Grain Gero', '5kg',
  680000, '/images/products/millet.jpg', NULL, 'bag',
  false, false, false, true,
  ARRAY['millet', 'grains'], 18, 30, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-guinea-corn-1kg', 'cat-1', 'Guinea Corn / Sorghum (1kg)', 'guinea-corn-sorghum-1kg',
  'Red Guinea corn (Sorghum) for pap (ogi baba) and nourishing cereals.', 'Red Sorghum Grains', '1kg',
  160000, '/images/products/sorghum.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['sorghum', 'guinea-corn'], 19, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-guinea-corn-5kg', 'cat-1', 'Guinea Corn / Sorghum (5kg)', 'guinea-corn-sorghum-5kg',
  '5kg bag of red Sorghum grain.', 'Red Sorghum Grains', '5kg',
  740000, '/images/products/sorghum.jpg', NULL, 'bag',
  false, false, false, true,
  ARRAY['sorghum', 'guinea-corn'], 20, 25, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-yellow-maize-1kg', 'cat-1', 'Yellow Maize (1kg)', 'yellow-maize-1kg',
  'Clean sun-dried yellow corn grains for pap and animal mash.', 'Sun-dried Corn', '1kg',
  120000, '/images/products/maize.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['maize', 'corn'], 21, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-yellow-maize-5kg', 'cat-1', 'Yellow Maize (5kg)', 'yellow-maize-5kg',
  '5kg sun-dried yellow corn grains.', 'Sun-dried Corn', '5kg',
  550000, '/images/products/maize.jpg', NULL, 'bag',
  false, false, false, true,
  ARRAY['maize', 'corn'], 22, 35, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-oats-500g', 'cat-1', 'Rolled Oats (500g)', 'rolled-oats-500g',
  'Heart-healthy 100% whole grain rolled oats.', 'Whole Grain Oats', '500g',
  160000, '/images/products/oats.jpg', 'Quaker', 'pack',
  false, false, false, true,
  ARRAY['oats', 'breakfast'], 23, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-oats-1kg', 'cat-1', 'Rolled Oats (1kg)', 'rolled-oats-1kg',
  '1kg pack of rolled breakfast oats.', 'Whole Grain Oats', '1kg',
  300000, '/images/products/oats.jpg', 'Quaker', 'pack',
  false, false, false, true,
  ARRAY['oats', 'breakfast'], 24, 45, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-couscous-500g', 'cat-1', 'Couscous (500g)', 'couscous-500g',
  'Quick-steaming durum wheat semolina couscous.', 'Durum Semolina', '500g',
  130000, '/images/products/couscous.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['couscous', 'quick-cook'], 25, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garri-5kg-design', 'cat-2', 'Garri (5kg)', 'garri-5kg',
  'Crisp, sour, well-fried Ijebu white garri. Sinks smoothly in cold water for drinking with groundnut or prepares as hot eba.', 'White, Ijebu', '5kg',
  720000, '/images/products/garri-5kg.jpg', 'Ijebu Choice', 'bag',
  true, true, false, false,
  ARRAY['garri', 'ijebu', 'swallow', 'staples'], 26, 180, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garri-1kg', 'cat-2', 'Garri White / Ijebu (1kg)', 'garri-white-ijebu-1kg',
  '1kg bag of crispy tart Ijebu white garri.', 'White, Ijebu', '1kg',
  150000, '/images/products/garri-1kg.jpg', 'Ijebu Choice', 'pack',
  false, false, false, true,
  ARRAY['garri', 'ijebu'], 27, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garri-2kg', 'cat-2', 'Garri White / Ijebu (2kg)', 'garri-white-ijebu-2kg',
  '2kg bag of crispy tart Ijebu white garri.', 'White, Ijebu', '2kg',
  300000, '/images/products/garri-1kg.jpg', 'Ijebu Choice', 'pack',
  false, false, false, true,
  ARRAY['garri', 'ijebu'], 28, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garri-10kg', 'cat-2', 'Garri White / Ijebu (10kg)', 'garri-white-ijebu-10kg',
  '10kg sack of sand-free, well-fried Ijebu garri.', 'White, Ijebu Family Bag', '10kg',
  1400000, '/images/products/garri-5kg.jpg', 'Ijebu Choice', 'bag',
  true, true, false, true,
  ARRAY['garri', 'ijebu', 'bulk'], 29, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garri-yellow-2kg', 'cat-2', 'Garri Yellow / Palm Oil Fried (2kg)', 'garri-yellow-2kg',
  'Traditional Bendel yellow garri fried with fresh palm oil. Perfect for thick, firm eba.', 'Bendel Yellow', '2kg',
  320000, '/images/products/garri-yellow.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['garri', 'yellow', 'eba'], 30, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garri-yellow-5kg', 'cat-2', 'Garri Yellow / Palm Oil Fried (5kg)', 'garri-yellow-5kg',
  '5kg bag of traditional yellow palm-oil garri.', 'Bendel Yellow', '5kg',
  780000, '/images/products/garri-yellow.jpg', NULL, 'bag',
  true, false, false, true,
  ARRAY['garri', 'yellow'], 31, 55, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-poundo-yam-1kg', 'cat-2', 'Poundo Yam Flour (1kg)', 'poundo-yam-flour-1kg',
  '100% white yam flour that prepares into smooth, lump-free pounded yam in minutes.', 'Instant Smooth Pounded Yam', '1kg',
  280000, '/images/products/flour.jpg', 'Ola-Ola', 'pack',
  false, true, false, true,
  ARRAY['poundo', 'yam', 'swallow'], 32, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-poundo-yam-2kg', 'cat-2', 'Poundo Yam Flour (2kg)', 'poundo-yam-flour-2kg',
  '2kg pack of instant smooth pounded yam flour.', 'Instant Smooth Pounded Yam', '2kg',
  540000, '/images/products/flour.jpg', 'Ola-Ola', 'pack',
  false, false, false, true,
  ARRAY['poundo', 'yam'], 33, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-poundo-yam-5kg', 'cat-2', 'Poundo Yam Flour (5kg)', 'poundo-yam-flour-5kg',
  '5kg pack of premium poundo yam flour.', 'Instant Smooth Pounded Yam', '5kg',
  1320000, '/images/products/flour.jpg', 'Ola-Ola', 'bag',
  true, false, false, true,
  ARRAY['poundo', 'yam', 'bulk'], 34, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-semovita-1kg', 'cat-2', 'Golden Penny Semovita (1kg)', 'semovita-1kg',
  'Fine wheat semolina meal, smooth and non-sticky swallow enriched with vitamins.', 'Fortified Semolina Meal', '1kg',
  220000, '/images/products/semovita.jpg', 'Golden Penny', 'pack',
  false, true, false, true,
  ARRAY['semovita', 'swallow', 'wheat'], 35, 140, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-semovita-2kg', 'cat-2', 'Golden Penny Semovita (2kg)', 'semovita-2kg',
  '2kg pack of smooth fortified semovita.', 'Fortified Semolina Meal', '2kg',
  430000, '/images/products/semovita.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['semovita', 'wheat'], 36, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-semovita-5kg', 'cat-2', 'Golden Penny Semovita (5kg)', 'semovita-5kg',
  '5kg family pack of Golden Penny Semovita.', 'Fortified Semolina Meal', '5kg',
  1050000, '/images/products/semovita.jpg', 'Golden Penny', 'bag',
  true, true, false, true,
  ARRAY['semovita', 'wheat', 'bulk'], 37, 65, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-amala-elubo-1kg', 'cat-2', 'Amala / Elubo Isu (1kg)', 'amala-elubo-isu-1kg',
  'Finely milled dried yam flour (Elubo) that cooks into rich, dark, silky Amala for ewedu and gbegiri.', 'Finely Milled Yam Flour', '1kg',
  250000, '/images/products/elubo.jpg', 'Oyo Native', 'pack',
  true, true, false, true,
  ARRAY['amala', 'elubo', 'swallow'], 38, 95, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-amala-elubo-2kg', 'cat-2', 'Amala / Elubo Isu (2kg)', 'amala-elubo-isu-2kg',
  '2kg of pure dark dried yam flour for authentic Amala.', 'Finely Milled Yam Flour', '2kg',
  490000, '/images/products/elubo.jpg', 'Oyo Native', 'pack',
  false, false, false, true,
  ARRAY['amala', 'elubo'], 39, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-plantain-flour-500g', 'cat-2', 'Plantain Flour (500g)', 'plantain-flour-500g',
  '100% unripe plantain flour, low glycemic and wholesome.', '100% Unripe Plantain', '500g',
  180000, '/images/products/flour.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['plantain', 'healthy', 'low-carb'], 40, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-wheat-meal-1kg', 'cat-2', 'Wheat Meal (1kg)', 'wheat-meal-1kg',
  'High-fiber whole wheat meal for soft, nutritious swallow.', 'Whole Grain Wheat', '1kg',
  210000, '/images/products/flour.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['wheat', 'fiber'], 41, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-wheat-meal-2kg', 'cat-2', 'Wheat Meal (2kg)', 'wheat-meal-2kg',
  '2kg high-fiber whole wheat meal.', 'Whole Grain Wheat', '2kg',
  410000, '/images/products/flour.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['wheat', 'fiber'], 42, 55, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ogi-corn-flour-1kg', 'cat-2', 'Dry Pap / Ogi Corn Flour (1kg)', 'dry-pap-ogi-corn-flour-1kg',
  'Clean fermented dried corn starch powder for hot traditional breakfast pap.', 'Traditional Breakfast Custard', '1kg',
  240000, '/images/products/flour.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['pap', 'ogi', 'breakfast'], 43, 65, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-indomie-chicken-carton', 'cat-3', 'Indomie Chicken Instant Noodles (Carton of 40)', 'indomie-chicken-noodles-carton-40',
  'Original Nigerian chicken flavor Indomie instant noodles, carton of 40 packs (70g each).', 'Chicken Flavor (40 x 70g)', 'Carton of 40',
  840000, '/images/products/indomie.jpg', 'Indomie', 'carton',
  true, true, false, true,
  ARRAY['indomie', 'noodles', 'chicken', 'carton'], 44, 200, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-indomie-chicken-single', 'cat-3', 'Indomie Chicken Noodles (70g Single)', 'indomie-chicken-noodles-70g',
  'Single 70g pack of Indomie chicken flavor.', 'Chicken Flavor (70g)', '70g',
  25000, '/images/products/indomie.jpg', 'Indomie', 'pack',
  false, true, false, true,
  ARRAY['indomie', 'single'], 45, 500, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-indomie-onion-carton', 'cat-3', 'Indomie Onion Chicken Noodles (Carton of 40)', 'indomie-onion-chicken-carton',
  'Aromatic onion chicken flavor Indomie noodles, full carton of 40 packs.', 'Onion Chicken (40 x 70g)', 'Carton of 40',
  880000, '/images/products/indomie.jpg', 'Indomie', 'carton',
  true, true, false, true,
  ARRAY['indomie', 'onion-chicken'], 46, 150, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-indomie-super-pack-carton', 'cat-3', 'Indomie Super Pack (Carton of 40)', 'indomie-super-pack-carton',
  'Extra portion 120g Indomie Super Pack chicken flavor, carton of 40.', 'Super Pack (40 x 120g)', 'Carton of 40',
  1350000, '/images/products/indomie.jpg', 'Indomie', 'carton',
  true, false, false, true,
  ARRAY['indomie', 'super-pack'], 47, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-spaghetti-500g', 'cat-3', 'Golden Penny Spaghetti (500g)', 'golden-penny-spaghetti-500g',
  'High quality durum wheat long spaghetti, cooks firm and non-sticky.', 'Durum Semolina Pasta', '500g',
  120000, '/images/products/spaghetti.jpg', 'Golden Penny', 'pack',
  false, true, false, true,
  ARRAY['pasta', 'spaghetti'], 48, 250, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-spaghetti-carton-20', 'cat-3', 'Golden Penny Spaghetti (Carton of 20)', 'golden-penny-spaghetti-carton-20',
  'Full carton of 20 packs of 500g Golden Penny Spaghetti.', 'Durum Semolina (20 x 500g)', 'Carton of 20',
  2300000, '/images/products/spaghetti.jpg', 'Golden Penny', 'carton',
  true, true, false, true,
  ARRAY['pasta', 'spaghetti', 'carton'], 49, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-macaroni-500g', 'cat-3', 'Golden Penny Macaroni (500g)', 'golden-penny-macaroni-500g',
  'Short elbow macaroni pasta for salads and baked pasta.', 'Elbow Pasta', '500g',
  120000, '/images/products/macaroni.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['macaroni', 'pasta'], 50, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-vermicelli-500g', 'cat-3', 'Vermicelli (500g)', 'vermicelli-500g',
  'Thin delicate vermicelli pasta strands.', 'Thin Durum Pasta', '500g',
  125000, '/images/products/macaroni.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['vermicelli', 'pasta'], 51, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-golden-penny-oil-1l-design', 'cat-4', 'Golden Penny Oil (1L)', 'golden-penny-oil-1l',
  'Pure refined clear vegetable cooking oil, cholesterol-free and vitamin A fortified for crisp frying and rich stew.', 'Refined Palm Oil', '1L',
  480000, '/images/products/oil-1l.jpg', 'Golden Penny', 'bottle',
  true, true, false, false,
  ARRAY['oil', 'cooking-oil', 'golden-penny', 'staples'], 52, 140, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-veg-oil-750ml', 'cat-4', 'Vegetable Cooking Oil (750ml)', 'vegetable-oil-750ml',
  'Cholesterol-free pure vegetable oil in a handy 750ml bottle.', 'Pure Vegetable Oil', '750ml',
  360000, '/images/products/oil-1l.jpg', 'Devon King''s', 'bottle',
  false, false, false, true,
  ARRAY['oil', 'vegetable'], 53, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-veg-oil-2l', 'cat-4', 'Vegetable Cooking Oil (2L)', 'vegetable-oil-2l',
  '2 liter bottle of pure vegetable oil for everyday frying.', 'Pure Cooking Oil', '2L',
  890000, '/images/products/oil-1l.jpg', 'Devon King''s', 'bottle',
  false, true, false, true,
  ARRAY['oil', 'vegetable'], 54, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-veg-oil-5l', 'cat-4', 'Vegetable Cooking Oil (5L)', 'vegetable-oil-5l',
  '5 liter keg of pure vegetable oil.', 'Pure Cooking Oil', '5L',
  2150000, '/images/products/oil-keg.jpg', 'Devon King''s', 'keg',
  true, true, false, true,
  ARRAY['oil', 'bulk', 'vegetable'], 55, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-red-palm-oil-1l', 'cat-4', 'Red Palm Oil / Epo Pupa (1L)', 'red-palm-oil-1l',
  'Fresh, rich, unadulterated red palm oil directly from the mill. Zero coloring, naturally aromatic for egusi and ofada sauce.', 'Unadulterated Native Palm Oil', '1L',
  280000, '/images/products/palm-oil.jpg', 'Local Roots', 'bottle',
  true, true, false, true,
  ARRAY['palm-oil', 'native', 'soup'], 56, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-red-palm-oil-4l', 'cat-4', 'Red Palm Oil / Epo Pupa (4L)', 'red-palm-oil-4l',
  '4 liter container of unadulterated fresh red palm oil.', 'Unadulterated Native Palm Oil', '4L',
  1050000, '/images/products/palm-oil.jpg', 'Local Roots', 'keg',
  false, false, false, true,
  ARRAY['palm-oil', 'native'], 57, 45, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-red-palm-oil-25l', 'cat-4', 'Red Palm Oil / Epo Pupa (25L)', 'red-palm-oil-25l',
  'Full 25 liter yellow jerrycan of premium unadulterated palm oil.', 'Commercial Wholesale Keg', '25L',
  5800000, '/images/products/oil-keg.jpg', 'Local Roots', 'keg',
  false, false, false, true,
  ARRAY['palm-oil', 'wholesale'], 58, 20, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-blue-band-500g', 'cat-4', 'Blue Band Margarine (500g)', 'blue-band-margarine-500g',
  'Original Blue Band spread, fortified with vitamins A, B, and D.', 'Vitamin Fortified Spread', '500g',
  260000, '/images/products/margarine.jpg', 'Blue Band', 'tub',
  false, true, false, true,
  ARRAY['margarine', 'bread', 'breakfast'], 59, 95, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-tomato-stew-400g-design', 'cat-5', 'Tomato Stew (400g)', 'tomato-stew-400g',
  'Thick, rich diced tomato stew base with sweet bell pepper and onion notes. Cook authentic Nigerian jollof and stews in minutes.', 'Diced Tomatoes', '400g',
  120000, '/images/products/tomato-tin.jpg', 'Gino', 'tin',
  true, true, false, false,
  ARRAY['tomatoes', 'stew', 'canned', 'staples'], 60, 220, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-tomato-paste-carton-50', 'cat-5', 'Gino Tomato Paste (Carton of 50 Sachets)', 'gino-tomato-paste-carton-50',
  'Full carton of 50 sachets (70g each) Gino triple-concentrated tomato paste.', 'Triple Concentrate (50 x 70g)', 'Carton of 50',
  1150000, '/images/products/tomato-tin.jpg', 'Gino', 'carton',
  true, true, false, true,
  ARRAY['tomato', 'paste', 'sachet'], 61, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-tomato-paste-70g', 'cat-5', 'Gino Tomato Paste (70g Sachet)', 'gino-tomato-paste-70g',
  'Individual 70g sachet Gino tomato paste.', 'Triple Concentrate', '70g',
  25000, '/images/products/tomato-tin.jpg', 'Gino', 'sachet',
  false, false, false, true,
  ARRAY['tomato', 'paste'], 62, 600, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-sardines-125g', 'cat-5', 'Titus Sardines in Vegetable Oil (125g)', 'titus-sardines-125g',
  'Original Titus sardines packed in vegetable oil, rich in Omega-3.', 'In Pure Vegetable Oil', '125g',
  140000, '/images/products/sardine.jpg', 'Titus', 'tin',
  false, true, false, true,
  ARRAY['sardines', 'titus', 'fish'], 63, 180, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-baked-beans-400g', 'cat-5', 'Heinz Baked Beans in Tomato Sauce (400g)', 'heinz-baked-beans-400g',
  'Classic tender navy beans in rich seasoned tomato sauce.', 'In Rich Tomato Sauce', '400g',
  160000, '/images/products/canned-beans.jpg', 'Heinz', 'tin',
  false, false, false, true,
  ARRAY['canned', 'beans', 'breakfast'], 64, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-sweet-corn-340g', 'cat-5', 'Crisp Sweet Corn (340g)', 'sweet-corn-340g',
  'Whole kernel crisp sweet corn, perfect for fried rice and coleslaw.', 'Whole Kernel In Brine', '340g',
  120000, '/images/products/canned-beans.jpg', 'Green Giant', 'tin',
  false, false, false, true,
  ARRAY['sweet-corn', 'salad'], 65, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-mayonnaise-473ml', 'cat-5', 'BAMA Mayonnaise (473ml)', 'bama-mayonnaise-473ml',
  'Rich, creamy authentic BAMA mayonnaise for salad dressings and sandwiches.', 'Real Rich Mayonnaise', '473ml',
  380000, '/images/products/sauce.jpg', 'BAMA', 'jar',
  false, true, false, true,
  ARRAY['mayo', 'salad'], 66, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-maggi-star-pack-100', 'cat-6', 'Maggi Star Seasoning Cubes (Pack of 100)', 'maggi-star-cubes-pack-100',
  'Iconic Nigerian seasoning cubes infused with fermented soya and iron fortification.', 'Fortified Bouillon (100 Cubes)', 'Pack of 100',
  190000, '/images/products/spices.jpg', 'Maggi', 'pack',
  true, true, false, true,
  ARRAY['maggi', 'seasoning', 'cubes', 'staples'], 67, 240, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-knorr-chicken-pack-50', 'cat-6', 'Knorr Chicken Seasoning Cubes (Pack of 50)', 'knorr-chicken-cubes-pack-50',
  'Rich savory chicken flavor seasoning cubes for hearty Nigerian soups and meats.', 'Rich Chicken Flavor (50 Cubes)', 'Pack of 50',
  160000, '/images/products/spices.jpg', 'Knorr', 'pack',
  false, true, false, true,
  ARRAY['knorr', 'seasoning', 'chicken'], 68, 190, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-curry-powder-100g', 'cat-6', 'Ducros Curry Powder (100g)', 'ducros-curry-powder-100g',
  'Aromatic yellow curry spice blend for seasoning beef, chicken and fried rice.', 'Aromatic Curry Blend', '100g',
  110000, '/images/products/spices.jpg', 'Ducros', 'jar',
  false, true, false, true,
  ARRAY['curry', 'spices'], 69, 150, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-thyme-50g', 'cat-6', 'Ducros Thyme Leaves (50g)', 'ducros-thyme-leaves-50g',
  'Fragrant dried thyme herb leaves for meat boiling and jollof rice.', 'Dried Herbal Leaves', '50g',
  85000, '/images/products/spices.jpg', 'Ducros', 'jar',
  false, false, false, true,
  ARRAY['thyme', 'spices'], 70, 130, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-cameroon-pepper-100g', 'cat-6', 'Black Cameroon Pepper (100g)', 'cameroon-pepper-100g',
  'Fiery, smoky ground black dried pepper for suya, pepper soup and roasted fish.', 'Smoked Hot Pepper', '100g',
  140000, '/images/products/spices.jpg', 'Local Roots', 'pack',
  true, false, false, true,
  ARRAY['pepper', 'cameroon', 'spicy'], 71, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ground-crayfish-250g', 'cat-6', 'Pure Ground Crayfish (250g)', 'pure-ground-crayfish-250g',
  '100% pure wild Oron crayfish, sun-dried, cleaned and ground. Zero sand or shells.', 'Pure Oron Crayfish', '250g',
  320000, '/images/products/crayfish.jpg', 'Local Roots', 'jar',
  true, true, false, true,
  ARRAY['crayfish', 'soup', 'seasoning'], 72, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-egusi-ground-500g', 'cat-7', 'Ground Egusi / Melon Seed (500g)', 'ground-egusi-melon-seed-500g',
  'Hand-selected premium melon seed, milled fresh. Thickens into mouthwatering lumpy egusi soup.', 'Premium Milled Melon Seed', '500g',
  380000, '/images/products/egusi.jpg', 'Local Roots', 'pack',
  true, true, false, true,
  ARRAY['egusi', 'soup', 'staples'], 73, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ogbono-ground-250g', 'cat-7', 'Ground Ogbono (250g)', 'ground-ogbono-250g',
  'Authentic high-drawing wild mango seed (Ogbono). Extra draw and aromatic depth.', 'High-Draw Mango Seed', '250g',
  450000, '/images/products/ogbono.jpg', 'Local Roots', 'pack',
  true, true, false, true,
  ARRAY['ogbono', 'soup', 'draw'], 74, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-smoked-catfish-pack', 'cat-7', 'Smoked Catfish (Pack of 3)', 'smoked-catfish-pack-3',
  'Oven-dried hardwood smoked catfish. Sandy-free, tender and aromatic.', 'Hardwood Smoked', 'Pack of 3',
  520000, '/images/products/fish.jpg', NULL, 'pack',
  true, false, false, true,
  ARRAY['fish', 'catfish', 'smoked'], 75, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-stockfish-medium', 'cat-7', 'Stockfish / Okporoko (Medium Pack)', 'stockfish-okporoko-medium-pack',
  'Authentic Norwegian cod stockfish pieces, thoroughly dried and full of flavor.', 'Norwegian Cod', 'Medium Pack',
  680000, '/images/products/fish.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['stockfish', 'okporoko', 'soup'], 76, 55, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-peak-milk-powder-900g', 'cat-8', 'Peak Full Cream Milk Powder (900g Tin)', 'peak-milk-powder-900g',
  'Rich, creamy 100% Dutch dairy full cream milk powder fortified with 28 vitamins and minerals.', 'Full Cream Milk (900g)', '900g Tin',
  1250000, '/images/products/milk-tin.jpg', 'Peak', 'tin',
  true, true, false, true,
  ARRAY['milk', 'peak', 'dairy', 'breakfast'], 77, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-milo-choc-900g', 'cat-8', 'Nestlé Milo Chocolate Drink (900g Refill)', 'nestle-milo-chocolate-900g',
  'Energy-giving malt chocolate drink with activ-go for champion kids and family.', 'Malt Chocolate Drink', '900g',
  890000, '/images/products/milo-tin.jpg', 'Nestlé', 'pack',
  true, true, false, true,
  ARRAY['milo', 'chocolate', 'breakfast'], 78, 140, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-bournvita-900g', 'cat-8', 'Cadbury Bournvita (900g Refill)', 'cadbury-bournvita-900g',
  'The food drink of champions with inner strength vitamins.', 'Cocoa Malt Beverage', '900g',
  780000, '/images/products/milo-tin.jpg', 'Cadbury', 'pack',
  false, false, false, true,
  ARRAY['bournvita', 'beverage'], 79, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-peak-evap-carton', 'cat-8', 'Peak Evaporated Milk (Carton of 24 Tins)', 'peak-evaporated-milk-carton-24',
  'Carton of 24 tins (160g each) rich creamy Peak evaporated milk.', 'Evaporated Dairy (24 x 160g)', 'Carton of 24',
  1650000, '/images/products/milk-tin.jpg', 'Peak', 'carton',
  true, true, false, true,
  ARRAY['milk', 'dairy', 'carton'], 80, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-maltina-pack-6', 'cat-8', 'Maltina Non-Alcoholic Malt (Pack of 6 Cans)', 'maltina-cans-pack-6',
  'Nourishing classic malt drink with multivitamin boost.', 'Rich Malt (6 x 33cl)', 'Pack of 6',
  320000, '/images/products/drinks.jpg', 'Maltina', 'pack',
  false, false, false, true,
  ARRAY['maltina', 'malt', 'drinks'], 81, 75, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-golden-morn-900g', 'cat-9', 'Nestlé Golden Morn (900g)', 'nestle-golden-morn-900g',
  'Wholesome whole grain cereal made from local maize and soya with GRAINSMART nutrient pack.', 'Maize & Soya Cereal', '900g',
  490000, '/images/products/cereal.jpg', 'Nestlé', 'pack',
  true, true, false, true,
  ARRAY['golden-morn', 'cereal', 'breakfast'], 82, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-cerelac-wheat-400g', 'cat-9', 'Nestlé Cerelac Wheat & Milk (400g Tin)', 'nestle-cerelac-wheat-milk-400g',
  'Nutritious infant cereal with milk and iron for babies 6 months+.', 'Infant Cereal', '400g Tin',
  420000, '/images/products/cereal.jpg', 'Nestlé', 'tin',
  false, false, false, true,
  ARRAY['baby', 'cerelac'], 83, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-baby-diapers-large', 'cat-9', 'Pampers Baby Dry Diapers (Size 4, Pack of 52)', 'pampers-baby-dry-size-4',
  'Breathable dry diapers with 12 hours leakage protection.', 'Size 4 (Pack of 52)', 'Pack of 52',
  1150000, '/images/products/household.jpg', 'Pampers', 'pack',
  false, false, false, true,
  ARRAY['baby', 'diapers'], 84, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-chin-chin-500g', 'cat-10', 'Crispy Crunchy Chin Chin (500g Tub)', 'crispy-chin-chin-500g',
  'Buttery, golden Nigerian chin chin with hints of nutmeg and vanilla.', 'Golden Butter Crunch', '500g',
  220000, '/images/products/snacks.jpg', 'Lagos Treats', 'tub',
  true, true, false, true,
  ARRAY['chin-chin', 'snacks', 'sweet'], 85, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-plantain-chips-pack', 'cat-10', 'Spiced Ripe Plantain Chips (Pack of 5)', 'spiced-plantain-chips-pack-5',
  'Thinly sliced crispy sweet dodo chips lightly seasoned.', 'Sweet Dodo Crunch (5 Packs)', 'Pack of 5',
  180000, '/images/products/snacks.jpg', 'Lagos Treats', 'pack',
  false, true, false, true,
  ARRAY['plantain', 'chips', 'snacks'], 86, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-roasted-groundnuts-500g', 'cat-10', 'Crunchy Roasted Groundnuts (500g Jar)', 'roasted-groundnuts-500g',
  'Lightly salted handpicked crunchy roasted peanuts. The ultimate companion for cold garri.', 'Salted Crisp Peanuts', '500g',
  240000, '/images/products/snacks.jpg', 'Lagos Treats', 'jar',
  true, true, false, true,
  ARRAY['groundnuts', 'peanuts', 'garri'], 87, 100, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-granulated-sugar-2kg', 'cat-11', 'Dangote Granulated Sugar (2kg)', 'dangote-granulated-sugar-2kg',
  'Pure refined sparkling white fortified granulated cane sugar.', 'Fortified Cane Sugar', '2kg',
  390000, '/images/products/sugar.jpg', 'Dangote', 'pack',
  false, true, false, true,
  ARRAY['sugar', 'baking', 'sweetener'], 88, 130, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-sugar-cubes-500g', 'cat-11', 'St. Louis Sugar Cubes (500g Box)', 'st-louis-sugar-cubes-500g',
  'Iconic hard sugar cubes for tea, beverages, and soaked garri.', 'Cane Sugar Cubes', '500g Box',
  160000, '/images/products/sugar.jpg', 'St. Louis', 'box',
  true, true, false, true,
  ARRAY['sugar', 'st-louis'], 89, 180, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ariel-detergent-1-8kg', 'cat-12', 'Ariel Automatic Detergent Powder (1.8kg)', 'ariel-detergent-powder-1-8kg',
  'Tough stain removal in 1 wash with fresh floral scent.', 'Stain-Busting Powder', '1.8kg',
  520000, '/images/products/household.jpg', 'Ariel', 'pack',
  true, true, false, true,
  ARRAY['detergent', 'cleaning', 'laundry'], 90, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-hypo-bleach-1l', 'cat-12', 'Hypo Super Bleach (1L)', 'hypo-super-bleach-1l',
  'Hospital grade chlorine bleach for sparkling white fabrics and germ-free disinfection.', 'Whitening & Disinfectant', '1L',
  120000, '/images/products/household.jpg', 'Hypo', 'bottle',
  false, true, false, true,
  ARRAY['bleach', 'hypo', 'disinfectant'], 91, 160, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dettol-disinfectant-1l', 'cat-12', 'Dettol Antiseptic Liquid (1L)', 'dettol-antiseptic-liquid-1l',
  'Trusted antiseptic disinfectant for personal hygiene and first aid.', 'Antiseptic Liquid', '1L',
  640000, '/images/products/household.jpg', 'Dettol', 'bottle',
  false, false, false, true,
  ARRAY['dettol', 'antiseptic'], 92, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-toilet-paper-10', 'cat-12', 'Rose Pearl Soft Toilet Tissue (Pack of 10 Rolls)', 'rose-pearl-toilet-tissue-pack-10',
  'Ultra-absorbent 2-ply embossed soft virgin pulp toilet paper.', '2-Ply Embossed Soft (10 Rolls)', 'Pack of 10 Rolls',
  340000, '/images/products/household.jpg', 'Rose Pearl', 'pack',
  false, true, false, true,
  ARRAY['toilet-paper', 'tissue'], 93, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-milo-soap-200g-design', 'cat-13', 'Milo Soap (200g)', 'milo-soap-200g',
  'Gentle, cleansing everyday bath and household soap bar with natural freshness.', 'For a fresher home', '200g',
  50000, '/images/products/soap.jpg', 'Milo Care', 'bar',
  true, true, false, false,
  ARRAY['soap', 'bathing', 'cleanliness'], 94, 300, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dettol-soap-pack-3', 'cat-13', 'Dettol Cool Antibacterial Soap (Pack of 3)', 'dettol-cool-soap-pack-3',
  'Menthol fresh antibacterial bathing soap with 99.9% germ protection.', 'Antibacterial Bar (3 x 110g)', 'Pack of 3',
  220000, '/images/products/soap.jpg', 'Dettol', 'pack',
  false, true, false, true,
  ARRAY['soap', 'dettol'], 95, 130, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-close-up-toothpaste-140g', 'cat-13', 'Close-Up Red Hot Gel Toothpaste (140g)', 'close-up-red-hot-toothpaste-140g',
  'Anti-bacterial zinc mouthwash power with intense spicy cinnamon blast.', 'Zinc Freshness Gel', '140g',
  125000, '/images/products/personal-care.jpg', 'Close-Up', 'tube',
  false, true, false, true,
  ARRAY['toothpaste', 'close-up'], 96, 180, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-vaseline-petroleum-jelly-400ml', 'cat-13', 'Vaseline Pure Petroleum Jelly (400ml)', 'vaseline-petroleum-jelly-400ml',
  'Triple-purified original petroleum jelly to protect and restore dry skin.', 'Triple Purified Jelly', '400ml',
  340000, '/images/products/personal-care.jpg', 'Vaseline', 'jar',
  false, false, false, true,
  ARRAY['vaseline', 'skincare'], 97, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-fresh-tomatoes-basket', 'cat-14', 'Fresh Tomatoes (Medium Basket)', 'fresh-tomatoes-medium-basket',
  'Crisp, firm, vine-ripened red Jos tomatoes. Sourced fresh at dawn from Mile 12 market.', 'Farm Fresh Red Jos Tomatoes', 'Medium Basket',
  950000, '/images/products/fresh-tomatoes.jpg', NULL, 'basket',
  true, true, true, true,
  ARRAY['fresh', 'tomatoes', 'produce', 'perishable'], 98, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-scotch-bonnet-rodo-1kg', 'cat-14', 'Fresh Scotch Bonnet / Ata Rodo (1kg)', 'fresh-scotch-bonnet-ata-rodo-1kg',
  'Spicy, fiery red and yellow Scotch bonnet peppers with vibrant aroma.', 'Crisp Hot Fresh Pepper', '1kg',
  480000, '/images/products/fresh-peppers.jpg', NULL, 'pack',
  true, true, true, true,
  ARRAY['rodo', 'pepper', 'spicy', 'fresh'], 99, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-fresh-onions-5kg', 'cat-14', 'Red Onions / Alubosa (5kg Bag)', 'red-onions-alubosa-5kg',
  'Firm, sun-cured sweet Kano red bulb onions, packed with rich flavor.', 'Sweet Kano Red Onions', '5kg Bag',
  650000, '/images/products/onions.jpg', NULL, 'bag',
  true, true, true, true,
  ARRAY['onions', 'vegetables', 'fresh'], 100, 55, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ugwu-leaves-bunch', 'cat-14', 'Fresh Ugwu / Fluted Pumpkin Leaf (Bunch)', 'fresh-ugwu-leaf-bunch',
  'Crisp dark green freshly cut fluted pumpkin leaves, hand-sorted for egusi and edikang ikong.', 'Fresh Cut Fluted Pumpkin', 'Large Bunch',
  120000, '/images/products/vegetables.jpg', NULL, 'bunch',
  true, false, true, true,
  ARRAY['ugwu', 'vegetables', 'fresh'], 101, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-eggs-crate-30', 'cat-14', 'Farm Fresh Large Eggs (Crate of 30)', 'farm-fresh-large-eggs-crate-30',
  'Farm-picked fresh large brown eggs with rich golden yolks.', 'Grade A Large (30 Eggs)', 'Crate of 30',
  540000, '/images/products/eggs.jpg', NULL, 'crate',
  true, true, true, true,
  ARRAY['eggs', 'breakfast', 'protein'], 102, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-yam-tuber-large', 'cat-14', 'Benue White Yam Tuber (Large, 1 Piece)', 'benue-white-yam-tuber-large',
  'Heavy, floury old yam tuber from Benue state. Slices beautifully for boiling, frying or pounding.', 'Benue Premium White Yam', '1 Large Tuber (~3.5kg)',
  420000, '/images/products/yam.jpg', NULL, 'piece',
  true, true, true, true,
  ARRAY['yam', 'fresh', 'swallow'], 103, 65, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-frozen-chicken-2kg', 'cat-14', 'Frozen Whole Dressed Chicken (2kg)', 'frozen-whole-dressed-chicken-2kg',
  'Cleanly dressed whole broiler chicken, blast-frozen for maximum tenderness and freshness.', 'Dressed Broiler Chicken', '2kg',
  680000, '/images/products/poultry.jpg', 'Chi Farms', 'pack',
  true, true, true, true,
  ARRAY['chicken', 'poultry', 'frozen', 'meat'], 104, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-frozen-titus-fish-1kg', 'cat-14', 'Frozen Titus Mackerel Fish (1kg)', 'frozen-titus-mackerel-1kg',
  'Fresh frozen Atlantic Titus mackerel, rich in natural oils and omega-3 fatty acids.', 'Atlantic Titus Mackerel', '1kg (~3-4 fishes)',
  450000, '/images/products/fish.jpg', NULL, 'pack',
  false, true, true, true,
  ARRAY['fish', 'titus', 'frozen'], 105, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-couscous-1kg', 'cat-1', 'Durum Couscous (1kg)', 'durum-couscous-1kg',
  'Fine durum wheat couscous, steamed light and fluffy in minutes.', 'Fine Durum Wheat', '1kg',
  250000, '/images/products/couscous.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['couscous', 'grains'], 106, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-stonefree-rice-25kg', 'cat-1', 'Local Stone-free Rice (25kg)', 'local-stonefree-rice-25kg',
  '25kg bag of destoned local rice for large families and events.', 'Pure Nigerian Grain (25kg)', '25kg',
  4100000, '/images/products/rice-25kg.jpg', 'Abakaliki Choice', 'bag',
  false, false, false, true,
  ARRAY['rice', 'bulk'], 107, 35, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-cassava-flour-lafun-1kg', 'cat-2', 'Cassava Flour / White Lafun (1kg)', 'cassava-flour-white-lafun-1kg',
  'Traditional fermented cassava flour (white amala) for authentic local soups.', 'Fermented Cassava Flour', '1kg',
  160000, '/images/products/flour.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['lafun', 'cassava', 'swallow'], 108, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-fufu-flour-1kg', 'cat-2', 'Instant Fufu Flour (1kg)', 'instant-fufu-flour-1kg',
  'Odorless instant cassava fufu flour. Stirs into a stretchy white mound.', 'Odorless Cassava Fufu', '1kg',
  210000, '/images/products/flour.jpg', 'Plantain Touch', 'pack',
  false, false, false, true,
  ARRAY['fufu', 'swallow'], 109, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-wheat-flour-baking-2kg', 'cat-2', 'All Purpose Wheat Flour (2kg)', 'all-purpose-wheat-flour-2kg',
  'Enriched all purpose baking and frying wheat flour for puff-puff, meat pies, and cakes.', 'All Purpose Enriched Flour', '2kg',
  320000, '/images/products/flour.jpg', 'Golden Penny', 'pack',
  false, false, false, true,
  ARRAY['flour', 'baking', 'puff-puff'], 110, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-macaroni-carton-20', 'cat-3', 'Golden Penny Macaroni (Carton of 20)', 'golden-penny-macaroni-carton-20',
  'Full carton of 20 packs of 500g Golden Penny elbow macaroni.', 'Elbow Pasta (20 x 500g)', 'Carton of 20',
  2300000, '/images/products/macaroni.jpg', 'Golden Penny', 'carton',
  false, false, false, true,
  ARRAY['macaroni', 'carton'], 111, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-indomie-cup-noodles', 'cat-3', 'Indomie Cup Noodles (Pack of 6)', 'indomie-cup-noodles-pack-6',
  'Instant on-the-go cup noodles with veggies, dried chicken shreds, and hot broth.', 'Ready In 3 Mins (6 Cups)', 'Pack of 6',
  360000, '/images/products/indomie.jpg', 'Indomie', 'pack',
  false, false, false, true,
  ARRAY['indomie', 'cup-noodles'], 112, 65, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-groundnut-oil-1l', 'cat-4', 'Pure Groundnut Oil (1L)', 'pure-groundnut-oil-1l',
  'Cold-pressed aromatic peanut oil with high smoke point for crispy frying.', '100% Peanut Oil', '1L',
  420000, '/images/products/oil-1l.jpg', 'Grand Pure', 'bottle',
  false, false, false, true,
  ARRAY['groundnut-oil', 'peanut'], 113, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-coconut-oil-500ml', 'cat-4', 'Virgin Coconut Oil (500ml)', 'virgin-coconut-oil-500ml',
  'Extra virgin cold pressed pure coconut oil for cooking, baking and skin/hair conditioning.', 'Cold Pressed Virgin', '500ml',
  350000, '/images/products/oil-1l.jpg', 'Tropical Pure', 'jar',
  false, false, false, true,
  ARRAY['coconut-oil', 'organic'], 114, 45, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-olive-oil-500ml', 'cat-4', 'Extra Virgin Olive Oil (500ml)', 'extra-virgin-olive-oil-500ml',
  'First cold pressed premium olive oil for fresh salads and healthy dressings.', 'Extra Virgin First Cold Press', '500ml',
  590000, '/images/products/oil-1l.jpg', 'Borges', 'bottle',
  false, false, false, true,
  ARRAY['olive-oil', 'healthy'], 115, 35, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-tin-tomatoes-400g', 'cat-5', 'Whole Peeled Plum Tomatoes (400g Tin)', 'whole-peeled-plum-tomatoes-400g',
  'Juicy Italian plum tomatoes in thick rich puree.', 'Whole Peeled In Puree', '400g',
  135000, '/images/products/tomato-tin.jpg', 'Cirio', 'tin',
  false, false, false, true,
  ARRAY['tomatoes', 'plum-tomatoes'], 116, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-corned-beef-340g', 'cat-5', 'Exeter Corned Beef (340g)', 'exeter-corned-beef-340g',
  'Classic seasoned corned beef, excellent for savory jollof and toast spreads.', 'Premium Cured Beef', '340g',
  320000, '/images/products/sardine.jpg', 'Exeter', 'tin',
  false, false, false, true,
  ARRAY['corned-beef', 'canned'], 117, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-salad-cream-285ml', 'cat-5', 'Heinz Classic Salad Cream (285ml)', 'heinz-salad-cream-285ml',
  'Tangy, smooth salad cream dressing.', 'Original Tangy Cream', '285ml',
  260000, '/images/products/sauce.jpg', 'Heinz', 'bottle',
  false, false, false, true,
  ARRAY['salad-cream', 'dressing'], 118, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-tomato-ketchup-340g', 'cat-5', 'Heinz Tomato Ketchup (340g)', 'heinz-tomato-ketchup-340g',
  'Classic rich sun-ripened tomato ketchup.', 'Thick & Rich Ketchup', '340g',
  210000, '/images/products/sauce.jpg', 'Heinz', 'bottle',
  false, false, false, true,
  ARRAY['ketchup', 'condiment'], 119, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-wild-honey-500g', 'cat-5', 'Pure Raw Wild Honey (500g Jar)', 'pure-raw-wild-honey-500g',
  '100% unprocessed raw wild amber forest honey from Nsukka.', '100% Unprocessed Amber Honey', '500g',
  450000, '/images/products/sauce.jpg', 'Local Roots', 'jar',
  true, true, false, true,
  ARRAY['honey', 'natural'], 120, 65, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-suya-pepper-250g', 'cat-6', 'Authentic Suya Pepper Spice / Yaji (250g)', 'suya-pepper-spice-yaji-250g',
  'Authentic northern Nigerian Yaji blend made from kulikuli, ginger, chili, and cloves.', 'Northern Yaji Blend', '250g',
  240000, '/images/products/spices.jpg', 'Local Roots', 'jar',
  true, true, false, true,
  ARRAY['suya', 'yaji', 'spices'], 121, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-iru-locust-beans-100g', 'cat-6', 'Dried Fermented Locust Beans / Iru Woro (100g)', 'dried-fermented-locust-beans-iru-100g',
  'Sun-dried aromatic locust beans. Essential umami seasoning for ewedu, egusi, and ofada stew.', 'Native Umami Seasoning', '100g',
  150000, '/images/products/spices.jpg', 'Local Roots', 'pack',
  true, false, false, true,
  ARRAY['iru', 'locust-beans', 'native'], 122, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dangote-salt-1kg', 'cat-6', 'Dangote Refined Iodized Salt (1kg)', 'dangote-iodized-salt-1kg',
  'Fine grain vacuum refined iodized table salt.', 'Iodized Table Salt', '1kg',
  80000, '/images/products/spices.jpg', 'Dangote', 'pack',
  false, true, false, true,
  ARRAY['salt', 'staples'], 123, 250, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-ginger-powder-100g', 'cat-6', 'Pure Ground Ginger Powder (100g)', 'pure-ground-ginger-powder-100g',
  'Fiery and fragrant dried Kaduna ginger root powder.', 'Spicy Kaduna Ginger', '100g',
  120000, '/images/products/spices.jpg', 'Local Roots', 'jar',
  false, false, false, true,
  ARRAY['ginger', 'spices'], 124, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-garlic-powder-100g', 'cat-6', 'Pure Garlic Powder (100g)', 'pure-garlic-powder-100g',
  'Aromatic dehydrated garlic powder for meat marination.', 'Dehydrated Garlic', '100g',
  130000, '/images/products/spices.jpg', 'Local Roots', 'jar',
  false, false, false, true,
  ARRAY['garlic', 'spices'], 125, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-egusi-whole-1kg', 'cat-7', 'Whole Hand-Peeled Egusi Seeds (1kg)', 'whole-hand-peeled-egusi-seeds-1kg',
  'White whole peeled melon seeds ready to grind or fry.', 'Hand Peeled Melon Seeds', '1kg',
  720000, '/images/products/egusi.jpg', 'Local Roots', 'bag',
  false, false, false, true,
  ARRAY['egusi', 'soup'], 126, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dried-shrimps-250g', 'cat-7', 'Clean Dried Baby Shrimps / Ede (250g)', 'clean-dried-baby-shrimps-250g',
  'Crisp sun-dried sea shrimps. Adds sweet seafood richness to fried rice and soups.', 'Sun-Dried Sea Shrimps', '250g',
  360000, '/images/products/crayfish.jpg', 'Local Roots', 'pack',
  false, false, false, true,
  ARRAY['shrimps', 'crayfish', 'soup'], 127, 55, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dried-ponmo-pack', 'cat-7', 'Clean White Dried Ponmo / Cow Skin (Pack of 10)', 'clean-white-dried-ponmo-pack-10',
  'Hygienically boiled and sun-dried white cow skin. Soaks into plump, soft texture.', 'Hygienic Sun-Dried Cow Skin', 'Pack of 10 Pieces',
  280000, '/images/products/fish.jpg', NULL, 'pack',
  true, true, false, true,
  ARRAY['ponmo', 'meat', 'soup'], 128, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-nescafe-classic-200g', 'cat-8', 'Nescafé Classic Instant Coffee (200g Jar)', 'nescafe-classic-coffee-200g',
  '100% pure soluble coffee with bold rich aroma.', 'Pure Instant Coffee', '200g Jar',
  560000, '/images/products/milo-tin.jpg', 'Nescafé', 'jar',
  false, false, false, true,
  ARRAY['coffee', 'nescafe', 'breakfast'], 129, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-lipton-tea-50bags', 'cat-8', 'Lipton Yellow Label Black Tea (50 Tea Bags)', 'lipton-yellow-label-tea-50-bags',
  'Rich, brisk black tea made with sun-ripened tea leaves.', 'Pure Black Tea (50 Bags)', '50 Bags',
  160000, '/images/products/drinks.jpg', 'Lipton', 'box',
  false, true, false, true,
  ARRAY['tea', 'lipton', 'breakfast'], 130, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-chivita-juice-1l', 'cat-8', 'Chivita 100% Real Apple Fruit Juice (1L)', 'chivita-real-apple-juice-1l',
  'No added sugar 100% real fruit juice.', '100% Fruit Juice', '1L',
  220000, '/images/products/drinks.jpg', 'Chivita', 'pack',
  false, true, false, true,
  ARRAY['juice', 'drinks'], 131, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-eva-water-pack-12', 'cat-8', 'Eva Premium Bottled Water (Pack of 12 x 75cl)', 'eva-bottled-water-pack-12',
  'Pure, crisp refreshing natural bottled drinking water.', 'Pure Water (12 x 75cl)', 'Pack of 12',
  280000, '/images/products/drinks.jpg', 'Eva', 'pack',
  true, true, false, true,
  ARRAY['water', 'bottled-water'], 132, 140, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-pure-zobo-1l', 'cat-8', 'Craft Hibiscus Zobo Drink with Ginger (1L)', 'craft-hibiscus-zobo-drink-1l',
  'Slow-brewed natural dried roselle hibiscus flowers with ginger and cloves. Refreshing and antioxidant rich.', 'Chilled Hibiscus & Ginger', '1L Bottle',
  150000, '/images/products/drinks.jpg', 'Lagos Treats', 'bottle',
  true, false, false, true,
  ARRAY['zobo', 'local', 'drinks'], 133, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-corn-flakes-500g', 'cat-9', 'Kellogg''s Corn Flakes (500g)', 'kelloggs-corn-flakes-500g',
  'Golden crispy toasted corn cereal enriched with essential nutrients.', 'Crispy Toasted Corn', '500g',
  340000, '/images/products/cereal.jpg', 'Kellogg''s', 'pack',
  false, false, false, true,
  ARRAY['cereal', 'breakfast'], 134, 75, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-birds-custard-450g', 'cat-9', 'Bird''s Custard Powder Vanilla (450g Tin)', 'birds-custard-powder-vanilla-450g',
  'Creamy smooth vanilla custard powder for breakfast with akara or moi-moi.', 'Classic Vanilla Custard', '450g Tin',
  210000, '/images/products/cereal.jpg', 'Bird''s', 'tin',
  false, true, false, true,
  ARRAY['custard', 'breakfast'], 135, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-baby-wipes-pack-80', 'cat-9', 'Gentle Pure Baby Wet Wipes (Pack of 80)', 'gentle-baby-wet-wipes-pack-80',
  'Hypoallergenic fragrance-free wet wipes with aloe and chamomile.', 'Hypoallergenic (80 Wipes)', 'Pack of 80',
  140000, '/images/products/household.jpg', NULL, 'pack',
  false, false, false, true,
  ARRAY['baby', 'wipes'], 136, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-mcvities-digestive', 'cat-10', 'McVitie''s Original Digestive Biscuits (400g Roll)', 'mcvities-digestive-biscuits-400g',
  'Wheat-rich sweet crunchy British biscuits made with whole wheat.', 'Wheat Biscuit Roll', '400g Roll',
  170000, '/images/products/snacks.jpg', 'McVitie''s', 'pack',
  false, true, false, true,
  ARRAY['biscuits', 'digestive'], 137, 95, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-roasted-cashews-250g', 'cat-10', 'Ogbomoso Roasted Jumbo Cashew Nuts (250g Jar)', 'roasted-jumbo-cashew-nuts-250g',
  'Premium roasted whole crunchy cashew nuts lightly sea-salted.', 'Jumbo Sea-Salted Cashews', '250g Jar',
  480000, '/images/products/snacks.jpg', 'Lagos Treats', 'jar',
  true, false, false, true,
  ARRAY['cashews', 'nuts', 'snacks'], 138, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-baking-powder-100g', 'cat-11', 'Royal Double Acting Baking Powder (100g)', 'royal-baking-powder-100g',
  'Double acting leavening agent for fluffier cakes and snacks.', 'Double Acting Leavener', '100g',
  95000, '/images/products/sugar.jpg', 'Royal', 'tin',
  false, false, false, true,
  ARRAY['baking', 'leavener'], 139, 85, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dry-yeast-125g', 'cat-11', 'Fermipan Instant Dry Yeast (125g)', 'fermipan-instant-dry-yeast-125g',
  'Fast acting bread and puff-puff yeast for great rise.', 'Fast Acting Dry Yeast', '125g Sachet',
  120000, '/images/products/sugar.jpg', 'Fermipan', 'sachet',
  false, false, false, true,
  ARRAY['yeast', 'baking', 'bread'], 140, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-dudu-osun-pack-3', 'cat-12', 'Dudu-Osun Pure African Black Soap (Pack of 3)', 'dudu-osun-black-soap-pack-3',
  'Traditional handcrafted herbal black soap made with shea butter, palm kernel, and aloe.', 'Traditional Herbal (3 Bars)', 'Pack of 3',
  210000, '/images/products/soap.jpg', 'Dudu-Osun', 'pack',
  true, true, false, true,
  ARRAY['dudu-osun', 'black-soap', 'natural'], 141, 120, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-morning-fresh-1l', 'cat-12', 'Morning Fresh Antibacterial Dishwashing Liquid (1L)', 'morning-fresh-dishwashing-liquid-1l',
  'Super-concentrated grease cutting lemon scented dish liquid.', 'Superior Grease Cutting', '1L',
  240000, '/images/products/household.jpg', 'Morning Fresh', 'bottle',
  false, true, false, true,
  ARRAY['dishwashing', 'cleaning'], 142, 100, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-harpic-toilet-cleaner-500ml', 'cat-12', 'Harpic Power Plus Toilet Cleaner (500ml)', 'harpic-toilet-cleaner-500ml',
  'Removes 100% of limescale and kills 99.9% of bacteria.', 'Deep Cleaning Gel', '500ml',
  180000, '/images/products/household.jpg', 'Harpic', 'bottle',
  false, false, false, true,
  ARRAY['harpic', 'toilet-cleaner'], 143, 80, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-raid-insecticide-300ml', 'cat-12', 'Raid Multi Insect Killer Spray (300ml)', 'raid-multi-insect-spray-300ml',
  'Fast knockdown protection against mosquitoes, cockroaches, and flies.', 'Fast Knockdown Protection', '300ml',
  260000, '/images/products/household.jpg', 'Raid', 'can',
  false, true, false, true,
  ARRAY['raid', 'insecticide', 'mosquito'], 144, 90, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-always-pads-16', 'cat-13', 'Always Ultra Night Sanitary Pads (Pack of 16)', 'always-ultra-night-sanitary-pads-16',
  'Up to 100% leak-free comfort and instant absorption with wings.', 'Leak-Free Night Wings', 'Pack of 16',
  220000, '/images/products/personal-care.jpg', 'Always', 'pack',
  false, true, false, true,
  ARRAY['sanitary', 'personal-care'], 145, 110, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-nivea-lotion-400ml', 'cat-13', 'Nivea Cocoa Butter Nourishing Body Lotion (400ml)', 'nivea-cocoa-butter-lotion-400ml',
  '48h deep moisture serum infused with natural cocoa butter and vitamin E.', '48h Deep Moisture Serum', '400ml',
  490000, '/images/products/personal-care.jpg', 'Nivea', 'bottle',
  false, true, false, true,
  ARRAY['nivea', 'lotion', 'skincare'], 146, 70, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-tatashe-1kg', 'cat-14', 'Fresh Tatashe / Big Bell Pepper (1kg)', 'fresh-tatashe-bell-pepper-1kg',
  'Sweet, fleshy red bell peppers for rich Nigerian party jollof and stews.', 'Crisp Sweet Bell Pepper', '1kg',
  390000, '/images/products/fresh-peppers.jpg', NULL, 'pack',
  true, false, true, true,
  ARRAY['tatashe', 'peppers', 'fresh'], 147, 45, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-yellow-plantain-bunch', 'cat-14', 'Sweet Ripe Yellow Plantain (Bunch of 5)', 'sweet-ripe-yellow-plantain-bunch',
  'Naturally ripened sweet dodo plantains for golden fried slices or roasting.', 'Naturally Ripened Sweet Plantain', 'Bunch of 5 Large Fingers',
  300000, '/images/products/vegetables.jpg', NULL, 'bunch',
  true, true, true, true,
  ARRAY['plantain', 'dodo', 'fresh'], 148, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-irish-potatoes-2kg', 'cat-14', 'Jos Irish Potatoes (2kg Bag)', 'jos-irish-potatoes-2kg',
  'Crisp, firm Jos highland Irish potatoes for boiling, mashing or frying.', 'Highland Jos Potatoes', '2kg Bag',
  380000, '/images/products/yam.jpg', NULL, 'bag',
  false, false, true, true,
  ARRAY['potatoes', 'produce', 'fresh'], 149, 55, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-frozen-turkey-wings-1kg', 'cat-14', 'Frozen Prime Turkey Wings (1kg)', 'frozen-prime-turkey-wings-1kg',
  'Meaty, premium blast-frozen turkey wings for peppered stew and roasting.', 'Meaty Prime Turkey Wings', '1kg (~3 large wings)',
  690000, '/images/products/poultry.jpg', NULL, 'pack',
  true, true, true, true,
  ARRAY['turkey', 'frozen', 'poultry'], 150, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-fresh-beef-1kg', 'cat-14', 'Fresh Lean Beef Steak / Cuts (1kg)', 'fresh-lean-beef-cuts-1kg',
  'Abattoir-inspected fresh succulent beef cuts, trimmed of excess fat.', 'Tender Fresh Local Beef', '1kg Pack',
  750000, '/images/products/poultry.jpg', NULL, 'pack',
  true, true, true, true,
  ARRAY['beef', 'meat', 'fresh'], 151, 45, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-frozen-croaker-fish-1kg', 'cat-14', 'Frozen White Croaker Fish (1kg)', 'frozen-white-croaker-fish-1kg',
  'Fresh Atlantic white croaker fish, cleaned and frozen for grilling and soups.', 'Whole Atlantic Croaker', '1kg (~2 large fishes)',
  580000, '/images/products/fish.jpg', NULL, 'pack',
  false, false, true, true,
  ARRAY['fish', 'croaker', 'frozen'], 152, 35, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-sweet-potatoes-2kg', 'cat-14', 'Orange Fleshed Sweet Potatoes (2kg)', 'orange-fleshed-sweet-potatoes-2kg',
  'Naturally sweet, nutrient-dense orange fleshed sweet potatoes.', 'Sweet Orange Flesh', '2kg Bag',
  260000, '/images/products/yam.jpg', NULL, 'bag',
  false, false, true, true,
  ARRAY['potatoes', 'sweet-potatoes'], 153, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-fresh-carrots-1kg', 'cat-14', 'Crisp Farm Carrots (1kg)', 'crisp-farm-carrots-1kg',
  'Freshly washed crunchy orange Jos carrots for fried rice and salads.', 'Crunchy Orange Carrots', '1kg',
  180000, '/images/products/vegetables.jpg', NULL, 'pack',
  false, false, true, true,
  ARRAY['carrots', 'fresh', 'vegetables'], 154, 60, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-fresh-cabbage-head', 'cat-14', 'Fresh Solid Green Cabbage (Large Head)', 'fresh-green-cabbage-large-head',
  'Heavy, compact head of crisp green cabbage for salads and coleslaw.', 'Compact Green Head', '1 Large Head (~2kg)',
  220000, '/images/products/vegetables.jpg', NULL, 'head',
  false, false, true, true,
  ARRAY['cabbage', 'vegetables', 'fresh'], 155, 40, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  'prod-green-cucumbers-1kg', 'cat-14', 'Fresh Juicy Green Cucumbers (1kg)', 'fresh-green-cucumbers-1kg',
  'Firm, juicy freshly picked green cucumbers.', 'Juicy Farm Cucumbers', '1kg',
  160000, '/images/products/vegetables.jpg', NULL, 'pack',
  false, false, true, true,
  ARRAY['cucumber', 'vegetables', 'fresh'], 156, 50, true
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;
