import vuetify from './plugins/vuetify'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
