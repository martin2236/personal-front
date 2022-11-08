 const authGuard = (to, from, next) => {
    const token = localStorage.getItem('token');
    if(token){
        fetch('https://personal-back.herokuapp.com/personal/auth',{
            method:'GET',
            headers:{
                'x-token':token,
                'Content-Type':'application/json'
            },
           }).then(res =>{
            return res.json()
           }).then(data =>{
                
            if(data.msg != 'token ok') {
                            return next('/home')
                    }else{
                        return next()
                    }
                })
            }
            
        //    if(data.msg != 'token ok'){
        //        next("/")
        //    }else{
        //        next()
        //    }
        //   }).catch(error =>{
        //    console.log(error)
        //   }) 
        //}else{
        //    console.log('no hay token')
        //}
    };

    export default authGuard