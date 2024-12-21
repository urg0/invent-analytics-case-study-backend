module.exports = {
  root: true, // Mark this as the root configuration
  parser: "@typescript-eslint/parser", // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020, // Enable parsing of modern ECMAScript features
    sourceType: "module", // Allow imports using ES Modules
    project: "./tsconfig.json", // Type-aware linting (link ESLint to your tsconfig.json)
  },
  env: {
    browser: true, // Enable browser global variables like `window`
    node: true, // Enable Node.js global variables like `process`
    es2021: true, // Enable ES2021 features
  },
  extends: [
    "airbnb", // Airbnb base rules
    "airbnb-typescript", // Airbnb rules adapted for TypeScript
    "plugin:@typescript-eslint/recommended", // TypeScript-specific recommended rules
    "plugin:import/recommended", // Import plugin rules
    "plugin:import/typescript", // TypeScript support for import plugin
    "plugin:prettier/recommended", // Integrates Prettier with ESLint
  ],
  plugins: [
    "@typescript-eslint", // TypeScript linting rules
    "import", // Enforces best practices for imports
    "jsx-a11y", // Accessibility checks (for React projects)
    "react", // React-specific linting rules (if applicable)
    "react-hooks", // React hooks-specific linting rules
  ],
  rules: {
    // Airbnb Base Customizations
    "linebreak-style": ["error", "unix"], // Enforce UNIX linebreaks
    "no-console": "warn", // Warn when using console statements
    "import/prefer-default-export": "off", // Allow single named exports
    "import/extensions": [
      "error",
      "ignorePackages",
      { ts: "never", tsx: "never", js: "never", jsx: "never" },
    ],

    // TypeScript-Specific Rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused vars prefixed with _
    "@typescript-eslint/explicit-function-return-type": "off", // Don't require explicit return types
    "@typescript-eslint/consistent-type-imports": "error", // Enforce consistent type imports

    // React-Specific Rules (Optional)
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "react/prop-types": "off", // Disable prop-types validation (using TypeScript)
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // Always try to resolve types
      },
    },
  },
};
