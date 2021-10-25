import React, { useEffect, useState } from 'react';
import styles from './languageSwitcher.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import GlobeIcon from '../InteractiveIcon/icons/GlobeIcon'

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

    useEffect(() => {
        setSearchParams(search);
    }, [search]);
    return <div className={styles.switcher}
        onMouseOver={openSubmenuHandler}
        onMouseLeave={closeSubmenuHandler}>
        <GlobeIcon /> 
        <span>{user_language}</span>
        {openSubmenu && <div className={styles.submenu}>
            <ul className={styles.list}>
                {page_ulrs && Object.entries(all_config_languages).map(([lang_key, lang_val]) => <li key={lang_key} className={`${(lang_val.code === user_language ? styles.active : '')}`}><a href={'/' + lang_val.code + '/' + urls[page.type] + '/' + page_ulrs[lang_val.code] + searchParams}>{lang_val.label}</a></li>)}
            </ul>
        </div>
        }
    </div>
}

export default withStyles(styles)(LanguageSwitcher);
