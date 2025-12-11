/* eslint-disable @next/next/no-img-element */
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState } from "react";

// import {
//   Building03Icon,
//   LicenseIcon,
//   NewsIcon,
// } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";

// const navItems = [
//   {
//     text: "Blog",
//     icon: LicenseIcon,
//     link: "/",
//   },
//   {
//     text: "About Us",
//     icon: Building03Icon,
//     link: "/about",
//   },
//   {
//     text: "Press",
//     icon: NewsIcon,
//     link: "/press",
//   },
// ];
// type Indicator = { left: number; width: number } | null;

// export default function SiteHeader() {
//   const pathname = usePathname() || "/";
//   const desktopNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const [indicatorStyle, setIndicatorStyle] = useState<Indicator>(null);

//   const baseClass =
//     "flex items-center text-sm h-full py-4 px-2 gap-2 font-medium font-poppins transition-colors";
//   const activeClass = "text-teal-950";
//   const inactiveClass = "text-teal-950/70 hover:text-teal-950";

//   useEffect(() => {
//     const updateIndicator = () => {
//       const activeIndex = navItems.findIndex((item) => item.link === pathname);

//       if (activeIndex !== -1) {
//         const el = desktopNavRefs.current[activeIndex];
//         if (el) {
//           const { offsetLeft, offsetWidth } = el;
//           setIndicatorStyle({
//             left: offsetLeft,
//             width: offsetWidth,
//           });
//         }
//       } else {
//         setIndicatorStyle(null);
//       }
//     };

//     updateIndicator();

//     // Optional: update on resize too so underline stays correct
//     window.addEventListener("resize", updateIndicator);
//     return () => window.removeEventListener("resize", updateIndicator);
//   }, [pathname]);

//   return (
//     <section className="fixed left-0 top-0 z-50 w-full bg-teal-50 ">
//        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//          <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
//        </div>
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 h-22  lg:px-0">
//         <div className="flex items-center gap-3">
//           <Link
//             href="/"
//             className="z-10 flex items-center justify-center gap-2 text-white"
//           >
//             <Image
//               src="/touriptWhiteLogo.png"
//               alt="Touript logo"
//               width={32}
//               height={32}
//             />
//             <span className="font-poppins text-xl font-medium">touript</span>
//           </Link>

//           <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/10 lg:hidden">
//             <span className="block h-0.5 w-4 rounded bg-slate-800" />
//           </button>
//         </div>

//         {/* Center nav */}
//         <nav className="relative hidden h-12 items-center md:flex">
//           <div className="relative flex h-full items-center gap-8 text-base font-medium text-teal-950">
//             {indicatorStyle && (
//               <div
//                 className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-teal-950 transition-all duration-300 ease-in-out "
//                 style={{
//                   left: indicatorStyle.left,
//                   width: indicatorStyle.width,
//                 }}
//               />
//             )}

//             {navItems.map((item, idx) => {
//               const isActive = pathname === item.link;

//               return (
//                 <Link
//                   key={item.link}
//                   href={item.link}
//                   ref={(el) => {
//                     desktopNavRefs.current[idx] = el;
//                   }}
//                   className={`${baseClass} ${
//                     isActive ? activeClass : inactiveClass
//                   }`}
//                 >
//                   {item.icon && (
//                     <HugeiconsIcon icon={item.icon} size={20} strokeWidth={2} />
//                   )}
//                   <span>{item.text}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Right: social links */}
//         <div className="hidden items-center gap-3 md:flex">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
//           >
//             <Image
//               src="/facebook.png"
//               alt="Facebook logo"
//               width={24}
//               height={24}
//             />
//           </a>

//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
//           >
//             <Image
//               src="/instagram.png"
//               alt="Instagram logo"
//               width={24}
//               height={24}
//             />
//           </a>

//           <a
//             href="https://tiktok.com"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
//           >
//             <Image src="/tiktok.png" alt="Tiktok logo" width={24} height={24} />
//           </a>
//         </div>
//       </div>
//      </section>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo, useRef, useState } from "react";

