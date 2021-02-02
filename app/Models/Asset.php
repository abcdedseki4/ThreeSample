<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Assetモデル
 *
 *
 */
class Asset extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'assets';

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
	  protected $fillable = ['title','user_id','file_name'];


}
