import { getCustomerById,updateCustomer , changePassword, deleteCustomer} from "../Controllers/customerController.js";


const customerRoutes = (app) =>{

    app.route("/getCustomer/:CustomerID")
    .get(getCustomerById)
    .put(updateCustomer)

    app.route("/api/customers/changePassword")
    .post(changePassword)

    app.route("/api/customers/:CustomerID")
    .delete(deleteCustomer)
}
export default customerRoutes;