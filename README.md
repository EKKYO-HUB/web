# EKKYO.HUB Web

一般社団法人 EKKYO.HUB の公式ウェブサイトです。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 14 (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) 3 |
| アニメーション | [Framer Motion](https://www.framer.com/motion/) |
| コンテンツ管理 | MDX (ポートフォリオ) / RSS (メディア) |
| ホスティング | [Vercel](https://vercel.com) |
| フォーマッタ | Prettier + prettier-plugin-tailwindcss |
| リンター | ESLint (eslint-config-next) |

## ディレクトリ構成

```
web/
├── public/
│   ├── images/
│   │   ├── hero/              # Hero 背景画像
│   │   ├── logo/              # SVG ロゴ
│   │   ├── members/           # メンバーのプロフィール画像
│   │   ├── og/                # OG 画像 (SNS シェア用)
│   │   └── portfolio/         # ポートフォリオカバー画像
│   └── robots.txt             # 検索エンジンクロール制御
├── src/
│   ├── app/
│   │   ├── layout.tsx         # ルートレイアウト (Header / Footer / フォント / メタデータ)
│   │   ├── globals.css        # Tailwind ベース + CSS カスタムプロパティ
│   │   ├── page.tsx           # トップページ
│   │   ├── contact/page.tsx   # お問い合わせフォーム (mailto 方式)
│   │   ├── media/page.tsx     # メディア一覧 (note.com RSS 自動取得)
│   │   ├── members/page.tsx   # メンバー紹介
│   │   └── portfolio/
│   │       ├── page.tsx       # ポートフォリオ一覧
│   │       └── [slug]/page.tsx # プロジェクト詳細
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx     # グローバルヘッダー (SVG ロゴ / モバイルメニュー対応)
│   │   │   └── Footer.tsx     # グローバルフッター (ロゴ / ページリンク / SNS / Contact)
│   │   └── ui/
│   │       └── AnimatedSection.tsx  # スクロール連動フェードインコンポーネント
│   ├── content/
│   │   ├── members.ts         # メンバーデータ (TypeScript)
│   │   └── portfolio/         # ポートフォリオ記事 (MDX)
│   └── lib/
│       ├── mdx.ts             # MDX ファイルの読み込み・パース
│       ├── note.ts            # note.com RSS フェッチ (ISR: 1時間)
│       └── utils.ts           # cn(), formatDate() ユーティリティ
├── .env.local                 # 環境変数 (NOTE_RSS_URL)
├── next.config.mjs            # Next.js 設定 (画像ドメイン許可など)
├── tailwind.config.ts         # カラートークン・フォント定義
├── CONTENT_GUIDE.md           # 非エンジニア向けコンテンツ更新手順
└── package.json
```

## セットアップ

### 前提条件

- Node.js 18 以上
- Yarn 1.x (`npm install -g yarn`)

### インストールと起動

```bash
# 依存パッケージのインストール
yarn install

# 開発サーバー起動 (http://localhost:3000)
yarn dev
```

### 環境変数

`.env.local` に以下を設定してください。

| 変数名 | 説明 | デフォルト値 |
|---|---|---|
| `NOTE_RSS_URL` | note.com の RSS フィード URL | `https://note.com/ekkyo_hub/rss` |

### その他のコマンド

```bash
# プロダクションビルド
yarn build

# プロダクションサーバー起動
yarn start

# リント
yarn lint
```

## ページ構成

| パス | ページ | 内容 |
|---|---|---|
| `/` | トップ | Hero, About, Portfolio プレビュー, Media プレビュー, CTA |
| `/portfolio` | ポートフォリオ一覧 | MDX から自動生成、カバー画像付き |
| `/portfolio/[slug]` | プロジェクト詳細 | 個別 MDX ファイルの内容をカバー画像付きで表示 |
| `/media` | メディア | note.com の記事を RSS で自動取得 (ISR: 1時間) |
| `/members` | メンバー紹介 | `src/content/members.ts` のデータを表示 |
| `/contact` | お問い合わせ | フォーム入力 → mailto で info@ekkyo.jp にメール |

## コンテンツの更新方法

詳細は [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) を参照してください。

### ポートフォリオの追加

`src/content/portfolio/` に `.mdx` ファイルを追加します。

```mdx
---
title: "プロジェクト名"
date: "2025-06-01"
category: "Event"
tags: ["tag1", "tag2"]
coverImage: "/images/portfolio/project-name.jpg"
summary: "一行の説明"
status: "completed"
---

## 概要

プロジェクトの詳細をここに記述します。
```

- `category`: Event / Research / Media / Workshop など任意の文字列
- `coverImage`: `public/images/portfolio/` に画像を配置し、パスを指定（省略可）
- `status`: `completed` (完了), `ongoing` (進行中), `draft` (非公開)

### メンバーの追加

`src/content/members.ts` の `members` 配列にオブジェクトを追加します。

```ts
{
  id: "taro-yamada",
  name: "山田 太郎",
  nameEn: "Taro Yamada",
  role: "メンバー",
  affiliation: ["所属1", "所属2"],
  image: "/images/members/taro-yamada.jpg",  // public/images/members/ に配置
  links: [
    { label: "Instagram", url: "https://www.instagram.com/example/" },
  ],
}
```

プロフィール画像は `public/images/members/` に配置してください。

### メディアの更新

[note.com/ekkyo_hub](https://note.com/ekkyo_hub) に記事を投稿すると、最大1時間以内にメディアページへ自動反映されます。手動操作は不要です。

## デザイントークン

`tailwind.config.ts` で定義しているカスタムカラー:

| トークン | 値 | 用途 |
|---|---|---|
| `ekkyo-accent` | `#0071B3` | メインカラー (ボタン、リンク、強調) |
| `ekkyo-accent-dark` | `#005a8f` | ホバー時のアクセントカラー |
| `ekkyo-black` | `#0a0a0a` | テキスト、背景 |
| `ekkyo-white` | `#f7f6f2` | 背景 |
| `ekkyo-gray` | `#6b7280` | サブテキスト |

Tailwind での使用例: `text-ekkyo-accent`, `bg-ekkyo-black`, `hover:bg-ekkyo-accent-dark`

## 画像フォルダ構成

```
public/images/
├── hero/                  # トップページ Hero 背景用
├── logo/                  # SVG ロゴファイル
│   └── EKKYO.HUB_横長_blue.svg
├── members/               # メンバープロフィール画像
├── og/                    # OG 画像 (SNS シェア用, 1200x630px 推奨)
│   └── OG.png
└── portfolio/             # ポートフォリオカバー画像 (16:9 推奨)
```

## デプロイ

Vercel で運用しています。GitHub リポジトリ (`EKKYO-HUB/web`) と連携済みです。

- `main` ブランチへの push で自動デプロイ
- 環境変数 `NOTE_RSS_URL` を Vercel プロジェクト設定で管理

### 検索エンジン

現在、検索エンジンへのインデックスをブロックしています。

- `public/robots.txt` で全クローラーを Disallow
- `layout.tsx` の metadata で `robots: { index: false, follow: false }` を設定

公開時にはこれらを解除してください。

### 画像ドメインの許可設定

`next.config.mjs` で note.com 関連の画像ドメインを許可しています。外部画像を追加する場合は `remotePatterns` に追記してください。

## 外部リンク

| サービス | URL |
|---|---|
| Note | https://note.com/ekkyo_hub |
| Instagram | https://www.instagram.com/ekkyo.hub/ |
| Peatix | https://ekkyo-hub.peatix.com |
| お問い合わせ | info@ekkyo.jp |

## ライセンス

Private
