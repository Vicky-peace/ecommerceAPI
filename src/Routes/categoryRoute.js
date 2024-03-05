import { createCategory, getAllcategories, getCategoryById } from "../Controllers/categoryController.js";

 

 const categoryRoute = (app) =>{
  app.route('/api/createcategory')
  .post(createCategory)

  app.route('/api/getAllCategories')
  .get(getAllcategories)

  app.route('/api/getCategory/:CategoryID')
  .get(getCategoryById)
 }
 export default categoryRoute;