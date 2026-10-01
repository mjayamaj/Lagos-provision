const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Helper to write SVG
function writeSvg(filename, svgContent) {
  fs.writeFileSync(path.join(targetDir, filename), svgContent.trim());
}

// 1. Rice 10kg (matches design: beige sack with green RICE badge)
writeSvg('rice-10kg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M35 32 C35 28, 85 28, 85 32 L88 88 C88 94, 32 94, 32 88 Z" fill="#E8DEC8" stroke="#D3C5A5" stroke-width="2"/>
  <path d="M32 32 C45 36, 75 36, 88 32 L86 36 C75 39, 45 39, 34 36 Z" fill="#D3C5A5"/>
  <rect x="40" y="48" width="40" height="24" rx="4" fill="#0B4A3A"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">RICE</text>
  <text x="60" y="82" font-family="Arial, sans-serif" font-weight="700" font-size="8" fill="#7A6843" text-anchor="middle">10kg</text>
  <circle cx="60" cy="40" r="3" fill="#F4B63F"/>
</svg>`);

// 2. Rice 5kg, 25kg, 50kg
writeSvg('rice-5kg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M38 38 C38 34, 82 34, 82 38 L85 86 C85 92, 35 92, 35 86 Z" fill="#E8DEC8" stroke="#D3C5A5" stroke-width="2"/>
  <rect x="42" y="52" width="36" height="20" rx="4" fill="#0B4A3A"/>
  <text x="60" y="66" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#FFFFFF" text-anchor="middle">RICE</text>
  <text x="60" y="82" font-family="Arial, sans-serif" font-weight="700" font-size="8" fill="#7A6843" text-anchor="middle">5kg</text>
</svg>`);

writeSvg('rice-25kg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M30 26 C30 22, 90 22, 90 26 L94 92 C94 98, 26 98, 26 92 Z" fill="#E2D4B9" stroke="#C5B28F" stroke-width="2"/>
  <rect x="36" y="44" width="48" height="28" rx="4" fill="#0B4A3A"/>
  <text x="60" y="63" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="#FFFFFF" text-anchor="middle">RICE</text>
  <text x="60" y="84" font-family="Arial, sans-serif" font-weight="800" font-size="9" fill="#7A6843" text-anchor="middle">25kg</text>
</svg>`);

writeSvg('rice-50kg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M28 22 C28 18, 92 18, 92 22 L96 95 C96 100, 24 100, 24 95 Z" fill="#D8C7A3" stroke="#BAA57B" stroke-width="2"/>
  <rect x="34" y="40" width="52" height="32" rx="4" fill="#0B4A3A"/>
  <text x="60" y="60" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">RICE</text>
  <text x="60" y="85" font-family="Arial, sans-serif" font-weight="800" font-size="10" fill="#7A6843" text-anchor="middle">50kg</text>
</svg>`);

writeSvg('ofada-rice.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M36 34 C36 30, 84 30, 84 34 L87 88 C87 94, 33 94, 33 88 Z" fill="#D6B88D" stroke="#B89461" stroke-width="2"/>
  <rect x="40" y="50" width="40" height="22" rx="4" fill="#6B2E18"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#FFFFFF" text-anchor="middle">OFADA</text>
</svg>`);

writeSvg('basmati.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M38 32 C38 28, 82 28, 82 32 L85 88 C85 93, 35 93, 35 88 Z" fill="#1E3A8A" stroke="#172554" stroke-width="2"/>
  <rect x="42" y="48" width="36" height="24" rx="4" fill="#F4B63F"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#1E3A8A" text-anchor="middle">BASMATI</text>
</svg>`);

// 3. Garri 5kg (matches design: yellow bag with dark text GARRI)
writeSvg('garri-5kg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M35 34 C35 30, 85 30, 85 34 L88 88 C88 94, 32 94, 32 88 Z" fill="#F4B63F" stroke="#DC9C23" stroke-width="2"/>
  <path d="M32 34 C45 37, 75 37, 88 34 L86 38 C75 40, 45 40, 34 38 Z" fill="#DC9C23"/>
  <rect x="38" y="50" width="44" height="22" rx="4" fill="#0B4A3A"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="#F4B63F" text-anchor="middle" letter-spacing="1">GARRI</text>
  <text x="60" y="82" font-family="Arial, sans-serif" font-weight="800" font-size="8" fill="#583B08" text-anchor="middle">Ijebu • 5kg</text>
</svg>`);

writeSvg('garri-1kg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M38 38 C38 34, 82 34, 82 38 L84 86 C84 91, 36 91, 36 86 Z" fill="#F4B63F" stroke="#DC9C23" stroke-width="2"/>
  <rect x="42" y="52" width="36" height="18" rx="3" fill="#0B4A3A"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#F4B63F" text-anchor="middle">GARRI</text>
  <text x="60" y="80" font-family="Arial, sans-serif" font-weight="700" font-size="7" fill="#583B08" text-anchor="middle">1kg</text>
</svg>`);

