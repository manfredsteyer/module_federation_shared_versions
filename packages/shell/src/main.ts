// static imports do currently not work with shared libs,
// hence the dynamic one inside an async IIFE below
//import * as rxjs from 'rxjs';

// import * as useless_static from 'useless-lib';

// console.debug('useless_static', useless_static.version);

const container = document.getElementById('container');
const flightsLink1 = document.getElementById('flights1');
const flightsLink2 = document.getElementById('flights2');
const flightsLink3 = document.getElementById('flights3');


const homeLink = document.getElementById('home');
const version = document.getElementById('version');

function removeFirstChild() {
    if (container.firstChild) {
        container.firstChild.remove();
    }
}

function displayWelcomeMessage() {
    removeFirstChild();
    container.innerHTML = `<h1>Welcome!</h1>`;
}

(async function() { 
    const rxjs = await import('rxjs');
    const useless = await import('useless-lib');

    version.innerText = useless.version;

    displayWelcomeMessage();

    rxjs.fromEvent(flightsLink1, 'click').subscribe(async _ => {
        const module = await import('mfe1/component');
        const elm = document.createElement(module.elementName);
        removeFirstChild();       
        container.appendChild(elm);
    });

    rxjs.fromEvent(flightsLink2, 'click').subscribe(async _ => {
        const module = await import('mfe2/component');
        const elm = document.createElement(module.elementName);
        removeFirstChild();       
        container.appendChild(elm);
    });

    rxjs.fromEvent(flightsLink3, 'click').subscribe(async _ => {
        const module = await import('mfe3/component');
        const elm = document.createElement(module.elementName);
        removeFirstChild();       
        container.appendChild(elm);
    });

    rxjs.fromEvent(homeLink, 'click').subscribe(_ => {
        displayWelcomeMessage();
    });

})();