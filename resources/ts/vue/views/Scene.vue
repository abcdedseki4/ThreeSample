<!-- アイコン：
https://materialdesignicons.com/cdn/2.0.46/
https://jossef.github.io/material-design-icons-iconfont/
-->
<template>
  <div>
    <!-- three.jsの表示領域 -->
    <div id="scene_app"></div>
    <!-- 右メニュー -->
    <v-navigation-drawer right absolute mini-variant>
      <v-list dense nav>
        <v-list-item-icon>

              <!-- mandatory は一番最初の要素を選択中にする -->
              <v-btn-toggle mandatory>
                 <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn text small @click="enableObjectControll()" v-on="on">
                      <v-icon>mdi-cursor-move</v-icon>
                    </v-btn>
                  </template>
                  <span>
                    移動
                  </span>
                 </v-tooltip>
                 <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn text small @click="enableOrbit()" v-on="on">
                      <v-icon>360</v-icon>
                    </v-btn>
                　</template>
                  <span>
                    回転
                  </span>
                 </v-tooltip>
              </v-btn-toggle>
          </v-tooltip>
        </v-list-item-icon>
      </v-list>
    </v-navigation-drawer>
    <!-- ボトムナビゲーション -->
    <v-bottom-navigation absolute>
      <v-tooltip top v-for="menu in bottomMenus" :key="menu.title">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="menu.click" v-bind="attrs" v-on="on">
            <span>{{ menu.title }}</span>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ menu.tooltip }}</span>
      </v-tooltip>

      <v-bottom-sheet inset v-model="isSheet">
        <!-- assetなどは定数にしたが、テンプレート内での読み込み方が分からないのでベタがき。。-->
        <v-sheet v-if="bottomSheetType === 'asset'" height="200px">
          <div class="my-3">アセット</div>
        </v-sheet>
        <v-sheet v-if="bottomSheetType === 'object'" height="200px">
          <v-row dense class="mb-6" justify="start">
            <v-col
              align-self="stretch"
              cols="2"
              v-for="object in objects"
              :key="object.title"
            >
                <v-card width="200px">
                  <v-img
                    :src="object.image"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="120px"
                  ></v-img>
                </v-card>
            </v-col>
          </v-row>
        </v-sheet>
        <v-sheet v-if="bottomSheetType === 'lighting'" height="200px">
          <div class="my-3">ライティング</div>
        </v-sheet>
        <v-sheet v-if="bottomSheetType === 'text'" height="200px">
          <div class="my-3">テキスト</div>
        </v-sheet>
        <v-sheet v-if="bottomSheetType === 'material'" height="200px">
          <div class="my-3">マテリアル</div>
        </v-sheet>
      </v-bottom-sheet>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator";
import VueRouter from "vue-router";
// three.jsの起動ファイルの読み込み
import * as ThreeSample from "../../webgl/lib/ThreeSampleScene";
// import Buefy from "buefy";
// import "buefy/dist/buefy.css";
import HistoryController from "../../webgl/controllers/HistoryController";

// beforeRouteEnterを使用するには、TypeScriptではHook しないと使えない
Component.registerHooks(["beforeRouteEnter"]);

@Component
export default class Scene extends Vue {
  /**
   * ボトムシートの表示
   */
  public isSheet: boolean = false;

  /**
   * ボトムシートの表示タイプ
   */
  public bottomSheetType: string = "";

  /** 表示のタイプ設定 アセット*/
  public static readonly BOTTOM_SHEET_TYPE_ASSET: string = "asset";
  /** 表示のタイプ設定 オブジェクト*/
  public static readonly BOTTOM_SHEET_TYPE_OBJECT: string = "object";
  /** 表示のタイプ設定 ライト*/
  public static readonly BOTTOM_SHEET_TYPE_LIGHTING: string = "lighting";
  /** 表示のタイプ設定 テキスト*/
  public static readonly BOTTOM_SHEET_TYPE_TEXT: string = "text";
  /** 表示のタイプ設定 マテリアル*/
  public static readonly BOTTOM_SHEET_TYPE_MATERIAL: string = "material";

  //XR表示のセッション
  private currentSession = null;

  private objects: Array<Object> = [
    {
      title: "正方形",
      image: "/images/noimage.png",
    },
    {
      title: "三角",
      image: "/images/noimage.png",
    },
    {
      title: "球体",
      image: "/images/noimage.png",
    },
  ];

  /**
   * 右側用メニュー設定
   */
  private rightMenus: Array<Object> = [
    {
      title:"",
      tooltip:"",
      icon:"",
      click: () => {

      },
    }
  ]

