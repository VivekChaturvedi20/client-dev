module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        function () {
            return {
                visitor: {
                    MetaProperty(path) {
                        path.replaceWithSourceString('process');
                    }
                }
            };
        },
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
};
