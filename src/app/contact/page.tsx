"use client";

import { useState } from "react";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";

const subjectOptions = [
  "イベント・プロジェクトに関するお問い合わせ",
  "協賛・スポンサーに関するお問い合わせ",
  "メディア・取材に関するお問い合わせ",
  "その他",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    subject: subjectOptions[0],
    name: "",
    organization: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = [
      `【ご用件】${form.subject}`,
      `【お名前】${form.name}`,
      form.organization ? `【ご所属】${form.organization}` : "",
      `【メールアドレス】${form.email}`,
      "",
      `【お問い合わせ内容】`,
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = `mailto:info@ekkyo.jp?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-12">
      <AnimatedSection>
        <div className="mb-16">
          <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
            CONTACT
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            お問い合わせ
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ekkyo-gray">
            EKKYO.HUBへのお問い合わせは、以下のフォームにご記入ください。
            <br />
            送信ボタンを押すとメールアプリが開きます。
          </p>
        </div>
      </AnimatedSection>

      <form onSubmit={handleSubmit}>
        {/* ご用件 */}
        <AnimatedSection delay={0.05}>
          <div className="border-t border-black/10 py-8 sm:grid sm:grid-cols-[200px_1fr] sm:items-center sm:gap-8">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium sm:mb-0"
            >
              ご用件
              <span className="ml-1 text-[10px] text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full appearance-none bg-gray-100 px-4 py-3 text-sm outline-none transition-colors focus:bg-gray-50 focus:ring-2 focus:ring-ekkyo-accent/20"
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </AnimatedSection>

        {/* お名前 */}
        <AnimatedSection delay={0.1}>
          <div className="border-t border-black/10 py-8 sm:grid sm:grid-cols-[200px_1fr] sm:items-center sm:gap-8">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium sm:mb-0"
            >
              お名前
              <span className="ml-1 text-[10px] text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="山田 太郎"
              className="w-full bg-gray-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:bg-gray-50 focus:ring-2 focus:ring-ekkyo-accent/20"
            />
          </div>
        </AnimatedSection>

        {/* ご所属 */}
        <AnimatedSection delay={0.15}>
          <div className="border-t border-black/10 py-8 sm:grid sm:grid-cols-[200px_1fr] sm:items-center sm:gap-8">
            <label
              htmlFor="organization"
              className="mb-2 block text-sm font-medium sm:mb-0"
            >
              ご所属
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              value={form.organization}
              onChange={handleChange}
              placeholder="株式会社〇〇 / 〇〇大学"
              className="w-full bg-gray-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:bg-gray-50 focus:ring-2 focus:ring-ekkyo-accent/20"
            />
          </div>
        </AnimatedSection>

        {/* メールアドレス */}
        <AnimatedSection delay={0.2}>
          <div className="border-t border-black/10 py-8 sm:grid sm:grid-cols-[200px_1fr] sm:items-center sm:gap-8">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium sm:mb-0"
            >
              メールアドレス
              <span className="ml-1 text-[10px] text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="w-full bg-gray-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:bg-gray-50 focus:ring-2 focus:ring-ekkyo-accent/20"
            />
          </div>
        </AnimatedSection>

        {/* お問い合わせ内容 */}
        <AnimatedSection delay={0.25}>
          <div className="border-t border-black/10 py-8 sm:grid sm:grid-cols-[200px_1fr] sm:items-start sm:gap-8">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium sm:mb-0 sm:pt-3"
            >
              お問い合わせ内容
              <span className="ml-1 text-[10px] text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={8}
              placeholder="お問い合わせ内容をご記入ください"
              className="w-full resize-y bg-gray-100 px-4 py-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-gray-400 focus:bg-gray-50 focus:ring-2 focus:ring-ekkyo-accent/20"
            />
          </div>
        </AnimatedSection>

        {/* 注意書き + 送信ボタン */}
        <AnimatedSection delay={0.3}>
          <div className="border-t border-black/10 pt-8">
            <p className="mb-2 text-xs leading-relaxed text-ekkyo-gray">
              <span className="text-red-500">*</span>{" "}
              は必須項目です。送信ボタンを押すとメールアプリが起動します。
            </p>
            <p className="mb-8 text-xs leading-relaxed text-ekkyo-gray">
              メールアプリが開かない場合は、お手数ですが{" "}
              <a
                href="mailto:info@ekkyo.jp"
                className="text-ekkyo-accent underline underline-offset-2"
              >
                info@ekkyo.jp
              </a>{" "}
              へ直接ご連絡ください。
            </p>
            <button
              type="submit"
              className="group inline-flex items-center gap-3 bg-ekkyo-accent px-12 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-ekkyo-accent-dark"
            >
              送信する
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        </AnimatedSection>
      </form>
    </div>
  );
}
