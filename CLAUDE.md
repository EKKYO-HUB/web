# CLAUDE.md — EKKYO.HUB WEB

一般社団法人EKKYO.HUB の公式サイト（Next.js 14 App Router + Tailwind、GitHub→Vercel 自動デプロイ）。
コンテンツ追加手順は [CONTENT_GUIDE.md](CONTENT_GUIDE.md)、概要は [README.md](README.md) を参照。

## メモリ
個別メモリは [.claude/memory/MEMORY.md](.claude/memory/MEMORY.md) を参照（プロジェクト内ハイブリッド方式で管理）。

## 最重要の前提
- **デザイン方針**: 見出しの上に小さな英字ラベル（eyebrow）を置かない＝AI感を避ける。詳細は [.claude/memory/design-no-ai-tells.md](.claude/memory/design-no-ai-tells.md)。
- **カラートークン**: `ekkyo-accent #0071B3`（ブランド青）、`ekkyo-orange #EB5505`（申し込み追従ボタン）。`tailwind.config.ts` で定義。
- **EKKYO.SUMMIT 2025 アーカイブ**: `/summit/2025` は「土を耕すと記録が芽吹く」体験型アーカイブ（没入型マイクロサイト）。データは [src/content/summit2025.ts](src/content/summit2025.ts)、詳細は [.claude/memory/summit-2025-archive-site.md](.claude/memory/summit-2025-archive-site.md)。
- **EKKYO.SUMMIT 2026**: フラグシップイベント用ページ `/summit/2026`（[src/app/summit/2026/page.tsx](src/app/summit/2026/page.tsx)）。テーマ「まみれろ」、2026/10/10–12、琵琶湖。申し込みURLは同ファイル先頭の `REGISTRATION_URL`（Peatix 設定済み）。タイムテーブル／ワークショップ担当者／主催者写真のデータは [src/content/summit2026.ts](src/content/summit2026.ts)（**現在は仮置き**、確定後に差し替え）。演出の詳細は [.claude/memory/summit-2026-mamire-effects.md](.claude/memory/summit-2026-mamire-effects.md)。
- **デプロイ作業の鉄則**: 本体ディレクトリでは `git reset/checkout/clean` を絶対に走らせない。scratchpad クローンで作業する際は `cd` 失敗時に即終了する（`cd "$DEST" || exit 1`）。2026-09-11 に `cd` 失敗→本体で `reset --hard` が走り未コミット編集を失った事故あり。

## ローカル開発（このMac環境）
- 依存は未コミット。初回は `npm install`（yarn未導入）。
- プレビュー: `.claude/launch.json` の `preview-mac`（`npm run dev`）。`dev` は元のWindows用設定。
- 注意: dev サーバー稼働中に `npm run build` を実行すると `.next` が壊れる。型チェックは `npx tsc --noEmit`（`.next` に触れない）を使う。