  /**
   * 下メニュー用の設定
   */
  private bottomMenus: Array<Object> = [
    {
      title: "アセット",
      icon: "upload_file",
      tooltip: "アセットの追加ダイアログの表示",
      click: () => {
        //メソッドを通さないと変更が検知されない？？ため、メソッドを通して設定
        this.setSheetShow(!this.isSheet, Scene.BOTTOM_SHEET_TYPE_ASSET);

        this.addFbxSample();
      },
    },
    {
      title: "オブジェクト",
      icon: "crop_square",
      tooltip: "オブジェクトの挿入",
      click: () => {
        this.setSheetShow(!this.isSheet, Scene.BOTTOM_SHEET_TYPE_OBJECT);

        this.addObject();
      },
    },
    {
      title: "ライティング",
      icon: "lightbulb",
      tooltip: "ライティング設定",
      click: () => {
        this.setSheetShow(!this.isSheet, Scene.BOTTOM_SHEET_TYPE_LIGHTING);
      },
    },
    {
      title: "テキスト",
      icon: "text_fields",
      tooltip: "テキストの追加",
      click: () => {
        this.setSheetShow(!this.isSheet, Scene.BOTTOM_SHEET_TYPE_TEXT);
      },
    },
    {
      title: "マテリアル",
      icon: "mdi-palette",
      tooltip: "マテリアル",
      click: () => {
        this.setSheetShow(!this.isSheet, Scene.BOTTOM_SHEET_TYPE_MATERIAL);
      },
    },
    {
      title: "戻る",
      icon: "undo",
      tooltip: "前の状態へ戻る",
      click: () => {
        HistoryController.getInstance().bofore();
      },
    },
    {
      title: "進む",
      icon: "redo",
      tooltip: "次の状態へ進む",
      click: () => {
        HistoryController.getInstance().after();
      },
    },
  ];

  /**
   * カメラ操作の有効、無効
   */
  private isOrbit: boolean = false;

  /**
   * カメラのコントロールの切り替え
   */
  public enableOrbit(): void {
    ThreeSample.ThreeSampleScene.getInstance().orbitControllsSetEnabled(true);
    //BuefyのNotificationサンプル
    //   this.$buefy.notification.open("カメラ操作に切り替えました。");
    this.isOrbit = true;
  }

  /**
   * ボトムシートの表示有無の値を変更
   */
  public setSheetShow(value: boolean, type: string) {
    this.bottomSheetType = type;
    this.isSheet = value;
  }

  /**
   * カメラのコントロールの切り替え
   */
  public enableObjectControll(): void {
    ThreeSample.ThreeSampleScene.getInstance().orbitControllsSetEnabled(false);
    //BuefyのNotificationサンプル
    //   this.$buefy.notification.open("オブジェクト操作に切り替えました。");
    this.isOrbit = false;
  }

  /**
   *　オブジェクト追加
   *  移動してからでないと追加できない。
   */
  public addObject(): void {
    ThreeSample.ThreeSampleScene.getInstance().addObject();
  }


  /**
   * FBXのサンプル挿入
   */
  public addFbxSample(): void{
    ThreeSample.ThreeSampleScene.getInstance().addFBXSample();
  }

  /**
   * 保存処理
   */
  public save(): void {
    const saveObject: string = ThreeSample.ThreeSampleScene.getInstance().export2Json();
    console.log(saveObject);

    const element: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.getElementById("console")
    );
    element.value = JSON.stringify(saveObject);
  }

  /**
   * 読み込み処理
   */
  public load(): void {
    const saveObject: string = ThreeSample.ThreeSampleScene.getInstance().export2Json();
    console.log(saveObject);

    const element: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.getElementById("console")
    );
    element.value = JSON.stringify(saveObject);
  }


  /**
   * マウント後に呼ばれるメソッド
   */
  public mounted() {
    const dom: Element | null = document.querySelector("#scene_app");

    if (dom != null) {
      dom.appendChild(
        ThreeSample.ThreeSampleScene.getInstance().getRenderer().domElement
      );
    } else {
      console.log("webgl 初期化エラー：対象のDOM要素がありません。");
    }

    // //VRボタンの表示
    // const vrButton: HTMLElement = ThreeSample.ThreeSampleScene.getInstance().createVrButton();
    // //ARボタンの表示
    // const arButton: HTMLElement = ThreeSample.ThreeSampleScene.getInstance().createArButton();

    // if (dom !== null) {
    //   dom.appendChild(vrButton);
    //   dom.appendChild(arButton);
    // }

  }

  /**
   * このルートに入る前に実行されるメソッド
   */
  public beforeRouteEnter(to: VueRouter, from: VueRouter, next: any) {
    // このルートに入る前に実行したい処理があればここに記述。

    next();
  }
}
</script>

<style lang="scss">
.v-btn-toggle {
  flex-direction: column;
}

#ARButton {
  left: calc(50% - 150px) !important;
}

#VRButton {
  left: calc(50% + 50px) !important;
}
</style>
