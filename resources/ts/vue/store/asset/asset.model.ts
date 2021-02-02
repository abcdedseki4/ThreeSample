
/**
 * アセット
 */
export interface Asset{

  /**
   * アセットID
   */
  id:number|null;

  /**
   * ファイルタイトル
   */
  title:string;

	/**
	 * プロジェクト概要
	 */
  file_name:string;


  /**
   * アップロードファイル
   */
  file:File;


}
