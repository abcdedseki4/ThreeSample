import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/projects',
		name: 'Projects',
		component: () => import('../views/Projects.vue'),
	},
	{
		path: '/assets',
		name: 'Assets',
		component: () => import('../views/Assets.vue'),
	},
	{
		path: '/scene',
		name: 'Scene',
		component: () => import('../views/Scene.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
