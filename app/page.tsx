"use client";

import { useRouter } from "next/navigation";
import HomeWrapper from "@/components/Home/HomeWrapper";
import { useEffect, useState } from "react";
import { getToken, setToken } from "@/utils/authStorage";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = await getToken();

      if (accessToken) {
        // Redirect langsung jika token masih ada
        router.replace("/dashboard");
        return;
      }

      // Token tidak ada, coba refresh
      const res = await fetch("/api/refresh", {
        method: "POST",
        credentials: "include", // ambil refresh_token dari cookie
      });

      const data = await res.json();

      if (data.accessToken) {
        await setToken(data.accessToken);  // simpan akses baru
        router.replace("/dashboard");
        return;
      }

      // Tidak ada token dan refresh gagal → tampilkan HomeWrapper
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) return null; // tampilan loading sementara

  return <HomeWrapper />;
}
