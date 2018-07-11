import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, onChange, info, error, options }) => {
  const selectOptons = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptons}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <span className="invalid-feedback">{error}</span>}
    </div>
  );
};

SelectListGroup.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
