import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.setState({ loading: true });

    this.props.loginUser(user);
  };


  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  error={errors.email}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  error={errors.password}
                  onChange={this.handleChange}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={loading ? "disabled" : ""}
                  value={ loading ? "Please wait": "Login" }
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);
