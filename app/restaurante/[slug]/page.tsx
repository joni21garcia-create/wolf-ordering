import RestaurantPage from "@/components/RestaurantPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <RestaurantPage slug={slug} />;
}