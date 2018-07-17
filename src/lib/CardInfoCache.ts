import { ICache } from './utilities/ICache'
import * as Path from 'path'
import { File } from './io/File'
import { Request } from './io/Request'
import { ICardInfo } from './ICardInfo'

export class CardInfoCache implements ICache<string, ICardInfo> {
    private rootDir: string
    private index: string
    private map: Map<string, ICardInfo>

    constructor(rootDir: string) {
        this.rootDir = rootDir
        this.index = Path.join(this.rootDir, 'index.dat')

        try {
            this.map = new Map<string, ICardInfo>(JSON.parse(File.readFileSync(this.index).toString()))
        } catch (error) {
            this.map = new Map<string, ICardInfo>()
        }
    }

    has = async (key: string) => this.map.has(key)

    get = async (key: string) => this.map.get(key)

    put = async (key: string, value: ICardInfo) => {
        let resp = await Request.get(value.img_uri, { encoding: 'binary' })
        let path = Path.join(this.rootDir, key + '.jpg')

        try {
            // Write out img
            await File.writeFile(path, resp.body, { encoding: 'binary' })

            this.map.set(key, { name: value.name, img_uri: path })

            // Update index
            await File.writeFile(this.index, JSON.stringify([...this.map]))
        } catch {
            // todo: log error
        }

        return this.map.get(key) || value
    }
}