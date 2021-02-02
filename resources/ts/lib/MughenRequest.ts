import axios, { AxiosError } from 'axios';
import { Project } from '../vue/store/project/project.model';



/**
 * リクエストのクラス
 */
export default class ThreeSampleRequest {

  public static readonly BASE_URL: string = "";

  public static readonly PROJECTS_ADD_URL: string = "/projects/add";

  public static readonly PROJECTS_DELETE_URL: string = "/projects/delete";

  public static readonly PROJECTS_LIST_URL: string = "/projects/list";

  public static readonly ASSETS_ADD_URL: string = "/assets/add";

  public static readonly ASSETS_DELETE_URL: string = "/assets/delete";

  public static readonly ASSETS_LIST_URL: string = "/assets/list";

  /**
   * プロジェクト追加
   *
   * @param Project
   * @param Function
   */
  public static async addProjects(project: Project, resFunction: Function) {

    // サーバからの応答の形式を渡す
    axios.post(
      this.PROJECTS_ADD_URL,
      project,
    )
      .then(res => {
        resFunction(res);
        // res.data.tokenはstring
        console.info('token: ' + res.data)
      })
      // エラー応答の構造を明示する
      .catch((e: AxiosError) => {
        if (e.response !== undefined) {
          // e.response.dataはanyになる
          console.error(e.response.data.error)
        }
      })
  }
}
