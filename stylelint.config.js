export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-max-id': 0,
    'max-nesting-depth': 4,
    'declaration-no-important': true,
    'selector-class-pattern': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'forward', 'import'],
      },
    ],
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9]*$',
    'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9]*$',
    'scss/percent-placeholder-pattern': '^[a-z][a-zA-Z0-9]*$',
  },
};
