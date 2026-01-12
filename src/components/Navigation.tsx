'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Inicio', href: '#top', icon: '🏠' },
    { label: 'Calculadora', href: '#calculator', icon: '💰' },
    { label: 'Gasto Público', href: '#spending', icon: '📊' },
    { label: 'Demografía', href: '#demographics', icon: '👥' },
    { label: 'Proyecciones 2050', href: '#projections', icon: '🔮' },
    { label: 'Fuentes', href: '#sources', icon: '📚' },
    { label: 'Sobre Mí', href: '#about', icon: '👤' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="nav-desktop">
                <div className="nav-logo">
                    <span className="nav-logo-icon">📊</span>
                    <span className="nav-logo-text">Economía Comparada</span>
                </div>
                <div className="nav-links">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="nav-link-icon">{item.icon}</span>
                            <span className="nav-link-label">{item.label}</span>
                        </a>
                    ))}
                </div>
            </nav>

            {/* Mobile Navigation Toggle */}
            <button
                className="nav-mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                <span className={`nav-hamburger ${isOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="nav-mobile-menu"
                    >
                        <div className="nav-mobile-header">
                            <span className="nav-logo-icon">📊</span>
                            <span className="nav-logo-text">Menú</span>
                        </div>
                        {NAV_ITEMS.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="nav-mobile-link"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="nav-mobile-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="nav-overlay"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
