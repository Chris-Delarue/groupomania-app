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
  background-image: url("https://www.lenouveleconomiste.fr/wp-content/uploads/2018/03/INTRANET.jpg");
  background-repeat: no-repeat;
  background-size:100%;
  background-position: auto;
  

  
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
    background-image: url("https://www.lenouveleconomiste.fr/wp-content/uploads/2018/03/INTRANET.jpg");
    background-repeat: no-repeat;
    background-size:100%;
    background-position: 5% 12%;
  }
  .form-wrapper .text-right{
    text-align: center !important;
  }
  
  .form-wrapper .btn-primary{
    display: block;
    margin: 0 auto;
  }
}
</style>