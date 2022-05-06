// let success = document.getElementById('success')
import fetch from 'node-fetch'
let url = 'http://localhost:4040/getAllArticles'

 const getapi = async (ul)=>{
    let response = await fetch(ul)
    console.log(response);
    return response
}

getapi(url)