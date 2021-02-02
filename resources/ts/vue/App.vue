<!-- https://reffect.co.jp/vue/vuetify-for-beginner -->
<!-- アイコン：
https://materialdesignicons.com/cdn/2.0.46/
https://jossef.github.io/material-design-icons-iconfont/
-->
<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              操作メニュー
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="navList in navLists" :key="navList.name" :to="navList.to">
            <v-list-item-icon>
              <v-icon>{{ navList.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ navList.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ThreeSample</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>ログイン</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>
              言語(Language)<v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="language in languages" :key="language.name">
				<!--
              <v-list-item-icon>
                <v-icon>{{ language.icon }}</v-icon>
              </v-list-item-icon>
			  -->
              <v-list-item-content>
                <v-list-item-title>{{ language.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
	<v-main>
		<router-view />
    <v-overlay v-show="loading">
      <vue-loading type="spin" color="#fffff3" :size="{ width: '100px', height: '100px' }"></vue-loading>
    </v-overlay>
	</v-main>
    <v-footer dark app>Yuji Seki </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { VueLoading } from 'vue-loading-template'

/**
 *
 */
@Component({
  components: {
    // VueLoading,
  },
})
export default class App extends Vue {
  /**
   * drawerメニューの表示制御
   */
  private drawer: boolean = true;


/**
 * loadingの表示
 */
  private loading: boolean = false;
  /**
   * 言語リスト
   */
  private languages: Array<Object> = [
    { name: "日本語" },
    { name: "English"},
  ];

  private navLists: Array<Object> = [
    { name: "プロジェクト", icon: "workspaces_filled", to:"/projects" },
    { name: "アセット", icon: "upload_file", to:"/assets" },
    { name: "シーン", icon: "3d_rotation", to:"/scene" },
  ];

  /**
   * ライフサイクルフック
   */
  created() {
    // three_init('#scene_app');
  }

  /**
   * ライフサイクルフック
   */
  mounted() {}

  /**
   * ライフサイクルフック
   */
  updated() {}

  /**
   * ライフサイクルフック
   */
  destroyed() {}
}
</script>

<style lang="scss">
.v-application {
  font-family: "M Plus 1p" !important;
}
</style>


