"use strict";

/**
 * order controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async createCoreController(ctx) {
    const { amount, city, state, pin, shippingAddress, token, items } =
      ctx.request.body;

    await stripe.charges.create({
      amount: amount * 100,
      currency: "INR",
      source: token,
      description: `order by user ${ctx.state.user.email}`,
    });

    const order = await strapi.db.query("api::order.order").create({
      data: {
        shippingAddress,
        city,
        state,
        pin,
        amount,
        user: ctx.state.user.email,
        items,
      },
    });
    return order;
  },
}));
