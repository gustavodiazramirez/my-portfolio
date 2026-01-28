"use client";

import { Award, ExternalLink, Calendar, Shield, ChevronDown } from "lucide-react";
import { useState } from "react";
import { certifications as certificationsData } from "@/lib/certifications";
import { motion } from "framer-motion";

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedCertifications = showAll ? certificationsData : certificationsData.slice(0, 5);

  return (
    <section
      id="certifications"
      className="relative py-16 sm:py-20 lg:py-28 xl:py-32 px-6 sm:px-8 lg:px-16 xl:px-60"
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="space-y-3 mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Licencias y Certificaciones
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/30 rounded-full mx-auto"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Formación continua en tecnologías y metodologías modernas
          </p>
        </motion.div>

        {/* Table - Desktop and Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Certificación
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Emisor
                    </div>
                  </th>
                  <th className="hidden md:table-cell text-left py-4 px-6 text-sm font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Fecha
                    </div>
                  </th>
                  <th className="hidden md:table-cell text-center py-4 px-6 text-sm font-semibold text-foreground">
                    Credencial
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedCertifications.map((cert, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-border/30 hover:bg-primary/5 transition-colors duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {cert.titulo}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">
                      {cert.institucion}
                    </td>
                    <td className="hidden md:table-cell py-4 px-6 text-sm text-muted-foreground">
                      {cert.fecha}
                    </td>
                    <td className="hidden md:table-cell py-4 px-6 text-center">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 hover:border-primary transition-all duration-200 text-sm font-medium group-hover:scale-105"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver credencial
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>



        {/* Ver más / Ver menos button */}
        {certificationsData.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 text-foreground hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="font-medium">
                {showAll ? "Ver menos" : `Ver más (${certificationsData.length - 5} adicionales)`}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
