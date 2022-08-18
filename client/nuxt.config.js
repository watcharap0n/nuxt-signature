module.exports = {
    publicRuntimeConfig: {
        siteKey: process.env.SITEKEY,
        secretKey: process.env.SECRETKEY,
        baseURL: process.env.BASE_URL,
        apiVerifyExkasan: process.env.API_VERIFY_EXKASAN,
        apiUploadPdf: process.env.API_UPLOAD_PDF,
        apiHandelFile: process.env.API_HANDLE_FILE,
        liffId: process.env.LIFFID
    },

    server: {
        host: process.env.NUXT_HOST,
        port: process.env.NUXT_PORT,
    },

    ssr: false,

    head: {
        titleTemplate: 'E-Documents',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Meta description'}
        ],

        script: [
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
            },
            {
                src: 'https://www.google.com/recaptcha/api.js',
                async: true,
                defer: true
            },
            {
                scr: 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit',
                async: true,
                defer: true
            },
            {
                src: "https://www.googletagmanager.com/gtag/js?id=G-71TY1V8321",
                async: true
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: '/icon-head.png'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Prompt:wght@400&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,300&family=Sarabun:wght@300&display=swap'
            }
        ]
    },

    plugins: [
        '~/plugins/notifier.js',
        {src: '~/plugins/vue-device.js'}
    ],

    buildModules: [
        "@nuxtjs/vuetify",
        "@nuxtjs/composition-api/module",
    ],

    modules: [
        "@nuxtjs/axios",
        "bootstrap-vue/nuxt",
        "vue-sweetalert2/nuxt",
        [
            "@nuxtjs/recaptcha",
            {
                siteKey: process.env.SITKEY,
                language: 'en',
                version: 2,
            }
        ],
        "@nuxtjs/gtm",
    ],

    gtm: {
        id: 'GTM-71TY1V8321'
    },

    srcDir: 'app/',
    components: true,

    axios: {
        proxy: true
    },
    proxy: {
        '/captcha-api/': {
            target: 'https://www.google.com/recaptcha/api',
            pathRewrite: {
                '^/captcha-api': ""
            }
        }
    }

}