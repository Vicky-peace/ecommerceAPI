import {createProduct, deleteProduct, getAllProducts, getProductById, updateProduct} from '../Controllers/productsController.js'

const productRoutes =(app) =>{
    app.route('/api/products')
    .post(createProduct)
    .get(getAllProducts)

    app.route('/api/products/:ProductID')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)
}
export default productRoutes;