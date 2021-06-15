import Vue from 'vue'
Vue.mixin({
    methods: {
        toast(options){
            let { position = 'top-center',type, duration = 5000, message } = options
            
            this.$toasted.show(message, {
                type:type,
                position:position,
                duration:duration,
                fullWidth:true
            })
        }
    }
})