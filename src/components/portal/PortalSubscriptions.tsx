import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUBSCRIPTION_PLANS } from '../../data/portalData';
import {
  Zap,
  Check,
  Shield,
  CreditCard,
  Building,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  Plus,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface PortalSubscriptionsProps {
  theme?: 'dark' | 'light';
}

export const PortalSubscriptions: React.FC<PortalSubscriptionsProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const {
    user,
    updateSubscriptionPlan,
    toggleAddon,
    toggleAutoRenew,
    cancelSubscription,
    updatePaymentMethod,
    updateUserProfile,
  } = useAuth();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    user?.subscription.billingCycle || 'annual'
  );
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex'>('visa');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!user) return null;

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === user.subscription.planId) || SUBSCRIPTION_PLANS[1];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'custom') {
      setFeedbackMsg('Your Dedicated Solutions Architect has been requested to prepare a Custom Multi-Enterprise quota contract.');
      setTimeout(() => setFeedbackMsg(''), 5000);
      return;
    }
    const typedPlanId = planId as 'starter' | 'growth' | 'enterprise';
    if (typedPlanId === user.subscription.planId && billingCycle === user.subscription.billingCycle) {
      return;
    }
    updateSubscriptionPlan(typedPlanId, billingCycle);
    setFeedbackMsg(`Successfully switched subscription plan to ${planId.toUpperCase()} (${billingCycle.toUpperCase()})!`);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || cardNumber.length < 4) return;
    const last4 = cardNumber.slice(-4);
    updatePaymentMethod({
      brand: cardBrand,
      last4: last4 || '4242',
      expiry: cardExpiry || '12/28',
    });
    setIsEditingPayment(false);
    setFeedbackMsg('Corporate payment method updated successfully.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          Subscription & Billing Management
        </h1>
        <p className={`text-xs sm:text-sm mt-1 ${
          isLight ? 'text-slate-600' : 'text-zinc-400'
        }`}>
          Scale agent concurrency limits, toggle architectural add-ons, or modify corporate billing cycles.
        </p>
      </div>

      {feedbackMsg && (
        <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
          isLight
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
        }`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Current Active Plan Status Card */}
      <div className={`rounded-2xl border p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all ${
        isLight
          ? 'bg-white border-violet-200 text-slate-900 shadow-slate-200/60'
          : 'bg-[#0e0e18] border-violet-500/30 text-white shadow-xl'
      }`}>
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b ${
          isLight ? 'border-slate-100' : 'border-white/[0.08]'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono-code uppercase border ${
                isLight
                  ? 'bg-violet-100 border-violet-200 text-violet-800'
                  : 'bg-violet-600/30 border-violet-400/40 text-violet-300'
              }`}>
                Current Active Tier
              </span>
              <span className={`text-xs flex items-center gap-1 font-mono-code ${
                isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {user.subscription.status === 'active' ? 'Status: Active & Synchronized' : 'Status: Pending Renewal'}
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold font-display ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {user.subscription.planName}
            </h2>
            <p className={`text-xs mt-1 max-w-xl ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              Next invoice scheduled for{' '}
              <strong className={isLight ? 'text-slate-900' : 'text-white'}>{user.subscription.renewsOn}</strong> via{' '}
              <span className="capitalize">{user.paymentMethod.brand}</span> ending in{' '}
              <strong className={isLight ? 'text-slate-900' : 'text-white'}>{user.paymentMethod.last4}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-left sm:text-right">
              <div className={`text-2xl sm:text-3xl font-bold font-mono-code ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                ${user.subscription.price.toLocaleString()}
                <span className={`text-xs font-sans font-normal ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  /{user.subscription.billingCycle === 'annual' ? 'mo (billed annually)' : 'month'}
                </span>
              </div>
              <div className={`text-[11px] font-medium mt-0.5 ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                {user.subscription.billingCycle === 'annual' ? 'Annual discount applied (20% savings)' : 'Standard monthly rate'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleAutoRenew}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  user.subscription.autoRenew
                    ? isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      : 'bg-white/[0.06] border-white/[0.1] text-zinc-200 hover:text-white'
                    : isLight
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                }`}
              >
                Auto-Renew: {user.subscription.autoRenew ? 'Enabled' : 'Paused'}
              </button>
            </div>
          </div>
        </div>

        {/* Quota & Fleet Usage Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="space-y-1.5">
            <div className={`flex items-center justify-between text-xs ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              <span>Agent Concurrency</span>
              <span className={`font-mono-code font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {user.subscription.activeAgentsCount} / {user.subscription.agentConcurrencyLimit} Active
              </span>
            </div>
            <div className={`w-full rounded-full h-2 overflow-hidden ${
              isLight ? 'bg-slate-100' : 'bg-white/[0.08]'
            }`}>
              <div
                className="bg-violet-500 h-full rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (user.subscription.activeAgentsCount / user.subscription.agentConcurrencyLimit) * 100
                  )}%`,
                }}
              />
            </div>
            <p className={`text-[10px] ${
              isLight ? 'text-slate-500' : 'text-zinc-500'
            }`}>Autonomous sub-agents executing in parallel</p>
          </div>

          <div className="space-y-1.5">
            <div className={`flex items-center justify-between text-xs ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              <span>Monthly LLM Token Pool</span>
              <span className={`font-mono-code font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {Math.round(user.subscription.monthlyTokensUsed / 1_000_000)}M /{' '}
                {Math.round(user.subscription.monthlyTokenQuota / 1_000_000)}M
              </span>
            </div>
            <div className={`w-full rounded-full h-2 overflow-hidden ${
              isLight ? 'bg-slate-100' : 'bg-white/[0.08]'
            }`}>
              <div
                className="bg-indigo-500 h-full rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (user.subscription.monthlyTokensUsed / user.subscription.monthlyTokenQuota) * 100
                  )}%`,
                }}
              />
            </div>
            <p className={`text-[10px] ${
              isLight ? 'text-slate-500' : 'text-zinc-500'
            }`}>Resets automatically on {user.subscription.renewsOn}</p>
          </div>

          <div className="space-y-1.5">
            <div className={`flex items-center justify-between text-xs ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              <span>SLA & Incident Support</span>
              <span className={`font-mono-code font-bold ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>15-Min Priority SLA</span>
            </div>
            <div className={`w-full rounded-full h-2 overflow-hidden ${
              isLight ? 'bg-slate-100' : 'bg-white/[0.08]'
            }`}>
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>
            <p className={`text-[10px] ${
              isLight ? 'text-slate-500' : 'text-zinc-500'
            }`}>
              Assigned: {user.subscription.dedicatedArchitectName || 'Dr. Elena Rostova'}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Tier Comparison & Upgrade Selector */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-lg font-bold font-display ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>Available Subscription Tiers</h2>
            <p className={`text-xs ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              Switch anytime. Upgrades take effect immediately with pro-rated invoicing.
            </p>
          </div>

          {/* Billing Cycle Selector */}
          <div className={`flex items-center self-start sm:self-auto rounded-xl p-1 border transition-all ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-black/40 border-white/[0.1]'
          }`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? isLight
                    ? 'bg-white text-violet-700 shadow-sm border border-slate-200'
                    : 'bg-violet-600 text-white shadow-md'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? isLight
                    ? 'bg-white text-violet-700 shadow-sm border border-slate-200'
                    : 'bg-violet-600 text-white shadow-md'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono-code font-bold ${
                isLight
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = user.subscription.planId === plan.id;
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                  isCurrent
                    ? isLight
                      ? 'bg-white border-2 border-violet-600 shadow-xl shadow-violet-100 ring-2 ring-violet-400/20'
                      : 'bg-[#10101c] border-2 border-violet-500 shadow-2xl shadow-violet-600/20'
                    : isLight
                    ? 'bg-white border border-slate-200 hover:border-violet-300 hover:shadow-lg shadow-sm'
                    : 'bg-[#0b0b12] border border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                {plan.recommended && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider font-mono-code shadow-md">
                    Most Popular
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-[10px] font-bold text-white uppercase tracking-wider font-mono-code shadow-md">
                    Current Active Tier
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-base font-bold font-display ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>{plan.name}</h3>
                  </div>
                  <p className={`text-xs min-h-[36px] leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-zinc-400'
                  }`}>
                    {plan.tagline}
                  </p>

                  <div className={`my-5 pb-5 border-b ${
                    isLight ? 'border-slate-100' : 'border-white/[0.08]'
                  }`}>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold font-mono-code ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        ${price.toLocaleString()}
                      </span>
                      <span className={`text-xs font-sans ${
                        isLight ? 'text-slate-500' : 'text-zinc-400'
                      }`}>
                        /{billingCycle === 'annual' ? 'mo (billed annually)' : 'month'}
                      </span>
                    </div>
                    <div className={`text-[11px] font-mono-code mt-1 font-semibold ${
                      isLight ? 'text-violet-700' : 'text-violet-400'
                    }`}>
                      {plan.agentConcurrencyLimit} Parallel Agents • {Math.round(plan.monthlyTokenQuota / 1_000_000)}M Tokens
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    <div className={`text-[11px] font-semibold uppercase tracking-wider font-mono-code ${
                      isLight ? 'text-slate-800' : 'text-zinc-300'
                    }`}>
                      Tier Capabilities:
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className={`flex items-start gap-2 text-xs ${
                        isLight ? 'text-slate-700' : 'text-zinc-300'
                      }`}>
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isLight ? 'text-violet-600' : 'text-violet-400'
                        }`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isCurrent && billingCycle === user.subscription.billingCycle}
                  id={`select-plan-${plan.id}-btn`}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent && billingCycle === user.subscription.billingCycle
                      ? isLight
                        ? 'bg-slate-100 text-slate-400 cursor-default border border-slate-200'
                        : 'bg-white/[0.08] text-zinc-400 cursor-default'
                      : 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/30'
                  }`}
                >
                  {isCurrent && billingCycle === user.subscription.billingCycle
                    ? 'Current Plan'
                    : isCurrent
                    ? `Switch to ${billingCycle === 'annual' ? 'Annual' : 'Monthly'}`
                    : `Upgrade / Switch to ${plan.name.split(' ')[0]}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architectural Add-Ons Manager */}
      <div className="space-y-4">
        <div>
          <h2 className={`text-lg font-bold font-display ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>Architectural Add-Ons & Capacity</h2>
          <p className={`text-xs ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Provision dedicated infrastructure, isolated VPCs, or custom model training weights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.subscription.addOns.map((addon) => (
            <div
              key={addon.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                addon.enabled
                  ? isLight
                    ? 'bg-violet-50/80 border-violet-300 shadow-sm'
                    : 'bg-violet-950/30 border-violet-500/40 shadow-md shadow-violet-500/10'
                  : isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0c0c14] border-white/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>{addon.name}</span>
                  <span className={`text-xs font-mono-code font-bold ${
                    isLight ? 'text-violet-700' : 'text-violet-300'
                  }`}>
                    +${addon.price}/mo
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  {addon.id === 'addon-1'
                    ? 'Isolated dedicated container VPC with sub-50ms regional latency and dedicated egress IPs.'
                    : addon.id === 'addon-2'
                    ? 'Direct line to on-call Lead AI Architect with guaranteed 15-minute response SLA.'
                    : 'Continual fine-tuning on internal corporate datasets with zero data leakage.'}
                </p>
              </div>

              <div className={`pt-4 mt-4 border-t flex items-center justify-between ${
                isLight ? 'border-slate-100' : 'border-white/[0.06]'
              }`}>
                <span className={`text-[11px] font-mono-code ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  {addon.enabled ? 'Status: Provisioned' : 'Status: Inactive'}
                </span>
                <button
                  onClick={() => toggleAddon(addon.id)}
                  id={`toggle-addon-${addon.id}-btn`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    addon.enabled
                      ? 'bg-violet-600 text-white shadow-sm'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      : 'bg-white/[0.08] hover:bg-white/[0.15] text-zinc-300'
                  }`}
                >
                  {addon.enabled ? 'Enabled' : 'Add to Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method & Billing Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Card */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0c0c14] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold font-display flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <CreditCard className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <span>Corporate Payment Method</span>
            </h3>
            <button
              onClick={() => setIsEditingPayment(!isEditingPayment)}
              className={`text-xs font-semibold ${
                isLight ? 'text-violet-600 hover:text-violet-800' : 'text-violet-400 hover:text-violet-300'
              }`}
            >
              {isEditingPayment ? 'Cancel' : 'Change Card'}
            </button>
          </div>

          {!isEditingPayment ? (
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-black/40 border-white/[0.06]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-7 rounded border flex items-center justify-center font-bold text-xs uppercase ${
                  isLight
                    ? 'bg-slate-200 border-slate-300 text-slate-800'
                    : 'bg-zinc-800 border-white/[0.1] text-zinc-200'
                }`}>
                  {user.paymentMethod.brand}
                </div>
                <div>
                  <div className={`text-xs font-bold font-mono-code ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    •••• •••• •••• {user.paymentMethod.last4}
                  </div>
                  <div className={`text-[11px] ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}>
                    Expires {user.paymentMethod.expiry} • Default Corporate Card
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded border ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                  : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
              }`}>
                Active
              </span>
            </div>
          ) : (
            <form onSubmit={handleSavePayment} className={`space-y-3 p-4 rounded-xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-black/40 border-white/[0.08]'
            }`}>
              <div>
                <label className={`block text-[11px] mb-1 font-medium ${
                  isLight ? 'text-slate-700' : 'text-zinc-300'
                }`}>Card Brand</label>
                <select
                  value={cardBrand}
                  onChange={(e) => setCardBrand(e.target.value as any)}
                  className={`w-full rounded-lg px-3 py-2 text-xs border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#12121c] border-white/[0.1] text-white'
                  }`}
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-[11px] mb-1 font-medium ${
                    isLight ? 'text-slate-700' : 'text-zinc-300'
                  }`}>Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className={`w-full rounded-lg px-3 py-2 text-xs border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                        : 'bg-[#12121c] border-white/[0.1] text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1 font-medium ${
                    isLight ? 'text-slate-700' : 'text-zinc-300'
                  }`}>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    placeholder="12/28"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    className={`w-full rounded-lg px-3 py-2 text-xs border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                        : 'bg-[#12121c] border-white/[0.1] text-white'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors"
              >
                Save Payment Method
              </button>
            </form>
          )}

          <p className={`text-[11px] flex items-center gap-1.5 ${
            isLight ? 'text-slate-500' : 'text-zinc-500'
          }`}>
            <Lock className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-400'}`} />
            <span>Payments processed via Stripe Enterprise 256-Bit Vault.</span>
          </p>
        </div>

        {/* Billing Entity & Address */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-[#0c0c14] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold font-display flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Building className={`w-4 h-4 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
              <span>Billing Organization & Tax ID</span>
            </h3>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 text-xs ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-black/40 border-white/[0.06] text-zinc-300'
          }`}>
            <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.company}</div>
            <div>{user.billingAddress.street}</div>
            <div>
              {user.billingAddress.city}, {user.billingAddress.state} {user.billingAddress.zip}
            </div>
            <div>{user.billingAddress.country}</div>
            {user.billingAddress.taxId && (
              <div className={`text-[11px] font-mono-code pt-1 font-semibold ${
                isLight ? 'text-violet-700' : 'text-violet-400'
              }`}>
                VAT/Tax ID: {user.billingAddress.taxId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
