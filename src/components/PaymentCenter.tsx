import { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export default function PaymentCenter() {
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [amount, setAmount] = useState('5.00');
  const [captureStatus, setCaptureStatus] = useState('');
  const returnedOrder = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    if (!returnedOrder) return;
    let cancelled = false;
    fetch(`${API}/v1/payments/paypal/orders/${encodeURIComponent(returnedOrder)}/capture`, { method: 'POST' })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.detail ?? 'Capture could not be verified.'); return data; })
      .then(data => { if (!cancelled) setCaptureStatus(data.status === 'COMPLETED' ? 'PayPal Sandbox confirms this test capture is completed.' : 'PayPal has not confirmed a completed capture.'); })
      .catch(error => { if (!cancelled) setCaptureStatus(error instanceof Error ? error.message : 'Capture verification failed.'); });
    return () => { cancelled = true; };
  }, [returnedOrder]);

  async function beginCheckout() {
    setNotice('');
    setBusy(true);
    try {
      const response = await fetch(`${API}/v1/payments/paypal/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'USD', description: 'Avelune Health demo support session' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail ?? 'PayPal checkout could not be started.');
      const approval = data.links?.find((link: { rel: string; href: string }) => link.rel === 'approve')?.href;
      if (!approval) throw new Error('PayPal did not return an approval link.');
      window.location.assign(approval);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Checkout is unavailable. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const cancelled = new URLSearchParams(window.location.search).has('cancelled');

  return <section className="payments-section" id="payments">
    <div className="payments-heading">
      <span className="eyebrow">PAYPAL-POWERED CARE ACCESS</span>
      <h2>Support that moves <em>with you.</em></h2>
      <p>PayPal is Avelune's primary payment rail for eligible paid support services. The sandbox checkout below demonstrates a server-created PayPal order. It uses test funds only.</p>
    </div>
    <div className="payment-layout">
      <article className="invoice-card">
        <div className="invoice-top"><span className="eyebrow">SAMPLE SERVICE · SANDBOX</span><span className="invoice-status">Test transaction</span></div>
        <div className="invoice-provider"><div className="provider-avatar">AH</div><div><b>Avelune Health</b><span>Illustrative support session · synthetic demo</span></div></div>
        <div className="invoice-service"><span>Care navigation support session</span><b>USD 5.00</b></div>
        <div className="invoice-service muted"><span>Payment processor</span><span>PayPal Sandbox</span></div>
        <div className="invoice-total"><span>Demo total</span><strong>USD 5.00</strong></div>
        <p className="invoice-footnote">This is a sandbox demonstration, not a real clinical appointment, therapy booking or request for real money. No patient health information is sent to PayPal.</p>
      </article>
      <article className="checkout-card">
        <div className="checkout-title"><div><span className="eyebrow">SECURE HOSTED CHECKOUT</span><h3>Continue with PayPal</h3></div><CreditCard/></div>
        <label className="currency-label" htmlFor="demo-amount">Sandbox amount (USD)</label>
        <input id="demo-amount" className="currency-code-input" value={amount} inputMode="decimal" onChange={event => setAmount(event.target.value)} aria-label="Sandbox amount in USD"/>
        <p className="currency-note">For the hackathon demonstration only. The API validates the amount and creates the order using server-side PayPal Sandbox credentials. No card details or PayPal passwords are handled by Avelune.</p>
        <button type="button" className="button primary full" disabled={busy || !/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0 || Number(amount) > 100} onClick={beginCheckout}>{busy ? 'Connecting to PayPal…' : 'Pay with PayPal Sandbox'} <ArrowUpRight size={16}/></button>
        {returnedOrder && <p className="payment-notice" role="status"><CheckCircle2 size={16}/>{captureStatus || 'Verifying PayPal Sandbox capture…'}</p>}
        {cancelled && <p className="payment-notice" role="status">PayPal checkout was cancelled. No payment has been recorded.</p>}
        {notice && <p className="payment-notice" role="alert">{notice}</p>}
        <p className="payment-safety"><ShieldCheck size={15}/> PayPal handles the hosted payment credentials. Avelune must verify server-side capture results and signed webhooks before confirming payment.</p>
      </article>
    </div>
    <div className="payment-guardrails"><span><ShieldCheck/> PayPal Sandbox integration</span><span><LockKeyhole/> Credentials stay server-side</span><span><CheckCircle2/> Server-side order verification</span></div>
    <p className="payment-disclaimer">Paid therapy, video consultations and clinical services will only be listed after the provider, qualifications, availability, price, consent, refund terms and applicable regulatory requirements are verified. The demo payment is not a real booking.</p>
  </section>;
}
