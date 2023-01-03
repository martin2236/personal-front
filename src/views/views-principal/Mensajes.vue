<template>
<div class=" mt-5" style="height 100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
    <v-combobox
        outlined
        style="min-width:350px"
        placeholder="seleccione un tipo de mensaje"
        :items="opciones"
        v-model="tipo"
    >

    </v-combobox>
    <v-card v-if="tipo == 'mensaje corto'" width="350px">
        <v-card-title>
           Enviar nuevo mensaje
        </v-card-title>
        <v-card-text>
              <v-form
            ref="form" 
            v-model="valid"
            lazy-validation
            
            class="mt-5 text-center"
            >
                <v-text-field
                label="Titulo"
                prepend-icon="mdi-pencil-outline"
                    :rules="tituloRules"
                    v-model="titulo"
                >
                </v-text-field>
                <v-text-field
                label="Mensaje"
                prepend-icon="mdi-email-plus-outline"
                    :rules="mensajeRules"
                    v-model="mensaje"
                >
                </v-text-field>
                <v-btn color=" primary" @click="submit()">
                    enviar
                </v-btn>
        </v-form>
        </v-card-text>
    </v-card>

    <v-card v-if="tipo == 'comunicado'" width="350px">
        <v-card-title>
           Enviar nuevo comunicado
        </v-card-title>
        <v-card-text>
              <v-form
            ref="form" 
            v-model="valid"
            lazy-validation
            
            class="mt-5 text-center"
            >
                <v-text-field
                label="Titulo"
                prepend-icon="mdi-pencil-outline"
                    :rules="tituloRules"
                    v-model="titulo"
                >
                </v-text-field>
                <v-textarea
                    height="100px"
                    label="Mensaje"
                    prepend-icon="mdi-email-plus-outline"
                    no-resize="true"
                    :rules="mensajeRules"
                    v-model="mensaje"
                >
                </v-textarea>
                <v-btn color=" primary" class="mt-3" @click="submit()">
                    enviar
                </v-btn>
        </v-form>
        </v-card-text>
    </v-card>

    <v-card v-if="tipo == 'mensaje con imagen'" width="350px">
        <v-card-title>
           Enviar nuevo mensaje con imagen
        </v-card-title>
        <v-card-text>
              <v-form
            ref="form" 
            v-model="valid"
            lazy-validation
            
            class="mt-5 text-center"
            >
                <v-text-field
                prepend-icon="mdi-pencil-outline"
                label="Titulo"
                    :rules="tituloRules"
                    v-model="titulo"
                >
                </v-text-field>
                
                <v-text-field
                prepend-icon="mdi-email-plus-outline"
                label="Mensaje"
                    :rules="mensajeRules"
                    v-model="mensaje"
                >
                </v-text-field>
                <v-file-input
                    accept="image/*"
                    label="imagen"
                ></v-file-input>
                <v-btn color=" primary" @click="submit()">
                    enviar
                </v-btn>
        </v-form>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
export default {
 name: 'mensajes-view',
 data () {
      return {
        tipo:'mensaje corto',
        titulo:'',
        mensaje:'',
        valid: false,
        opciones:['mensaje corto','comunicado','mensaje con imagen'],
        mensajeRules: [
        v => !!v || 'Coloque un mensaje',
        v => v.length <= 50 || 'El mensaje debe tener menos de 50 caracteres',
        v => v.length >= 5 || 'El mensaje debe tener mas de 5 caracteres',
      ],
       tituloRules: [
        v => v.length <= 30 || 'El mensaje debe tener menos de 30 caracteres',
        v => v.length == 0 || v.length >= 5 || 'El mensaje debe tener mas de 5 caracteres',
      ],
      }
    },
 methods:{
  
    submit(){
        const mensaje = {
            title:this.titulo,
            body:this.mensaje
        }
        const token = localStorage.getItem('token');
       if(this.$refs.form.validate()){
        console.log('se envio el mensaje',mensaje, token)
        fetch('http://localhost:8080/personal/mensajes',{
            method:'POST',
            headers:{
                'x-token':token,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({mensaje})
        })
        .then(res =>{ return res.json()})
        .then(data =>{console.log(data)})
        .catch(error =>{ console.log('ocurrio un error', error)})
       }
    }
 }
}
</script>

<style>

</style>