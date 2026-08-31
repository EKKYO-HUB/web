---
name: summit-2025-archive-site
description: /summit/2025 は「耕すと芽吹く」体験型アーカイブ。構造・データの場所・未対応事項（実コンテンツ待ち）
metadata:
  type: project
---

# SUMMIT 2025 アーカイブサイト「耕せ」（/summit/2025）

WIREDクリエイティブハックアワード等への提出を想定した体験型アーカイブ（2026-08-29作成）。

**コンセプト**: 「耕さなければ、現れない。」トップは一面の乾いた土のCanvas。ドラッグで耕すと18のワークショップが芽吹き、クリックで区画（詳細）を掘り下げる。スクロール＝掘削（詳細ページは深度計付き、種→根→実りの3地層）。

**構造**:
- データ: `src/content/summit2025.ts`（全ワークショップ・宣言文・クレジット。コンテンツ追加手順はファイル冒頭コメントと CONTENT_GUIDE.md 参照）
- 畑: `src/app/summit/2025/Field.tsx`（Canvas耕作、芽吹きは sessionStorage 保存、宣言/一覧オーバーレイ内蔵）
- 区画: `src/app/summit/2025/[slug]/PlotArchive.tsx`
- パレット: tailwind.config.ts の `tagayase`（土・紙・芽・茜）、キーフレームは globals.css 末尾
- 没入型のため Header / ConditionalFooter / PageProgressBar で `/summit/2025` を除外済み

**デザイン決定事項（2026-08-29 フィードバック反映）**:
- ルート全体を Shippori Mincho で統一（layout の `font-mincho` + globals.css の `.tagayase-root h1-h6 { font-family: inherit }` で base層の font-display を打ち消す）。sans は使わない
- 「小さい・色違い・補足ラベル」（例: 見出し脇の小文字サブラベル、cm表記）は置かない＝AI感が出るため。地層見出しは 種/根/実り の一字のみ。深度計は線と印だけで数値なし（定量表現からの脱却）
- トップ導入画面はロゴ（logo_SUMMIT2025.svg、白抜き・暗背景専用）を大きく出し、宣言・一覧ナビは最初のひと耕しまで非表示
- `/portfolio/summit-2025-ueda` は `/summit/2025` へ redirect（旧概要ページの内容は宣言オーバーレイに集約）

**プログラムデータ（2026-08-29 正式リスト反映）**:
- WORKSHOPS は正式プログラム20件（DAY1:6 / DAY2:10 / DAY3:4、ユーザーは21個と言ったが実際に貼られたリストは20件だった。将来「21個のはず」という話が出たら再確認する）
- OPENING SESSION / LUNCH / CLOSING SESSION / EKKYO.FES もセッションとして他ワークショップと同列に扱う（区画として畑に生える）
- `Workshop` 型に `place`（会場）と `credits`（主催/共催/協賛/協力の配列）を追加。旧 `facilitator` は廃止。PlotArchiveのヒーロー下に「会場　◯◯　主催　◯◯」の一行で表示（tiny-labelではなく本文と同じ大きさ・字間で統一、AI感回避の方針に準拠）
- モバイルの日別レイアウトは区画数が8件超だと3列レンガ状（`cols=3`）に自動切替。2列のままだと10件（DAY2）で縦書き名札同士が重なることが判明したための対応（[[design-no-ai-tells]] 関連ではなく純粋なレイアウト崩れ対策）

**Google Driveからの素材取り込み（2026-08-31）**:
- ソース: Google Drive「08_WS-ワークショップ」フォルダ（フォルダID `1Da2Q6ksX6teNSg1995DaGQYA8YM7P1zS`、出展者向け企画フォーム回答スプレッドシート `1MvkD3igo6t1LLA6Z6MgPRt9cn3yCZWZveDBKkaXH0uc` が主な情報源）
- 15件のワークショップの `concept`（種）を、出展者が提出した企画概要文・企画書から実データで記入済み（仮面舞踏会/火星の人/SNOB編集部ごっこ/あ・る/発酵と出会い/発明の舞台裏/社会課題と思考/My Grapes/悩みのタネ/医者の思考/美味しいの在処/ディープウォーク/ととのい/言葉の収穫/NOEMA-NOESIS）。「言葉の収穫」のダミー文はこの時に実データへ差し替え済み
- 埋まっていないのは opening-session, ekkyo-conference-28, lunch, closing-session, ekkyo-fes の5件（EKKYO.HUB内製セッションのため出展者フォームに情報なし。FES企画書はロジ資料のみでコンセプト文なし）
- `archive`（実り＝当日の振り返り）は全件未着手。Driveにあるのは開催"前"の企画・準備資料のみで、開催後の振り返りテキストは存在しない
- kanjiNo関数（Field.tsx / PlotArchive.tsx）に `n=20` で「十十」になるバグがあり、この対応中に発見・修正済み（"二十"を正しく返すよう修正）

**未対応（次にやるべきこと）**:
- 5件（opening-session等）の concept はEKKYO.HUB内部資料の追加提供待ち
- archive（当日の振り返り）は全20件とも記録待ち
- 写真は全区画未登録。DriveのDAY1/DAY2/DAY3/FES/菅平フォルダには出展者提出の団体紹介写真（開催前・Drive内画像ファイル）はあるが「当日の風景」ではないため、当日撮影写真が別途必要
- OG画像はポートフォリオの summit-2025-ueda.jpg を流用中
