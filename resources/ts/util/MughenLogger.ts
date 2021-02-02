
/**
 * ログ出力用クラス
 * Singleton pattern
 * <pre>使い方：ThreeSampleLogger.getInstance().debug(message)</pre>
 */
export class  ThreeSampleLogger{

  /**
   * ログレベル
   * 設定中のログレベルより、数字が小さいログを表示する
   */
  private static readonly LEVEL = {
    RUN   : 0,
    ERROR : 1,
    WARN  : 2,
    LOG   : 3,
    INFO  : 4,
    DEBUG : 5,
  }

  /**
   * 現在のログレベルの設定
   */
  private static readonly LOG_LEVEL:number = ThreeSampleLogger.LEVEL.DEBUG;


  /**
   * インスタンス
   */
  private static instance: ThreeSampleLogger;

  /**
   *
   */
  private constructor(){

  }

  /**
   *
   */
  public getInstance(){
    if (!ThreeSampleLogger.instance) {
      ThreeSampleLogger.instance = new ThreeSampleLogger();
    }

    return ThreeSampleLogger.instance;
  }

  /**
   *
   * @param message
   */
  public debug(message:string){
    if( ThreeSampleLogger.LOG_LEVEL >= ThreeSampleLogger.LEVEL.INFO ){
      console.log(message);
    }
  }

  /**
   *
   * @param message
   */
  public info(message:string){
    if( ThreeSampleLogger.LOG_LEVEL >= ThreeSampleLogger.LEVEL.INFO ){
      console.info(message);
    }
  }

  /**
   *
   * @param message
   */
  public log(message:string){
    if( ThreeSampleLogger.LOG_LEVEL >= ThreeSampleLogger.LEVEL.INFO ){
       console.log(message);
    }
  }

  /**
   *
   * @param message
   */
  public warn(message:string){
    if( ThreeSampleLogger.LOG_LEVEL >= ThreeSampleLogger.LEVEL.INFO ){
      console.warn(message);
    }
  }

  /**
   *
   * @param message
   */
  public error(message:string){
    if( ThreeSampleLogger.LOG_LEVEL >= ThreeSampleLogger.LEVEL.INFO ){
      console.error(message);
    }
  }



};
