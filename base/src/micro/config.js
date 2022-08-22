/**
 * 子应用前缀
 */
export const CHILD_PREFIX = "app";

/**
 * 子应用地址
 */
export const MICRO_APPS = [
  { name: "first-child", url: `http://localhost:3001/` },
  { name: "second-child", url: `http://localhost:3002/` },
];

/**
 * 全局资源
 */
export const GLOBAL_ASSETS = {
  js: [/** "/static/js/echart.js" */],
  css: [],
};
