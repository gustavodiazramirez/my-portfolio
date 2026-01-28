"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function InstitutionCard({ institution, certs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const modalRef = useRef(null);

  const toggleCertificates = () => {
    setIsOpen(!isOpen);
    setCurrentPage(0);
  };

  const certsPerPage = 5;
  const totalPages = Math.ceil(certs.length / certsPerPage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <motion.div
        className="bg-black text-white border border-gray-800 rounded-3xl p-6 shadow-md cursor-pointer "
        onClick={toggleCertificates}
        whileHover={{ scale: 1.1, rotate: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <img
          src={`/icons/${institution
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/\./g, "")}.svg`}
          alt={institution}
          className="w-16 h-16"
        />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleCertificates}
            />

            {/* Modal content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center md:px-0 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="bg-black p-6 rounded-xl max-w-lg w-full space-y-4 border-primary shadow-primary hover:shadow-primary border-2"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <div className="flex justify-between items-center ">
              
                  <h3 className="text-xl font-semibold text-white flex flex-row items-center gap-2">
                    <img
          src={`/icons/${institution
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/\./g, "")}.svg`}
          alt={institution}
          className="w-8 h-8"
        />
                    {institution}
                  </h3>
                  <motion.button
                    onClick={toggleCertificates}
                    className="text-white text-lg font-semibold hover:text-red-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <ul className="space-y-2">
                  {certs
                    .slice(
                      currentPage * certsPerPage,
                      (currentPage + 1) * certsPerPage
                    )
                    .map((cert, index) => (
                      <motion.li
                        key={index}
                        className="bg-primary p-4 rounded-md cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 0.95 }}
                      >
                        <motion.a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full block"
                        >
                          <p className="font-semibold text-black">
                            {cert.titulo}
                          </p>
                          {cert.url && (
                            <motion.span
                              whileTap={{ scale: 0.95 }}
                              className="text-black inline-block font-bold"
                            >
                              Ver certificado
                            </motion.span>
                          )}
                        </motion.a>
                      </motion.li>
                    ))}
                </ul>

                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <motion.button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentPage === 0}
                      className="text-white disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    <span className="text-white">
                      {currentPage + 1} / {totalPages}
                    </span>
                    <motion.button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages - 1, prev + 1)
                        )
                      }
                      disabled={currentPage === totalPages - 1}
                      className="text-white disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InstitutionCard;
