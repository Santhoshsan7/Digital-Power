import Link from "next/link";
import { services } from "@/data/products";

export const metadata = {
  title: "Services - Digital Power",
  description: "Professional installation, battery exchange, AMC, and repair services for inverters and batteries in Chennai.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="section-hero-orange py-16" style={{ background: 'linear-gradient(135deg, #F57C00 0%, #D66A00 50%, #C45D00 100%)' }}>
        <div className="container-wide text-center relative">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-white font-black text-[10px] uppercase tracking-[3px] mb-8 animate-fadeIn">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Our Service Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            Expert <span className="text-white">Power</span> Solutions
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-center text-white/85 font-medium leading-relaxed">
            Complete power backup solutions with professional installation, maintenance,
            and 24/7 expert support across Chennai.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-content-gray">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                {/* Icon Header */}
                <div className="service-card-header">
                  <span className="service-card-icon">{service.icon}</span>
                </div>

                {/* Content */}
                <div className="service-card-content">
                  <h3 className="service-card-title">{service.name}</h3>
                  <p className="service-card-desc">{service.description}</p>

                  {/* Features */}
                  <ul className="service-card-features">
                    {service.features.map((feature, i) => (
                      <li key={i} className="service-card-feature">
                        <span className="service-card-feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={service.id === 1 || service.id === 2 ? `/services/${service.id}` : "/contact"} className="btn-secondary w-full mt-auto text-center block py-2">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-12" style={{ color: '#0B3C5D' }}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                step: "1",
                title: "Contact Us",
                desc: "Call or WhatsApp us with your requirement",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )
              },
              {
                step: "2",
                title: "Free Consultation",
                desc: "Our expert visits your location for assessment",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                step: "3",
                title: "Get Quote",
                desc: "Receive best price quote with no hidden charges",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                step: "4",
                title: "Installation",
                desc: "Same-day professional installation",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-brand-orange/5 rounded-[32px] flex items-center justify-center text-brand-orange shadow-lg shadow-orange-500/5 group-hover:bg-brand-orange group-hover:text-white transition-all duration-700 group-hover:rotate-6 border border-brand-orange/10 group-hover:border-brand-orange">
                    {item.icon}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-navy text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-xl border-4 border-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-bold opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container-wide text-center">
          <div className="inline-flex items-center gap-2 bg-brand-navy/10 px-5 py-2 rounded-full text-brand-navy font-black text-[10px] uppercase tracking-[3px] mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Wide Coverage Area</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy mb-12 tracking-tight">
            Service Areas in <span className="text-brand-orange">Chennai</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Kolathur", "Retteri", "Madhavaram", "Villivakkam", "Padi", "Anna Nagar", "Perambur", "Vyasarpadi", "Redhills", "Ambattur", "Surapet", "Koyambedu"].map((area) => (
              <span
                key={area}
                className="group bg-white rounded-2xl px-8 py-4 font-black shadow-xl shadow-gray-200 hover:shadow-2xl hover:border-brand-orange/30 border border-transparent transition-all cursor-default flex items-center gap-3 hover:-translate-y-1"
                style={{ color: '#0B3C5D', fontSize: '13px', letterSpacing: '0.025em' }}
              >
                <div className="w-2 h-2 rounded-full bg-brand-orange group-hover:scale-150 transition-transform duration-500"></div>
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #155e75 100%)' }}></div>

        <div className="container-narrow relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Need Any Service?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
            Call us now for quick assistance. Our team is available 7 days a week for all your power needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:9445955555"
              className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-brand-orange px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 hover:-translate-y-1.5 transition-all duration-500"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>94459 55555</span>
            </a>
            <a
              href="https://wa.me/919445955555"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-green-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-green-500/30 hover:scale-105 hover:-translate-y-1.5 transition-all duration-500 border border-white/10"
            >
              <div className="w-6 h-6 group-hover:scale-110 transition-transform duration-500">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
