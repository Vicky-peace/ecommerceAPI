import {createProduct} from '../Controllers/productsController.js'

const productRoutes =(app) =>{
    app.route('/api/products')
    .post(createProduct)
}
export default productRoutes;