import {Cards} from 'scryfall-sdk'

let cardNameTxt = document.getElementById('cardName') as HTMLInputElement
let searchBtn = document.getElementById('search') as HTMLInputElement
let clearBtn = document.getElementById('clear') as HTMLInputElement
let showBtn = document.getElementById('show') as HTMLInputElement
let suggestionList = document.getElementById('cardSuggestions') as HTMLDataListElement
let display = document.getElementById('cardDisplay') as HTMLImageElement

let lastPop = Date.now()

function search(name: string){
    Cards.byName(name, true).then(res => {
        if (res.image_uris) {
            if (display) {
                display.src = res.image_uris.normal
            }
        }
    })
}

function clearDisplay() {
    // todo: Send clear command to server
}

function showDisplay() {
    // todo: Send command to server to display
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

if (showBtn) {
    showBtn.addEventListener('click', showDisplay)
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
                display.src = ''
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