module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "react-hooks", "prettier", "css-modules"],
  extends: ["prettier", "prettier/@typescript-eslint", "prettier/react"],
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": 0,
    "react/jsx-sort-props": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "arrow-parens": 0,
    camelcase: 0,
    "no-console": 0,
    "no-multiple-empty-lines": "error",
    "no-plusplus": 0,
    "no-use-before-define": 0,
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: "error",
    radix: 0,
    "react/jsx-sort-props": "error",
    "react/prop-types": 0,
    "import/extensions": "off",
    "import/no-cycle": [0, { ignoreExternal: true }],
    "import/order": 0,
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["all", "multiple", "single", "none"]
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: [
          "var",
          "let",
          "const",
          "switch",
          "class",
          "block-like",
          "block",
          "import",
          "export",
          "function",
          "iife"
        ],
        next: "*"
      },
      {
        blankLine: "any",
        prev: "export",
        next: "export"
      },
      {
        blankLine: "any",
        prev: ["var", "let", "const"],
        next: ["var", "let", "const"]
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["break", "return", "continue", "throw"]
      },
      {
        blankLine: "never",
        prev: "import",
        next: "import"
      }
    ],
    "space-before-function-paren": "off"
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"]
  }
};
