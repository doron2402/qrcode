'use client';

import Image from 'next/image';

const testimonials = [
  {
    text: "Got my QR code tattoo last week and it's been a conversation starter everywhere I go. People love scanning it to see my portfolio!",
    name: "Alex Rivera",
    role: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  {
    text: "The QR code stickers are perfect for my business cards. They're durable and look professional. My clients love them!",
    name: "Sarah Chen",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  },
  {
    text: "My QR code tattoo links to my music portfolio. It's like having my entire career on my skin. So cool!",
    name: "Marcus Johnson",
    role: "Musician",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
  },
  {
    text: "The stickers are waterproof and last forever. I put them on my laptop and water bottle. Perfect for networking!",
    name: "Emma Wilson",
    role: "Marketing Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
  },
  {
    text: "My QR code tattoo is my digital business card. It's so much more interesting than handing out paper cards!",
    name: "David Kim",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  },
  {
    text: "The stickers are perfect for my art prints. People can scan them to see more of my work. Brilliant idea!",
    name: "Sophie Martinez",
    role: "Artist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}