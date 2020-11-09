import { initRemote, loadRemoteEntry } from './federation-utils';

const url = 'http://localhost:3000/remoteEntry.js';
const remoteName = 'mfe1';
    // let's assume we've got this url and remoteName 
    // from a lookup service at runtime

loadRemoteEntry(url)
    .then(_ => initRemote(remoteName))
    .then(_ => import('./bootstrap'))
    .catch(err => console.error('error bootstrapping', err));

