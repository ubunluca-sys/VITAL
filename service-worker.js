<!DOCTYPE html>

<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#111111">

<title>VITAL</title>

<link rel="manifest" href="manifest.json">

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
margin-bottom:8px;
}

.meal{
background:#333;
padding:10px;
margin-top:10px;
border-radius:8px;
}

</style>

</head>

<body>

<h1>🏋️ VITAL</h1>

<div class="card" id="workout"></div>

<div class="card" id="diet"></div>

<script>

const workouts = {

1:{
name:"Full Body A",
ex:[
"Chest Press inclinata — 4×6-8 RIR2",
"Lat Machine presa neutra — 4×8-10 RIR2",
"Leg Press — 3×8-10 RIR2",
"Rematore macchina — 3×8-10 RIR2",
"Alzate laterali — 3×12-15 RIR1",
"Pallof Press — 3×12 per lato"
]
},

2:{
name:"Cardio Zona 2",
ex:[
"45-60 min camminata veloce oppure cyclette"
]
},

3:{
name:"Full Body B",
ex:[
"Lat Machine presa larga — 4×6-8 RIR2",
"Chest Press orizzontale — 3×8-10 RIR2",
"Hack Squat — 3×8 RIR3",
"Hip Thrust — 3×10 RIR3",
"Reverse Pec Deck — 3×15 RIR1",
"Side Plank — 3×30-40 sec per lato"
]
},

5:{
name:"Interval Training",
ex:[
"5 min riscaldamento",
"30 sec veloce + 90 sec lento ×8",
"5 min defaticamento"
]
},

6:{
name:"Full Body C",
ex:[
"Chest Press — 3×10 RIR2",
"Pulley basso — 3×10 RIR2",
"Leg Curl — 3×12 RIR1",
"Leg Extension — 3×12 RIR1",
"Shoulder Press — 3×8-10 RIR2",
"Bird Dog — 3×10 per lato"
]
}

}

const diet = {

1:{
colazione:"60g pane tostato + 2 cucchiaini olio",
spuntino:"10g frutta secca",
pranzo:"Verdura + 70g carbo + 1 uovo + 150g albume",
merenda:"50g prosciutto magro",
cena:"Verdura + 70g carbo + 200g carne bianca"
},

2:{
colazione:"150g yogurt greco + 50g cereali",
spuntino:"10g frutta secca",
pranzo:"50g carbo + 200g piselli",
merenda:"20g parmigiano",
cena:"Verdura + 70g carbo + 200g carne rossa"
},

3:{
colazione:"60g pane + 100g albume",
spuntino:"10g frutta secca",
pranzo:"70g carbo + 30g parmigiano",
merenda:"50g bresaola",
cena:"Verdura + 70g carbo + 200g carne bianca"
},

4:{
colazione:"60g pane + prosciutto",
spuntino:"10g frutta secca",
pranzo:"50g carbo + 200g legumi",
merenda:"150g yogurt greco",
cena:"Verdura + 70g carbo + 1 uovo + 150g albume"
},

5:{
colazione:"60g pane + albume",
spuntino:"10g frutta secca",
pranzo:"70g carbo + parmigiano",
merenda:"prosciutto magro",
cena:"Verdura + 70g carbo + carne bianca"
},

6:{
colazione:"60g pane + olio",
spuntino:"10g frutta secca",
pranzo:"70g carbo + uovo + albume",
merenda:"yogurt greco",
cena:"Verdura + 70g carbo + carne bianca"
},

0:{
colazione:"pane + albume",
spuntino:"frutta secca",
pranzo:"50g carbo + carne bianca",
merenda:"frutta secca",
cena:"PASTO LIBERO"
}

}

const today = new Date().getDay()

const workoutDiv = document.getElementById("workout")

if(workouts[today]){

let html = "<h2>"+workouts[today].name+"</h2>"

workouts[today].ex.forEach(e=>{
html += "<div class='exercise'>"+e+"</div>"
})

workoutDiv.innerHTML = html

}else{

workoutDiv.innerHTML = "<h2>Riposo</h2>"

}

const d = diet[today] || diet[1]

document.getElementById("diet").innerHTML =

"<h2>🥗 Dieta</h2>"+

"<div class='meal'><b>Colazione</b><br>"+d.colazione+"</div>"+

"<div class='meal'><b>Spuntino</b><br>"+d.spuntino+"</div>"+

"<div class='meal'><b>Pranzo</b><br>"+d.pranzo+"</div>"+

"<div class='meal'><b>Merenda</b><br>"+d.merenda+"</div>"+

"<div class='meal'><b>Cena</b><br>"+d.cena+"</div>"

</script>

</body>
</html>
