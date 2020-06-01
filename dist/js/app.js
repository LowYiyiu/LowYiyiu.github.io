var data = {};
var anchors = ["about", "projects", "contact"];

// npx babel --watch src --out-dir dist/js --presets react-app/prod

function NavBar() {
  return React.createElement(
    "div",
    { className: "flex justify-center md:justify-end" },
    anchors.map(function (value, index) {
      return React.createElement(
        "a",
        { className: "text-gray-700 text-center px-4 py-2 m-2 c-hover-underline", href: "#" + value, rel: "noopener", key: index },
        "\xA0",
        value,
        "\xA0"
      );
    })
  );
}

function About() {
  return React.createElement(
    "div",
    { className: "px-3 mt-10", id: anchors[0] },
    React.createElement(
      "h1",
      { className: "text-gray-900 font-bold text-6xl leading-1" },
      "Hello,"
    ),
    data.description.split("<br>").map(function (value, index) {
      return React.createElement(
        "p",
        { className: "text-gray-900 font-light text-xl md:text-2xl", key: index },
        value
      );
    }),
    React.createElement(
      "button",
      {
        className: "mt-6 p-3 border-2 border-gray-700 rounded-md text-md bg-white text-gray-900 md:text-xl hover:bg-gray-900 hover:text-white transition duration-150 ease-in-out",
        onClick: function onClick() {
          openLink(data.resume);
        }
      },
      "Download R\xE9sum\xE9"
    )
  );
}

function Projects() {
  return React.createElement(
    "div",
    { className: "px-1 mt-16", id: anchors[1] },
    React.createElement(
      "h2",
      { className: "text-gray-900 font-semibold text-3xl text-center c-underline" },
      anchors[1]
    ),
    data.projects.map(function (value, index) {
      return React.createElement(
        "div",
        {
          className: "my-5 w-full lg:flex shadow-md cursor-pointer transform hover:scale-105 transition-all duration-150 ease-in-out",
          onClick: function onClick() {
            openLink(value.link);
          },
          key: index
        },
        React.createElement(
          "div",
          { className: "lg:border-t border-b border-l border-r border-gray-400 h-0 lg:h-auto lg:w-96 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" },
          React.createElement("img", { className: "object-cover w-full h-80", src: value.image, alt: value.name })
        ),
        React.createElement(
          "div",
          { className: "border-r border-b border-l border-gray-400 w-full lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" },
          React.createElement(
            "div",
            { className: "mb-8" },
            React.createElement(
              "p",
              { className: "text-gray-900 font-medium text-2xl my-3" },
              value.name
            ),
            value.description.split("<br>").map(function (value, index) {
              return React.createElement(
                "p",
                { className: "text-gray-700 text-base my-3", key: index },
                value
              );
            })
          ),
          React.createElement(
            "div",
            { className: "py-2 lg:py-4" },
            value.tags.map(function (v, i) {
              return React.createElement(
                "span",
                { className: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-1", key: i },
                v
              );
            })
          )
        )
      );
    })
  );
}

function Contact() {
  return React.createElement(
    "div",
    { className: "px-1 mt-16", id: anchors[2] },
    React.createElement(
      "h2",
      { className: "text-gray-900 font-semibold text-3xl text-center c-underline" },
      anchors[2]
    ),
    React.createElement(
      "div",
      { className: "flex justify-around mt-5" },
      data.socials.map(function (value, index) {
        return React.createElement(
          "a",
          { className: "transform hover:scale-105 transition-all duration-150 ease-in-out w-20", href: value.link, target: "_blank", rel: "noopener", key: index },
          React.createElement("img", { className: "h-10 w-10 rounded-full mx-auto mb-3", src: "dist/icons/" + value.icon, alt: value.name }),
          React.createElement(
            "p",
            { className: "text-gray-700 text-center hidden md:block" },
            value.name
          )
        );
      })
    )
  );
}

function Copyright() {
  return React.createElement(
    "div",
    { className: "mt-16 mb-2 flex justify-between" },
    React.createElement(
      "p",
      { className: "inline-block text-gray-900 text-xs text-center" },
      "\xA9 ",
      new Date().getFullYear(),
      " LOWYIYIU.COM"
    ),
    React.createElement(
      "p",
      { className: "inline-block text-gray-900 text-xs text-center" },
      "Made with \u2764 by Low Yiyiu"
    )
  );
}

function App() {
  return React.createElement(
    "div",
    { className: "container mx-auto px-3 md:px-16 lg:px-24 xl:px-32 py-3" },
    React.createElement(
      "div",
      { className: "grid grid-cols-1" },
      React.createElement(NavBar, null),
      React.createElement(About, null),
      React.createElement(Projects, null),
      React.createElement(Contact, null),
      React.createElement(Copyright, null)
    )
  );
}

function animateAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}

function openLink(l) {
  var e = document.createElement("a");
  e.href = l;
  e.setAttribute("target", "_blank");
  e.click();
}

fetch("https://raw.githubusercontent.com/lowyiyiu/lowyiyiu.github.io/master/data.json").then(function (r) {
  return r.json();
}).then(function (j) {
  data = j;
  ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
  animateAnchorScroll();
});