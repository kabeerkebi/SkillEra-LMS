const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Payment = async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.thumbnail],
        },
        unit_amount: product.price * 100, // Stripe expects the amount in cents
      },
      quantity: 1, // Ensure a quantity is specified, defaulting to 1 if it's not passed in the request
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment session." });
  }
};

module.exports = Payment;