// import {
//   Building03Icon,
//   LicenseIcon,
//   NewsIcon,
// } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";

// type Indicator = { left: number; width: number } | null;

// export default function SiteHeader() {
//   const pathname = usePathname() || "/";
//   const isAdminSection = pathname.startsWith("/admin");

//   // 👇 Memoised nav items so reference is stable for useEffect deps
//   const navItems = useMemo(
//     () =>
//       isAdminSection
//         ? [
//             { text: "Blog", icon: LicenseIcon, link: "/admin/blog" },
//             { text: "About Us", icon: Building03Icon, link: "/admin/about" },
//             { text: "Press", icon: NewsIcon, link: "/admin/press" },
//           ]
//         : [
//             { text: "Blog", icon: LicenseIcon, link: "/" },
//             { text: "About Us", icon: Building03Icon, link: "/about" },
//             { text: "Press", icon: NewsIcon, link: "/press" },
//           ],
//     [isAdminSection]
//   );

//   const desktopNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const [indicatorStyle, setIndicatorStyle] = useState<Indicator>(null);

//   const baseClass =
//     "flex items-center text-sm h-full py-4 px-2 gap-2 font-medium font-poppins transition-colors";
//   const activeClass = "text-teal-950";
//   const inactiveClass = "text-teal-950/70 hover:text-teal-950";

//   useEffect(() => {
//     const updateIndicator = () => {
//       const activeIndex = navItems.findIndex(
//         (item) => item.link === pathname
//       );

//       if (activeIndex === -1) {
//         setIndicatorStyle(null);
//         return;
//       }

//       const el = desktopNavRefs.current[activeIndex];
//       if (el) {
//         const { offsetLeft, offsetWidth } = el;
//         setIndicatorStyle({
//           left: offsetLeft,
//           width: offsetWidth,
//         });
//       }
//     };

//     updateIndicator();
//     window.addEventListener("resize", updateIndicator);
//     return () => window.removeEventListener("resize", updateIndicator);
//   }, [pathname, navItems]); // ✅ now safe, navItems is memoised

//   const logoHref = isAdminSection ? "/admin/blog" : "/";

//   return (
//     <section className="fixed left-0 top-0 z-50 w-full bg-teal-50">
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto flex h-22 max-w-6xl items-center justify-between px-4 lg:px-0">
//         {/* Left: logo + burger */}
//         <div className="flex items-center gap-3">
//           <Link
//             href={logoHref}
//             className="z-10 flex items-center justify-center gap-2 text-white"
//           >
//             <Image
//               src="/touriptWhiteLogo.png"
//               alt="Touript logo"
//               width={32}
//               height={32}
//             />
//             <span className="font-poppins text-xl font-medium">touript</span>
//           </Link>

//           <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/10 lg:hidden">
//             <span className="block h-0.5 w-4 rounded bg-slate-800" />
//           </button>
//         </div>

//         {/* Center nav */}
//         <nav className="relative hidden h-12 items-center md:flex">
//           <div className="relative flex h-full items-center gap-8 text-base font-medium text-teal-950">
//             {indicatorStyle && (
//               <div
//                 className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-teal-950 transition-all duration-300 ease-in-out"
//                 style={{
//                   left: indicatorStyle.left,
//                   width: indicatorStyle.width,
//                 }}
//               />
//             )}

//             {navItems.map((item, idx) => {
//               const isActive = pathname === item.link;
//               return (
//                 <Link
//                   key={item.link}
//                   href={item.link}
//                   ref={(el) => {
//                     desktopNavRefs.current[idx] = el;
//                   }}
//                   className={`${baseClass} ${
//                     isActive ? activeClass : inactiveClass
//                   }`}
//                 >
//                   {item.icon && (
//                     <HugeiconsIcon icon={item.icon} size={20} strokeWidth={2} />
//                   )}
//                   <span>{item.text}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Right: social links */}
//         <div className="hidden items-center gap-3 md:flex">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
//           >
//             <Image
//               src="/facebook.png"
//               alt="Facebook logo"
//               width={24}
//               height={24}
//             />
//           </a>

