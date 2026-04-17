import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2]">
      <div className="text-center px-6">
        <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
          Page Not Found
        </p>
        <h1 className="text-[80px] lg:text-[120px] font-cormorant font-light text-[#1A1714] leading-none mb-6">
          404
        </h1>
        <p className="text-[18px] font-inter text-[#8a8580] font-light mb-10">
          The page you are looking for does not exist
        </p>
        <a
          href="/"
          className="inline-block px-10 py-4 bg-[#0f172a] text-white text-[13px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#c5a059] transition-colors duration-300"
        >
          Back to Villa
        </a>
      </div>
    </div>
  );
};

export default NotFound;
