import { Hono } from "hono";
import { env } from "hono/adapter";
import Stripe from "stripe";

const app = new Hono();

/**
 * Setup Stripe SDK prior to handling a request
 */
app.use('*', async (context, next) => {
  // Load the Stripe API key from context.
  const { STRIPE_API_KEY: stripeKey } = env(context);

  // Instantiate the Stripe client object 
  const stripe = new Stripe(stripeKey, {
    appInfo: {
      // For sample support and debugging, not required for production:
      name: "stripe-samples/stripe-node-cloudflare-worker-template",
      version: "0.0.1",
      url: "https://github.com/stripe-samples"
    },
    maxNetworkRetries: 3,
    timeout: 30 * 1000,
  });

  // Set the Stripe client to the Variable context object
  context.set("stripe", stripe);

  await next();
});


app.post("/create-checkout-session", async (context) => { 
   
   // Load the Stripe client from the context
  const stripe = context.get('stripe');
  const body = await context.req.json(); // Accepts productId in body
  
  /*
   * Sample checkout integration which redirects a customer to a checkout page
   * for the specified line items.
   * See https://stripe.com/docs/payments/accept-a-payment?integration=checkout.
   */
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Walrus Sticker Pack" },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://walrusassociation.com/success",
    cancel_url: "https://yourdomain.com/cancel",
  });

  return context.json({ url: session.url });
});

app.post("/webhook", async (context) => {
  // Load the Stripe API key from context.
  const { STRIPE_WEBHOOK_SECRET } = env(context);
    /**
     * Load the Stripe client from the context
     */
    const stripe = context.get('stripe');
    const signature = context.req.raw.headers.get("stripe-signature");
    try {
        if (!signature) {
            return context.text("", 400);
        }
        const body = await context.req.text();
        const event = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            STRIPE_WEBHOOK_SECRET
        );
        switch(event.type) {
            case "payment_intent.created": {
                console.log(event.data.object)
                break
            }
            default:
                break
        }
        return context.text("", 200);
      } catch (err) {
        const errorMessage = `⚠️  Webhook signature verification failed. ${err instanceof Error ? err.message : "Internal server error"}`
        console.log(errorMessage);
        return context.text(errorMessage, 400);
      }
})

export default app;
