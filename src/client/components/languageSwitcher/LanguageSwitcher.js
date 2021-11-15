import React, { useEffect, useState } from 'react';
import styles from './languageSwitcher.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { pageTypes } from '../../utils/utilsFrondend';

import GlobeIcon from '../svg/icons/GlobeIcon';

import loadable from '@loadable/component';
import { ErrorBoundary } from '../Error/ErrorBoundary';
import LoadingSpinner from '../ui/loadingSpinner/LoadingSpinner';

const PL = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/PL'), {});
const EN = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/EN'), {});
const DE = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/DE'), {});
const AR = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/AR'), {});
const ES = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/ES'), {});
const FR = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/FR'), {});
const IT = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/IT'), {});
const KO = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/KO'), {});
const NL = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/NL'), {});
const PT = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/PT'), {});
const BR = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/BR'), {});
const RU = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/RU'), {});
const TR = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/TR'), {});
const ZH = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/ZH'), {});
const JA = loadable(() => import(/* webpackPrefetch: true */ '../svg/flags/JA'), {});

const LanguageSwitcher = (props) => {
    const [searchParams, setSearchParams] = useState('');
    const { search } = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const openSubmenuHandler = () => {
        setOpenSubmenu(true);
    }
    const closeSubmenuHandler = () => {
        setOpenSubmenu(false);
    }

    const { all_config_languages, urls, page, user_language } = useSelector(state => ({
        all_config_languages: state.SystemConfig.language,
        urls: state.SystemConfig.urls,
        page: state.Page,
        user_language: state.User.language
    }));
    const page_ulrs = page.data ? page.data.url : null;
    const page_type = page && page.data && page.data.type ? page.data.type : null;

    useEffect(() => {
        setSearchParams(search);
    }, [search]);

    const showLanguageFlag = (language) => {
        switch (language) {
            case 'pl': return <PL />;
            case 'en': return <EN />;
            case 'de': return <DE />;
            case 'ar': return <AR />;
            case 'es': return <ES />;
            case 'fr': return <FR />;
            case 'it': return <IT />;
            case 'ko': return <KO />;
            case 'nl': return <NL />;
            case 'pt': return <PT />;
            case 'br': return <BR />;
            case 'ru': return <RU />;
            case 'tr': return <TR />;
            case 'zh': return <ZH />;
            case 'ja': return <JA />;
            default: return '';
        }
    }
    return <div className={styles.switcher}
        onMouseOver={openSubmenuHandler}
        onMouseLeave={closeSubmenuHandler}
    >
        <GlobeIcon />
        <span className={styles.chosenLabel}>{user_language}</span>
        {openSubmenu && page_ulrs && <div className={styles.submenu}>
            <ul className={styles.list}>
                {page_ulrs && Object.entries(all_config_languages).map(
                    ([lang_key, lang_val]) => {
                        let languageLink = '/' + lang_val.code;
                        page_type !== pageTypes.specialPage ? languageLink += ('/' + urls[page.type]) : null;
                        languageLink += '/' + page_ulrs[lang_val.code] + searchParams;
                        return (
                            <li
                                key={lang_key}
                                className={`${(lang_val.code === user_language ? styles.active : '')}`}
                            >
                                <a href={languageLink}>
                                    <div className={styles.flagContainer} >
                                        <ErrorBoundary
                                            errorComponent={
                                                <LoadingSpinner
                                                    customSpinerSizeEm={1}
                                                    customBorderHeight={1}
                                                />
                                            }
                                        >
                                            {showLanguageFlag(lang_val.flag_image)}
                                        </ErrorBoundary>
                                    </div>
                                    <span>{lang_val.label}</span>
                                </a>
                            </li>
                        )
                    }
                )
                }
            </ul>
        </div>
        }
    </div>
}

export default withStyles(styles)(LanguageSwitcher);
