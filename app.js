import express from  'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import authRouther from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware)


app.use('/api/v1/auth', authRouther)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRoutes)

app.use(errorMiddleware);


app.get('/', (req,res) => {
    res.send('welcome to the SubsTracker API')
})

app.listen(PORT, async ()=>{
console.log(`SubsTracker API is running on http://localhost:${PORT}`);

await connectToDatabase();
})

export default app;