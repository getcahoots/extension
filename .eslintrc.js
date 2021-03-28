module.exports = {
    parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2019,
        sourceType: "module",
    },
    env: { browser: true, es6: true },
    root: true,
    extends: ["xtrict"],
};
