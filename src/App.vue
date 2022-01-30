<template>
  <div id="app">
    
    <app-nav>
    </app-nav>
    <div class="container">
     
     <router-view/>
    </div>
  </div>

</template>

<script>
import Nav from './components/Nav'


export default{
 name : "App",
 components : {

   appNav : Nav

 }
}
</script>

<style>
body{
  background-color: rgb(103, 90, 116) 
}
.container {
  margin-bottom: 1rem;
}

.form-wrapper{
  border-radius: 7px;
  
}

.error-message li{
  list-style: none;
  width: 100%;
  text-align: center;
}
.error-message ul{
  padding-left: 0;
  margin-bottom: 0;
}

@media (max-width: 768px){

  body {
    background: url(./assets/images/BKG_IMAGE.png) no-repeat center center fixed;
    background-size: cover;
  }
  .form-wrapper .text-right{
    text-align: center !important;
  }
  .logo{
    width:200px;
    margin: 1rem auto;
    height:200px;
   
  }
  img{
    width:200px;
    height:200px;
  }

  .form-wrapper .btn-primary{
    display: block;
    margin: 0 auto;
  }
}
</style>