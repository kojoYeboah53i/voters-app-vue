<template>
<div class="row mb-5">
   <div class="col-12 ">
       <div class="row justify-content-center">
           <div class="col-12">
               <h2 class="text-center">Presidential Election</h2>
               <p class="text-center">Select candidate and continue to cast your vote</p>
           </div>
           <div class="col-sm-8 col-xs-10 col-lg-5" v-for="(user, key) in users" :key="key" @mouseover="getSelectedCandidate(user, key)">  
                <div class="card top-card" >
                    <div class="setOverlay">
                        <a class="btn btn-outline-light px-5 py-2" href="#selected">Select</a>
                    </div>
                    <img class="" height="220" :src="user.image" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{user.name}}</h5>
                        <p class="card-text">{{user.title}}</p>
                    </div>
                    <div class="card-footer text-light" :style="`background-color:${user.color}`">
                        {{user.team}}
                    </div>
                </div>
            </div>
       </div>
        <div class="row justify-content-center" v-if="success">
         <div class="col-sm-8 col-xs-10 col-lg-5">
           <div class="alert alert-success py-4 my-3">
             <p class="text-center">
               submission sent successfully
             </p>
           </div>
         </div>
       </div>
       <div class="row justify-content-center" v-if="showCandidate" id="selected">
           <div class="col-sm-8 col-xs-10 col-lg-5">
               <div class="card">
                   <div class="overlay">
                       <div class="mb-3 text-light">
                           <i class="fas fa-fingerprint" style="font-size:120PX"></i>
                       </div>
                       <button v-if="!isLoading" class="btn btn-outline-light px-5 px-2" @click="submitVote(seectedCandidtae)">
                           Vote
                       </button>
                       <button v-if="isLoading" class="btn btn-outline-light px-5 px-2">
                           <span class="spinner-border spinner-border-sm"></span>...submitting
                       </button>
                   </div>
                    <img class="img-fluid" :src="seectedCandidtae.image" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{seectedCandidtae.name}}</h5>
                        <p class="card-text">{{seectedCandidtae.title}}</p>
                    </div>
                    <div class="card-footer text-light" :style="`background-color:${seectedCandidtae.color}`">
                        {{seectedCandidtae.team}}
                    </div>
                </div>
           </div>
       </div>
    </div> 
</div>
</template>

<script>
import { parse } from 'querystring'
import toasterMixin from '../mixins/toastermixin'

const $ = require('jquery')
export default {
    data() {
        return {
              seectedCandidtae:{},
              showCandidate:false,
              isLoading: false,
              key:null,
              success:false,
        users: [
        {
          name:'Adjoa Frimpong',
          title:'Adjoa the leader',
          team: 'Blue team',
          image:require('../assets/imageOne.jpeg'),
          color:'blue',
          vote_name: 'adjoa'
        },
         {
          name:'Kofi Mensah',
          title:'Adjoa the leader',
          team: 'Royal team',
          image:require('../assets/imageTwo.jpeg'),
          color:'#581845 ',
          vote_name:'kofi'
        },
         {
          name:'Abdul-Malik Musah',
          title:'Adjoa the leader',
          team: 'Margenta team',
          image:require('../assets/imageThree.jpeg'),
          color:'#C70039 ',
          vote_name:'malik'
        },
         {
          name:'Owusu Bismark',
          title:'Adjoa the leader',
          team: 'Gold team',
          image:require('../assets/imageFour.jpeg'),
          color:'gold',
          vote_name:'owusu'
        }
      ]
    }
    },
    methods: {
        submitVote(data) {
            const self = this
            this.isLoading = true
            const user = Number(localStorage.getItem('loginUser'))
            const vote = data.vote_name
            const presidents = JSON.parse(localStorage.getItem('presidents'))

            // keeping track of voters
             if(!user) {
                this.isLoading = false
                alert('Please create account or login before you can vote')
                return
            }

            if(!localStorage.getItem('voters')) {
                localStorage.setItem('voters',JSON.stringify([user]))
                for(let i = 0; i <= presidents.length; i++) {
                    if(i === this.key) {
                        presidents[i].votes += 1
                    }
                }

                localStorage.setItem('presidents',JSON.stringify(presidents))

                setTimeout(function(){
                    self.isLoading = false
                    self.showCandidate = false
                    self.success = true
                    
                    setTimeout(function() {
                        localStorage.setItem('currentPage','vice_president')
                        self.$router.replace('/vote/vice_president')
                    },3000)

                },1000)
            } else {
                const oldVoters = JSON.parse(localStorage.getItem('voters'))
                const newArray = [user]

                if(oldVoters && oldVoters.length === 1) {
                    if(oldVoters[0] == user) {
                        alert(`You can't vote more than one`)
                        self.isLoading = false;
                        return
                    }
                }
                if(!oldVoters.find(number => number == user)) {
                    alert(`You can't vote more than one`)
                    return
                }
                const newVoters = [...oldVoters,...newArray]
                localStorage.setItem('voters', JSON.stringify(newVoters))
              
                // ADDING NEW DATA TO DATABASE
                for(let i = 0; i <= presidents.length; i++) {
                    if(i === this.key) {
                        presidents[i].votes += 1
                    }
                }

                localStorage.setItem('presidents',JSON.stringify(presidents))

                  setTimeout(function(){
                    self.isLoading = false
                    self.showCandidate = false
                    self.success = true
                    
                    setTimeout(function() {
                        localStorage.setItem('currentPage','vice_president')
                        self.$router.replace('/vote/vice_president')
                    },3000)

                },1000)

                 
               

            }
    

            
        },
        getSelectedCandidate(user, key) {
            this.seectedCandidtae = user
            this.key = key
            this.showCandidate = true
         }
    },
    mounted() {
        window.scrollTo(0, 0);
        $(".top-card").hover(
            function () {
                $(this).children(".setOverlay").addClass('overlay');
            }, 
            function () {   
                $(this).children(".setOverlay").removeClass('overlay');
            }
            );

    }
}
</script>


<style lang="scss">
    .card{
        border-radius:20px;
        box-shadow: 4px 4px solid #000;
        height: 400px;
        margin-top:20px;
    }
    .card:hover{
     cursor: pointer;
    }
    .card-footer{
        border-bottom-right-radius: 20px !important;
        border-bottom-left-radius: 20px !important;
    }
    img{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    .overlay {  
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width:100%;
        z-index: 2;
        background: rgba(39, 42, 43, 0.8);
        transition: opacity 200ms ease-in-out;
        border-radius: 4px;
        opacity: 1;
        border-radius: 20px;
    
        }
</style>