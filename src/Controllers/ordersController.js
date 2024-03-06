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


//Retrieve all orders
export const getAllOrders = async (req,res) =>{
    try{
  const pool = await sql.connect(config.sql);
  const result = await pool.request()
  .query('SELECT * FROM Orders')
  res.status(200).json({
    status: 'success',
    orders: result.recordset,
  })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


//Retrieve a single order by ID
export const getOrder = async(req,res) =>{
    const {OrderID} = req.params;

    try{
      const pool = await sql.connect(config.sql)
      const result = await pool.request()
      .input('OrderID', sql.Int, OrderID)
      .query('SELECT * FROM  Orders WHERE OrderID = @OrderID');

      if(result.recordset.length === 0){
        res.status(404).json({
            status: 'error',
            message: 'Order not found'
        });
      } else{
        res.status(200).json({
            status: 'success',
            order: result.recordset[0],
        });
      }

    } catch(error){
    console.log(error);
    res.status(500).json({
        status: 'error',
        message: error.message,
    });
    }
};


//Update the orders
export const updateOrders = async(req,res) =>{
    const {OrderID}= req.params;
    const {CustomerID,TotalAmount} = req.body;
    try{
        const pool = await sql.connect(config.sql);
        const result= await pool.request()
        .input('OrderID', sql.Int, OrderID)
        .input('CustomerID', sql.Int,CustomerID)
        .input('TotalAmount', sql.Decimal, TotalAmount)
        .query(
            `
            UPDATE Orders
            SET CustomerID = @CustomerID, TotalAmount = @TotalAmount WHERE OrderID = @OrderID
            `
        );
        if(result.rowsAffected[0] === 0){
            res.status(404).json({
                status: 'error',
                message: 'Order not found',
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Order updated successfully'
            });
        }
    }catch(error){
      console.log(error)
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
};

//Delete an order
export const deleteOrder = async(req,res) =>{
    const {OrderID} = req.params;
    try{
     const pool = await sql.connect(config.sql)
     const result = await pool.request()
     .input('OrderID', sql.Int, OrderID)
     .query('DELETE FROM Orders WHERE OrderID = @OrderID');

     if(result.rowsAffected[0] === 0){
        res.status(404).json({
            status: 'error',
            message: 'Order not found',
        });
     }else{
      res.status(200).json({
        status: 'success',
        message: 'Order deleted successfully',
      })
     }
    }catch(error){
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    }
}