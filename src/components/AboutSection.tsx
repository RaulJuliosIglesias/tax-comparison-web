'use client';

import { DEVELOPER_INFO } from '@/data/countries';

export default function AboutSection() {
    const { name, role, bio, motivation, social } = DEVELOPER_INFO;

    return (
        <section id="about" className="about-section glass-panel">
            <div className="about-header">
                <h2 className="about-title">
                    <span>👤</span>
                    Sobre el Desarrollador
                </h2>
            </div>

            <div className="about-content">
                <div className="about-profile">
                    <div className="about-avatar">👨‍💻</div>
                    <div className="about-info">
                        <h3 className="about-name">{name}</h3>
                        <p className="about-role">{role}</p>
                    </div>
                </div>

                <div className="about-bio">
                    <h4 className="about-section-title">¿Por qué hago esto?</h4>
                    <p className="about-text">{bio}</p>
                </div>

                <div className="about-motivation">
                    <h4 className="about-section-title">Motivación</h4>
                    <p className="about-text">{motivation}</p>
                </div>

                <div className="about-social">
                    <h4 className="about-section-title">Conecta conmigo</h4>
                    <div className="about-social-links">
                        {social.github && (
                            <a
                                href={social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-social-link github"
                            >
                                <span className="social-icon">⌨</span>
                                <span>GitHub</span>
                            </a>
                        )}
                        {social.linkedin && (
                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-social-link linkedin"
                            >
                                <span className="social-icon">in</span>
                                <span>LinkedIn</span>
                            </a>
                        )}
                        {social.linktree && (
                            <a
                                href={social.linktree}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-social-link linktree"
                            >
                                <span className="social-icon">🌲</span>
                                <span>Linktree</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="about-disclaimer">
                <strong>Disclaimer:</strong> Este proyecto es solo informativo y no constituye asesoramiento fiscal, legal o financiero.
                Consulta siempre con profesionales cualificados para decisiones importantes.
            </div>
        </section>
    );
}
