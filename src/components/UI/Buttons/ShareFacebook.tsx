import FacebookIcon from "@mui/icons-material/Facebook";
import { FC, useEffect } from "react";


declare global {
  interface Window {
    FB: any;
  }
}

interface IShareFacebook {
  currentUrl: string;
}

export const ShareFacebook: FC<IShareFacebook> = ({ currentUrl }) => {
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
};
