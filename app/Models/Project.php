<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * ProjectのModelクラス
 */
class Project extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'projects';

    /**
     * テーブルの主キー
     *
     * @var string
     */
	protected $primaryKey = 'id';

	/**
     * 複数代入する属性
     * @var array
     */
	protected $fillable = ['title','user_id','description','image_path'];


}
