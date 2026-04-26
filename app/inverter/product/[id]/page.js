import { inverterProducts } from "@/data/products";
import Link from "next/link";
import ProductDetailView from "@/components/ProductDetailView";

export function generateStaticParams() {
    return inverterProducts.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function InverterDetailPage({ params }) {
    const { id } = await params;
    const productId = parseInt(id);
    const product = inverterProducts.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
                    <Link href="/inverter" className="text-brand-orange hover:underline font-medium">
                        ← Back to Inverters
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <ProductDetailView
            product={product}
            categoryLabel="Inverters"
            backUrl="/inverter"
        />
    );
}

