import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f2a22] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left Column (60%) */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Brand & Nav */}
            <div className="space-y-8">
              <div>
                <div className="mb-4">
                  <Image
                    src="/images/Logo.jpg"
                    alt="Grace Garden Logo"
                    width={180}
                    height={60}
                    className="h-12 md:h-16 w-auto object-contain"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-serif mb-4">Grace Garden</h3>
                <p className="text-slate-300 leading-relaxed">
                  Providing compassionate care and a vibrant community for seniors. Where luxury meets legacy in elderly care.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="https://instagram.com/gracegarden_care" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a3d32] flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com/@GraceGardenCare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a3d32] flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all">
                  <Youtube size={20} />
                </a>
                <a href="https://facebook.com/gracegardencare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a3d32] flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-3">
                <Link href="/" className="text-slate-300 hover:text-primary transition-colors w-fit">Home</Link>
                <Link href="#about" className="text-slate-300 hover:text-primary transition-colors w-fit">About Us</Link>
                <Link href="#services" className="text-slate-300 hover:text-primary transition-colors w-fit">Our Services</Link>
                <Link href="#gallery" className="text-slate-300 hover:text-primary transition-colors w-fit">Gallery</Link>
                <Link href="#contact" className="text-slate-300 hover:text-primary transition-colors w-fit">Contact Us</Link>
              </nav>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-6">Our Services</h4>
              <ul className="space-y-4">
                <li className="text-slate-300">Assisted Living</li>
                <li className="text-slate-300">Elderly Care</li>
                <li className="text-slate-300">Medical Support</li>
                <li className="text-slate-300">Recreational Activities</li>
                <li className="text-slate-300">Nutritious Dining</li>
                <li className="text-slate-300">24/7 Security</li>
              </ul>
            </div>
          </div>

          {/* Right Column (40%) - Map */}
          <div className="lg:col-span-2 h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-[#1a3d32]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d949734.2551699469!2d76.535615!3d11.973291000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba60b4e26c87ef5%3A0x13d0be64ec1a4a14!2sGrace%20Garden%20Senior%20Living%20(Care%20Home)!5e1!3m2!1sen!2sin!4v1764931503332!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a3d32] mt-16 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Grace Garden Senior Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
