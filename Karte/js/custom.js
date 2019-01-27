//https://deckofcardsapi.com/

var deck_id;
var image;
var prethodna;
var bodovi = 0;
var odgovor;
var dict = {
  "ACE" : 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13
};

Shuffle();

$( "#veca" ).click(function() {
  DrawCard();
  odgovor = "veca";
});

$( "#manja" ).click(function() {
  DrawCard();
  odgovor = "manja";
});

$( "#jednaka" ).click(function() {
  DrawCard();
  odgovor = "jednaka";
});
function Provjeri(sljedeca){
if (prethodna == undefined){
prethodna = sljedeca;
console.log("prethodna:",prethodna);
}
else {
  console.log("prethodna:",prethodna);
  console.log("sljedeca:",sljedeca);
  if (dict[prethodna]>dict[sljedeca]){
    if(odgovor == "manja")
    {
      bodovi +=1;
    }
    else
    {
      bodovi -=1;
    }
  }
  else if (dict[prethodna] < dict[sljedeca]){
    if(odgovor == "veca")
    {
      bodovi +=1;
    }
    else
    {
      bodovi -=1;
    }
  }
  else {
    if (odgovor != "jednaka")
    {
      bodovi -=1;
    }
    else{
      bodovi +=1;
    }
  }
}

prethodna = sljedeca;
$('#bodovi').text(bodovi);
console.log(bodovi);
}




function DrawCard(){
$.getJSON("https://deckofcardsapi.com/api/deck/"+deck_id+"/draw/?count=1",function(){})
.done(function(data) {
  console.log(data);
  image= data.cards[0].image;
  console.log(data.cards[0].image);
  Provjeri(data.cards[0].value)
  //prethodna = data.cards[0].value;
  $('#card').attr('src',image);
} )
}



function Shuffle(){
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",function(){})
.done(function(data){
  console.log(data);
  deck_id=data.deck_id;
  DrawCard();
})

}
