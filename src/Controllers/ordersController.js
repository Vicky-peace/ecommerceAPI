import sql from 'mssql'
import config from '../db/config.js';

//Create a new order
export const createOrder = async (req,res) =>{
    const  {CustomerID, TotalAmount} = req.body;
    try{
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('CustomerID', sql.Int, CustomerID)
        .input('TotalAmount', sql.Decimal, TotalAmount)
        .query(
            `
            INSERT INTO Orders (CustomerID,TotalAmount) VALUES (@CustomerID, @TotalAmount)
            `
        );
        res.status(200).json({
            status: 'success',
            message: 'Order created successfully',
            // orderID: result.recordset[0].orderID,
        });
    } catch(error){
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}