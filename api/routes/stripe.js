const router = require("express").Router();
const stripe = require("stripe");

router.post("/payment", (req, res)=> {
    const stripeObj = stripe(process.env.STRIPE_KEY);

    stripeObj.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",  
        }, 
        (stripeErr, stripeRes)=> {
            if (stripeErr) {
                console.error("Stripe Error:", stripeErr);
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;