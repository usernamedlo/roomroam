import { useState } from 'react';
import { useRouter } from 'next/navigation';

const navigation = [
    { name: "Home", href: "/" },
    { name: "Find a property", href: "#" },
    { name: "Share Stories", href: "#" },
    { name: "Rental Guides", href: "#" },
    { name: "Download Mobile App", href: "#" },
];

function classNames(...classes: any): string {
    return classes.filter(Boolean).join(" ");
}

const NavigationMenu = () => {

    const router = useRouter();

    const [currentHref, setCurrentHref] = useState(navigation[0].href);

    const handleNavigationClick = (href: string) => {
        setCurrentHref(href);
        router.push(href);
    };

    return (
        <div className="hidden lg:flex lg:justify-around md:flex-row md:space-x-2">
            {navigation.map((item) => (
                <a
                    onClick={() => handleNavigationClick(item.href)}
                    key={item.name}
                    className={classNames(
                        item.href === currentHref
                            ? "text-pyellow"
                            : "text-gray-400 hover:text-black",
                        "text-sm md:text-lg font-medium px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                    )}
                    aria-current={item.href === currentHref ? "page" : undefined}
                >
                    {item.name}
                </a>
            ))}
        </div>
    );
};

export default NavigationMenu;
