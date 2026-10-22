import localFont from "next/font/local";

export const inter = localFont({
  src: [
    { path: "./fonts/inter-300.woff2", weight: "300" },
    { path: "./fonts/inter-400.woff2", weight: "400" },
    { path: "./fonts/inter-500.woff2", weight: "500" },
    { path: "./fonts/inter-600.woff2", weight: "600" },
    { path: "./fonts/inter-700.woff2", weight: "700" },
    { path: "./fonts/inter-800.woff2", weight: "800" },
    { path: "./fonts/inter-900.woff2", weight: "900" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const poppins = localFont({
  src: [
    { path: "./fonts/poppins-300.woff2", weight: "300" },
    { path: "./fonts/poppins-400.woff2", weight: "400" },
    { path: "./fonts/poppins-500.woff2", weight: "500" },
    { path: "./fonts/poppins-600.woff2", weight: "600" },
    { path: "./fonts/poppins-700.woff2", weight: "700" },
    { path: "./fonts/poppins-800.woff2", weight: "800" },
    { path: "./fonts/poppins-900.woff2", weight: "900" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const fjallaOne = localFont({
  src: "./fonts/fjalla-one-400.woff2",
  weight: "400",
  variable: "--font-fjalla-one",
  display: "swap",
});

export const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-300.woff2", weight: "300" },
    { path: "./fonts/montserrat-400.woff2", weight: "400" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});
