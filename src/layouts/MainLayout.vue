<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-orange text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          {{$route.meta.title}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Test By Farshid Sadjadi</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>



export default ({
  name: 'MainLayout',

})
</script>
