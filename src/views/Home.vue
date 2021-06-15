<template>
  <div id="page-wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="../assets/rsz_e-voting_1.png" height="25" alt="">
        </a>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
          <ul class="top-navbar ml-auto mb-2 mb-lg-0">
            <li class="">
              <a class="search" href="#">
                  <i class="fas fa-search "></i>
              </a>
            </li>
            <li class="">
              <a v-if="!isLoggedIn" class="btn btn-secondary text-dark login" href="#" data-toggle="modal" data-target="#exampleModalLong">
                <i class="fas fa-user ml-2 mr-2"></i>  Login
              </a>
               <a v-if="isLoggedIn" @click="logout" class="btn btn-secondary text-dark login" href="#">
                <i class="fas fa-user ml-2 mr-2"></i>  Logout
              </a>
            </li>
          </ul>
        <!-- </div> -->
      </div>
    </nav>
    <!-- Hero -->
    <div class="hero-container container-fluid">
         <div class=" top-nav-wrapper">
            <ul class="top-navigation">
              <li>
                <a @click="setActivePage('election')" :class="[activePage == 'election' ? 'link-border' : '']" href=""> Election</a>
              </li>
              <li>
                <a @click="setActivePage('results')" :class="[activePage == 'results' ? 'link-border' : '']" href="/results">Results</a>
              </li>
            </ul>
        
         </div>
    </div>
    <!-- side navigation -->
    <div class="content-wrapper">
        <div class="main-container">
          <div class="side-navigation">
             <ul>
               <li><a  @click="setCurrentPage('presidential')" :class="[currentPage == 'presidential' ? 'green' : '']" class=" btn btn-secondary py-2 " href="/vote/presidential">Presidential</a></li>
               <li><a  @click="setCurrentPage('vice_president')" :class="[currentPage == 'vice_president' ? 'green' : '']" class=" btn btn-secondary py-2" href="/vote/vice_president">Vice President</a></li>
               <li><a  @click="setCurrentPage('general_secretary')" :class="[currentPage == 'general_secretary' ? 'green' : '']" class=" btn btn-secondary py-2" href="/vote/general_secretary">General Secretary</a></li>
               <li><a  @click="setCurrentPage('financial_secretary')" :class="[currentPage == 'financial_secretary' ? 'green' : '']" class=" btn btn-secondary py-2" href="/vote/financial_secretary">Financial Secretary</a></li>
             </ul>
          </div>
          <div class="vote-content">
             <button class="btn btn-primary toggler" data-target="#exampleModalCenter" data-toggle="modal" >
               <i class="fas fa-bars"></i>
             </button>
              <router-view />
          </div>
        </div>
    </div>
    <!-- nav container -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Menu</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class=" modal-navigation">
             <ul class="">
               <li><a  @click="setCurrentPage('presidential')" :class="[currentPage == 'presidential' ? 'green' : '']" class=" btn btn-secondary py-2 " href="/vote/presidential">Presidential</a></li>
               <li><a  @click="setCurrentPage('vice_president')" :class="[currentPage == 'vice_president' ? 'green' : '']" class=" btn btn-secondary py-2" href="/vote/vice_president">Vice President</a></li>
               <li><a  @click="setCurrentPage('general_secretary')" :class="[currentPage == 'general_secretary' ? 'green' : '']" class=" btn btn-secondary py-2" href="/vote/general_secretary">General Secretary</a></li>
               <li><a  @click="setCurrentPage('financial_secretary')" :class="[currentPage == 'financial_secretary' ? 'green' : '']" class=" btn btn-secondary py-2" href="/vote/financial_secretary">Financial Secretary</a></li>
             </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    <!-- modal container -->
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Sign In</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="" @submit.prevent="verifyCode" v-if="showNumberInput">
              <div class="row">
                <div class="col-12">
                    <div class="form-group">
                      <label for="number">
                        Enter Phone Number
                      </label>
                      <input type="tel" v-model="phone_number" id="number" class="form-control" required>
                    </div>
                     <div id="get-sign-in-code"></div>
                     <div v-if="error">
                        <p class="alert-danger py-3 pl-3">{{error}}</p>
                      </div>
                      <div class="modal-footer">
                      <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                      <button  type="submit" class="btn btn-primary" > 
                         <span v-if="isLoading" class="spinner-border spinner-border-sm"></span> Get Sign In Code</button>
                    </div>
                </div>
              </div>
            </form>

            <!-- code input -->
            <form action="" v-if="showCodeInput" @submit.prevent="login">
              <div class="row" >
                <div class="col-md-12">
                    <div class="form-group">
                      <label for="code">Enter Verification Code</label>
                      <input id="code" type="text" class="form-control" v-model="code" required>
                    </div>
                </div>
                 <div v-if="error">
                        <p class="alert-danger py-3 pl-3">{{error}}</p>
                      </div>
              </div>  

               <div class="modal-footer">
                      <button type="submit" class="btn btn-primary"> <span v-if="isLoading" class="spinner-border spinner-border-sm"></span> Sign In</button>
                </div>
            </form>

            <!-- error -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import $ from 'jquery'

