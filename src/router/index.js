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
                    },
                    {
                        path: 'pdf',
                        component: () => import('@/views/forntend/pdf/index'),
                        name: 'PdfIndex',
                        meta: { title: 'pdf' },
                        children: [
                            { path: '', redirect: '' },
                            {
                                path: 'iframe',
                                component: () => import('@/views/forntend/pdf/iframe/index'),
                                name: 'IframeIndex',
                                meta: { title: 'iframe' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/pdf/iframe/list'),
                                        name: 'IframeList',
                                        meta: { title: 'iframe' }
                                    }
                                ]
                            },
                            {
                                path: 'pdfjs',
                                component: () => import('@/views/forntend/pdf/pdfjs/index'),
                                name: 'PdfjsIndex',
                                meta: { title: 'pdfjs' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/pdf/pdfjs/list'),
                                        name: 'PdfjsList',
                                        meta: { title: 'pdfjs' }
                                    }
                                ]
                            },
                            {
                                path: 'lodop',
                                component: () => import('@/views/forntend/pdf/lodop/index'),
                                name: 'LodopIndex',
                                meta: { title: 'lodop' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/forntend/pdf/lodop/list'),
                                        name: 'LodopList',
                                        meta: { title: 'lodop' }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'tools',
                meta: { title: '工具' },
                component: () => import('@/views/tools/index'),
                name: 'ToolsIndex',
                children: [
                    {
                        path: '', redirect: 'base64Transform'
                    },
                    {
                        path: 'base64Transform',
                        component: () => import('@/views/tools/base64Transform/index'),
                        name: 'Base64TransformIndex',
                        meta: { title: 'base64Transform' },
                        children: [
                            { path: '', redirect: '' },
                            {
                                path: 'fileToBase64',
                                component: () => import('@/views/tools/base64Transform/fileToBase64/index'),
                                name: 'FileToBase64Index',
                                meta: { title: 'fileToBase64' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/tools/base64Transform/fileToBase64/list'),
                                        name: 'FileToBase64List',
                                        meta: { title: 'fileToBase64' }
                                    }
                                ]
                            },
                            {
                                path: 'base64ToFile',
                                component: () => import('@/views/tools/base64Transform/base64ToFile/index'),
                                name: 'Base64ToFileIndex',
                                meta: { title: 'base64ToFile' },
                                children: [
                                    { path: '', redirect: 'list' },
                                    {
                                        path: 'list',
                                        component: () => import('@/views/tools/base64Transform/base64ToFile/list'),
                                        name: 'Base64ToFileList',
                                        meta: { title: 'base64ToFile' }
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
