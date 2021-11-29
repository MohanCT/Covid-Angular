import { Injectable, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
interface Scripts {
  name: string;
  src: string;
  type : string
}
export const ScriptStore: Scripts[] = [
  { name: 'Jvectorjs', src: 'assets/js/jquery-jvectormap-2.0.5.min.js', type: 'javascript' },
  { name: 'dtmin', src: 'assets/covid/assets/js/datatables.min.js', type: 'javascript' },
  { name: 'dtreorder', src: 'assets/js/dataTables.rowReorder.min.js', type: 'javascript' },
  { name: 'dteresponsive', src: 'assets/js/dataTables.responsive.min.js', type: 'javascript' },
  { name: 'World', src: 'assets/js/jquery-jvectormap-world-mill.js', type: 'javascript' },
  { name: 'dtmincss', src: 'assets/covid/assets/css/datatables.min.css', type: 'css' },
  { name: 'jqdtmincss', src: 'assets/css/jquery.dataTables.min.css', type: 'css' },
  { name: 'dtreordercss', src: 'assets/css/rowReorder.dataTables.min.css', type: 'css' },
  { name: 'dteresponsivecss', src: 'assets/css/responsive.dataTables.min.css', type: 'css' },
  { name: 'Jvectorjscss', src: 'assets/css/jquery-jvectormap-2.0.5.css', type: 'css' },
  { name: 'India', src: 'assets/js/India.js', type: 'javascript' },
  { name: 'US', src: 'assets/js/US.js', type: 'javascript' },
  { name: 'Australia', src: 'assets/js/Australia.js', type: 'javascript' },
  { name: 'Canada', src: 'assets/js/Canada.js', type: 'javascript' },
  { name: 'China', src: 'assets/js/China.js', type: 'javascript' },
  { name: 'Colombia', src: 'assets/js/Colombia.js', type: 'javascript' },
  { name: 'Germany', src: 'assets/js/Germany.js', type: 'javascript' },
  { name: 'Italy', src: 'assets/js/Italy.js', type: 'javascript' }
];
@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private scripts: any = {};
  constructor(@Inject(DOCUMENT) private dom : any) {
    ScriptStore.forEach((script: any) => {
      let element = "";
        let srcType = "";
        if(script.type === "javascript"){
          element = "script";
          srcType = "src";
        } else {
          element = "link";
          srcType = "href";
        }
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
        type: script.type,
        element: element,
        srcType: srcType

      };
    });
  }
  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script = document.createElement(this.scripts[name].element);
        script.type = 'text/'+this.scripts[name].type;
        script[this.scripts[name].srcType] = this.scripts[name].src;
        script.rel="stylesheet";
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }


  // loadScript(name: string) {
  //   return new Promise((resolve, reject) => {
  //     // resolve if already loaded
  //     if (this.scripts[name].loaded) {
  //       resolve({ script: name, loaded: true, status: 'Already Loaded' });
  //     } else {
  //       // load script
  //       const script = document.createElement('script');
  //       script.type = 'text/javascript';
  //       script.src = this.scripts[name].src;
  //       script.onload = () => {
  //         this.scripts[name].loaded = true;
  //         resolve({ script: name, loaded: true, status: 'Loaded' });
  //       };
  //       script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
  //       document.getElementsByTagName('head')[0].appendChild(script);
  //     }
  //   });
  // }

  createCanonicalURL(url?:string) {
    let canURL = url == undefined ? this.dom.URL : url;
    let canLink = this.dom.querySelector("link[rel='canonical']");
    if(canLink){
      canLink.setAttribute('href', canURL);
    } else {
      let link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
      link.setAttribute('href', canURL);
    }
  }

  createMetaTag(name:any,content:any){

    let metaLink = this.dom.querySelector("meta[name='"+name+"']");
    if(metaLink){
      metaLink.setAttribute('content', content);
    } else {
      let link: HTMLLinkElement = this.dom.createElement('meta');
      link.setAttribute('name', name);
      this.dom.head.appendChild(link);
      link.setAttribute('content', content);
    }

    return this.dom.querySelector("meta[name='"+name+"']").getAttribute('content');
 }



}