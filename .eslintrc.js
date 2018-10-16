module.exports = {
    "extends": "standard",
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }]
    }
};