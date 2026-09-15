import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Key,
  Lock,
  Plus,
  Search,
  Check,
  AlertTriangle,
  X,
  Mail,
  Building,
  Fingerprint,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminUserAccount, AdminRoleDefinition } from '../../data/adminData';

interface RbacManagerProps {
  theme: 'dark' | 'light';
}

export const RbacManager: React.FC<RbacManagerProps> = ({ theme }) => {
  const {
    adminUsers,
    createAdminUser,
    updateAdminUser,
    roles,
    updateRolePermissions,
    addToast,
  } = useAdmin();

  const isLight = theme === 'light';

  const [activeSubTab, setActiveSubTab] = useState<'users' | 'roles'>('users');
  const [searchTerm, setSearchTerm] = useState('');

  // Add User Modal
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState(roles[0]?.name || 'Super Admin');
  const [newUserCompany, setNewUserCompany] = useState('Artify HQ');

  // Selected Role for Permissions Matrix
  const [selectedRole, setSelectedRole] = useState<AdminRoleDefinition>(roles[0]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    createAdminUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      company: newUserCompany,
      status: 'active',
      mfaEnabled: true,
      lastLogin: 'Never',
    });

    setNewUserName('');
    setNewUserEmail('');
    setIsAddUserOpen(false);
    addToast('success', `Operator ${newUserName} provisioned with role ${newUserRole}.`);
  };

  const handleTogglePermission = (permissionKey: string) => {
    if (!selectedRole) return;
    const exists = selectedRole.permissions.includes(permissionKey);
    const updated = exists
      ? selectedRole.permissions.filter((p) => p !== permissionKey)
      : [...selectedRole.permissions, permissionKey];

    updateRolePermissions(selectedRole.id, updated);
    setSelectedRole({ ...selectedRole, permissions: updated });
    addToast('info', `Permissions updated for role ${selectedRole.name}.`);
  };

  const allSystemPermissions = [
    { key: 'cms.read', label: 'View CMS Pages & Layouts', category: 'CMS' },
    { key: 'cms.write', label: 'Modify Copy, Sections & SEO', category: 'CMS' },
    { key: 'cms.publish', label: 'Publish to Production Site', category: 'CMS' },
    { key: 'clients.view', label: 'View Enterprise Client Data', category: 'Clients' },
    { key: 'clients.manage', label: 'Create & Edit Client Tenancies', category: 'Clients' },
    { key: 'leads.convert', label: 'Convert Inbound Briefs', category: 'Clients' },
    { key: 'agents.deploy', label: 'Provision Autonomous Agent Fleets', category: 'AI & Systems' },
    { key: 'security.rbac', label: 'Manage Roles & Auth Policies', category: 'Security' },
    { key: 'integrations.configure', label: 'Configure API Mesh & Connectors', category: 'Integrations' },
    { key: 'releases.manage', label: 'Deploy & Roll Back Software Builds', category: 'DevOps' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Access Governance & RBAC Security
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Enforce Zero Trust access, multi-factor policies, and granular permissions across internal operators and architects.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/[0.06] self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'users' ? 'bg-violet-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Operators ({adminUsers.length})
          </button>

          <button
            onClick={() => setActiveSubTab('roles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'roles' ? 'bg-violet-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Role Definitions ({roles.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: USERS LIST */}
      {activeSubTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search operators by name or email..."
                className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                }`}
              />
            </div>

            <button
              onClick={() => setIsAddUserOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/25 transition-all self-end sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Invite Operator</span>
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-white/[0.04] bg-white/[0.02] text-zinc-400'}`}>
                  <th className="py-3.5 px-4 font-semibold">Operator</th>
                  <th className="py-3.5 px-4 font-semibold">Assigned Role</th>
                  <th className="py-3.5 px-4 font-semibold">Organization</th>
                  <th className="py-3.5 px-4 font-semibold">MFA Security</th>
                  <th className="py-3.5 px-4 font-semibold">Last Active</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {adminUsers
                  .filter(
                    (u) =>
                      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      u.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user) => (
                    <tr key={user.id} className={`group ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                      <td className="py-3.5 px-4 font-medium">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isLight ? 'bg-violet-100 text-violet-700' : 'bg-violet-950/60 border border-violet-700/30 text-violet-300'
                          }`}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.name}</div>
                            <div className="text-[10px] text-zinc-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-400">{user.company}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Hardware MFA</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500 font-mono-code">{user.lastLogin}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ROLES & PERMISSIONS MATRIX */}
      {activeSubTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Roles Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r)}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  selectedRole.id === r.id
                    ? 'bg-violet-600/10 border-violet-500 text-white shadow-md'
                    : isLight ? 'bg-white border-slate-200' : 'bg-[#0b0b12] border-white/[0.08] text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white">{r.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] font-mono-code">
                    {r.permissions.length} perms
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{r.description}</p>
              </button>
            ))}
          </div>

          {/* Permissions Matrix (8 Cols) */}
          <div className={`lg:col-span-8 p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
              <div>
                <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Permissions Matrix: {selectedRole.name}
                </h3>
                <p className="text-xs text-zinc-400">Toggle capabilities granted to this administrative tier.</p>
              </div>
              <span className="text-xs text-violet-400 font-mono-code font-bold">
                {selectedRole.permissions.length} Active Privileges
              </span>
            </div>

            <div className="space-y-2.5">
              {allSystemPermissions.map((perm) => {
                const isChecked = selectedRole.permissions.includes(perm.key);

                return (
                  <div
                    key={perm.key}
                    onClick={() => handleTogglePermission(perm.key)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked
                        ? isLight ? 'bg-violet-50 border-violet-200' : 'bg-violet-950/20 border-violet-500/30'
                        : isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/[0.04]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isChecked ? 'text-violet-300' : 'text-zinc-400'}`}>
                          {perm.label}
                        </span>
                        <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400">
                          {perm.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono-code">{perm.key}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-violet-600 text-white' : 'border border-zinc-600'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* INVITE OPERATOR MODAL */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0f0f18] border-white/[0.1]'
          }`}>
            <h3 className={`text-base font-bold font-display mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Provision Administrative Operator
            </h3>
            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Sarah Chen"
                  required
                  className={`w-full p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Corporate Email</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="schen@artifysols.com"
                  required
                  className={`w-full p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Role Assignment</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-md shadow-violet-600/25"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
