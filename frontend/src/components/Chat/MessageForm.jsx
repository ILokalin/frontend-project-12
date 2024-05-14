import React from "react";
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const MessageForm = () => {
  return (
    <Form>
      <InputGroup>
        <Form.Control />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  )
};

export default MessageForm;
