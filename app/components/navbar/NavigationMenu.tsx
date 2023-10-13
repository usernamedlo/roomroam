const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "Find a property", href: "#", current: false },
    { name: "Share Stories", href: "#", current: false },
    { name: "Rental Guides", href: "#", current: false },
    { name: "Download Mobile App", href: "#", current: false },
];

function classNames(...classes : any) : string {
    return classes.filter(Boolean).join(" ");
  }

const NavigationMenu = () => {
    return (
        <div className="hidden md:flex md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current
                            ? "text-black"
                            : "text-gray-300 hover:text-black",
                        "rounded-md text-sm md:text-lg font-semibold px-2 py-1 md:px-4 md:py-2"
                    )}
                    aria-current={item.current ? "page" : undefined}
                >
                    {item.name}
                </a>
            ))}
        </div>
    )
};

export default NavigationMenu;
