import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrders } from "../Controllers/ordersController.js";

const orderRoutes = (app) =>{

     app.route('/api/createOrder')
     .post(createOrder)

     app.route('/api/getAllOrders')
     .get(getAllOrders)


    app.route('/api/:OrderID')
    .get(getOrder)
    .put(updateOrders)
    .delete(deleteOrder)
}
export default orderRoutes;