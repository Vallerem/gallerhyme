import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchAllUsers } from "../redux/actions";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationState: 1,
      hasMore: true,
      users: this.props.users
    };
  }

  componentDidMount = () => {
    this.props.fetchAllUsers(this.state.paginationState);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  handlefetchUsersWithPage = () => {
    if (this.props.page === this.props.pages) {
      this.setState({ hasMore: false });
      return;
    }

    this.props.fetchAllUsers(this.state.paginationState);

    this.setState(prevState => ({
      paginationState: prevState.paginationState + 1
    }));
  };

  render() {
    const items = this.state.users.map((user, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              flex: "0 0 30%",
              fontSize: 30,
              textAlign: "left",
              padding: 5
            }}
          >
            {user.name}
          </div>
          <div style={{ flex: "0 0 70%", fontSize: 30, padding: 5 }}>
            {user.email}
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <h1>Users</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.users.length}
          next={this.handlefetchUsersWithPage}
          hasMore={this.state.hasMore}
          loader={
            this.props.error ? <h4>{this.props.error}</h4> : <h4>Loading...</h4>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                No more items to see{" "}
                <span aria-label="eyes icon" role="img">
                  👀
                </span>
              </b>
            </p>
          }
        >
          {items}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.usersData,
  page: state.users.page,
  pages: state.users.pages,
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
