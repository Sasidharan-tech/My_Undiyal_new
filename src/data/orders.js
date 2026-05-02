export const ORDERS = [
  {
    id: 1,
    title: "Godrej 183 L Direct Cool Refrigerator",
    status: "ongoing",
    date: "11 Jan 2027",
    qty: 1,
    imageSrc: "/categories/images/electronics.png",
    address: "MG Road, Near Lakshmi Mills",
    trackHref: "/order-summary",
  },
  {
    id: 2,
    title: "Classic Wooden Dressing Table",
    status: "delivered",
    date: "13 Mar 2026",
    qty: 1,
    imageSrc: "/categories/images/furniture.png",
    address: "Anna Nagar West, Chennai",
    trackHref: "/order-summary",
  },
  {
    id: 3,
    title: "Noise Cancelling Headphones",
    status: "cancelled",
    date: "08 Mar 2026",
    qty: 1,
    imageSrc: "/categories/images/electronics.png",
    address: "Nungambakkam, Chennai",
    trackHref: "/order-summary",
  },
];

export function normalizeOrderStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (
    value.includes("cancel") ||
    value.includes("cancell") ||
    value.includes("cancl")
  ) {
    return "cancelled";
  }

  if (
    value.includes("deliver") ||
    value.includes("delive") ||
    value.includes("deliv") ||
    value.includes("delin")
  ) {
    return "delivered";
  }

  if (
    value.includes("ongo") ||
    value.includes("ongi") ||
    value.includes("on go")
  ) {
    return "ongoing";
  }

  return "ongoing";
}

export function getFeaturedOrder(orders = ORDERS) {
  return (
    orders.find((order) => normalizeOrderStatus(order.status) === "ongoing") ||
    orders[0] ||
    null
  );
}