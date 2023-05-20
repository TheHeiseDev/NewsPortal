import { useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";

export function ShareTwitter({ currentUrl }) {
    useEffect(() => {
      window.twttr && window.twttr.widgets.load();
    }, []);
  
    return (
      <a  target="_blank" href={`https://twitter.com/intent/tweet?url=${currentUrl}`}>
        <TwitterIcon />
      </a>
    );
  }