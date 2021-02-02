import Vue, { VNode } from 'vue';
//vue-cliで作成されたファイル。JSXを扱うために必要と思われる。
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
