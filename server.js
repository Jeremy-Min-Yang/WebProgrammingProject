import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import mysql from "mysql";
import pagesRouter from './routes/pages.js';
import authRouter from './routes/auth.js';
import authController from './controllers/auth.js';

dotenv.config({ path: './.env'});

dotenv.config();

const app = express();
const stripeGateway = new Stripe(process.env.STRIPE_API_KEY);
const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins (adjust as necessary)
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
};

app.use(cors(corsOptions));

// Middleware for Content Security Policy
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self' https://maps.googleapis.com; script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js https://maps.googleapis.com/maps/api/js?key=AIzaSyAuhJNyw10wCCnWK9C5fY6x_nvKt54I-5Q&callback=initMap https://js.stripe.com  https://unpkg.com/js-image-zoom@0.7.0/js-image-zoom.js; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://use.fontawesome.com https://stackpath.bootstrapcdn.com https://fonts.googleapis.com  https://unpkg.com/js-image-zoom@0.7.0/js-image-zoom.js; font-src 'self' https://cdnjs.cloudflare.com https://use.fontawesome.com https://fonts.gstatic.com https://stackpath.bootstrapcdn.com data: https://unpkg.com/js-image-zoom@0.7.0/js-image-zoom.js; img-src * data:;");
    next();
});

app.use(express.static("public"));
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.sendFile('main.html', { root: 'public' });
});

// Success Route
app.get('/success', (req, res) => {
    res.sendFile('success.html', { root: 'public' });
});

// Cancel Route
app.get('/cancel', (req, res) => {
    res.sendFile('cancelOrder.html', { root: 'public' });
});

// Stripe Checkout Route
app.post("/stripe-checkout", async (req, res) => {
    try {
        const lineItems = req.body.items.map((item) => {
            const unitAmount = Math.round(parseFloat(item.price.replace(/[^0-9.]/g, "")) * 100);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        images: [item.productImg],
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            };
        });

        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${DOMAIN}/success.html`,
            cancel_url: `${DOMAIN}/cancelOrder.html`,
            line_items: lineItems,
            billing_address_collection: 'required',
        });

        // Send the session URL back to the client
        res.json(session.url);
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

//login
const router = express.Router();

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({ extended: false})); 

db.connect(  (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected...")
    }
})

app.use('/', pagesRouter);
app.use('/auth', authRouter);

router.post('/register', authController.register);
router.post('/login', authController.login);

app.set('view engine', 'ejs');




app.listen(3000, () => {
    console.log('Server started on port 3000');
});



