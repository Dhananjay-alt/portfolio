import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // React-Compiler-era rules that flag intentional patterns here:
      // - set-state-in-effect: SSR mount-guards and client-only initialization
      //   (e.g. randomizing after hydration to avoid a mismatch).
      // - purity: decorative randomness (the hero starfield / particle field).
      // Kept as warnings so they stay visible without failing lint.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
]);

export default eslintConfig;
