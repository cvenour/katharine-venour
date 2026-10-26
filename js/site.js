// Menu: the hamburger opens the slide-in menu; the cross, Escape or a click outside closes it.
var body = document.body;
function setMenu(open) {
  body.classList.toggle('menu-open', open);
  document.querySelector('#panel-one .hamburger').setAttribute('aria-expanded', open);
}
document.querySelectorAll('.hamburger').forEach(function (b) {
  b.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
});
document.querySelector('.overlay').addEventListener('click', function () { setMenu(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); closeBox(); } });

// Lightbox for the photo galleries (links that point at the full-size image).
var links = Array.prototype.slice.call(document.querySelectorAll('a.w-fancybox'));
var box, boxImg, current = 0;
function showBox(i) {
  current = (i + links.length) % links.length;
  boxImg.src = links[current].getAttribute('href');
  box.classList.add('open');
}
function closeBox() { if (box) box.classList.remove('open'); }
if (links.length) {
  box = document.createElement('div');
  box.id = 'lightbox';
  box.innerHTML = '<button class="prev" aria-label="Previous">‹</button><img alt=""><button class="next" aria-label="Next">›</button><button class="close" aria-label="Close">×</button>';
  document.body.appendChild(box);
  boxImg = box.querySelector('img');
  box.querySelector('.prev').onclick = function (e) { e.stopPropagation(); showBox(current - 1); };
  box.querySelector('.next').onclick = function (e) { e.stopPropagation(); showBox(current + 1); };
  box.querySelector('.close').onclick = closeBox;
  box.onclick = closeBox;
  links.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); showBox(i); }); });
}
