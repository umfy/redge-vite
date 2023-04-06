<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToggleBase from '../components/design/button/ToggleBase.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface Tab {
  name: string
  url: string
  number?: number
}

const tabs: Tab[] = [
  { name: t('tabs.homePage'), url: '/' },
  { name: t('tabs.todoList'), url: '/todo' },
]

const route = useRoute()

const prefersDarkScheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches
const html = document.querySelector('html')
if (prefersDarkScheme) {
  html?.toggleAttribute('data-dark-mode')
} else {
  html?.toggleAttribute('data-light-mode')
}

const isThemeDark = ref(prefersDarkScheme)
watch(isThemeDark, () => {
  html?.toggleAttribute('data-dark-mode')
  html?.toggleAttribute('data-light-mode')
})
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="tab of tabs"
        :key="tab.url"
        :class="{
          active: tab.url === String(route.path),
        }"
      >
        <div class="tab-container">
          <router-link :to="tab.url">{{ tab.name }}</router-link>
        </div>
      </li>
      <li class="right-button">
        <ToggleBase :label="t('tabs.buttons.darkMode')" v-model:model-value="isThemeDark"> </ToggleBase>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 4px 10px var(--color-shadow-light);
  padding: 0 1rem;
  background-color: var(--color-light);
}
ul {
  display: flex;
  align-items: center;
  height: 65px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li a {
  display: block;
  color: var(--color-light-contrast);
  padding: 14px 16px;
  text-decoration: none;
}

li .tab-container:hover {
  border-radius: 50px;
  background-color: var(--color-shadow-light);
}

.tab-container {
  display: flex;
  align-items: center;
  padding-inline: 20px;
}
.right-button {
  margin-left: auto;
}

.active {
  padding-block: 3px;
  border-bottom: 3px solid var(--color-primary-tint);
}
.hide-badge {
  display: none;
}

@media only screen and (min-width: 900px) {
  nav {
    padding-inline: calc(10vw - 90px);
  }
}
</style>
