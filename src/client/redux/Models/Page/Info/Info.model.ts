export interface Info {
    type: string;
    id: string;
    seo: {
        seoTitle: string;
        seoDescription: string;
    }
    title: string;
    titlekey? : string;
    description: string;
    url: {
        [key: string]: string;
    }
}