import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EcommerceWebsite';

  loadAPI: Promise<any>;

  constructor() {        
      this.loadAPI = new Promise((resolve) => {
          this.loadScript();
          resolve(true);
      });
  }

  public loadScript() {        
      var isFound = false;
      var scripts = document.getElementsByTagName("script")
      for (var i = 0; i < scripts.length; ++i) {
          if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
              isFound = true;
          }
      }

      if (!isFound) {
          var dynamicScripts = [
            "../assets/js/vendor/modernizr-2.8.3.min.js",
            "../assets/js/vendor/jquery.min.js",
            "../assets/js/popper.min.js",
            "../assets/js/bootstrap.min.js",
            "../assets/js/plugins.js",
            "../assets/js/main.js"
          ];

          for (var i = 0; i < dynamicScripts.length; i++) {
              let node = document.createElement('script');
              node.src = dynamicScripts [i];
              node.type = 'text/javascript';
              node.async = false;
              node.charset = 'utf-8';
              document.getElementsByTagName('head')[0].appendChild(node);
          }

      }
  }
}
