export interface MenuItem {
    label: string;
    url?: string;
    image?: number;
    type?: string;
    color?: string;
    columns?: number;
    items?: MenuItem[]
}