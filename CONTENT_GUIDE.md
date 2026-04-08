# コンテンツ更新ガイド

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
category: "Event"          # Event / Research / Media / Workshop など
tags: ["tag1", "tag2"]
summary: "一行の概要（カードに表示されます）"
status: "completed"        # completed / ongoing / draft（draftは非表示）
---

## 概要

ここにプロジェクトの詳細を書きます。

```

5. 「Commit changes」→「Commit directly to the `main` branch」で保存
6. 数分でサイトに反映されます

### 既存プロジェクトを編集する

1. `src/content/portfolio/` フォルダから編集したいファイルを開く
2. 右上の鉛筆アイコン（Edit）をクリック
3. 内容を編集して「Commit changes」

## メディアの更新

メディアページは [note.com/ekkyo_hub](https://note.com/ekkyo_hub) の記事を自動で取得・表示しています。  
note に記事を投稿するだけで、1時間以内にサイトのメディアページに反映されます。  
特別な操作は不要です。
