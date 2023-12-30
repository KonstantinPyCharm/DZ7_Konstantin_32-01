const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// CONVERTER

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, targetElement, element2, targetElement2, element3, targetElement3, current) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            const data = await response.json();
            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    targetElement3.value = (element.value / data.eur).toFixed(2);
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    targetElement3.value = (element.value / data.eur * data.usd).toFixed(2);
                    break
                case 'eur':
                    targetElement2.value = (element.value * data.eur / data.usd).toFixed(2);
                    targetElement3.value = (element.value * data.eur).toFixed(2);
                    break
                default:
                    break
            }
        } catch (e) {

        }
    }
}


converter(som, usd, "som", usd, "som", eur, "som")
converter(usd, som, "usd", som, "usd", eur, "usd")
converter(eur, som, "eur", usd, "eur", som, "eur")

////

const card = document.querySelector(".card"),
    btnNext = document.querySelector("#btn-next"),
    btnPrev = document.querySelector("#btn-prev")


let count = 1
let maxCardId = 200

const firstScrollCard = async (count) => {
    try {
        const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await resp.json()
        console.log(data.id)
        card.innerHTML = `
            <p>${data.title}</p>
            <span>${data.id}</span>  
        `
    } catch (e) {

    }
}



const fetchNextCard = () => {
    count = (count % maxCardId) + 1;
    firstScrollCard(count);
}

const fetchPrevCard = () => {
    count = ((count - 2 + maxCardId) % maxCardId) + 1;
    firstScrollCard(count);
}

btnNext.addEventListener("click", () => {
    fetchNextCard();
})

btnPrev.addEventListener("click", () => {
    fetchPrevCard();
})

firstScrollCard(count);

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');
let currentTab = 0;

const hideTabContent = () => {
    tabContentBlocks.forEach(tabContentBlock => {
        tabContentBlock.style.display = 'none';
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active');
    })
}

const showTabContent = (tabIndex = 0) => {
    tabContentBlocks[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
}

const autoSwitchTab = (tabIndex) => {
    hideTabContent();
    currentTab = (currentTab + 1) % tabs.length;
    showTabContent(currentTab);
}

hideTabContent()
showTabContent()
setInterval(autoSwitchTab, 3000)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab , tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                currentTab = tabIndex;
                showTabContent(currentTab);
            }
        })
    }
}

// WEATHER

const cityNameInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const BASE_URL = "http://api.openweathermap.org";
const API_KEY = "e417df62e04d3b1b111abeab19cea714";

cityNameInput.addEventListener('input', async (event) => {
    try {
        const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()
        city.innerHTML = data.name ? data.name : "Город не найден..."
        temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273.15) + '&deg;C' : "..."
    } catch (e) {

    }
})


