<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asset;
use Illuminate\Support\Facades\Log;

/**
 * アセット管理のコントローラー
 *
 * 画面設計書:project://doc/005_画面設計書/004_アセット管理画面/アセット管理画面.md
 *
 * @todo 設計書パスの変更
 */
class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        $assetList = Asset::all();
        $assetCount = Asset::count();

        return response()->json(['result' => true, 'count' => $assetCount, 'result_object' => $assetList]);
    }



    /**
     * アセットのファイルアップロード
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {

      //todo validation vee-validateとかを使う？
      Log::debug( "fileupload:" );
      Log::debug( print_r($request->file,true) );
      //ファイルをアップロード storage/app/upload
      // $path = $request->file-> storeAs("upload",$request->input('file_name'));

      // とりあえず、publicディレクトリにアップロード /public/upload/ファイル名 filesystems.php のpublicが保存先。http://localhost:8001/storage/upload/sofa.FBX
      $path = $request->file-> storeAs("upload",$request->input('file_name'),'public');

      $asset = array(
        'title' => $request->input('title'),
        'user_id' => 1,
        'file_name' => $request->input('file_name'),
      );

      // Modelでfillableかguardedのどちらかを指定する必要あり
      //@todo エラー処理
      $asset = Asset::create($asset);

      return response()->json(['result' => true, 'result_object' => $asset]);
    }


}
