import { redirect } from "next/navigation";

/* EKKYO.SUMMIT 2025 のポートフォリオは体験型アーカイブサイトへ遷移する。
   （旧・開催概要ページの内容は /summit/2025 の「宣言」オーバーレイに集約済み） */
export default function Summit2025Page() {
  redirect("/summit/2025");
}
