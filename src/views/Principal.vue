<template>
    <div>
        <v-card>
            <v-toolbar
            color="cyan"
            dark
            flat
            >
                <v-spacer></v-spacer>
                    <v-toolbar-title class="text-center">Centro de Mensajes del SIM</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs fixed-tabs>
                        <v-tab to="/principal/estadisticas">Estadisticas</v-tab>
                        <v-tab to="/principal/notificaciones">Notificaciones</v-tab>
                        <v-tab to="/principal/usuarios">Usuarios</v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
        </v-card>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
 name: 'principal-view',
   data () {
      return {
        
      }
    },
}
</script>

<style>

</style>