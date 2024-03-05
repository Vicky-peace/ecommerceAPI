import { createOrder } from "../Controllers/ordersController.js";

const orderRoutes = (app) =>{

     app.route('/api/createOrder')
     .post(createOrder)
}
export default orderRoutes;