export default {
  name: 'Home',
  data() {
    return {
      topNavActive:false,
      phone_number:'',
      isLoading:false,
      showNumberInput:true,
      showCodeInput:false,
      currentPage: null,
      activePage:null,
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      code:'',
      error:'',
      success:'',
      users: [
        {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Blue team',
          image:require('../assets/imageOne.jpeg')
        },
         {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Royal team',
          image:require('../assets/imageTwo.jpeg')
        },
         {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Margenta team',
          image:require('../assets/imageThree.jpeg')
        },
         {
          name:'Kofi baboni',
          title:'Adjoa the leader',
          team: 'Gold team',
          image:require('../assets/imageFour.jpeg')
        }
      ]
    }
  },
  computed:{
    // activePage() {
    //   return localStorage.getItem('activePage') ? localStorage.getItem('activePage') : 'election'
    // },
  //  currentPage(){
  //     return localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : 'presidential'
  //   }
  },
  methods: {
    toggler(){
        $('.side-navigation').toggleClass('display')      
    },
    setActivePage(page) {
      localStorage.setItem('activePage', page)
    },
    setCurrentPage(page) {
      localStorage.setItem('currentPage', page)
      this.currentPage = localStorage.getItem('currentPage')
    },
    logout(){
      localStorage.removeItem('loginUser')
      localStorage.removeItem('phone_number')
      localStorage.removeItem('isLoggedIn')

      window.location.reload()
    },
    getLoginUser() {
      if(!localStorage.getItem('isLoggedIn')) {
        this.isLoggedIn = false
      }
    },
    login() {
      const self = this
      self.isLoading = true
      self.error = null

      window.confirmationResult.confirm(this.code).then(result => {
        localStorage.setItem('isLoggedIn', true)
        const number = localStorage.getItem('phone_number')
        localStorage.setItem('loginUser',number)
        window.location.reload()
      }).catch( error => {
        self.error = "Code Expires try again latter"
        
      })

    },
    verifyCode() {
      const self = this
      self.isLoading = true
      self.error = null

      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(`+233${this.phone_number}`, appVerifier)
          .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            self.showNumberInput = false;
            self.isLoading = false;
            self.showCodeInput = true
            localStorage.setItem('phone_number',self.phone_number)
          }).catch(function (error) {
            console.log(error)
            self.isLoading = false
            self.error = 'SMS not sent, try again'
            // ...
          });
    }
    
  },
  updated() {
    this.currentPage = localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : 'presidential'
  },
  created() {

    // populate financial secretaries
     const finanace = [
         {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Blue team',
          image:require('../assets/rsz_imageone.jpg'),
          color:'blue',
          vote_name:'adjoa',
          votes:0
        },
         {
          name:'Kofi Mensah',
          title:'Adjoa the leader',
          team: 'Royal team',
          image:require('../assets/rsz_imagetwo.jpg'),
          color:'#581845 ',
          vote_name:'kofi',
          votes:0
        },
         {
          name:'Abdul-Malik Musah',
          title:'Adjoa the leader',
          team: 'Margenta team',
          image:require('../assets/rsz_imagefour.jpg'),
          color:'#C70039 ',
          vote_name:'malik',
          votes:0
        },
         {
          name:'Owusu Bismark',
          title:'Adjoa the leader',
          team: 'Gold team',
          image:require('../assets/imageFour.jpeg'),
          color:'gold',
          vote_name:'owusu',
          votes:0
          }
      ]  
      if(!localStorage.getItem('financial_secretaries')) {
          localStorage.setItem('financial_secretaries', JSON.stringify(finanace))
      }
      // populate presidents
        const presidential = [
         {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Blue team',
          image:require('../assets/rsz_imageone.jpg'),
          color:'blue',
          vote_name:'adjoa',
          votes:0
        },
         {
          name:'Kofi Mensah',
          title:'Adjoa the leader',
          team: 'Royal team',
          image:require('../assets/rsz_imagetwo.jpg'),
          color:'#581845 ',
          vote_name:'kofi',
          votes:0
        },
         {
          name:'Abdul-Malik Musah',
          title:'Adjoa the leader',
          team: 'Margenta team',
          image:require('../assets/rsz_imagefour.jpg'),
          color:'#C70039 ',
          vote_name:'malik',
          votes:0
        },
         {
          name:'Owusu Bismark',
          title:'Adjoa the leader',
          team: 'Gold team',
          image:require('../assets/imageFour.jpeg'),
          color:'gold',
          vote_name:'owusu',
          votes:0
          }
      ]  
      if(!localStorage.getItem('presidents')) {
          localStorage.setItem('presidents', JSON.stringify(presidential))
      }
      //  populate vice presidents
       const vice = [
         {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Blue team',
          image:require('../assets/rsz_imageone.jpg'),
          color:'blue',
          vote_name:'adjoa',
          votes:0
        },
         {
          name:'Kofi Mensah',
          title:'Adjoa the leader',
          team: 'Royal team',
          image:require('../assets/rsz_imagetwo.jpg'),
          color:'#581845 ',
          vote_name:'kofi',
          votes:0
        },
         {
          name:'Abdul-Malik Musah',
          title:'Adjoa the leader',
          team: 'Margenta team',
          image:require('../assets/rsz_imagefour.jpg'),
          color:'#C70039 ',
          vote_name:'malik',
          votes:0
        },
         {
          name:'Owusu Bismark',
          title:'Adjoa the leader',
          team: 'Gold team',
          image:require('../assets/imageFour.jpeg'),
          color:'gold',
          vote_name:'owusu',
          votes:0
          }
      ]  
      if(!localStorage.getItem('vice_presidents')) {
          localStorage.setItem('vice_presidents', JSON.stringify(vice))
      }
      // Populate general secretaries
         const data = [
         {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Blue team',
          image:require('../assets/rsz_imageone.jpg'),
          color:'blue',
          vote_name:'adjoa',
          votes:0
        },
         {
          name:'Kofi Mensah',
          title:'Adjoa the leader',
          team: 'Royal team',
          image:require('../assets/rsz_imagetwo.jpg'),
          color:'#581845 ',
          vote_name:'kofi',
          votes:0
        },
         {
          name:'Abdul-Malik Musah',
          title:'Adjoa the leader',
          team: 'Margenta team',
          image:require('../assets/rsz_imagefour.jpg'),
          color:'#C70039 ',
          vote_name:'malik',
          votes:0
        },
         {
          name:'Owusu Bismark',
          title:'Adjoa the leader',
          team: 'Gold team',
          image:require('../assets/imageFour.jpeg'),
          color:'gold',
          vote_name:'owusu',
          votes:0
          }
      ]  
      if(!localStorage.getItem('general_secretaries')) {
          localStorage.setItem('general_secretaries', JSON.stringify(data))
      }

  },
  mounted() {
    this.currentPage = localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : 'presidential'
    this.activePage =  'election'
    window.scrollTo(0, 0);
     const self = this;
      // Start Firebase invisible reCAPTCHA verifier
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('get-sign-in-code')
      recaptchaVerifier.render()
  }
}
</script>

