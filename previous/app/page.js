import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import SEOContentSection from "@/components/home/SEOContentSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandCarousel />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyChooseUs />
      <CustomerReviews />
      <CTASection />
    </>
  );
}
