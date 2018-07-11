import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../vaildation/is-empty";

export class EditProfile extends React.Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    facebook: "",
    errors: {},
    loading: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skills = profile.skills.join(",");

      // If profile field doesn't exist, make empty string
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      this.setState({ ...profile, loading: false, skills });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    let { displaySocialInputs, errors, loading, ...profileData } = this.state;

    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const {
      bio,
      handle,
      company,
      website,
      status,
      skills,
      location,
      twitter,
      linkedin,
      youtube,
      facebook,
      instagram,
      githubusername,
      errors,
      displaySocialInputs,
      loading
    } = this.state;

    // Status Options
    const statusOptions = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            name="twitter"
            placeholder="Twitter Profile URL"
            icon="fab fa-twitter"
            value={twitter}
            error={errors.twitter}
            onChange={this.onChange}
          />

          <InputGroup
            name="facebook"
            placeholder="Facebook Profile URL"
            icon="fab fa-facebook"
            value={facebook}
            error={errors.facebook}
            onChange={this.onChange}
          />

          <InputGroup
            name="linkedin"
            placeholder="Linkedin Profile URL"
            icon="fab fa-linkedin"
            value={linkedin}
            error={errors.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            name="youtube"
            placeholder="Youtube Profile URL"
            icon="fab fa-youtube"
            value={youtube}
            error={errors.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            name="instagram"
            placeholder="Instagram Profile URL"
            icon="fab fa-instagram"
            value={instagram}
            error={errors.instagram}
            onChange={this.onChange}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <h1 className="display-4 text-center">Edit your profile</h1>

        <div className="col-md-8 m-auto">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="handle"
              placeholder="* Handle"
              value={handle}
              onChange={this.onChange}
              error={errors.handle}
              info="A unique handle for your profile URL. Your full name, company name,
            nickname, etc (This CAN'T be changed later)"
            />

            <SelectListGroup
              name="status"
              options={statusOptions}
              value={status}
              onChange={this.onChange}
              error={errors.status}
              info="Give us an idea of where you are at in your career"
            />

            <TextFieldGroup
              name="skills"
              placeholder="skills"
              value={skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use comma to seperate the your skills (e.g HTML, CSS, JS)"
            />

            <TextFieldGroup
              name="company"
              placeholder="Company"
              value={company}
              onChange={this.onChange}
              error={errors.company}
              info="Could be your own company or the one you work for"
            />

            <TextFieldGroup
              name="website"
              placeholder="Website"
              value={website}
              onChange={this.onChange}
              error={errors.website}
              info="Could be your own website or a company one"
            />

            <TextFieldGroup
              name="location"
              placeholder="Location"
              value={location}
              onChange={this.onChange}
              error={errors.location}
              info="City or city & state. Suggested (e.g Boston, MA)"
            />

            <TextFieldGroup
              name="githubusername"
              placeholder="Githubusername"
              value={githubusername}
              onChange={this.onChange}
              error={errors.githubusername}
              info="If you want your latest repos and a Github lik"
            />

            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us a little about yourself"
            />

            <div className="mb-3">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  this.setState(previous => ({
                    displaySocialInputs: !previous.displaySocialInputs
                  }));
                }}
              >
                Add Social Network Links
              </button>
              <span className="text-muted">Optional</span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value={loading ? "Please wait..." : "Add profile"}
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(withRouter(EditProfile));
