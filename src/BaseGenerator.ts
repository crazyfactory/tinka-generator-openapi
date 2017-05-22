import * as fs from "fs";
import * as path from "path";
export abstract class BaseGenerator {
    protected abstract generateInterfaces();
    protected abstract generateControllers();
    protected jsonData;

    constructor(file: string) {
        const data: string = fs.readFileSync(path.resolve(file)).toString();
        this.jsonData = JSON.parse(data);
    }

    public generate() {
        this.generateInterfaces();
        this.generateControllers();
    }
}