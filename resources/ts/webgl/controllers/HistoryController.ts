import * as THREE from 'three';
import { ReinhardToneMapping } from 'three';
import { ThreeSampleScene } from '../lib/ThreeSampleScene';


/**
 *
 */
export default class HistoryController {


	/**
	 * Singleton
	 */
	private static instance: HistoryController;

	/**
	 * Historyの配列
	 */
  private historyList: Array<THREE.Scene>;



  /**
   * いくつ前に戻るか
   */
  private historyIndex: number = 1;


	/**
	 * コンストラクタ
	 */
	private constructor() {
		this.historyList = new Array<THREE.Scene>();
	}

	/**
	 * Singleton
	 */
	public static getInstance(): HistoryController {
		if (!HistoryController.instance) {
			HistoryController.instance = new HistoryController();
		}
		return HistoryController.instance;
	}

	/**
	 *
	 * @param scene
	 */
	public addHistory(scene: THREE.Scene): void {

    console.log("HistoryController addHistory");

    console.log( this.historyIndex );
    console.log( scene );

    console.log(this.historyList);

    //戻している途中状態などで、追加した時はそこまでの状態でクリアしたあと、追加。
    // if( this.historyIndex > 1 ){
    //   //HistoryListの末尾から、インデックス数分削除
    //   for(let i=1; i<this.historyList.length; i++){
    //     this.historyList.pop();
    //     console.log("pop");
    //   }
    //   this.historyIndex = 1;
    //   console.log(this.historyList);
    // }

    this.historyList.push( scene.clone( true ) );

    console.log("push");
    console.log(this.historyList);

    console.log( "historyList.length=" + this.historyList.length );

	}

	/**
	 * 前に戻る
	 */
	public bofore(): void {

    console.log("HistoryController before");
    //最後のSceneを取得

    let scene: THREE.Scene | undefined;

    console.log( "historyList.length=" + this.historyList.length );

    if( this.historyList.length > this.historyIndex ){
      this.historyIndex++;
      console.log( this.historyIndex );
      scene = this.historyList[ this.historyList.length - this.historyIndex  ];
    }

    console.log( scene );

		if (!(scene == undefined)) {
			ThreeSampleScene.getInstance().canvas.scene = scene;
		}
	}

	/**
	 * 次へ進む
	 */
	public after(): void {

    console.log("HistoryController after");

    console.log( this.historyIndex );

    let scene: THREE.Scene | undefined;

    console.log( "historyList.length=" + this.historyList.length );

    if( this.historyIndex > 1 ){
      this.historyIndex--;
      scene = this.historyList[ this.historyList.length - this.historyIndex ];
    }

    console.log( scene );

		if (!(scene == undefined)) {
			ThreeSampleScene.getInstance().canvas.scene = scene;
		}
	}


}
