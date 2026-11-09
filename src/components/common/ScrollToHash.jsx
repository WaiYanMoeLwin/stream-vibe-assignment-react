import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
    const location = useLocation();

    useEffect(() => {
        const scroll = () => {
            if (location.hash) {
                let element = document.getElementById(location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                } else {
                    setTimeout(scroll, 100);
                }
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };
        setTimeout(scroll, 100);
    }, [location]);

    return null;
}