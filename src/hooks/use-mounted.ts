import { useEffect, useState } from "react";

/**
 * A hook to detect if the component has mounted on the client.
 * Essential for preventing hydration mismatches when using browser-only APIs
 * or rendering content that differs between server and client.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
