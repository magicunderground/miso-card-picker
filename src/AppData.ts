import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { remote } from 'electron'

export class AppData {
    path: string
    data: any
    constructor(store: string) {
        const dataPath = remote.app.getPath('userData')
        this.path = join(dataPath, store + '.json')
        try {
            this.data = JSON.parse(readFileSync(this.path).toString())
        } catch (error) {
            this.data = {}
        }
    }

    get(key: string) {
        return this.data[key]
    }

    set(key: string, value: any) {
        this.data[key] = value
        writeFileSync(this.path, JSON.stringify(this.data))
    }
}