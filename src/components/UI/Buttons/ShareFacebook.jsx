import FacebookIcon from "@mui/icons-material/Facebook";
import { useEffect } from "react";

export function ShareFacebook({ currentUrl }) {
  useEffect(() => {
    window.FB && window.FB.XFBML.parse();
  }, []);

  return (
    <div data-href={currentUrl} data-layout="button" data-size="small">
      <a
        target="_blank"
        href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&amp;src=sdkpreparse`}
        className="fb-xfbml-parse-ignore"
      >
        <FacebookIcon />
      </a>
    </div>
  );
}
