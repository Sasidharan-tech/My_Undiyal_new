"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import FailureModal from "@/components/payment/FailureModal";

function createFailureTransactionId() {
  return `TXN-FAILED-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`;
}

export default function PaymentFailurePage() {
  const router = useRouter();
  const { cart, finalTotal, resetCheckout } = useShop();

  const [transactionId, setTransactionId] = useState("TXN-FAILED-PENDING");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTransactionId(createFailureTransactionId());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const firstItem = cart[0] || null;
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0) || 1;
  const payableAmount = Number.isFinite(finalTotal) && finalTotal > 0 ? finalTotal : 22048;

  const purchaseDetails = [
    {
      label: "Product",
      value: firstItem?.name || "My Undiyal Order",
    },
    {
      label: "Quantity",
      value: String(totalQty),
    },
  ];

  const handleRetry = () => {
    router.push("/payment");
  };

  const handleGoHome = () => {
    resetCheckout();
    router.replace("/");
  };

  return (
    <main className="min-h-dvh">
      <FailureModal
        open
        amount={payableAmount}
        errorReason="Your payment could not be processed. Please try again or use a different payment method."
        transactionId={transactionId}
        details={purchaseDetails}
        showRetryButton
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    </main>
  );
}
