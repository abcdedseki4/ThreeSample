<!-- アイコン：https://materialdesignicons.com/cdn/2.0.46/ -->
<template>
  <v-container fluid>
    <div class="asset_header">
      <h3>アセット一覧</h3>
      <v-spacer></v-spacer>
      <!-- <v-btn text @click="dialog = !dialog">アップロード<v-icon>add</v-icon></v-btn> -->
    </div>
    <v-row dense class="mb-6" justify="start">
      <v-col
        v-for="asset in assets"
        :key="asset.title"
        align-self="stretch"
        cols="2"
      >
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card width="200px" :class="{ 'on-hover': hover }">
            <v-img
              :src="asset.file_name"
              height="80px"
            ></v-img>
              <v-card-title v-text="asset.title"></v-card-title>
            <!-- マウスオーバー時に表示 -->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>delete_forever</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!-- ページングの設定。総数から割り切れない数の時は整数に切り捨てして＋１する。 -->
    <v-pagination
      v-model="page"
      :length="
        assetCount % pageOfCount == 0
          ? assetCount / pageOfCount
          : Math.floor(assetCount / pageOfCount) + 1
      "
    >
    </v-pagination>
    <!-- <v-dialog v-model="dialog" width="60%"> -->
      <file-drop
       v-on:files-selected="uploadFiles"
      ></file-drop>
    <!-- </v-dialog> -->
    <!-- 通知用のコンポーネント -->
    <v-snackbar
      v-model="isUpdate"
      timeout="200"
    >
      更新しました。
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="isUpdate = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator";
import FileDrop from "../components/FileDrop.vue";
import {assetStore} from "../store/asset/asset";
import {Asset} from "../store/asset/asset.model";

/**
 *
 */
@Component({
  components: {
    FileDrop,
  },
})
export default class Projects extends Vue {

  /**
   * ダイアログの表示
   */
  private dialog: boolean = false;

  /**
   * 現在のページ番号
   * pagenationで更新される
   */
  private page: number = 1;

  /**
   * 1ページの数
   */
  private pageOfCount: number = 12;

  /**
   * プロジェクト名
   */
  private title: string = "";
  /**
   * プロジェクト概要
   */
  private description: string = "";


  /**
   * getter ストアの情報を取得
   * typescript使用時はこのように書かないといけない？
   */
  private get assetCount(): number{
    return assetStore.assetCount;
  }

  /**
   * getter ストアの情報を取得
   * typescript使用時はこのように書かないといけない？
   */
  private get assets(): Array<Asset>|null {
    return assetStore.assetList;
  }

  /**
   * 更新処理
   */
  private get isUpdate(): boolean {
    return assetStore.isUpdate;
  }


/**
   * マウント後に呼ばれるメソッド
   */
  public mounted() :void{
    //プロジェクトの一覧データ取得
    assetStore.assetListUpdate();

  }

  /**
   * ファイルアップロード
   */
  uploadFiles(fileList: FileList) {
    for( let i = 0; i < fileList.length; i++){
      const file:File|null = fileList.item(i);

      console.log("file:");
      console.log(fileList);

      if( file !== null ){
        const asset:Asset = {
          'title': file.name,
          'file_name':file.name,
          'id': null,
          'file':file
        };
        assetStore.addAsset(asset);
      }
    }

  }


}
</script>
<style lang="scss">
.asset_header {
  display: flex;
}
.v-card__title {
  font-size: 1em;
}
.on-hover {
  box-shadow: 0px 0px 20px white !important;
}
</style>
