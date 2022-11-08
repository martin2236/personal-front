<template>
<div class=" mt-5" style="height 100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
    <v-card width="350px">
        <v-card-title>
           enviar nuevo mensaje
        </v-card-title>
        <v-card-text>
              <v-form
            ref="form" 
            v-model="valid"
            lazy-validation
            
            class="mt-5 text-center"
            >
                <v-text-field
                label="titulo"
                    :rules="tituloRules"
                    v-model="titulo"
                >
                </v-text-field>
                <v-text-field
                label="mensaje"
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
</div>
</template>

<script>
export default {
 name: 'mensajes-view',
 data () {
      return {
        titulo:'',
        mensaje:'',
        valid: false,
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
        fetch('https://personal-back.herokuapp.com/personal/mensajes',{
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