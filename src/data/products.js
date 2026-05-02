const rawProducts = [
  {
    id: "electro-001",
    categoryId: "electronics",
    name: "Smart Refrigerator 190 L",
    shortName: "Refrigerator 190 L",
    price: 14999,
    oldPrice: 16999,
    image: "/categories/images/electronics.png",
    description: "Energy-efficient refrigerator with fast cooling technology.",
    schemePreview: "Immediate Purchase",
    deliveryText: "Delivery in 5 days",
    newArrival: "yes",
  },
  {
    id: "electro-002",
    categoryId: "electronics",
    name: "43 Inch Smart LED TV",
    shortName: "43 Inch Smart TV",
    price: 21999,
    oldPrice: 24999,
    image: "/categories/images/electronics.png",
    description: "FHD smart television with streaming apps and voice control.",
    schemePreview: "Festival Offer",
    deliveryText: "Delivery in 7 days",
    newArrival: "no",
  },
  {
    id: "furn-001",
    categoryId: "furniture",
    name: "Premium 3 Seater Sofa",
    shortName: "3 Seater Sofa",
    price: 23999,
    oldPrice: 26999,
    image: "/categories/images/furniture.png",
    description: "Comfortable fabric sofa with high-density cushioning.",
    schemePreview: "Monthly Scheme",
    deliveryText: "Delivery in 6 days",
    newArrival: "yes",
  },
  {
    id: "furn-002",
    categoryId: "furniture",
    name: "Wooden Dining Table Set",
    shortName: "Dining Set",
    price: 19999,
    oldPrice: 22999,
    image: "/categories/images/furniture.png",
    description: "Elegant dining set with durable wood finish and seating.",
    schemePreview: "Weekly Scheme",
    deliveryText: "Delivery in 8 days",
    newArrival: "no",
  },
  {
    id: "grocery-001",
    categoryId: "grocery",
    name: "Monthly Grocery Combo Pack",
    shortName: "Grocery Combo",
    price: 2499,
    oldPrice: 2999,
    image: "/categories/images/grocery.png",
    description: "Essential monthly grocery combo with rice, dhal, and oils.",
    schemePreview: "Family Pack",
    deliveryText: "Delivery in 2 days",
    newArrival: "yes",
  },
  {
    id: "grocery-002",
    categoryId: "grocery",
    name: "Premium Staples Bundle",
    shortName: "Staples Bundle",
    price: 1899,
    oldPrice: 2299,
    image: "/categories/images/grocery.png",
    description: "High-quality staples bundle for everyday cooking needs.",
    schemePreview: "Weekly Savings",
    deliveryText: "Delivery in 3 days",
    newArrival: "no",
  },
  {
    id: "crackers-001",
    categoryId: "crackers",
    name: "Festival Crackers Box",
    shortName: "Crackers Box",
    price: 1599,
    oldPrice: 1899,
    image: "/categories/images/crackers.png",
    description: "Safe and colorful crackers set for festive celebrations.",
    schemePreview: "Festival Pack",
    deliveryText: "Delivery in 4 days",
    newArrival: "yes",
  },
  {
    id: "crackers-002",
    categoryId: "crackers",
    name: "Kids Sparklers Collection",
    shortName: "Sparklers Collection",
    price: 999,
    oldPrice: 1299,
    image: "/categories/images/crackers.png",
    description: "Fun sparkler and flowerpot combo suitable for families.",
    schemePreview: "Celebration Offer",
    deliveryText: "Delivery in 4 days",
    newArrival: "no",
  },
  {
    id: "copper-001",
    categoryId: "coppers",
    name: "Copper Water Bottle Set",
    shortName: "Copper Bottle Set",
    price: 1499,
    oldPrice: 1799,
    image: "/categories/images/coppers.png",
    description: "Pure copper bottle set designed for healthy daily use.",
    schemePreview: "Pongal Purchase",
    deliveryText: "Delivery in 5 days",
    newArrival: "yes",
  },
  {
    id: "copper-002",
    categoryId: "coppers",
    name: "Premium Copper Kitchen Set",
    shortName: "Copper Kitchen Set",
    price: 9999,
    oldPrice: 10999,
    image: "/categories/images/coppers.png",
    description: "Handcrafted copper collection for healthy cooking.",
    schemePreview: "Limited Offer",
    deliveryText: "Delivery in 6 days",
    newArrival: "no",
  },
  {
    id: "brass-001",
    categoryId: "brass",
    name: "Traditional Brass Cookware Set",
    shortName: "Brass Cookware Set",
    price: 8999,
    oldPrice: 10299,
    image: "/categories/images/brass.png",
    description: "Complete brass cookware set for festive and daily cooking.",
    schemePreview: "Festival Offer",
    deliveryText: "Delivery in 5 days",
    newArrival: "yes",
  },
  {
    id: "brass-002",
    categoryId: "brass",
    name: "Brass Pooja Essentials Kit",
    shortName: "Pooja Brass Kit",
    price: 3299,
    oldPrice: 3899,
    image: "/categories/images/brass.png",
    description: "Decorative and utility brass items for pooja and gifting.",
    schemePreview: "Festive Combo",
    deliveryText: "Delivery in 3 days",
    newArrival: "no",
  },
];

