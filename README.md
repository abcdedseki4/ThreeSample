
# ThreeSample 開発環境説明 目次
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ThreeSample 開発環境説明 目次](#threesample-開発環境説明-目次)
- [フォルダ構造](#フォルダ構造)
- [開発環境構築手順](#開発環境構築手順)
  - [HomeBrew](#homebrew)
  - [node.js](#nodejs)
  - [VSCode](#vscode)
    - [VSCodePlugin](#vscodeplugin)
      - [プラグイン(設計書作成用)](#プラグイン設計書作成用)
  - [Docker Desktop for Mac](#docker-desktop-for-mac)
    - [Docker Desktop for mac](#docker-desktop-for-mac-1)
    - [Docker環境](#docker環境)
      - [コンテナ](#コンテナ)
      - [dockerコンテナを作成して起動](#dockerコンテナを作成して起動)
      - [コンテナに入る（three-web,three-db）](#コンテナに入るthree-webthree-db)
      - [再起動](#再起動)
      - [停止](#停止)
      - [削除](#削除)
      - [開始　２回目以降はこちらで](#開始２回目以降はこちらで)
      - [ビルド](#ビルド)
      - [コンテナでコマンド実行](#コンテナでコマンド実行)
      - [全コンテナ停止](#全コンテナ停止)
      - [全コンテナ削除](#全コンテナ削除)
      - [全イメージ削除](#全イメージ削除)
  - [初回プロジェクト作成](#初回プロジェクト作成)
  - [プロジェクトのインストール](#プロジェクトのインストール)
  - [データベース作成](#データベース作成)
    - [データベース作成](#データベース作成-1)
    - [ユーザー作成](#ユーザー作成)
    - [権限付与](#権限付与)
  - [chromeエクステンション](#chromeエクステンション)
  - [開発時の操作](#開発時の操作)
    - [artisan](#artisan)
      - [storageのリンク](#storageのリンク)
      - [migration](#migration)
    - [laravel/ui](#laravelui)
    - [JS,SCSS開発](#jsscss開発)
    - [TSLint](#tslint)
  - [VSCode ショートカット集](#vscode-ショートカット集)
    - [いくつか便利なものを抜粋](#いくつか便利なものを抜粋)
  - [ドキュメント作成手順](#ドキュメント作成手順)
  - [コーディング規約](#コーディング規約)
  - [Gitの操作](#gitの操作)
    - [Master ブランチ](#master-ブランチ)
    - [Develop ブランチ](#develop-ブランチ)
    - [Feature ブランチ](#feature-ブランチ)
    - [Release ブランチ](#release-ブランチ)
    - [HotFix ブランチ](#hotfix-ブランチ)
    - [SourceTree](#sourcetree)
    - [コミットメッセージ](#コミットメッセージ)
- [ソースコードコメントのドキュメント化](#ソースコードコメントのドキュメント化)
  - [php](#php)
  - [typescript](#typescript)
- [テストコード](#テストコード)
- [メモ](#メモ)

<!-- /code_chunk_output -->


# フォルダ構造
ThreeSample  
├── docker docker環境  
├── doc ドキュメントの格納場所  
├── ... あとはLaravelのフォルダ構成  
  
laravel 7.29.3  
PHP 7.4.12  
MySQL 5.7  
node.js v14.15.0  
NPM 6.14.8  

TODO　ソースフォルダ以外はリポジトリを分けた方が良いかもしれない。

----

# 開発環境構築手順

## HomeBrew

http://brew.sh/index_ja.html にあるスクリプトを実行する

## node.js
nodebrewをインストール（nodeのパッケージ管理ツール）  
brew install nodebrew  
nodebrew install-binary v14.15.0  
使用するバージョンを指定  
nodebrew use v14.15.0  

パスを通す  
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.zprofile  
  
パスの設定を反映  
source ~/.zprofile  
  
バージョン確認  
node -v  

## VSCode  
https://azure.microsoft.com/ja-jp/products/visual-studio-code/


### VSCodePlugin  

 VSCodeのメニューから
* Git History Gitの履歴表示    
* PHP intelephense  
         保管など。これを使用するならデフォルトの組み込みPHPサポートを無効にした方が良い。
         　Extentionのところで、@builtin php　と入力
         　PHP Language Basics、PHP Language   Features　をDisableに変更。

* PHP Debug
* PHP DocBlocker  
     Docコメントの入力を補完してくれます。
* PHP Class Generator   
     空のPHPファイルから、namespaceとクラス名を補完したスケルトンを作ってくれます  
* PHP Namespace Resolver  
     コード内に書かれたクラス名からnamespaceのインポートを挿入してくれます。
* PHP import checker   
     useキーワードでインポートしてるけど、使っていないクラスをハイライトしてくれます
* Markdown All in One  
     マークダウン

* Docker
     Docker操作用。左のメニューに、Dockerのアイコンが追加される。

* vue
     同一の名前で複数あるので注意：publisher:"jcbuisson"  
     Vuejs開発用  

* Jira and Bitbucket (Official)
     Jiraのオフィシャル。issueがVSCode上で編集できる。

* Open in SourceTree
     ファイル右クリック時に「Open in source tree」のメニューが出て、sourcetreeを開ける。
* Vetur
* Debugger for Chrome  
   Chrome でデバッグ
* MySQL 
   Mysqlの操作用  
   DockerのMysqlへの接続設定  
	- name:ThreeSample_db
	- host:127.0.0.1
	- port:13306  ※dockerの設定で、mysqlのポートは、ローカル13306へマウントしているため。
	- username:ThreeSample
	- password:ThreeSample
	- includeDatabases:ThreeSample

* API Blueprint Language
   API設計書を書くため。.apibのファイル（mdの拡張記法）に対応できる。
* API Blueprint Viewer
   .apibのファイルのビューワー
* API Elements extension
* REST Client

拡張機能は、推奨として、.vscode/extensions.json 内に記述しているため、  
インストールしていない端末だと右下に拡張機能の推奨事項があります。と出てくるはずなので、そこからインストール可能。  


#### プラグイン(設計書作成用)  
markdown＋draw.ioの図で設計書を作成ができる？
以下のプラグインを入れて作成

* drawio markdown
* Draw.io integration
* Paste Image マークダウンで画像を貼り付け Cmd+Option+V
            macの場合は
            1. Ctrl + Shift + Command + 4 で範囲選択してスクショ取得&クリップボードに取り込み または　ファイル自体をCommand＋Cでコピー
            2. Option + Command + v でmarkdownファイル中に貼り付け

* MarkDown Table Format
* Markdown PDF
* vscode-pdf
* Project Links ソースコード内で、プロジェクト内の他ファイルへのリンクが書ける project://src/path/to/file.go
* Markdown Preview Enhanced　マークダウンで目次(TOC)を挿入　F1 Markdown Preview Enhanced: Create TOC



## Docker Desktop for Mac

   ### Docker Desktop for mac  
     https://hub.docker.com/editions/community/docker-ce-desktop-mac  
     Get Dockerボタンからダウンロードしてインストール  
　　　Docker　Desktop起動  

### Docker環境

参考：https://qiita.com/A-Kira/items/9a03d7b230741ed7b1de  

ThreeSample  
├── docker  
│　　├── Dockerfile  
│　　├── apache  
│　　│　　└── 000-default.conf  
│　　├── db  
│　　│　　├── data  
│　　│　　├── my.cnf  
│　　│　　└── sql  
│　　│　　　　　├── 001-create-tables.sql  
│　　│　　　　　└── init-database.sh  
│　　└── php  
│　　　　　└── php.ini  
└── docker-compose.yml  

/docker/db/data フォルダを作成しておく。

#### コンテナ
* three-web
* three-db

設定は、docker-compose.yml  
docker-composeで上記コンテナをまとめて起動。  

* docker : コンテナツール
* docker-compose : コンテナをまとめて作成、起動などが行える。
* Dockerfile : コンテナの作成レシピ　webだけ使用

docker上のファイルとローカルのファイルがマウントされていて、ローカルで加えた変更は即座に反映される。  
WEBのdockerのドキュメントルート /var/www/html と、本プロジェクトのフォルダがマウントされている。  

設定ファイル類は、dockerの作成時にコピーされるため、設定変更時には、dockerを削除して再作成（docker-compose build --no-cache ）する。  

dockerは、まず起動イメージがあり、それをベースにコンテナが作成される。  
コンテナの作成時に設定ファイルをコピーしたり、マウントディレクトリを指定したりなどを  Dockerfile docker-compose.ymlに記述している。  

docker desktop for mac を起動して、そちらからDockerを起動したりの操作も可能。  
以下はコマンドで操作する場合：  

#### dockerコンテナを作成して起動
```
$ docker-compose up -d
```
#### コンテナに入る（three-web,three-db）
```
$ docker-compose exec web bash
```
#### 再起動
```
$ docker-compose restart
```
#### 停止
```
$ docker-compose stop
```
#### 削除
```
$ docker-compose rm
```
#### 開始　２回目以降はこちらで
```
$ docker-compose start
```
#### ビルド　 
docker-compose.yml Dockerfileを修正後、再ビルドしたいとき
```
$ docker-compose build
```
オプションをつけないと変更が反映されない状態になるかも。再ビルド時は--no-cache  
 #構築時にイメージのキャッシュを使わない
```
$ docker-compose build --no-cache 
```
#### コンテナでコマンド実行
```
$ docker-compose run three-web コマンド
```
#### 全コンテナ停止
```
$ docker stop $(docker ps -q)
```
#### 全コンテナ削除
```
$ docker rm $(docker ps -q -a)
```
#### 全イメージ削除
```
$ docker rmi $(docker images -q)
```
----

## 初回プロジェクト作成  
  各開発者は実施の必要なし
  $docker-compose exec three-web bash
  composer create-project --prefer-dist laravel/laravel ThreeSample

----
## プロジェクトのインストール
  .env_example .envに変更して、ローカル環境に応じた設定にする。

  Docker環境内でComposer installを実行
  $ docker-compose exec three-web bash  
  $ composer install --dev  

  * 開発環境向け（ローカル開発環境構築時は以下を実行）
  $ composer install --dev  
  * 本番環境向け  
  $ composer install --no-dev  
  ※本番環境時もGit管理のソースコードアップ（ThreeSample以下）とcomposer installが必要。  

----  
  
## データベース作成
three_sample  
ユーザー：three_sample
を作成する。  
（データフォルダはマウントされているため、データはdocker環境再作成時にも残る。）  

docker-compose exec three-db bash
mysql -u root -proot

### データベース作成
CREATE DATABASE three_sample DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
### ユーザー作成
CREATE USER three_sample IDENTIFIED BY 'three_sample';
### 権限付与
GRANT ALL PRIVILEGES ON three_sample.* TO three_sample;

※TODO docker作成時に上記を作成するようにする？  

##　ローカル環境アクセス

http://localhost/  
これで表示されるはず。  
  
サンプルシーン画面  
http://localhost/create_scene#    
  
----

## chromeエクステンション

vue.js devtools  
vueの開発に入れておいた方が良いと思われる。  
https://chrome.google.com/webstore/detail/vuejs-devtools/  nhdogjmejiglipccpnnnanhbledajbpd/related  
  
three.js inspector  
three.jsの開発に入れておいた方が良いと思われる。  
https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi  

WebXR API Emulator
説明： https://blog.mozvr.com/webxr-emulator-extension/
https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje

## 開発時の操作
### artisan
```
$ docker-compose exec web bash  
ルーティングのリスト表示  
php artisan route:list  

php artisan make:model Models/Project  
php artisan make:controller ProjectController --resource --model=Models/Project  
```
#### storageのリンク
以下のコマンドで、ストレージのシンボリックリンクを貼る。
（/publicディレクトリの下にstorageディレクトリが作成され、/storage/app/publicへリンボクンクリンクが張られる）
ファイルアップロード先が、/storage/app/publicのため。。（あとでファイルの保存先とかは要検討）

$ docker-compose exec three-web bash   
php artisan storage:link  

#### migration
テーブル作成
```
docker-compose run three-web php artisan migrate  
```
最後に実行したMigrationを元に戻す --step=5 で5step戻す。  
```
php artisan migrate:rollback  
```
  
### laravel/ui   
laravel/uiパッケージはたくさんの事前に用意した認証コントローラも生成します。生成したコントローラは、App\Http\Controllers\Auth名前空間に位置づけられます  
$docker-compose run web composer require laravel/ui  
下記で認証用のコントローラが作成される。  
$docker-compose run web php artisan ui vue --auth  

### JS,SCSS開発

JSはTypeScriptで記述。  
CSSは、SCSSを使用。
resources/内に、tsとSCSSを作成する。

ThreeSampleフォルダにて、  
npm install 初回は必要。その後も何かインストールしたら各環境で実行  
npm run dev  
    これで、public/css/app.css  
          public/js/app.js  
          が作成される。  
    ソースファイルはresources内。  
npm run prod  
    これでMin化されたファイルができる。  
  
変更を即座に反映する場合：  
npm run watch  
一部環境でWatchで即座に反映されない場合は以下。  
npm run watch-poll  

まとめて出力されるが、この設定は以下で設定する。  
[webpack.mix.js](webpack.mix.js)

TypeScriptの設定
[tsconfig.json](tsconfig.json)

package-lock.jsonファイルは、NPMでインストールされたモジュールのバージョンが記載されている。
他環境でnpm install される時に、このバージョンが参照されるため、新たにインストールした場合は、Gitへコミットしてプッシュすること。

### TSLint
静的解析ツール。TypeScript コードの書き方などをチェックしてくれます。
以下のコマンドで実行し、WARNINGが出る箇所などを修正します。
npm run tslint

設定は以下のファイルで実施
tslint.json

## VSCode ショートカット集

* Ctrl+K Ctrl+S ショートカットの設定画面を表示

### いくつか便利なものを抜粋

*  Option + Shift + F コードのフォーマット
* Command + Shift + B  タスクの実行  
　　　　Clipyを使用している場合、Clipyの方でこのコマンドが取られてしまうため、Clipyの設定変更が必要。

* Command + L 一行選択

* F1 コマンドパレットを開く  
   コマンドパレット内でdocker:compose up を選択すると、docker-compose up -d コマンドでdockerが起動される。

* Command + N　新規ファイル作成

* Command + P  ファイルを検索して開く

* Command + F  検索　ソース内
* Command + Shift + F　検索　全ファイル
* Command + Shift + H　置換　全ファイル


## ドキュメント作成手順
　[ドキュメント作成](doc/README.md)

## コーディング規約
　[コーディング規約](doc/008_その他/001_コーディング規約.md)

----
## Gitの操作
　GitFlowの流れに沿って開発する。
　　https://www.atlassian.com/ja/git/tutorials/comparing-workflows/gitflow-workflow

### Master ブランチ
　　常に本番リリースの最新版を保持。

### Develop ブランチ
　　開発ブランチ。開発の最新はこのブランチ。テスト環境と一致させる。（自動デプロイ予定）
　　
### Feature ブランチ
　　Developから派生。
　　各機能の開発などをこのブランチで実施し、BitBucketでDevelopへのマージリクエストを出す。
　　確認者がソースを確認の上、BitBucketでマージを実行する。
   git-flow feature start ブランチ名
   git-flow feature finish ブランチ名

### Release ブランチ
　　Developから派生。
　　リリースの準備（最終確認やバージョン情報の更新（version.txt））　　
　　確認中の不具合などはこのブランチ上で修正する。
   確認完了できたら、MasterとDevelopへマージする。

### HotFix ブランチ
　　Masterから派生。
　　本番環境への緊急バグ修正に使用する。

### SourceTree
Featureブランチ、Releaseブランチは、SourceTreeのGitFlowボタンから作成する。
（JiraのIssueからも作成可能。または git flow feature start feature_branch のコマンドでも可 ）
GitFlowボタンは、SourceTreeの上のアイコン類が出ている箇所を右クリック。ツールバーをカスタマイズから表示する。

### コミットメッセージ
　JIRAのIssueのIDを含める。（これでJiraのIssueと紐づく）
　IssueID Issueタイトル　編集内容
　例：ThreeSample-1 開発環境構築　初回開発環境構築

# ソースコードコメントのドキュメント化

## php
以下でphp documentorを入れている。
composer require --dev phpdocumentor/phpdocumentor
php vendor/bin/phpdoc

* 実行方法
dockerのウェブサーバーに入る  
docker-compose exec web bash
phpdocのコマンド実行  
php vendor/bin/phpdoc -d app/ -t doc/010_PHPDOC

## typescript
以下のコマンドでHTML化されたドキュメントができるはず。。(未検証。後々整えたい)
$ typedoc --out path/to/documentation/ path/to/typescript/project/


# テストコード
laravelのphpunit
Typescript側は、jest(未検証。後々整えたい)
ブラウザテスト laravel duskまたはSeleniumを使用したい。。


# メモ
サムネイル作成
https://github.com/w3dot0/node-threejs-thumbnailer

threejs editor
https://threejs.org/editor/

threejs editor　ソース
https://github.com/mrdoob/three.js/tree/master/editor

three.ar.js
https://github.com/google-ar/three.ar.js?files=1