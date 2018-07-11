import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    loading: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        errors: nextProps.errors
      });

      this.setState({ loading: false });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    const newUser = {
      name,
      email,
      password,
      confirmPassword
    };

    this.setState({ loading: true });

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      errors,
      loading
    } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  name="name"
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={this.handleChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  error={errors.email}
                  onChange={this.handleChange}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  error={errors.password}
                  onChange={this.handleChange}
                />

                <TextFieldGroup
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  onChange={this.handleChange}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={loading ? "disabled" : ""}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(withRouter(Register));
