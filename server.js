require('dotenv').config();

const express = require('express'); 
const cors = require('cors');
const db=require('./db/index')
const user = require('./controllers/user');
const transaction = require('./controllers/transaction');
const {isAuth} = require('./utils');
const expressAsyncHandler = require('express-async-handler');

const app = express();

app.use(cors());
app.use(express.json());
app.post('/api/signup',(req,res)=>{user.handleSignup(req,res,db)});
app.post('/api/signin',(req,res)=>{user.handleSignin(req,res,db)});
app.post('/api/income',isAuth,(req,res)=>transaction.handleAddIncome(req,res,db));
app.post('/api/expense',isAuth,(req,res)=>transaction.handleAddExpense(req,res,db));
app.get('/api/income',isAuth,(req,res)=>transaction.handleGetIncome(req,res,db));
app.get('/api/expense',isAuth,(req,res)=>transaction.handleGetExpense(req,res,db));

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})

app.get('/',async(req,res)=>{
    res.json({
        status:'success',
    })
})


const port = process.env.PORT || 3005
app.listen(port,()=>{
    console.log(`server is listening on port ${port} port`)
})