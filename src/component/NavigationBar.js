import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutAction } from "../redux/action";

import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap";


class NavBar extends Component {
	state = { isOpen: false };

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	logout = () => {
		const { logoutAction } = this.props;
		logoutAction();
		localStorage.removeItem("id");
	};
	renderNavBarLogin = () => {
		const { userID } = this.props;
		if (userID !== 0) {
			return (
				<DropdownMenu right>
					<Link to="/">
						<DropdownItem onClick={this.logout}>Logout</DropdownItem>
					</Link>
					<Link to="/cart" className="notification">
						<DropdownItem>Cart </DropdownItem>
						<span className="badge">{this.props.cart.length}</span>
					</Link>

					<DropdownItem divider />
					<Link to="/history">
						<DropdownItem>History</DropdownItem>
					</Link>
				</DropdownMenu>
			);
			// }
		} else {
			return (
				<DropdownMenu right>
					<Link to="/login">
						<DropdownItem>Login</DropdownItem>
					</Link>
					<DropdownItem>Register</DropdownItem>
			
				</DropdownMenu>
			);
		}
	};

	render() {
		const { userEmail } = this.props;
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Shoes Store</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink href="/"> Product</NavLink>
							</NavItem>
							<NavItem>
							
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Menu
								</DropdownToggle>
								{this.renderNavBarLogin()}
							</UncontrolledDropdown>
						</Nav>
						<NavbarText>{userEmail !== "" ? userEmail : ""}</NavbarText>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		userID: state.user.id,
		userRole: state.user.role,
		userEmail: state.user.email,
		cart: state.cart.cart,
	};
};

export default connect(mapStatetoProps, { logoutAction })(NavBar);
