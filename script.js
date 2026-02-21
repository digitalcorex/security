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
 {gif:true},
 {text:"ACCESS GRANTED",progress:false},
 {text:"YOU HAVE BEEN HACKED!",hack:true},
 {text:"HAHA. Got you. Were you scared?",final:true}
];

startBtn.onclick = function(){
  startScreen.style.display = "none";
  showScanBox();
};

/* SCAN LOADING */
function showScanBox(){
  terminal.innerHTML = "";

  const box = document.createElement("div");
  box.className = "scanBox";

  const fill = document.createElement("div");
  fill.className = "scanFill";

  const percentText = document.createElement("div");
  percentText.className = "scanPercent";

  box.appendChild(fill);
  terminal.appendChild(box);
  terminal.appendChild(percentText);

  let percent = 0;

  function load(){
    percent++;
    fill.style.width = percent + "%";
    percentText.textContent = percent + "%";

    if(percent < 70){
      setTimeout(load,25);
    }
    else if(percent < 99){
      setTimeout(load,120);
    }
    else if(percent === 99){
      setTimeout(load,2000);
    }
    else if(percent < 100){
      setTimeout(load,150);
    }
    else{
      setTimeout(()=>{ next(); },600);
    }
  }

  load();
}

/* TYPE EFFECT */
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

/* HACK PROGRESS */
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

/* MAIN SEQUENCE */
function next(){
  if(index>=steps.length) return;
  let step = steps[index];

  if(step.gif){
    terminal.innerHTML="";
    const img = document.createElement("img");
    img.className = "fullScreenGif";
    img.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjMzMWMzdTQ1aGh4ZHRqdjUycGtuemdqcGFiNWVuZDB5ODVnYTMxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12W5Sg2koWYnwA/giphy.gif";
    terminal.appendChild(img);

    setTimeout(()=>{
      terminal.innerHTML="";
      index++;
      next();
    },3000);

    return;
  }

  typeLine(step.text,(line)=>{
    if(step.progress){
      showProgress(()=>{
        index++;
        next();
      });
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
        terminal.innerHTML="";
      },3000);
    }
    else{
      setTimeout(()=>{
        index++;
        next();
      },1000);
    }
  });
}