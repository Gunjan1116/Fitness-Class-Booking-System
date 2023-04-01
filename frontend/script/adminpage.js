
let url="http://localhost:3000"


let navtrainer=document.getElementById("navTrainer")
let navuser=document.getElementById("navUser")
let navbooking=document.getElementById("navBooking")

let trainerPage=document.getElementById("trainer")
let userPage=document.getElementById("user")
let bookingPage=document.getElementById("bookings")

navtrainer.addEventListener("click",()=>{
    trainerPage.style.display="block"
    userPage.style.display="none"
    bookingPage.style.display="none"
})
navuser.addEventListener("click",()=>{
    trainerPage.style.display="none"
    userPage.style.display="block"
    bookingPage.style.display="none"
})

navbooking.addEventListener("click",()=>{
    trainerPage.style.display="none"
    userPage.style.display="none"
    bookingPage.style.display="block"
})


async function getTrainerData(){
  try {
    let res= await fetch(`${url}/trainer`)
    let data =await res.json()
    displayTrainerData(data)
    
  } catch (error) {
      console.log(error)
  }
}
getTrainerData()

function  displayTrainerData(data){
    trainerPage.innerHTML=""
    trainerPage.innerHTML=`
    <h2>All Trainers</h2>
    ${ data.map((elem)=>{
      return `
        <div class="child">
        <div>
         <img class="image" src="${elem.image}" alt="trainer 1">
        </div>
        <div class="desc">
          <h2>${elem.name}</h2>
          <h3>Age: ${elem.age}</h3>
          <h3>Gender : ${elem.gender}</h3>
          <h4>Specialization: ${elem.specialization}</h4>
        </div>
        <div id="delete">
         <button>Delete</button>
        </div>
     </div>
        `
    }).join("")}`
}