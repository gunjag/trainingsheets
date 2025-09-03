import { Content } from "./content";

export interface ToC {
    title: string,
    basePath: string,
    contents: Array<Content>
}