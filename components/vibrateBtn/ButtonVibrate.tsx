"use client"
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const vibrate = async () => {
  await Haptics.impact({
    style: ImpactStyle.Medium,
  });
};

export default function ButtonVibrate() {
  return (
    <button onClick={vibrate}>
      Vibrate
    </button>
  );
}