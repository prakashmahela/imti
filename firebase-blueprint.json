import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Mail, Lock, User, Plus, Trash2, Edit3, Settings, Clipboard, List, LogOut, CheckCircle2, Maximize2, Minimize2 } from 'lucide-react';
import { ApiClient, ApiUser, ApiOrder } from '../lib/api';
import { Product, SocietyPass } from '../types';

interface AccessPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (pass: SocietyPass) => void;
  onOpenPassViewer: () => void;
}

export default function AccessPortalModal({
  isOpen,
  onClose,
  onOrderSuccess,
  onOpenPassViewer,
}: AccessPortalModalProps) {
  const [isMaximized, setIsMaximized] = useState(true);
  // Modes: 'bypass' | 'login' | 'register' | 'profile' | 'admin'
  const [mode, setMode] = useState<'bypass' | 'login' | 'register' | 'profile' | 'admin'>('bypass');
  
  // Forms state
  const [gateCode, setGateCode] = useState('');
  const [gateFeedback, setGateFeedback] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Logged-in profile data
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);
  const [orders, setOrders] = useState<ApiOrder[]>([]);

  // Admin states
  const [adminSection, setAdminSection] = useState<'products' | 'orders' | 'messages' | 'subscribers'>('products');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [allSubscribers, setAllSubscribers] = useState<any[]>([]);

  // Admin New Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('ESSENTIALS');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdGsm, setNewProdGsm] = useState('500');
  const [newProdImage, setNewProdImage] = useState('https://i.ibb.co/WN8XTMD1/download-2.jpg');
  const [newProdInventory, setNewProdInventory] = useState('50');

  // Load profile state on mount / change
  useEffect(() => {
    const usr = ApiClient.getUser();
    if (usr) {
      setCurrentUser(usr);
      setMode('profile');
      loadProfileData();
    } else {
      setCurrentUser(null);
      setMode('bypass');
    }
  }, [isOpen]);

  const loadProfileData = async () => {
    try {
      const data = await ApiClient.getProfile();
      setOrders(data.orders);
      if (data.user.role === 'ADMIN') {
        loadAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAdminData = async () => {
    try {
      const prods = await ApiClient.getProducts();
      setAllProducts(prods);
      const ords = await ApiClient.getAllOrders();
      setAllOrders(ords);
      const msgs = await ApiClient.getContactMessages();
      setAllMessages(msgs);
      const subs = await ApiClient.getNewsletterSubscribers();
      setAllSubscribers(subs);
    } catch (err) {
      console.error('Failed loading admin database state', err);
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateCode.trim().toUpperCase() === 'MOCK_SOCIETY') {
      const mockPass: SocietyPass = {
        id: 'M-' + Math.floor(100000 + Math.random() * 900000),
        holderName: 'DEVELOPER DISCOVER',
        tier: 'FOUNDER_GEN',
        issueDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        accessCode: 'A0B2C4D6',
        active: true,
      };
      onOrderSuccess(mockPass);
      setGateFeedback('SUCCESS_ MOCKED ACCESS TO LEVEL_01 SECURED!');
      setTimeout(() => {
        setGateCode('');
        setGateFeedback('');
        onClose();
        onOpenPassViewer();
      }, 1000);
    } else {
      setGateFeedback('INCORRECT RECIPIENT ACCESS PROTOCOL CODE.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      const data = await ApiClient.login({ email, password });
      setCurrentUser(data.user);
      setAuthSuccess('ACCESS GRANTED. SESSION INITIALIZED.');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setMode('profile');
        loadProfileData();
      }, 1000);
    } catch (err: any) {
      setAuthError(err.message || 'INCORRECT ACCOUNT SECURITY KEY.');
    }
  };

  const handleAdminAutoLogin = async () => {
    setAuthError('');
    setAuthSuccess('');
    try {
      const data = await ApiClient.login({ email: 'admin@society.studios', password: 'admin123' });
      setCurrentUser(data.user);
      setAuthSuccess('ADMIN ACCESS GRANTED. SECURE PORTAL DEPLOYED.');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setMode('admin');
        loadProfileData();
      }, 1000);
    } catch (err: any) {
      setAuthError(err.message || 'INCORRECT ACCOUNT SECURITY KEY.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      const data = await ApiClient.register({ name, email, password });
      setCurrentUser(data.user);
      setAuthSuccess('REGISTRY COMPLETE. WELCOME RECRUIT.');
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setMode('profile');
        loadProfileData();
      }, 1000);
    } catch (err: any) {
      setAuthError(err.message || 'REGISTRATION CRITERIA FAILED.');
    }
  };

  const handleLogout = () => {
    ApiClient.logout();
    setCurrentUser(null);
    setMode('bypass');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      await ApiClient.changePassword({ currentPassword, newPassword });
      setAuthSuccess('CRYPTOGRAPHIC CREDENTIAL CHANGED.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'PASSWORD REVISION REFUSED.');
    }
  };

  // Admin mutations
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ApiClient.createProduct({
        name: newProdName,
        price: parseFloat(newProdPrice),
        category: newProdCategory,
        description: newProdDesc,
        gsm: parseInt(newProdGsm),
        imagePrimary: newProdImage,
        inventory: parseInt(newProdInventory)
      });
      setNewProdName('');
      setNewProdPrice('');
      setNewProdDesc('');
      loadAdminData();
      alert('PRODUCT CREATED SUCCESSFULLY');
    } catch (e: any) {
      alert(e.message || 'PRODUCT INGESTION FAILED');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('REVERT AND DELETE THIS PRODUCT LEDGER?')) return;
    try {
      await ApiClient.deleteProduct(id);
      loadAdminData();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleUpdateOrderStatus = async (id: string, nextStatus: string) => {
    try {
      await ApiClient.updateOrderStatus(id, nextStatus);
      loadAdminData();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-[9985] flex items-center justify-center transition-all duration-300 ${isMaximized ? 'p-0 bg-[#060606]' : 'p-4'}`}>
          {/* Dark Glass Backdrop */}
          {!isMaximized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
          )}

          {/* Console Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative bg-[#0E0E0E] text-white select-none font-sans overflow-y-auto transition-all duration-300 ${
              isMaximized ? 'w-full h-full border-none' : 'w-full max-w-[550px] max-h-[85vh] border border-white/10 rounded-xs'
            }`}
          >
            {/* Gloss Highlight overlay */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Control Actions (Maximize/Minimize & Close) */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-neutral-400 hover:text-white transition-all cursor-pointer p-1 hover:bg-white/5 rounded-sm"
                title={isMaximized ? "Minimize window" : "Maximize Fullscreen"}
              >
                {isMaximized ? <Minimize2 className="h-4.5 w-4.5 text-emerald-400" /> : <Maximize2 className="h-4.5 w-4.5" />}
              </button>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-all cursor-pointer p-1 hover:bg-white/5 rounded-sm"
                title="Close"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Inner container */}
            <div className={isMaximized ? "max-w-4xl mx-auto p-8 md:p-14 space-y-8" : "p-6 md:p-8 space-y-6"}>
              
              {/* Header Title / Console Spec */}
              <div className="flex flex-col items-center space-y-2 pb-4 border-b border-white/5">
                <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-neutral-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <h4 className="font-sans font-bold text-base tracking-[0.15em] uppercase">
                    SOCIETY ACCESS CENTER
                  </h4>
                  <p className="text-[7.5px] font-mono tracking-widest text-neutral-500 uppercase">
                    LEDGER SESSION: {currentUser ? `ACTIVE // ${currentUser.role}` : 'AUTHENTICATION TERMINAL'}
                  </p>
                </div>

                {/* Sub navigation togglers */}
                <div className="flex space-x-3 pt-4 text-[8.5px] font-mono tracking-wider uppercase text-neutral-500">
                  {!currentUser ? (
                    <>
                      <button
                        onClick={() => setMode('bypass')}
                        className={`cursor-pointer ${mode === 'bypass' ? 'text-white border-b border-white pb-0.5' : 'hover:text-neutral-300'}`}
                      >
                        BYPASS_MOCK
                      </button>
                      <span>/</span>
                      <button
                        onClick={() => { setMode('login'); setAuthError(''); setAuthSuccess(''); }}
                        className={`cursor-pointer ${mode === 'login' ? 'text-white border-b border-white pb-0.5' : 'hover:text-neutral-300'}`}
                      >
                        MEMBER_LOGIN
                      </button>
                      <span>/</span>
                      <button
                        onClick={() => { setMode('register'); setAuthError(''); setAuthSuccess(''); }}
                        className={`cursor-pointer ${mode === 'register' ? 'text-white border-b border-white pb-0.5' : 'hover:text-neutral-300'}`}
                      >
                        REGISTER_ACCOUNT
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setMode('profile')}
                        className={`cursor-pointer ${mode === 'profile' ? 'text-white border-b border-white pb-0.5' : 'hover:text-neutral-300'}`}
                      >
                        DASHBOARD_
                      </button>
                      {currentUser.role === 'ADMIN' && (
                        <>
                          <span>/</span>
                          <button
                            onClick={() => setMode('admin')}
                            className={`cursor-pointer ${mode === 'admin' ? 'text-white border-b border-white pb-0.5' : 'hover:text-neutral-300'}`}
                          >
                            ADMIN_PANEL_
                          </button>
                        </>
                      )}
                      <span>/</span>
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer text-red-400 hover:text-red-300 flex items-center space-x-1"
                      >
                        <LogOut className="h-2 w-2" />
                        <span>LOGOUT</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* MODE CONTEXT RENDERERS */}

              {/* BYPASS MODE */}
              {mode === 'bypass' && (
                <div className="space-y-4 pt-2 text-center">
                  <p className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase leading-relaxed max-w-[380px] mx-auto">
                    Official society passes are compiled automatically post-checkout. To mock pass issuance instantly, enter bypass code: <span className="text-white font-semibold underline">MOCK_SOCIETY</span>.
                  </p>

                  <form onSubmit={handleGateSubmit} className="space-y-4">
                    <input
                      type="text"
                      required
                      value={gateCode}
                      onChange={(e) => setGateCode(e.target.value)}
                      placeholder="ENTER_SOCIETY_PASSCODE"
                      className="w-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-3 px-4 text-xs tracking-[0.2em] font-mono text-center uppercase rounded-sm text-white"
                    />

                    <button
                      type="submit"
                      className="w-full bg-white text-black hover:bg-neutral-800 hover:text-white transition-all py-3 text-xs font-bold tracking-[0.2em] uppercase h-11 cursor-pointer flex items-center justify-center"
                    >
                      SUBMIT_VERIFY_
                    </button>

                    {gateFeedback && (
                      <p className={`text-[9px] font-mono tracking-widest uppercase ${
                        gateFeedback.includes('SUCCESS') ? 'text-emerald-400' : 'text-red-500'
                      }`}>
                        {gateFeedback}
                      </p>
                    )}
                  </form>
                </div>
              )}

              {/* MEMBER LOGIN */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">EMAIL ADDR_</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2.5 pl-10 pr-4 text-xs font-mono rounded-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">PASSWORD_</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2.5 pl-10 pr-4 text-xs font-mono rounded-sm text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-neutral-800 hover:text-white transition-all py-3 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
                  >
                    AUTHENTICATE_SESSION_
                  </button>

                  {authError && <p className="text-center text-[9px] font-mono tracking-wider text-red-500 uppercase">{authError}</p>}
                  {authSuccess && <p className="text-center text-[9px] font-mono tracking-wider text-emerald-400 uppercase">{authSuccess}</p>}

                  <div className="pt-4 border-t border-white/5 space-y-2.5">
                    <p className="text-[7.5px] font-mono tracking-widest text-neutral-500 uppercase text-center">
                      AUTHORIZED ADMINISTRATOR PORTAL SHORTCUT_
                    </p>
                    <button
                      type="button"
                      onClick={handleAdminAutoLogin}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-all py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase rounded-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>⚡ DOCK_ADMIN_DASHBOARD</span>
                    </button>
                    <div className="flex justify-between text-[7px] font-mono text-neutral-600 px-1">
                      <span>USER: admin@society.studios</span>
                      <span>PASS: admin123</span>
                    </div>
                  </div>
                </form>
              )}

              {/* MEMBER REGISTER */}
              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">FULL NAME_</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="JOHN DOE"
                        className="w-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2.5 pl-10 pr-4 text-xs font-mono rounded-sm text-white uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">EMAIL ADDR_</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2.5 pl-10 pr-4 text-xs font-mono rounded-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">CREATE PASSWORD_</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2.5 pl-10 pr-4 text-xs font-mono rounded-sm text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-neutral-800 hover:text-white transition-all py-3 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
                  >
                    SUBMIT_NEW_MEMBERSHIP_
                  </button>

                  {authError && <p className="text-center text-[9px] font-mono tracking-wider text-red-500 uppercase">{authError}</p>}
                  {authSuccess && <p className="text-center text-[9px] font-mono tracking-wider text-emerald-400 uppercase">{authSuccess}</p>}
                </form>
              )}

              {/* PROFILE DASHBOARD */}
              {mode === 'profile' && currentUser && (
                <div className="space-y-6 pt-2">
                  {/* Bio Badge */}
                  <div className="p-4 bg-neutral-950 border border-white/5 rounded-sm flex items-center justify-between">
                    <div>
                      <span className="text-[7px] text-neutral-600 font-mono tracking-widest uppercase">MEMBER REGISTRANT_</span>
                      <p className="text-sm font-bold uppercase tracking-wider text-white">{currentUser.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">{currentUser.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] text-neutral-600 font-mono tracking-widest uppercase">AUTHORITY LEVEL_</span>
                      <p className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                        {currentUser.role === 'ADMIN' ? '● ADMIN_ROLE' : '● ACTIVE_MEMBER'}
                      </p>
                    </div>
                  </div>

                  {/* Orders History Ledger */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1">
                      <Clipboard className="h-3 w-3 text-neutral-500" />
                      <span className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">ACCRUED SHIPPING PURCHASE LEDGER</span>
                    </div>

                    {orders.length === 0 ? (
                      <div className="p-4 border border-dashed border-white/10 text-center rounded-sm">
                        <p className="text-[9.5px] font-mono text-neutral-500 uppercase">NO PURCHASE LEDGERS RECORDED UNDER THIS RECRUIT.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                        {orders.map((ord) => (
                          <div key={ord.id} className="p-3 bg-neutral-950 border border-white/5 rounded-xs flex flex-col md:flex-row md:items-center justify-between text-left text-xs gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[9px] text-neutral-400 font-bold">{ord.id}</span>
                                <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded-sm uppercase ${
                                  ord.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-300'
                                }`}>
                                  {ord.status}
                                </span>
                              </div>
                              <p className="text-[9px] text-neutral-500 font-mono uppercase">
                                DATE: {new Date(ord.createdAt).toLocaleDateString('en-GB')} // total: ${ord.total}
                              </p>
                              {ord.trackingNumber && (
                                <p className="text-[9px] text-neutral-400 font-mono tracking-wider">
                                  TRACKING: <span className="text-white select-text">{ord.trackingNumber}</span>
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-start md:items-end space-y-1 font-mono text-[9px]">
                              <p className="text-neutral-400 uppercase">METHOD: {ord.paymentMethod.toUpperCase()}</p>
                              <p className="text-emerald-400 font-semibold uppercase">PAYMENT: {ord.paymentStatus}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Change Password Panel */}
                  <form onSubmit={handleChangePassword} className="pt-4 border-t border-white/5 space-y-3 text-left">
                    <span className="text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">REVISE SESSION PASSWORDS</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="CURRENT_PASSWORD"
                        className="bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2 px-3 text-[10px] font-mono rounded-sm text-white"
                      />
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="NEW_PASSWORD"
                        className="bg-neutral-900 border border-white/10 focus:border-white focus:outline-none py-2 px-3 text-[10px] font-mono rounded-sm text-white"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-neutral-800 hover:bg-neutral-700 text-white transition-all py-2 px-4 text-[9.5px] font-mono uppercase cursor-pointer rounded-xs"
                    >
                      UPDATE_PASSWORD_CRYPT
                    </button>

                    {authError && <p className="text-[9px] font-mono tracking-wider text-red-500 uppercase">{authError}</p>}
                    {authSuccess && <p className="text-[9px] font-mono tracking-wider text-emerald-400 uppercase">{authSuccess}</p>}
                  </form>
                </div>
              )}

              {/* ADMINISTRATIVE CONSOLE PANEL */}
              {mode === 'admin' && currentUser?.role === 'ADMIN' && (
                <div className="space-y-5 pt-2 text-left">
                  {/* Admin nav */}
                  <div className="flex border-b border-white/5 pb-2 text-[9px] font-mono space-x-4 uppercase tracking-wider text-neutral-500">
                    <button
                      onClick={() => setAdminSection('products')}
                      className={`cursor-pointer ${adminSection === 'products' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
                    >
                      PRODUCTS ({allProducts.length})
                    </button>
                    <button
                      onClick={() => setAdminSection('orders')}
                      className={`cursor-pointer ${adminSection === 'orders' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
                    >
                      ORDERS ({allOrders.length})
                    </button>
                    <button
                      onClick={() => setAdminSection('messages')}
                      className={`cursor-pointer ${adminSection === 'messages' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
                    >
                      MESSAGES ({allMessages.length})
                    </button>
                    <button
                      onClick={() => setAdminSection('subscribers')}
                      className={`cursor-pointer ${adminSection === 'subscribers' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
                    >
                      NEWSLETTER ({allSubscribers.length})
                    </button>
                  </div>

                  {/* PRODUCTS SECTION */}
                  {adminSection === 'products' && (
                    <div className="space-y-4">
                      {/* Create product form */}
                      <form onSubmit={handleCreateProduct} className="p-4 bg-neutral-950 border border-white/5 rounded-xs space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-[10px] font-mono tracking-wider text-emerald-400 font-semibold uppercase block">
                            ● INGEST NEW GARMENT ENTRY
                          </span>
                          <span className="text-[8px] font-mono text-neutral-500 uppercase">
                            ALL FIELDS ARE REAL-TIME SYNCHRONIZED
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Product Name Form Group */}
                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                              1. PRODUCT NAME_ (e.g. COTTON HOODIE)
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. The Uniform Hoodie"
                              value={newProdName}
                              onChange={(e) => setNewProdName(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 focus:border-white/40 focus:outline-none text-[10px] font-mono p-2.5 rounded-sm text-white transition-colors"
                            />
                          </div>

                          {/* Price Form Group */}
                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                              2. PRICE IN INR (₹)_ (e.g. 185)
                            </label>
                            <input
                              type="number"
                              required
                              placeholder="e.g. 185"
                              value={newProdPrice}
                              onChange={(e) => setNewProdPrice(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 focus:border-white/40 focus:outline-none text-[10px] font-mono p-2.5 rounded-sm text-white transition-colors"
                            />
                          </div>

                          {/* GSM Fabric density Form Group */}
                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                              3. FABRIC DENSITY (GSM)_ (e.g. 500)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 500"
                              value={newProdGsm}
                              onChange={(e) => setNewProdGsm(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 focus:border-white/40 focus:outline-none text-[10px] font-mono p-2.5 rounded-sm text-white transition-colors"
                            />
                            <span className="block text-[7px] font-mono text-neutral-500 uppercase">
                              *Grams per Square Meter (thickness descriptor)
                            </span>
                          </div>

                          {/* Stock/Inventory Form Group */}
                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                              4. STOCK / INVENTORY_ (e.g. 45)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 45"
                              value={newProdInventory}
                              onChange={(e) => setNewProdInventory(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 focus:border-white/40 focus:outline-none text-[10px] font-mono p-2.5 rounded-sm text-white transition-colors"
                            />
                            <span className="block text-[7px] font-mono text-neutral-500 uppercase">
                              *Available units ready for selection
                            </span>
                          </div>
                        </div>

                        {/* Image URL Form Group */}
                        <div className="space-y-1">
                          <label className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                            5. PRODUCT IMAGE URL_ (HTTP / HTTPS CDN Link)
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. https://i.ibb.co/.../image.jpg"
                            value={newProdImage}
                            onChange={(e) => setNewProdImage(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 focus:border-white/40 focus:outline-none text-[10px] font-mono p-2.5 rounded-sm text-white transition-colors"
                          />
                        </div>

                        {/* Description Form Group */}
                        <div className="space-y-1">
                          <label className="block text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
                            6. PRODUCT DESCRIPTION & SPECS_
                          </label>
                          <textarea
                            placeholder="e.g. Crafted from 500 GSM loopback cotton. Generously dropped shoulders..."
                            required
                            value={newProdDesc}
                            onChange={(e) => setNewProdDesc(e.target.value)}
                            rows={3}
                            className="w-full bg-neutral-900 border border-white/10 focus:border-white/40 focus:outline-none text-[10px] font-mono p-2.5 rounded-sm text-white transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 text-[10px] font-mono uppercase font-bold tracking-widest rounded-sm cursor-pointer transition-colors"
                        >
                          PUBLISH_CATALOG_RECORD_
                        </button>
                      </form>

                      {/* Product list */}
                      <div className={`space-y-2 overflow-y-auto pr-1 ${isMaximized ? 'max-h-[500px]' : 'max-h-[180px]'}`}>
                        {allProducts.map((p) => (
                          <div key={p.id} className="p-2 bg-neutral-950 border border-white/5 rounded-xs flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <img src={p.imagePrimary} className="w-8 h-8 object-cover rounded-xs border border-white/10" referrerPolicy="no-referrer" />
                              <div>
                                <h6 className="font-bold uppercase tracking-wider text-[10px]">{p.name}</h6>
                                <p className="text-[8px] font-mono text-neutral-400">ID: {p.id} // PRICE: ${p.price} // STOCK: {p.inventory}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-red-400 hover:text-red-300 p-1.5 cursor-pointer"
                              title="Delete Ledger Entry"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ORDERS SECTION */}
                  {adminSection === 'orders' && (
                    <div className={`space-y-2 overflow-y-auto pr-1 ${isMaximized ? 'max-h-[600px]' : 'max-h-[280px]'}`}>
                      {allOrders.length === 0 ? (
                        <p className="text-[9.5px] font-mono text-neutral-500 text-center py-8">NO ACCRUED PURCHASES YET.</p>
                      ) : (
                        allOrders.map((ord) => (
                          <div key={ord.id} className="p-3 bg-neutral-950 border border-white/5 rounded-xs space-y-2 text-xs">
                            <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400">
                              <span>ID: {ord.id} // DATE: {new Date(ord.createdAt).toLocaleDateString()}</span>
                              <span className="text-white font-bold">${ord.total}</span>
                            </div>
                            <div className="text-[10px]">
                              <p className="text-neutral-300 uppercase">CUSTOMER: {ord.customerName} ({ord.email})</p>
                              <p className="text-neutral-400 uppercase">SHIPPING ADDR: {ord.address}, {ord.city} {ord.postalCode}</p>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-white/5">
                              <span className="font-mono text-[8px] text-neutral-500">PAYMENT: {ord.paymentStatus} // METHOD: {ord.paymentMethod.toUpperCase()}</span>
                              
                              {/* Status update selector */}
                              <div className="flex space-x-1.5 text-[8.5px] font-mono">
                                <button
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'SHIPPED')}
                                  className={`px-1.5 py-0.5 rounded-sm border cursor-pointer ${ord.status === 'SHIPPED' ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' : 'border-white/10 hover:border-white'}`}
                                >
                                  SHIP
                                </button>
                                <button
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'DELIVERED')}
                                  className={`px-1.5 py-0.5 rounded-sm border cursor-pointer ${ord.status === 'DELIVERED' ? 'bg-blue-400/20 text-blue-300 border-blue-400/30' : 'border-white/10 hover:border-white'}`}
                                >
                                  DELIVER
                                </button>
                                <button
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'CANCELLED')}
                                  className={`px-1.5 py-0.5 rounded-sm border text-red-400 cursor-pointer ${ord.status === 'CANCELLED' ? 'bg-red-400/20 border-red-400/30 font-bold' : 'border-white/10 hover:border-red-400'}`}
                                >
                                  VOID
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* CONTACT MESSAGES SECTION */}
                  {adminSection === 'messages' && (
                    <div className={`space-y-2 overflow-y-auto pr-1 ${isMaximized ? 'max-h-[600px]' : 'max-h-[280px]'}`}>
                      {allMessages.length === 0 ? (
                        <p className="text-[9.5px] font-mono text-neutral-500 text-center py-8">NO CODES / LOG MESSAGES TRANSMITTED.</p>
                      ) : (
                        allMessages.map((msg) => (
                          <div key={msg.id} className="p-3 bg-neutral-950 border border-white/5 rounded-xs space-y-1 text-xs">
                            <div className="flex justify-between text-[8px] font-mono text-neutral-500">
                              <span>FROM: {msg.name.toUpperCase()} ({msg.email})</span>
                              <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[10.5px] text-neutral-300 leading-relaxed italic select-text">"{msg.message}"</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* NEWSLETTER SUBSCRIBERS */}
                  {adminSection === 'subscribers' && (
                    <div className={`space-y-1 overflow-y-auto pr-1 ${isMaximized ? 'max-h-[600px]' : 'max-h-[280px]'}`}>
                      {allSubscribers.length === 0 ? (
                        <p className="text-[9.5px] font-mono text-neutral-500 text-center py-8">NO BROADCAST VESSEL ADDRESSES REGISTERED.</p>
                      ) : (
                        allSubscribers.map((sub) => (
                          <div key={sub.id} className="p-2 bg-neutral-950 border border-white/5 rounded-xs flex justify-between items-center text-xs font-mono">
                            <span className="text-neutral-300 select-text">{sub.email}</span>
                            <span className="text-[8px] text-neutral-500">ADDED: {new Date(sub.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
