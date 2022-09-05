module.exports = {
    build: {
        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true
            }
        },
        filenames: {
            app: ({
                      isDev,
                      isModern
                  }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
            chunk: ({
                        isDev,
                        isModern
                    }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
            css: ({isDev}) => isDev ? '[name].css' : 'css/[contenthash:7].css',
            img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
            font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
            video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
        }
    },

    publicRuntimeConfig: {
        siteKey: process.env.SITEKEY,
        secretKey: process.env.SECRETKEY,
        baseURLValidate: process.env.BASE_URL_VALIDATE,
        baseURLTimestamp: process.env.BASE_URL_TIMESTAMP,
        apiVerifyExkasan: process.env.API_VERIFY_EXKASAN,
        apiTimeStampExkasan: process.env.API_TIMESTAMP_EXKASAN,
        apiUploadPdf: process.env.API_UPLOAD_PDF,
        apiHandelFile: process.env.API_HANDLE_FILE,
        liffId: process.env.LIFFID,
        liffIdTs: process.env.LIFFID_TIMESTAMP,
        basicAuthUsername: process.env.BASIC_AUTH_USERNAME,
        basicAuthPassword: process.env.BASIC_AUTH_PASSWORD
    },

    server: {
        host: process.env.NUXT_HOST,
        port: process.env.NUXT_PORT
    },

    ssr: false,

    head: {
        titleTemplate: 'Exkasan',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Meta description'},
        ],

        script: [
            {
                src: 'https://accounts.google.com/gsi/client'
            },
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
            },
            {
                src: 'https://cdn.tailwindcss.com'
            },
            {
                async: true,
                defer: true,
                crossorigin: 'anonymous',
                src: 'https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v14.0&appId=1098152014395903&autoLogAppEvents=1'
            }
        ],

        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                crossorigin: 'anonymous'
            },
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
        "@nuxtjs/composition-api/module"
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'bootstrap-vue/nuxt',
        'vue-sweetalert2/nuxt',
        [
            '@nuxtjs/recaptcha',
            {
                siteKey: process.env.SITEKEY,
                language: 'en',
                version: 2
            }
        ],
        '@nuxtjs/gtm'
    ],

    auth: {
        strategies: {
            facebook: {
                endpoints: {
                    userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture,email{url}'
                },
                clientId: process.env.CLIENT_ID_FACEBOOK,
                scope: ['public_profile', 'email']
            },
            google: {
                clientId: process.env.CLIENT_ID_GOOGLE,
                scope: ['profile', 'email'],
                codeChallengeMethod: '',
                responseType: 'token id_token',
                redirectUri: process.env.REDIRECT_URI
            },
        },
        redirect: {
            callback: '/timestamp',
            logout: '/timestamp',
        }
    },

    gtm: {
        id: 'GTM-71TY1V8321'
    },

    srcDir: 'app/',
    components: true,

    axios: {
        proxy: true,
    },
    proxy: {
        '/captcha-api/': {
            target: 'https://www.google.com/recaptcha/api',
            pathRewrite: {
                '^/captcha-api': ""
            }
        },
        '/timestamp/': process.env.BASE_URL_BACKEND,
        '/signature/': process.env.BASE_URL_BACKEND
    }

}