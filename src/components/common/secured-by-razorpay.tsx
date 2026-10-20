import { RazorpayLogo } from "@/components/ui/razorpay-logo";

export interface SecuredByRazorpayProps {
  variant?: "footer" | "product";
  className?: string;
}

export const SecuredByRazorpay = ({
  variant = "product",
  className = "",
}: SecuredByRazorpayProps) => {
  if (variant === "footer") {
    return (
      <div
        className={`flex flex-col gap-2.5 border-t border-hero-rule/40 pt-3 font-mono text-hero-content ${className}`}
        aria-label="Payment security information"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-hero-content-muted">
            <svg
              className="size-3 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-hero-caption tracking-hero-display uppercase">
              SECURED PAYMENTS BY
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <RazorpayLogo className="h-3.5 w-auto" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-hero-caption text-hero-content-faint uppercase">
          <span>UPI // CARDS // NETBANKING</span>
          <span className="text-hero-content/40">256-BIT SSL</span>
        </div>
      </div>
    );
  }

  // Product page variant
  return (
    <div
      className={`flex flex-col gap-3 rounded border border-hero-rule/60 bg-hero-content/[0.02] p-4 font-mono text-hero-content ${className}`}
      aria-label="Razorpay secured payment guarantee"
    >
      {/* Top row: Security status + Razorpay logo */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hero-rule/30 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <svg
              className="size-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-hero-fine font-bold tracking-hero-display uppercase">
              SECURED PAYMENTS BY RAZORPAY
            </span>
            <span className="text-hero-caption text-hero-content-muted uppercase">
              100% ENCRYPTED &amp; SAFE CHECKOUT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-2">
          <RazorpayLogo className="h-4.5 w-auto" />
        </div>
      </div>

      {/* Middle row: Accepted Payment Options */}
      <div className="grid grid-cols-2 gap-2 text-hero-caption text-hero-content-muted sm:grid-cols-4">
        <div className="flex items-center gap-1.5 border border-hero-rule/30 px-2 py-1">
          <span className="text-hero-content">⚡</span>
          <span>UPI / QR</span>
        </div>
        <div className="flex items-center gap-1.5 border border-hero-rule/30 px-2 py-1">
          <span className="text-hero-content">💳</span>
          <span>ALL CARDS</span>
        </div>
        <div className="flex items-center gap-1.5 border border-hero-rule/30 px-2 py-1">
          <span className="text-hero-content">🏦</span>
          <span>NETBANKING</span>
        </div>
        <div className="flex items-center gap-1.5 border border-hero-rule/30 px-2 py-1">
          <span className="text-hero-content">📱</span>
          <span>WALLETS</span>
        </div>
      </div>

      {/* Bottom row: Trust guarantee footer */}
      <div className="flex items-center justify-between text-hero-caption text-hero-content/40 uppercase">
        <span>POWERED BY RAZORPAY</span>
        <span>256-BIT BANK GRADE ENCRYPTION</span>
      </div>
    </div>
  );
};
