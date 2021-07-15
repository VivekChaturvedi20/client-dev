import dateFormat from 'dateformat';
import AppConstants from '../constants/appConstants';

export default class ClientListDto {
    id: string = '';
    name: string = '';
    active: boolean = true;
    contractStartDate: Date;
    contractStartDateString!: string;
    contractEndDate: Date;
    contractEndDateString!: string;

    constructor(id: string, name: string, contractStartDate: Date, contractEndDate: Date, active: boolean) {
        this.id = id;
        this.name = name;
        this.contractStartDate = contractStartDate;
        this.contractStartDateString = dateFormat(this.contractStartDate, AppConstants.dates.formats.STANDARD);
        this.contractEndDate = contractEndDate;
        this.contractEndDateString = dateFormat(this.contractEndDate, AppConstants.dates.formats.STANDARD);
        this.active = active;
    }
}
