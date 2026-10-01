const fs = require('fs');
const path = require('path');

// Read compiled/source data
// We can parse or import from our catalog and delivery config
const { CATEGORIES, PRODUCTS } = require('../src/data/catalog');
const { LAGOS_LGAS } = require('../src/config/delivery');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

let sql = `-- Lagos Provision Seed SQL
-- Generated for Supabase Postgres
-- Contains 14 categories, 20 Lagos delivery zones, and 156+ products

-- 1. Insert Categories
`;

CATEGORIES.forEach((cat) => {
  sql += `INSERT INTO public.categories (id, name, slug, icon, sort_order, is_active)
VALUES (${escapeSql(cat.id)}, ${escapeSql(cat.name)}, ${escapeSql(cat.slug)}, ${escapeSql(cat.icon)}, ${cat.sort_order}, ${cat.is_active})
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;\n`;
});

sql += `\n-- 2. Insert Delivery Zones (All 20 Lagos LGAs @ ₦2,000 flat fee)\n`;
LAGOS_LGAS.forEach((lga) => {
  sql += `INSERT INTO public.delivery_zones (lga, fee_kobo, is_active)
VALUES (${escapeSql(lga)}, 200000, true)
ON CONFLICT (lga) DO UPDATE SET fee_kobo = EXCLUDED.fee_kobo;\n`;
});

sql += `\n-- 3. Insert Products (156+ items, including exact design products)\n`;
PRODUCTS.forEach((p) => {
  const tagsSql = p.tags && p.tags.length > 0 ? `ARRAY[${p.tags.map((t) => escapeSql(t)).join(', ')}]` : `'{}'::text[]`;
  sql += `INSERT INTO public.products (
  id, category_id, name, slug, description, descriptor, size_label,
  price_kobo, image_url, brand, unit, is_featured, is_best_seller,
  is_perishable, price_is_placeholder, tags, sort_order, stock_qty, is_active
) VALUES (
  ${escapeSql(p.id)}, ${escapeSql(p.category_id)}, ${escapeSql(p.name)}, ${escapeSql(p.slug)},
  ${escapeSql(p.description)}, ${escapeSql(p.descriptor)}, ${escapeSql(p.size_label)},
  ${p.price_kobo}, ${escapeSql(p.image_url)}, ${escapeSql(p.brand || null)}, ${escapeSql(p.unit || null)},
  ${p.is_featured}, ${p.is_best_seller}, ${p.is_perishable}, ${p.price_is_placeholder},
  ${tagsSql}, ${p.sort_order}, ${p.stock_qty}, ${p.is_active}
) ON CONFLICT (slug) DO UPDATE SET
  price_kobo = EXCLUDED.price_kobo,
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  size_label = EXCLUDED.size_label,
  image_url = EXCLUDED.image_url;\n`;
});

const outputPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
fs.writeFileSync(outputPath, sql);
console.log(`Generated ${outputPath} with ${CATEGORIES.length} categories, ${LAGOS_LGAS.length} zones, and ${PRODUCTS.length} products.`);