const defaultProductDetails = {
  id: "dummy-000",
  categoryId: "electronics",
  name: "Sample Product",
  shortName: "Sample Product",
  price: 999,
  oldPrice: 1299,
  image: "/categories/images/electronics.png",
  description:
    "This is a sample product description used when product data is missing.",
  schemePreview: "Immediate Purchase",
  deliveryText: "Delivery in 7 days",
  newArrival: "no",
  warrantyText: "1 Year of warranty",
  immediateOptionTitle: "Immediate Purchase",
  pongalOptionTitle: "Pongal Purchase",
  pongalSuffixText: "x 53 Weeks",
  immediateDeliveryText: "Delivery with in 7 days",
  pongalDeliveryText: "Delivery on 11 Jan 2027",
  discountLabel: "-10% off",
  checkoutTitle: "Diwali Purchase",
  checkoutSchemeName: "Diwali Scheme",
  checkoutStartDate: "02/11/2026",
  checkoutEndDate: "02/11/2026",
  checkoutDeliveryDate: "11 Jan 2027",
  weeklyCompletedDues: 21,
  monthlyCompletedDues: 5,
  weeklyTotalDues: 53,
  monthlyTotalDues: 12,
  detailDescription:
    "Upgrade your kitchen with the next-generation refrigerator designed for performance, freshness, and style. Built with advanced cooling technology, this fridge keeps your food fresh for longer while maintaining optimal temperature across every shelf.",
  highlights: [
    "24 Days Freshness Technology",
    "Energy Efficient Performance",
    "Spacious Storage Design",
    "Fast Cooling System",
  ],
};

const categoryFallbackImage = {
  electronics: "/categories/images/electronics.png",
  furniture: "/categories/images/furniture.png",
  grocery: "/categories/images/grocery.png",
  crackers: "/categories/images/crackers.png",
  coppers: "/categories/images/coppers.png",
  brass: "/categories/images/brass.png",
};

function pickString(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function pickNumber(value, fallback) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : fallback;
}

function normalizeNewArrival(value) {
  const normalized = String(value || "").toLowerCase();
  return normalized === "yes" || normalized === "true" ? "yes" : "no";
}

function normalizeHighlights(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value
    .map((item) => pickString(item, ""))
    .filter((item) => item.length > 0);

  return cleaned.length > 0 ? cleaned : fallback;
}

function getFallbackImage(categoryId) {
  return categoryFallbackImage[categoryId] || defaultProductDetails.image;
}

function normalizeProduct(product, index) {
  const safeCategoryId = pickString(
    product?.categoryId,
    defaultProductDetails.categoryId,
  );
  const safeName = pickString(
    product?.name,
    `Dummy Product ${String(index + 1).padStart(2, "0")}`,
  );
  const safePrice = pickNumber(product?.price, defaultProductDetails.price);
  const safeOldPrice = Math.max(
    safePrice,
    pickNumber(product?.oldPrice, safePrice + 300),
  );
  const safeDescription = pickString(
    product?.description,
    defaultProductDetails.description,
  );

  return {
    ...defaultProductDetails,
    ...product,
    id: pickString(product?.id, `dummy-${String(index + 1).padStart(3, "0")}`),
    categoryId: safeCategoryId,
    name: safeName,
    shortName: pickString(product?.shortName, safeName),
    price: safePrice,
    oldPrice: safeOldPrice,
    image: pickString(product?.image, getFallbackImage(safeCategoryId)),
    description: safeDescription,
    schemePreview: pickString(
      product?.schemePreview,
      defaultProductDetails.schemePreview,
    ),
    deliveryText: pickString(
      product?.deliveryText,
      defaultProductDetails.deliveryText,
    ),
    newArrival: normalizeNewArrival(product?.newArrival),
    detailDescription: pickString(product?.detailDescription, safeDescription),
    warrantyText: pickString(
      product?.warrantyText,
      defaultProductDetails.warrantyText,
    ),
    immediateOptionTitle: pickString(
      product?.immediateOptionTitle,
      defaultProductDetails.immediateOptionTitle,
    ),
    pongalOptionTitle: pickString(
      product?.pongalOptionTitle,
      defaultProductDetails.pongalOptionTitle,
    ),
    pongalSuffixText: pickString(
      product?.pongalSuffixText,
      defaultProductDetails.pongalSuffixText,
    ),
    immediateDeliveryText: pickString(
      product?.immediateDeliveryText,
      defaultProductDetails.immediateDeliveryText,
    ),
    pongalDeliveryText: pickString(
      product?.pongalDeliveryText,
      product?.deliveryText || defaultProductDetails.pongalDeliveryText,
    ),
    discountLabel: pickString(
      product?.discountLabel,
      defaultProductDetails.discountLabel,
    ),
    checkoutTitle: pickString(
      product?.checkoutTitle,
      defaultProductDetails.checkoutTitle,
    ),
    checkoutSchemeName: pickString(
      product?.checkoutSchemeName,
      defaultProductDetails.checkoutSchemeName,
    ),
    checkoutStartDate: pickString(
      product?.checkoutStartDate,
      defaultProductDetails.checkoutStartDate,
    ),
    checkoutEndDate: pickString(
      product?.checkoutEndDate,
      defaultProductDetails.checkoutEndDate,
    ),
    checkoutDeliveryDate: pickString(
      product?.checkoutDeliveryDate,
      defaultProductDetails.checkoutDeliveryDate,
    ),
    weeklyCompletedDues: pickNumber(
      product?.weeklyCompletedDues,
      defaultProductDetails.weeklyCompletedDues,
    ),
    monthlyCompletedDues: pickNumber(
      product?.monthlyCompletedDues,
      defaultProductDetails.monthlyCompletedDues,
    ),
    weeklyTotalDues: pickNumber(
      product?.weeklyTotalDues,
      defaultProductDetails.weeklyTotalDues,
    ),
    monthlyTotalDues: pickNumber(
      product?.monthlyTotalDues,
      defaultProductDetails.monthlyTotalDues,
    ),
    highlights: normalizeHighlights(
      product?.highlights,
      defaultProductDetails.highlights,
    ),
  };
}

export const products = rawProducts.map((product, index) =>
  normalizeProduct(product, index),
);

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId) {
  return products.filter((product) => product.categoryId === categoryId);
}
