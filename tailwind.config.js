/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#d1ecfa",
                green: "#07B979",
                "light-green": "#D2E7E0",
                "bg-main": "#F7FAF9",
                white: "#ffffff",
                black: "#000000",
                black1: "#1B1F1E",
                "dark-gray": "#333333",
                "dark-blue": "#00a5ef",
                secondary: "#46127b",
                success: "#3e9f4d",
                info: "#0091ff",
                warning: "#ffab00",
                danger: "#eb4a27",
                light: "#f8f8f8",
                dark: "#494949",
                white: "#fff",
                black: "#000",
                "link-color": "#0052cc",
                "gray-100": "#fbfbfb",
                "gray-200": "#f8f8f8",
                "gray-300": "#eee",
                "gray-400": "#d8d8d8",
                "gray-500": "#a9a9a9",
                "gray-600": "#848484",
                "gray-700": "#626262",
                "gray-800": "#494949",
                "gray-900": "#333",
                "gray-950": "#121212",
                "gray-e5": "#e5e5e5",
                "blue-100": "#f4fafd",
                "blue-200": "#d1ecfa",
                "blue-300": "#84cff5",
                "blue-400": "#3db8f5",
                "blue-500": "#00a5ef",
                "blue-600": "#0091d2",
                "blue-700": "#0052cc",
                "blue-900": "#062f55",
                "green-100": "#f3fcf3",
                "green-200": "#e9fae5",
                "green-300": "#b6f2b2",
                "green-400": "#59b868",
                "green-500": "#3e9f4d",
                "green-600": "#2c883a",
                "green-800": "#008c23",
                "yellow-100": "#fffcf5",
                "yellow-200": "#feeecd",
                "yellow-400": "#ffc44b",
                "yellow-500": "#ffab00",
                "yellow-600": "#d69207",
                "yellow-700": "#c68a10",
                "yellow-800": "#956911",
                "yellow-900": "#5c430a",
                "red-100": "#fffaf9",
                "red-200": "#fef0ed",
                "red-300": "#f5bcc2",
                "red-400": "#f37559",
                "red-500": "#eb4a27",
                "red-600": "#cf3e1e",
                "red-800": "#bd2837",
                "purple-100": "#f9f7fb",
                "purple-200": "#eae5f0",
                "purple-300": "#d3c7e0",
                "purple-400": "#46127b",
                "purple-500": "#46127b",
                "purple-600": "#39076b",
            },
            screens: {
                xs: "480px",
            },
            fontFamily: {
                "ibm-plex": ["IBM Plex Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};