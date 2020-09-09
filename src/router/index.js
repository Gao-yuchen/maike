import Vue from 'vue';
import Router from 'vue-router';
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import( '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import('../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/administrators',
                    component: () => import('../components/page/Ddministrators.vue'),
                    meta: { title: '管理员用户' }
                },
                {
                    path: '/users',
                    component: () => import('../components/page/OrdinaryUsers.vue'),
                    meta: { title: '普通用户' }
                },
                {
                    path: '/systemSetup',
                    component: () => import('../components/page/systemSetup2.vue'),
                    meta: { title: '系统设置' }
                },
                {
                    path: '/Thegatewayconfiguration',
                    component: () => import('../components/page/Thegatewayconfiguration.vue'),
                    meta: { title: '网关配置' }
                },
                {
                    path: '/EquipmentNetworking',
                    component: () => import('../components/page/EquipmentNetworking.vue'),
                    meta: { title: '设备组网' }
                },

                {
                    path: '/table/:id/:name',
                    component: () => import( '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import('../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import( '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import( '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import( '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import('../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import('../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import( '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import('../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import('../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import( '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import( '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
