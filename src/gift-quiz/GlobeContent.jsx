import PropTypes from 'prop-types'

const GlobeContent = ({ joyImagePath }) => {
  return (
    <div
      className="globe-content"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {joyImagePath && (
        <img
          src={`http://localhost:3000${joyImagePath}`}
          alt="Latest Joy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />
      )}
    </div>
  );
};
GlobeContent.propTypes = {
  joyImagePath: PropTypes.string
}

export default GlobeContent;
