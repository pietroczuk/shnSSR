import React, { useEffect, useState } from 'react';
import styles from './languageSwitcher.modules.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';

const LanguageSwitcher = (props) => {
    const [searchParams, setSearchParams] = useState('');
    const { all_config_languages, page } = props;
    const { search } = useLocation();

    const page_ulrs = page.type == 'product' ? page.product.product_url : null;

    useEffect(() => {
        setSearchParams(search);
    }, [search]);
    return <div>
        <ul>
            {page_ulrs && Object.entries(all_config_languages).map(([lang_key, lang_val]) => <li key={lang_key}><a href={'/' + lang_val.code + '/p/' + page_ulrs[lang_val.code] + searchParams}>{lang_val.label}</a></li>)}
        </ul>
    </div>
}

const mapStateToProps = state => ({
    all_config_languages: state.config.language,
    page: state.page
});
export default
    connect(mapStateToProps, {})
        (withStyles(styles)(LanguageSwitcher))
