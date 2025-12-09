"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { getToken, setToken } from "@/utils/authStorage";

export default function HomeWrapper() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      // 1. Cek token lokal dulu
      const accessToken = await getToken();
      if (accessToken) {
        router.replace("/dashboard");
        return;
      }

      // 2. Cek refresh token ke server publik (harus pakai URL full)
      try {
        const res = await fetch("https://school-learning-app.vercel.app/api/refresh", {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();

        if (data?.accessToken) {
          await setToken(data.accessToken);
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Refresh token failed:", err);
      }
    };

    // Jalankan sedikit delay supaya UI muncul dulu
    const timer = setTimeout(checkLogin, 50);
    return () => clearTimeout(timer);
  }, [router]);

  // UI langsung tampil tanpa delay
  return (
    <div className="p-8 relative">
      <SplashOnboarding />
    </div>
  );
}