writeSvg('garri-yellow.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M35 34 C35 30, 85 30, 85 34 L88 88 C88 94, 32 94, 32 88 Z" fill="#E8683A" stroke="#C44E23" stroke-width="2"/>
  <rect x="38" y="50" width="44" height="22" rx="4" fill="#F4B63F"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#6B2209" text-anchor="middle">YELLOW</text>
  <text x="60" y="82" font-family="Arial, sans-serif" font-weight="800" font-size="8" fill="#FFF" text-anchor="middle">Bendel Garri</text>
</svg>`);

// 4. Tomato Stew 400g (matches design: red tin can with tomato graphic)
writeSvg('tomato-tin.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <ellipse cx="60" cy="36" rx="26" ry="7" fill="#CBD5E1"/>
  <ellipse cx="60" cy="35" rx="25" ry="6" fill="#E2E8F0"/>
  <path d="M34 36 L34 84 C34 91, 86 91, 86 84 L86 36 Z" fill="#DC2626"/>
  <ellipse cx="60" cy="84" rx="26" ry="7" fill="#B91C1C"/>
  <circle cx="60" cy="60" r="14" fill="#FEF2F2"/>
  <circle cx="57" cy="62" r="7" fill="#DC2626"/>
  <circle cx="64" cy="62" r="6" fill="#EF4444"/>
  <path d="M57 54 C58 50, 64 50, 63 54" stroke="#16A34A" stroke-width="2" fill="none"/>
  <text x="60" y="80" font-family="Arial, sans-serif" font-weight="800" font-size="6" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">TOMATO STEW</text>
</svg>`);

// 5. Golden Penny Oil 1L (matches design: clear bottle with golden oil)
writeSvg('oil-1l.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="54" y="24" width="12" height="8" rx="2" fill="#E8683A"/>
  <path d="M56 32 L64 32 L70 42 L72 88 C72 92, 48 92, 48 88 L50 42 Z" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
  <rect x="50" y="54" width="20" height="18" rx="2" fill="#FEF3C7"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="6" fill="#B45309" text-anchor="middle">PURE</text>
  <text x="60" y="70" font-family="Arial, sans-serif" font-weight="800" font-size="5" fill="#B45309" text-anchor="middle">OIL • 1L</text>
</svg>`);

writeSvg('oil-keg.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="40" y="32" width="40" height="58" rx="8" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
  <rect x="52" y="22" width="16" height="10" rx="2" fill="#DC2626"/>
  <path d="M46 32 C46 22, 74 22, 74 32" stroke="#D97706" stroke-width="4" fill="none"/>
  <rect x="46" y="52" width="28" height="20" rx="3" fill="#FFF"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#B45309" text-anchor="middle">5L KEG</text>
</svg>`);

writeSvg('palm-oil.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="54" y="24" width="12" height="8" rx="2" fill="#E8683A"/>
  <path d="M56 32 L64 32 L70 42 L72 88 C72 92, 48 92, 48 88 L50 42 Z" fill="#991B1B" stroke="#7F1D1D" stroke-width="1.5"/>
  <rect x="50" y="54" width="20" height="18" rx="2" fill="#FEF2F2"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="6" fill="#991B1B" text-anchor="middle">PALM</text>
  <text x="60" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="5" fill="#7F1D1D" text-anchor="middle">OIL</text>
</svg>`);

// 6. Milo Soap 200g (matches design: green bar/box with MILO)
writeSvg('soap.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="32" y="44" width="56" height="36" rx="8" fill="#0B4A3A" stroke="#08372B" stroke-width="2"/>
  <rect x="36" y="48" width="48" height="28" rx="5" fill="#15803D"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">MILO</text>
  <text x="60" y="73" font-family="Arial, sans-serif" font-weight="700" font-size="6" fill="#86EFAC" text-anchor="middle">SOAP • 200g</text>
</svg>`);

// 7. Beans
writeSvg('beans.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M36 34 C36 30, 84 30, 84 34 L87 88 C87 94, 33 94, 33 88 Z" fill="#92400E" stroke="#78350F" stroke-width="2"/>
  <rect x="40" y="52" width="40" height="20" rx="4" fill="#FEF3C7"/>
  <text x="60" y="66" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#92400E" text-anchor="middle">OLOYIN</text>
</svg>`);

writeSvg('beans-white.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M36 34 C36 30, 84 30, 84 34 L87 88 C87 94, 33 94, 33 88 Z" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/>
  <rect x="40" y="52" width="40" height="20" rx="4" fill="#0B4A3A"/>
  <text x="60" y="66" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">DRUM</text>
</svg>`);

