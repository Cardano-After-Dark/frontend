const { createProxyMiddleware } = require('http-proxy-middleware');

const expressMiddleWare = (router) => {
  router.use('/_next/image', createProxyMiddleware({ target: 'http://localhost:4200', changeOrigin: true }));
};

module.exports = expressMiddleWare;