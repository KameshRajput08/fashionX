import express from "express";

const KEY = process.env.STRIPE_KEY;

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51LCTUESI0RaDpPuDtzNwv07zf3L7dD9s5p57XuJKgpJVUFAUivo8HFNDnX8kDKuJjkO4I1HQjNc8ryWm2avOhPQH00s9YdpMY7"
);

const router = express.Router();

router.post("/pay", (req, res) => {
  const { token } = req.body;

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((custumer) => {
      stripe.paymentIntents.create(
        {
          customer: custumer.id,
          amount: req.body.amount,
          currency: "usd",
          payment_method_types: ["card"],
          payment_method: "pm_card_visa",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.status(500).json(stripeErr);
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
    });
});

export default router;
