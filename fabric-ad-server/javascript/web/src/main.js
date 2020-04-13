import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'swiper/css/swiper.css'
// import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
// import './base.scss';
// const components = {
//     Swiper,SwiperSlide
// }
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    // components,
    router,
    store,
    render: h => h(App)
}).$mount("#app");

