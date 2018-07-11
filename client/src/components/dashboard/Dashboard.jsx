import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import Spinner from "../common/Spinner";

import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteAccount = e => {
    this.props.deleteAccount();
  };

  render() {
    let { user } = this.props.auth;
    user = user._doc;

    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if the user has setup his/her profile
      if (Object.keys(profile).length > 0) {
        // Display this when the user have a profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div>
              <button className="btn btn-danger" onClick={this.onDeleteAccount}>
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // Display this when the user have no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup your profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              {" "}
              Create Profile{" "}
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <h1>Dashboard</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
