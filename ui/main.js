console.log('Loaded!');
//move drago
var img=document.getElementById("drago");
var marginleft=0;
    function moveright(){
        marginleft=marginleft+1;
        img.style.marginleft='100';
    }
    img.onclick=function(){
  var intervel=SetIntervel(moveright,50);  
};