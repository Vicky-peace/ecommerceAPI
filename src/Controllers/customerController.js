import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//middleware
export const loginRequired = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        return res.status(401).json({message: "Unauthorized user!"})
    }
};
// Get customer Information

export const getCustomerById =async (req,res)=>{
    const {CustomerID}= req.params;

    try{
        let pool = await sql.connect(config.sql);
        let userOne = await pool.request()
        .input("CustomerID", sql.Int, CustomerID)
        .query("SELECT * FROM Customers WHERE CustomerID = @CustomerID")

        !userOne.recordset[0]?
        res.status(404).json({message: "User not found"}): res.status(200).json({
            status: "success",
            user: userOne.recordset[0]
        })
    }catch(error){
       console.log(error);
       res.status(404).json({message: error.message});
    }
}