import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WebsitePage,
  HomepageSection,
  WebsiteGlobalConfig,
  AdminCustomer,
  AdminLead,
  AdminOnboardingItem,
  AdminMediaAsset,
  AdminAppRelease,
  AdminNotificationTemplate,
  AdminIntegration,
  AdminSeoPage,
  AdminAuditItem,
  AdminRoleDefinition,
  AdminUserAccount,
  INITIAL_WEBSITE_PAGES,
  INITIAL_HOMEPAGE_SECTIONS,
  INITIAL_WEBSITE_CONFIG,
  INITIAL_ADMIN_CUSTOMERS,
  INITIAL_ADMIN_LEADS,
  INITIAL_ONBOARDING_PIPELINE,
  INITIAL_MEDIA_ASSETS,
  INITIAL_APP_RELEASES,
  INITIAL_NOTIFICATION_TEMPLATES,
  INITIAL_INTEGRATIONS,
  INITIAL_SEO_PAGES,
  INITIAL_AUDIT_LOGS,
  INITIAL_ROLES_PERMISSIONS,
  INITIAL_ADMIN_USERS,
} from '../data/adminData';

export type AdminTab =
  | 'dashboard'
  | 'website'
  | 'cms'
  | 'products'
  | 'customers'
  | 'leads'
  | 'onboarding'
  | 'subscriptions'
  | 'media'
  | 'analytics'
  | 'seo'
  | 'apps'
  | 'notifications'
  | 'ai'
  | 'integrations'
  | 'security'
  | 'audit'
  | 'system'
  | 'reports'
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AdminContextType {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  dateRange: 'today' | '7d' | '30d' | '90d' | 'all';
  setDateRange: (range: 'today' | '7d' | '30d' | '90d' | 'all') => void;
  
  // Website Pages & Sections
  pages: WebsitePage[];
  updatePage: (page: WebsitePage) => void;
  createPage: (page: Omit<WebsitePage, 'id' | 'views'>) => void;
  deletePage: (id: string) => void;
  homepageSections: HomepageSection[];
  updateSection: (section: HomepageSection) => void;
  toggleSectionEnabled: (id: string) => void;
  reorderSections: (newSections: HomepageSection[]) => void;
  websiteConfig: WebsiteGlobalConfig;
  updateWebsiteConfig: (cfg: Partial<WebsiteGlobalConfig>) => void;

  // Customers & Leads
  customers: AdminCustomer[];
  updateCustomer: (c: AdminCustomer) => void;
  createCustomer: (c: Omit<AdminCustomer, 'id' | 'contractStart'>) => void;
  leads: AdminLead[];
  updateLead: (l: AdminLead) => void;
  updateLeadStatus: (id: string, status: AdminLead['status']) => void;
  addLeadNote: (id: string, text: string, author?: string) => void;
  convertLeadToCustomer: (leadId: string) => void;

  // Onboarding
  onboarding: AdminOnboardingItem[];
  toggleOnboardingStep: (onboardingId: string, stepId: string) => void;

  // Media
  media: AdminMediaAsset[];
  addMediaAsset: (asset: Omit<AdminMediaAsset, 'id' | 'uploadedAt' | 'usageCount'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Apps & Releases
  releases: AdminAppRelease[];
  createRelease: (release: Omit<AdminAppRelease, 'id' | 'downloadCount'>) => void;
  updateRelease: (release: AdminAppRelease) => void;

  // Notifications
  notificationTemplates: AdminNotificationTemplate[];
  updateNotificationTemplate: (tpl: AdminNotificationTemplate) => void;
  broadcastAlert: (title: string, message: string, severity: 'info' | 'warning' | 'urgent') => void;

  // Integrations & SEO
  integrations: AdminIntegration[];
  updateIntegration: (integration: AdminIntegration) => void;
  testIntegration: (id: string) => Promise<{ success: boolean; latency: number }>;
  seoPages: AdminSeoPage[];
  updateSeoPage: (page: AdminSeoPage) => void;

  // Security & Users
  adminUsers: AdminUserAccount[];
  createAdminUser: (u: Omit<AdminUserAccount, 'id' | 'createdAt'>) => void;
  updateAdminUser: (u: AdminUserAccount) => void;
  roles: AdminRoleDefinition[];
  updateRolePermissions: (roleId: string, permissions: string[]) => void;

  // Audit Logs
  auditLogs: AdminAuditItem[];
  logAuditEvent: (event: Omit<AdminAuditItem, 'id' | 'timestamp'>) => void;

  // System & OmniSearch
  isOmniSearchOpen: boolean;
  openOmniSearch: () => void;
  closeOmniSearch: () => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d' | 'all'>('30d');
  
  // Stored state with local storage fallback
  const [pages, setPages] = useState<WebsitePage[]>(() => {
    const saved = localStorage.getItem('artify_admin_pages');
    return saved ? JSON.parse(saved) : INITIAL_WEBSITE_PAGES;
  });

  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(() => {
    const saved = localStorage.getItem('artify_admin_sections');
    return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_SECTIONS;
  });

  const [websiteConfig, setWebsiteConfig] = useState<WebsiteGlobalConfig>(() => {
    const saved = localStorage.getItem('artify_admin_config');
    return saved ? JSON.parse(saved) : INITIAL_WEBSITE_CONFIG;
  });

  const [customers, setCustomers] = useState<AdminCustomer[]>(() => {
    const saved = localStorage.getItem('artify_admin_customers');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_CUSTOMERS;
  });

  const [leads, setLeads] = useState<AdminLead[]>(() => {
    const saved = localStorage.getItem('artify_admin_leads');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_LEADS;
  });

  const [onboarding, setOnboarding] = useState<AdminOnboardingItem[]>(() => {
    const saved = localStorage.getItem('artify_admin_onboarding');
    return saved ? JSON.parse(saved) : INITIAL_ONBOARDING_PIPELINE;
  });

  const [media, setMedia] = useState<AdminMediaAsset[]>(() => {
    const saved = localStorage.getItem('artify_admin_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
  });

  const [releases, setReleases] = useState<AdminAppRelease[]>(() => {
    const saved = localStorage.getItem('artify_admin_releases');
    return saved ? JSON.parse(saved) : INITIAL_APP_RELEASES;
  });

  const [notificationTemplates, setNotificationTemplates] = useState<AdminNotificationTemplate[]>(() => {
    const saved = localStorage.getItem('artify_admin_notif_templates');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATION_TEMPLATES;
  });

  const [integrations, setIntegrations] = useState<AdminIntegration[]>(() => {
    const saved = localStorage.getItem('artify_admin_integrations');
    return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS;
  });

  const [seoPages, setSeoPages] = useState<AdminSeoPage[]>(() => {
    const saved = localStorage.getItem('artify_admin_seo');
    return saved ? JSON.parse(saved) : INITIAL_SEO_PAGES;
  });

  const [auditLogs, setAuditLogs] = useState<AdminAuditItem[]>(() => {
    const saved = localStorage.getItem('artify_admin_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [roles, setRoles] = useState<AdminRoleDefinition[]>(() => {
    const saved = localStorage.getItem('artify_admin_roles');
    return saved ? JSON.parse(saved) : INITIAL_ROLES_PERMISSIONS;
  });

  const [adminUsers, setAdminUsers] = useState<AdminUserAccount[]>(() => {
    const saved = localStorage.getItem('artify_admin_users');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
  });

  const [isOmniSearchOpen, setIsOmniSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage synchronizers
  useEffect(() => {
    localStorage.setItem('artify_admin_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('artify_admin_sections', JSON.stringify(homepageSections));
  }, [homepageSections]);

  useEffect(() => {
    localStorage.setItem('artify_admin_config', JSON.stringify(websiteConfig));
  }, [websiteConfig]);

  useEffect(() => {
    localStorage.setItem('artify_admin_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('artify_admin_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('artify_admin_onboarding', JSON.stringify(onboarding));
  }, [onboarding]);

  useEffect(() => {
    localStorage.setItem('artify_admin_media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem('artify_admin_releases', JSON.stringify(releases));
  }, [releases]);

  useEffect(() => {
    localStorage.setItem('artify_admin_notif_templates', JSON.stringify(notificationTemplates));
  }, [notificationTemplates]);

  useEffect(() => {
    localStorage.setItem('artify_admin_integrations', JSON.stringify(integrations));
  }, [integrations]);

  useEffect(() => {
    localStorage.setItem('artify_admin_seo', JSON.stringify(seoPages));
  }, [seoPages]);

  useEffect(() => {
    localStorage.setItem('artify_admin_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('artify_admin_roles', JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem('artify_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  // Toast System
  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAuditEvent = (event: Omit<AdminAuditItem, 'id' | 'timestamp'>) => {
    const now = new Date();
    const formatted = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]} UTC`;
    const newLog: AdminAuditItem = {
      id: `aud-${Date.now()}`,
      timestamp: formatted,
      ...event,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 199)]);
  };

  // Website Management Actions
  const updatePage = (updated: WebsitePage) => {
    setPages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'WEBSITE_PAGE_UPDATED',
      category: 'cms',
      targetResource: `Page: ${updated.slug}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
      detailsDiff: { after: `Status: ${updated.status}, Version: ${updated.version}` },
    });
    addToast('success', 'Website Page Updated', `Successfully saved changes to "${updated.title}".`);
  };

  const createPage = (pageData: Omit<WebsitePage, 'id' | 'views'>) => {
    const newPage: WebsitePage = {
      id: `page-${pageData.slug}-${Date.now()}`,
      views: 0,
      ...pageData,
    };
    setPages((prev) => [...prev, newPage]);
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'WEBSITE_PAGE_CREATED',
      category: 'cms',
      targetResource: `Page: ${newPage.slug}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
    });
    addToast('success', 'Page Created', `Page "${newPage.title}" has been created.`);
  };

  const deletePage = (id: string) => {
    const target = pages.find((p) => p.id === id);
    setPages((prev) => prev.filter((p) => p.id !== id));
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'WEBSITE_PAGE_DELETED',
      category: 'cms',
      targetResource: `Page: ${target?.slug || id}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'warning',
    });
    addToast('info', 'Page Removed', `Page has been deleted.`);
  };

  const updateSection = (updated: HomepageSection) => {
    setHomepageSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'HOMEPAGE_SECTION_UPDATED',
      category: 'cms',
      targetResource: `Section: ${updated.componentKey}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
    });
    addToast('success', 'Homepage Section Updated', `Updated section "${updated.name}".`);
  };

  const toggleSectionEnabled = (id: string) => {
    setHomepageSections((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.enabled;
          logAuditEvent({
            actorName: 'Super Administrator',
            actorEmail: 'admin@artifysols.com',
            actorRole: 'Super Administrator',
            action: next ? 'SECTION_ACTIVATED' : 'SECTION_DEACTIVATED',
            category: 'cms',
            targetResource: `Section: ${s.componentKey}`,
            ipAddress: '127.0.0.1',
            device: 'Admin Control Center Web Session',
            status: 'success',
            detailsDiff: { before: `enabled: ${s.enabled}`, after: `enabled: ${next}` },
          });
          addToast('info', `Section ${next ? 'Enabled' : 'Disabled'}`, `Visibility toggled for ${s.name}.`);
          return { ...s, enabled: next };
        }
        return s;
      })
    );
  };

  const reorderSections = (newSections: HomepageSection[]) => {
    const updated = newSections.map((s, idx) => ({ ...s, order: idx + 1 }));
    setHomepageSections(updated);
    addToast('success', 'Layout Updated', 'Homepage section sequence updated.');
  };

  const updateWebsiteConfig = (cfg: Partial<WebsiteGlobalConfig>) => {
    setWebsiteConfig((prev) => ({ ...prev, ...cfg }));
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'GLOBAL_CONFIG_UPDATED',
      category: 'system',
      targetResource: 'WebsiteGlobalConfig',
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
    });
    addToast('success', 'Site Configuration Saved', 'Global branding and contact information updated.');
  };

  // Customers & CRM
  const updateCustomer = (c: AdminCustomer) => {
    setCustomers((prev) => prev.map((item) => (item.id === c.id ? c : item)));
    addToast('success', 'Customer Record Saved', `Updated account details for ${c.companyName}.`);
  };

  const createCustomer = (c: Omit<AdminCustomer, 'id' | 'contractStart'>) => {
    const newCust: AdminCustomer = {
      id: `cust-${Date.now()}`,
      contractStart: new Date().toISOString().split('T')[0],
      ...c,
    };
    setCustomers((prev) => [newCust, ...prev]);
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'CUSTOMER_ACCOUNT_CREATED',
      category: 'users',
      targetResource: `Customer: ${newCust.companyName}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
    });
    addToast('success', 'Customer Account Provisioned', `${newCust.companyName} is now active.`);
  };

  const updateLead = (l: AdminLead) => {
    setLeads((prev) => prev.map((item) => (item.id === l.id ? l : item)));
    addToast('success', 'Lead Details Saved', `Lead ${l.refNumber} updated.`);
  };

  const updateLeadStatus = (id: string, status: AdminLead['status']) => {
    setLeads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          logAuditEvent({
            actorName: 'Super Administrator',
            actorEmail: 'admin@artifysols.com',
            actorRole: 'Super Administrator',
            action: 'LEAD_STAGE_TRANSITIONED',
            category: 'users',
            targetResource: `Lead: ${item.refNumber}`,
            ipAddress: '127.0.0.1',
            device: 'Admin Control Center Web Session',
            status: 'success',
            detailsDiff: { before: `status: ${item.status}`, after: `status: ${status}` },
          });
          return { ...item, status };
        }
        return item;
      })
    );
    addToast('info', 'Lead Stage Updated', `Status changed to ${status.toUpperCase()}.`);
  };

  const addLeadNote = (id: string, text: string, author: string = 'Super Administrator') => {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          return {
            ...l,
            notes: [...l.notes, { id: `note-${Date.now()}`, author, text, date: dateStr }],
          };
        }
        return l;
      })
    );
    addToast('success', 'Note Logged', 'Internal CRM note added.');
  };

  const convertLeadToCustomer = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    // 1. Mark lead as converted
    updateLeadStatus(leadId, 'converted');

    // 2. Create customer record
    createCustomer({
      companyName: lead.company,
      domain: lead.email.split('@')[1] || `${lead.company.toLowerCase().replace(/\s+/g, '')}.com`,
      industry: lead.industry,
      tier: 'Enterprise',
      status: 'onboarding',
      mrr: 5000,
      usersCount: 5,
      productsCount: 1,
      activeAgentsCount: 4,
      renewalDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
      accountManager: lead.assignedTo || 'Liam Harrison',
      leadSource: lead.source,
      address: 'Corporate Headquarters',
      taxNumber: `US-${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000000 + Math.random() * 8999999)}`,
      phone: lead.phone,
      email: lead.email,
      onboardingProgress: 20,
    });

    // 3. Create onboarding pipeline record
    const newOnboarding: AdminOnboardingItem = {
      id: `onb-${Date.now()}`,
      customerId: `cust-${Date.now()}`,
      companyName: lead.company,
      currentStage: 'onboarding',
      progressPct: 20,
      assignedArchitect: lead.assignedTo || 'Liam Harrison',
      startedAt: new Date().toISOString().split('T')[0],
      targetGoLive: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      steps: [
        { id: 's-1', title: 'Contract & Commercial Term Finalization', completed: true, completedAt: new Date().toISOString().split('T')[0] },
        { id: 's-2', title: 'Dedicated VPC & Data Boundary Provisioning', completed: false },
        { id: 's-3', title: 'ERP & Source Data Ingress Sync', completed: false },
        { id: 's-4', title: 'Autonomous Swarm Calibration & Tooling', completed: false },
        { id: 's-5', title: 'Final Architecture Validation & Sign-off', completed: false },
      ],
    };
    setOnboarding((prev) => [newOnboarding, ...prev]);

    addToast('success', 'Lead Converted to Customer!', `Created customer profile and onboarding pipeline for ${lead.company}.`);
  };

  // Onboarding steps
  const toggleOnboardingStep = (onboardingId: string, stepId: string) => {
    setOnboarding((prev) =>
      prev.map((item) => {
        if (item.id === onboardingId) {
          const updatedSteps = item.steps.map((st) => {
            if (st.id === stepId) {
              const next = !st.completed;
              return {
                ...st,
                completed: next,
                completedAt: next ? new Date().toISOString().split('T')[0] : undefined,
              };
            }
            return st;
          });
          const completedCount = updatedSteps.filter((s) => s.completed).length;
          const progressPct = Math.round((completedCount / updatedSteps.length) * 100);
          return {
            ...item,
            steps: updatedSteps,
            progressPct,
            currentStage: progressPct === 100 ? 'active' : 'onboarding',
          };
        }
        return item;
      })
    );
    addToast('info', 'Onboarding Checklist Updated', 'Progress metrics re-calculated.');
  };

  // Media
  const addMediaAsset = (asset: Omit<AdminMediaAsset, 'id' | 'uploadedAt' | 'usageCount'>) => {
    const newAsset: AdminMediaAsset = {
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      usageCount: 0,
      ...asset,
    };
    setMedia((prev) => [newAsset, ...prev]);
    addToast('success', 'Asset Added to Digital Library', `Uploaded ${asset.filename}.`);
  };

  const deleteMediaAsset = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    addToast('info', 'Asset Deleted', 'Media asset removed.');
  };

  // Releases
  const createRelease = (release: Omit<AdminAppRelease, 'id' | 'downloadCount'>) => {
    const newRelease: AdminAppRelease = {
      id: `rel-${Date.now()}`,
      downloadCount: 0,
      ...release,
    };
    setReleases((prev) => [newRelease, ...prev]);
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'APP_RELEASE_PUBLISHED',
      category: 'system',
      targetResource: `App: ${release.appName} (${release.version})`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
    });
    addToast('success', 'Release Published', `Version ${release.version} for ${release.platform.toUpperCase()} registered.`);
  };

  const updateRelease = (release: AdminAppRelease) => {
    setReleases((prev) => prev.map((r) => (r.id === release.id ? release : r)));
    addToast('success', 'Release Updated', `Modified ${release.appName}.`);
  };

  // Notifications
  const updateNotificationTemplate = (tpl: AdminNotificationTemplate) => {
    setNotificationTemplates((prev) => prev.map((t) => (t.id === tpl.id ? tpl : t)));
    addToast('success', 'Template Saved', `Updated notification template "${tpl.name}".`);
  };

  const broadcastAlert = (title: string, message: string, severity: 'info' | 'warning' | 'urgent') => {
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'SYSTEM_ALERT_BROADCAST',
      category: 'system',
      targetResource: 'GlobalInAppBroadcast',
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: severity === 'urgent' ? 'warning' : 'success',
      detailsDiff: { after: `Title: ${title}, Message: ${message}` },
    });
    addToast('warning', `System Broadcast Dispatched [${severity.toUpperCase()}]`, title);
  };

  // Integrations & SEO
  const updateIntegration = (integration: AdminIntegration) => {
    setIntegrations((prev) => prev.map((i) => (i.id === integration.id ? integration : i)));
    addToast('success', 'Integration Configuration Saved', `Settings updated for ${integration.name}.`);
  };

  const testIntegration = async (id: string): Promise<{ success: boolean; latency: number }> => {
    const target = integrations.find((i) => i.id === id);
    const start = performance.now();
    // Simulate real network ping to gateway endpoint
    await new Promise((resolve) => setTimeout(resolve, 600));
    const latency = Math.round(performance.now() - start);

    const isConnected = target?.status !== 'error';
    if (isConnected) {
      setIntegrations((prev) =>
        prev.map((i) => (i.id === id ? { ...i, lastSync: 'Just now (Verified)', status: 'connected' } : i))
      );
      addToast('success', 'Connection Test Succeeded', `${target?.name} verified. Latency: ${latency}ms.`);
      return { success: true, latency };
    } else {
      addToast('error', 'Connection Test Failed', `Could not reach ${target?.name} API gateway.`);
      return { success: false, latency };
    }
  };

  const updateSeoPage = (page: AdminSeoPage) => {
    setSeoPages((prev) => prev.map((p) => (p.id === page.id ? page : p)));
    addToast('success', 'SEO Metadata Updated', `Saved meta directives for "${page.pageName}".`);
  };

  // Users & Roles
  const createAdminUser = (u: Omit<AdminUserAccount, 'id' | 'createdAt'>) => {
    const newUser: AdminUserAccount = {
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...u,
    };
    setAdminUsers((prev) => [...prev, newUser]);
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'USER_ACCOUNT_CREATED',
      category: 'users',
      targetResource: `User: ${newUser.email}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'success',
    });
    addToast('success', 'User Account Created', `Invitation sent to ${newUser.email}.`);
  };

  const updateAdminUser = (u: AdminUserAccount) => {
    setAdminUsers((prev) => prev.map((user) => (user.id === u.id ? u : user)));
    addToast('success', 'User Account Updated', `Changes saved for ${u.name}.`);
  };

  const updateRolePermissions = (roleId: string, permissions: string[]) => {
    setRoles((prev) => prev.map((r) => (r.id === roleId ? { ...r, permissions } : r)));
    logAuditEvent({
      actorName: 'Super Administrator',
      actorEmail: 'admin@artifysols.com',
      actorRole: 'Super Administrator',
      action: 'ROLE_PERMISSIONS_UPDATED',
      category: 'users',
      targetResource: `Role: ${roleId}`,
      ipAddress: '127.0.0.1',
      device: 'Admin Control Center Web Session',
      status: 'warning',
      detailsDiff: { after: `Permissions count: ${permissions.length}` },
    });
    addToast('success', 'RBAC Matrix Updated', 'Role permissions updated in production security registry.');
  };

  // Keyboard shortcut for OmniSearch (`Ctrl+K` or `Cmd+K`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOmniSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dateRange,
        setDateRange,
        pages,
        updatePage,
        createPage,
        deletePage,
        homepageSections,
        updateSection,
        toggleSectionEnabled,
        reorderSections,
        websiteConfig,
        updateWebsiteConfig,
        customers,
        updateCustomer,
        createCustomer,
        leads,
        updateLead,
        updateLeadStatus,
        addLeadNote,
        convertLeadToCustomer,
        onboarding,
        toggleOnboardingStep,
        media,
        addMediaAsset,
        deleteMediaAsset,
        releases,
        createRelease,
        updateRelease,
        notificationTemplates,
        updateNotificationTemplate,
        broadcastAlert,
        integrations,
        updateIntegration,
        testIntegration,
        seoPages,
        updateSeoPage,
        adminUsers,
        createAdminUser,
        updateAdminUser,
        roles,
        updateRolePermissions,
        auditLogs,
        logAuditEvent,
        isOmniSearchOpen,
        openOmniSearch: () => setIsOmniSearchOpen(true),
        closeOmniSearch: () => setIsOmniSearchOpen(false),
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
