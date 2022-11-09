<template>

    <div   class="container-mochila">
        <div class="Mochila" >
            <a target="_blank" href="img_5terre.jpg">
                <img src="https://www.w3schools.com/css/img_5terre.jpg" alt="Cinque Terre" >
            </a>
            <div class="desc">Add a description of the image here</div>
            </div>

            <div class="Mochila">
            <a target="_blank" href="img_forest.jpg">
                <img src="https://www.w3schools.com/css/img_5terre.jpg" alt="Forest" >
            </a>
            <div class="desc">Add a description of the image here</div>
            </div>

            <div class="Mochila">
            <a target="_blank" href="img_lights.jpg">
                <img src="https://www.w3schools.com/css/img_5terre.jpg" alt="Northern Lights" >
            </a>
            <div class="desc">Add a description of the image here</div>
            </div>

            <div class="Mochila">
            <a target="_blank" href="img_mountains.jpg">
                <img src="https://www.w3schools.com/css/img_5terre.jpg" alt="Mountains" >
            </a>
            <div class="desc">Add a description of the image here</div>
            </div>
    
    </div>

</template>

<style scoped>
    .Mochila {
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 140px;
  }
  
 .Mochila:hover {
    border: 1px solid #777;
  }
  
  .Mochila img {
    width: 100%;
    height: auto;
  }
  
  .desc {
    padding: 4px;
    text-align: center;
    font-size: 11px;
  }
  .container-mochila{
    background-color: white;
  }
</style>