const sections = document.querySelectorAll("section");
const bars = {
  website: document.getElementById("website"),
  background: document.getElementById("background"),
  about: document.getElementById("about"),
  contacts: document.getElementById("contacts"),
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const bar = bars[section.id.replace("layer", "")];

      if (entry.isIntersecting && bar) {
        Object.values(bars).forEach((b) => b?.classList.remove("selectfocus"));
        bar.classList.add("layer-focused");
      } else {
        // Clear existing classes when no section is intersecting
        Object.values(bars).forEach((b) =>
          b?.classList.remove("layer-focused")
        );
      }
    });
  },
  { threshold: 0.01 }
);

sections.forEach((section) => {
  observer.observe(section);
});

//Burger Responsiveness
hamburger = document.querySelector(".burger");
hamburger.onclick = function () {
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
};

//For Typewriter Animation
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function SelectionClicked(selection) {
  const layers = {
    Website: {
      element: document.getElementById("websitelayer"),
      select: document.getElementById("website"),
    },
    Backgrounds: {
      element: document.getElementById("backgroundlayer"),
      select: document.getElementById("background"),
    },
    About: {
      element: document.getElementById("aboutlayer"),
      select: document.getElementById("about"),
    },
    Contacts: {
      element: document.getElementById("contactslayer"),
      select: document.getElementById("contacts"),
    },
  };

  const selectedLayer = layers[selection];
  if (selectedLayer) {
    Object.values(layers).forEach((layer) => {
      layer.select.classList.remove("selectfocus");
    });

    selectedLayer.select.classList.add("selectfocus");
    selectedLayer.element.focus();
  } else if (selection === "Home") {
    Object.values(layers).forEach((layer) => {
      layer.select.classList.remove("selectfocus");
    });
  }
}
