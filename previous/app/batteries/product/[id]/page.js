import { batteryProducts } from "@/data/products";
import Link from "next/link";
import ProductDetailView from "@/components/ProductDetailView";

export function generateStaticParams() {
    return batteryProducts.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function BatteryDetailPage({ params }) {
    const { id } = await params;
    const productId = parseInt(id);
    const product = batteryProducts.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
                    <Link href="/batteries" className="text-brand-orange hover:underline font-medium">
                        ← Back to Batteries
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <ProductDetailView
            product={product}
            categoryLabel="Batteries"
            backUrl="/batteries"
        />
    );
}

