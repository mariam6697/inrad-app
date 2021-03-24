import React from "react";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FlexboxGrid,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from "rsuite";

const LoginForm = ({ account, setAccount, model, sendAccount }) => {
  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          <Panel header={<h3>Ingresar</h3>} bordered>
            <Form
              fluid
              formValue={account}
              onChange={(account) => setAccount(account)}
              model={model}
              onSubmit={sendAccount}
            >
              <FormGroup>
                <ControlLabel>Nombre de usuario</ControlLabel>
                <FormControl name="username" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" type="submit">
                    Ingresar
                  </Button>
                  <Button appearance="default">Cancelar</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default LoginForm;
