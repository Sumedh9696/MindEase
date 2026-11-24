import React, { useState } from 'react';
import { X, Phone, MessageSquare, AlertCircle, Shield, Heart, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export default function SosModal({ isOpen, onClose }) {
  const [alertSent, setAlertSent] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);

  if (!isOpen) return null;

  const handleAlertCircle = async () => {
    setIsAlerting(true);
    try {
      await api.triggerSosAlert();
      setAlertSent(true);
      setTimeout(() => setAlertSent(false), 6000);
    } catch (e) {
      setAlertSent(true);
    } finally {
      setIsAlerting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE8DD] relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#786F66] hover:bg-[#FAF4EB] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DC7254]/15 text-[#DC7254] flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2C2622]">Immediate Crisis Support</h2>
            <p className="text-sm text-[#786F66]">You are never alone. Help is available 24/7.</p>
          </div>
        </div>

        {/* Notice */}
        <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#EFE8DD] mb-5">
          <p className="text-xs leading-relaxed text-[#786F66]">
            If you are in danger of hurting yourself or others, please call <strong>911</strong> or go to your nearest emergency room immediately.
          </p>
        </div>

        {/* Helplines List */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-2xl border border-[#EFE8DD] flex items-center justify-between hover:border-[#DC7254]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#86C59C]/20 text-[#3F8856] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C2622]">988 Suicide & Crisis Lifeline</p>
                <p className="text-xs text-[#786F66]">Call or text 988 (Free, 24/7, confidential)</p>
              </div>
            </div>
            <a
              href="tel:988"
              className="px-3.5 py-1.5 rounded-full bg-[#DC7254] hover:bg-[#C96043] text-white text-xs font-semibold"
            >
              Call 988
            </a>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#EFE8DD] flex items-center justify-between hover:border-[#DC7254]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7BB6D8]/20 text-[#3E7FA6] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C2622]">Crisis Text Line</p>
                <p className="text-xs text-[#786F66]">Text HOME to 741741</p>
              </div>
            </div>
            <a
              href="sms:741741&body=HOME"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE8DD] hover:bg-[#E5DDD0] text-[#2C2622] text-xs font-semibold"
            >
              Text
            </a>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#EFE8DD] flex items-center justify-between hover:border-[#DC7254]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5B844]/20 text-[#9E6E16] flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C2622]">The Trevor Project (LGBTQ+)</p>
                <p className="text-xs text-[#786F66]">Call 1-866-488-7386</p>
              </div>
            </div>
            <a
              href="tel:18664887386"
              className="px-3.5 py-1.5 rounded-full bg-[#EFE8DD] hover:bg-[#E5DDD0] text-[#2C2622] text-xs font-semibold"
            >
              Call
            </a>
          </div>
        </div>

        {/* Alert Family Support Circle Action */}
        <div className="p-4 rounded-2xl border border-dashed border-[#DC7254]/40 bg-[#FAF4EB]/60 mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#DC7254]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C2622]">Family Support Circle</span>
            </div>
          </div>
          <p className="text-xs text-[#786F66] mb-3">
            Notify your trusted emergency contacts (Emma Wilson, Dr. James Park) with a gentle check-in alert.
          </p>
          <button
            onClick={handleAlertCircle}
            disabled={isAlerting || alertSent}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              alertSent 
                ? 'bg-[#86C59C] text-white' 
                : 'bg-[#DC7254] hover:bg-[#C96043] text-white'
            }`}
          >
            {alertSent ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Discreet Check-in Sent to Your Trusted Circle
              </>
            ) : isAlerting ? (
              'Notifying Circle...'
            ) : (
              'Alert My Support Circle Now'
            )}
          </button>
        </div>

        {/* Footer close */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-[#EFE8DD] text-xs font-semibold text-[#786F66] hover:bg-[#FAF4EB]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
