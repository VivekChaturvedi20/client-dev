import React from 'react';
import {
    render, cleanup, queryByAttribute
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Switch from './switch';

afterEach(cleanup);

test('switch render checked', async () => {
    const dom = render(<Switch id="switch" checked onChange={() => {}} />);
    const element = queryByAttribute('id', dom.container, 'switch');
    expect(element.checked).toBe(true);
});

test('switch render unchecked', async () => {
    const dom = render(<Switch id="switch" checked={false} onChange={() => {}} />);
    const element = queryByAttribute('id', dom.container, 'switch');
    expect(element.checked).toBe(false);
});
