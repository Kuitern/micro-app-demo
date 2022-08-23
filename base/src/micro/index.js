import microApp from "@micro-zoe/micro-app";
import * as config from "./config";

/**启用 micro */
microApp.start({
  preFetchApps: config.MICRO_APPS, // 预加载
  globalAssets: config.GLOBAL_ASSETS,  // 全局共享资源

  // 插件系统
  plugins: {
    modules: {
      global: [{
        escapeProperties: ['abc'],
        loader(code, url) {
          alert(121231)
          console.log('url:',url)
          // if (url === 'index.js') {
            code = code.replace('var abc =', 'window.abc =')
          // }
          return code
        }
      }]
    }
  }
});

