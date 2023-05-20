import { useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";

export function ShareTwitter({ currentUrl }) {
    useEffect(() => {
      window.twttr && window.twttr.widgets.load();
    }, []);
  
    return (
      <a className="" href={`https://twitter.com/intent/tweet?url=${currentUrl}`}>
        <TwitterIcon />
      </a>
    );
  }