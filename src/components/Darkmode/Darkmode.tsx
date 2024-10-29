import "./darkmode.css";

interface Props {
  onClick: () => void;
  src: string;
  alt: string;
}

const Darkmode = ({ onClick, src, alt }: Props) => {
  return (
    <button className="darkMode fadeIn modeSwitch" onClick={onClick}>
      <img className="darkMode fadeIn modeSwitch" src={src} alt={alt} />
    </button>
  );
};

export default Darkmode;
