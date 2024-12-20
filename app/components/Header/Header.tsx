'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
    usePathname,
    useRouter
} from 'next/navigation';

import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import {
    AccountBoxOutlined, ArchiveOutlined, Close, DeleteOutlined, LoginOutlined,
    LogoutOutlined, MenuOpen, Refresh, Search,
    Archive, Delete,
    HelpCenter,
    HelpCenterOutlined,
    Lightbulb,
    LightbulbOutlined,
    AccountCircle,
    // Settings,
    // SettingsOutlined
} from '@mui/icons-material';

import { useAppContext } from '../../providers/AppProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import styles from "./Header.module.css";
import { StyledIconButton } from '../Styled';

export default function Header() {
    const { isAuthLoading, logOut, user } = useAuthContext();
    const {
        searchTerm,
        handleSearch,
        handleCloseSearch,
        isAppLoading,
        fetchData,
    } = useAppContext();

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    // const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const accountMenuRef = useRef<HTMLDivElement>(null);
    const accountButtonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLDivElement>(null);
    const navButtonRef = useRef<HTMLButtonElement>(null);
    const settingsMenuRef = useRef<HTMLDivElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCloseButton = () => {
        router.push('/');
        handleCloseSearch();
        window.scrollTo({ top: 0 });
    };

    const handleSearchButton = () => {
        router.push('/search');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        router.push('/search');
        handleSearch(event.target.value);
    };

    const handleOnFocus = () => {
        router.push('/search');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleLogOut = async () => {
        try {
            await logOut();
            setIsAccountMenuOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getTitle = () => {
        switch (pathname) {
            case '/':
                return 'PaperTake.io';
            case '/archive':
                return 'Archive';
            case '/help':
                return 'Help';
            case '/search':
                return 'Ideas';
            case '/trash':
                return 'Trash';
            default:
                return 'PaperTake.io';
        };
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
                if (!navButtonRef.current?.contains(event.target as Node)) {
                    setIsNavMenuOpen(false);
                }
            };
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                if (!accountButtonRef.current?.contains(event.target as Node)) {
                    setIsAccountMenuOpen(false);
                }
            };
            // if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
            //     if (!settingsButtonRef.current?.contains(event.target as Node)) {
            //         setIsSettingsMenuOpen(false);
            //     }
            // };
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [accountButtonRef, accountMenuRef, navButtonRef, navMenuRef, settingsButtonRef, settingsMenuRef]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (searchTerm) {
            url.searchParams.set('term', searchTerm);
        } else {
            url.searchParams.delete('term');
        }
        window.history.replaceState({}, '', url);
    }, [searchTerm]);

    if (pathname === '/login') {
        return (
            null
        );
    }
    return (
        <Suspense>
            <header className={isScrolled ? styles.headerScrolled : styles.header}>
                <div className={styles.headerLeading}>
                    <div className={styles.navAnchor}>
                        <StyledIconButton ref={navButtonRef}
                            disableTouchRipple={true}
                            onClick={() => setIsNavMenuOpen(prev => !prev)}>
                            {isNavMenuOpen ? <Close /> : <MenuOpen />}
                        </StyledIconButton>
                        {isNavMenuOpen && (
                            <nav className={styles.menu} ref={navMenuRef}>
                                <Link className={pathname === '/' ? styles.navLinkActive : styles.navLink} href='/'>
                                    {pathname === '/' ? <Lightbulb /> : <LightbulbOutlined />} Ideas
                                </Link>
                                <Link className={pathname === '/archive' ? styles.navLinkActive : styles.navLink} href='/archive'>
                                    {pathname === '/archive' ? <Archive /> : <ArchiveOutlined />} Archive
                                </Link>
                                <Link className={pathname === '/trash' ? styles.navLinkActive : styles.navLink} href='/trash'>
                                    {pathname === '/trash' ? <Delete /> : <DeleteOutlined />} Trash
                                </Link>
                                <Link className={pathname === '/help' ? styles.navLinkActive : styles.navLink} href='/help'>
                                    {pathname === '/help' ? <HelpCenter /> : <HelpCenterOutlined />} Help
                                </Link>
                            </nav>
                        )}
                    </div>
                    <div className={styles.headerTitleLeading}>
                        <p>{getTitle()}</p>
                    </div>
                    <div className={styles.searchInputContainer}>
                        <StyledIconButton disableTouchRipple={true} onClick={handleSearchButton}>
                            <Search />
                        </StyledIconButton>
                        <input
                            autoComplete="off"
                            className={styles.searchInput}
                            id='headerInput'
                            type="text"
                            placeholder='Search...'
                            onFocus={handleOnFocus}
                            value={searchTerm}
                            onChange={(event) => handleOnChange(event)}
                            ref={inputRef}
                        />
                        {(pathname === '/search') && (
                            <StyledIconButton
                                disableTouchRipple={true}
                                onClick={handleCloseButton}>
                                <Close />
                            </StyledIconButton>
                        )}
                    </div>
                </div>
                <div className={styles.headerTrailing}>
                    {
                        !user && (
                            <div className={styles.headerTitleTrailing}>
                                <p>Guest Mode</p>
                            </div>
                        )
                    }
                    {
                        (isAppLoading || isAuthLoading) ? (
                            <StyledIconButton disableTouchRipple={true}>
                                <CircularProgress size={20} />
                            </StyledIconButton>
                        ) : (
                            <StyledIconButton
                                disableTouchRipple={true}
                                onClick={fetchData}>
                                <Refresh />
                            </StyledIconButton>
                        )
                    }
                    <div className={styles.accountAnchor}>
                        <StyledIconButton ref={accountButtonRef}
                            disableTouchRipple={true}
                            onClick={() => setIsAccountMenuOpen(prev => !prev)}>
                            {isAccountMenuOpen ? <AccountCircle /> : <AccountCircle />}
                        </StyledIconButton>
                        {isAccountMenuOpen && (
                            <nav className={styles.menu} ref={accountMenuRef}>
                                {user && (
                                    <Link className={styles.navLink}
                                        href='/account'
                                        onClick={() => setIsAccountMenuOpen(false)}>
                                        <AccountBoxOutlined /> Account
                                    </Link>
                                )}
                                {user ? (
                                    <Link className={styles.navLink} href='/' onClick={handleLogOut}>
                                        <LogoutOutlined /> Log Out
                                    </Link>
                                ) : (
                                    <Link className={styles.navLink}
                                        href='/login'
                                        onClick={() => setIsAccountMenuOpen(false)}>
                                        <LoginOutlined /> Log In
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        </Suspense>
    );
}