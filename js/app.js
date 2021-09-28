let data

getData();

async function getData() {
    data = await fetchData('/data.json');
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