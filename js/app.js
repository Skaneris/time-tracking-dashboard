let data

renderCards();
getData();

function renderCards() {
    const cards = ['Work', 'Play', 'Study', 'Exercise', 'Social', 'Self Care'];
    const wrapper = document.querySelector('.cards')
    cards.map(item => {
        wrapper.insertAdjacentHTML('beforeend', `
        <div class="card ${ item.toLowerCase() }">
            <div class="card__body">
                <div class="card__top">
                    <h4>${item}</h4>
                    <button>
                        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                    </button>
                </div>
                <div class="card__bottom">
                    <div class="left" data-type="${item}"></div>
                    <div class="right" data-type="${item}-prev"></div>
                </div>
            </div>
        </div>
        `);
    })
}

async function getData() {
    data = await fetchData('/time-tracking-dashboard/data.json');
    setData('daily')
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function setData(type) {
    data.map(item => {
        const tf = nav.querySelector('button[data-active="1"]').dataset.type
        document.querySelector(`div[data-type="${item.title}"]`).innerHTML = item.timeframes[tf].current + 'hrs'
        document.querySelector(`div[data-type="${item.title}-prev"]`).innerHTML = 'Last Week - ' + item.timeframes[tf].previous + 'hrs'
    })
}

const nav = document.querySelector('.user__nav')
nav.addEventListener('click', e => {
    if(e.target.dataset.active === '0') {
        nav.querySelector('button[data-active="1"]').dataset.active = '0'
        e.target.dataset.active = '1'
        const type = e.target.dataset.type
        setData(type)
    }
})