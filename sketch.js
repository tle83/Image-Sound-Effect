var title = "Instruments"
var synth, synth2;
var mSynth, fmSynth;
var plucky;
var polyS;

function setup(){
	createCanvas(640, 400);

	synth = new Tone.Synth({
		oscillator:{
			type:"triangle"
		},
		envelope:{
			attack:0.005,
			decay:0.1,
			sustain:0.3,
			release:1
		}
	}).toMaster();

	synth.envelope.attack = 2;
	synth2 = new Tone.Synth().toMaster();

	synth.triggerAttackRelease('C4', 3);
	synth2.triggerAttackRelease('G4', '4n', +1, 0.5);

	mSynth = new Tone.MonoSynth({
	"oscillator" : {
		"type" : "square"
	 },
 		"envelope" : {
 		"attack" : 0.7
 	}}).toMaster();

	fmSynth = new Tone.FMSynth().toMaster();
	fmSynth.modulationIndex.value = 20;
	fmSynth.harmonicity.value = 5;

	plucky = new Tone.PluckSynth().toMaster();

	polyS = new Tone.PolySynth(6, Tone.Synth).toMaster();
	polyS.set("detune", -1200);
}

function draw(){
	fill(100);
	rect(0, 0, width, height);
	fill(255);
	textSize(20);
	textAlign(10, 10);
	text(title, 50, 50);

	var mx = mouseX / width;
	fmSynth.harmonicity.value = mx * 8.0;
	var my = mouseY / height;
	plucky.dampening.value = (my * 6000) + 500;
	plucky.resonance.value = mx;
}

function keyPressed(){
	console.log("Key is: ", keyCode);
	//press 1
	if(keyCode == 49){
		mSynth.triggerAttackRelease("C4", "8n");
	}
	//press 2
	else if(keyCode == 50){
		fmSynth.triggerAttackRelease("C5", "4n");
	}
	//press 3
	else if(keyCode == 51){
		plucky.triggerAttack("C4");
	}
	//press 4
	else if(keyCode == 52){
		polyS.triggerAttackRelease(["C4", "E4", "A4"], "4n");
		polyS.triggerAttackRelease(["C4", "F4", "B3"], "4n", "+1");
	}
}