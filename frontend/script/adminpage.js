
let baseurl="http://localhost:3000"


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