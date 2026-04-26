"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [openFaq, setOpenFaq] = useState(null); // Track which FAQ is open

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Scroll to form to see status
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        // Ensure success message is visible
        setTimeout(() => {
          document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header - Compact Hero */}
      <section className="section-hero py-10 md:py-12 px-4 md:px-6" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0a3350 50%, #082840 100%)' }}>
        <div className="container-wide text-center relative">
          {/* Minimal Centered Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-200 hover:text-white transition-colors font-medium">Home</Link>
            <span className="text-gray-400">›</span>
            <span className="text-white font-bold tracking-wide drop-shadow-md">Contact Us</span>
          </nav>

          {/* High Contrast Title */}
          <h1
            className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
          >
            Get in <span className="text-brand-orange drop-shadow-md">Touch</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg max-w-lg mx-auto text-center text-white/85 mb-6">
            Have questions? Need a quote? We're here to help! Reach out to us and our team will get back to you shortly.
          </p>

          {/* Primary CTA Button */}
          <Link
            href="#contact-form"
            className="group inline-flex items-center gap-3 bg-brand-orange text-white px-10 py-4 rounded-xl font-black text-lg shadow-2xl shadow-brand-orange/40 hover:bg-orange-600 hover:scale-105 hover:-translate-y-1 transition-all duration-500"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Get Free Consultation</span>
          </Link>
        </div>
      </section>

      {/* Main Content - Consistent Spacing */}
      <section className="py-10 md:py-14 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* LEFT COLUMN: Contact Form (Primary Focus - Order 1) */}
            <div className="order-1">
              {/* Contact Form - Primary Visual Focus */}
              <div id="contact-form" className="bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10 transition-all hover:shadow-gray-300/50">
                <h2 className="flex items-center gap-4 text-2xl font-black text-brand-navy mb-10 tracking-tight">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  Send Us a Message
                </h2>

                {/* Success Message */}
                {formStatus === 'success' && (
                  <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <p className="text-green-700 font-medium text-sm">
                      Message sent successfully. Our team will contact you shortly.
                    </p>
                  </div>
                )}

                {/* Loading Message */}
                {formStatus === 'loading' && (
                  <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                    <p className="text-blue-700 font-medium text-sm">
                      Sending your message...
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {formStatus === 'error' && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <span className="text-red-600 text-xl">✕</span>
                    <p className="text-red-700 font-medium text-sm">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-base bg-white"
                    />
                  </div>

                  {/* Email Address Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-base bg-white"
                    />
                  </div>

                  {/* Phone Number Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-base bg-white"
                    />
                  </div>

                  {/* Message Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-base resize-none bg-white"
                    />
                  </div>

                  {/* Submit Button - Thumb Friendly */}
                  <button
                    type="submit"
                    className="w-full bg-brand-orange text-white py-4 rounded-lg font-bold text-base shadow-lg shadow-brand-orange/30 hover:bg-orange-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 min-h-[52px]"
                  >
                    Send Message
                  </button>

                  {/* Trust Text */}
                  <p className="mt-12 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    We never share your details.
                  </p>
                </form>

                {/* Trust Indicators */}
                <div className="mt-14 pt-10 border-t border-gray-100">
                  <div className="flex flex-wrap justify-center gap-4">
                    {/* Authorized Dealer - Blue */}
                    <div className="flex items-center gap-2.5 bg-blue-50/50 px-4 py-2.5 rounded-2xl border border-blue-100/50">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">Authorized Dealer</span>
                    </div>

                    {/* Free Installation - Orange */}
                    <div className="flex items-center gap-2.5 bg-orange-50/50 px-4 py-2.5 rounded-2xl border border-orange-100/50">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-brand-orange">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-700">Free Installation</span>
                    </div>

                    {/* Trained Technicians - Green */}
                    <div className="flex items-center gap-2.5 bg-green-50/50 px-4 py-2.5 rounded-2xl border border-green-100/50">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-green-700">Service Plan</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Snippet */}
                <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-brand-navy">Sindhu</span>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic">
                        "Excellent service! They installed my inverter within 2 hours of ordering. Very professional team."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-Only Quick CTA (Order 2 on mobile, hidden on desktop) */}
              <div className="mt-6 lg:hidden">
                <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light rounded-xl p-5 text-center">
                  <p className="text-white font-medium mb-4 text-sm">Need quick help? Contact us directly!</p>
                  <div className="flex gap-3">
                    <a
                      href="tel:9445955555"
                      className="flex-1 bg-white text-brand-orange py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-md min-h-[52px]"
                    >
                      📞 Call Now
                    </a>
                    <a
                      href="https://wa.me/919445955555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-md min-h-[52px]"
                    >
                      <span className="w-5 h-5">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </span>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Details (Order 3+ on mobile) */}
            <div className="order-2 space-y-5">
              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone - Fully Clickable */}
                <a
                  href="tel:9445955555"
                  className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-700 cursor-pointer min-h-[180px] flex flex-col hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-blue-50/50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-blue-100/50">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-brand-navy text-[11px] uppercase tracking-widest mb-2">Primary Phone</h3>
                  <p className="font-black text-brand-navy text-lg group-hover:text-brand-orange transition-colors">+91 94459 55555</p>
                  <p className="text-gray-400 text-[10px] font-bold mt-auto uppercase tracking-tighter">Mon - Sat: 10AM - 8PM</p>
                </a>

                {/* WhatsApp - Fully Clickable */}
                <a
                  href="https://wa.me/919445955555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-green-300 transition-all duration-700 cursor-pointer min-h-[180px] flex flex-col hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-green-50/50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 border border-green-100/50">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-brand-navy text-[11px] uppercase tracking-widest mb-2">WhatsApp Support</h3>
                  <p className="font-black text-green-600 text-lg">+91 94459 55555</p>
                  <p className="text-gray-400 text-[10px] font-bold mt-auto uppercase tracking-tighter">Fast Response</p>
                </a>

                {/* Email - Clickable */}
                <a
                  href="mailto:admin@digitalpower.in"
                  className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-red-300 transition-all duration-700 cursor-pointer min-h-[180px] flex flex-col hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-red-50/50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-red-100/50">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-brand-navy text-[11px] uppercase tracking-widest mb-2">Official Email</h3>
                  <p className="font-black text-brand-navy text-base group-hover:text-brand-orange transition-colors">admin@digitalpower.in</p>
                  <p className="text-gray-400 text-[10px] font-bold mt-auto uppercase tracking-tighter">24hr Response Time</p>
                </a>

                {/* Store Address */}
                <div className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-brand-navy/20 transition-all duration-700 min-h-[180px] flex flex-col hover:-translate-y-2">
                  <div className="w-12 h-12 bg-purple-50/50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-purple-100/50">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-black text-brand-navy text-[11px] uppercase tracking-widest mb-2">Store Address</h3>
                  <div className="text-gray-600 text-xs leading-relaxed font-bold">
                    <p className="text-brand-navy mb-1 uppercase tracking-tight">Digital Power Inverters</p>
                    6, Kadappa Road, Rettery Kolathur,<br />
                    Chennai, Tamil Nadu 600099
                  </div>
                </div>
              </div>

              {/* Business Hours - Enhanced Readability */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="font-black text-brand-navy text-lg mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Business Hours
                </h3>
                <div className="space-y-4">
                  {/* Weekdays */}
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-700 text-sm">Monday - Saturday</span>
                    </div>
                    <span className="font-black text-brand-navy text-xs bg-green-100/50 text-green-700 px-4 py-2 rounded-xl">
                      10:00 AM - 8:00 PM
                    </span>
                  </div>

                  {/* Sunday */}
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-700 text-sm">Sunday</span>
                    </div>
                    <span className="font-black text-xs bg-red-100/50 text-red-600 px-4 py-2 rounded-xl uppercase tracking-widest">
                      Closed
                    </span>
                  </div>
                </div>

                {/* Current Status Indicator */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></span>
                    <span className="relative block w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Currently <span className="text-green-600">Open For Business</span></span>
                </div>
              </div>

              {/* Google Map Section */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                {/* Map Heading */}
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-brand-navy text-base flex items-center gap-3">
                    <span className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">🗺️</span>
                    Find Us on Map
                  </h3>
                </div>

                {/* Map Container - Increased Height */}
                <div className="relative h-80 bg-gray-100">
                  <iframe
                    key="map-final-v6"
                    src="https://maps.google.com/maps?q=DIGITAL+POWER+INVERTERS+%7C+Microtek+dealer+%7C+Luminous+dealer,+Kadappa+Road,+Chennai&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>

                {/* Get Directions Button */}
                <div className="p-4">
                  <a
                    href="https://maps.google.com/?q=Kolathur,Chennai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white py-3 rounded-lg font-semibold text-sm hover:bg-orange-600 hover:scale-[1.02] transition-all duration-300 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Supporting Info (Lower Hierarchy) */}
      <section className="py-12 md:py-14 px-4 md:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-brand-navy/10 text-brand-navy px-4 py-1.5 rounded-full text-xs font-bold mb-3">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
              Frequently Asked <span className="text-brand-orange">Questions</span>
            </h2>
          </div>

          {/* Accordion FAQs */}
          <div className="space-y-3">
            {[
              {
                question: "Do you provide free installation?",
                answer: "Yes! We provide free installation for all inverters and batteries purchased from us. Our trained technicians will install and set up your power backup system at your convenience."
              },
              {
                question: "What warranty do you offer?",
                answer: "All our products come with manufacturer warranty. Inverters have up to 3 years warranty, and batteries have up to 5 years warranty depending on the model."
              },
              {
                question: "Do you have an exchange program for old batteries?",
                answer: "Yes, we accept old batteries of any brand and offer up to ₹5,000 discount on new battery purchases. Contact us for the exact exchange value."
              },
              {
                question: "What areas do you deliver to?",
                answer: "We provide free delivery across Chennai. For locations outside Chennai, please contact us for delivery charges and availability."
              },
              {
                question: "How long does delivery take?",
                answer: "We offer same-day delivery for orders placed before 2 PM within Chennai. For other areas, delivery typically takes 2-3 business days."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Question - Clickable Header */}
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-brand-navy text-sm md:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Answer - Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-4 pb-4 pt-0 text-gray-600 text-sm leading-relaxed pl-[60px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ CTA */}
          <div className="mt-16 text-center bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
            <p className="text-gray-500 font-bold mb-6 italic">Still have questions? Our experts are here to help!</p>
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-brand-orange/20"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Talk to an Expert Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section - Call / WhatsApp (Horizontal Layout) */}
      <section className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Text Content - Left Aligned on Desktop */}
            <div className="text-center md:text-left flex-1">
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
              >
                Need Immediate Assistance?
              </h2>
              <p className="text-white/90 text-base md:text-lg max-w-2xl">
                Our team is ready to help you! Call us now or send a WhatsApp message for quick support.
                <span className="block mt-2 text-white/60 text-sm flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Available Mon-Sat: 10AM - 8PM
                </span>
              </p>
            </div>

            {/* CTA Buttons - Right/Center Aligned */}
            <div className="flex flex-col sm:flex-row gap-5 shrink-0">
              {/* Call Now Button */}
              <a
                href="tel:9445955555"
                className="group bg-white text-brand-orange px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-50 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 shadow-xl inline-flex items-center justify-center gap-4 min-w-[220px]"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>

              {/* WhatsApp Now Button */}
              <a
                href="https://wa.me/919445955555"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-500 text-white px-8 py-4 md:px-8 md:py-4 rounded-xl font-bold text-base hover:bg-green-400 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-3 min-w-[200px]"
              >
                <span className="w-6 h-6 group-hover:animate-pulse">
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp Button - Mobile Only */}
      <a
        href="https://wa.me/919445955555"
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center text-2xl hover:bg-green-400 hover:scale-110 transition-all duration-300 animate-bounce"
        style={{ animationDuration: '2s' }}
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div >
  );
}
