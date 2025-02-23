import { useEffect } from "react";

export default function AdSenseAd() {
  useEffect(() => {
    try {
      // Wywołanie push, by AdSense załadował reklamę w <ins>
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle push error:", e);
    }
  }, []);

  return (
    <ins 
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          margin: "20px 0"
        }}
        data-ad-client="pub-6565480842270630"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
  );
}
