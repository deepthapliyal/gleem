"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment.form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
type PageProps = {
  params: {
    orderDetails: {
      amount: number;
      orderId: string; 
    };
  }
}

export default function Payment({ params: { orderDetails } }: PageProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm orderDetails={orderDetails}/>
    </Elements>
  );
}