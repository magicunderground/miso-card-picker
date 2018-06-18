export interface IStorage {

    // Gets a value from storage
    get(key: string): any;

    // Sets a value in storage
    set(key: string, value: any): void;
}