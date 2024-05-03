'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import cssClasses from '@/components/main-header/nav-link.module.css';

export default function NavLink({href, children}) {
    const path = usePathname();
    return <Link 
    href={href} 
    className={path.startsWith(href) ? `${cssClasses.link} ${cssClasses.active}` : cssClasses.link}>
    {children}
    </Link>
}