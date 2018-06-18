import { writeFileSync, readFileSync } from 'fs'

export interface IFile {

    // Overwrites the file with contents
    writeAllText(contents: string): void;

    // reads all from the file
    readAllText(): string;
}

export class File implements IFile {

    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    writeAllText(contents: string): void {
        writeFileSync(this.path, contents);
    }
    
    readAllText(): string {
        return readFileSync(this.path).toString();
    }
}