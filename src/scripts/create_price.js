require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

// Defensive: abort if key is not set
if (!process.env.STRIPE_API_KEY || process.env.STRIPE_API_KEY === 'null') {
  console.error("❌ STRIPE_API_KEY is not set. Please set it in your .env file.");
  process.exit(1);
}

async function main() {
  try {
    const product = await stripe.products.create({
      name: 'Walrus Subscription',
      description: '$1/Month subscription',
    });

    const price = await stripe.prices.create({
      unit_amount: 1200, // $12.00
      currency: 'usd',
      recurring: { interval: 'month' },
      product: product.id,
    });

    console.log('✅ Success!');
    console.log('Product ID:', product.id);
    console.log('Price ID:', price.id);
  } catch (err) {
    console.error('⚠️ Error creating product and price:', err.message);
  }
}

main();
