import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { ATTRIBUTE_REMOVABLE } from "./constants";

const Channel = ({
  channel,
  isCurrent,
  handleSelect,
  handleRemove,
  handleRename,
}) => {
  const variant = isCurrent ? "secondary" : "";
  const isRemovable = channel[ATTRIBUTE_REMOVABLE];

  return (
    <li className="nav-item w-100">
      {isRemovable ? (
        <Dropdown className="d-flex" as={ButtonGroup}>
          <Button
            type="button"
            variant={variant}
            onClick={handleSelect}
            className="w-100 rounded-0 text-start btn text-truncate"
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            split
            className="flex-grow-0 rounded-0"
            variant={variant}
          >
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={handleRename}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={variant}
          onClick={handleSelect}
          className="w-100 rounded-0 text-start btn"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
