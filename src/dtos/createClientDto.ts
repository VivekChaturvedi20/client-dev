export default class CreateClientDto {
    name: string = '';
    active: boolean = true;
    contractStart: string;
    contractEnd: string;
    userExtRef:string;

    constructor(name: string, contractStart: string, contractEnd: string, active: boolean, userExtRef: string) {
        this.name = name;
        this.contractStart = contractStart;
        this.contractEnd = contractEnd;
        this.active = active;
        this.userExtRef = userExtRef;
    }
}
