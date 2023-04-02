let baseUrl=`https://good-tan-jay.cyclic.app/`
let btnBook=document.getElementById("book_appointment");
btnBook.addEventListener("click",()=>{
    let date=document.getElementById("inputdate").value;
    let slot=document.getElementById("slot-select").value;
    let token=sessionStorage.getItem("token");
    let name=sessionStorage.getItem("name");
    let trainerId=sessionStorage.getItem("trainerId");
    if(!token){
        alert("Please Login First to Book an Appointment!!")
        window.location.href="./Login.html"
    }else if(date==""||slot==""){
        alert("Please fill all the fields")
    }else{
       let obj={
        trainerId:trainerId,
        bookingDate:date,
        bookingSlot:slot
       }
       bookAnAppointment(obj,token,name);
    }
    
})

async function bookAnAppointment(obj,token,name){

    try {
        let res=await fetch(`${baseUrl}/booking/create`,{
         method:'POST',
         headers:{
             'Content-type':'application/json',
             Authorization:`${token}`
         },
         body:JSON.stringify(obj)
        })
        let out=await res.json();
        //console.log(out);
        if(out.msg=="This Slot is Not Available."){
         alert("This Slot is Not Available.")
        }else if(out.msg=="new booking created successfully"){
         alert(`Hii ${name} Your booking is confirmed on ${obj.bookingDate}`)
        }else{
         alert("Something went wrong!!")
        }
     } catch (error) {
         console.log("err",error)
         alert("Something went wrong!!!!")
     }
}