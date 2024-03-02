import { getCustomerById } from "../Controllers/customerController.js";


const customerRoutes = (app) =>{

    app.route("/getCustomer/:CustomerID")
    .get(getCustomerById)
}
export default customerRoutes;