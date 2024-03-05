import sql from 'mssql';
import config from '../db/config.js';

// Create a new category
export const createCategory = async (req,res) => {
    const {Name, CreatedDate,UpdatedDate} = req.body;
    try{
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('Name', sql.VarChar,Name)
        .input('CreatedDate', sql.DateTime, CreatedDate)
        .input('UpdatedDate', sql.DateTime, UpdatedDate)
        .query(
            'INSERT INTO Categories (Name,CreatedDate,UpdatedDate) VALUES (@Name, @CreatedDate, @UpdatedDate)'
        );
        res.status(200).json({
            status: 'success',
            message: 'Category created successfully'
        });
    } catch(error){
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
}

//Get all Categories
export const getAllcategories = async (req,res) =>{
    try{
     const pool = await sql.connect(config.sql);
     const result = await pool.request()
     .query(
        'SELECT * FROM Categories'
     );
     res.status(200).json({
        status: 'success',
        categories: result.recordset,
     });
    } catch(error){
    console.log(error);
    res.status(500).json({
        status: 'error',
        message: error.message,
    });
    }
};

//get Category By ID
export const getCategoryById = async (req,res) => {
    const {CategoryID} = req.params;
    try{
      const pool = await sql.connect(config.sql);
      const result = await pool.request()
      .input('CategoryID', sql.Int, CategoryID)
      .query('SELECT * FROM Categories WHERE CategoryID = @CategoryID');
      const category = result.recordset[0];
      if(!category){
        res.status(404).json({
            status: 'error',
            message: "Category not found",
        });
      } else{
        res.status(200).json({
            status: 'success',
             category: category,
        })
      }
    } catch(error){
       console.log(error)
       res.status(500).json({
        status: 'error',
        message: error.message,
       });
    }
};


//Update category
export const updateCategory = async (req,res) =>{
    const {CategoryID} = req.params;
    const {Name, UpdatedDate} = req.body;
    try{
       const pool = await sql.connect(config.sql);
       const result = await pool.request()
       .input('CategoryID', sql.Int, CategoryID)
       .input('Name', sql.VarChar, Name)
       .input('UpdatedDate', sql.DateTime, UpdatedDate)
       .query(
        'UPDATE Categories SET Name = @Name, UpdatedDate = @UpdatedDate WHERE CategoryID = @CategoryID'
       );
       if(result.rowsAffected[0] === 1){
        res.status(200).json({
            status: 'success',
            message: 'Category updated successfully',
        });
       } else{
        res.status(404).json({
            status: 'error',
            message: 'Category not found',
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