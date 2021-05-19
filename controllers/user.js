const express = require('express')
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateToken } = require('../utils');

const handleSignup=async (req,res,db)=>{
    try{
        console.log(req.body)
        const {name,email,password} = req.body;
        const data = await db.query('INSERT INTO users(name,email,password) VALUES($1,$2,$3) returning *',[name,email,bcrypt.hashSync(password,8)])
        res.status(201).json({
            status:"success",
            userData:{id:data.id,
                    name:data.name,
                    email:data.email,
                    token:generateToken(data)}
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:err
        })
    }
}

const handleSignin = async(req,res,db)=>{
    try{
        const {email,password}=req.body;
        const data = await db.query('SELECT password FROM users  where email=$1',[email]);
        const actualPass = data.rows[0].password;
        if(actualPass && bcrypt.compareSync(password,actualPass)){
            const data = await db.query('SELECT * FROM users where email=$1',[email]);
            res.status(201).json({
                status:"success",
                userData:{id:data.id,
                        name:data.name,
                        email:data.email,
                        token:generateToken(data)}
            })
        }
        else{
            res.status(400).json({
                status:"failure",
                msg:"not authenticated"
            })
        }
    }catch(err){
        res.status(400).json({
            status:"failure",
            msg:err
        })
    }
}
module.exports ={
    handleSignup,
    handleSignin
}