// static imports do currently not work with shared libs,
// hence the dynamic one inside an async IIFE below
//import * as rxjs from 'rxjs';

import { loadRemoteModule } from './federation-utils';

// import * as useless_static from 'useless-lib';

// console.debug('useless_static', useless_static.version);

const container = document.getElementById('container');
const flightsLink = document.getElementById('flights');
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

    rxjs.fromEvent(flightsLink, 'click').subscribe(async _ => {
        
        // const module = await import('mfe1/component');
        
        const module = await loadRemoteModule({
            remoteEntry: 'http://localhost:3000/remoteEntry.js',
            remoteName: 'mfe1',
            exposedModule: './component'
        });

        const elm = document.createElement(module.elementName);
        removeFirstChild();       
        container.appendChild(elm);
    });

    rxjs.fromEvent(homeLink, 'click').subscribe(_ => {
        displayWelcomeMessage();
    })

})();