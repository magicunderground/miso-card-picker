import { IStorage } from '../Storage/IStorage'
import { post } from 'request'
import { Card } from 'scryfall-sdk'

export class ServiceProxy {

    private config: IStorage;

    constructor(config: IStorage) {
        this.config = config;
    }

    showCard(card: Card): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let url = this.config.get('url') as string
            let user = this.config.get('user') as string;
            let key = this.config.get('streamkey') as string;

            let target = url + user;
            if (card.multiverse_ids && target) {
                post(target,
                    { json: { 'streamkey': key, 'cardid': card.multiverse_ids[0], 'duration': 60 } },
                    (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
            }
        });
    }

    clearDisplay(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let url = this.config.get('url') as string;
            let user = this.config.get('user') as string;
            let key = this.config.get('streamkey') as string;

            let target = url + user;
            if (target) {
                post(target,
                    { json: { 'streamkey': key, 'cardid': '', 'duration': 0 } },
                    (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
            }
        });
    }
}