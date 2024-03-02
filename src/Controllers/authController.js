import sql from 'mssql';
import bcrypt from 'bcrypt';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';

//Register a user

export const register = async (req,res) =>{
  const {FirstName,LastName,Email, Password} = req.body;
  const hashedPassword = bcrypt.hashSync(Password, 10);
  console.log(hashedPassword);

  try{
      let pool = await sql.connect(config.sql);

      //Check if the user already exists
      const existingUser = await pool.request()
      .input("Email",sql.VarChar, Email)
      .query("SELECT * FROM Customers WHERE Email = @Email");
      if(existingUser.recordset.length > 0){
        return res.status(409).json({message: "User already exists"});
      }

      //Insert the user to the database
      await pool.request()
      .input('FirstName', sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar,hashedPassword)
      .query(
        "INSERT INTO Customers (FirstName, lastName, Email, Password)  VALUES (@FirstName, @LastName, @Email, @Password)"
      );

      return res.status(200).json({
        status: "success",
        message: "User registered successfully"
      });

  } catch(error){
   console.log(error);
   return res.status(500).json({error: "Internal server error"});
  } finally{
    sql.close();
  }
}

// Login the user
export const login =async(req,res)=>{
  const {Email, Password} = req.body;
  try{
     //Connect to the databse
     let pool= await sql.connect(config.sql);
     let result = await pool.request()
     .input("Email", sql.VarChar, Email)
     .query("SELECT * FROM Customers WHERE Email=@Email");
     console.log(result);
     const user = result.recordset[0];
     console.log(user);
     if(!user){
      res.status(404).json({
        status: "error",
        message: "Invalid credentials"
      });
     } else{
      // create a jwt token store
      let token = `JWT ${jwt.sign(
        {
          Email: user.Email,
          CustomerID: user.CustomerID,
        },
        process.env.SECRET,
        {expiresIn: process.env.EXPIRY}
      )}`;

      const{CustomerID, Email} = user;
      res.status(200).json({
        status: "success",
        message: "user Logged in successfully",
        CustomerID: CustomerID,
        Email: Email,
        token: token,
      });
     }
  } catch(error){
   console.log(error);
   res.status(404).json({message: error})
  } finally{
    sql.close();
  }
}
