/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Building03Icon,
  Cancel01Icon,
  LicenseIcon,
  Menu09Icon,
  NewsIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://adminread.touript.com/api";

type Indicator = { left: number; width: number } | null;

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isAdminSection = pathname.startsWith("/admin");

  // 🔹 NEW: mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

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
      const activeIndex = navItems.findIndex((item) => item.link === pathname);

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
      }).catch(() => {});

      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }

      router.push("/");
    } catch (e) {
      router.push("/login");
    }
  }

  return (
    <section className="fixed left-0 top-0 z-50 w-full bg-teal-50">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
      </div>

      {/* HEADER BAR */}
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
              className="h-8 w-auto object-cover"
            />
            <span className="font-poppins text-xl font-medium">touript</span>
          </Link>

          {/* 🔹 MOBILE BURGER BUTTON */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center hover:bg-white/5 hover:rounded-full cursor-pointer lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={24}
                strokeWidth={2}
                className="text-white"
              />
            ) : (
              <HugeiconsIcon
                icon={Menu09Icon}
                size={24}
                strokeWidth={2}
                className="text-white"
              />
            )}
          </button>
        </div>

        {/* Center nav (desktop) */}
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

        {/* Right side (desktop) */}
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

      {/* 🔹 MOBILE DROPDOWN MENU    */}
      <div
        className={`relative z-0 w-full md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "max-h-80 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-2 rounded-lg py-4 text-sm text-white ">
          {/* nav links */}
          <div className="flex flex-col gap-2 font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2  px-4 py-4 ${
                    isActive
                      ? "border-l-2 border-white "
                      : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  {item.icon && (
                    <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2} />
                  )}
                  <span>{item.text}</span>
                </Link>
              );
            })}
          </div>

          {/* divider */}
          <div className="my-4 h-px w-full bg-white/10" />

          {/* admin vs public actions */}
          {isAdminSection ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="w-full rounded-xl bg-white/10 px-3 py-2 text-left text-sm font-medium hover:bg-white/20"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center justify-evenly md:justify-start gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full grayscale transition-all duration-300 hover:bg-white/10 hover:grayscale-0"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook logo"
                  width={20}
                  height={20}
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
                  width={20}
                  height={20}
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
                  width={20}
                  height={20}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
