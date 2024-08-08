import React from "react";

import { Row, Col } from "react-bootstrap";
import "./loginRegisterStyles.scss";

type propsType = {
  children: React.ReactNode | null;
};

const LoginRegister: React.FC<propsType> = (props) => {
  const { children } = props;

  return (
    <Row>
        <Col md={8}>
          <div>
            <div className="img-login" />
          </div>
        </Col>

        <Col md={4}>{children}</Col>
      </Row>
  );
};

export default LoginRegister;
