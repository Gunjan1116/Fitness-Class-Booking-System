let baseUrl=`https://good-tan-jay.cyclic.app/`
let cont=document.getElementById("display_appointment");

async function getAllAppointments(){
    let token=sessionStorage.getItem("token");
    let name=sessionStorage.getItem("name");
    if(!token){
         alert("Please Login first!!");
        window.location.href="./Login.html";
        return;
    }

    try {
        let res=await fetch(`${baseUrl}/booking/userId`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                Authorization:`${token}`
            },
           })
           let out=await res.json();
           //console.log(out);
           displayAllAppointments(out.Data,name,token)
    } catch (error) {
        console.log(error.message);
        console.log("error from fetching all appointments")
    }
}
getAllAppointments();

function displayAllAppointments(arr,name,token){
    cont.innerHTML=""
    cont.innerHTML=`
   <h1 style="text-align: center; margin-bottom:20px">All Bookings of ${name}</h1>
   <table>
       <thead>
           <tr>
               <th>SI NO.</th>
               <th>User Email</th>
               <th>Date</th>
               <th>Time Slot</th>
               <th>Cancel Appointments</th>
           </tr>
       </thead>
       <tbody>
       ${arr.map((elem,index)=>{
        return `
            <tr>
                <td>${index+1}</td>
                <td>${elem.userEmail}</td>
                <td>${elem.bookingDate}</td>
                <td>${elem.bookingSlot=="6-8"?"6 AM to 8 AM":elem.bookingSlot=="9-11"?"9 AM to 11 AM":elem.bookingSlot=="4-6"?"4 PM to 6 PM":"7 PM to 9 PM"}</td>
                <td><button class="cancel_appointment" data-id=${elem._id}>Cancel Appointments</button></td>
            </tr>
        `
       }).join("")}
           
       </tbody>
   </table>
   `

   let cancelAppointmentBtns=document.querySelectorAll(".cancel_appointment")
     
      for(let cancelAppointmentBtn of cancelAppointmentBtns){
        cancelAppointmentBtn.addEventListener("click",(e)=>{
                let id=e.target.dataset.id
                //console.log(id);
                removeAppointment(id,token);
           })
      }
}

async function removeAppointment(id,token){
    try {
        let res=await fetch(`${baseUrl}/booking/remove/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                Authorization:`${token}`
            },
           })
           let out=await res.json();
           //console.log(out);
           if(out.msg==`booking id of ${id} is deleted succesfully`){
            getAllAppointments(); 
            alert(`Your Booking Successfully Cancelled`)
           }else{
            alert("Something Went Wrong!!")
           }
           
    } catch (error) {
        console.log(error);
        alert("Something Went Wrong!!")
    }
}