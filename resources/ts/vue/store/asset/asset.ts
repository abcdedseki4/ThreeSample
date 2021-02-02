import store from '../../store';
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import { Asset } from './asset.model';
import axios from 'axios';


/**
 * アセットのデータストア
 */
@Module({ dynamic: true, store, name: 'asset', namespaced: true })
class AssetModule extends VuexModule {

  /**
   * アセットt追加APIのURL
   */
  private readonly ASSETS_ADD_URL: string = "/assets/add";

  /**
   * アセット削除APIのURL
   */
  private readonly ASSETS_DELETE_URL: string = "/assets/delete";

  /**
   * アセット一覧取得のURL
   */
  private readonly ASSETS_LIST_URL: string = "/assets/list";

  /**
   * アセット
   */
  private asset: Asset | null = null;


  /**
   * アセットのリスト
   */
  public assetList: Array<Asset> | null = Array();


  /**
   * 更新通知
   */
  public isUpdate:boolean = false;


  /**
   * アセットの総数
   */
  public assetCount: number = 0;

  /**
   * getters アセットの取得
   */
  public get getAsset():Asset|null {
    return this.asset;
  }

  /**
   * getters アセットのリスト取得
   */
  public get getAssetList():Array<Asset> |null{
    return this.assetList;
  }

  /**
   * タイトルの更新のmutation
   * @param title
   */
  @Mutation
  private updateFileName(fileName: string):void {
    this.asset!.file_name = fileName;
  }


  /**
   * アセットのリストの更新
   * @param projectObjectList
   */
  @Mutation
  private updateAssetList(projectObjectList: Array<Asset>):void {

    this.assetList! = projectObjectList;
  }


  @Mutation
  private upadteAssetCount(count: number){
    this.assetCount = count;
  }


  /**
   * アセットの追加
   * @param title
   */
  @Action
  public async addAsset(asset: Asset) {

    // this.isUpdate = false;
    try {

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      }

      const data = new FormData();
      data.append("file", asset.file);
      data.append("title", asset.file_name);
      data.append("file_name", asset.file_name);

      // サーバからの応答の形式を渡す
      axios.post(
        this.ASSETS_ADD_URL,
        data,
        config
      )
        .then(res => {
          // this.isUpdate = true;
          // res.data.tokenはstring
          console.debug('asset_add_response : ' + res.data)
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
   * アセットのリスト取得
   */
  @Action
  public async assetListUpdate() {

    try {
      // サーバからの応答の形式を渡す
      axios.get(
        this.ASSETS_LIST_URL
      )
        .then(res => {

          console.log("assetListUpdate");
          console.log(res.data.result_object);

          this.upadteAssetCount( res.data.count as number );
          this.updateAssetList( res.data.result_object as Array<Asset> );
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

export const assetStore = getModule(AssetModule);
