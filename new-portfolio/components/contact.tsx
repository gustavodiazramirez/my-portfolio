"use client";

import { Mail, Linkedin, Github, GitlabIcon as Gitlab } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Contact = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "gustavodiazramirez26@gmail.com",
      href: "mailto:gustavodiazramirez26@gmail.com",
      color: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      bgColor: "group-hover:bg-blue-50 dark:group-hover:bg-blue-600/10",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/gdiaz14",
      href: "https://www.linkedin.com/in/gdiaz14",
      color: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      bgColor: "group-hover:bg-blue-50 dark:group-hover:bg-blue-600/10",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@gustavidiazramirez",
      href: "https://github.com/gustavodiazramirez",
      color: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      bgColor: "group-hover:bg-blue-50 dark:group-hover:bg-blue-600/10",
    },
    {
      icon: Gitlab,
      label: "GitLab",
      value: "@gdiaz14",
      href: "https://gitlab.com/gdiaz14",
      color: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      bgColor: "group-hover:bg-blue-50 dark:group-hover:bg-blue-600/10",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full px-4 sm:px-8 md:px-60 pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-20 flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 lg:w-[500px] lg:h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto w-full">
        {/* Content */}
        <div className="w-full">
          {/* Contact Info */}
          <div className="space-y-8 w-full">
            {/* Title */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Hablemos
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/30 rounded-full"></div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-md pt-2">
                Si tienes una idea, un proyecto o simplemente quieres conversar sobre tecnología.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-3">
              {contactLinks.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-card/30 backdrop-blur-sm border border-gray-200 dark:border-border/40 hover:border-blue-400 dark:hover:border-primary/40 transition-all duration-300 hover:translate-x-1 hover:shadow-md ${contact.bgColor}`}
                >
                  <div className={`p-3 rounded-xl bg-gray-100 dark:bg-muted/50 text-gray-600 dark:text-muted-foreground transition-all duration-300 ${contact.color}`}>
                    <contact.icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-muted-foreground/80 uppercase tracking-wide mb-0.5">
                      {contact.label}
                    </p>
                    <p className={`text-sm sm:text-base font-medium text-gray-900 dark:text-foreground transition-colors truncate ${contact.color}`}>
                      {contact.value}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className={`w-5 h-5 transition-transform group-hover:translate-x-1 text-gray-600 dark:text-foreground ${contact.color}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer Note */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground/70 italic">
                * Disponible para colaboraciones y nuevos retos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
