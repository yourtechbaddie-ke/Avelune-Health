import { useMemo, useState } from 'react';
import { ArrowUpRight, Building2, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react';

type PaymentMethod = 'paypal' | 'mpesa' | 'bank_transfer';

const currencies = [
  { code: 'KES', label: 'Kenyan shilling' },
  { code: 'USD', label: 'US dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'Pound sterling' },
  { code: 'CAD', label: 'Canadian dollar' },
  { code: 'AUD', label: 'Australian dollar' },
  { code: 'INR', label: 'Indian rupee' },
  { code: 'NGN', label: 'Nigerian naira' },
  { code: 'ZAR', label: 'South African rand' },
  { code: 'JPY', label: 'Japanese yen' },
  { code: 'AED', label: 'UAE dirham' },
  { code: 'CHF', label: 'Swiss franc' },
];

const methods: { id: PaymentMethod; label: string; description: string; icon: typeof CreditCard }[] = [
  { id: 'paypal', label: 'PayPal', description: 'Pay securely where PayPal is supported', icon: CreditCard },
  { id: 'mpesa', label: 'M-Pesa', description: 'Mobile money · initially Kenya', icon: Smartphone },
  { id: 'bank_transfer', label: 'Bank transfer', description: 'Transfer using a verified invoice reference', icon: Building2 },
];

export default function PaymentCenter() {
  const [method, setMethod] = useState<PaymentMethod>('mpesa');
  const [currency, setCurrency] = useState('KES');
  const [notice, setNotice] = useState('');
  const selectedCurrency = useMemo(() => currencies.find(item => item.code === currency), [currency]);

  return <section className="payments-section" id="payments">
    <div className="payments-heading">
      <span className="eyebrow">CARE WITHOUT THE EXTRA JOURNEY</span>
      <h2>Pay for care, <em>wherever you are.</em></h2>
      <p>Review a provider's invoice and pay remotely for eligible services such as home visits, consultations, therapy and caregiving. Payment methods and currencies depend on provider and country availability.</p>
    </div>
    <div className="payment-layout">
      <article className="invoice-card">
        <div className="invoice-top"><span className="eyebrow">ILLUSTRATIVE INVOICE · DEMO ONLY</span><span className="invoice-status">Awaiting payment</span></div>
        <div className="invoice-provider"><div className="provider-avatar">AN</div><div><b>Dr. Amina Njoroge</b><span>Example home-care provider · synthetic data</span></div></div>
        <div className="invoice-service"><span>Home visit and consultation</span><b>KES 4,500</b></div>
        <div className="invoice-service muted"><span>Issued</span><span>9 November 2026</span></div>
        <div className="invoice-total"><span>Invoice total</span><strong>KES 4,500</strong></div>
        <p className="invoice-footnote">This sample invoice is fictional. It is not a request for payment and does not represent a verified clinician or service.</p>
      </article>
      <article className="checkout-card">
        <div className="checkout-title"><div><span className="eyebrow">SECURE PAYMENT EXPERIENCE</span><h3>Choose how to pay</h3></div><LockKeyhole/></div>
        <div className="payment-methods">
          {methods.map(({ id, label, description, icon: Icon }) => <button type="button" key={id} className={method === id ? 'payment-method active' : 'payment-method'} onClick={() => { setMethod(id); setNotice(''); }}>
            <Icon/><span><b>{label}</b><small>{description}</small></span><span className="method-radio">{method === id ? '✓' : ''}</span>
          </button>)}
        </div>
        <label className="currency-label" htmlFor="payment-currency">Preferred payment currency</label>
        <select id="payment-currency" value={currency} onChange={event => { setCurrency(event.target.value); setNotice(''); }}>
          {currencies.map(item => <option key={item.code} value={item.code}>{item.code} — {item.label}</option>)}
        </select>
        <p className="currency-note">Currency selection is a preference only. This demo does not convert the invoice or quote an exchange rate. At checkout, Avelune must show the exact provider-confirmed amount, currency and any fees before you approve.</p>
        <button type="button" className="button primary full" onClick={() => setNotice('Secure checkout is not connected yet. No payment has been initiated or collected.')}>Preview payment <ArrowUpRight size={16}/></button>
        {notice && <p className="payment-notice" role="status"><CheckCircle2 size={16}/>{notice}</p>}
        <p className="payment-safety"><ShieldCheck size={15}/> Avelune will never ask for your M-Pesa PIN, card security code or online-banking password. Provider confirmation—not a screenshot—will determine payment status.</p>
      </article>
    </div>
    <div className="payment-guardrails"><span><ShieldCheck/> Verified care providers</span><span><LockKeyhole/> Protected payment processing</span><span><Building2/> Receipts, refunds and billing support</span></div>
    <p className="payment-disclaimer">Live payments are not enabled in this prototype. PayPal, M-Pesa and bank-transfer integrations, provider verification, currency conversion quotes and refund processing are still being implemented. Medication payments will require an authorised pharmacy or dispensing provider.</p>
  </section>;
}
