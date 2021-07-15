import { getContent } from './contentUtils';

export function validateContractDates(values: any, errors:any) {
    if (values.contractStart && values.contractEnd) {
        if (values.contractStart > values.contractEnd) {
            // eslint-disable-next-line no-param-reassign
            errors.contractStart = getContent('clientAdmin.validationErrors.contractStartLaterThanEnd');
        }
    }
}
