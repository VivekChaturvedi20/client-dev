export default class ClientFormDto {
    id?: string = '';
    name: string = '';
    active: boolean = true;
    contractStart?: any;
    contractEnd?: any;
    pairingToken?: string;
}
