## Project
>> Earsplitting-growth-3609

 ![rapid-fit](https://user-images.githubusercontent.com/112810259/229367310-98d1ee3e-8392-46db-83c7-c5ff2b182d78.png)



![33FC57DB-36A7-47B5-A20B-F86C7ABB7EDB](https://user-images.githubusercontent.com/112810259/229417706-587e96d1-4f1f-4715-a722-35566ec9b719.jpg)


<br>

## Project Name
>> Rapit-Fit

# Collaborative Project
 >>Contributors
  - Gunjan Kumar (Team lead)
  - Ajit Kumar Khatua
  - Ayushi Soni
  - Vishal Singh
   

<br>

# DEPLOYED LINK
 - [Frontend](https://chipper-zabaione-4ba9e5.netlify.app/)
 - [Backend](https://good-tan-jay.cyclic.app/)

<hr>

   
   ![WhatsApp Image 2023-04-02 at 10 40 36 PM](https://user-images.githubusercontent.com/112810259/229368310-4371aa39-b0dc-4d7c-8542-65b780611528.jpeg)

   <br>
 # BluePrint and Tasks
 


 # REQUIREMENTS 
  - User can login and sign up 
  - User can visit severals sections
  - User can able to get all the information
  - User can book trainers
  - User can book other services
  - User can book the appointment slot 
  - User can pay for the services
  - User can give feedback on appointment
  - User can choose time according to their needs for slot booking
  - User can cancel the appointment
  - Feedback


  ## TECH STACKS
   # Frontend
    >HTML
    >CSS
    >JAVASCRIPT
    >BOOTSTRAP
    >SWIPERJS
    >CAROUSEL
    >JQUERY

   # Backend
    >NODEJS
    >EXPRESSJS
    >MONGOOSE
    >NODEMAILER
    >JSONWEBTOKEN
    >BCRYPT
    >CORS
    
   # Database
    >MONGODB

   ## Register

    - "https://good-tan-jay.cyclic.app//user/signup"

    * User 
    - Name 
    - Email
    - Password

   ## Login

     - "https://good-tan-jay.cyclic.app//user/login"

     - Email
     - Password
     
     
     
     


     
![login](https://user-images.githubusercontent.com/112810259/229368605-06c4318c-afbb-493e-8fa8-d2ea089f5b9f.png)

## Home Page
 - Navbar -> Home | About | Features | Pricing | Trainers | Register Now
 - Header
 - Footer


 ## About Page
 - Information of variety of trainning
 - About us
 - Trainers Information
 - Customer Reviews

## Features
 - SHOULDER TRAINING MACHINES
 - CHEST AND ARMS TRAINING MACHINES
 - SHOULDER TRAINING MACHINES
 - BACK TRAINING MACHINES
 - CORE TRAINING MACHINES
 - LEG TRAINING FITNESS MACHINES
 - FREE WEIGHTS
 - CARDIO MACHINES
 - HOME GYM
 - ACCESSORIES



  ## Schema
    ## User
    - name  : String
    - email : String
    - password : String
    ## Trainer
    - name : String
    - age : String
    - gender : String
    - image : String
    - price : Number
    - specialization: Array of String
    ## Booking
    - userId : String
    - trainerId : String
    - userEmail : String
    - bookingDate : String
    - bookingSlot : String
 
 ## Booking end points
 - Adding new booking
  - https://good-tan-jay.cyclic.app/booking/create

    - trainerId
    - bookingDate
    - bookingSlot

 - Cancelling the booking
  - https://good-tan-jay.cyclic.app/booking/remove/id

 - Get all booking
  - https://good-tan-jay.cyclic.app/booking

 - Get the booking of paticular user
  - https://good-tan-jay.cyclic.app/booking/userId

 ## Trainer end points
  - Get all trainer
   - https://good-tan-jay.cyclic.app/trainer
  
  - Add new trainer
   - https://good-tan-jay.cyclic.app/trainer/add

      - name 
      - age 
      - gender 
      - image 
      - price 
      - specialization
      
  - Get a paticular trainer by trainerId
    - https://good-tan-jay.cyclic.app/trainer/id

    

    




    


