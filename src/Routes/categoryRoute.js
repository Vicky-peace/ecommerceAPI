import { createCategory } from "../Controllers/categoryController.js";

 

 const categoryRoute = (app) =>{
  app.route('/api/createcategory')
  .post(createCategory)
 }
 export default categoryRoute;