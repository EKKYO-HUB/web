---
name: web-originals-structure
description: サイト画像・動画の元素材は web-main/originals/ に public/ と同じパス・同じ名前で置く（git 管理外）
metadata:
  type: feedback
---

サイトに載せる画像・動画の**元素材（大きいままのファイル）は `web-main/originals/` に、`public/` と同じ場所・同じ名前（拡張子だけ元のまま）で置く**。`originals/` は `.gitignore` 済みで、GitHub・Vercel には送られない。

例: `public/images/summit2026/exhibitors/tanaka-satoki.jpg` ← 元素材 `originals/images/summit2026/exhibitors/tanaka-satoki.png`

**Why:** 2026-10-25、`/Users/keys/Documents/co_ekkyo/` 直下に出展者写真・KV・動画などが40ファイル以上散らかった。整理案として「co_ekkyo 配下に summit2026_web素材/ のような大きなフォルダを作る」を出したところ、ユーザーから「このような事があるたびに配下に大きめのフォルダが作られるのはナンセンス。もともとの web-main の構造と同じように扱えないのか」と指摘され、この形に決まった。プロジェクトフォルダごとバックアップ・移行するという方針（グローバル CLAUDE.md）とも合う。

**How to apply:**
- 新しい素材が届いたら（`co_ekkyo/` 直下や `public/` に大きなまま置かれた場合も）、`originals/` の対応する場所へ移し、軽く変換したもの（画像は sips で JPEG・横1920px 程度、出展者写真は 900px）を `public/` に入れる。
- イベントごと・用途ごとの新しい素材フォルダは作らない。置き場所は常に「public/ と同じパス」。
- サイトに載せない資料（チラシPDF、ロゴ一式、メール、他案件）は従来どおり `co_ekkyo/` に置く。
- コードのコメントやメモリに元素材の場所を書くときは `originals/...` の相対パスで書く。
- 関連: [[summit-2026-mamire-effects]]
- **画像を差し替えるときは必ず新しいファイル名にする**（例: `summit-2026-biwako.jpg` → `summit-2026-biwako-group.jpg`）。`next.config` で画像を `max-age=31536000, immutable`（最適化画像も minimumCacheTTL 1年）で配信しているため、同じ名前で上書きすると、一度見たブラウザは古い画像を出し続ける（2026-10-25、ポートフォリオの集合写真で実際に起きた）。元素材も `originals/` で同じ新しい名前にそろえる。
