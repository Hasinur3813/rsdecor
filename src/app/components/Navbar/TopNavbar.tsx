import React from "react";
import { FaClock, FaEnvelope, FaPhone } from "react-icons/fa";
const TopNavbar: React.FC = () => {
  return (
    <div className="text-background py-2 container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
        {/* Office Hours */}
        <div className="flex items-center gap-2">
          <FaClock className="text-background text-3xl" />
          <div className="flex flex-col justify-center items-start">
            <span className="font-bold">Office Hours</span>
            <span className="font-medium">10.00 am to 7.00 pm</span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-background text-3xl" />
          <div className="flex flex-col justify-center items-start">
            <span className="font-bold">E-mail</span>
            <span className="font-medium">
              <a
                href="mailto:rsdecor@gmail.com"
                className="inline-block hover:text-primary-light"
              >
                rsdecor@gmail.com
              </a>
            </span>
          </div>
        </div>

        {/* phone */}
        <div className="flex items-center gap-3">
          <FaPhone className="text-background text-3xl" />
          <div className="flex flex-col justify-center items-start">
            <span className="font-bold">Phone</span>
            <span className="font-medium">
              <a
                href="tel:+8801773061332"
                className="inline-block hover:text-primary-light"
              >
                +8801773061332
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
