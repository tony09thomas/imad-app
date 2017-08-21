console.log('Loaded!');
//move drago
var img=document.getElementById("drago");
var marginleft=0;
    function moveright(){
        marginleft=marginleft+10;
        img.style.marginleft=marginleft+'px';
    }
    img.onclick=function(){
  var intervel=SetIntervel(moveright,100);  
};