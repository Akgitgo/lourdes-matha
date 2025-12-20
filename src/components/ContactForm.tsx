"use client";

import { Send, Phone, Mail, MapPin, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0pNoasukE1A1Vl43Lmj-djFTE0E4xNAkpROVU-fKfO7Ky-cDqp_MyoNdWHvOlNdK7YA/exec';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/contactus.jpg')" }}
    >
      {/* Overlay for better readability - 60% to allow 40% image visibility */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            CONTACT US
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-6">
            Schedule a Personal Visit
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Experience Grace Garden yourself. Schedule a visit to see our facilities, meet our team, and feel the warmth of our community.
          </p>
        </div>

        {/* Content Container - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left Column: Form (60%) */}
          <div id="enquire" className="lg:col-span-3 bg-slate-50 p-8 md:p-12 rounded-3xl shadow-xl h-full">
            <h3 className="text-2xl font-serif text-slate-900 mb-6">Send us a Message</h3>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-green-600" size={32} />
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h4>
                <p className="text-green-700 mb-6">
                  Thank you for reaching out. Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-green-700 font-semibold hover:text-green-900 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      inputMode="numeric"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                      placeholder="Enter your 10-digit phone number"
                    />
                  </div>
                </div>

                {/* Row 2: Relation & Callback Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="relation" className="block text-sm font-medium text-slate-700 mb-2">
                      Relation with Elder <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="relation"
                        name="relation"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-600 appearance-none cursor-pointer"
                      >
                        <option value="">Select your relation</option>
                        <option value="son">Son</option>
                        <option value="daughter">Daughter</option>
                        <option value="spouse">Spouse</option>
                        <option value="sibling">Sibling</option>
                        <option value="relative">Relative</option>
                        <option value="friend">Friend</option>
                        <option value="self">Self</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="callbackTime" className="block text-sm font-medium text-slate-700 mb-2">
                      Preferred Callback Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="callbackTime"
                        name="callbackTime"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-600 appearance-none cursor-pointer"
                      >
                        <option value="">Select preferred time</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 flex justify-center mt-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-3 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Notice */}
                <div className="text-center pt-4 space-y-1">
                  <p className="text-sm text-slate-600">
                    We respect your privacy and will never share your information.
                  </p>
                  <p className="text-sm text-slate-600">
                    Our team will contact you within 30 mins during your preferred time.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Get in Touch (40%) */}
          <div className="lg:col-span-2 bg-slate-50 p-8 rounded-3xl shadow-xl h-full flex flex-col">
            <h3 className="text-2xl font-serif text-slate-900 mb-8">Get in Touch</h3>

            <div className="space-y-6 flex-grow">
              {/* Call Us */}
              <a href="tel:+919100773861" className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Call Us</h4>
                      <p className="text-lg font-bold text-primary">+91 9100773861</p>
                      <p className="text-sm text-slate-500 mt-1">Available 9:00 AM to 7:00 PM</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </a>

              {/* Email Us */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gracegarden1983@gmail.com&su=Enquiry%20about%20Grace%20Garden%20Services" target="_blank" rel="noopener noreferrer" className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Email Us</h4>
                      <p className="text-base font-medium text-slate-700 break-all">gracegarden1983@gmail.com</p>
                      <p className="text-sm text-slate-500 mt-1">Get detailed information</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </a>

              {/* Visit Us */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Grace+Garden+Senior+Living+Care+Home+Chendakuni+Meenangadi+Wayanad+Kerala"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Visit Us</h4>
                      <p className="text-base text-slate-700 leading-snug">
                        Chendakuni, Meenangadi,<br />
                        Wayanad, Kerala, 673591
                      </p>
                      <p className="text-sm text-slate-500 mt-2">Mon - Sun: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
