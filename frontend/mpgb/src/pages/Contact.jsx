import React from 'react';
import { Mail, MapPin, Phone, Instagram, ArrowRight } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      title: "Call Us",
      value: "+91 7286076490",
      icon: <Phone className="w-6 h-6" />,
      link: "tel:+917286076490",
      color: "bg-blue-50 text-blue-600",
      hover: "hover:border-blue-400"
    },
    {
      title: "Email Support",
      value: "xmohdsameerx576@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:xmohdsameerx576@gmail.com",
      color: "bg-emerald-50 text-emerald-600",
      hover: "hover:border-emerald-400"
    },
    {
      title: "Visit Us",
      value: "Arving nagar colony lane-3 tolichowki",
      icon: <MapPin className="w-6 h-6" />,
      link: "https://maps.google.com/?q=Mpgb Collection Arvind Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008",
      color: "bg-rose-50 text-rose-600",
      hover: "hover:border-rose-400"
    },
    {
      title: "Instagram",
      value: "MPGB COLLECTION",
      icon: <Instagram className="w-6 h-6" />,
      link: "https://www.instagram.com/mpgb_collection/",
      color: "bg-purple-50 text-purple-600",
      hover: "hover:border-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            Connect With Us
          </h1>
          <p className="text-gray-500 text-lg">
            Click any of the options below to reach us directly.
          </p>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`group flex items-center justify-between p-6 rounded-2xl border-2 border-transparent bg-white shadow-sm transition-all duration-300 ${method.hover} hover:shadow-md hover:-translate-y-1`}
              style={{ border: '1px solid #f3f4f6' }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${method.color}`}>
                  {method.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{method.title}</p>
                  <p className="text-base font-bold text-gray-900">{method.value}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
            </a>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-sm text-gray-400">
          Available Monday - Friday, 9am - 5pm EST
        </p>
      </div>
    </div>
  );
};

export default Contact;