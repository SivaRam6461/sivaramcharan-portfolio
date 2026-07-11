/* ============================================================
   components/Contact/Contact.jsx
   Two-column layout: contact info links + validated form.

   Submissions are sent via EmailJS directly to personalInfo.email —
   no backend needed. Requires VITE_EMAILJS_* vars in .env; see
   EMAILJS_SETUP.md in this folder for setup instructions.
   ============================================================ */

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Reveal } from '../Reveal/Reveal';
import Toast from '../Toast/Toast';
import { personalInfo } from '../../data/portfolioData';
import './Contact.css';

/* .trim() guards against stray whitespace (e.g. a tab pasted into a
   Vercel env var), which otherwise makes EmailJS reject the key as invalid. */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

/* SVG icons */
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');

  /* Update a single field and clear its error */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* Validate all fields and return error map */
  const validate = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email is required';
    if (form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setToastType('error');
      setToastMessage('Email isn\'t configured yet — see EMAILJS_SETUP.md.');
      setShowToast(true);
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      setToastType('success');
      setToastMessage("Message sent! I'll get back to you within 24 hours.");
      setShowToast(true);
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setToastType('error');
      setToastMessage('Something went wrong sending your message — please try again or email me directly.');
      setShowToast(true);
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' });
    setErrors({});
    setSent(false);
  };

  return (
    <section id="contact">
      <div className="section">

        {/* ── Left: contact info ── */}
        <Reveal direction="left" className="contact-info">
          <span className="section-label">Let's build something</span>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <h3>Let's connect</h3>
          <p>
            I'm currently open to full-time roles, freelance projects, and
            collaborations. Drop me a message and I'll get back to you
            within 24 hours!
          </p>

          {/* Contact method rows */}
          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <div className="contact-link-icon email">✉️</div>
              <div className="contact-link-text">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-val">{personalInfo.email}</span>
              </div>
            </a>

            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon github"><GithubIcon /></div>
              <div className="contact-link-text">
                <span className="contact-link-label">GitHub</span>
                <span className="contact-link-val">github.com/SivaRam6461</span>
              </div>
            </a>

            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon linkedin"><LinkedinIcon /></div>
              <div className="contact-link-text">
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-val">linkedin.com/in/siva-ram-charan-934590317</span>
              </div>
            </a>
          </div>
        </Reveal>

        {/* ── Right: form or success message ── */}
        <Reveal direction="right">

          {/* Success state */}
          <div
            className={`contact-form form-success ${sent ? 'show' : ''}`}
            role="status"
            aria-live="polite"
          >
            <div className="success-icon" aria-hidden="true">🎉</div>
            <h4>Message Sent!</h4>
            <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
            <button className="btn-ghost" style={{ marginTop: 8 }} onClick={handleReset}>
              Send another
            </button>
          </div>

          {/* Contact form — hidden once sent */}
          {!sent && (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              {/* Name field */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <div id="name-error" className={`form-error ${errors.name ? 'show' : ''}`} role="alert">
                  {errors.name}
                </div>
              </div>

              {/* Email field */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <div id="email-error" className={`form-error ${errors.email ? 'show' : ''}`} role="alert">
                  {errors.email}
                </div>
              </div>

              {/* Message field */}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <div id="message-error" className={`form-error ${errors.message ? 'show' : ''}`} role="alert">
                  {errors.message}
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={sending} aria-busy={sending}>
                {sending ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </Reveal>

      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
