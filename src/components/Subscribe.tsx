import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Download } from "lucide-react";

const BROCHURE_URL = `${window.location.origin}/brochure/DavidsHill-Brochure.pdf`;

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(5, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
    .regex(/^[+\d][\d\s().-]{4,}$/, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(254, "Email is too long"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const Subscribe = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse({ fullName, phone, email });
    if (!parsed.success) {
      const f: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!f[key]) f[key] = issue.message;
      }
      setErrors(f);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-brochure", {
        body: { ...parsed.data, brochureUrl: BROCHURE_URL },
      });

      if (error) throw error;
      const payload = data as { ok?: boolean; emailSent?: boolean; emailError?: string };

      if (payload?.ok) {
        setDone(true);
        if (payload.emailSent) {
          toast.success("Brochure sent — check your inbox.");
        } else {
          toast.success("You're on the list. Download your brochure below.");
        }
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="subscribe" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-red-gradient opacity-[0.06]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <div className="border border-border bg-card p-8 sm:p-12 lg:p-16 rounded-sm shadow-elevated">
          {done ? (
            <div className="text-center animate-fade-up">
              <CheckCircle2 className="mx-auto text-primary" size={48} strokeWidth={1.4} />
              <h2 className="mt-6 font-display text-3xl text-foreground md:text-4xl">
                Thank you, {fullName.split(" ")[0]}.
              </h2>
              <p className="mt-4 font-body text-base text-muted-foreground">
                Your brochure is on its way to <span className="text-foreground">{email}</span>.
                One of our advisors will be in touch shortly.
              </p>
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 bg-red-gradient text-primary-foreground px-7 py-3.5 rounded-sm font-body text-xs uppercase tracking-[0.28em] shadow-soft hover:opacity-90"
              >
                <Download size={16} /> Download Brochure
              </a>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <p className="eyebrow mb-4">Reserve Your Interest</p>
                <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                  Receive the David's Hill brochure.
                </h2>
                <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
                  Share your details and we'll send the complete brochure — floor plans, finishes, and pricing —
                  directly to your inbox.
                </p>
              </div>

              <form onSubmit={onSubmit} noValidate className="lg:col-span-3 space-y-5">
                <Field
                  label="Full Name"
                  id="fullName"
                  value={fullName}
                  onChange={setFullName}
                  error={errors.fullName}
                  autoComplete="name"
                  maxLength={120}
                />
                <Field
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  error={errors.phone}
                  autoComplete="tel"
                  maxLength={30}
                  placeholder="+234 ..."
                />
                <Field
                  label="Email Address"
                  id="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                  autoComplete="email"
                  maxLength={254}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-gradient text-primary-foreground py-4 rounded-sm font-body text-xs uppercase tracking-[0.28em] shadow-soft hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send Me the Brochure</>
                  )}
                </button>

                <p className="font-body text-[11px] text-muted-foreground">
                  By submitting, you consent to be contacted regarding David's Hill. We respect your privacy.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
}

const Field = ({ label, id, type = "text", value, onChange, error, autoComplete, maxLength, placeholder }: FieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete={autoComplete}
      maxLength={maxLength}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full bg-input border ${
        error ? "border-destructive" : "border-border"
      } px-4 py-3.5 font-body text-sm text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors`}
    />
    {error && (
      <p id={`${id}-error`} className="mt-2 font-body text-xs text-destructive">
        {error}
      </p>
    )}
  </div>
);

export default Subscribe;
