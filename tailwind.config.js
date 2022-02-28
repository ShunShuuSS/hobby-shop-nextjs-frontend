module.exports = {
    mode: 'jit',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                'mobile-s': '320px',
                'mobile-m': '375px',
                'mobile-l': '425px',
                'mobile-xl': '530px',
                'tablet': '768px',
                'laptop': '1024px',
                'laptop-l': '1280px',
                'laptop-xl': '1440px',
            },
        },
    },
    variants: {
        exrend: {}
    },
    plugins: [],
}