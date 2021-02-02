<!-- アイコン：https://materialdesignicons.com/cdn/2.0.46/ -->
<template>
  <v-container fluid>
    <div class="project_header">
      <h3>プロジェクト一覧</h3>
      <v-spacer></v-spacer>
      <v-btn text @click="dialog = !dialog">新規作成<v-icon>add</v-icon></v-btn>
    </div>
    <v-row dense class="mb-6" justify="start">
      <v-col
        v-for="project in projects"
        :key="project.title"
        align-self="stretch"
        cols="2"
      >
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card width="200px" :class="{ 'on-hover': hover }">
            <v-img
              :src="project.image_path!==null?project.image_path:'/images/noimage.png'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="120px"
            ></v-img>

            <v-expand-transition>
              <v-card-title v-if="!hover" v-text="project.title" style="height:80px;"></v-card-title>
              <!-- マウスオーバー時に表示 -->
              <v-card-text v-if="hover" v-text="project.description" style="height:80px;"></v-card-text>
            </v-expand-transition>

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
      :length="projectCount % pageOfCount == 0? projectCount / pageOfCount: Math.floor(projectCount / pageOfCount) + 1"
    >
    </v-pagination>
    <v-dialog v-model="dialog" width="60%">
      <create-project-dialog
        v-on:clickSubmit="onSubmit"
        v-on:clickCancel="onCancel"
        :title="title"
        :description="description"
      ></create-project-dialog>
    </v-dialog>
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
import CreateProjectDialog from "../components/CreateProjectDialog.vue";
import {projectStore} from "../store/project/project";
import {Project} from "../store/project/project.model";

/**
 *
 */
@Component({
  components: {
    CreateProjectDialog,
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
  private get projectCount(): number{
    return projectStore.projectCount;
  }

  /**
   * getter ストアの情報を取得
   * typescript使用時はこのように書かないといけない？
   */
  private get projects(): Array<Project>|null {
    return projectStore.projectList;
  }


  private get isUpdate(): boolean {
    return projectStore.isUpdate;
  }

  /**
   * プロジェクト登録処理
   */
  private onSubmit(obj:Project): void {

    console.log(obj);

    projectStore.addProject({ id:null,title:obj.title, description:obj.description , image_path:""});

    //プロジェクトの一覧を再取得
    projectStore.projectListUpdate();

    this.dialog = false;
  }

/**
 * キャンセル　ダイアログを閉じる。
 */
  private onCancel(): void{
    this.dialog = false;
  }

/**
   * マウント後に呼ばれるメソッド
   */
  public mounted() :void{
    //プロジェクトの一覧データ取得
    projectStore.projectListUpdate();

  }

}
</script>
<style lang="scss">
.project_header {
  display: flex;
}
.v-card__title {
  font-size: 1em;
}
.on-hover {
  box-shadow: 0px 0px 20px white !important;
}
</style>
