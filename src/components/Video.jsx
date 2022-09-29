import PropTypes from 'prop-types';
import React from 'react';

function Video({ urlYoutube }) {
  return (
    <iframe
      frameBorder="0"
      allowFullScreen
      data-testid="video"
      width="300"
      height="250"
      src={ urlYoutube }
      title="YouTube video player"
    />
  );
}

Video.propTypes = {
  urlYoutube: PropTypes.string.isRequired,
};

export default Video;
