---
name: hero-opening-animation
description: トップのヒーロー オープニング演出（ロゴ登場→左上ドック）の実装メモと注意点
metadata:
  type: project
---

トップの [HeroSection.tsx](../../src/components/ui/HeroSection.tsx) は初回オープニング演出を持つ。

**演出の流れ**: カラフルな風の粒子（Canvas2D）が EKKYO.HUB ロゴを形づくる → 着地で光る → ブランド青ロゴにくっきり収束（粒子感は消す）→ **左上ヘッダーのロゴ位置へドック** → 通常ページ（背景写真スライドショー＋見出し「面白そうを開拓せよ…」＋CTA）に着地。

**仕様**:
- 初回のみ再生（`sessionStorage 'hero-seen'`）。再訪問・`prefers-reduced-motion` はスキップして通常ページを即表示。
- 着地後のヒーローは背景写真スライドショー（`public/images/hero/` の4枚、自動切替＋Ken Burns＋インジケータ、`bg-white/80` ウォッシュ）。
- 新規ライブラリなし（Canvas2D＋framer-motion）。

**重要な注意（再発防止）**:
- オープニングのオーバーレイは **`createPortal` で `document.body` 直下**に出すこと。`app/template.tsx` の `PageTransition`（framer-motion）が全ページに `transform` を付けるため、その内側だと `position: fixed` が「ビューポート」ではなく「ページ全高」基準になり、キャンバスが縦に伸びる／歪む。ポータルで transform の外に出して解消済み。
- Canvas は**全画面・透明（`clearRect`）**にする。小さなボックス＋白フェード軌跡だと、青みが箱に溜まって「四角い画像」が見える不具合になる。風は「動いている間だけの短い流線」で表現。
- 左上ドックは実ヘッダーロゴ `header a img` の rect を測って `translate+scale`（等倍）。

関連: [[website-copy-direction]]
