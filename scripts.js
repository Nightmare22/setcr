/*##########
# Vorlagen #
############*/
class Thruster {  
  constructor(name, force, fuel, mass, unit) {
    this._name = name;
    this._force = force;
    this._fuel = fuel;
    this._mass = mass;
    this._unit = unit;
  }
  
  getEffectiveForce() {
    let acceleration = 9.81;
    let ownNeededForce = this._mass * acceleration / 1000;
    let effectiveForce = this._force - ownNeededForce
    return effectiveForce;
  }

  get fuelConsumtion() {
    return this._fuel;
  }

  get unit(){
    return this._unit;
  }

  get name() {
    return this._name;
  }
}

/*##############
# Definitionen #
################*/
lLargeThrusters = [
  new Thruster("Large Atmospheric Thruster", 6480, 16.8, 32970, "MW"),
  new Thruster("Large Hydrogen Thruster", 7200, 4820, 6940, "L/s"),
  new Thruster("Large ION Thruster", 4320, 33.6, 43200, "MW")
];
lSmallThrusters = [
  new Thruster("Atmospheric Thruster", 648, 2.4, 4000, "MW"),
  new Thruster("Hydrogen Thruster", 1080, 803, 1420, "L/s"),
  new Thruster("ION Thruster", 345.6, 3.36, 4380, "MW")
];
sLargeThrusters = [
  new Thruster("Large Atmospheric Thruster", 576, 2.4, 2948, "MW"),
  new Thruster("Large Hydrogen Thruster", 480, 386, 1222, "L/s"),
  new Thruster("Large ION Thruster", 172.8, 2.4, 721, "MW")
];
sSmallThrusters = [
  new Thruster("Atmospheric Thruster", 96, 0.6, 699, "MW"),
  new Thruster("Hydrogen Thruster", 98.6, 80, 334, "L/s"),
  new Thruster("ION Thruster", 14.4, 0.2, 121, "MW")
];


/*##################
#   Ui Kontrolle   #
####################*/
function alterPlanetCaption() {
  gravity = document.getElementById("planets").value;
  planetCaption = document.getElementById("planetCaption");
  if(gravity >= 0.25 && gravity < 0.9){
    planetCaption.innerText = "Moon / Europa / Titan (" + gravity + " G)";
  }
  else if (gravity >= 0.9 && gravity < 1){
    planetCaption.innerText = "Mars (" + gravity + " G)";
  }
  else if(gravity >= 1 && gravity < 1.1) {
    planetCaption.innerText = "Earth / Triton (" + gravity + " G)";
  }
  else if (gravity >= 1.1 && gravity < 1.2) {
    planetCaption.innerText = "Alien (" + gravity + " G)";
  }
  else if (gravity >= 1.2) {
    planetCaption.innerText = "Pertam (" + gravity + " G)";
  }
  calculate();
}

function readGridSize() {
  if(document.getElementsByName("gridSizeSelection").item(0).checked == true) {
    return "large";
  }
  else {
    return "small";
  }  
}


/*##################
#   Calculation    #
####################*/
function getMathamatics(force, large, small) {
  largeAtmosphericCount = force / large[0].getEffectiveForce();
  largeAtmosphericCount = Math.floor(largeAtmosphericCount);

  smallAtmosphericCount = force % large[0].getEffectiveForce();
  smallAtmosphericCount = smallAtmosphericCount / small[0].getEffectiveForce();
  smallAtmosphericCount = Math.ceil(smallAtmosphericCount);
 
  largeHydrogenCount = force / large[1].getEffectiveForce();
  largeHydrogenCount = Math.floor(largeHydrogenCount);

  smallHydrogenCount = force % large[1].getEffectiveForce();
  smallHydrogenCount = smallHydrogenCount / small[1].getEffectiveForce();
  smallHydrogenCount = Math.ceil(smallHydrogenCount); 

  largeIonCount = force / large[2].getEffectiveForce();
  largeIonCount = Math.floor(largeIonCount);

  smallIonCount = force % large[2].getEffectiveForce();
  smallIonCount = smallIonCount / small[2].getEffectiveForce();
  smallIonCount = Math.ceil(smallIonCount); 
  return [largeAtmosphericCount, smallAtmosphericCount, largeHydrogenCount, smallHydrogenCount, largeIonCount, smallIonCount];
}

