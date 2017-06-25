import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'
// import 'antd/dist/antd.css';
// import './index.css';

// 1. Initialize
const { app, router, store } = createApp()

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
// app.router(require('./router'));

// 5. Start actually mount to DOM
app.$mount('#root')

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
