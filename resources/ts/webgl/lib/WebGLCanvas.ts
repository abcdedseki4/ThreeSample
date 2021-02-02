import * as THREE from 'three';

/**
 * three.jsのキャンバスを生成
 */
export default class WebGLCanvas {


	/**
	 * @var 横幅
	 */
	public width: number;

	/**
	 * 高さ
	 */
	public height: number;

	/**
	 * レンダラー
	 */
	public renderer: THREE.WebGL1Renderer;

	/**
	 * カメラ
	 */
	public camera: THREE.PerspectiveCamera;

	/**
	 * シーン
	 */
	public scene: THREE.Scene;

	/**
	 * ライト
	 */
	public light: THREE.PointLight;

	/**
	 * コンストラクタ
	 * @param int width 表示させるキャンバスの幅
	 * @param int height 表示させるキャンバスの高さ
	 */
	constructor(width: number, height: number) {

		this.width = width;
		this.height = height;

		// レンダラーを作成
		this.renderer = new THREE.WebGL1Renderer();
		this.renderer.setSize(this.width, this.height);// 描画サイズ
		this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比

		// // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
		this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 2000);
		this.camera.position.set(8, 10, 8);
		this.camera.lookAt(0, 3, 0);

		// シーンを作成
		this.scene = new THREE.Scene();

		// ライトを作成
		this.light = new THREE.PointLight(0x00ffff);
		this.light.position.set(2, 2, 2);// ライトの位置を設定

		// ライトをシーンに追加
		this.scene.add(this.light);

		const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
		directionalLight.position.set(1, 1, 0).normalize();
		this.scene.add(directionalLight);

		//グリッドの生成
		const grid = new THREE.GridHelper(100, 100);
		this.scene.add(grid);
	}


}


