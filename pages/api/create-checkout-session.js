const stripe = require("stripe")(process.env.STRIPE_SECREAT_KEY);

export default async (req, res) => {
  if(req.method=="POST"){
    const { img, title, description } = req.body;
  const transformedItems = [{
    description: description,
    quantity: 1,
    price_data: {
      currency: "gbp",
      unit_amount: 117 * 100,
      product_data: {
        name: title,
        images: [img],
      },
    },
  }];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/error`,
    
  }).catch((err)=>res.status(500).json({err:err}))
  res.status(200).json({ id: session.id });
  }
  res.status(200).json({msg:"Hello"})
};
