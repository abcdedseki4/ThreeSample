import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';


import DragObjectController from '../controllers/DragObjectController';
import WebGLCanvas from './WebGLCanvas';
import HistoryController from '../controllers/HistoryController';

import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// const FBXLoader = require('three-fbx-loader');

// import { WebGLRenderer } from 'three';
// import { ARUtils, ARPerspectiveCamera, ARView } from 'ar.js';



/**
 * window.sceneを定義するための宣言
 */
interface Window {
  scene: THREE.Scene;
  THREE: Object;
  devicePixelRatio: number;
}
/**
 * @var JSのwindow変数にsceneを拡張するための定義
 */
declare var window: Window

/**
 * three.jsの初期化処理を実施
 * Singleton pattern
 */
export class ThreeSampleScene {


  /**
   * Canvas
   */
  public canvas: WebGLCanvas;

  /**
   * インスタンス
   */
  private static instance: ThreeSampleScene;


  /**
   * カメラのコントロール
   */
  private orbitControlls: OrbitControls;

  private addCount:number = 0;

  /**
   * インスタンスの取得 singleton
   */
  public static getInstance(): ThreeSampleScene {
    if (!ThreeSampleScene.instance) {
      ThreeSampleScene.instance = new ThreeSampleScene();
    }

    return ThreeSampleScene.instance;
  }


  /**
   * コンストラクタ
   * キャンバスにThree.jsの設定を行う。
   */
  private constructor() {

    this.canvas = new WebGLCanvas(1000, 500);

    // three.js inspector用の設定
    // window.scene　と window.THREEを定義する。
    window.scene = this.canvas.scene;
    window.THREE = THREE;

    //OrbitControls ドラッグでカメラ移動
    this.orbitControlls = new OrbitControls(this.canvas.camera, this.canvas.renderer.domElement);
    //DragDropとかぶるので無効化
    this.orbitControlls.enabled = false;
  }


  /**
   * 初期化処理
   */
  public init(): void {

    //初期状態をヒストリーに登録
    HistoryController.getInstance().addHistory(ThreeSampleScene.getInstance().canvas.scene);

    this.addObject();
    this.render();

    // 初期化のために実行
    const div: any = document.querySelector(".v-main__wrap");

    const divWidth: number = div.clientWidth;
    const divHeight: number = div.clientHeight;

    this.onResize(divWidth - 10, divHeight - 45);

  }

  /**
   * ARボタンの作成
   */
  public createArButton(): HTMLElement {
    ThreeSampleScene.getInstance().getRenderer().xr.enabled = true;

    const arButton: HTMLElement = ARButton.createButton(ThreeSampleScene.getInstance().getRenderer());
    arButton.style.bottom = "120px";

    return arButton;

  }

  /**
   * VRボタンの作成
   */
  public createVrButton(): HTMLElement {

    ThreeSampleScene.getInstance().getRenderer().xr.enabled = true;

    const vrButton: HTMLElement = VRButton.createButton(ThreeSampleScene.getInstance().getRenderer());
    vrButton.style.bottom = "120px";
    // vrButton.style.left = "calc(50% - 175px)";
    vrButton.style.left = "";

    return vrButton;
  }



  // 毎フレーム時に実行されるループイベント
  // requestAnimationFrameで呼び出された時は、thisが効かない。
  public render(): void {



    // レンダリング
    ThreeSampleScene.getInstance().getRenderer().render(ThreeSampleScene.getInstance().canvas.scene, ThreeSampleScene.getInstance().canvas.camera);

    // 4. XRセッションにアクセスするためコントローラーを取得する
    const controller = ThreeSampleScene.getInstance().getRenderer().xr.getController(0);
    controller.addEventListener('selectend', () => {
      controller.userData.isSelecting = true;
    });

    ThreeSampleScene.getInstance().getRenderer().setAnimationLoop(this.tick);

    //requestAnimationFrameで呼ばれる時に、thisがundefinedになるため、この呼び出し方。
    // requestAnimationFrame(ThreeSampleScene.getInstance().render);
  }

  // 毎フレーム時に実行されるループイベント
  public tick() {

    // レンダリング
    ThreeSampleScene.getInstance().getRenderer().render(ThreeSampleScene.getInstance().canvas.scene, ThreeSampleScene.getInstance().canvas.camera);
  }

