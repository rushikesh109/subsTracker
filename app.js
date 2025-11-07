import express from  'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import authRouther from './routes/auth.routes.js';

const app = express();

//middlewares
app.use('api/v1/auth', authRouther)
app.use('/api/v1/users', userRouter)
app.use('api/v1/subscriptions', subscriptionRoutes)


app.get('/', (req,res) => {
    res.send('welcome to the SubsTracker API')
})

app.listen(PORT, ()=>{
console.log(`SubsTracker API is running on http://localhost:${PORT}`);

})

export default app;