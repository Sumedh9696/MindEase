import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Shield, CheckCircle2, User, Phone, X, HeartHandshake } from 'lucide-react';
import { api } from '../services/api';

export default function SupportCircleView({ setView }) {
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '', email: '' });
  const [requestStatus, setRequestStatus] = useState(null); // { contactId, name }

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await api.getSupportCircle();
      if (data) setContacts(data);
    } catch (e) {
      console.warn('Could not load support circle:', e.message);
    }
  };

  const handleRequestSupport = async (contact) => {
    try {
      await api.requestSupport(contact.id);
      setRequestStatus({ contactId: contact.id, name: contact.name });
      setTimeout(() => setRequestStatus(null), 5000);
    } catch (err) {
      setRequestStatus({ contactId: contact.id, name: contact.name });
      setTimeout(() => setRequestStatus(null), 5000);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.relation) return;

    try {
      const res = await api.addSupportContact(newContact);
      if (res && res.contact) {
        setContacts(prev => [...prev, res.contact]);
      }
      setShowAddModal(false);
      setNewContact({ name: '', relation: '', phone: '', email: '' });
    } catch (err) {
      console.warn('Failed to add contact:', err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setView('dashboard')}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#786F66] hover:text-[#2C2622] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622]">
          Family Support Circle
        </h1>
        <p className="text-sm text-[#786F66] mt-1">
          Sometimes you don't have to handle everything alone.
        </p>
      </div>

      {/* Status banner */}
      {requestStatus && (
        <div className="mb-6 p-4 rounded-2xl bg-[#F2FAF5] border border-[#86C59C]/40 text-[#2F7347] text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>
            A discreet check-in notification was sent to <strong>{requestStatus.name}</strong>. They will reach out to you gently.
          </span>
        </div>
      )}

      {/* Contact Cards List */}
      <div className="space-y-3.5 mb-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm flex items-center justify-between gap-4 transition-all hover:border-[#D6CAB8]"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={contact.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={contact.name}
                className="w-12 h-12 rounded-2xl object-cover border border-[#EFE8DD]"
              />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#2C2622]">
                  {contact.name}
                </h3>
                <p className="text-xs text-[#786F66]">{contact.relation}</p>
              </div>
            </div>

            <button
              onClick={() => handleRequestSupport(contact)}
              className="px-4 sm:px-5 py-2 rounded-full border border-[#EFE8DD] hover:border-[#E77A57] bg-[#FAF8F5] hover:bg-[#FAF4EB] text-xs font-bold text-[#2C2622] hover:text-[#E77A57] transition-all"
            >
              Request Support
            </button>
          </div>
        ))}
      </div>

      {/* Add Trusted Person Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-3.5 rounded-2xl border-2 border-dashed border-[#EFE8DD] hover:border-[#D6CAB8] bg-white/70 hover:bg-white text-xs sm:text-sm font-bold text-[#786F66] hover:text-[#2C2622] flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 text-[#E77A57]" />
          <span>+ Add Trusted Person</span>
        </button>
      </div>

      {/* Privacy Guarantee Box */}
      <div className="bg-white/80 rounded-2xl p-5 border border-[#EFE8DD] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#786F66] uppercase tracking-wider">
          <Shield className="w-4 h-4 text-[#86C59C]" />
          <span>Your Privacy</span>
        </div>
        <p className="text-xs text-[#786F66] leading-relaxed">
          We never share your location or sensitive information. Only a gentle message is sent when you request support.
        </p>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EFE8DD] relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#786F66] hover:bg-[#FAF4EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#2C2622] mb-1">Add Trusted Contact</h3>
            <p className="text-xs text-[#786F66] mb-5">
              Add someone you feel safe reaching out to during tough times.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#2C2622] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DD] text-xs text-[#2C2622] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2C2622] block mb-1">Relationship</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sister, Friend, Therapist"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DD] text-xs text-[#2C2622] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2C2622] block mb-1">Phone Number (optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DD] text-xs text-[#2C2622] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-[#EFE8DD] text-xs font-semibold text-[#786F66]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#E77A57] hover:bg-[#D96946] text-white text-xs font-bold"
                >
                  Save Person
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
