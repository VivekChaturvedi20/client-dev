export default class LoggerDto {
    id: string = '';
    name: string = '';
    message: string = '';
    stack: string = '';
    environment: string = '';
    timestamp: number;

    constructor(id: string, name: string, message: string, stack: string, environment: string, timestamp: number) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.stack = stack;
        this.environment = environment;
        this.timestamp = timestamp;
    }
}
