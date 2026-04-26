import Link from "next/link";
import { services } from "@/data/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return services.map((service) => ({
        id: service.id.toString(),
    }));
}

export default async function ServiceDetailPage(props) {
    // In Next.js 15+, params is a Promise
    const params = await props.params;
    const service = services.find((s) => s.id.toString() === params.id);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B3C5D 0%, #0d4a70 100%)' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container-wide relative z-10 text-center text-white">
                    <nav className="flex justify-center items-center gap-2 text-sm text-gray-300 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>›</span>
                        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                        <span>›</span>
                        <span className="text-brand-orange font-medium">{service.name}</span>
                    </nav>

                    <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-5xl mb-6 backdrop-blur-sm shadow-xl border border-white/10">
                        {service.icon}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left Side */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Service Overview */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                                <h2 className="text-2xl font-bold text-brand-navy mb-6 pb-4 border-b border-gray-100">
                                    Service Overview
                                </h2>
                                <div className="text-gray-600 leading-relaxed space-y-4">
                                    <p>
                                        At Digital Power, we pride ourselves on providing top-notch <strong className="text-brand-navy">{service.name}</strong> to ensure your power backup systems operate at peak performance.
                                        Our team of dedicated professionals is trained to handle all requirements with precision and care.
                                    </p>
                                    <p>
                                        Whether for home or office, this service is designed to give you peace of mind. We utilize the best tools and practices in the industry to deliver results that exceed your expectations.
                                    </p>
                                </div>
                            </div>

                            {/* Key Benefits */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                                <h3 className="text-xl font-bold text-brand-navy mb-6">Key Benefits</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-brand-orange/30 hover:bg-orange-50/30 transition-all">
                                            <div className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                                ✓
                                            </div>
                                            <span className="font-semibold text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Choose Us */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                                <h3 className="text-xl font-bold text-brand-navy mb-6">Why Choose Digital Power?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {[
                                        { icon: "⚡", title: "10+ Years", desc: "Trusted experience in power solutions" },
                                        { icon: "🛡️", title: "Genuine Parts", desc: "Only authorized & original components" },
                                        { icon: "🏆", title: "5000+ Customers", desc: "Satisfied across Chennai" },
                                    ].map((item, i) => (
                                        <div key={i} className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="text-3xl mb-3">{item.icon}</div>
                                            <h4 className="font-bold text-brand-navy text-sm mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="space-y-6">

                            {/* Service Process */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h4 className="font-bold text-brand-navy mb-6 text-center">How It Works</h4>
                                <div className="space-y-0">
                                    {[
                                        { step: "1", icon: "📞", title: "Call Us", desc: "Describe your requirement" },
                                        { step: "2", icon: "🔧", title: "Expert Visit", desc: "Free on-site assessment" },
                                        { step: "3", icon: "✅", title: "Job Done", desc: "Same-day completion" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-sm border-2 border-brand-orange/30">
                                                    {item.step}
                                                </div>
                                                {i < 2 && <div className="w-0.5 h-8 bg-brand-orange/20"></div>}
                                            </div>
                                            <div className="pt-1.5 pb-4">
                                                <p className="font-bold text-brand-navy text-sm">{item.icon} {item.title}</p>
                                                <p className="text-gray-500 text-xs">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Contact */}
                            <div className="bg-gradient-to-br from-brand-navy to-[#062A42] rounded-2xl p-6 text-white text-center shadow-lg">
                                <p className="text-sm text-gray-300 mb-2">Call us for service</p>
                                <a href="tel:9445955555" className="text-2xl font-bold text-brand-orange hover:text-orange-400 transition-colors">
                                    94459 55555
                                </a>
                                <a href={`https://wa.me/919445955555?text=Hi, I am interested in ${service.name} service.`} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-colors mt-3 mx-auto w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                    WhatsApp Us
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                                <div className="space-y-3">
                                    {[
                                        { icon: "✅", text: "100% Genuine Products" },
                                        { icon: "🛡️", text: "Warranty Assured" },
                                        { icon: "⚡", text: "Same Day Service" },
                                        { icon: "💰", text: "Best Price Guarantee" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm">
                                            <span>{item.icon}</span>
                                            <span className="font-semibold text-gray-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
