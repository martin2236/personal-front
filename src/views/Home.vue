<template>
       <v-parallax :src="require('@/assets/fondo.png')"  style="height:100%;">
         <v-container fluid class="d-flex flex-row flex-wrap align-content-center justify-space-around pa-0"  style="height:100%;">
            <!--<v-col  cols="12" lg="6" md="6" sm="6" style="background-color:#0ea5e9;  height:80%;" class="ma-0 pa-0">
               <v-carousel
               class="pa-0 ma-0"
                height="100%"
                cycle 
                v-model="model"
                hide-delimiters
                >
                  <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>-->
            <v-col cols="12" lg="5" md="5" sm="5" style="height:80%;"  class="ma-0 pa-0">
                <v-card style="height:100%;" class=" d-flex flex-column justify-space-around">
                    <v-card-title class="d-flex flex-row justify-center">
                        <p>Iniciar sesion</p>
                    </v-card-title>
                    <v-card-text style="height:60%;" class="text-center">
                         <v-form
                            class="d-flex flex-column justify-space-around"
                            style="height:100%;"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-text-field
                            v-model="usuario"
                            :rules="nameRules"
                            label="Usuario"
                            required
                            ></v-text-field>

                           <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordRules"
                                :type="show1 ? 'text' : 'password'"
                                label="contraseña"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            
                            <v-btn
                            color="primary"
                            @click="submit()"
                            >
                            Ingresar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                top
                color="red"
                >
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </v-container>
       </v-parallax>
</template>

<script>
// @ is an alias to /src
// import contenedor from '@/components/contenedor.vue'

export default {
    name: 'home-view',
    components: {
        // contenedor
    },
    data: () => ({
         model: 0,
         items:[
           {src: "https://lacosta.gob.ar/wp-content/uploads/2022/11/luces-pc.jpg"},
            {src:"https://lacosta.gob.ar/wp-content/uploads/2022/11/luces-pc.jpg"},
            {src:"https://lacosta.gob.ar/wp-content/uploads/2022/11/luces-pc.jpg"},
            {src:"https://lacosta.gob.ar/wp-content/uploads/2022/11/luces-pc.jpg"},
         ],
      snackbar:false,  
      show1: false,
      valid: true,
      text:'',
      usuario: '',
      timeout:4000,
      nameRules: [
        v => !!v || 'Ingrese un usuario',
        v => (v && v.length >= 5) || 'El nombre debe tener mas de 5 caracteres',
      ],
     password:'',
     passwordRules: [
        v => !!v || 'ingrese una contraseña',
        v => (v && v.length >= 5) || 'La contraseña debe tener mas de 5 caracteres',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      submit(){
            let usuario = this.usuario
            let password = this.password
               if( this.$refs.form.validate()){
                console.log(usuario, password)
                   fetch('https://personal-back.herokuapp.com/personal/auth/login',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            usuario,
                            password
                        })
                   }).then(res =>{
                        return res.json()
                   }).then(data =>{
                        if(data.msg ){
                            console.log('error',data)
                            this.text = data.msg
                            this.snackbar = true
                        }else{
                            console.log('ok',data)
                            localStorage.setItem("nombre", data.nombre);
                            localStorage.setItem("token", data.token)
                            this.$router.replace("/principal")
                        }
                    }).catch(error =>{
                        console.log('este es el error',error)
                   })
                   }
               else{
                console.log('error en la validacion')
            }
        }
    },
}
</script>