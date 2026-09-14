import {
  FaAward,
  FaCertificate,
  FaGift,
  FaHandshake,
  FaTruckFast,
} from "react-icons/fa6";
import { RiShieldCheckFill } from "react-icons/ri";

const items = [
  {
    id: 1,
    title: "Quality Products",
    icon: <FaAward />,
  },
  {
    id: 2,
    title: "Non-stop Offers",
    icon: <FaGift />,
  },
  {
    id: 3,
    title: "Fastest Delivery",
    icon: <FaTruckFast />,
  },
  {
    id: 4,
    title: "Secure Payment",
    icon: <RiShieldCheckFill />,
  },
  {
    id: 5,
    title: "24/7 Support",
    icon: <FaHandshake />,
  },
  {
    id: 6,
    title: "100% Happiness",
    icon: <FaCertificate />,
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-gray-50 border-y border-gray-100 font-baiJamjuree">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center gap-4 group cursor-default">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
