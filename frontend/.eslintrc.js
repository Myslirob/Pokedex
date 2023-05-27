module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    globals: {
        React: 'writable',
    },
    overrides: [
        {
            env: { node: true },
            files: [ 'next.config.js' ],
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'sort-keys-fix',
        '@typescript-eslint',
        'import',
        'import-quotes',
        'unused-imports',
    ],
    root: true,
    rules: {
        '@typescript-eslint/ban-ts-comment': [ 'error', {
            'ts-expect-error': false,
        } ],
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/comma-dangle': [ 'error', 'always-multiline' ],

        '@typescript-eslint/comma-spacing': [ 'error' ],

        '@typescript-eslint/consistent-type-assertions': 'off',

        '@typescript-eslint/consistent-type-imports': [ 'error' ],

        '@typescript-eslint/explicit-function-return-type': 'off',

        '@typescript-eslint/explicit-member-accessibility': [ 'error', {
            accessibility: 'off',
            overrides: {
                accessors: 'explicit',
                constructors: 'explicit',
                parameterProperties: 'explicit',
            },
        } ],

        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/func-call-spacing': 'error',

        '@typescript-eslint/indent': [ 'error', 4, {
            ArrayExpression: 1,
            CallExpression: {
                arguments: 1,
            },
            FunctionDeclaration: {
                body: 1,
                parameters: 1,
            },
            FunctionExpression: {
                body: 1,
                parameters: 1,
            },
            ImportDeclaration: 1,
            ObjectExpression: 1,
            SwitchCase: 1,
            VariableDeclarator: 1,
            flatTernaryExpressions: false,
            outerIIFEBody: 1,
        } ],

        '@typescript-eslint/interface-name-prefix': 'off',

        '@typescript-eslint/keyword-spacing': 'error',

        '@typescript-eslint/member-delimiter-style': 'error',

        '@typescript-eslint/naming-convention': [ 'error', {
            filter: {
                match: true,
                regex: '^.*Schema$',
            },
            format: ['PascalCase' ],
            selector: 'variable',
        }],

        '@typescript-eslint/no-empty-function': 'off',

        '@typescript-eslint/no-empty-interface': 'off',

        '@typescript-eslint/no-explicit-any': 'off',

        '@typescript-eslint/no-implicit-any-catch': 'error',

        '@typescript-eslint/no-this-alias': 'error',

        '@typescript-eslint/no-unused-vars': 'error',

        '@typescript-eslint/no-use-before-define': 'off',

        '@typescript-eslint/no-var-requires': 'off',

        '@typescript-eslint/prefer-ts-expect-error': 'error',

        '@typescript-eslint/semi': 'error',

        '@typescript-eslint/space-before-function-paren': [ 'error', {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'never',
        } ],

        '@typescript-eslint/space-infix-ops': 'error',

        '@typescript-eslint/type-annotation-spacing': 'error',

        'arrow-parens': [ 'error', 'always' ],

        'arrow-spacing': 'error',

        'block-spacing': 'error',

        'brace-style': 'error',

        'comma-dangle': 'off',

        'comma-spacing': 'off',

        'computed-property-spacing': 'error',

        curly: ['error', 'multi-line'],

        'dot-notation': 'error',

        'eol-last': 'error',

        eqeqeq: 'error',

        'import-quotes/import-quotes': [ 'error', 'single' ],

        'import/first': 'error',

        'import/no-cycle': 'warn',

        'import/no-duplicates': ['error', { considerQueryString: true }],

        'import/no-extraneous-dependencies': 'error',

        'import/no-useless-path-segments': 'error',

        'import/order': [ 'error', {
            groups: [ 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type' ],
            'newlines-between': 'always',
        } ],

        indent: 'off',

        'jsx-quotes': [ 'error', 'prefer-double' ],

        'key-spacing': 'error',

        'keyword-spacing': 'off',

        'max-statements-per-line': [ 'error', { max: 2 } ],

        'no-console': 'error',

        'no-else-return': ['error', { allowElseIf: false } ],

        'no-empty': 'error',

        'no-ex-assign': 'off',

        'no-multi-spaces': 'error',

        'no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 0, maxEOF: 1 } ],

        'no-prototype-builtins': 'off',

        'no-restricted-globals': [ 'error', 'console' ],

        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    '@material-ui/*',
                    '@material-ui/*/*',
                    '@material-ui/*/*/*',
                    '!@material-ui/core',
                    '!@material-ui/core/colors',
                    '!@material-ui/core/styles',
                    '!@material-ui/lab',
                    '!@material-ui/pickers',
                    '!@material-ui/pickers/**',
                    '!@material-ui/pickers/constants/prop-types',
                    '!@material-ui/icons',
                ],
            },
        ],

        'no-trailing-spaces': 'error',

        'no-undef': 'off',

        'no-unused-vars': 'off',

        'no-var': 'error',

        'object-curly-spacing': [ 'error', 'always' ],

        'object-shorthand': ['error', 'always'],

        'one-var': [ 'error', 'never' ],

        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', next: '*', prev: 'import' },
            { blankLine: 'any', next: 'import', prev: 'import' },
        ],

        'prefer-const': 'error',

        'prefer-object-spread': 'error',

        'quote-props': ['error', 'as-needed'],

        quotes: [ 'error', 'single', { avoidEscape: true } ],

        'react-hooks/exhaustive-deps': [ 'error', {
            enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        } ],

        'react/jsx-boolean-value': [ 2, 'never' ],

        'react/jsx-closing-bracket-location': [ 2, 'line-aligned' ],

        'react/jsx-curly-brace-presence': [ 'error' ],

        'react/jsx-curly-spacing': [ 2, 'never', { allowMultiline: true } ],

        'react/jsx-equals-spacing': [ 2, 'never' ],

        'react/jsx-max-props-per-line': [ 0, { maximum: 1 } ],

        'react/jsx-no-duplicate-props': [ 2, { ignoreCase: false } ],

        'react/jsx-no-undef': 2,

        'react/jsx-props-no-multi-spaces': [ 2 ],

        'react/jsx-sort-props': [ 'error', { callbacksLast: false, ignoreCase: true } ],

        'react/jsx-tag-spacing': ['error', { afterOpening: 'never', beforeClosing: 'never', beforeSelfClosing: 'always' }],

        'react/jsx-wrap-multilines': [ 2, {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'parens-new-line',
            declaration: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
            return: 'parens-new-line',
        } ],

        'react/prop-types': 'off',

        'react/self-closing-comp': [ 'error', { component: true, html: true } ],

        'require-atomic-updates': 'off',

        'rest-spread-spacing': 2,

        semi: 'off',

        'semi-spacing': 'error',

        'semi-style': 'error',

        'sort-keys-fix/sort-keys-fix': 'warn',

        'space-before-blocks': 'error',

        'space-before-function-paren': 'off',

        'space-infix-ops': 'off',

        strict: [ 'error', 'never' ],

        'switch-colon-spacing': 'error',
        'template-curly-spacing': ['error', 'never'],
        'unused-imports/no-unused-imports': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