<style scoped>
.toggler{
  visibility: hidden;
}
.link-border {
  border:1px solid #4DABF7 !important;
  background-color: #fff !important;
}
  .green{
    background-color:#4DABF7 !important;
  }
  .top-navbar, .navbar{
    background-color: rgb(253, 250, 250) !important;
    padding:10px 0;
  }
  .top-navbar li{
    display: inline;
    background-color: rgb(253, 250, 250) !important;
  }
  .login{
    background-color:#eee;
    border: 1px solid #4DABF7;  
    text-decoration: none;
    width:130px;
    border-radius: 50px;
    padding: 5px 0;
  }
   .login:hover{
    background-color: #4DABF7;
    border: 1px solid aliceblue; 
  }
  .search{
    color: #4DABF7 !important;
    font-size: 20px;
    margin-right:20px!important;
     background-color: rgb(253, 250, 250) !important;
  }
  .nav-link{
    margin: 10px 0;
  }
  .hero-container{
    background-image: url('../assets/rsz_e-voting.png') ;
    height: 300px;
    background-repeat: no-repeat;
    width:100%;
    background-position: center;
    background-size: cover;
    display: flex;
  }
 .top-nav-wrapper{
    margin:260px auto 0 auto; 
    width:80%;
  }
   .top-nav-wrapper ul{
      list-style: none;
  }
  .top-nav-wrapper ul li {
    display: inline;
  }
  .top-nav-wrapper ul li a{
    width:200px;
    text-decoration: none;
    background-color: #eee;
    padding:20px 70px;
    text-align: center;
    color:#000;
    border:1px solid #eee;;
  }

  /* Main container */
  .main-container{
    margin: 50px auto;
    /* border:1px solid red; */
    width:85%;
    display: flex;
    justify-content: center;
  }
  .vote-content{
    width:70%
  }
  .side-navigation ul {
    width:30%;
  }
  /* side navigation  */
  .side-navigation ul, .modal-navigation ul {
    list-style: none;
  }
  .side-navigation ul li .btn {
    width:200px ;
    margin:10px 0;
    background-color: rgb(129, 123, 123);
  }
  .modal-navigation ul li .btn{
     background-color: rgb(129, 123, 123);
     width:200px ;
    margin:10px 0;
  }
  .display {
    position:absolute;
    left: 0;
    transition: all .8ms ease-in-out;
    background-color:#4DABF7 !important;
    z-index: 100;
    width:80%;
    visibility: hidden;;
  } 
  /* /* .side-navigation ul li a{
    color:#fff;
    text-decoration: none;
  } */
/* MEDIA QUERIES */
@media screen and (max-width:1100px) {
  .main-container{
    width:95%;
  }
   .top-nav-wrapper{
    width:95%;
  } 
}
@media screen and (max-width:700px) {
  .main-container{
    width:100%;
  }
  .top-nav-wrapper{
    width:100% !important;
  }
}
@media screen and (max-width:992px){
  .login{
    margin-right: 10px;
  }
}
@media screen and (max-width:400px) {
 .top-nav-wrapper{
    margin:265px 0 0 0 ;
    width:100% !important;
  } 
  .top-nav-wrapper ul li a{
     padding:15px 30px;
  }
}
@media screen and (max-width:676px) {
 .side-navigation, .side-navigation ul{
 display: none;
 }
 .toggler{
   visibility: visible;
 }
 .vote-content{
   width: 80%!important;
 }
}
</style>