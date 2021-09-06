import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import Layout from '@/layout';

export const Routes = [
    {
        path: '/',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '',
                redirect: 'dashboard'
            },
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index')
            },
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页', affix: true }
            },
            {
                path: 'forntend',
                meta: { title: '前端' },
                component: () => import('@/views/forntend/index'),
                name: 'ForntendIndex',
                children: [
                    {
                        path: '', redirect: 'markdown'
                    },
                    {
                        path: 'markdown',
                        component: () => import('@/views/forntend/markdown/index'),
                        name: 'MarkdownIndex',
                        meta: { title: 'markdown' },
                        children: [
                            { path: '', redirect: '' },
                            {
                                path: 'doocsmd',
                                component: () => import('@/views/forntend/markdown/doocsmd/index'),
                                name: 'DoocsmdIndex',
                                meta: { title: 'doocsmd' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/markdown/doocsmd/list'),
                                        name: 'DoocsmdList',
                                        meta: { title: 'doocsmd' }
                                    }
                                ]
                            },
                            {
                                path: 'stackedit',
                                component: () => import('@/views/forntend/markdown/stackedit/index'),
                                name: 'StackeditIndex',
                                meta: { title: 'stackedit' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/markdown/stackedit/list'),
                                        name: 'StackeditList',
                                        meta: { title: 'stackedit' }
                                    }
                                ]
                            },
                            {
                                path: 'mavonEditor',
                                component: () => import('@/views/forntend/markdown/mavonEditor/index'),
                                name: 'MavonEditorIndex',
                                meta: { title: 'mavonEditor' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/markdown/mavonEditor/list'),
                                        name: 'MavonEditorList',
                                        meta: { title: 'mavonEditor' }
                                    }
                                ]
                            },
                            {
                                path: 'mavonEditorTwo',
                                component: () => import('@/views/forntend/markdown/mavonEditorTwo/index'),
                                name: 'MavonEditorTwoIndex',
                                meta: { title: 'mavonEditorTwo' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/markdown/mavonEditorTwo/list'),
                                        name: 'MavonEditorTwoList',
                                        meta: { title: 'mavonEditorTwo' }
                                    }
                                ]
                            },
                            {
                                path: 'marked',
                                component: () => import('@/views/forntend/markdown/marked/index'),
                                name: 'MarkedIndex',
                                meta: { title: 'marked' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/markdown/marked/list'),
                                        name: 'MarkedList',
                                        meta: { title: 'marked' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
]


const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: Routes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
