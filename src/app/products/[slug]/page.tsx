import type { Metadata } from "next";
import { ProductView, getProductStaticParams, generateProductMetadata } from "@/views/product";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateProductMetadata(slug);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  return <ProductView slug={slug} />;
}
