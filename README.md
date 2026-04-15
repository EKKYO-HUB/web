# EKKYO.HUB Web

一般社団法人 EKKYO.HUB の公式ウェブサイト（[www.ekkyo.jp](https://www.ekkyo.jp)）です。
---

## 🚀 まずはここから

サイトの内容を変更する最も簡単な方法は **GitHubブラウザで直接編集** することです。

1. このリポジトリ（[EKKYO-HUB/web](https://github.com/EKKYO-HUB/web)）にアクセス
2. 編集したいファイルを開く
3. 右上の鉛筆アイコン（✏️）をクリック
4. 編集して「**Commit changes**」をクリック
5. 数分後に [www.ekkyo.jp](https://www.ekkyo.jp) に自動反映されます

Vercel が GitHub と連携しているので、`main` ブランチに commit すると自動でビルド＆デプロイされます。

---

## 📁 何がどこにあるか

### コンテンツを編集したい時

| 変更したい場所 | 編集ファイル |
|---|---|
| **ホームページの見出し・本文** | `src/app/page.tsx` |
| **Hero の「面白そうを開拓せよ…」等** | `src/components/ui/HeroSection.tsx` |
| **ヘッダー（ロゴ・ナビリンク）** | `src/components/layout/Header.tsx` |
| **フッター（アドレス・SNS等）** | `src/components/layout/Footer.tsx` |
| **メンバー情報（追加・編集・削除）** | `src/content/members.ts` |
| **ポートフォリオ記事** | `src/content/portfolio/*.mdx` |
| **NEWS（プレスリリース）** | `src/content/press-releases/*.mdx` |
| **note記事の追加** | `src/lib/note.ts` |
| **サイト全体のタイトル・説明文** | `src/app/layout.tsx` |
| **コンタクトフォーム** | `src/app/contact/page.tsx` |

### 画像の配置場所

| 画像の種類 | フォルダ |
|---|---|
| Hero背景画像 | `public/images/hero/` |
| メンバープロフィール写真 | `public/images/members/` |
| ポートフォリオのカバー画像 | `public/images/portfolio/` |
| NEWS（プレスリリース）のカバー画像 | `public/images/press/` |
| ロゴ | `public/images/logo/` |
| OG画像（SNSシェア用） | `public/images/og/` |

**画像アップロードの注意点:**
- 推奨形式: JPG（写真）/ PNG（ロゴ・図版）
- サイズ目安: 横幅 1920px 以下、ファイルサイズ 500KB 以下に圧縮
- PNG写真は JPG に変換するとファイルサイズが大きく削減できます

---

## ✏️ よくある編集作業

### 1. メンバーを追加する

`src/content/members.ts` を開き、`members` 配列に新しいメンバーを追加します。

```ts
{
  id: "taro-yamada",              // 英数字・ハイフン（画像ファイル名と揃える）
  name: "山田 太郎",
  nameEn: "Taro Yamada",
  role: "理事 / Researcher",
  group: "board",                  // "board"（理事）または "community"（コミュニティ）
  image: "/images/members/taro-yamada.jpg",
  bio: "1995年東京都出身。〇〇大学卒業後、〇〇に従事。...",
  links: [
    { label: "Instagram", url: "https://www.instagram.com/example/" },
    { label: "Facebook", url: "https://www.facebook.com/example/" },
    { label: "Note", url: "https://note.com/example/n/xxx" },
    { label: "Website", url: "https://example.com/" },
  ],
},
```

プロフィール画像は `public/images/members/taro-yamada.jpg` に配置してください（正方形推奨、400x400px以上）。

### 2. ポートフォリオに新しいプロジェクトを追加する

`src/content/portfolio/` フォルダに `.mdx` ファイルを新規作成します。

例: `src/content/portfolio/my-project.mdx`

```mdx
---
title: "プロジェクト名"
date: "2025-06-01"
dateLabel: "2025年6月〜"
category: "Project"
tags: ["tag1", "tag2"]
coverImage: "/images/portfolio/my-project.jpg"
heroImages:
  - "/images/portfolio/my-project-1.jpg"
  - "/images/portfolio/my-project-2.jpg"
summary: "一行の概要（一覧カードに表示）"
status: "completed"
---

## 概要

プロジェクトの詳細をここに記述します。Markdown形式で書けます。

## 内容

- 箇条書き
- も使えます

## リンク

- [公式サイト](https://example.com/)
```

| フィールド | 必須 | 説明 |
|---|---|---|
| `title` | ✅ | プロジェクト名 |
| `date` | ✅ | 日付（YYYY-MM-DD 形式） |
| `dateLabel` | — | 表示用の日付（例: "2025年6月〜"） |
| `category` | ✅ | `Project`（スピンアウト） / `Summit` / `Conference` / `Fundraising` / `Event` |
| `tags` | ✅ | タグ配列 |
| `coverImage` | — | カバー画像パス |
| `heroImages` | — | 複数画像の場合、配列で指定（スライドショー表示） |
| `summary` | ✅ | 一行の概要 |
| `status` | ✅ | `completed`（完了） / `ongoing`（進行中） / `draft`（下書き非公開） |

### 3. NEWS（プレスリリース）を追加する

`src/content/press-releases/` フォルダに `.mdx` ファイルを新規作成します。

```mdx
---
title: "プレスリリースのタイトル"
date: "2025-11-15"
category: "event"
coverImage: "/images/press/my-news.jpg"
summary: "一行の概要"
status: "published"
---

## 本文

プレスリリースの詳細をここに記述します。
```

| カテゴリ | 用途 |
|---|---|
| `event` | イベント開催報告 |
| `partnership` | 提携・協賛決定 |
| `award` | 受賞 |
| `coverage` | メディア掲載 |

**外部記事を紹介したい場合:**

```yaml
externalUrl: "https://note.com/xxx/n/xxx"
```

を追加すると、カードクリックで外部サイトに直接遷移します。

### 4. note記事を手動で追加する

`src/lib/note.ts` を開き、`manualArticleUrls` 配列にURLを追加するだけです。

```ts
const manualArticleUrls: string[] = [
  "https://note.com/xxx/n/xxx",  // URLを追加するだけ
];
```

タイトル・サムネイル・説明文・著者名は自動取得されます。

### 5. ホームページのテキストを変更する

`src/app/page.tsx` の該当箇所を編集します。主な場所:

- **Hero** → `src/components/ui/HeroSection.tsx`
- **About セクション**（「問いを立て、越境し…」） → `src/app/page.tsx` の 94行目付近
- **フッター** → `src/components/layout/Footer.tsx`

---

## 🎨 デザイン変更

### カラー変更

`tailwind.config.ts` の `colors.ekkyo` を編集:

```ts
ekkyo: {
  black: "#0a0a0a",
  white: "#f7f6f2",
  gray: "#6b7280",
  accent: "#0071B3",        // メインカラー
  "accent-dark": "#005a8f",
},
```

### フォント変更

`src/app/layout.tsx` で Google Fonts をインポートしています。`Inter`, `Noto_Sans_JP`, `Montserrat` の3つを使用。`ChunkFive` は CDN から `globals.css` で読み込み。

---

## 🛠️ 開発環境のセットアップ（エンジニア向け）

### 前提条件

- Node.js 18 以上
- Yarn 1.x (`npm install -g yarn`)

### インストールと起動

```bash
yarn install
yarn dev
# → http://localhost:3000 で確認
```

### 環境変数

`.env.local` に以下を設定:

```
NOTE_RSS_URL=https://note.com/ekkyo_hub/rss
```

### コマンド一覧

```bash
yarn dev      # 開発サーバー起動
yarn build    # プロダクションビルド
yarn start    # プロダクションサーバー起動
yarn lint     # ESLintでコードチェック
```

---

## 📡 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 14 (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) 3 |
| アニメーション | [Framer Motion](https://www.framer.com/motion/) |
| コンテンツ管理 | MDX + TypeScript + note.com RSS |
| ホスティング | [Vercel](https://vercel.com) |
| ドメイン | お名前.com（DNS: dnsv.jp） |

### ディレクトリ構成

```
web/
├── public/
│   ├── images/           # 画像ファイル
│   │   ├── hero/         # Hero背景
│   │   ├── logo/         # ロゴSVG
│   │   ├── members/      # メンバー写真
│   │   ├── og/           # OG画像
│   │   ├── portfolio/    # ポートフォリオカバー
│   │   └── press/        # NEWSカバー
│   └── robots.txt        # 検索エンジン設定
├── src/
│   ├── app/              # Next.js App Router ページ
│   │   ├── page.tsx      # ホーム
│   │   ├── layout.tsx    # 共通レイアウト・メタ情報
│   │   ├── contact/      # お問い合わせ
│   │   ├── media/        # メディア一覧 + NEWS詳細
│   │   │   └── news/[slug]/  # NEWS個別ページ
│   │   ├── members/      # メンバー紹介
│   │   └── portfolio/    # ポートフォリオ
│   │       ├── page.tsx  # 一覧
│   │       ├── [slug]/   # 個別ページ（MDXから自動生成）
│   │       └── summit-2025-ueda/  # 特殊な専用ページ
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   └── ui/           # HeroSection, AnimatedSection 等
│   ├── content/
│   │   ├── members.ts    # メンバーデータ
│   │   ├── portfolio/    # ポートフォリオ記事 (MDX)
│   │   └── press-releases/  # NEWS記事 (MDX)
│   └── lib/
│       ├── mdx.ts        # MDX読み込み
│       ├── note.ts       # note.com RSS + 手動追加
│       ├── press-releases.ts
│       └── image-utils.ts  # 画像ブラープレースホルダー
├── next.config.mjs       # Next.js設定
├── tailwind.config.ts    # Tailwind設定
└── package.json
```

---

## 🚢 デプロイ

Vercel で運用しています。

- **本番URL**: https://www.ekkyo.jp
- **プレビューURL**: https://web-orpin-ten-23.vercel.app（デプロイごとに生成）
- `main` ブランチへの push で自動デプロイ
- 環境変数 `NOTE_RSS_URL` は Vercel プロジェクト設定で管理

### デプロイ確認

GitHub に push 後、[Vercel ダッシュボード](https://vercel.com) → プロジェクト → **Deployments** タブで進捗確認できます。

---

## 🔍 SEO

### 現在の設定

- サイトマップ自動生成: `/sitemap.xml`
- robots.txt: 全クローラー許可
- 構造化データ (JSON-LD): Organization + NewsArticle
- Twitter Card / OG タグ: 全ページ対応
- カノニカルURL: 設定済み

### Google Search Console

`https://search.google.com/search-console` で `www.ekkyo.jp` を登録済み。インデックスリクエストや検索パフォーマンスの確認が可能。

---

## 📞 困ったとき

- **コードが壊れた** → GitHubの該当commitから「Revert」で戻せます
- **画像が表示されない** → パスが正しいか、ファイル名に日本語やスペースが入っていないか確認
- **ビルドエラーが出る** → Vercel Deployments のエラーログを確認
- **サイトが更新されない** → ブラウザのハードリロード（Ctrl+Shift+R / Cmd+Shift+R）

---

## ライセンス

Private（一般社団法人EKKYO.HUB）
