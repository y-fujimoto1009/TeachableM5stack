# TeachableMachine2M5stack
TeachableMachineで作成したモデルをEZDataに蓄積するWebサービス
![スクリーンショット 2023-11-29 012627](https://github.com/y-fujimoto1009/TeachableMachine2M5stack/assets/63994394/1ee96028-ff96-4afd-8252-29c55b7c80eb)<br>
TeachableMachineで出力したモデルURLと、EZDataのトークンを指定するだけで5秒間隔で判定結果のラベルを蓄積します。<br>
UIFlowなどで処理を作成すれば、機械学習モデルとM5stackを簡単に連携することができます。<br>
<br>
**※現時点では画像プロジェクト、UIFlowでのみテストしています。**

---

### 必要な物 ###
* [M5Stack](http://www.m5stack.com/ "M5stack") (Core2で動作確認をしました。EZDataへ接続できればおそらくどのシリーズでもOKと思います。)<br>
* UIFlow  (V1.12.8で動作確認をしました。)<br>
* EZData  (V1で動作確認をしました。)<br>

### 使い方 ###
#### Teachable MachineのモデルURLを取得 ####
1.[Teachable Machine](https://teachablemachine.withgoogle.com/ "Teachable Machine")へアクセスし、画像プロジェクトを選択<br>
2.学習データをトレーニングさせ、モデルをエクスポートする<br>
3.共有可能なリンクを取得し、メモしておく<br>

#### UIFlowにてEZDataのトークンを生成 ####
1.UIFlowへアクセスし、M5stackシリーズを接続<br>
2.EzDataのSet Current Tokenボタンよりトークンを生成し、メモしておく<br>

#### 判定結果の蓄積 ####
1.[Github Page](https://y-fujimoto1009.github.io/TeachableMachine2M5stack/ "Github Page")へアクセス<br>
2.モデルURLと、トークンを入力し、実行ボタンを押す<br>
3.接続が成功すれば、5秒間隔（EZDataの仕様上3秒間隔以上でないとエラーを吐くため）で判定結果がEZDataに蓄積される<br>
4.蓄積状況はUIFlowのEZData→EZData Managerから確認可能<br>
**topic名は「result」で固定しています。**

#### UIFLOWでの使用例 ####
![image](https://github.com/y-fujimoto1009/TeachableMachine2M5stack/assets/63994394/51cf5801-eb61-4c8c-9f06-8b286edfa9bc)
