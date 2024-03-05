import sql from 'mssql';
import config from '../db/config.js';

// Create a new product
export const createProduct = async (req,res) =>{
    const {Name, Description, Price, Stock, CreatedDate, CategoryID}= req.body;

    try{
     //Connect to the DB
     const pool = await sql.connect(config.sql);
     const result = await pool.request()
     .input('Name', sql.VarChar, Name)
     .input('Price', sql.Decimal, Price)
     .input('Description', sql.Text, Description)
     .input('Stock', sql.Int, Stock)
     .input('CreatedDate',sql.DateTime, CreatedDate)
     .input('CategoryID', sql.Int, CategoryID)
     .query(
        `
        INSERT INTO Products (Name,Description, Price, Stock,CreatedDate,CategoryID) VALUES (@Name, @Description, @Price, @Stock, @CreatedDate,@CategoryID)
        `
     );
     res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
     })
    } catch(error){
       console.log(error)
       res.status(500).json({
        status: 'error',
        message:error.message
       })
    }
}