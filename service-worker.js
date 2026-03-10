<!DOCTYPE html>

<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1">

<title>VITAL</title>

<link rel="manifest" href="manifest.json">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

body{
font-family:Arial;
background:#111;
color:white;
padding:20px;
}

h1{
text-align:center;
}

.card{
background:#222;
padding:15px;
margin-bottom:20px;
border-radius:10px;
}

.exercise{
margin-bottom:10px;
}

.meal{
background:#333;
padding:10px;
margin-top:10px;
border-radius:8px;
}

input{
padding:5px;
margin-top:5px;
}

button{
padding:8px;
margin-top:10px;
background:#4CAF50;
border:none;
border-radius:5px;
color:white;
}

</style>

</head>

<body>

<h1>🏋️ VITAL</h1>

<div class="card" id="workout"></div>

<div class="card" id="diet"></div>

<div class="card">
<h2>⏱ Timer recupero</h2>
<p id="timer">Pronto</p>
</div>

<div class="card">
<h2>⚖️ Peso corporeo</h2>
<input type="number" id="bw" placeholder="peso kg">
<button onclick="saveBodyWeight()">Salva</button>
</div>

<div class="card">
<h2>📊 Progressione carichi</h2>
<canvas id="chart"></canvas>
</div>

<div class="card">
<h2>📅 Storico allenamenti</h2>
<div id="history"></div>
</div>

<script>

const workouts = {

1:{
name:"Full Body A",
ex:[
{id:1,n:"Chest Press inclinata",s:"4x6-8"},
{id:2,n:"Lat Machine neutra",s:"4x8-10"},
{id:3,n:"Leg Press",s:"3x8-10"},
{id:4,n:"Rematore macchina",s:"3x8-10"},
{id:5,n:"Alzate laterali",s:"3x12-15"},
{id:6,n:"Pallof Press",s:"3x12"}
]
},

2:{
name:"Cardio Zona 2",
ex:[
{id:20,n:"Camminata veloce o cyclette",s:"45-60 min"}
]
},

3:{
name:"Full Body B",
ex:[
{id:7,n:"Lat Machine larga",s:"4x6-8"},
{id:8,n:"Chest Press",s:"3x8-10"},
{id:9,n:"Hack Squat",s:"3x8"},
{id:10,n:"Hip Thrust",s:"3x10"},
{id:11,n:"Reverse Pec Deck",s:"3x15"},
{id:12,n:"Side Plank",s:"3x40 sec"}
]
},

5:{
name:"Interval Training",
ex:[
{id:21,n:"30 sec veloce + 90 sec lento",s:"x8"}
]
},

6:{
name:"Full Body C",
ex:[
{id:13,n:"Chest Press",s:"3x10"},
{id:14,n:"Pulley basso",s:"3x10"},
{id:15,n:"Leg Curl",s:"3x12"},
{id:16,n:"Leg Extension",s:"3x12"},
{id:17,n:"Shoulder Press",s:"3x8-10"},
{id:18,n:"Bird Dog",s:"3x10"}
]
}

}

const diet = {

1:{
colazione:"60g pane tostato + 2 cucchiaini olio",
spuntino:"10g frutta secca",
pranzo:"70g carbo + 1 uovo + 150g albume + verdura",
merenda:"50g prosciutto magro",
cena:"70g carbo + 200g carne bianca + verdura"
},

2:{
colazione:"150g yogurt greco + 50g cereali",
spuntino:"10g frutta secca",
pranzo:"50g carbo + 200g piselli",
merenda:"20g parmigiano",
cena:"70g carbo + 200g carne rossa"
},

3:{
colazione:"60g pane + 100g albume",
spuntino:"10g frutta secca",
pranzo:"70g carbo + 30g parmigiano",
merenda:"50g bresaola",
cena:"70g carbo + 200g carne bianca"
},

4:{
colazione:"60g pane + prosciutto",
spuntino:"10g frutta secca",
pranzo:"50g carbo + 200g legumi",
merenda:"yogurt greco",
cena:"70g carbo + 1 uovo + 150g albume"
},

5:{
colazione:"60g pane + albume",
spuntino:"10g frutta secca",
pranzo:"70g carbo + parmigiano",
merenda:"prosciutto",
cena:"70g carbo + carne bianca"
},

6:{
colazione:"60g pane + olio",
spuntino:"10g frutta secca",
pranzo:"70g carbo + uovo + albume",
merenda:"yogurt",
cena:"70g carbo + carne bianca"
},

0:{
colazione:"pane + albume",
spuntino:"frutta secca",
pranzo:"50g carbo + carne bianca",
merenda:"frutta secca",
cena:"PASTO LIBERO"
}

}

const today=new Date().getDay()

const workoutDiv=document.getElementById("workout")

if(workouts[today]){

let html="<h2>"+workouts[today].name+"</h2>"

workouts[today].ex.forEach(e=>{

let saved=localStorage.getItem("w"+e.id)||""

html+=`

<div class="exercise">

<input type="checkbox" onclick="timer()">

<b>${e.n}</b> ${e.s}

<br>

Peso <input type="number" value="${saved}" onchange="saveWeight(${e.id},this.value)">

</div>

`

})

html+=`<button onclick="saveWorkout()">Allenamento completato</button>`

workoutDiv.innerHTML=html

}else{

workoutDiv.innerHTML="<h2>Riposo</h2>"

}

const d=diet[today]

document.getElementById("diet").innerHTML=`

<h2>🥗 Dieta</h2>

<div class="meal"><b>Colazione</b><br>${d.colazione}</div>

<div class="meal"><b>Spuntino</b><br>${d.spuntino}</div>

<div class="meal"><b>Pranzo</b><br>${d.pranzo}</div>

<div class="meal"><b>Merenda</b><br>${d.merenda}</div>

<div class="meal"><b>Cena</b><br>${d.cena}</div>

`

function saveWeight(id,v){

localStorage.setItem("w"+id,v)

updateChart()

}

function timer(){

let t=90

const el=document.getElementById("timer")

const i=setInterval(()=>{

el.innerText=t+" sec"

t--

if(t<0){

clearInterval(i)

el.innerText="fine recupero"

}

},1000)

}

function saveWorkout(){

let history=JSON.parse(localStorage.getItem("history"))||[]

history.push(new Date().toLocaleDateString())

localStorage.setItem("history",JSON.stringify(history))

loadHistory()

}

function loadHistory(){

let history=JSON.parse(localStorage.getItem("history"))||[]

let html=""

history.slice().reverse().forEach(d=>{

html+="<p>"+d+"</p>"

})

document.getElementById("history").innerHTML=html

}

loadHistory()

function saveBodyWeight(){

let w=document.getElementById("bw").value

let data=JSON.parse(localStorage.getItem("bw"))||[]

data.push(w)

localStorage.setItem("bw",JSON.stringify(data))

alert("peso salvato")

}

const ctx=document.getElementById("chart")

const chart=new Chart(ctx,{
type:"line",
data:{
labels:["1","2","3","4","5","6","7","8"],
datasets:[{
label:"Progressione",
data:[],
borderColor:"lime"
}]
}
})

function updateChart(){

let arr=[]

for(let i=1;i<20;i++){

let v=localStorage.getItem("w"+i)

if(v) arr.push(v)

}

chart.data.datasets[0].data=arr

chart.update()

}

updateChart()

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}

</script>

</body>
</html>
