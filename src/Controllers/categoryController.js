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