"use strict";

/**
 * order controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { createCoreController } = require("@strapi/strapi").factories;
const express = require("express");
const app = express();

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { amount, city, state, pin, shippingAddress, token, items } =
      ctx.request.body;

    // ----
    const express = require("express");
    const app = express();

    const calculateOrderAmount = (payable) => {
      return payable * 100;
    };

    app.post("/create-payment-intent", async (req, res) => {
      // const { amount } = req.body;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(amount),
        currency: "inr",
        source: token,
        description: `order by user ${ctx.state.user.email}`,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.listen(4242, () => console.log("Node server listening on port 4242!"));

    // -----

    //   await stripe.charges.create({
    //   amount: amount * 100,
    //   currency: "INR",
    //   source: token,
    //   description: `order by user ${ctx.state.user.email}`,
    // });

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

// --------

// "use strict";

// /**
//  * Order.js controller
//  *
// //  * @description: A set of functions called "actions" for managing `Order`.
//  */

// const stripe = require("stripe")(process.env.STRIPE_SECRET);

// module.exports = {
//   /**
//    * Create a/an order record.
//    *
//    * @return {Object}
//    */

//   create: async (ctx) => {
//     const { amount, city, state, pin, shippingAddress, token, items } =
//       JSON.parse(ctx.request.body);
//     // const stripeAmount = Math.floor(amount * 100);
//     // charge on stripe
//     // const charge = await stripe.charges.create({
//     //   // Transform cents to dollars.
//     //   amount: stripeAmount,
//     //   currency: "INR",
//     //   description: `order by user ${ctx.state.user.email}`,
//     //   source: token,
//     // });

//     // Register the order in the database
//     const order = await strapi.services.order.create({
//       shippingAddress,
//       city,
//       state,
//       pin,
//       amount,
//       user: ctx.state.user.email,
//       items,
//     });

//     return order;
//   },
// };
