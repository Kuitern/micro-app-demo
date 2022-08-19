module.exports = {
  devServer: {
    host: "localhost",
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*", /**设置本地运行的跨域 */
    },
  },
};
