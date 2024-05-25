import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(req: NextRequest) {
  try {
  const session = await auth();
  const user : any = session?.user?.name
  const { data } = await req.json();
  const { amount } = data; 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
      description : "software development testing",
      shipping : {
        name: user,
        // random address
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
    });
 

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    console.log(error)
    return new NextResponse(error, {
      status: 400,
    });
  }
}