"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ContactModal.module.scss";
import { useMask } from "@react-input/mask";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Errors = Partial<Record<"name" | "phone" | "email" | "agree", string>>;

export function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  const emailRe = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const phoneRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function validate(): boolean {
    const next: Errors = {};

    if (!name.trim()) next.name = "Введите имя";
    if (!phone.replace(/\D/g, "")) next.phone = "Введите телефон";
    if (!email.trim()) next.email = "Введите e-mail";
    else if (!emailRe.test(email.trim())) next.email = "Некорректный e-mail";
    if (!agree) next.agree = "Нужно согласие на обработку данных";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    console.log({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      agree,
    });
    onClose();
    setName("");
    setPhone("");
    setEmail("");
    setAgree(false);
  }

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <div className="t-contact-header">СВЯЗАТЬСЯ С НАМИ</div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.formContent}>
            <div className={styles.labels}>
              <label className={styles.field}>
                <input
                  className={`t-text ${styles.input} ${errors.name ? styles.inputError : ""}`}
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className={styles.err}>{errors.name}</div>}
              </label>
              <label className={styles.field}>
                <input
                  ref={phoneRef}
                  className={`t-text ${styles.input} ${errors.phone ? styles.inputError : ""}`}
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <div className={styles.err}>{errors.phone}</div>
                )}
              </label>

              <label className={styles.field}>
                <input
                  className={`t-text ${styles.input} ${errors.email ? styles.inputError : ""}`}
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className={styles.err}>{errors.email}</div>
                )}
              </label>
            </div>
            <div>
              <label className={styles.agree}>
                {agree}
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span className={styles.checkboxWrap}></span>
                <span className={`t-caption ${styles.agreeMessage}`}>
                  Я согласен(-а) на обработку персональных данных
                </span>
              </label>
              {errors.agree && <div className={styles.err}>{errors.agree}</div>}
            </div>
          </div>

          <button
            type="submit"
            className={`highlightedButton ${styles.submit}`}
          >
            <span className="t-link absolute">Отправить</span>
            <span className="t-link">Отправить</span>
          </button>
        </form>
      </div>
    </div>
  );
}
