"use client";

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ChevronRight } from 'react-feather';
import { contactData } from '@/lib/contact';
import { footerData } from '@/lib/footer';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredTreatment: '',
    appointmentType: '',
    preferredDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Allow only numbers
      const numericValue = value.replace(/[^0-9]/g, '');

      // Enforce max length of 10
      if (numericValue.length > 10) return;

      // Enforce starting digit (6, 7, 8, or 9)
      if (numericValue.length > 0 && !['6', '7', '8', '9'].includes(numericValue[0])) {
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phoneNumber,
          email: formData.email,
          service: formData.preferredTreatment,
          appointmentType: formData.appointmentType,
          preferredDate: formData.preferredDate,
        }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your appointment request has been submitted.' });
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          preferredTreatment: '',
          appointmentType: '',
          preferredDate: ''
        });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit the form. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#f5f5f0] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
            {contactData.subheading}
          </h3>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            {contactData.heading}
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg font-normal text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto">
            {contactData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Booking Form */}
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl flex-grow flex flex-col space-y-6"
            >
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">
                Book Appointment
              </h3>

              {status.type === 'success' && (
                <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm font-medium">
                  {status.message}
                </div>
              )}

              {status.type === 'error' && (
                <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm font-medium">
                  {status.message}
                </div>
              )}

              <div className="space-y-4 flex-grow">
                <div>
                  <label htmlFor="fullName" className="block font-['Inter'] text-sm font-medium text-[#1a1a1a] mb-2 ml-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#2d5a4f] focus:ring-4 focus:ring-[#2d5a4f]/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block font-['Inter'] text-sm font-medium text-[#1a1a1a] mb-2 ml-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      maxLength={10}
                      inputMode="numeric"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#2d5a4f] focus:ring-4 focus:ring-[#2d5a4f]/5 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-['Inter'] text-sm font-medium text-[#1a1a1a] mb-2 ml-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#2d5a4f] focus:ring-4 focus:ring-[#2d5a4f]/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredTreatment" className="block font-['Inter'] text-sm font-medium text-[#1a1a1a] mb-2 ml-1">
                      Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferredTreatment"
                      name="preferredTreatment"
                      required
                      value={formData.preferredTreatment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#2d5a4f] focus:ring-4 focus:ring-[#2d5a4f]/5 transition-all cursor-pointer"
                    >
                      <option value="">Select Service</option>
                      {contactData.treatments.map((treatment, index) => (
                        <option key={index} value={treatment}>
                          {treatment}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="appointmentType" className="block font-['Inter'] text-sm font-medium text-[#1a1a1a] mb-2 ml-1">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      required
                      value={formData.appointmentType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#2d5a4f] focus:ring-4 focus:ring-[#2d5a4f]/5 transition-all cursor-pointer"
                    >
                      <option value="">Select Type</option>
                      {contactData.appointmentTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredDate" className="block font-['Inter'] text-sm font-medium text-[#1a1a1a] mb-2 ml-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#2d5a4f] focus:ring-4 focus:ring-[#2d5a4f]/5 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#2d5a4f] text-white font-['Inter'] font-bold rounded-xl shadow-lg hover:bg-[#21433b] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Request Appointment'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl flex-grow space-y-8">
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <a
                  href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-[#2d5a4f]/30 hover:bg-[#2d5a4f]/5 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#2d5a4f] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={20} className="text-[#2d5a4f]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-['Inter'] font-bold text-gray-900 group-hover:text-[#2d5a4f] transition-colors text-sm sm:text-base">Call Us</h4>
                    <p className="text-[#2d5a4f] font-medium text-xs sm:text-base truncate">{footerData.contact.phone}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Available 9:00 AM - 7:00 PM</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2d5a4f] transition-colors flex-shrink-0" />
                </a>

                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-[#2d5a4f]/30 hover:bg-[#2d5a4f]/5 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#2d5a4f] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={20} className="text-[#2d5a4f]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-['Inter'] font-bold text-gray-900 group-hover:text-[#2d5a4f] transition-colors text-sm sm:text-base">Email Us</h4>
                    <p className="text-[#2d5a4f] font-medium text-xs sm:text-base break-all">{footerData.contact.email}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Fast response via email</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2d5a4f] transition-colors flex-shrink-0" />
                </a>

                <a
                  href="https://maps.app.goo.gl/QQWUxJZW2tUkKWzP9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-[#2d5a4f]/30 hover:bg-[#2d5a4f]/5 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#2d5a4f] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={20} className="text-[#2d5a4f]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-['Inter'] font-bold text-gray-900 group-hover:text-[#2d5a4f] transition-colors text-sm sm:text-base">Visit Us</h4>
                    <p className="text-[10px] sm:text-sm text-gray-600 line-clamp-1 sm:line-clamp-2">{footerData.contact.address.replace('\n', ', ')}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Open daily 9:00 AM - 6:00 PM</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2d5a4f] transition-colors flex-shrink-0" />
                </a>

                <a
                  href={`https://wa.me/${footerData.contact.phone.replace(/\s/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-[#2d5a4f]/30 hover:bg-[#2d5a4f]/5 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#2d5a4f] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} className="text-[#2d5a4f]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-['Inter'] font-bold text-gray-900 group-hover:text-[#2d5a4f] transition-colors text-sm sm:text-base">WhatsApp Us</h4>
                    <p className="text-[#2d5a4f] font-medium text-xs sm:text-base truncate">{footerData.contact.phone}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Instant chat available</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2d5a4f] transition-colors flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
