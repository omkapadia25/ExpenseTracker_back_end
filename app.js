require('dotenv').config();

const express=require('express');
const app=express();

const connectDB=require('./db/connect');
//router
const authRouter=require('./routes/auth');
const dashboardRouter=require('./routes/dashboard');
const authenticateUser=require('./middleware/authentication')
//routes
app.use(express.json());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/dashboard',authenticateUser,dashboardRouter)
const port =process.env.PORT||5000;

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`server is listerning on port ${port}...`)
        });
    } catch (error) {
        console.log(error);
    }
};
start();