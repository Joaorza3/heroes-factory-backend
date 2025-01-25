export interface IHeroesFilters {
    name?: string;
    universe?: string;
    isActive?: boolean;
    skip: number;
    cursor?: string
}