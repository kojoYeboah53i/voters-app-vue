<template>
  <div class="">
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
export default {
    name:'app-nav',
    data() {
        return {
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
        }
    },
    methods: {
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
    mounted() {
          // Start Firebase invisible reCAPTCHA verifier
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('get-sign-in-code')
      recaptchaVerifier.render()
    }
}
</script>

<style>

</style>