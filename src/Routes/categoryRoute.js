import { createCategory, getAllcategories } from "../Controllers/categoryController.js";

 

 const categoryRoute = (app) =>{
  app.route('/api/createcategory')
  .post(createCategory)

  app.route('/api/getAllCategories')
  .get(getAllcategories)
 }
 export default categoryRoute;