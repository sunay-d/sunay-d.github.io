const aboutMeBtns = document.querySelectorAll(".link");
const aboutMeContent = document.querySelectorAll(".aboutMeContent");
let activeContent = document.querySelector(".whoAmI");

for (let i=0; i<4; i++){
  let btn = aboutMeBtns[i];
  let content = aboutMeContent[i];
  btn.onclick = function(){
    activeContent.style.visibility = "hidden";
    activeContent.style.fontSize = 0; 
    activeContent = content;
    
    activeContent.style.visibility = "visible";
    activeContent.style.fontSize = "1rem"; 
    console.log(activeContent)
  }
}