---
name: summit-2026-redesign-plan
description: /summit/2026 を博報堂HR/hakusuku参考に編集的デザインへ引き上げる計画（素材待ち）
metadata:
  type: project
---

EKKYO.SUMMIT 2026 ページ（[/summit/2026](../../src/app/summit/2026/page.tsx)）を、参考サイト（hakuhodo.co.jp/hr、hakusuku.jp/recruit）の水準＝**大胆なタイポ・大判ビジュアル・広い余白・スクロール演出**へ引き上げる計画。

**状況（2026-06-30時点）**: ユーザーは「**素材が揃ってから着手**」を希望。今回はコード変更なし。提供予定の素材＝①キービジュアル（画像/動画）②過去SUMMITの高解像度写真 ③会場（琵琶湖・米原）写真。追加キャッチコピーの提供は予定なし。

**トーン方針（おまかせ→以下を提案済み）**: ブランド青（`ekkyo-accent #0071B3`）を主役に保ちつつ、雰囲気/背景写真は**ブランド青のダブルトーンで統一**して洗練感を出し、人物・表情やヒーローは**カラー**で残す（EKKYOの人間味・カオス感を消さない）。純グレースケールは避ける。

**着手時にやること**: ヒーローにKV差し込み、SUMMITページにスクロール表示アニメ追加（現状トップのみ）、「これまでの記録」写真ギャラリー追加（PDF p.5「あらゆる姿」の構成）、タイポ/余白の編集的強化。eyebrowは引き続き不使用（[[design-no-ai-tells]]）。

**素材の置き場（予定）**: KV=`public/images/summit-2026/`、ギャラリー=`public/images/summit-2026/gallery/`、会場=`public/images/summit-2026/venue/`。
