import * as fs from 'fs'

export class File {
    static readFile = (path: fs.PathLike, options?: { encoding?: null; flag?: string } | undefined | null) => {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(path, options, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static readFileSync = (path: fs.PathLike, options?: { encoding?: null; flag?: string } | undefined | null) => fs.readFileSync(path, options)

    static writeFile = (path: fs.PathLike, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | undefined | null) => {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(path, data, options, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static writeFileSync = (path: fs.PathLike, data: any, options?: { encoding?: null; flag?: string } | undefined | null) => fs.writeFileSync(path, data, options)
   
}
