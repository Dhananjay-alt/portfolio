import { codeToHtml, createCssVariablesTheme } from "shiki";

/**
 * Code is coloured from the site's own palette rather than an editor theme:
 * Shiki emits `var(--shiki-*)` references and globals.css maps those to ink,
 * grey and the single accent. That keeps snippets in step with both themes
 * and inside AA contrast.
 */
export const codeTheme = createCssVariablesTheme({
  name: "site",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

export function highlight(source: string, language: string): Promise<string> {
  return codeToHtml(source, { lang: language, theme: codeTheme });
}
