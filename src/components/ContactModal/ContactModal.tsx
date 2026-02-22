"use client";

import { useEffect, useMemo, useState } from "react";
import InputMask from "react-input-mask";
import styles from "./ContactModal.module.scss";

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

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    // запрет прокрутки под модалкой
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

    // по ТЗ: просто вывести в консоль и закрыть
    onClose();
  }

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <div className={styles.title}>СВЯЗАТЬСЯ С НАМИ</div>
          <button className={styles.close} onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <label className={styles.field}>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className={styles.err}>{errors.name}</div>}
          </label>

          <label className={styles.field}>
            {/* <InputMask
              mask="+7 (999) 999-99-99"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                  placeholder="Телефон"
                />
              )}
            </InputMask> */}
            {errors.phone && <div className={styles.err}>{errors.phone}</div>}
          </label>

          <label className={styles.field}>
            <input
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className={styles.err}>{errors.email}</div>}
          </label>

          <label className={styles.agree}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>Я согласен(-а) на обработку персональных данных</span>
          </label>
          {errors.agree && <div className={styles.err}>{errors.agree}</div>}

          <button className={styles.submit} type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}