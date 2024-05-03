import Link from "next/link";
import cssClasses from "@/components/main-header/main-header.module.css";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import MainHeaderBackground from "./main-header-backgrounnd";
import NavLink from "./nav-link";

export default function MainHeader() {
    return <>
        <MainHeaderBackground />
        <header className={cssClasses.header}>
            <Link className={cssClasses.logo} href="/">
                <Image src={logoImg.src} width={500} height={500} alt="Next js food app" />
                NextJS Food App
            </Link>
            <nav className={cssClasses.nav}>
                <ul>
                    <li><NavLink href="/meals">Meals</NavLink></li>
                    <li><NavLink href="/community">Community</NavLink></li>
                </ul>
            </nav>
        </header>
    </>
}