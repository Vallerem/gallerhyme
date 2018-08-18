import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchAllUsers } from "../redux/actions";

export class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.loading);
    // console.log(this.props.error);
    // console.log(this.props.users);

    return (
      <div>
        <h1>Users List</h1>
        <button onClick={this.props.fetchAllUsers}>Get all users</button>
        {this.props.loading && <h1>...Loading</h1>}
        {!this.props.loading &&
          !this.props.error &&
          this.props.users.map((user, index) => (
            <div key={index}>
              <div>
                {user.name} --- {user.email}
              </div>
            </div>
          ))}
        {this.props.error && <h1>{this.props.error}</h1>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.fetchUserLoading,
  error: state.users.fetchUserError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
