const app = require('./app/main')
const analytics = require("electron-analytics");
analytics.init("rJee5mSnlb");
global.analytics = analytics;

app.start();
