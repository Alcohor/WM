import Vue from 'vue'

Vue.filter('getImgUrl',(fakeUrl)=>{
    
    let url  = fakeUrl.replace(/w\.h/,'128.180')
    return url
})