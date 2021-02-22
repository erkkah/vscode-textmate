import { IRawTheme } from './main';
export declare const enum FontStyle {
    NotSet = -1,
    None = 0,
    Italic = 1,
    Bold = 2,
    Underline = 4
}
export declare class ParsedThemeRule {
    _parsedThemeRuleBrand: void;
    readonly scope: string;
    readonly parentScopes: string[] | null;
    readonly index: number;
    /**
     * -1 if not set. An or mask of `FontStyle` otherwise.
     */
    readonly fontStyle: number;
    readonly foreground: string | null;
    readonly background: string | null;
    constructor(scope: string, parentScopes: string[] | null, index: number, fontStyle: number, foreground: string | null, background: string | null);
}
/**
 * Parse a raw theme into rules.
 */
export declare function parseTheme(source: IRawTheme | undefined): ParsedThemeRule[];
export declare class ColorMap {
    private readonly _isFrozen;
    private _lastColorId;
    private _id2color;
    private _color2id;
    constructor(_colorMap?: string[]);
    getId(color: string | null): number;
    getColorMap(): string[];
}
export declare class Theme {
    static createFromRawTheme(source: IRawTheme | undefined, colorMap?: string[]): Theme;
    static createFromParsedTheme(source: ParsedThemeRule[], colorMap?: string[]): Theme;
    private readonly _colorMap;
    private readonly _root;
    private readonly _defaults;
    private readonly _cache;
    constructor(colorMap: ColorMap, defaults: ThemeTrieElementRule, root: ThemeTrieElement);
    getColorMap(): string[];
    getDefaults(): ThemeTrieElementRule;
    match(scopeName: string): ThemeTrieElementRule[];
}
export declare function strcmp(a: string, b: string): number;
export declare function strArrCmp(a: string[] | null, b: string[] | null): number;
export declare class ThemeTrieElementRule {
    _themeTrieElementRuleBrand: void;
    scopeDepth: number;
    parentScopes: string[] | null;
    fontStyle: number;
    foreground: number;
    background: number;
    constructor(scopeDepth: number, parentScopes: string[] | null, fontStyle: number, foreground: number, background: number);
    clone(): ThemeTrieElementRule;
    static cloneArr(arr: ThemeTrieElementRule[]): ThemeTrieElementRule[];
    acceptOverwrite(scopeDepth: number, fontStyle: number, foreground: number, background: number): void;
}
export interface ITrieChildrenMap {
    [segment: string]: ThemeTrieElement;
}
export declare class ThemeTrieElement {
    _themeTrieElementBrand: void;
    private readonly _mainRule;
    private readonly _rulesWithParentScopes;
    private readonly _children;
    constructor(mainRule: ThemeTrieElementRule, rulesWithParentScopes?: ThemeTrieElementRule[], children?: ITrieChildrenMap);
    private static _sortBySpecificity;
    private static _cmpBySpecificity;
    match(scope: string): ThemeTrieElementRule[];
    insert(scopeDepth: number, scope: string, parentScopes: string[] | null, fontStyle: number, foreground: number, background: number): void;
    private _doInsertHere;
}
