import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, PurchasedProduct, ApiKeyRecord, InvoiceRecord } from '../types';
import { DEMO_USERS, SUBSCRIPTION_PLANS, CATALOG_PRODUCTS } from '../data/portalData';
import { safeGetLocalStorage, safeSetLocalStorage, safeRemoveLocalStorage } from '../utils/storage';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, demoKey?: string) => Promise<boolean>;
  loginAsDemo: (type: 'enterprise' | 'growth' | 'editor') => void;
  register: (data: { name: string; email: string; company: string; role: string; planId?: 'starter' | 'growth' | 'enterprise' }) => Promise<boolean>;
  logout: () => void;
  
  // Portal & Modal UI States
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  
  isPortalOpen: boolean;
  portalActiveTab: string;
  openPortal: (tab?: string) => void;
  closePortal: () => void;
  setPortalActiveTab: (tab: string) => void;

  // Subscription Management
  updateSubscriptionPlan: (planId: 'starter' | 'growth' | 'enterprise', cycle: 'monthly' | 'annual') => void;
  toggleAddon: (addonId: string) => void;
  toggleAutoRenew: () => void;
  cancelSubscription: () => void;
  
  // Products Management
  purchaseCatalogProduct: (productCode: string) => void;
  restartProductDeployment: (productId: string) => void;
  updateProductSettings: (productId: string, updates: Partial<PurchasedProduct>) => void;
  
  // API Keys
  createApiKey: (name: string, env: 'production' | 'sandbox', perms: 'full_orchestration' | 'read_telemetry' | 'agent_dispatch_only') => ApiKeyRecord;
  revokeApiKey: (keyId: string) => void;
  
  // Profile & Payment
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updatePaymentMethod: (card: { brand: 'visa' | 'mastercard' | 'amex'; last4: string; expiry: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_USER_KEY = 'artify_auth_user_session';
const STORAGE_PORTAL_OPEN_KEY = 'artify_portal_view_state';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = safeGetLocalStorage(STORAGE_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to parse saved user from localStorage', err);
    }
    // Default to Enterprise Demo user so visitors immediately experience the full client portal richness
    return DEMO_USERS.enterprise;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalActiveTab, setPortalActiveTab] = useState<string>('overview');

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      safeSetLocalStorage(STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      safeRemoveLocalStorage(STORAGE_USER_KEY);
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openPortal = (tab: string = 'overview') => {
    setPortalActiveTab(tab);
    setIsPortalOpen(true);
    // Scroll to top when opening portal
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closePortal = () => {
    setIsPortalOpen(false);
  };

  const loginAsDemo = (type: 'enterprise' | 'growth' | 'editor') => {
    const demo = DEMO_USERS[type] || DEMO_USERS.enterprise;
    setUser(demo);
    setIsAuthModalOpen(false);
    openPortal('overview');
  };

  const login = async (email: string, _password?: string, demoKey?: string): Promise<boolean> => {
    if (demoKey && DEMO_USERS[demoKey]) {
      setUser(DEMO_USERS[demoKey]);
      setIsAuthModalOpen(false);
      openPortal('overview');
      return true;
    }

    // Check if email matches demo users
    const matchedKey = Object.keys(DEMO_USERS).find(
      (k) => DEMO_USERS[k].email.toLowerCase() === email.toLowerCase()
    );
    if (matchedKey) {
      setUser(DEMO_USERS[matchedKey]);
      setIsAuthModalOpen(false);
      openPortal('overview');
      return true;
    }

    // Otherwise create or log in as standard user
    const firstName = email.split('@')[0].split('.')[0] || 'User';
    const lastName = email.split('@')[0].split('.')[1] || 'Executive';
    const fullName = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;

    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      firstName,
      lastName,
      name: fullName,
      email: email,
      company: 'Enterprise Client Org',
      role: 'customer',
      jobTitle: 'Head of Technology',
      emailVerified: true,
      mfaEnabled: true,
      country: 'United States',
      memberSince: 'August 2026',
      timezone: 'UTC (GMT)',
      billingAddress: {
        street: '100 Innovation Way',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        country: 'United States',
      },
      paymentMethod: {
        brand: 'visa',
        last4: '8841',
        expiry: '12/28',
      },
      subscription: {
        planId: 'growth',
        planName: 'Growth Agent Fleet',
        status: 'active',
        billingCycle: 'monthly',
        price: 3450,
        startDate: new Date().toISOString().split('T')[0],
        renewsOn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        autoRenew: true,
        agentConcurrencyLimit: 8,
        monthlyTokenQuota: 60_000_000,
        monthlyTokensUsed: 12_400_000,
        activeAgentsCount: 5,
        dedicatedArchitectName: 'Liam Harrison (Solutions Architect)',
        addOns: [
          { id: 'addon-1', name: 'Dedicated VPC Hosting in us-east-1', price: 800, enabled: true },
        ],
      },
      purchasedProducts: [
        {
          id: `prod_${Math.random().toString(36).substring(2, 7)}`,
          name: 'Autonomous Invoice & PO Reconciliation Engine',
          code: 'ART-REC-01',
          category: 'autonomous_agent',
          version: 'v3.4.1',
          description: 'Autonomous financial ledger comparing transactions across banking, ERP, and supplier portals with 99.4% automated zero-exception matching.',
          purchaseDate: new Date().toISOString().split('T')[0],
          purchaseType: 'subscription_included',
          licenseKey: `ART-LIC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-XPRO-2026`,
          status: 'deployed_active',
          environment: 'AWS us-east-1',
          endpointUrl: 'https://api.artifysols.com/v1/finance/reconciliation',
          connectedSystems: ['NetSuite ERP', 'Stripe Billing'],
          uptime: '99.98%',
          requestsThisMonth: 18450,
          monthlyHoursSaved: 120,
          assignedAgents: ['Ledger Reconciliation Sentinel', 'Invoice OCR Parser'],
          telemetry: {
            health: '100% Operational',
            latencyMs: 110,
            errorRate: '0.001%',
            lastSynced: 'Just now',
          },
        },
        {
          id: `prod_${Math.random().toString(36).substring(2, 7)}`,
          name: 'Conversational BI & Executive Command Center',
          code: 'ART-CMD-02',
          category: 'bi_dashboard',
          version: 'v2.8.0',
          description: 'Natural language analytical interface querying live PostgreSQL, Snowflake, and Salesforce databases in sub-second SQL synthesis.',
          purchaseDate: new Date().toISOString().split('T')[0],
          purchaseType: 'subscription_included',
          licenseKey: `ART-LIC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-XCMD-2026`,
          status: 'deployed_active',
          environment: 'GCP europe-west2',
          endpointUrl: 'https://api.artifysols.com/v1/analytics/command-center',
          connectedSystems: ['PostgreSQL Cluster', 'Salesforce CRM'],
          uptime: '99.99%',
          requestsThisMonth: 12300,
          monthlyHoursSaved: 75,
          assignedAgents: ['SQL Synthesizer Agent', 'Chart Renderer Bot'],
          telemetry: {
            health: '100% Operational',
            latencyMs: 92,
            errorRate: '0.000%',
            lastSynced: 'Just now',
          },
        },
      ],
      orders: [],
      payments: [],
      tickets: [],
      notifications: [],
      sessions: [
        {
          id: 'sess_1',
          device: 'MacBook Pro (Apple Silicon)',
          browser: 'Chrome 126.0 (macOS)',
          ip: '198.51.100.44',
          location: 'San Francisco, CA, US',
          lastActive: 'Active Now',
          isCurrent: true,
        },
      ],
      securityEvents: [
        {
          id: 'sec_1',
          type: 'login',
          description: 'Successful corporate session authentication via Email OTP',
          timestamp: new Date().toISOString(),
          ip: '198.51.100.44',
          location: 'San Francisco, CA, US',
          status: 'success',
        },
      ],
      invoices: [
        {
          id: `inv_${Math.random().toString(36).substring(2, 7)}`,
          invoiceNumber: `INV-ART-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: `usr_demo`,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          date: new Date().toISOString().split('T')[0],
          period: 'Aug 01, 2026 - Aug 31, 2026',
          amount: 3450,
          subtotal: 3450,
          tax: 0,
          discount: 0,
          currency: 'USD',
          status: 'paid',
          paymentMethod: 'Visa ending in 8841',
          description: 'Growth Agent Fleet Subscription (Monthly)',
          billingTo: {
            name: fullName,
            company: 'Enterprise Client Org',
            email: email,
            address: '100 Innovation Way, San Francisco, CA 94107',
          },
          items: [{ description: 'Growth Agent Fleet Monthly Tier', quantity: 1, unitPrice: 3450, amount: 3450 }],
        },
      ],
      apiKeys: [
        {
          id: 'key-init-01',
          name: 'Primary-Production-API-Key',
          keyPrefix: 'art_live_usr_882',
          maskedKey: 'art_live_usr_882••••••••••••••••••••••••38f9',
          environment: 'production',
          createdAt: new Date().toISOString().split('T')[0],
          lastUsed: 'Just now',
          permissions: 'full_orchestration',
        },
      ],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    openPortal('overview');
    return true;
  };

  const register = async (data: {
    name: string;
    email: string;
    company: string;
    role: string;
    planId?: 'starter' | 'growth' | 'enterprise';
  }): Promise<boolean> => {
    const selectedPlanId = data.planId || 'growth';
    const planDef = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];
    const nameParts = data.name.trim().split(' ');
    const regFirstName = nameParts[0] || 'User';
    const regLastName = nameParts.slice(1).join(' ') || 'Member';

    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      firstName: regFirstName,
      lastName: regLastName,
      name: data.name,
      email: data.email,
      company: data.company,
      role: 'customer',
      jobTitle: data.role || 'Enterprise Lead',
      emailVerified: true,
      mfaEnabled: false,
      country: 'United States',
      memberSince: 'August 2026',
      timezone: 'America/New_York (EST)',
      billingAddress: {
        street: '1 Enterprise Blvd',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
      },
      paymentMethod: {
        brand: 'visa',
        last4: '4242',
        expiry: '10/29',
      },
      subscription: {
        planId: selectedPlanId,
        planName: planDef.name,
        status: 'active',
        billingCycle: 'monthly',
        price: planDef.priceMonthly,
        startDate: new Date().toISOString().split('T')[0],
        renewsOn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        autoRenew: true,
        agentConcurrencyLimit: planDef.agentConcurrencyLimit,
        monthlyTokenQuota: planDef.monthlyTokenQuota,
        monthlyTokensUsed: 520_000,
        activeAgentsCount: Math.min(2, planDef.agentConcurrencyLimit),
        dedicatedArchitectName: 'Liam Harrison (Senior Solutions Architect)',
        addOns: [
          { id: 'addon-1', name: 'Private Dedicated VPC Hosting', price: 800, enabled: false },
          { id: 'addon-2', name: '24/7 Priority Incident Hotline', price: 600, enabled: false },
        ],
      },
      purchasedProducts: [
        {
          id: `prod_${Math.random().toString(36).substring(2, 7)}`,
          name: 'Autonomous Invoice & PO Reconciliation Engine',
          code: 'ART-REC-01',
          category: 'autonomous_agent',
          version: 'v3.4.1',
          description: 'Autonomous financial ledger comparing transactions across banking, ERP, and supplier portals with 99.4% automated zero-exception matching.',
          purchaseDate: new Date().toISOString().split('T')[0],
          purchaseType: 'subscription_included',
          licenseKey: `ART-LIC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-XPRO-2026`,
          status: 'deployed_active',
          environment: 'AWS us-east-1',
          endpointUrl: 'https://api.artifysols.com/v1/finance/reconciliation',
          connectedSystems: ['QuickBooks Online', 'Stripe Billing'],
          uptime: '100%',
          requestsThisMonth: 1200,
          monthlyHoursSaved: 45,
          assignedAgents: ['Ledger Reconciliation Sentinel', 'Invoice OCR Parser'],
          telemetry: {
            health: '100% Operational',
            latencyMs: 98,
            errorRate: '0.000%',
            lastSynced: 'Just now',
          },
        },
      ],
      orders: [],
      payments: [],
      tickets: [],
      notifications: [],
      sessions: [
        {
          id: 'sess_reg_1',
          device: 'MacBook Air (M3)',
          browser: 'Chrome 126.0 (macOS)',
          ip: '198.51.100.89',
          location: 'New York, NY, US',
          lastActive: 'Active Now',
          isCurrent: true,
        },
      ],
      securityEvents: [
        {
          id: 'sec_reg_1',
          type: 'login',
          description: 'Initial account registration and verified email sign-in',
          timestamp: new Date().toISOString(),
          ip: '198.51.100.89',
          location: 'New York, NY, US',
          status: 'success',
        },
      ],
      invoices: [
        {
          id: `inv_${Math.random().toString(36).substring(2, 7)}`,
          invoiceNumber: `INV-ART-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: `usr_reg`,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          date: new Date().toISOString().split('T')[0],
          period: 'Initial Billing Period',
          amount: planDef.priceMonthly,
          subtotal: planDef.priceMonthly,
          tax: 0,
          discount: 0,
          currency: 'USD',
          status: 'paid',
          paymentMethod: 'Visa ending in 4242',
          description: `${planDef.name} Subscription`,
          billingTo: {
            name: data.name,
            company: data.company,
            email: data.email,
            address: '1 Enterprise Blvd, New York, NY 10001',
          },
          items: [{ description: `${planDef.name} Initial Setup`, quantity: 1, unitPrice: planDef.priceMonthly, amount: planDef.priceMonthly }],
        },
      ],
      apiKeys: [
        {
          id: `key_${Math.random().toString(36).substring(2, 7)}`,
          name: 'Default-Production-Key',
          keyPrefix: 'art_live_usr_991',
          maskedKey: 'art_live_usr_991••••••••••••••••••••••••55a1',
          environment: 'production',
          createdAt: new Date().toISOString().split('T')[0],
          lastUsed: 'Just now',
          permissions: 'full_orchestration',
        },
      ],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    openPortal('overview');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsPortalOpen(false);
  };

  const updateSubscriptionPlan = (planId: 'starter' | 'growth' | 'enterprise', cycle: 'monthly' | 'annual') => {
    if (!user) return;
    const planDef = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[1];
    const newPrice = cycle === 'annual' ? planDef.priceAnnual : planDef.priceMonthly;

    const newInvoice: InvoiceRecord = {
      id: `inv_${Math.random().toString(36).substring(2, 7)}`,
      invoiceNumber: `INV-ART-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      period: cycle === 'annual' ? '12-Month Prepaid Cycle' : 'Monthly Cycle',
      amount: newPrice,
      status: 'paid',
      paymentMethod: `${user.paymentMethod.brand.toUpperCase()} ending in ${user.paymentMethod.last4}`,
      description: `Subscription Plan Switch: ${planDef.name} (${cycle})`,
      items: [
        {
          description: `${planDef.name} (${cycle === 'annual' ? 'Annual Prepaid Rate' : 'Monthly'})`,
          qty: 1,
          amount: newPrice,
        },
      ],
    };

    setUser({
      ...user,
      subscription: {
        ...user.subscription,
        planId,
        planName: planDef.name,
        price: newPrice,
        billingCycle: cycle,
        agentConcurrencyLimit: planDef.agentConcurrencyLimit,
        monthlyTokenQuota: planDef.monthlyTokenQuota,
      },
      invoices: [newInvoice, ...user.invoices],
    });
  };

  const toggleAddon = (addonId: string) => {
    if (!user) return;
    const updatedAddOns = user.subscription.addOns.map((a) =>
      a.id === addonId ? { ...a, enabled: !a.enabled } : a
    );
    setUser({
      ...user,
      subscription: {
        ...user.subscription,
        addOns: updatedAddOns,
      },
    });
  };

  const toggleAutoRenew = () => {
    if (!user) return;
    setUser({
      ...user,
      subscription: {
        ...user.subscription,
        autoRenew: !user.subscription.autoRenew,
      },
    });
  };

  const cancelSubscription = () => {
    if (!user) return;
    setUser({
      ...user,
      subscription: {
        ...user.subscription,
        status: 'canceled',
        autoRenew: false,
      },
    });
  };

  const purchaseCatalogProduct = (productCode: string) => {
    if (!user) return;
    const catalogItem = CATALOG_PRODUCTS.find((p) => p.code === productCode);
    if (!catalogItem) return;

    // Check if already purchased
    const exists = user.purchasedProducts.find((p) => p.code === productCode);
    if (exists) return;

    const newProduct: PurchasedProduct = {
      ...catalogItem,
      id: `prod_${Math.random().toString(36).substring(2, 8)}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      licenseKey: `ART-LIC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${productCode.replace('ART-', '')}-2026`,
      status: 'deployed_active',
      requestsThisMonth: 120,
      monthlyHoursSaved: 18,
      telemetry: {
        health: '100% Operational',
        latencyMs: Math.floor(70 + Math.random() * 60),
        errorRate: '0.000%',
        lastSynced: 'Just now',
      },
    };

    const newInvoice: InvoiceRecord = {
      id: `inv_${Math.random().toString(36).substring(2, 7)}`,
      invoiceNumber: `INV-ART-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      period: 'One-Time Provisioning',
      amount: catalogItem.purchaseType === 'one_time_license' ? 4800 : 0,
      status: 'paid',
      paymentMethod: `${user.paymentMethod.brand.toUpperCase()} ending in ${user.paymentMethod.last4}`,
      description: `Deployment: ${catalogItem.name}`,
      items: [
        {
          description: `${catalogItem.name} (${catalogItem.version}) Setup & Deployment`,
          qty: 1,
          amount: catalogItem.purchaseType === 'one_time_license' ? 4800 : 0,
        },
      ],
    };

    setUser({
      ...user,
      subscription: {
        ...user.subscription,
        activeAgentsCount: user.subscription.activeAgentsCount + catalogItem.assignedAgents.length,
      },
      purchasedProducts: [newProduct, ...user.purchasedProducts],
      invoices: [newInvoice, ...user.invoices],
    });
  };

  const restartProductDeployment = (productId: string) => {
    if (!user) return;
    setUser({
      ...user,
      purchasedProducts: user.purchasedProducts.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            status: 'updating',
            telemetry: {
              ...p.telemetry,
              lastSynced: 'Restarting container...',
            },
          };
        }
        return p;
      }),
    });

    setTimeout(() => {
      setUser((current) => {
        if (!current) return null;
        return {
          ...current,
          purchasedProducts: current.purchasedProducts.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                status: 'deployed_active',
                telemetry: {
                  ...p.telemetry,
                  health: '100% Operational',
                  lastSynced: 'Just now (Cold-start OK)',
                },
              };
            }
            return p;
          }),
        };
      });
    }, 2000);
  };

  const updateProductSettings = (productId: string, updates: Partial<PurchasedProduct>) => {
    if (!user) return;
    setUser({
      ...user,
      purchasedProducts: user.purchasedProducts.map((p) =>
        p.id === productId ? { ...p, ...updates } : p
      ),
    });
  };

  const createApiKey = (
    name: string,
    env: 'production' | 'sandbox',
    perms: 'full_orchestration' | 'read_telemetry' | 'agent_dispatch_only'
  ): ApiKeyRecord => {
    const prefix = env === 'production' ? 'art_live_' : 'art_test_';
    const rand = Math.random().toString(36).substring(2, 6);
    const suffix = Math.random().toString(36).substring(2, 6);
    const fullPrefix = `${prefix}${name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5)}_${rand}`;
    const newKey: ApiKeyRecord = {
      id: `key_${Math.random().toString(36).substring(2, 8)}`,
      name,
      keyPrefix: fullPrefix,
      maskedKey: `${fullPrefix}••••••••••••••••••••••••${suffix}`,
      environment: env,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: perms,
    };

    if (user) {
      setUser({
        ...user,
        apiKeys: [newKey, ...user.apiKeys],
      });
    }

    return newKey;
  };

  const revokeApiKey = (keyId: string) => {
    if (!user) return;
    setUser({
      ...user,
      apiKeys: user.apiKeys.filter((k) => k.id !== keyId),
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({
      ...user,
      ...updates,
    });
  };

  const updatePaymentMethod = (card: {
    brand: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiry: string;
  }) => {
    if (!user) return;
    setUser({
      ...user,
      paymentMethod: card,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isPortalOpen,
        portalActiveTab,
        openPortal,
        closePortal,
        setPortalActiveTab,
        updateSubscriptionPlan,
        toggleAddon,
        toggleAutoRenew,
        cancelSubscription,
        purchaseCatalogProduct,
        restartProductDeployment,
        updateProductSettings,
        createApiKey,
        revokeApiKey,
        updateUserProfile,
        updatePaymentMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
