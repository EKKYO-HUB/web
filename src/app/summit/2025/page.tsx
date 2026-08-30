import Field from "./Field";
import { WORKSHOPS } from "@/content/summit2025";

export default function Summit2025ArchivePage() {
  return (
    <>
      <Field />
      {/* 検索エンジン・スクリーンリーダー用の静的な導線 */}
      <nav aria-label="ワークショップ一覧" className="sr-only">
        <h2>EKKYO.SUMMIT 2025 in 信州上田 — ワークショップの記録</h2>
        <ul>
          {WORKSHOPS.map((w) => (
            <li key={w.slug}>
              <a href={`/summit/2025/${w.slug}`}>{w.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
