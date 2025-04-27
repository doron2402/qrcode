'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              {/* QR Code-like pattern */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-4">
                <div className="grid grid-cols-3 gap-2 h-full">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-blue-500 rounded ${
                        i % 2 === 0 ? 'opacity-100' : 'opacity-20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            QR Code Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The QR code you're looking for seems to have been scanned and disappeared.
            Let's get you back on track.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>
            <div>
              <Link
                href="/create"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create New QR Code
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}