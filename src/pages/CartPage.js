import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,
} from "../redux/action";

class CartPage extends Component {
	state = {};
	componentDidMount() {
		const { userID, fetchCartAction } = this.props;
		fetchCartAction(userID);
	}
	deleteBtn = (id, userID) => {
		const { deleteCartAction } = this.props;
		deleteCartAction(id, userID);
	};
	plusBtn = (name, qty, id) => {
		const { addQtyAction, userID } = this.props;
		addQtyAction(name, qty, id, userID);
	};
	minBtn = (name, qty, id) => {
		const { subQtyAction, userID } = this.props;
		subQtyAction(name, qty, id, userID);
	};
	renderCart = () => {
		const { cart } = this.props;
		return cart.map((val) => {
			return (
				<tr>
					
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt="" height="50px" />
					</td>

					<td>
						<Button onClick={() => this.minBtn(val.name, val.qty, val.id)}>
							-
						</Button>
					</td>
					<td>{val.qty}</td>
					<td>
						<Button onClick={() => this.plusBtn(val.name, val.qty, val.id)}>
							+
						</Button>
					</td>
					<td>{val.qty * val.price}</td>
					<td>
						<Button onClick={() => this.deleteBtn(val.id, val.userID)}>
							delete
						</Button>
					</td>
				</tr>
			);
		});
	};
	
	
	render() {
		const { cart } = this.props;
		if (cart.length === 0) {
			return (
				<div>
					
				</div>
			);
		}
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							
							<th>name</th>
							<th>image</th>
							<th colspan="3">qty</th>
							<th>price</th>
							<th>action</th>
						</tr>
					</thead>
					<tbody>{this.renderCart()}</tbody>
					
				</Table>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		cart: state.cart.cart,
		userID: state.user.id,
	};
};
export default connect(mapStatetoProps, {
	fetchCartAction,
	deleteCartAction,
	addQtyAction,
	subQtyAction,

})(CartPage);
