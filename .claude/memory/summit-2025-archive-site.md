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

**未対応（ユーザーの素材待ち）**:
- 各ワークショップの concept / archive は空（「記録は準備中」表示になる）
- [[dummy-text-kotoba]] 「言葉の収穫ワークショップ」にはレイアウト確認用ダミー文が入っている。公開前に必ず差し替え
- 写真は全区画未登録（public/images/summit2025/<slug>/ に置いて photos に追加）
- OG画像はポートフォリオの summit-2025-ueda.jpg を流用中
