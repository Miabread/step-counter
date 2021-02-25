const shops: Record<string, number | undefined> = {
    'N/A': 0,
    'Test Shop Alpha': 1,
    'Test Shop Bravo': 2,
};

export const getShop = (shop = ''): number => shops[shop] ?? -1;
