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


//Update customer data
export const updateCustomer = async (req,res)=>{
    const {CustomerID} = req.params;
    const {FirstName, LastName, Email, Password} = req.body;
    try{
        //Connect to the database
        let pool = await sql.connect(config.sql);
        


        //Hash the password if provided
        const hashedPassword = Password ? bcrypt.hashSync(Password, 10) : undefined;
        //Execute the UPDATE query
        let result = await pool.request()
        .input("CustomerID", sql.Int, CustomerID)
        .input("FirstName", sql.VarChar, FirstName)
        .input("LastName", sql.VarChar, LastName)
        .input("Email", sql.VarChar,Email)
        .input("Password",sql.VarChar, hashedPassword)
        .query(
            `
            UPDATE Customers 
            SET 
            FirstName = @FirstName,
            LastName = @LastName,
            Email = @Email,
            Password = @Password
            WHERE CustomerID = @CustomerID
            `
        );

        //Check if any rows were affected
        if(result.rowsAffected[0] === 1){
            //successfull update
            res.status(200).json({
                status: 'success',
                message: 'Customer details updated successfully'
            });
        } else{
            //No rows affected , customer with given ID might not exist
            res.status(404).json({
                status: 'error',
                message: 'Customer not found'
            });
        }

    } catch(error){
      console.log(error)
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
}