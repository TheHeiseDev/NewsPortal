import { FC, useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";

declare global {
  interface Window {
    twttr: any;
  }
}

interface IShareTwitter {
  currentUrl: string;
}

export const ShareTwitter: FC<IShareTwitter> = ({ currentUrl }) => {
  useEffect(() => {
    window.twttr && window.twttr.widgets.load();
  }, []);

  return (
    <a target="_blank" href={`https://twitter.com/intent/tweet?url=${currentUrl}`}>
      <TwitterIcon />
    </a>
  );
};
