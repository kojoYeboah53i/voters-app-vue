<template>
  <div class="" id="page_wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" @click="goBack" href="#">
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

     <div class="hero-container container-fluid">
         <div class=" top-nav-wrapper">
            <ul class="top-navigation">
              <li>
                <a @click="goBack" :class="[activePage == 'election' ? 'link-border' : '']" href="#">  Elections</a>
              </li>
              <li>
                <a @click="setActivePage('results')" :class="[activePage == 'results' ? 'link-border' : '']" href="/results">Results</a>
              </li>
            </ul>
        
         </div>
    </div>


      <div class="row justify-content-center m-3">
          <div class="col-12">
              <h2 class="text-center py-5">Presidential results</h2>
          </div>
          <div class="col-sm-6 col-xs-10 col-md-5 col-lg-3 " v-for="(user, key) in users" :key="key">  
                <div class="card my-3">
                    <div class="card top-card" >
                        <img class="" height="220" :src="user.image" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{user.name}}</h5>
                        </div>
                        <div class="card-footer text-light" :style="`background-color:${user.color}`">
                        <p>Votes {{user.votes}}</p>
                        <!-- <p>{{`Votes ${user.votes}`}}</p>
                        <p>{{`total ${voters.length}`}}</p> -->
                         <p v-if="voters.length > 0">Percentage {{ percentage(user.votes, voters.length) }} {{'%'}} </p> 
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <div class="row justify-content-center m-3">
          <div class="col-12">
              <h2 class="text-center py-5">Vice Presidential results</h2>
          </div>
          <div class="col-sm-6 col-xs-10 col-md-5 col-lg-3" v-for="(user, key) in vice_presidents" :key="key">  
                <div class="card my-3">
                    <div class="card top-card" >
                        <img class="" height="220" :src="user.image" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{user.name}}</h5>
                        </div>
                        <div class="card-footer text-light" :style="`background-color:${user.color}`">
                        <p>Votes {{user.votes}}</p>
                        <!-- <p>total votes {{vice_presidential_voters}}</p> -->
                     
                              <p v-if="vice_presidential_voters.length > 0">Percentage {{percentage(user.votes, vice_presidential_voters.length)}} {{'%'}} </p>
                          
                        </div>
                    </div>
                </div>
            </div>
      </div>

      <div class="row justify-content-center m-3">
          <div class="col-12">
              <h2 class="text-center py-5">General Secretarial Results</h2>
          </div>
          <div class="col-sm-6 col-xs-10 col-md-5 col-lg-3" v-for="(user, key) in general_secretaries" :key="key">  
                <div class="card my-3">
                    <div class="card top-card" >
                        <div class="setOverlay">
                            <a class="btn btn-outline-light px-5 py-2" href="#selected">Select</a>
                        </div>
                        <img class="" height="220" :src="user.image" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{user.name}}</h5>
                        </div>
                        <div class="card-footer text-light" :style="`background-color:${user.color}`">
                        <p>Votes {{user.votes}}</p>
                        <p v-if="general_secretaries_voters.length > 0">Percentage {{percentage(user.votes, general_secretaries_voters.length)}} {{'%'}} </p>
                        </div>
                    </div>
                </div>
            </div>
      </div>

      <div class="row justify-content-center m-3">
          <div class="col-12">
              <h2 class="text-center py-5">Financial Secretarial results</h2>
          </div>
          <div class="col-sm-6 col-xs-10 col-md-5 col-lg-3" v-for="(user, key) in financial_secretaries" :key="key">  
                <div class="card my-3">
                    <div class="card top-card" >
                        <img class="" height="220" :src="user.image" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{user.name}}</h5>
                        </div>
                        <div class="card-footer text-light" :style="`background-color:${user.color}`">
                        <p>Votes {{user.votes}}</p>
                        <!-- <p>{{typeof financial_secretaries_voters}}</p> -->
                        <p v-if="financial_secretaries_voters.length > 0">Percentage {{percentage(user.votes,financial_secretaries_voters.length)}} {{'%'}} </p>
                        </div>
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
export default {
    data() {
        return {
            users: [],
            voters: [],
            vice_presidential_voters:[],
            vice_presidents:[],
            general_secretaries:[],
            general_secretaries_voters: [],
            financial_secretaries: [],
            financial_secretaries_voters:[],
            activePage:null,
            // 
            phone_number:'',
            isLoading:false,
            showNumberInput:true,
            showCodeInput:false,
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            code:'',
            error:'',
            success:'',
        }
    },
    methods: {
      percentage(vote, totalVotes) {
        // return Math.round((vote / totalVotes) * 100
        const division = vote / totalVotes
        const result = division * 100
        return result
      },
      goBack() {
          this.$router.go(-1)
          localStorage.setItem('activePage', 'election')
      },
      setActivePage(page) {
      localStorage.setItem('activePage', page)
    },
    logout(){
      localStorage.clear()
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
        this.activePage = localStorage.getItem('activePage') ? localStorage.getItem('activePage') : 'results'
    },
    created(){
        this.activePage = localStorage.getItem('activePage') ? localStorage.getItem('activePage') : 'results'

        this.users = JSON.parse(localStorage.getItem('presidents')).sort(function(a, b){return b.votes - a.votes})
        this.vice_presidents = JSON.parse(localStorage.getItem('vice_presidents')).sort(function(a, b){return b.votes - a.votes}) ;
        this.general_secretaries = JSON.parse(localStorage.getItem('general_secretaries')).sort(function(a, b){return b.votes - a.votes}) ;
        this.financial_secretaries = JSON.parse(localStorage.getItem('financial_secretaries')).sort(function(a, b){return b.votes - a.votes}) 
        
        this.voters = localStorage.getItem('voters') ? JSON.parse( localStorage.getItem('voters')) : []
        this.vice_presidential_voters = localStorage.getItem('vice_president_voters') ? JSON.parse(localStorage.getItem('vice_president_voters')) : []
        this.general_secretaries_voters = localStorage.getItem('general_secretaries_voters') ? JSON.parse(localStorage.getItem('general_secretaries_voters')) : []
        this.financial_secretaries_voters = localStorage.getItem('financial_secretaries_voters') ? JSON.parse(localStorage.getItem('financial_secretaries_voters')) : []
    },
    mounted() {
           // Start Firebase invisible reCAPTCHA verifier
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('get-sign-in-code')
      recaptchaVerifier.render()
    }
}
</script>

<style>
#page_wrapper{
    width:100%;
    overflow: hidden;
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
/* MEDIA QUERIES */
@media screen and (max-width:1100px) {
   .top-nav-wrapper{
    width:95%;
  } 
}
@media screen and (max-width:700px) {
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
</style>