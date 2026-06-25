import OrderDetailClient from "@/components/dashboard/pages/OrderDetailClient";

export const metadata = { title: "Order Details" };

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  return <OrderDetailClient orderId={id} />;
}
