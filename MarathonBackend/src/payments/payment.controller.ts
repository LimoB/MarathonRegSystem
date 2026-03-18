import { Request, Response, NextFunction } from "express";
import * as paymentService from "./payment.service";
import { stripe } from "./stripe";

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { registration_id, amount, marathon_name } = req.body;

    // 1. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Registration for ${marathon_name}` },
            unit_amount: amount * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
    });

    // 2. Save pending payment record in our DB
    await paymentService.createPaymentService({
      registration_id,
      amount,
      method: "stripe",
      stripe_payment_id: session.id,
      status: "pending",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await paymentService.getPaymentsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};