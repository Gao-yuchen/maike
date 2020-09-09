import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI, { TabPane } from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import VueBus from 'vue-bus';

Vue.use(VueBus);

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 智能楼宇后台管理系统`;
    const role = localStorage.getItem('token');
    
        if (role) {
                 //如果用户信息存在则往下执行。
                 next()
             } else {
                 //如果用户token不存在则跳转到login页面
                 if (to.path === '/login') {
                    
                    next()
                } else {
                    
                    next('/login')
                }
            } 
    
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');


