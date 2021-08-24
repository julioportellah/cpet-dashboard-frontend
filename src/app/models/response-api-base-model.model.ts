export class ResponseApiBaseModel<T> {
    data: T | undefined;
    code: number | undefined;
    
    constructor() {
    }
}
