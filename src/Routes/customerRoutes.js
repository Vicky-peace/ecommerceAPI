import { getCustomerById,updateCustomer } from "../Controllers/customerController.js";


const customerRoutes = (app) =>{

    app.route("/getCustomer/:CustomerID")
    .get(getCustomerById)
    .put(updateCustomer)
}
export default customerRoutes;