import { Injectable } from '@angular/core';

interface ScriptConfig {
  url: string;
  globalObject: string;
  callbackMethodPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private loadedScripts = new Map<string, Promise<void>>();

  loadScripts(scripts: ScriptConfig[]): Promise<void[]> {
    return Promise.all(scripts.map(script =>
      this.loadScript(script.url, script.globalObject, script.callbackMethodPath)
    ));
  }

  loadScript(scriptUrl: string, globalObjectName: string, callbackMethodPath?: string): Promise<void> {
    if (this.loadedScripts.has(scriptUrl)) {
      return this.loadedScripts.get(scriptUrl)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const globalObj = (window as any)[globalObjectName];
      if (globalObj) {
        if (callbackMethodPath) {
          this.callMethod(globalObj, callbackMethodPath);
        }
        return resolve();
      }

      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => {
        const globalObj = (window as any)[globalObjectName];
        if (callbackMethodPath) {
          this.callMethod(globalObj, callbackMethodPath);
        }
        resolve();
      };
      script.onerror = (err) => reject(err);

      document.body.appendChild(script);
    });

    // Guardamos la promesa en cache
    this.loadedScripts.set(scriptUrl, promise);

    return promise;
  }

  private callMethod(obj: any, path: string) {
    const method = path.split('.').reduce((o, key) => o?.[key], obj);
    if (typeof method === 'function') {
      method();
    }
  }
}
