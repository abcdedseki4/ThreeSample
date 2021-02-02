<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * デフォルトビュー。基本的にこの画面だけで、他はAPIとする。
 */
Route::get('/', function () {
    return view('index');
});

/**
 * プロジェクト追加
 */
Route::post('/projects/add', 'ProjectController@add')->name('add_project');

/**
 * プロジェクト削除
 */
Route::post('/projects/delete', 'ProjectController@delete')->name('delete_project');

/**
 * プロジェクトのリスト
 */
Route::get('/projects/list', 'ProjectController@list')->name('list_project');

/**
 * アセット追加
 */
Route::post('/assets/add', 'AssetController@add')->name('add_asset');

/**
 * アセット削除
 */
Route::post('/assets/delete', 'AssetController@add')->name('delete_asset');

/**
 * アセットのリスト
 */
Route::get('/assets/list', 'AssetController@list')->name('list_asset');

//以下は、Vue-routerのURLのため、index.phpが表示されるようにする。
Route::get('/projects', function () {
    return view('index');
});
Route::get('/assets', function () {
    return view('index');
});
Route::get('/scene', function () {
    return view('index');
});
Route::get('/config', function () {
    return view('index');
});
Route::get('/ar', function () {
  return view('index');
});
Route::get('/vr', function () {
  return view('index');
});


Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
// Route::get('/assets/index', 'AssetsController@index');
