
let baseurl="https://good-tan-jay.cyclic.app/"


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
    getUserData()
})

navbooking.addEventListener("click",()=>{
    trainerPage.style.display="none"
    userPage.style.display="none"
    bookingPage.style.display="block"
    getAllBookigData()
})


async function getTrainerData(){
  try {
    let res= await fetch(`${baseurl}/trainer`)
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
    <span>All Trainers</span>
    <button id="add-trainer">Add Trainer</button>
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
         <button id="delete-trainer" data-id="${elem._id}">Delete</button>
        </div>
     </div>
        `
    }).join("")}
    <div id="add"> 
    <button id="cross">&#215;</button>
      <h2>Enter All details for adding a Trainer</h2>
      <form action="" id="trainer-added">
        <input type="text" id="name" placeholder="Enter Trainer Name" required>
        <br>
        <input type="text" id="age" placeholder="Enter Age" required>
        <br>
        <input type="text" id="gender" placeholder="Enter Gender" required>
        <br>
        <input type="url" name="" id="image" placeholder="Enter Image Address" required>
        <br>
        <input type="number" id="price" placeholder="Enter Price of Trainer" required>
        <br>
        <input type="text" id="specialisation" placeholder="Enter Trainer Specialization" required>
        <br>
        <input type="submit" value="submit">
      </form>         
    </div>
    `
    let deleteTrainerBtns=document.querySelectorAll("#delete-trainer")
    for(let deleteTrainerBtn of deleteTrainerBtns){
      deleteTrainerBtn.addEventListener("click",(e)=>{
        let id=e.target.dataset.id
        let promptInput=prompt("If you want to Delete write 'Delete' in input box ")
        if(promptInput==="Delete"){
          deleteTrainerData(id)
        }else{
           alert("You need to write 'Delete' ..")
        }
         
      })
    }

    document.getElementById("cross").addEventListener("click",()=>{
      document.getElementById("add").style.display="none"
    })

    let addTrainerBtn=document.getElementById("add-trainer")

    addTrainerBtn.addEventListener("click",()=>{
         document.getElementById("add").style.display="block"
    })

    let addTrainerForm=document.getElementById("trainer-added")
    addTrainerForm.addEventListener("submit",(event)=>{
        event.preventDefault()
        let name=document.getElementById("name").value
        let age=document.getElementById("age").value
        let gender=document.getElementById("gender").value
        let image=document.getElementById("image").value
        let price=document.getElementById("price").value
        let specialization=document.getElementById("specialisation").value
       let arr=specialization.split(",")
        let obj={
          name,age,gender,image,price,specialization:arr
        }
        addTraainerData(obj)
        document.getElementById("add").style.display="none"
    })
}

async function addTraainerData(obj){
    try {
      let res= await fetch(`${baseurl}/trainer/add`,{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(obj)
      })

      let res2=await res.json()
      alert("Trainer Added Sucessfully.")
      getTrainerData()
      
    } catch (error) {
       console.log(error)
    }
}

async function  deleteTrainerData(id){
 try {
  let res= await fetch(`${baseurl}/trainer/delete/${id}`,{
      method:"DELETE"
  })

  alert("Trainer data Deleted Sucessfully")
  getTrainerData()
  
 } catch (error) {
  console.log("Error While deleting Trainer")
 }
}

async function getUserData(){
  try {
    let res= await fetch(`${baseurl}/user/alluser`)
    let data=await res.json()
    displayUserData(data)
    
  } catch (error) {
     console.log("Error while fetching user data")
     console.log(error)
  }
}


function displayUserData(data){
     userPage.innerHTML=""
     userPage.innerHTML=`
     <h1>All Users</h1>
     <table>
         <thead>
             <tr>
                 <th>Id</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Password</th>
             </tr>
         </thead>
         <tbody>
         ${data.map((elem)=>{
          return `
              <tr>
                  <td>${elem._id}</td>
                  <td>${elem.name}</td>
                  <td>${elem.email}</td>
                  <td>*******</td>
              </tr>
          `
         }).join("")}
             
         </tbody>
     </table>
     `
}

async function getAllBookigData(){
  try {
    let res= await fetch(`${baseurl}/booking`)
    let data=await res.json()
    displayBookingData(data.bookingData)

  } catch (error) {
     console.log("Error while fetching user data")
     console.log(error)
  }
}


function displayBookingData(data){
   bookingPage.innerHTML=""
   bookingPage.innerHTML=`
   <h1 style="text-align: center;">All Bookings</h1>
   <table>
       <thead>
           <tr>
               <th>Trainer Id</th>
               <th>User Id</th>
               <th>Email</th>
               <th>Date</th>
               <th>Time Slot</th>
           </tr>
       </thead>
       <tbody>
       ${data.map((elem)=>{
        return `
            <tr>
                <td>${elem.trainerId}</td>
                <td>${elem.userId}</td>
                <td>${elem.userEmail}</td>
                <td>${elem.bookingDate}</td>
                <td>${elem.bookingSlot}</td>
            </tr>
        `
       }).join("")}
           
       </tbody>
   </table>
   `
}
