import { removeToken } from "@/utils/authStorage";
import { useRouter } from "next/navigation";

const router = useRouter();

export async function logout() {
  await removeToken(); // hapus token
  router.replace("/"); // kembali ke onboarding
}
