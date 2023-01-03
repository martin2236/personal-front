 const authGuard = (to, from, next) => {
    const token = localStorage.getItem('token');
    if(token){
        fetch('http://localhost:8080/personal/auth',{
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
    };

    export default authGuard