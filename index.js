import 'dotenv/config';
import express from 'express';
import initApp from './src/app.router.js';

const app = express();
const PORT =  process.env.PORT || 7000; 
app.post('/webhooks', express.raw({type: 'application/json'}), (request, response) => {
    let event = request.body;
    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
         "whsec_vhmLkHAh8QX9R1vPoqdlkbxUTbuB2j7h"
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    if(event.type == 'checkout.session.completed'){
        console.log(`create order ...`);

        const checkoutCompleted = event.data.object;

    }else{
        console.log(`Unhandled event type ${event.type}.`);

    }
  
    response.send();
  });
initApp(app, express);

app.listen(PORT, (error) => {
    console.log(`servier is running ... ${PORT}`); 
});
