<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

  /**
   * 一覧のリスト表示
   *
   * @param Request $request
   * @return Json
   * @todo  現時点では適当に全件拾っているだけなので、処理に応じて調整
   */
  public function list(Request $request)
  {

    $projectList = Project::all();
    $projectCount = Project::count();

    return response()->json(['result' => true, 'count' => $projectCount, 'result_object' => $projectList]);
  }

  /**
   * プロジェクトの作成フォームの表示
   * APIとして送信
   * @return \Illuminate\Http\Response
   */
  public function add(Request $request)
  {

    $project = array(
      'title' => $request->input('title'),
      'user_id' => 1,
      'description' => $request->input('description'),
    );

    // fillableかguardedのどちらかを指定する必要あり
    //@todo エラー処理
    $project = Project::create($project);

    return response()->json(['result' => true, 'result_object' => $project]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * プロジェクトの作成処理
   *
   * @param  \App\Models\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function show(Project $project)
  {
    //
  }

  /**
   *　プロジェクトの編集画面の表示
   *
   * @param  \App\Models\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function edit(Project $project)
  {
    //
  }

  /**
   * プロジェクトの更新
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Project $project)
  {
    //
  }

  /**
   * 削除処理
   *
   * @param  \App\Models\Project  $project
   * @return \Illuminate\Http\Response
   */
  public function destroy(Project $project)
  {
    //
  }
}
