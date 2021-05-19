const express = require('express')
const transactionRouter = express.Router();

const handleAddIncome = async (req,res,db)=>{
    try{
        const {email,id,category,date,amount} = req.body;
        const data = await db.query('INSERT INTO income (id,email,date,amount,category) values($1,$2,$3,$4,$5) returning *',[id,email,date,amount,category]);
        res.status(201).json({
            status:"success",
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:"failure",
            msg:err
        })
    }
}

const handleAddExpense = async (req,res,db)=>{
    try{
        const {email,id,category,date,amount} = req.body;
        const data = await db.query('INSERT INTO expense (id,email,date,amount,category) values($1,$2,$3,$4,$5) returning *',[id,email,date,amount,category]);
        res.status(201).json({
            status:"success",
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:"failure",
            msg:err
        })
    }
}

const handleGetIncome = async (req,res,db)=>{
    try{
        const {email} = req.body;
        const data = await db.query('SELECT * FROM income WHERE email=$1',[email]);
        res.status(201).json({
            status:"success",
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:"failure",
            msg:err
        })
    }
}

const handleGetExpense = async (req,res,db)=>{
    try{
        const {email} = req.body;
        const data = await db.query('SELECT * FROM expense WHERE email=$1',[email]);
        res.status(201).json({
            status:"success",
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:"failure",
            msg:err
        })
    }
}

module.exports = {
    handleAddIncome,
    handleAddExpense,
    handleGetExpense,
    handleGetIncome
}