import { Cache } from './utilities/Cache'
import * as Path from 'path'
import { File } from './io/File'
import { Request } from './io/Request'
import { CardInfo } from './CardInfo'

export class CardInfoCache implements Cache<string, CardInfo> {
    private rootDir: string
    private index: string
    private map: Map<string, CardInfo>

    constructor(rootDir: string) {
        this.rootDir = rootDir
        this.index = Path.join(this.rootDir, 'index.dat')

        try {
            this.map = JSON.parse(File.readFileSync(this.index).toString())
        } catch (error) {
            this.map = new Map<string, CardInfo>()
        }
    }

    has = async (key: string) => this.map.has(key)

    get = async (key: string) => this.map.get(key)

    put = async (key: string, value: CardInfo) => {
        let resp = await Request.get(value.img_uri, { encoding: 'binary' })
        let path = Path.join(this.rootDir, key + '.jpg')

        // Write out img
        await File.writeFile(path, resp.body)

        this.map.set(key, { name: value.name, img_uri: path })

        // Update index
        await File.writeFile(this.index, JSON.stringify(this.map))

        return this.map.get(key) || value
    }
}