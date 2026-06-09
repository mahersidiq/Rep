import Stripe from "stripe";

const prices = {
  "original-citrus": 999,
  "original-mint": 999,
  "original-berry": 999,
  "plus-citrus": 1899,
  "plus-mint": 1899,
  "plus-berry": 1899,
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return response.status(500).json({ error: "Stripe is not configured" });
  }

  const items = Array.isArray(request.body?.items) ? request.body.items : [];
  let subtotal = 0;

  for (const item of items) {
    const unitPrice = prices[item.id];
    const quantity = Number(item.quantity);

    if (!unitPrice || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return response.status(400).json({ error: "Invalid cart" });
    }

    subtotal += unitPrice * quantity;
  }

  if (subtotal < 1) {
    return response.status(400).json({ error: "Cart is empty" });
  }

  const shipping = subtotal >= 5000 ? 0 : 599;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: subtotal + shipping,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        products: items.map((item) => `${item.id}:${item.quantity}`).join(","),
      },
    });

    return response.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe payment intent failed:", error.message);
    return response.status(500).json({ error: "Unable to start payment" });
  }
}
