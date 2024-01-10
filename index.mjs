// index.mjs
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import connectDB from './db.mjs';
import userRoutes from './routes/user.mjs';


const app = express();
const port = 3000;

app.use(session({
    secret: 'helloworld', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in a production environment with HTTPS
}));

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
connectDB();

// Use your routes
//app.use('/auth', authRoutes);
app.use('/user', userRoutes);


const server = app.listen(port, () => {
  console.log(`Server listening on port 3000`);
});