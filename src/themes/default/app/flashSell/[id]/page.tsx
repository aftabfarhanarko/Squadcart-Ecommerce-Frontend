import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, TrendingUp, Tag } from "lucide-react";

// This would typically come from your API/database
const getFlashSaleById = (id: string) => {
  // Mock data - replace with actual API call
  const flashSales = [
    {
      id: "1",
      title: "Electronics Mega Sale",
      description: "Up to 50% off on selected electronics items",
      discount: 50,
      startDate: "2026-02-17T10:00:00",
      endDate: "2026-02-18T23:59:59",
      products: 25,
      status: "active",
      image: "/images/electronics-sale.jpg",
    },
    {
      id: "2",
      title: "Fashion Flash Sale",
      description: "Trendy fashion items at unbeatable prices",
      discount: 40,
      startDate: "2026-02-20T00:00:00",
      endDate: "2026-02-21T23:59:59",
      products: 50,
      status: "upcoming",
      image: "/images/fashion-sale.jpg",
    },
  ];

  return flashSales.find((sale) => sale.id === id);
};

interface FlashSaleDetailProps {
  params: Promise<{
    id: string;
  }>;
}

const FlashSaleDetail = async ({ params }: FlashSaleDetailProps) => {
  const { id } = await params;
  const flashSale = getFlashSaleById(id);

  if (!flashSale) {
    notFound();
  }

  const isActive = flashSale.status === "active";
  const isUpcoming = flashSale.status === "upcoming";

  const getStatusColor = () => {
    switch (flashSale.status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/flashSell" className="hover:text-gray-900">
          Flash Sale
        </Link>
        <span>/</span>
        <span className="text-gray-900">{flashSale.title}</span>
      </nav>

      {/* Back Button */}
      <Link
        href="/flashSell"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Flash Sales
      </Link>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {flashSale.title}
              </h1>
              <p className="text-lg opacity-90">{flashSale.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Tag size={24} />
              </div>
              <span className="text-2xl font-bold">
                {flashSale.discount}% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp size={20} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Status</h3>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
              >
                {flashSale.status.charAt(0).toUpperCase() +
                  flashSale.status.slice(1)}
              </span>
            </div>

            {/* Duration */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Duration</h3>
              </div>
              <div className="text-sm text-gray-600">
                <p>Start: {formatDate(flashSale.startDate)}</p>
                <p>End: {formatDate(flashSale.endDate)}</p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp size={20} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Products</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {flashSale.products}
              </p>
              <p className="text-sm text-gray-600">items on sale</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {isActive && (
              <Link
                href="/flashSell/all"
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 text-center"
              >
                Shop This Sale
              </Link>
            )}
            {isUpcoming && (
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
                Set Reminder
              </button>
            )}
            <Link
              href="/flashSell"
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 text-center"
            >
              View All Sales
            </Link>
          </div>

          {/* Terms */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">
              Terms & Conditions
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Limited time offer, subject to availability</li>
              <li>• Cannot be combined with other promotions</li>
              <li>• While stocks last</li>
              <li>• Terms and conditions apply</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleDetail;
