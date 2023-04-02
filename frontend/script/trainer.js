let url="https://good-tan-jay.cyclic.app/"

let boxContainer=document.querySelector("#trainers .box-container")




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
    boxContainer.innerHTML=""
    boxContainer.innerHTML=`
     
      ${ data.map((elem)=>{
        return `
        <div class="box">
            <img src=${elem.image} alt="">
            <div class="content">
                <span>expert trainer</span>
                <h3>${elem.name}</h3>
                <a href="./appointment.html" class="btn" data-id=${elem._id}>Book Appointment</a>
                <div class="share">
                    <a href="#" class="fab fa-facebook-f"></a>
                    <a href="#" class="fab fa-twitter"></a>
                    <a href="#" class="fab fa-pinterest"></a>
                    <a href="#" class="fab fa-linkedin"></a>
                </div>
            </div>
       </div>
          `
      }).join("")}`

      let appointmentBtns=document.querySelectorAll(".btn")
     
      for(let appointmentBtn of appointmentBtns){
           appointmentBtn.addEventListener("click",(e)=>{
                let id=e.target.dataset.id
                sessionStorage.setItem("trainerId",id)
           })
      }

  }