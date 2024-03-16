//*************Login-User************/ 

const loginUser = async (email,password)=>{
     if(!email||!password){
        throw Error('All fields are required')
     }
     const res = await fetch('/api/users/login',{
        method: 'POST',
        headers: {
            'Content-Type' :'application/json'
        },
        body:JSON.stringify({email,password})
     })
     const data = await res.json()
    if(!res.ok){
        throw Error(data.error)
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
    
}
//*************Register-User************/ 

const registerUser = async (email,password,passwordConfirm)=>{
    if(!email||!password||!passwordConfirm){
        throw Error('All fields are requireds');
    }
    if(password!==passwordConfirm){
        throw Error("Passwords do not Match")
    }
    const res= await fetch('/api/users/register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password}),
    })
    console.log(res)
    const data =await res.json()
    if(!res.ok){
        throw Error(data.error)
    }
    localStorage.setItem("token",data.token)
    localStorage.setItem("email",data.email)

}
export {loginUser,registerUser}