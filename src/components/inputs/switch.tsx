import React from 'react';
import { Form } from 'react-bootstrap';

interface SwitchProps {
    onChange: any,
    checked: boolean
    label: string,
    'data-testid': string
}

function Switch(props: SwitchProps) {
    return (
        <Form.Check
            id="switch"
            data-testid={props['data-testid']}
            type="switch"
            name="switch"
            label={props.label}
            checked={props.checked}
            onChange={props.onChange}
        />
    );
}

export default Switch;
