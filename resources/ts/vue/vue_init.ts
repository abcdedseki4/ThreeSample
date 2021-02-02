//VueとVuexの読み込み
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import vuetify from './plugins/vuetify' // path to vuetify export


/**
 * vue.jsの初期化処理を実施
 */
export default function( domId:string ){

	new Vue({
		vuetify,
		router,
		store,
		render: (h) => h(App),
	  }).$mount(domId);

}


