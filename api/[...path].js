// Vercel serverless entry point. Catches every /api/* request and hands it
// to the Express app defined in /server/index.js. Vercel treats files under
// /api as serverless functions automatically (zero-config), and the original
// request path (e.g. /api/create-payment-intent) is preserved in req.url, so
// the Express routes match unchanged.
module.exports = require('../server/index.js');
