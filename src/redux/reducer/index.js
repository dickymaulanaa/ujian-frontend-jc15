import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

export default combineReducers({
	user: UserReducer,
	product: productReducer,
	cart: cartReducer,
});