// 8. Other staples
writeSvg('millet.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="60" cy="60" r="30" fill="#D97706"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">MILLET</text>
</svg>`);

writeSvg('sorghum.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="60" cy="60" r="30" fill="#B91C1C"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">SORGHUM</text>
</svg>`);

writeSvg('maize.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="44" y="34" width="32" height="52" rx="10" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#78350F" text-anchor="middle">MAIZE</text>
</svg>`);

writeSvg('oats.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="32" width="48" height="56" rx="6" fill="#1E3A8A"/>
  <circle cx="60" cy="54" r="14" fill="#DC2626"/>
  <text x="60" y="78" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">OATS</text>
</svg>`);

writeSvg('couscous.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="38" y="34" width="44" height="54" rx="6" fill="#CA8A04"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">COUSCOUS</text>
</svg>`);

writeSvg('flour.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M36 34 C36 30, 84 30, 84 34 L87 88 C87 94, 33 94, 33 88 Z" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>
  <rect x="42" y="52" width="36" height="20" rx="4" fill="#0B4A3A"/>
  <text x="60" y="66" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">FLOUR</text>
</svg>`);

writeSvg('semovita.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M36 34 C36 30, 84 30, 84 34 L87 88 C87 94, 33 94, 33 88 Z" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
  <rect x="40" y="50" width="40" height="24" rx="4" fill="#1E3A8A"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#F59E0B" text-anchor="middle">SEMOVITA</text>
</svg>`);

writeSvg('elubo.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M36 34 C36 30, 84 30, 84 34 L87 88 C87 94, 33 94, 33 88 Z" fill="#44403C" stroke="#292524" stroke-width="2"/>
  <rect x="42" y="52" width="36" height="20" rx="4" fill="#E8683A"/>
  <text x="60" y="66" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FFF" text-anchor="middle">ELUBO</text>
</svg>`);

writeSvg('indomie.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="30" y="38" width="60" height="44" rx="6" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
  <rect x="36" y="44" width="48" height="32" rx="3" fill="#FBBF24"/>
  <text x="60" y="62" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#DC2626" text-anchor="middle" letter-spacing="0.5">Indomie</text>
  <text x="60" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="6" fill="#15803D" text-anchor="middle">CHICKEN</text>
</svg>`);

writeSvg('spaghetti.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="44" y="24" width="32" height="74" rx="4" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
  <rect x="48" y="48" width="24" height="24" rx="2" fill="#DC2626"/>
  <text x="60" y="63" font-family="Arial, sans-serif" font-weight="900" font-size="6" fill="#FFF" text-anchor="middle">PASTA</text>
</svg>`);

writeSvg('macaroni.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="34" width="48" height="54" rx="6" fill="#D97706"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">MACARONI</text>
</svg>`);

writeSvg('margarine.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M34 44 L86 44 L82 82 L38 82 Z" fill="#1E40AF"/>
  <ellipse cx="60" cy="44" rx="26" ry="6" fill="#2563EB"/>
  <rect x="42" y="56" width="36" height="18" rx="2" fill="#FBBF24"/>
  <text x="60" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="7" fill="#1E40AF" text-anchor="middle">BLUE BAND</text>
</svg>`);

writeSvg('sardine.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="32" y="44" width="56" height="34" rx="6" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
  <rect x="38" y="50" width="44" height="22" rx="3" fill="#FBBF24"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#1E3A8A" text-anchor="middle">TITUS</text>
</svg>`);

writeSvg('canned-beans.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <ellipse cx="60" cy="38" rx="24" ry="6" fill="#CBD5E1"/>
  <path d="M36 38 L36 82 C36 88, 84 88, 84 82 L84 38 Z" fill="#0284C7"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">BEANS</text>
</svg>`);

writeSvg('sauce.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="42" y="32" width="36" height="58" rx="8" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>
  <rect x="46" y="50" width="28" height="22" rx="3" fill="#E8683A"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="7" fill="#FFF" text-anchor="middle">SAUCE</text>
</svg>`);

writeSvg('spices.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="42" y="34" width="36" height="56" rx="6" fill="#0B4A3A"/>
  <rect x="46" y="48" width="28" height="24" rx="2" fill="#F4B63F"/>
  <text x="60" y="63" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#0B4A3A" text-anchor="middle">SPICE</text>
</svg>`);

