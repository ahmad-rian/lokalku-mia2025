"use client";

import { ContainerScroll } from "./ui/container-scroll-animation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function MapShowcaseSection() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <ContainerScroll
                titleComponent={
                    <>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                            {t("mapShowcase.title")}
                            <br />
                            <span className="text-4xl md:text-[5rem] lg:text-[6rem] font-bold mt-2 leading-none bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                                {t("mapShowcase.highlight")}
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6 mb-8">
                            {t("mapShowcase.description")}
                        </p>
                        <Link
                            to="/peta"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                            </svg>
                            {t("mapShowcase.cta")}
                        </Link>
                    </>
                }
            >
                <picture>
                    <source media="(max-width: 768px)" srcSet="/assets/images/peta-mobile.webp" />
                    <img
                        src="/assets/images/peta.webp"
                        alt={t("mapShowcase.imageAlt")}
                        className="mx-auto rounded-2xl object-cover h-full object-top w-full"
                        draggable={false}
                        loading="lazy"
                    />
                </picture>
            </ContainerScroll>
        </div>
    );
}
