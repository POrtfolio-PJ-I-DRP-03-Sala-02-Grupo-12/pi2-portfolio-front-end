const BottomNav = () => {
  const navItems = [
    { label: "About", url: "https://www.gabisou.com/#about" },
    { label: "Projects", url: "https://www.gabisou.com/#projects" },
    { label: "Contact", url: "https://www.gabisou.com/#contact" },
  ];

  return (
    <div className="w-full bg-[rgba(42,42,42,0.7)] h-16 fixed bottom-0 z-50 text-white">
      <div className="relative flex items-center h-full px-4 sm:px-8">
        {/* Left-aligned logo (acts as Home shortcut) */}
        <div className="absolute left-4 h-full flex items-center">
          <a
            href="https://www.gabisou.com/"
            className="h-full p-2 flex items-center justify-center"
          >
            <img
              //src="../assets/img/gabisoulogo.png"
              src="https://raw.githubusercontent.com/JessicaSaito/images-test-portfolio/refs/heads/master/gabisoulogo.png"
              alt="Company logo GABISOU on a dark gray background with white letters"
              className="max-w-[60px] sm:max-w-[120px] h-auto"
            />
          </a>
        </div>

        {/* Right-aligned nav items */}
        <div className="absolute right-4 flex space-x-4 sm:space-x-8 h-full">
          {navItems.map((item) => (
            <a
              key={item.url}
              href={item.url}
              className="h-full px-3 sm:px-6 flex items-center justify-center text-sm sm:text-base md:text-lg transition hover:bg-white hover:text-[color:var(--color-gabisou-primary)] cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
