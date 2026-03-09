export const IconLogo = () => {
  return (
    <>
      <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
      <span className="text-xl font-bold tracking-tight text-logo-text">
        MIN<span className="text-blue-500">LOG</span>
      </span>
    </>
  );
};

export const Moon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="yellow"
      className="drop-shadow-[0_0_8px_rgba(255,255,0,0.5)]"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
};

export const Sun = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="#FF8C00"
      stroke="#FF8C00"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_5px_rgba(255,140,0,0.4)]"
    >
      <circle cx="12" cy="12" r="4" fill="#FF8C00" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
  );
};
