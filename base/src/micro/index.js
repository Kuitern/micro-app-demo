import microApp from "@micro-zoe/micro-app";
import * as config from "./config";

/**启用 micro */
microApp.start({
  preFetchApps: config.MICRO_APPS, // 预加载
  globalAssets: config.GLOBAL_ASSETS,  // 全局共享资源
});

