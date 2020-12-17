import Axios from "axios";
import { api_url } from "../../helpers/api_url";

export const fetchCartAction = (userId) => {
	return (dispatch) => {
		Axios.get(`${api_url}/cart?userID=${userId}`)
			.then((res) => {
				dispatch({
					type: "FETCH_CART",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const addToCartAction = (data) => {
	return (dispatch) => {
		Axios.get(`${api_url}/cart?name=${data.name}&userID=${data.userID}`)
			.then((res) => {
				console.log(res.data[0]);
				if (res.data.length === 0) {
					Axios.post(`${api_url}/cart`, data)
						.then((res) => {
							dispatch(fetchCartAction(data.userID));
						})
						.catch((err) => {});
				} else {
					Axios.patch(`${api_url}/cart/${res.data[0].id}`, {
						qty: res.data[0].qty + data.qty,
					})
						.then((result) => {
							dispatch(fetchCartAction(data.userID));
						})
						.catch((err) => {});
				}
			})
			.catch((err) => {});
	};
};

export const deleteCartAction = (id, userID) => {
	return (dispatch) => {
		Axios.delete(`${api_url}/cart/${id}`)
			.then((res) => {
				dispatch(fetchCartAction(userID));
			})
			.catch((err) => {});
	};
};
export const addQtyAction = (name, qty, id, userID) => {
	return (dispatch) => {
		Axios.get(`${api_url}/products?name=${name}`)
			.then((res) => {
				console.log(qty);
				if (qty < res.data[0].stock) {
					Axios.patch(`${api_url}/cart/${id}`, {
						qty: qty + 1,
					})
						.then((res) => {
							dispatch(fetchCartAction(userID));
						})
						.catch((err) => {});
				} else {
					alert("stok tidak cukup");
				}
			})
			.catch((err) => {});
	};
};
export const subQtyAction = (name, qty, id, userID) => {
	return (dispatch) => {
		Axios.get(`${api_url}/products?name=${name}`)
			.then((res) => {
				console.log(qty);
				if (qty !== 1) {
					Axios.patch(`${api_url}/cart/${id}`, {
						qty: qty - 1,
					})
						.then((res) => {
							dispatch(fetchCartAction(userID));
						})
						.catch((err) => {});
				} else {
					alert("Pembelian Minimal 1");
				}
			})
			.catch((err) => {});
	};
};

