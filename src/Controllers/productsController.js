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
       });
    }
};

//Get all products
export const getAllProducts = async (req,res) =>{
    try{
        const pool = await sql.connect(config.sql)
        const result = await pool.request()
        .query('SELECT * FROM Products')
        res.status(200).json({
            status: 'success',
            products: result.recordset,
        });
    } catch(error){
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
};


//Get product byID
export const getProductById = async (req,res) =>{
    const {ProductID} = req.params;
    try{
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('ProductID', sql.Int, ProductID)
        .query('SELECT * FROM Products WHERE ProductID = @ProductID')

        if(!result.recordset[0]){
            res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        } else{
            res.status(200).json({
                status: 'success',
                product: result.recordset[0],
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

//Update product
export const updateProduct = async (req,res) =>{
    const {ProductID} = req.params;
    const {Name, Description, Price, Stock, UpdatedDate} = req.body;

    try{
   const pool = await sql.connect(config.sql)
   const result = await pool.request()
   .input('ProductID', sql.Int, ProductID)
   .input('Name',sql.VarChar, Name)
   .input('Description', sql.VarChar,Description)
   .input('Price', sql.Decimal,Price)
   .input('Stock', sql.Int, Stock)
   .input('UpdatedDate', sql.DateTime,UpdatedDate)
   .query(
    `
    UPDATE Products SET
    Name = @Name,
    Description = @Description,
    Price = @Price,
    Stock = @Stock,
    UpdatedDate= @UpdatedDate
    WHERE ProductID = @ProductID
    `
   );
   if(result.rowsAffected[0] === 1){
    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
    });
   } else{
    res.status(404).json({
        status: 'error',
        message: 'Product not found',
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

//Delete a product
export const deleteProduct = async (req,res) =>{
    const {ProductID} = req.params;
    try{
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
    .input('ProductID', sql.Int, ProductID)
    .query('DELETE FROM Products WHERE ProductID = @ProductID');

    if(result.rowsAffected[0] === 1){
        res.status(200).json({
            status: "success",
            message: 'Product deleted successfully',
        });
    }else{
        res.status(404).json({
            status: 'error',
            message: 'Product not found',
        });
    }
    } catch(error){
         console.log(error)
         res.status(500).json({
            status: 'error',
            message: error.message,
         });
    }
};