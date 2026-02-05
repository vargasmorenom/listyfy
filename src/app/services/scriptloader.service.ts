import { Injectable } from '@angular/core';
import { ScriptConfig } from '../interfaces/scriptConfig';


@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private loadedScripts = new Map<string, Promise<void>>();

  loadScripts(scripts: ScriptConfig[]): Promise<void[]> {
    return Promise.all(scripts.map(script => this.loadScript(script)));
  }

  loadScript(scriptConfig: ScriptConfig): Promise<void> {
    const { url, globalObject, callbackMethodPath, innerText } = scriptConfig;

    if (this.loadedScripts.has(url)) {
      return this.loadedScripts.get(url)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const globalObj = (window as any)[globalObject];
      if (globalObj) {
        if (callbackMethodPath) {
          this.callMethod(globalObj, callbackMethodPath);
        }
        resolve();
        return;
      }

      // 🔸 Caso especial para LinkedIn
      if (url === 'https://platform.linkedin.com/in.js' && innerText) {
        // 1. Script de configuración
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<script type="text/javascript">${innerText}</script>`;
        document.body.appendChild(wrapper.firstChild!);

        // 2. Script real
        const linkedInScript = document.createElement('script');
        linkedInScript.src = url;
        linkedInScript.async = true;

        linkedInScript.onload = () => {
          const globalObj = (window as any)[globalObject];
          if (callbackMethodPath) {
            this.callMethod(globalObj, callbackMethodPath);
          }
          resolve();
        };

        linkedInScript.onerror = (err) => reject(err);
        document.body.appendChild(linkedInScript);
      } else {
        // 🔹 Scripts normales
        const script = document.createElement('script');

        if (innerText) {
          script.type = 'text/javascript';
          script.textContent = innerText;
        } else {
          script.src = url;
          script.async = true;
        }

        script.onload = () => {
          const globalObj = (window as any)[globalObject];
          if (callbackMethodPath) {
            this.callMethod(globalObj, callbackMethodPath);
          }
          resolve();
        };

        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
      }
    });

    this.loadedScripts.set(url, promise);
    return promise;
  }

private callMethod(obj: any, path: string): void {
  if (!obj || !path) return;

  const keys = path.split('.');
  const methodKey = keys.pop(); // el último es el nombre del método
  const context = keys.reduce((o, key) => o?.[key], obj);
  const method = context?.[methodKey!];

  console.log('Intentando ejecutar método:', path, '=>', method);

  if (typeof method === 'function') {
    method.call(context); // ✅ ejecuta con contexto
  } else {
    console.warn(`Método '${path}' no encontrado o no es función`);
  }
}
}


