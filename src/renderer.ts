import { Cards } from 'scryfall-sdk';
import { FileSystemStorage } from './lib/Storage/FileSystemStorage';
import { File } from './lib/IO/File';
import { remote } from 'electron';
import { Throttler } from './lib/Utilities/Throttler';
import { ServiceProxy } from './lib/Service/ServiceProxy';

let cardNameTxt = document.getElementById('cardName') as HTMLInputElement;
let searchBtn = document.getElementById('search') as HTMLInputElement;
let clearBtn = document.getElementById('clear') as HTMLInputElement;
let suggestionList = document.getElementById('cardSuggestions') as HTMLDataListElement;
let display = document.getElementById('cardDisplay') as HTMLImageElement;

let serviceProxy = new ServiceProxy(new FileSystemStorage(new File(remote.app.getPath('userData') + 'config.json')));

async function search(name: string) {
    let card = await Cards.byName(name, true);
    if (card.image_uris) {
        if (display) {
            display.src = card.image_uris.normal;
        }

        await serviceProxy.showCard(card);
    }
}

async function clearDisplay() {
    display.src = '';
    cardNameTxt.value = '';

    await serviceProxy.clearDisplay();
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        if (cardNameTxt && cardNameTxt.value) {
            search(cardNameTxt.value);
        }
    });
}

if (clearBtn) {
    clearBtn.addEventListener('click', clearDisplay);
}

function clearChildren(item : HTMLElement) {
    while (item.children.length > 0) item.removeChild(item.children[0]);
}

if (cardNameTxt) {
    let autoCompleteThrottler = new Throttler(4);
    cardNameTxt.addEventListener('keypress', async (evt) => {
        if (evt.key == 'Enter') { 
            evt.preventDefault();
            if (cardNameTxt.value.length > 0) {
                await search(cardNameTxt.value);
            } else {
                await clearDisplay();
            }
        } else {
            if (cardNameTxt.value.length < 4 && suggestionList.children.length > 0) {
                clearChildren(suggestionList);
            } else if (cardNameTxt.value.length > 3 && suggestionList) {
                await autoCompleteThrottler.tryPerformAction(async () => {
                    clearChildren(suggestionList);
                    let names = await Cards.autoCompleteName(cardNameTxt.value);
                    names.forEach(name => {
                        let opt = document.createElement('option');
                        opt.value = name;
                        suggestionList.appendChild(opt);
                    });
                });
            }
        }
    });
}