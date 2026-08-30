---
name: design-no-ai-tells
description: 見出しの上に小さな英字ラベル（eyebrow）を置かない等、AIが作った感を避けるデザイン方針
metadata:
  type: feedback
---

このサイト（EKKYO.HUB WEB）では、**見出しの上に小さく英字ラベル（CONCEPT / ABOUT / OVERVIEW などの "eyebrow"）を置かない**。

**Why:** ユーザー曰く「Claudeが作ったWEBサイトは全て同じように装飾されており、AI感が出てしまう」。小さくレタースペースを広げた英字キッカーは典型的なAI生成の見た目になる。

**How to apply:**
- 新しいセクションは日本語の見出し（h2）から直接始める。`text-[10px] tracking-[0.3em] text-ekkyo-accent` のような eyebrow `<p>` は追加しない。
- eyebrow を消したら、続く見出しの `mt-*`（mt-3 / mt-4 など）も外して余白の崩れを防ぐ。
- ステータス表示などで英字ラベルが必要なら日本語にする（例: COMING SOON → 近日公開）。
- 例外: 組織名・イベント名そのもの（例: 「EKKYO.SUMMIT 2026」「一般社団法人 EKKYO.HUB」）は情報なのでOK。ただし極端なレタースペースの小さなキッカーとしてではなく、自然な見出し/サブタイトルとして置く。
- 2026-06-30 に全ページ（トップ/summit/2026・portfolio・members・contact・media・summit-2025）から eyebrow を一括除去済み。
