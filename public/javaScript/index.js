

  const navSlide=()=>{
    const burger=document.querySelector('.burger');
    const nav=document.querySelector('.nav-links');
    const navLinks=document.querySelectorAll('.nav-links li');
    
burger.addEventListener('click',()=>{
  nav.classList.toggle('nav-active');


navLinks.forEach((link,indeex)=>{
  if(link.style.animation){
    link.style.animation='';
  }else{
    var i=0;
    i=indeex/7 +0.3;
 link.style.animation='navLinkFade 0.5s ease forwards '+ i+'s';
}
 

});

  burger.classList.toggle('toggle');
}); 

}
  

  navSlide();
