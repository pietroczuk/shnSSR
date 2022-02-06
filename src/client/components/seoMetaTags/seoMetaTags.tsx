import React from "react";
import { Helmet } from "react-helmet";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../client";

interface SeoMetaTagsProps {
    url: string;
    language: string;
    pageType: string;
}

const SeoMetaTags: React.FC<SeoMetaTagsProps> = props => {
    const { url, language, pageType } = props;

    const { seo, urlPrefix, pageTitle, pageDescription } = useSelector((state: RootState) => ({
        seo: state.PublicConfig.config.seo,
        urlPrefix: state.SystemConfig.pageTypePrefixUrls[pageType],
        pageTitle : state.Page.info.seo ? state.Page.info.seo.seoTitle : null,
        pageDescription: state.Page.info.seo ? state.Page.info.seo.seoDescription: null
    }), shallowEqual);

    const title = pageTitle ? pageTitle : seo.title;
    const description = pageDescription ? pageDescription : seo.description;
    const { og } = seo;
    const prefix = urlPrefix ? urlPrefix + '/' : '';
    const ogUlr = og ? og.url + '/' : '';
    const link = ogUlr + language + '/' + prefix + url;

    return (
        <Helmet
            title={title}
            link={
                [
                    { rel: 'canonical', href: link }
                ]}
            meta={
                [
                    {
                        name: 'description',
                        content: description,
                    },
                    {
                        name: 'og:title',
                        content: title,
                    },
                    {
                        name: 'og:description',
                        content: description,
                    },
                    {
                        name: 'og:type',
                        content: og ? og.type : '',
                    },
                    {
                        name: 'og:image',
                        content: og ? og.image : '',
                    },
                    {
                        name: 'og:url',
                        content: og ? og.url : '',
                    },
                    {
                        name: 'og:site_name',
                        content: og ? og.siteName : ''
                    },
                ]}
        />
    );
}

export default SeoMetaTags;