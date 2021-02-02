/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

// vueの起動ファイルの読み込み
import vue_init from './vue/vue_init';

// three.jsの初期化
import * as ThreeSample from './webgl/lib/ThreeSampleScene';

vue_init('#app');

ThreeSample.ThreeSampleScene.getInstance().init();





