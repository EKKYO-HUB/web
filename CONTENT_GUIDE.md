# コンテンツ更新ガイド

非エンジニア向けのコンテンツ更新手順です。

## ポートフォリオの追加・編集方法

ポートフォリオのプロジェクトは `src/content/portfolio/` フォルダ内の `.mdx` ファイルで管理しています。

### 新しいプロジェクトを追加する

1. GitHub で `src/content/portfolio/` フォルダを開く
2. 「Add file」→「Create new file」をクリック
3. ファイル名を `プロジェクト名.mdx`（英数字・ハイフンで）とする
4. 以下のテンプレートをコピーして内容を編集する

```
---
title: "プロジェクトタイトル"
date: "2025-06-01"
category: "Event"
tags: ["tag1", "tag2"]
coverImage: "/images/portfolio/ファイル名.jpg"
summary: "一行の概要（カードに表示されます）"
status: "completed"
---

## 概要

ここにプロジェクトの詳細を書きます。
```

5. 「Commit changes」→「Commit directly to the `main` branch」で保存
6. 数分でサイトに反映されます（Vercel が自動デプロイ）

### カバー画像を追加する

1. GitHub で `public/images/portfolio/` フォルダを開く
2. 「Add file」→「Upload files」をクリック
3. 画像ファイルをアップロード（16:9 の比率、1200x675px 程度推奨）
4. MDX ファイルの `coverImage` に `/images/portfolio/ファイル名.jpg` を指定

### 既存プロジェクトを編集する

1. `src/content/portfolio/` フォルダから編集したいファイルを開く
2. 右上の鉛筆アイコン（Edit）をクリック
3. 内容を編集して「Commit changes」

### フィールドの説明

| フィールド | 必須 | 説明 |
|---|---|---|
| `title` | はい | プロジェクト名 |
| `date` | はい | 日付（YYYY-MM-DD 形式） |
| `category` | はい | カテゴリ（Event / Conference / Research / Media / Workshop / Fundraising など） |
| `tags` | はい | タグの配列（例: `["summit", "fukuoka"]`） |
| `coverImage` | いいえ | カバー画像のパス（省略するとテキストのみ表示） |
| `summary` | はい | 一行の概要（一覧カードに表示） |
| `status` | はい | `completed`（完了）/ `ongoing`（進行中）/ `draft`（非公開） |

## メンバーの追加

メンバーデータは `src/content/members.ts` で管理しています。

1. GitHub で `src/content/members.ts` を開く
2. 鉛筆アイコン（Edit）をクリック
3. `members` 配列に新しいメンバーを追加する

```ts
{
  id: "taro-yamada",           // 英数字・ハイフン (画像ファイル名にも使用)
  name: "山田 太郎",
  nameEn: "Taro Yamada",
  role: "メンバー",
  affiliation: [
    "〇〇大学 〇〇学部",
    "一般社団法人EKKYO.HUB メンバー",
  ],
  image: "/images/members/taro-yamada.jpg",
  links: [
    { label: "Instagram", url: "https://www.instagram.com/example/" },
    { label: "Facebook", url: "https://www.facebook.com/example/" },
  ],
},
```

4. プロフィール画像を `public/images/members/` にアップロード（正方形推奨、400x400px 以上）
5. 「Commit changes」で保存

## メディアの更新

メディアページは [note.com/ekkyo_hub](https://note.com/ekkyo_hub) の記事を自動で取得・表示しています。
note に記事を投稿するだけで、最大1時間以内にサイトのメディアページに反映されます。
特別な操作は不要です。

## お問い合わせフォーム

お問い合わせページ (`/contact`) のフォームは、送信ボタンを押すとユーザーのメールアプリが開き、info@ekkyo.jp 宛のメールが作成される方式です。

用件の選択肢を変更したい場合は `src/app/contact/page.tsx` の `subjectOptions` 配列を編集してください。

## デプロイについて

GitHub の `main` ブランチにファイルを追加・編集すると、Vercel が自動的にサイトを更新します。通常、数分以内に反映されます。
