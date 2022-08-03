module.exports = {
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

    buildModules: [
        "@nuxtjs/vuetify",
        "@nuxtjs/composition-api/module",
    ],

    modules: [
        "@nuxtjs/axios",
        "bootstrap-vue/nuxt",
    ],

    srcDir: 'app/',
    components: true,

    axios: {
        baseURL: 'https://lab.kanepro.co'
    },

}