import { MapPin, Truck, Clock, Phone } from "lucide-react";

const iconMap = {
  MapPin: MapPin,
  Truck: Truck,
  Clock: Clock,
  Phone: Phone,
};

export default function ServiceAreas() {
  const highlightCards = [
    {
      icon: "MapPin",
      title: "All 64 Districts",
      description: "Nationwide coverage",
    },
    {
      icon: "Truck",
      title: "Free Site Visit",
      description: "No travel charge in Dhaka city",
    },
    {
      icon: "Clock",
      title: "Fast Response",
      description: "Reply within 1 hour",
    },
    {
      icon: "Phone",
      title: "Remote Consultation",
      description: "WhatsApp video call available",
    },
  ];

  const majorCities = [
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Sylhet",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
  ];

  const otherDistricts = [
    "Gazipur",
    "Narayanganj",
    "Cumilla",
    "Noakhali",
    "Feni",
    "Cox's Bazar",
    "Brahmanbaria",
    "Jessore",
    "Khustia",
    "Bogura",
    "Natore",
    "Sirajganj",
    "Pabna",
    "Tangail",
    "Faridpur",
    "Narsingdi",
    "Manikganj",
    "Munshiganj",
  ];

  return (
    <section id="areas" className="bg-light py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-dark mb-3">
            Areas We Serve
          </h2>
          <p className="text-gray-500">
            Professional installation across all 64 districts of Bangladesh
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {highlightCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="font-bold text-dark mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Districts Grid */}
        <div className="mb-8">
          <h4 className="font-semibold text-dark mb-4 text-center">
            Major Cities
          </h4>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {majorCities.map((city, i) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full bg-primary text-white font-semibold"
              >
                {city}
              </span>
            ))}
          </div>

          <h4 className="font-semibold text-dark mb-4 text-center">
            Other Districts
          </h4>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {otherDistricts.map((district, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 font-medium text-sm"
              >
                {district}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 font-medium text-sm">
              +More
            </span>
          </div>
        </div>

        {/* Note Box */}
        <div className="max-w-3xl mx-auto bg-secondary/10 border border-secondary rounded-xl p-5 text-center">
          <p className="text-dark">
            Free site visit and installation in Dhaka city, no travel cost.
            <br />
            Travel charges may apply for areas outside Dhaka city.
            <br />
            Contact us for a customized quote for your location.
          </p>
        </div>
      </div>
    </section>
  );
}
