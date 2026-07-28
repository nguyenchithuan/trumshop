"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { Language } from "@/features/home/components/HomePage";

const sparks = [
  ["-104px", "-120px", "#62e7df", "0ms"], ["-38px", "-152px", "#8dacff", "70ms"], ["48px", "-136px", "#f1bb70", "120ms"], ["116px", "-83px", "#d79cff", "40ms"],
  ["135px", "-9px", "#77d8ff", "150ms"], ["85px", "66px", "#65e4ad", "80ms"], ["13px", "110px", "#ffe08a", "20ms"], ["-72px", "84px", "#ab9bff", "110ms"],
  ["-132px", "30px", "#ff9db0", "150ms"], ["-148px", "-44px", "#63dbff", "50ms"], ["-5px", "-185px", "#fff0b1", "100ms"], ["178px", "-118px", "#7eecdb", "130ms"],
] as const;

interface QuickContactWidgetProps { readonly language: Language; }

export default function QuickContactWidget({ language }: QuickContactWidgetProps) {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const text = language === "vi"
    ? { title: "Để TrumShop liên hệ lại", lead: "Để lại email hoặc số điện thoại, chúng mình sẽ phản hồi sớm.", label: "Email hoặc số điện thoại", placeholder: "vd. 0901 234 567", submit: "Nhận liên hệ", close: "Đóng form liên hệ", invalid: "Nhập email hoặc số điện thoại hợp lệ nhé.", trigger: "Mở form liên hệ nhanh" }
    : { title: "Let TrumShop contact you", lead: "Leave your email or phone number and we will get back to you soon.", label: "Email or phone number", placeholder: "e.g. name@example.com", submit: "Request contact", close: "Close contact form", invalid: "Please enter a valid email or phone number.", trigger: "Open quick contact form" };

  useEffect(() => {
    if (!celebrating) return;
    const timeout = window.setTimeout(() => setCelebrating(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [celebrating]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = value.replace(/[^\d]/g, "").length >= 8;
    if (!isEmail && !isPhone) { setError(text.invalid); return; }
    setContact("");
    setError("");
    setOpen(false);
    setCelebrating(true);
  };

  return <div className="quick-contact-widget">
    {open && <form className="quick-contact-popover" onSubmit={submit}>
      <button className="quick-contact-close" type="button" aria-label={text.close} onClick={() => setOpen(false)}>×</button>
      <span className="quick-contact-mini-icon" aria-hidden="true"><RobotIcon /></span>
      <h2>{text.title}</h2><p>{text.lead}</p>
      <label htmlFor="quick-contact-value">{text.label}</label>
      <input autoFocus id="quick-contact-value" inputMode="email" onChange={(event) => { setContact(event.target.value); setError(""); }} placeholder={text.placeholder} value={contact} />
      {error && <span className="quick-contact-error" role="alert">{error}</span>}
      <button className="quick-contact-submit" type="submit">{text.submit}<span>↗</span></button>
    </form>}
    <button className="quick-contact-trigger" type="button" aria-expanded={open} aria-label={text.trigger} onClick={() => setOpen((value) => !value)}><RobotIcon /></button>
    {celebrating && <div className="contact-fireworks" aria-hidden="true"><span className="firework-halo" />{sparks.map(([x, y, color, delay], index) => <i key={index} style={{ "--spark-x": x, "--spark-y": y, "--spark-color": color, "--spark-delay": delay } as CSSProperties} />)}</div>}
  </div>;
}

function RobotIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 5v4M12 5h8M8.5 12h15A2.5 2.5 0 0 1 26 14.5v9A2.5 2.5 0 0 1 23.5 26h-15A2.5 2.5 0 0 1 6 23.5v-9A2.5 2.5 0 0 1 8.5 12Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M6 17H3.5M28.5 17H26M12 19h.01M20 19h.01M12 23h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>;
}
