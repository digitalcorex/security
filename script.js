const terminal = document.getElementById("terminal");
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const glitchScreen = document.getElementById("glitchScreen");
const glitchGif = document.getElementById("glitchGif");

let index = 0;

const steps=[
 {text:"Connecting to your device...",progress:true},
 {text:"Connection successful.",progress:false},
 {text:"Breaking through security...",progress:true},
 {text:"Security disabled...",progress:false},
 {text:"Finding your IP address...",progress:true},
 {text:"IP address found: 192.168.43.217",progress:false},
 {text:"Getting full access...",progress:true},
 {text:"ACCESS GRANTED",progress:false},
 {text:"YOU HAVE BEEN HACKED!",hack:true},
 {text:"HAHA. Got you. Were you scared?",final:true}
];

/* CLICK START */
startBtn.onclick = function(){
  startScreen.style.display = "none";
  showSpinner();
};

function showSpinner(){
  const spinner = document.createElement("div");
  spinner.className = "scannerWhite";
  terminal.appendChild(spinner);

  setTimeout(()=>{
    spinner.remove();
    showGlitch();
  },3000);
}

function showGlitch(){
  glitchScreen.style.display = "flex";
  glitchGif.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXhnMGpzbzh6ZzIxNHZqOWRsd3lidnBheG85eW4weTY3MDNjbWI2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPlCroSFHV8uoko/giphy.gif";
  
  setTimeout(()=>{
    glitchScreen.style.display = "none";
    next();
  },3000);
}

function typeLine(text,callback){
  terminal.innerHTML="";
  let div=document.createElement("div");
  div.className="line";
  terminal.appendChild(div);
  let i=0;

  function type(){
    if(i<text.length){
      div.textContent+=text[i];
      i++;
      setTimeout(type,40);
    }else{
      callback(div);
    }
  }
  type();
}

function showProgress(callback){
  let p=document.createElement("div");
  p.className="progress";
  terminal.appendChild(p);
  let percent=0;

  function run(){
    if(percent<=100){
      p.textContent=percent+"%";
      percent++;
      setTimeout(run,20);
    }else{
      callback();
    }
  }
  run();
}

function fadeNext(){
  terminal.firstChild.style.opacity="0";
  setTimeout(()=>{
    index++;
    next();
  },800);
}

function next(){
  if(index>=steps.length) return;
  let step = steps[index];

  typeLine(step.text,(line)=>{
    if(step.progress){
      showProgress(()=>fadeNext());
    }
    else if(step.hack){
      line.classList.add("fadeBlink");
      setTimeout(()=>{
        index++;
        next();
      },4000);
    }
    else if(step.final){
      setTimeout(()=>{
        document.body.style.background="black";
        terminal.innerHTML="";
      },3000);
    }
    else{
      setTimeout(fadeNext,1000);
    }
  });
}