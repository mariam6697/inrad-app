import {Button, ButtonToolbar, ControlLabel, FlexboxGrid, Form, FormControl, FormGroup, Panel} from "rsuite";

const Login =() => {
    return(
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Ingresar</h3>} bordered>
                    <Form fluid>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Contraseña</ControlLabel>
                            <FormControl name="password" type="password" />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary">Ingresar</Button>
                                <Button appearance="link">¿Olvidó su contraseña?</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}

export default Login