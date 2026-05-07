"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import SuccessModal from "@/components/payment/SuccessModal";
import FailureModal from "@/components/payment/FailureModal";

function createTransactionId() {
  return `TXN-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, finalTotal, resetCheckout } = useShop();

  const [transactionId, setTransactionId] = useState("TXN-PENDING");
  const isFailure = searchParams.get("status") === "failed";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTransactionId(createTransactionId());
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

  if (isFailure) {
    return (
      <main className="min-h-dvh">
        <FailureModal
          open
          amount={payableAmount}
          errorReason="Your payment could not be processed. Please try again or use a different payment method."
          transactionId={transactionId}
          details={purchaseDetails}
          showRetryButton
          onRetry={() => {
            router.push("/payment");
          }}
          onGoHome={() => {
            resetCheckout();
            router.replace("/");
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-dvh">
      <SuccessModal
        open
        amount={payableAmount}
        method="UPI"
        transactionId={transactionId}
        details={purchaseDetails}
        showContinueButton
        onContinue={() => {
          resetCheckout();
          router.replace("/");
        }}
      />
    </main>
  );
}
