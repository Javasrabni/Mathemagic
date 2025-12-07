import { Haptics, ImpactStyle } from "@capacitor/haptics";
import Link from "next/link";

export default function Home() {
  const vibrate = async () => {
    await Haptics.impact({
      style: ImpactStyle.Medium
    })
  }
  return (
    <div className="m-auto max-w-[32rem] w-full bg-blue-400">
      <p>tes</p>
      <Link href="/auth/register">LOGIN</Link>
      <button onClick={vibrate}>GETER</button>
    </div>
  );
}
