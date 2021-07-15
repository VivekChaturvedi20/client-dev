import { makeObservable, observable } from 'mobx';

export default class UpdateClientDto {
    @observable id: string = '';
    @observable name: string = '';
    @observable active: boolean = true;
    @observable contractStart: string = '';
    @observable contractEnd: string = '';
    @observable userExtRef: string = '';
    @observable pairingToken: string | undefined = '';

    constructor(id: string, name: string, contractStart: string, contractEnd: string, active: boolean, pairingToken: string | undefined) {
        makeObservable(this);
        this.id = id;
        this.name = name;
        this.contractStart = contractStart;
        this.contractEnd = contractEnd;
        this.active = active;
        this.pairingToken = pairingToken;
    }
}
