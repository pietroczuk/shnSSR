import { FC, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './category.scss';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getPage } from '../../redux/actions/actionCreators';
import { pageActions } from '../../redux/slices/pageSlice/pageSlice';
import { publicConfigActions } from '../../redux/slices/publicConfigSlice/publicConfigSlice';
import {
    pageTypes, metatags, prepareSearchCode,
    renderHtmlFromJson,
    scrollToTop
} from '../../utils/utilsFrondend';

import Placeholder from '../../components/placeholder/Placeholder';
import ContentCointainer from '../../components/contentCointainer/ContentCointainer';
import StickySidebar from '../../components/contentCointainer/stickySidebar/StickySidebar';
import MainContent from '../../components/contentCointainer/mainContent/MainContent';
import LeftMenuLinks from '../../components/leftMenuLinks/LeftMenuLinks';
import FixedBar from '../../components/fixedbar/FixedBar';
import ImageSwicher from '../../components/helpers/ui/imageSwicher/ImageSwicher';
import RandomColorSwicher from '../../components/helpers/ui/randomColorSwicher/RandomColorSwicher';

import LoadingSpinner from '../../components/helpers/ui/loadingSpinner/LoadingSpinner';
import ShowTitleWithBadge from '../../components/helpers/ui/showTitleWithBadge/ShowTitleWithBadge';

import AllFeaturesDisplay from '../../components/helpers/product/features/AllFeaturesDisplay';
import { ClientAppDispatch, RootState } from '../../client';
import { RouteComponentProps } from 'react-router-dom';
import ProductsGrid from '../../components/productsGrid/ProductsGrid';

interface CategoryProps {
    url: string;
    lang: string;
}

const Category: FC<RouteComponentProps<CategoryProps>> = props => {
    // from redux
    const {
        seo,
        ssr,
        category,
        api,
        url_prefix,
        category_products,
        language,
    } = useSelector(
        (state : RootState) => ({
            seo: state.PublicConfig.config.seo,
            ssr: state.PublicConfig.ssr,
            category: state.Page.data,
            url_prefix: state.SystemConfig.urls[pageTypes.categoryPage],
            api: state.SystemConfig.api,
            category_products: state.SystemConfig.placeholder.category_products,
            language: state.User.language,
        })
        , shallowEqual
    )
    const dispatch = useDispatch<ClientAppDispatch>();
    // seo
    const seo_title = category ? category.seo_title : null;
    const seo_description = category ? category.seo_description : null;
    // from props
    const { url } = props.match.params;
    const { location } = props;
    // multirow
    const multirow = true;
    const title = category ? category.title : undefined;

    useEffect(() => {
        const axiosAbortController = new AbortController();
        console.log('category ssr:', ssr);
        !ssr && dispatch(getPage(api, pageTypes.categoryPage, language, url, prepareSearchCode(location.search), axiosAbortController));
        scrollToTop(window);
        return () => {
            axiosAbortController.abort();
            dispatch(pageActions.clearPageData());
            // return dispatch(pageActions.clearPageData());
        }
    }, [location.pathname]);

    useEffect(() => {
        ssr && dispatch(publicConfigActions.disableSrr());
    }, [])

    return (
        <ContentCointainer miltirow={multirow}>
            {console.log('category render')}
            {metatags(seo_title, seo_description, seo, url, language, url_prefix)}
            {
                multirow && <StickySidebar location={location}>
                    <LeftMenuLinks location={location} />
                </StickySidebar>
            }
            <MainContent>
                <ShowTitleWithBadge title={title} customWidth={20} />
                <div>
                    <FixedBar>
                        <ImageSwicher />
                        <RandomColorSwicher />
                        <AllFeaturesDisplay
                            // currentVariationCode={default_variant_code}
                            allProductVariation={null}
                            wishlistAvaible={true}
                            displayInline={true}
                            globalChange={true}
                        />
                    </FixedBar>
                    <ProductsGrid category={category} category_products={category_products}/>
                    <div className={styles.categroryLoadMore}><LoadingSpinner customContenerHeight={'100%'} customSpinerSizeEm={2} /></div>
                    {category ? <div className={styles.categoryDescription} >{renderHtmlFromJson(category.description)}</div> : <div><Placeholder /></div>}
                </div>
            </MainContent>
            {/* <StickySidebar>dupa</StickySidebar> */}
        </ContentCointainer>
    )
}

export default withStyles(styles)(Category);