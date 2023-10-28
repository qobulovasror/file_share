const form = document.querySelector('.form-container');
const input = document.querySelector('.inputForKey')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(input.value!=""){
        e.target.submit()
    }else{
        input.style.border = "0.5px solid red"
    }
})

input.addEventListener('keyup', (e)=>{
    e.target.style.border = "0.5px solid #000;"
})