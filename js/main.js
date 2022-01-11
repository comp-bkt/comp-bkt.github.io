/*eslint-env es6*/
/*eslint-env es7*/
/*global window */
/*global document */
/*global alert */

window.addEventListener('DOMContentLoaded', scrollToTop(), false);

function scrollToTop() {
   const btnToTop = document.getElementById("btnToTop");
   btnToTop.onclick = function () {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
   }
}

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function () {
   scrollFunction()
};

function scrollFunction() {
   const btnToTop = document.getElementById("btnToTop");
   if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      btnToTop.style.display = "block";
   } else {
      btnToTop.style.display = "none";
   }
}

window.addEventListener('DOMContentLoaded', toggleNav(), false);

function toggleNav() {
   const nav_panel = document.getElementById('nav-panel');
    nav_panel.style.display = "block";
   document.getElementById('toggle-nav').addEventListener("click", function () {

      nav_panel.style.display =
         nav_panel.style.display == "" ? "block" : "";
      window.scrollTo(0, 0);

   });
}

window.addEventListener('DOMContentLoaded', setDayTheme(), false);

function setDayTheme() {
   const day = document.getElementById('day');
   day.onclick = function () {
      const bodyRoot = document.getElementById('body-root');
      const classes = bodyRoot.classList;
      classes.replace('high-contrast', 'day');
      classes.replace('night', 'day');
   }
}

window.addEventListener('DOMContentLoaded', setNighTheme(), false);

function setNighTheme() {
   const night = document.getElementById('night');
   night.onclick = function () {
      const bodyRoot = document.getElementById('body-root');
      const classes = bodyRoot.classList;
      classes.replace('high-contrast', 'night');
      classes.replace('day', 'night');
   }
}

window.addEventListener('DOMContentLoaded', setHighContrastTheme(), false);

function setHighContrastTheme() {
   const highContrast = document.getElementById('high-contrast');
   highContrast.onclick = function () {
      const bodyRoot = document.getElementById('body-root');
      const classes = bodyRoot.classList;
      classes.replace('night', 'high-contrast');
      classes.replace('day', 'high-contrast');
   }
}

window.addEventListener('DOMContentLoaded', addArticleListeners('nav-main'), false);
window.addEventListener('DOMContentLoaded', addArticleListeners('navbar'), false);

function addArticleListeners(elementId) {

   /**
    * set event listeners for main nav
    **/
   // set listeners for speakIt notes in the article
   const element = document.getElementById(elementId);
   const articles = element.querySelectorAll('[data-article]');
   for (const article of articles) {

      if (0 !== article.dataset.article.length) {

         article.addEventListener('click', function (e) {
            showArticle(e.target.dataset.article);
         });

      } else {
         alert("oops! this should not happen. Include a message for article not found!!!");
      }

   }
}

showArticle('home-page');

function showArticle(articleId) {
   // from hidden section getElementById and clone and replace article placeholder
   let article = document.getElementById(articleId).cloneNode(true);

   article = setAssets(article);

   // replace the article-container with selected article
   document.getElementById('article-container')
      .replaceChild(article, document.querySelector('#article-container > article'));
   // add listeners
   addArticleListeners(articleId);
   addSpeachListeners(articleId);

   window.scrollTo(0, 0);

}

// for offline assets

/*global navigator */
function setAssets(article) {
   const imagesData = article.querySelectorAll('[data-image]');
   for (const imageData of imagesData) {

      let src = '';
      navigator.onLine ? src = imageData.dataset.cdnSrc : src = imageData.dataset.localSrc;

      const image = document.createElement("img");
      image.src = src;
      image.alt = imageData.dataset.image;
      image.className = imageData.dataset.class;

      const parentDiv = imageData.parentNode;
      parentDiv.replaceChild(image, imageData);
   }

   return article;
}

/*global speechSynthesis */
window.addEventListener('DOMContentLoaded', addSpeachListeners('nav-main'), false);
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
   speechSynthesis.onvoiceschanged = populateVoiceList;
}

function addSpeachListeners(elementId) {
   const ele = document.getElementById(elementId);
   const speeches = ele.querySelectorAll("svg[data-speak='true']");

   for (const speech of speeches) {
      speech.addEventListener(speech.dataset.event, function () {
         speakIt(document.getElementById(speech.dataset.speakId).innerText);
      })
   }
}

/*global SpeechSynthesisUtterance */
function speakIt(message) {
   const msg = new SpeechSynthesisUtterance(message);
   const voices = window.speechSynthesis.getVoices();
   msg.voice = voices[document.querySelector("select#voiceSelect").selectedIndex];
   window.speechSynthesis.speak(msg);
}

function populateVoiceList() {

   if (typeof speechSynthesis === 'undefined') {
      return;
   }

   const voices = speechSynthesis.getVoices();

   for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      if (voices[i].default) {
         option.textContent += ' *';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      //document.getElementById("voiceSelect").appendChild(option);
   }
}



const mobileWidth = 667;


//const minWidth = 600;

window.addEventListener("resize", handleResize);

function handleResize() {

   if (document.documentElement.clientWidth > mobileWidth) {     


   } else {
      
   }


}
