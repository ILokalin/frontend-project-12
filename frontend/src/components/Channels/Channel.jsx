import { Button } from "react-bootstrap";

const Channel = ({ channel, isCurrent, handleSelect }) => {
  const variant = isCurrent ? "secondary" : "";

  return (
    <li className="nav-item w-100">
      <Button
        type="button"
        variant={variant}
        onClick={handleSelect}
        className="w-100 rounded-0 text-start btn"
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

export default Channel;
