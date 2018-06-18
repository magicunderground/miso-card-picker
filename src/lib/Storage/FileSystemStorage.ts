import { IStorage } from './IStorage';
import { IFile } from '../IO/File';

export class FileSystemStorage implements IStorage {

    private file: IFile;

    private data: any;

    constructor(file: IFile) {
        this.file = file;
        try {
            this.data = JSON.parse(this.file.readAllText());
        } catch (error) {
            this.data = {};
        }
    }

    get(key: string) {
        return this.data[key];
    }

    set(key: string, value: any) {
        this.data[key] = value;
        this.file.writeAllText(JSON.stringify(this.data));
    }
}