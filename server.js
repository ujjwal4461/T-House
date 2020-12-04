const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DB_URL,{ useUnifiedTopology: true,
     useNewUrlParser: true,
      useCreateIndex: true },()=>{
    console.log("connected to mongodb");
})

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/api/auth',require('./routes/authRoute'));
app.use('/api/user',require('./routes/userRoute'));
app.use('/api/category',require('./routes/categoryRoute'));
app.use('/api/product',require('./routes/productRoute'));
app.use('/api/order',require('./routes/orderRoute'));
app.use('/api/payment',require('./routes/paymentRoute'));


app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})