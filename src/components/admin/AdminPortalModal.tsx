import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import { ApiService } from '../../services/apiService';
import { AdminUserSummary, AdminStats } from '../../types/auth';
import {
  ShieldCheck,
  Users,
  Code2,
  FileCheck2,
  FileText,
  X,
  Search,
  RefreshCw
} from 'lucide-react';

export const AdminPortalModal: React.FC = () => {
  const { user, isAdminModalOpen, setIsAdminModalOpen } = useAuth();
  const { showToast } = useStudy();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchAdminData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, usersData] = await Promise.all([
        ApiService.getAdminStats(),
        ApiService.getAdminUsers()
      ]);
      setStats(statsData);
      setUsers(usersData);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch admin data', 'warning');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (isAdminModalOpen && user?.role === 'admin') {
      fetchAdminData();
    }
  }, [isAdminModalOpen, user, fetchAdminData]);

  const handleToggleRole = async (targetUser: AdminUserSummary) => {
    const nextRole = targetUser.role === 'admin' ? 'student' : 'admin';
    if (!window.confirm(`Change ${targetUser.name}'s role to ${nextRole.toUpperCase()}?`)) {
      return;
    }

    setUpdatingId(targetUser.id);
    try {
      await ApiService.updateUserRole(targetUser.id, nextRole);
      showToast(`User ${targetUser.name} updated to ${nextRole}`, 'success');
      setUsers(prev => prev.map(u => u.id === targetUser.id ? { ...u, role: nextRole } : u));
    } catch (err: any) {
      showToast(err.message || 'Failed to update role', 'warning');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAdminModalOpen || user?.role !== 'admin') return null;

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-aurora-bg-surface border border-aurora-border shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-transparent border-b border-aurora-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-aurora-text-primary">Admin Control Center</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/40">
                  RBAC Enforced
                </span>
              </div>
              <p className="text-xs text-aurora-text-secondary">
                Platform-wide user management, database records analytics, and security control.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              disabled={loading}
              className="p-2 rounded-xl text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="p-6 border-b border-aurora-border/60 bg-aurora-bg-elevated/40 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
            <div className="flex items-center justify-between text-xs text-aurora-text-secondary mb-1">
              <span>Total Users</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-aurora-text-primary">{stats?.totalUsers ?? '—'}</div>
          </div>

          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
            <div className="flex items-center justify-between text-xs text-aurora-text-secondary mb-1">
              <span>Code Submissions</span>
              <Code2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-aurora-text-primary">{stats?.totalSubmissions ?? '—'}</div>
          </div>

          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
            <div className="flex items-center justify-between text-xs text-aurora-text-secondary mb-1">
              <span>Aptitude Attempts</span>
              <FileCheck2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-aurora-text-primary">{stats?.totalAttempts ?? '—'}</div>
          </div>

          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
            <div className="flex items-center justify-between text-xs text-aurora-text-secondary mb-1">
              <span>Resumes Analyzed</span>
              <FileText className="w-4 h-4 text-[#FA4616]" />
            </div>
            <div className="text-xl font-bold text-aurora-text-primary">{stats?.totalResumes ?? '—'}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-aurora-border bg-aurora-bg-surface flex items-center justify-between shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user name, email, or user ID..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div className="text-xs text-aurora-text-secondary">
            Showing <strong className="text-aurora-text-primary">{filteredUsers.length}</strong> of {users.length} accounts
          </div>
        </div>

        {/* Users Table */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="py-12 text-center text-xs text-aurora-text-secondary">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-400" />
              Loading database records...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-xs text-aurora-text-secondary">
              No matching accounts found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-aurora-border text-aurora-text-secondary uppercase tracking-wider text-[10px]">
                    <th className="pb-2.5 pl-2">User Details</th>
                    <th className="pb-2.5">User ID</th>
                    <th className="pb-2.5">Role</th>
                    <th className="pb-2.5">Submissions</th>
                    <th className="pb-2.5">Aptitude</th>
                    <th className="pb-2.5">Resumes</th>
                    <th className="pb-2.5 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-aurora-border/60">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-aurora-bg-elevated/50 transition-colors">
                      <td className="py-3 pl-2">
                        <div className="font-semibold text-aurora-text-primary">{u.name}</div>
                        <div className="text-[11px] text-aurora-text-secondary">{u.email}</div>
                      </td>
                      <td className="py-3 font-mono text-[11px] text-aurora-text-secondary select-all">
                        {u.id.substring(0, 10)}...
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 text-aurora-text-primary font-mono">{u.metrics.submissionsCount}</td>
                      <td className="py-3 text-aurora-text-primary font-mono">{u.metrics.attemptsCount}</td>
                      <td className="py-3 text-aurora-text-primary font-mono">{u.metrics.resumesCount}</td>
                      <td className="py-3 text-right pr-2">
                        <button
                          onClick={() => handleToggleRole(u)}
                          disabled={updatingId === u.id || u.id === user.id}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary disabled:opacity-40 transition-colors"
                          title={u.id === user.id ? 'Cannot change your own role' : 'Toggle role'}
                        >
                          {updatingId === u.id ? 'Updating...' : u.role === 'admin' ? 'Demote' : 'Promote Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
