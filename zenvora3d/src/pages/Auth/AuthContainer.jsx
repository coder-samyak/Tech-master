import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, AlertCircle, Key, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TiltCard } from '../../components/ui/TiltCard';

export const AuthContainer = ({ onAuthSuccess }) => {
  const { login, requestPasswordReset, changePassword } = useDatabase();
  const [mode, setMode] = useState('login'); // login, forgot, change

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      setLoading(false);

      if (!res.success) {
        setError(res.message || 'Authentication failed.');
        return;
      }

      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess();
      }
    } catch (err) {
      console.error("Login submission failed:", err);
      setLoading(false);
      setError("System login failure: " + err.message);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = requestPasswordReset(forgotEmail);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
      } else {
        setError(res.message);
      }
    }, 800);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => setMode('login'), 2000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative px-4 overflow-hidden luxury-grid">
      {/* Decorative luxury blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full filter blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-luxury-darkgold/3 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-luxury-gold to-luxury-darkgold flex items-center justify-center text-black font-serif font-black text-2xl shadow-gold-glow-lg border border-luxury-lightgold/20">
            TM
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-widest font-serif gold-text-gradient">
              TECHMASTER
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase font-mono">
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Auth Box */}
        <div className="glass-panel p-8 relative overflow-hidden border border-zinc-800/80 rounded-lg">
          <AnimatePresence mode="wait">
            {mode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-xl font-medium text-zinc-100 text-left mb-6 uppercase tracking-wider">
                  System Login
                </h3>

                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5" autoComplete="off">
                  <Input
                    label="Executive Email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                  />

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
                        Access Key
                      </label>
                      <button
                        type="button"
                        onClick={() => { setError(''); setMode('forgot'); }}
                        className="text-xs text-luxury-gold hover:text-white transition-colors cursor-pointer"
                      >
                        Reset Key?
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className="w-full bg-zinc-950/60 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/30 transition-all duration-300"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-md p-3 flex items-start gap-2.5 text-left">
                      <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-rose-300 leading-relaxed">{error}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleLoginSubmit}
                    disabled={loading}
                    className="w-full py-3 mt-2 flex items-center justify-center gap-2 border border-luxury-gold/35 bg-zinc-950/60 hover:bg-luxury-gold/5 text-luxury-gold hover:text-white rounded-md font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-luxury-gold" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                        <span className="text-luxury-gold">Authenticate Access</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {mode === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => { setError(''); setSuccessMsg(''); setMode('login'); }}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-serif text-lg font-medium text-zinc-100 uppercase tracking-wider">
                    Key Recovery
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed text-left mb-6">
                  Enter your registered executive email below. We will send a secure token verification code to restore your administrative credentials.
                </p>

                <form onSubmit={handleForgotSubmit} className="flex flex-col gap-5">
                  <Input
                    label="Registered Email"
                    type="email"
                    placeholder="e.g. admin@techmaster.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />

                  {error && (
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-md p-3 flex items-start gap-2 text-left">
                      <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-rose-300 leading-relaxed">{error}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-md p-3 flex items-start gap-2 text-left">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-emerald-300 leading-relaxed">{successMsg}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-black" />
                        <span>Send Recovery Key</span>
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setMode('change')}
                      className="text-xs text-zinc-500 hover:text-luxury-gold transition-colors cursor-pointer"
                    >
                      Already have a recovery token? Change password
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {mode === 'change' && (
              <motion.div
                key="change"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => { setError(''); setSuccessMsg(''); setMode('login'); }}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-serif text-lg font-medium text-zinc-100 uppercase tracking-wider">
                    Change Password
                  </h3>
                </div>

                <form onSubmit={handleChangePasswordSubmit} className="flex flex-col gap-4 text-left">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />

                  <Input
                    label="New Password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Retype new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />

                  {error && (
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-md p-3 flex items-start gap-2 text-left">
                      <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-rose-300">{error}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-md p-3 flex items-start gap-2 text-left">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-emerald-300">{successMsg}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 flex items-center justify-center gap-2 mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        <Key className="w-4 h-4 text-black" />
                        <span>Update Security Key</span>
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};