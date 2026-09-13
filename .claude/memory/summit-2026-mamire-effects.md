---
name: summit-2026-mamire-effects
description: /summit/2026「まみれろ」の演出の仕組みと調整ポイント（スクロール汚れ・藍色写真・ムービー・タイムテーブル）
metadata:
  type: project
---

`/summit/2026` の演出は次の4つ。いずれも `src/components/summit2026/` にあり、見た目の数値は `src/app/globals.css` の「SUMMIT 2026 専用スタイル」に集約。

- **スクロールで画面がまみれていく** — `MamireDirt.tsx`（body直下へポータルした fixed 層、**z-index −10 ＝ コンテンツの下**。ページ根は `bg-transparent`、地の色は `<style>body{background:#E6EDEA}</style>` とこの層の bg が担う）。文字・ボタン・写真は常に汚れの上に乗るので可読性は落ちない（ユーザー要望 2026-09-11「文字が読みづらくなるのは避けたい」）。進行度 `--mamire-dirt` = ((scrollY − 0.6vh) / (総高 − vh))^1.6 を要素styleに直書き。3層＝粒子 `.mamire-dirt__grain`（0.06→0.36、位置を steps で揺らす）／泥の染み `.mamire-dirt__mud`（0→0.72、scrollY×−0.12 で流れる）／縁 `.mamire-dirt__edge`（0→0.6 の radial）。すべて `mix-blend-mode: multiply`。半透明背景のセクション（`bg-mamire-water/40`）には透けて見え、不透明背景（KV・水底の締め）には出ない。**強さを変えるときは globals.css の係数、進み方を変えるときは MamireDirt の指数**。
- **藍色＋粒子の写真、触れた位置から波紋で原色に戻る** — `AiPhoto.tsx`。下＝SVG フィルタ `#mamire-ai`（feColorMatrix デュオトーン 影#10305A→光#DCE6EC ＋ feTurbulence 粒子を overlay）を掛けた `<Image>`、上＝原色 `<Image>` を `clip-path: circle(0%→150% at var(--rx) var(--ry))` でポインタ位置から広げる（1s）。`.ai-photo__wave` の ::before/::after が輪を2重に走らせる（`ai-ripple`）。ホバーで `hover`、クリックで `locked` トグル（タップ端末）。フィルタ定義 `<AiPhotoDefs/>` はページに1回だけ置く。集合写真（主催）は原色のまま＝AiPhoto を通さない。参考: wired.jp/article/wired-futures-conference/。
- **コンセプトムービー** — `ConceptMovie.tsx`。`public/videos/summit2026/concept.mp4`（元素材 `/Users/keys/Documents/co_ekkyo/EKKYO.SUMMIT2026.mp4` 1080p/40MB を ffmpeg-static で 720p crf30 → 6.3MB）。画面に入ると消音自動再生（IntersectionObserver）、操作は 再生／音を出す／全画面／YouTubeで観る（https://youtu.be/UWFbagO2SpU）。ポスター `public/images/summit2026/concept-poster.jpg`。ffmpeg は brew 不可（Xcode CLT 未導入）のため npm `ffmpeg-static` を scratchpad に入れて使う。
- **タイムテーブル／出展者** — `Timetable.tsx` はカレンダー型（縦＝時間 15分/行、横＝同時開催。重なりクラスタごとにレーンを割り当て 60分割グリッドで等分。狭い画面は min-width 620px の横スクロール）。ユーザー要望「同時開催は文字でなく配置で分かるように」。`Exhibitors.tsx` は PROGRAMS の出展者を重複なくまとめた一覧（担当プログラム＋`desc` は details、`image` があれば AiPhoto）。旧 ProgramList（タイムテーブルと重複）は削除。データは `src/content/summit2026.ts` の `PROGRAMS` 一本（`SCHEDULE` は自動生成）。出典は運営のワークショップマスタ（Google スプレッドシート ID `1ZTHoJPjsch7mnnBzla364ZpvMdQYq9NZIvcv3PuOiW8`、Drive コネクタで読める）。**掲載してよいのは 名称・日付・時間・会場・出展者・企画内容 のみ。「EKKYO担当者／掲載不要」列と他シート（予算・宿・連絡先・体制）は絶対に掲載しない。** 出展者写真は未提供（`image` を足せば藍色演出で出る）。
- **タイムテーブルの詳細** — `pinRight: true` のプログラム（quick=終日展示）は常に右端レーン。空きレーンがあれば右へ広がる（A PASSING BODY は3レーン幅）。枠の左線は無し（ユーザー指摘）。枠クリックで `ProgramDialog.tsx`（土台は共通の `MamireDialog.tsx`＝body へポータル、水底の幕＋紙の一枚がぼけから浮上、Esc/幕クリックで閉じる、`.mamire-dialog`、泥の一滴 `MudMark`）。出展者カードも同じ土台で `Exhibitors.tsx` 内の ExhibitorDialog（写真・プログラム一覧・ひとこと・プロフィールを担当プログラムから集約）。概略図 `public/images/summit2026/timetable-overview.jpg`（元 `/Users/keys/Documents/co_ekkyo/timetable.png`）を `mix-blend-multiply` でグリッドの上に置く。
- **到着演出の読み込みゲート** — `SummitHero.tsx`（client）が KV画像 load ＋ `document.fonts.ready`（最長4s）を待ってから `#top.is-ready` を付与。CSS 側は `#top:not(.is-ready)` で KV寄り／ベール／ロックアップを `animation-play-state: paused`、揺らぎ filter を none に。SMIL（`#mamire-sway-anim`、ロゴ結像 `#mamire-intro-scale/#mamire-intro-blur`）は `begin="indefinite"` にして `beginElement()` で同時開始、ループは `begin="mamire-intro-scale.end"`。揺らぎ終了後（5.8s）は `.mamire-water-sway` クラスを外して描画コスト0。旧 ArrivalVeil.tsx は SummitHero に統合。ユーザー要望「ロードしきってから表示」。
- **ヘッダー** — `SummitHeader.tsx` は client。ロゴは `ekkyo-summit-2026-nodate.svg`（日付なし版、元 `/Users/keys/Documents/co_ekkyo/logo_日付なし.svg`）を brightness-0 で黒く表示。到着時（scrollY < 0.7vh）は `-translate-y-full` で隠し、ヒーローを抜けると滑り込む（ユーザー要望「最初はバナー無し」）。
- **申し込みボタンの濁り** — `.mamire-cta` ＝ `color-mix(in srgb, #EB5505, #5A4632 calc(var(--mamire-dirt)*72%))`。`--mamire-dirt` は MamireDirt が `html` にも書く。ヘッダー／追従／末尾の3か所すべてこのクラス。
- **出展者写真** — `/Users/keys/Documents/co_ekkyo/1-1_名前.png`（1080px正方形）→ sips で 900px JPEG → `public/images/summit2026/exhibitors/<slug>.jpg`。`EXHIBITOR_IMAGES`（名前→パス）に登録すれば、出展者一覧・ポップアップの両方に出る。プログラム側は `by`（表示文字列）／`coop`（協力）／`people`（個人名配列、写真キー）。2026-09-13 時点 14名分あり。出展者フォーム回答（掲載可と明記されたシート）から 企画趣旨・プロフィール・ひとこと・参加にあたって を `desc/profile/message/note` に転記（平野・佐藤・琴川さくら・琴川夕星・竹本・駒井）。駒井は本人希望で「フィッシャーアーキテクト 駒井健也」表記。運営メンバー（田中律羽・鈴木智也・大屋太亮）は `EXTRA_EXHIBITORS`。
- **チラシの見せ方** — `.mamire-paper`＝SVG data-URI を `mask-image` に使い、radialGradient（外周が透ける）＋feDisplacementMap（縁の揺れ）を **マスク側だけ** に与える。中身は歪まず・回転もしない（ユーザー指摘「中身が歪んで読めない／傾け不要」）。
- **チラシ** — `SUMMIT2026_チラシ.pdf` は 25MB・2ページ。PDF圧縮ツールがこのMacに無い（gs/qpdf/mutool/magick なし）ため同梱せず、`FLYER_URL`（Drive などの外部URL）を入れる方式。1ページ目のプレビュー `flyer-p1.jpg` は同梱済み（開催概要の下）。
- **FAQ** — `Faq.tsx`（`<details>` アコーディオン）、データ `FAQ`。2025 STUDIOサイトのFAQを下敷きに、1日券/通し券・20〜30代・永原駅集合へ更新。
- **見出しの区切り** — 罫線は「AIっぽい」との指摘で廃止。`SectionTitle` の下に泥の一滴（SVG path＋`#mamire-mud-mark` の feDisplacementMap）を置く。
- **集合場所** — JR湖西線・永原駅（2026-09-11 決定）。開催概要・アクセス・FAQ・JSON-LD・地図リンクすべて永原駅。

**Why:** 「水、だが、そこに汚れがある」を体験化するため。スクロール＝水底へ沈むほど汚れる、写真＝汚れを拭うと人の色が戻る、という一貫したメタファー。
**How to apply:** 新しい写真は `AiPhoto` を通す。データ確定時は `summit2026.ts` のみ差し替え。演出を強める/弱める要望は globals.css の係数で対応し、コンポーネントの構造は変えない。関連: [[design-no-ai-tells]] [[summit-2026-redesign-plan]]
