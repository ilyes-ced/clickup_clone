/** @type {import('tailwindcss').Config} */


module.exports = {
    content: [
        './views/*.ejs',
        './views/components/*.ejs',
    ],


    theme: {
        extend: {
            colors: {
                'primary': '#1d203e',
                'secondary': '#2c2f48',
                'tertiary': '#393d5e',
                'light_purple': '#cba4ee',
                'dark_purple': '#8060d4',
            },
        },
    },
    plugins: [],
}