writeSvg('crayfish.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="60" cy="60" r="30" fill="#EA580C"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">CRAYFISH</text>
</svg>`);

writeSvg('egusi.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="34" width="48" height="54" rx="8" fill="#FEF08A" stroke="#EAB308" stroke-width="2"/>
  <rect x="42" y="50" width="36" height="22" rx="4" fill="#0B4A3A"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FEF08A" text-anchor="middle">EGUSI</text>
</svg>`);

writeSvg('ogbono.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="34" width="48" height="54" rx="8" fill="#78350F" stroke="#451A03" stroke-width="2"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FEF3C7" text-anchor="middle">OGBONO</text>
</svg>`);

writeSvg('fish.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M30 60 C45 42, 75 42, 90 60 C75 78, 45 78, 30 60 Z" fill="#0284C7"/>
  <polygon points="90,60 100,50 100,70" fill="#0369A1"/>
  <circle cx="45" cy="56" r="3" fill="#FFF"/>
</svg>`);

writeSvg('milk-tin.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <ellipse cx="60" cy="36" rx="24" ry="6" fill="#CBD5E1"/>
  <path d="M36 36 L36 84 C36 90, 84 90, 84 84 L84 36 Z" fill="#1E3A8A"/>
  <rect x="42" y="50" width="36" height="24" rx="3" fill="#FFF"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#1E3A8A" text-anchor="middle">PEAK</text>
</svg>`);

writeSvg('milo-tin.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <ellipse cx="60" cy="36" rx="24" ry="6" fill="#CBD5E1"/>
  <path d="M36 36 L36 84 C36 90, 84 90, 84 84 L84 36 Z" fill="#15803D"/>
  <text x="60" y="66" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="#FFF" text-anchor="middle">MILO</text>
</svg>`);

writeSvg('drinks.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="44" y="30" width="32" height="62" rx="6" fill="#DC2626"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">DRINK</text>
</svg>`);

writeSvg('cereal.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="30" width="48" height="62" rx="6" fill="#F59E0B"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#78350F" text-anchor="middle">CEREAL</text>
</svg>`);

writeSvg('household.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="42" y="32" width="36" height="60" rx="6" fill="#0284C7"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="7" fill="#FFF" text-anchor="middle">CLEAN</text>
</svg>`);

writeSvg('snacks.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="34" width="48" height="54" rx="6" fill="#D97706"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">SNACK</text>
</svg>`);

writeSvg('sugar.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="36" y="36" width="48" height="50" rx="6" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#0F172A" text-anchor="middle">SUGAR</text>
</svg>`);

writeSvg('personal-care.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <rect x="42" y="30" width="36" height="62" rx="6" fill="#0D9488"/>
  <text x="60" y="64" font-family="Arial, sans-serif" font-weight="900" font-size="7" fill="#FFF" text-anchor="middle">CARE</text>
</svg>`);

writeSvg('fresh-tomatoes.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="50" cy="62" r="18" fill="#DC2626"/>
  <circle cx="70" cy="62" r="18" fill="#EF4444"/>
  <circle cx="60" cy="50" r="16" fill="#B91C1C"/>
  <polygon points="60,40 56,46 64,46" fill="#16A34A"/>
</svg>`);

writeSvg('fresh-peppers.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="52" cy="60" r="14" fill="#DC2626"/>
  <circle cx="68" cy="60" r="14" fill="#F59E0B"/>
  <circle cx="60" cy="50" r="10" fill="#16A34A"/>
</svg>`);

writeSvg('onions.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="60" cy="62" r="22" fill="#831843"/>
  <path d="M60 40 L60 32" stroke="#15803D" stroke-width="4"/>
</svg>`);

writeSvg('vegetables.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <path d="M40 75 C30 45, 60 30, 80 75 Z" fill="#15803D"/>
  <path d="M50 75 C45 40, 75 35, 90 75 Z" fill="#16A34A"/>
</svg>`);

writeSvg('eggs.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <ellipse cx="60" cy="60" rx="18" ry="24" fill="#D97706"/>
  <ellipse cx="58" cy="58" rx="16" ry="22" fill="#F59E0B"/>
</svg>`);

writeSvg('yam.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <ellipse cx="60" cy="60" rx="16" ry="32" transform="rotate(45 60 60)" fill="#78350F" stroke="#451A03" stroke-width="2"/>
</svg>`);

writeSvg('poultry.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect width="120" height="120" rx="16" fill="#FDFBF5"/>
  <circle cx="60" cy="60" r="26" fill="#EA580C"/>
  <text x="60" y="65" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#FFF" text-anchor="middle">MEAT</text>
</svg>`);

console.log('All product SVGs written successfully.');
