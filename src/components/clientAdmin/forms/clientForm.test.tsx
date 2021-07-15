import React from 'react';
import {
    render, cleanup, fireEvent, waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClientFrom from './clientForm';
import { getContent } from '../../../utils/contentUtils';

afterEach(cleanup);

test('clientForm validate empty form', async () => {
    const dom = render(<ClientFrom
        initialValues={{
            id: 'id', name: '', contractStart: null, contractEnd: null, active: true
        }}
        onSave={() => {}}
        onCancel={() => {}}
    />);

    const saveButton = dom.getByTestId('saveButton');
    await fireEvent.click(saveButton);

    await waitFor(() => {
        const requiredTexts = dom.getAllByText(getContent('clientAdmin.validationErrors.required'));
        // 3 instances of required should have appeared
        expect(requiredTexts.length).toBe(3);
    });
});
