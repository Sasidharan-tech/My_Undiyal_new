I am building a Next.js (App Router) mobile-first e-commerce application using Tailwind CSS.
I will provide:
The target page
The Figma CSS
You must convert it into a clean, reusable, production-ready component following ALL rules below.
📌 TARGET PAGE
This component belongs to:
[WRITE PAGE NAME HERE → home / product / cart / order / payment / etc.]
🎨 FIGMA CSS INPUT
[PASTE FIGMA CSS HERE]
📁 STRICT PROJECT STRUCTURE
Place component ONLY in:
components/
common/
ui/
sections/{page}/
✔ Example:
home → sections/home/
product → sections/product/
cart → sections/cart/
🔁 REUSE RULE (VERY IMPORTANT)
Before creating:
Check existing components:
ProductCard
Button
PriceSummary
QuantityStepper
Header / BottomNav
👉 If exists → reuse
👉 Do NOT duplicate
📱 MOBILE-FIRST DESIGN (TOP PRIORITY)
Default design = mobile
Then scale:
sm → md → lg
MUST ENSURE:
No overlapping
No UI breaking
No horizontal scroll
Proper touch spacing
Clean vertical stacking
Spacing rules:
px-4
py-3 / py-4
gap-3 / gap-4
rounded-xl
🎨 STYLING RULES
Use Tailwind CSS
Convert Figma CSS → Tailwind
❗ If not possible:
Add CSS in styles/globals.css
Use meaningful class names:
home-banner-section
product-card-container
cart-item-wrapper
❌ No inline styles
❌ No random class names
🧠 DESIGN IMPROVEMENT RULE
If Figma design is:
Not mobile-friendly
Misaligned
Poor spacing
👉 Fix it while keeping design intent
👉 Make it modern and clean
🧩 UI CONSISTENCY
Use existing app design style
Keep same spacing system
Match existing cards/buttons
Use global background
🖼️ ASSETS USAGE
Use images from:
/backgrounds/
/banners/
/categories/
/icons/
/schemes/
Example:
/icons/cart/add_icon.png
🧾 OUTPUT FORMAT (STRICT)
Provide:
File path
components/sections/{page}/ComponentName.js
Full component code
Clean JSX
Semantic HTML
No unnecessary wrappers
Tailwind styling
Proper responsive design
Perfect alignment
globals.css (only if needed)
🚫 STRICTLY AVOID
Broken mobile UI
Overlapping elements
Duplicate components
Inline styles
Bad spacing
🎯 FINAL GOAL
Convert Figma CSS into:
✅ Mobile-first UI
✅ Clean and modern design
✅ Reusable component
✅ Perfect alignment
✅ No UI bugs
🚀 NOW START