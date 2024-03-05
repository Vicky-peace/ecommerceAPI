import { createCategory, deleteCategory, getAllcategories, getCategoryById, updateCategory } from "../Controllers/categoryController.js";

 

 const categoryRoute = (app) =>{
  app.route('/api/createcategory')
  .post(createCategory)

  app.route('/api/getAllCategories')
  .get(getAllcategories)

  app.route('/api/getCategory/:CategoryID')
  .get(getCategoryById)


  app.route('/api/update/:CategoryID')
  .put(updateCategory)

  app.route('/api/delete/:CategoryID')
  .delete(deleteCategory)
 }
 export default categoryRoute;