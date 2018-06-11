import { Cards } from 'scryfall-sdk'
import { AppData } from './AppData'
import { post } from 'request'

let cardNameTxt = document.getElementById('cardName') as HTMLInputElement
let searchBtn = document.getElementById('search') as HTMLInputElement
let clearBtn = document.getElementById('clear') as HTMLInputElement
let suggestionList = document.getElementById('cardSuggestions') as HTMLDataListElement
let display = document.getElementById('cardDisplay') as HTMLImageElement

let config = new AppData('config')

let lastPop = Date.now()

function search(name: string){
    Cards.byName(name, true).then(res => {
        if (res.image_uris) {
            if (display) {
                display.src = res.image_uris.normal

                let url = config.get('url') as string
                let user = config.get('user') as string
                let key = config.get('streamkey') as string

                let target = url + user
                if (res.multiverse_ids) {
                    post(target, { json: { 'streamkey': key, 'cardid': res.multiverse_ids[0], 'duration': 60 } })
                }
            }
        }
    })
}

function clearDisplay() {
    let url = config.get('url') as string
    let user = config.get('user') as string
    let key = config.get('streamkey') as string

    let target = url + user
    display.src = ''
    cardNameTxt.value = ''

    post(target, { json: { 'streamkey': key, 'cardid': '', 'duration': 0 } })
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        if (cardNameTxt && cardNameTxt.value) {
            search(cardNameTxt.value)
        }
    })
}

if (clearBtn) {
    clearBtn.addEventListener('click', clearDisplay)
}

function clearChildren(item : HTMLElement) {
    while (item.children.length > 0) item.removeChild(item.children[0])
}

if (cardNameTxt) {
    cardNameTxt.addEventListener('keypress', (evt) => {
        if (evt.key == 'Enter') { 
            evt.preventDefault()
            if (cardNameTxt.value.length > 0) {
                search(cardNameTxt.value)
            } else {
                clearDisplay()
            }
        } else {
            if (cardNameTxt.value.length < 4 && suggestionList.children.length > 0) {
                clearChildren(suggestionList)
            } else if (cardNameTxt.value.length > 3 && (Date.now() - lastPop) > 250) {
                lastPop = Date.now()
                if (suggestionList) {
                    Cards.autoCompleteName(cardNameTxt.value).then(names => {
                        clearChildren(suggestionList)
                        names.forEach(name => {
                            if (!suggestionList.children.namedItem(name)) {
                                let opt = document.createElement('option')
                                opt.value = name
                                suggestionList.appendChild(opt)
                            }
                        })
                    })
                }
            }
        }
    })
}