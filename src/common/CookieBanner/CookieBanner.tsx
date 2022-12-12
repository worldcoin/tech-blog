import { Button } from "common/Button";
import posthog from "posthog-js";
import { useCallback, useEffect, useRef } from "react";
import { useState, MouseEvent } from "react";

function CookieListModal({ onClose }: { onClose: () => void }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOverlay = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const refEl = ref.current;
      const target = e.target as Element;
      if (!refEl) {
        return;
      }
      if (target === refEl || refEl.contains(target)) {
        return;
      }

      onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-000000/70"
      onClick={handleClickOverlay}
    >
      <div className="flex justify-center min-h-screen items-center">
        <div className="bg-ffffff rounded-md p-8" ref={ref}>
          <h3 className="mb-4 font-bold text-lg">
            Cookie List
            <span
              className="float-right text-slate-300 cursor-pointer hover:text-4940e0 transition-colors text-32 font-thin"
              onClick={onClose}
            >
              &times;
            </span>
          </h3>
          <ul className="list-disc pl-8 [&_code]:font-bold">
            <li>
              <code>token</code>. Stores authentication credentials.
            </li>
            <li>
              <code>cookieBanner</code>. Whether you have accepted or rejected
              the cookie banner.
            </li>
            <li>
              <code>ph_phc_id</code>. Used for analytics.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CookieBanner(): JSX.Element | null {
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const [cookieListModalVisible, setCookieListModalVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("cookieBanner")) {
      setIsCookieBannerVisible(true);
    }
  }, []);

  const handleClick = (accepted: boolean = false) => {
    if (!accepted) {
      // Tell PostHog to not persist any cookies / localStorage data
      posthog.set_config({ persistence: "memory" });

      // Clear all cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Clear all localStorage data (except for `token`; absolutely necessary for app to work)
      const token = window.localStorage.getItem("token");
      window.localStorage.clear();
      if (token) {
        window.localStorage.setItem("token", token);
      }
    }

    window.localStorage.setItem(
      "cookieBanner",
      accepted ? "accepted" : "rejected"
    );

    setIsCookieBannerVisible(false);
  };

  if (!isCookieBannerVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full flex justify-end">
      <div className="bg-fafafa rounded px-4 py-2 shadow-box w-full flex align-middle">
        <div className="flex-1">
          <h3 className="mb-2 font-sora">
            🍪 Obligatory cookie banner -
            <a
              className="ml-2 text-4940e0"
              href="https://worldcoin.pactsafe.io/rjd5nsvyq.html#contract-sjfypzwki"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>
          </h3>
          <span>
            We use two non-optional cookies, and one optional cookie for
            product-improvement analytics. Sg?
            <a
              className="ml-2 text-4940e0 cursor-pointer"
              onClick={() => setCookieListModalVisible(true)}
            >
              Cookie list
            </a>
          </span>
        </div>
        <div className="grid pr-6 grid-cols-2 gap-4 pt-2">
          <Button
            variant="outlined"
            size="md"
            color="danger"
            onClick={() => handleClick(false)}
          >
            Reject all
          </Button>
          <Button
            variant="outlined"
            size="md"
            color="primary"
            onClick={() => handleClick(true)}
          >
            Yeah, okay
          </Button>
        </div>
      </div>
      {cookieListModalVisible && (
        <CookieListModal onClose={() => setCookieListModalVisible(false)} />
      )}
    </div>
  );
}