/*##################
#  Hauptfunktionen # 
####################*/
function calculate() {
  // Eingabe
  let buffer = document.getElementById("buffer").value;
  let mass = document.getElementById("shipMass").value;
  let gravity = document.getElementById("planets").value;    
  let acceleration = 9.81 * gravity;
  let neededForce = mass * acceleration / 1000;
  let optimalForce = neededForce * (1+(buffer / 100))
  let bufferedForce = optimalForce - neededForce;
  let largeThrusters;
  let smallThrusters;  
  if(readGridSize() == "large") {
    largeThrusters = lLargeThrusters;
    smallThrusters = lSmallThrusters;
  }
  else {
    largeThrusters = sLargeThrusters;
    smallThrusters = sSmallThrusters;
  }  

  let resultNeededForce = document.getElementById("resultNeededForce");
  let resultOptimalForce = document.getElementById("resultOptimalForce");
  let resultBufferedForce = document.getElementById("resultBufferedForce");

  let resultLargeAtmosphericThrusterCount = document.getElementById("resultLargeAtmosphericThrusterCount");
  let resultLargeHydrogenThrusterCount = document.getElementById("resultLargeHydrogenThrusterCount");
  let resultLargeIonThrusterCount = document.getElementById("resultLargeIonThrusterCount");
  let resultSmallAtmosphericThrusterCount = document.getElementById("resultSmallAtmosphericThrusterCount");
  let resultSmallHydrogenThrusterCount = document.getElementById("resultSmallHydrogenThrusterCount");
  let resultSmallIonThrusterCount = document.getElementById("resultSmallIonThrusterCount");
  let resultFlatLargeAtmosphericThrusterCount = document.getElementById("resultFlatLargeAtmosphericThrusterCount");
  let resultFlatSmallAtmosphericThrusterCount = document.getElementById("resultFlatSmallAtmosphericThrusterCount");

  let resultLargeAtmosphericThrusterCountNavigate = document.getElementById("resultLargeAtmosphericThrusterCountNavigate");
  let resultLargeHydrogenThrusterCountNavigate = document.getElementById("resultLargeHydrogenThrusterCountNavigate");
  let resultLargeIonThrusterCountNavigate = document.getElementById("resultLargeIonThrusterCountNavigate");
  let resultSmallAtmosphericThrusterCountNavigate = document.getElementById("resultSmallAtmosphericThrusterCountNavigate");
  let resultSmallHydrogenThrusterCountNavigate = document.getElementById("resultSmallHydrogenThrusterCountNavigate");
  let resultSmallIonThrusterCountNavigate = document.getElementById("resultSmallIonThrusterCountNavigate");
  let resultFlatLargeAtmosphericThrusterCountNavigate = document.getElementById("resultFlatLargeAtmosphericThrusterCountNavigate");
  let resultFlatSmallAtmosphericThrusterCountNavigate = document.getElementById("resultFlatSmallAtmosphericThrusterCountNavigate");
  
  let thrusterCounts = getMathamatics(optimalForce, largeThrusters, smallThrusters);

  let largeAtmosphericCount = thrusterCounts[0];
  let smallAtmosphericCount = thrusterCounts[1];
  let largeHydrogenCount = thrusterCounts[2];
  let smallHydrogenCount = thrusterCounts[3];
  let largeIonCount = thrusterCounts[4];
  let smallIonCount = thrusterCounts[5];

  // Verarbeitung //
  neededForce = Math.ceil(neededForce);
  optimalForce = Math.ceil(optimalForce);
  bufferedForce = Math.ceil(bufferedForce);  

  // Ausgabe //
  resultNeededForce.innerText = neededForce;
  resultOptimalForce.innerText = optimalForce;
  resultBufferedForce.innerText = bufferedForce ; 

  resultLargeAtmosphericThrusterCount.innerText = largeAtmosphericCount;
  resultLargeHydrogenThrusterCount.innerText = largeHydrogenCount;
  resultLargeIonThrusterCount.innerText = largeIonCount;
  resultSmallAtmosphericThrusterCount.innerText = smallAtmosphericCount;
  resultSmallHydrogenThrusterCount.innerText = smallHydrogenCount;
  resultSmallIonThrusterCount.innerText = smallIonCount;
  resultFlatLargeAtmosphericThrusterCount.innerText = largeAtmosphericCount * 3;
  resultFlatSmallAtmosphericThrusterCount.innerText = smallAtmosphericCount * 3;

  thrusterCounts = getMathamatics(bufferedForce, largeThrusters, smallThrusters);

  largeAtmosphericCount = thrusterCounts[0];
  smallAtmosphericCount = thrusterCounts[1];
  largeHydrogenCount = thrusterCounts[2];
  smallHydrogenCount = thrusterCounts[3];
  largeIonCount = thrusterCounts[4];
  smallIonCount = thrusterCounts[5];

  resultLargeAtmosphericThrusterCountNavigate.innerText = largeAtmosphericCount;
  resultLargeHydrogenThrusterCountNavigate.innerText = largeHydrogenCount;
  resultLargeIonThrusterCountNavigate.innerText = largeIonCount;
  resultSmallAtmosphericThrusterCountNavigate.innerText = smallAtmosphericCount;
  resultSmallHydrogenThrusterCountNavigate.innerText = smallHydrogenCount;
  resultSmallIonThrusterCountNavigate.innerText = smallIonCount;
  resultFlatLargeAtmosphericThrusterCountNavigate.innerText = largeAtmosphericCount * 3;
  resultFlatSmallAtmosphericThrusterCountNavigate.innerText = smallAtmosphericCount * 3;
}