  /**
   * サンプルオブジェクトの追加
   */
  public addObject(): void {

    const canvas: WebGLCanvas = this.canvas;

    // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
    const geo: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);

    // マテリアルを作成
    const mat: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    this.addCount++;
    // ジオメトリとマテリアルからメッシュを作成
    const wrap = new THREE.Object3D();
    const mesh: THREE.Mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = this.addCount;
    mesh.position.y = 0.5; //高さ方向
    mesh.position.z = 0;
    wrap.add(mesh);

    // メッシュをシーンに追加
    canvas.scene.add(wrap);

    //Drag and drop で移動。視点のコントロールとかぶる
    const objects: THREE.Object3D[] = new Array();
    objects.push(wrap);
    const controls = new DragControls(objects, canvas.camera, canvas.renderer.domElement);
    controls.enabled = true;

    // ドラッグ開始時に色を変更
    controls.addEventListener('dragstart', function (event) {
      event.object.material.emissive.set(0xaaaaaa);
    });

    controls.addEventListener('dragend', function (event) {
      event.object.material.emissive.set(0x000000);
    });

    // //TransformControlsに変更。矢印付きで動かせる
    // const control = new TransformControls(canvas.camera, ThreeSampleScene.getInstance().getRenderer().domElement);
    // control.addEventListener('change', ThreeSampleScene.getInstance().render);

    // // control.addEventListener('dragging-changed', function (event) {
    // //   // orbit.enabled = !event.value;
    // // });

    // control.attach( wrap );
		// canvas.scene.add( control );


    //　戻る・進むなどのためにヒストリーへ追加
    HistoryController.getInstance().addHistory(ThreeSampleScene.getInstance().canvas.scene);
  }


  /**
   * Transformコントロール（矢印付きのコントロール）の追加
   *
   */
  public addTransformControls( obj:THREE.Object3D){
    //TransformControlsに変更。矢印付きで動かせる
    const control = new TransformControls( this.canvas.camera, ThreeSampleScene.getInstance().getRenderer().domElement);
    control.addEventListener('change', ThreeSampleScene.getInstance().render);

    control.addEventListener('dragging-changed', function (event) {
      // orbit.enabled = !event.value;
    });

    control.attach( obj );
    // control.remove( obj );
    this.canvas.scene.add( control );

  }


  /**
   * FBXのサンプル追加
   */
  public addFBXSample(): void {

    const canvas: WebGLCanvas = this.canvas;

    const loader = new FBXLoader();

    let mixer: THREE.AnimationMixer;

    // http://localhost:8001/storage/upload/sofa.FBX
    loader.load('/storage/upload/sofa.FBX', function (object: THREE.Group) {


      object.scale.multiplyScalar(0.1);

      object.position.x = 0.01;
      object.position.y = 0.1; //高さ方向
      object.position.z = -10;

      // mixer = new THREE.AnimationMixer(object);

      // const action = mixer.clipAction(object.animations[0]);
      // action.play();

      // object.traverse(function (child:any) {

      //   if (child.isMesh) {

      //     child.castShadow = true;
      //     child.receiveShadow = true;

      //   }

      // });
      canvas.scene.add(object);

      // //矢印付きのオブジェクト操作
      // const control = new TransformControls(canvas.camera, ThreeSampleScene.getInstance().getRenderer().domElement);

      // control.attach( object );
		  // canvas.scene.add( control );


    });


  }

  /**
   * レンダラーの取得
   */
  public getRenderer(): THREE.WebGL1Renderer {
    return this.canvas.renderer;
  }

  /**
   * 視点移動の有効化
   */
  public orbitControllsSetEnabled(isEnabled: boolean): void {
    this.orbitControlls.enabled = isEnabled;
  }

  /**
   * 保存処理。
   */
  public export2Json(): string {
    return this.canvas.scene.toJSON();
  }

  /**
   * 読み込み処理。
   */
  public load2Json(json: string): void {
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
  }

  /**
   * リサイズ処理
   */
  public onResize(width: number, height: number): void {

    // レンダラーのサイズを調整する
    // ThreeSampleScene.getInstance().getRenderer().setPixelRatio(window.devicePixelRatio);
    ThreeSampleScene.getInstance().getRenderer().setSize(width, height);

    // カメラのアスペクト比を正す
    ThreeSampleScene.getInstance().canvas.camera.aspect = width / height;
    ThreeSampleScene.getInstance().canvas.camera.updateProjectionMatrix();
  }

}



