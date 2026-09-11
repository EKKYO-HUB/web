---
name: summit-2026-mamire-effects
description: /summit/2026「まみれろ」の演出の仕組みと調整ポイント（スクロール汚れ・藍色写真・ムービー・タイムテーブル）
metadata:
  type: project
---

`/summit/2026` の演出は次の4つ。いずれも `src/components/summit2026/` にあり、見た目の数値は `src/app/globals.css` の「SUMMIT 2026 専用スタイル」に集約。

- **スクロールで画面がまみれていく** — `MamireDirt.tsx`（body直下へポータルした fixed オーバーレイ、z-30）。進行度 `--mamire-dirt` = ((scrollY − 0.6vh) / (総高 − vh))^1.6 を要素styleに直書き。3層＝粒子 `.mamire-dirt__grain`（0.06→0.36、位置を steps で揺らす）／泥の染み `.mamire-dirt__mud`（0→0.62、scrollY×−0.12 で流れる）／縁 `.mamire-dirt__edge`（0→0.6 の radial）。すべて `mix-blend-mode: multiply`。**強さを変えるときは globals.css の係数、進み方を変えるときは MamireDirt の指数**。
- **藍色＋粒子の写真、ホバーで原色に戻る** — `AiPhoto.tsx`。原色 `<Image>` の上に同画像へ SVG フィルタ `#mamire-ai`（feColorMatrix デュオトーン 影#10305A→光#DCE6EC ＋ feTurbulence 粒子を overlay）を掛けた層を重ね、`clip-path: inset(100% 0 0 0)` で上→下へ剥がす（0.8s）。タップ端末はクリックで `is-color` トグル。フィルタ定義 `<AiPhotoDefs/>` はページに1回だけ置く。参考: wired.jp/article/wired-futures-conference/（あちらはモノクロJPEGを事前生成して clip-path で切替）。
- **コンセプトムービー** — `ConceptMovie.tsx`。`public/videos/summit2026/concept.mp4`（元素材 `/Users/keys/Documents/co_ekkyo/EKKYO.SUMMIT2026.mp4` 1080p/40MB を ffmpeg-static で 720p crf30 → 6.3MB）。画面に入ると消音自動再生（IntersectionObserver）、操作は 再生／音を出す／全画面／YouTubeで観る（https://youtu.be/UWFbagO2SpU）。ポスター `public/images/summit2026/concept-poster.jpg`。ffmpeg は brew 不可（Xcode CLT 未導入）のため npm `ffmpeg-static` を scratchpad に入れて使う。
- **タイムテーブル** — `Timetable.tsx`。Config（config.figma.com/…/agenda）風の最小構成＝日付タブ→時刻｜内容リスト。データは `src/content/summit2026.ts` の `SCHEDULE`（**2026-09-11時点は仮置き**）。担当者 `WORKSHOP_HOSTS` も仮置き（理事の写真で表現確認中）。

**Why:** 「水、だが、そこに汚れがある」を体験化するため。スクロール＝水底へ沈むほど汚れる、写真＝汚れを拭うと人の色が戻る、という一貫したメタファー。
**How to apply:** 新しい写真は `AiPhoto` を通す。データ確定時は `summit2026.ts` のみ差し替え。演出を強める/弱める要望は globals.css の係数で対応し、コンポーネントの構造は変えない。関連: [[design-no-ai-tells]] [[summit-2026-redesign-plan]]
