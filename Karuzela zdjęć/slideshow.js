var DisplayNumber, liczbaZdjec, pierwszeZdjecie, folderZeZdjeciami, rozszerzenieZdjec;








//  U s t a w i e n i a


var liczbaZdjec = 7;
// Tyle ile jest w folderze, który podamy niżej

var pierwszeZdjecie = 1;
// Liczba większa od 0, najlepiej 1

var folderZeZdjeciami = './foto';
//np.:  https://domana.pl/moje/zdjecia

var rozszerzenieZdjec = 'jpg';
// Wszystkie zdjęcia muszą mieć takie samo rozszerzenie


// Wszystkie zdjęcia w folderze ze zdjęciami muszą mieć kolejne nazwy numeryczne np.:
// - 1.jpg
// - 2.jpg
// - 3.jpg
// - 4.jpg








var slideshow = document.querySelector('slideshow-renderer');

// Dynamicznie wstawiamy tyle zdjęć ile zostało podane

var nextItem = 1;
for (var i = 0; i < liczbaZdjec; i++) {
  
  // Div ze zdjęciem
  var item = document.createElement('div');
  item.classList.add('slideshow-slide');
  item.setAttribute('number', nextItem++);
  item.style.display = 'none';
  slideshow.appendChild(item);
  
  // Element img
  var itemimg = document.createElement('img');
  itemimg.classList.add('slideshow-image');
  itemimg.ondragstart = function(){
    return false;
  }
  var imgnum = item.getAttribute('number'); 
  
  // Dynamicznie ustawiamy src zdjęć
  itemimg.src = folderZeZdjeciami+'/'+imgnum+'.'+rozszerzenieZdjec;
  //itemimg.src = 'https://picsum.photos/1920/1080';

  // Dynamicznie ustawiamy alt zdjęć
  itemimg.setAttribute('alt', 'Zdjęcie ' + imgnum);
  
  itemimg.style.width = '100%';
  itemimg.style.height = '100%';
  item.appendChild(itemimg);

  DisplayNumber = pierwszeZdjecie;

}


// Tworzymy funkcję która będzie nam ustawiać style.display zdjęć

function ChangePhoto(number) {
  if (number < liczbaZdjec+1 && number > 0) {
    var photonum = 1
    for (var i = 0; i < liczbaZdjec; i++) {
      document.querySelector('slideshow-renderer .slideshow-slide[number="'+ photonum++ +'"]').style.display = 'none';
    }
    document.querySelector('slideshow-renderer .slideshow-slide[number="'+number+'"]').style.display = 'block';
    DisplayNumber = number;
  } else {
    if (!number < liczbaZdjec+1) {
      var photonum = 1
      for (var i = 0; i < liczbaZdjec; i++) {
        document.querySelector('slideshow-renderer .slideshow-slide[number="'+ photonum++ +'"]').style.display = 'none';
      }
      document.querySelector('slideshow-renderer .slideshow-slide[number="1"]').style.display = 'block';
      DisplayNumber = 1;
    }
    if (!number > 0) {
      var photonum = 1
      for (var i = 0; i < liczbaZdjec; i++) {
        document.querySelector('slideshow-renderer .slideshow-slide[number="'+ photonum++ +'"]').style.display = 'none';
      }
      document.querySelector('slideshow-renderer .slideshow-slide[number="'+liczbaZdjec+'"]').style.display = 'block';
      DisplayNumber = liczbaZdjec;
    }
  }
}


// Tworzymy funkcję do przewijania zdjęć w przód i w tył

function Slide(move) {
  if (move == 'next' || move == 'prev') {
    if (move == 'next') {
      ChangePhoto(DisplayNumber+1);
    }
    if (move == 'prev') {
      ChangePhoto(DisplayNumber-1);
    }
  } else {
    console.error('Użyj: Slide("next"); aby przesunąć o jedno zdjęcie do przodu lub Slide("prev"); aby przesunąć o jedno zdjęcie do tyłu');
  }
}


// Po załadowaniu strony wczytujemy pierwsze zdjęcie, którego numer podany jest w ustawieniach u góry jako: pierwszeZdjecie

window.onload = function() {
  ChangePhoto(DisplayNumber);
}
