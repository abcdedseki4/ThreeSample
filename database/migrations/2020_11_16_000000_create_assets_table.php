<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssetsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('assets', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->charset = 'utf8mb4';
      $table->collation = 'utf8mb4_unicode_ci';

      $table->id();
      $table->foreignId('user_id');
      $table->string('title', 100);
      $table->string('file_name', 255);
      //有効（全体）桁数指定でNULL値可能なcreated_atとupdated_atカラム追加
      $table->timestamps(0);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('assets');
  }
}
