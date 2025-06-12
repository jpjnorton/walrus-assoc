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
  const stripe = context.get("stripe");
  const { productId } = await context.req.json();
  
  // Load the Stripe client from the context
  let lineItem;
  if (productId === "walrus-hat") {
    lineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Walrus Hat",
          description: "Richardson 336 duck canvas snapback. Woven Patches. Embossed slogan.",
        },
        unit_amount: 2500,
      },
      quantity: 1,
    };
  } else {
    return context.json({ error: "Invalid product ID" }, 400);
  }
  /*
     * Checkout integration which redirects a customer to a checkout page
     * for the specified line items.
     * See https://stripe.com/docs/payments/accept-a-payment?integration=checkout.
     */
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [lineItem],
    mode: "payment",
    success_url: "https://walrusassociation.com/success",
    cancel_url: "https://walrusassociation.com/cancel",
  });
  //TODO: disallow CORS for this endpoint
  return context.json({ url: session.url }, 200, { "Access-Control-Allow-Origin": "*" });
});

function logMinimal(message, event) {
  const obj = event.data.object;
  const summary = {
    id: obj.id,
    type: event.type,
    status: obj.status,
    amount: obj.amount,
    currency: obj.currency,
    customer: obj.customer,
    created: obj.created
  };
  console.log(message, summary);
}

function logByType(event) {
  const obj = event.data.object;
  switch (event.type) {
    case "payment_intent.created":
      console.log("📦 payment_intent.created", {
        id: obj.id,
        amount: obj.amount,
        currency: obj.currency,
        customer: obj.customer,
        description: obj.description,
        status: obj.status
      });
      break;

    case "payment_intent.succeeded":
      console.log("✅ payment_intent.succeeded", {
        id: obj.id,
        amount_received: obj.amount_received,
        status: obj.status,
        currency: obj.currency,
        customer: obj.customer
      });
      break;

    case "payment_intent.payment_failed":
      console.log("❌ payment_intent.payment_failed", {
        id: obj.id,
        last_payment_error: obj.last_payment_error?.message,
        amount: obj.amount,
        customer: obj.customer,
        currency: obj.currency
      });
      break;

    case "checkout.session.completed":
      console.log("🎉 checkout.session.completed", {
        id: obj.id,
        customer: obj.customer,
        customer_email: obj.customer_details?.email,
        payment_status: obj.payment_status,
        amount_total: obj.amount_total,
        currency: obj.currency,
      });
      break;

    case "charge.refunded":
      console.log("↩️ charge.refunded", {
        id: obj.id,
        amount_refunded: obj.amount_refunded,
        status: obj.status,
        currency: obj.currency,
        reason: obj.refunds?.data?.[0]?.reason
      });
      break;

    case "customer.created":
      console.log("👤 customer.created", {
        id: obj.id,
        email: obj.email,
        name: obj.name,
        description: obj.description
      });
      break;

    case "invoice.paid":
      console.log("💰 invoice.paid", {
        id: obj.id,
        amount_paid: obj.amount_paid,
        customer: obj.customer,
        currency: obj.currency,
        status: obj.status,
      });
      break;
      
    default:
      logMinimal(`ℹ️ Unhandled event type: ${event.type}`, event);
      break;
  }
}

app.post("/webhook", async (context) => {
  const { STRIPE_WEBHOOK_SECRET } = env(context);
  const stripe = context.get("stripe");
  const signature = context.req.raw.headers.get("stripe-signature");

  try {
    if (!signature) return context.text("", 400);

    const body = await context.req.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);

    logByType(event);
    return context.text("", 200);
  } catch (err) {
    const errorMessage = `⚠️  Webhook signature verification failed. ${err instanceof Error ? err.message : "Internal server error"}`;
    console.log(errorMessage);
    return context.text(errorMessage, 400);
  }
});

export default app;
