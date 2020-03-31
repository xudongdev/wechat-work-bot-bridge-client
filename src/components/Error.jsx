import PropTypes from "prop-types";
import React from "react";

function Error({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

Error.propTypes = {
  description: PropTypes.node,
  title: PropTypes.string.isRequired
};

Error.defaultProps = {
  description: null
};

export default Error;
