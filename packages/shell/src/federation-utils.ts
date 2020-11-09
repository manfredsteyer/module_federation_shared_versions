type Scope = unknown;
type Factory = () => any;

type Container = {
    init(shareScope: Scope): void;
    get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

const moduleMap = {};

export function loadRemoteEntry(remoteEntry: string): Promise<void> {
    return new Promise<any>((resolve, reject) => {

        if (moduleMap[remoteEntry]) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = remoteEntry;

        script.onerror = reject;

        script.onload = () => {
            moduleMap[remoteEntry] = true;
            resolve(); // window is the global namespace
        }

        document.body.append(script);
    });
}

export async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
      const container = window[remoteName] as Container;
      const factory = await container.get(exposedModule);
      const Module = factory();
      return Module as T;
}

export type LoadRemoteModuleOptions = { 
    remoteEntry: string; 
    remoteName: string; 
    exposedModule: string
}

let isDefaultScopeInitialized = false;

export async function initRemote(remoteName: string) {

    if (!isDefaultScopeInitialized) { 
        await __webpack_init_sharing__('default');
        isDefaultScopeInitialized = true;
    }
    const container = window[remoteName] as Container;
    await container.init(__webpack_share_scopes__.default);
    return container;
}

export async function loadRemoteModule(options: LoadRemoteModuleOptions): Promise<any> {
    await loadRemoteEntry(options.remoteEntry);
    return await lookupExposedModule<any>(options.remoteName, options.exposedModule);
}