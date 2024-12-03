import PropTypes from "prop-types";
import "../styles/components/TalkDetail.css";

const TalkDetail = ({ talk, onBack }) => {
  if (!talk) return null;

  return (
    <div className="talk-detail-container">
      <h1>{talk.title}</h1>
      <p>
        <strong>Tid:</strong> {new Date(talk.time).toLocaleString()}
      </p>
      <p>
        <strong>Foredragsholder:</strong> {talk.speakerIdName}
      </p>
      <p>
        <strong>Rom:</strong> {talk.roomId || "Ikke spesifisert"}
      </p>
      <button onClick={onBack}>Tilbake til liste</button>
    </div>
  );
};

TalkDetail.propTypes = {
  talk: PropTypes.shape({
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    speakerIdName: PropTypes.string.isRequired,
    roomId: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
};

export default TalkDetail;
