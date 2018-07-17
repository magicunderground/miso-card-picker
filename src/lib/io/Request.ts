import * as request from 'request'

export class Request {
    static get = (uri: string, options?: request.CoreOptions) => {
        return new Promise<request.Response>((resolve, reject) => {
            request.get(uri, options, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
}
