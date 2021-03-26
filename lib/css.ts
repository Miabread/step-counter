export const createStyle = (styles: Record<string, string>) => (
    ...names: string[]
) => names.map((it) => styles[it]).join(' ');