//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
//           >
//             <Image
//               src="/instagram.png"
//               alt="Instagram logo"
//               width={24}
//               height={24}
//             />
//           </a>

//           <a
//             href="https://tiktok.com"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
//           >
//             <Image src="/tiktok.png" alt="Tiktok logo" width={24} height={24} />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Building03Icon,
  LicenseIcon,
  NewsIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

type Indicator = { left: number; width: number } | null;

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isAdminSection = pathname.startsWith("/admin");

  // 👇 memoised nav items so reference is stable for useEffect deps
  const navItems = useMemo(
    () =>
      isAdminSection
        ? [
            { text: "Blog", icon: LicenseIcon, link: "/admin/blog" },
            { text: "About Us", icon: Building03Icon, link: "/admin/about" },
            { text: "Press", icon: NewsIcon, link: "/admin/press" },
          ]
        : [
            { text: "Blog", icon: LicenseIcon, link: "/" },
            { text: "About Us", icon: Building03Icon, link: "/about" },
            { text: "Press", icon: NewsIcon, link: "/press" },
          ],
    [isAdminSection]
  );

  const desktopNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<Indicator>(null);

  const baseClass =
    "flex items-center text-sm h-full py-4 px-2 gap-2 font-medium font-poppins transition-colors";
  const activeClass = "text-teal-950";
  const inactiveClass = "text-teal-950/70 hover:text-teal-950";

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = navItems.findIndex(
        (item) => item.link === pathname
      );

      if (activeIndex === -1) {
        setIndicatorStyle(null);
        return;
      }

      const el = desktopNavRefs.current[activeIndex];
      if (el) {
        const { offsetLeft, offsetWidth } = el;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname, navItems]);

  const logoHref = isAdminSection ? "/admin/blog" : "/";

  async function handleLogout() {
    try {
      // wherever you stored the token after login:
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("adminToken")
          : null;

      await fetch(`${API_BASE}/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // credentials: "include", // only if you're also using cookies
      }).catch(() => {});

      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }

      router.push("/");
    } catch (e) {
      // optional: toast error
      router.push("/login");
    }
  }

  return (
    <section className="fixed left-0 top-0 z-50 w-full bg-teal-50">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex h-22 max-w-6xl items-center justify-between px-4 lg:px-0">
        {/* Left: logo + burger */}
        <div className="flex items-center gap-3">
          <Link
            href={logoHref}
            className="z-10 flex items-center justify-center gap-2 text-white"
          >
            <img
              src="/touriptWhiteLogo.png"
              alt="Touript logo"
              // width={32}
              // height={32}
              className="h-8 w-auto object-cover"
            />
            <span className="font-poppins text-xl font-medium">touript</span>
          </Link>

          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/10 lg:hidden">
            <span className="block h-0.5 w-4 rounded bg-slate-800" />
          </button>
        </div>

        {/* Center nav */}
        <nav className="relative hidden h-12 items-center md:flex">
          <div className="relative flex h-full items-center gap-8 text-base font-medium text-teal-950">
            {indicatorStyle && (
              <div
                className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-teal-950 transition-all duration-300 ease-in-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            )}

            {navItems.map((item, idx) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  ref={(el) => {
                    desktopNavRefs.current[idx] = el;
                  }}
                  className={`${baseClass} ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  {item.icon && (
                    <HugeiconsIcon icon={item.icon} size={20} strokeWidth={2} />
                  )}
                  <span>{item.text}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          {isAdminSection ? (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-teal-950/10 cursor-pointer transition-all duration-300 ease-in-out bg-teal-950/10 px-4 py-2 text-sm font-medium text-teal-950 hover:text-white hover:bg-teal-950"
            >
              Logout
            </button>
          ) : (
            <>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook logo"
                  width={24}
                  height={24}
                />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram logo"
                  width={24}
                  height={24}
                />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
              >
                <Image
                  src="/tiktok.png"
                  alt="Tiktok logo"
                  width={24}
                  height={24}
                />
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

