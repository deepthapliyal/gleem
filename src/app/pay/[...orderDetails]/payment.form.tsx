"use client";
import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface OrderDetails {
  amount: number;
  orderId: string; 
}

export default function PaymentForm({ orderDetails }:  { orderDetails: OrderDetails }) {
  const [loading, setLoading] = useState(false)
  const [formLoad, setFormLoad] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useRouter();
  const amount = orderDetails.amount
  const orderId = orderDetails.orderId
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
    setLoading(true);
    e.preventDefault();
    const cardElement = elements?.getElement("card");
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/payments", {
        data: { amount : amount},
      });
      const clientSecret = data;
      const response = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
      setLoading(false)
      if (response.error) {
        setPaymentStatus("error");
        console.log(response.error.message);
      } else {
        const makeOrderComplete = await axios.post("/api/products/completeOrder", {
          data: { orderId : orderId },
        })
        if(makeOrderComplete.status == 200){

          setPaymentStatus("success");
          navigate.push('/orders');
        }
        else{
          console.log("error occured")
        }
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus("error");
      setLoading(false)
    }
  };
  return (
    <form className="bg-white p-4 m-2 flex flex-col gap-4 rounded-md text-black" onSubmit={onSubmit}>
      <h1 className="text-xl">Price to pay $ {amount}</h1>
      <p>Please Enter your card details</p>
      <CardElement onReady={() => setFormLoad(true)} />
      {loading ?
        <Button variant={"secondary"} >loading...</Button>
        :
        formLoad ?
          <Button variant={"secondary"} type="submit">Pay</Button>
          :
          <Button disabled variant={"secondary"} type="submit">Pay</Button>
      }
      {paymentStatus === "success" && <p>Payment Successful!</p>}
      {paymentStatus === "error" && <p>Payment Failed. Please try again.</p>}
    </form>

  );
}
