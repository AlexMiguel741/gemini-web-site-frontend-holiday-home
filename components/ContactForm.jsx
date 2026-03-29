import React, { useState } from 'react';
import { APARTMENTS, UI_LABELS } from '../constants';

const ContactForm = ({ lang = 'it' }) => {
  // Hard-code the 4 apartments: Il Blu di Laveno, Verso il Lago, Cittiglio Le Cascate 1, Cittiglio Le Cascate 2
  const AVAILABLE_APARTMENTS = APARTMENTS.filter(apt => 
    ['azure-terrace-suite', 'sapphire-studio-loft', 'cobalt-family-home', 'navy-garden-retreat'].includes(apt.id)
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    apartment: '',
    checkin: '',
    checkout: '',
    guests: 1,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGuestsChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      guests: Math.max(1, Math.min(10, prev.guests + delta))
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.checkin) newErrors.checkin = true;
    if (!formData.checkout) newErrors.checkout = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Trigger shake animation
      const form = e.currentTarget;
      form.classList.add('animate-shake');
      setTimeout(() => form.classList.remove('animate-shake'), 500);
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    // Get apartment name from ID
    const apartmentObj = AVAILABLE_APARTMENTS.find(apt => apt.id === formData.apartment);
    const apartmentName = apartmentObj ? apartmentObj.name[lang] : formData.apartment;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '158c3d7c-27fc-424c-8308-4999c4904601',
          subject: `Richiesta prenotazione - ${apartmentName}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          apartment: apartmentName,
          checkin: formData.checkin,
          checkout: formData.checkout,
          guests: formData.guests,
          message: formData.message,
          botcheck: ''
        })
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(UI_LABELS.contact_form_error_submit[lang]);
      }
    } catch (error) {
      setSubmitError(UI_LABELS.contact_form_error_connection[lang]);
    } finally {
      setIsLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.5s ease-out;
          }
        `}</style>
        <div className="text-center animate-slideUp">
          <div className="mb-6 flex justify-center">
            <svg className="w-24 h-24 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="font-[Lora] font-semibold text-3xl text-slate-900 mb-2">{UI_LABELS.contact_form_success[lang]}</h2>
          <p className="font-[Outfit] text-slate-600 text-lg">{UI_LABELS.contact_form_success_msg[lang]}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main container: desktop 2 columns, mobile stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-2xl p-8 h-full">
                {/* Title */}
                <h2 className="font-[Lora] font-semibold text-3xl text-blue-900 mb-2">
                  {UI_LABELS.contact_form_title[lang]}
                </h2>

                {/* Subtitle */}
                <p className="font-[Outfit] text-slate-500 mb-8">
                  {UI_LABELS.contact_form_subtitle[lang]}
                </p>

                {/* Trust items */}
                <div className="space-y-6 mb-8">
                  {/* Item 1: Checkmark */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-[Outfit] text-slate-700 font-medium">
                        {UI_LABELS.contact_form_best_price[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Lock */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-700 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-[Outfit] text-slate-700 font-medium">
                        {UI_LABELS.contact_form_secure[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Chat bubble */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                        <path d="M6 7a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-[Outfit] text-slate-700 font-medium">
                        {UI_LABELS.contact_form_response[lang]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/393480325148?text=Ciao, vorrei informazioni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#25D366] hover:bg-[#1FAA4F] text-white rounded-2xl py-3 px-6 text-center font-[Outfit] font-semibold transition-all active:scale-[0.95]"
                >
                  {UI_LABELS.contact_form_whatsapp[lang]}
                </a>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                      {UI_LABELS.contact_form_name[lang]} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition ${
                        errors.name ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder={`${UI_LABELS.contact_form_name[lang]}...`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                      {UI_LABELS.contact_form_email[lang]} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition ${
                        errors.email ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder={`${UI_LABELS.contact_form_email[lang]}@email.com`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                      {UI_LABELS.contact_form_phone[lang]}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                      placeholder={`+39 ${UI_LABELS.contact_form_phone[lang]}`}
                    />
                  </div>

                  {/* Apartment - Hard-coded 4 apartments */}
                  <div>
                    <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                      {UI_LABELS.contact_form_apartment[lang]}
                    </label>
                    <select
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition bg-white"
                    >
                      <option value="">{UI_LABELS.contact_form_apartment_placeholder[lang]}</option>
                      {AVAILABLE_APARTMENTS.map(apt => (
                        <option key={apt.id} value={apt.id}>
                          {apt.name[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Check-in and Check-out */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                        {UI_LABELS.contact_form_checkin[lang]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="checkin"
                        value={formData.checkin}
                        onChange={handleChange}
                        min={minDate}
                        className={`w-full border rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition ${
                          errors.checkin ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                        {UI_LABELS.contact_form_checkout[lang]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="checkout"
                        value={formData.checkout}
                        onChange={handleChange}
                        min={minDate}
                        className={`w-full border rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition ${
                          errors.checkout ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                      {UI_LABELS.contact_form_guests[lang]}
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleGuestsChange(-1)}
                        className="w-12 h-12 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center font-[Outfit] font-semibold text-lg transition"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center font-[Outfit] font-semibold text-lg text-slate-900">
                        {formData.guests}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGuestsChange(1)}
                        className="w-12 h-12 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center font-[Outfit] font-semibold text-lg transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-[Outfit] font-medium text-slate-700 mb-2">
                      {UI_LABELS.contact_form_message[lang]}
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={500}
                        rows={4}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 font-[Outfit] focus:outline-none focus:ring-2 focus:ring-blue-700 transition resize-none"
                        placeholder={`${UI_LABELS.contact_form_message[lang]}...`}
                      />
                      <div className="absolute bottom-3 right-3 text-xs font-[Outfit] text-slate-400">
                        {formData.message.length}/500
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-400 text-white font-[Outfit] font-semibold rounded-2xl py-4 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="1" opacity="0.3" />
                          <circle cx="19" cy="12" r="1" opacity="0.6" />
                          <circle cx="12" cy="19" r="1" opacity="0.2" />
                        </svg>
                        {UI_LABELS.contact_form_sending[lang]}
                      </>
                    ) : (
                      UI_LABELS.contact_form_submit[lang]
                    )}
                  </button>

                  {/* Error message */}
                  {submitError && (
                    <div className="text-red-500 font-[Outfit] text-sm">
                      {submitError}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
