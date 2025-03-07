async function tasks()
{
    let a=document.querySelector("#u").value;
    let b=document.querySelector("#p").value;
    if(a==="")
    {
        alert("plz enter your username")
    }
    else
    {
        let res=await fetch("https://todus.vercel.app/?id="+a+"&p="+b);
        window.location.href=res.url;
    }
}
