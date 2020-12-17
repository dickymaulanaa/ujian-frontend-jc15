import React, { Component } from "react";
import { Table } from "reactstrap";

class HistoryPage extends Component {
	state = { };
	
	render() {
		console.log(this.state.history);
		return (
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Items</th>
							<th>Total</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					
				</Table>
			</div>
		);
	}
}

export default HistoryPage;
