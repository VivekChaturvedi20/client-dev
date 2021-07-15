import * as ValidationUtils from './validationUtils';

test('validationUtils validateContractDates: contract start date after end date', () => {
    const startDate:Date = new Date();
    const endDate = new Date();

    endDate.setDate(startDate.getDate() - 10);

    const errors:any = {};
    ValidationUtils.validateContractDates({
        contractStart: startDate,
        contractEnd: endDate
    }, errors);

    expect(errors.contractStart).toBeDefined();
});

test('validationUtils validateContractDates: contract start date before end date', () => {
    const startDate:Date = new Date();
    const endDate = new Date();

    endDate.setDate(startDate.getDate() + 10);

    const errors:any = {};
    ValidationUtils.validateContractDates({
        contractStart: startDate,
        contractEnd: endDate
    }, errors);

    expect(errors.contractStart).toBeUndefined();
});
