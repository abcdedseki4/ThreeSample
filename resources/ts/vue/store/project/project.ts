import store from '../../store';
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import { Project } from './project.model';
import axios from 'axios';

@Module({ dynamic: true, store, name: 'project', namespaced: true })

/**
 * プロジェクトのデータストア
 */
class ProjectModule extends VuexModule {

  /**
   * プロジェクト追加APIのURL
   */
  private readonly PROJECTS_ADD_URL: string = "/projects/add";

  /**
   * プロジェクト削除APIのURL
   */
  private readonly PROJECTS_DELETE_URL: string = "/projects/delete";

  /**
   * プロジェクト一覧取得のURL
   */
  private readonly PROJECTS_LIST_URL: string = "/projects/list";

  /**
   * プロジェクト
   */
  private project: Project | null = null;


  /**
   * プロジェクトのリスト
   */
  public projectList: Array<Project> | null = Array();


  /**
   * 更新通知
   */
  public isUpdate:boolean = false;


  /**
   * プロジェクトの総数
   */
  public projectCount: number = 0;

  /**
   * getters プロジェクトの取得
   */
  public get getProject():Project|null {
    return this.project;
  }

  /**
   * getters プロジェクトのリスト取得
   */
  public get getProjectList():Array<Project> |null{
    return this.projectList;
  }

  /**
   * タイトルの更新のmutation
   * @param title
   */
  @Mutation
  private updateTitle(title: string):void {
    this.project!.title = title;
  }

  /**
   * 概要の更新のmutation
   * @param description
   */
  @Mutation
  private updateDescription(description: string):void {
    this.project!.description = description;
  }

  /**
   * 画像パスの更新のmutation
   * @param path
   */
  @Mutation
  private updateImagePath(path: string):void {
    this.project!.image_path = path;
  }

  @Mutation
  private upadteProjectCount(count: number):void {
    this.projectCount! = count;
  }


  @Mutation
  private updateProjectList(projectObjectList: Array<Project>):void {

    this.projectList! = projectObjectList;
  }


  /**
   *
   * @param title
   */
  @Action
  public async addProject(project: Project) {

    // this.isUpdate = false;
    try {
      // サーバからの応答の形式を渡す
      axios.post(
        this.PROJECTS_ADD_URL,
        {
          title: project.title,
          description: project.description
        },
      )
        .then(res => {
          // this.isUpdate = true;
          // res.data.tokenはstring
          console.debug('project_add_response : ' + res.data)
        })
        // エラー応答の構造を明示する
        .catch((e) => {
          if (e.response !== undefined) {
            // e.response.dataはanyになる
            console.error(e.response.data.error)
          }
        })
    } finally {

    }
  }

  /**
   * プロジェクトのリスト取得
   */
  @Action
  public async projectListUpdate() {

    try {
      // サーバからの応答の形式を渡す
      axios.get(
        this.PROJECTS_LIST_URL
      )
        .then(res => {

          console.log(res.data.result_object);

          this.upadteProjectCount( res.data.count as number );
          this.updateProjectList( res.data.result_object as Array<Project> );
          // res.data.tokenはstring
        })
        // エラー応答の構造を明示する
        .catch((e) => {
          if (e.response !== undefined) {
            // e.response.dataはanyになる
            console.error(e.response.data.error)
          }
        })
    } finally {

    }
  }


}

export const projectStore = getModule(ProjectModule);
