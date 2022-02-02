export interface Info {
    type: string;
    id: string;
    seo_title: string;
    seo_description: string;
    title: string;
    description: string;
    url: {
        [key: string]: string;
    }
}