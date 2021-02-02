import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

//material design icon https://materialdesignicons.com/cdn/2.0.46/
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

//material-design-icons-iconfont https://jossef.github.io/material-design-icons-iconfont/
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);


export default new Vuetify({
	theme: { dark:true },
	icons: {
		iconfont: 'mdi',
	}
});
