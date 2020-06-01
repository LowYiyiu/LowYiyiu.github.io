let data = {};
const anchors = ["about", "projects", "contact"];

// npx babel --watch src --out-dir dist/js --presets react-app/prod

function NavBar() {
  return (
    <div class="flex justify-center md:justify-end">
      {anchors.map((value, index) => (
        <a class="text-gray-700 text-center px-4 py-2 m-2 c-hover-underline" href={"#" + value} rel="noopener" key={index}>
          &nbsp;{value}&nbsp;
        </a>
      ))}
    </div>
  );
}

function About() {
  return (
    <div class="px-3 mt-10" id={anchors[0]}>
      <h1 class="text-gray-900 font-bold text-6xl leading-1">Hello,</h1>
      {data.description.split("<br>").map((value, index) => (
        <p class="text-gray-900 font-light text-xl md:text-2xl" key={index}>
          {value}
        </p>
      ))}
      <button
        class="mt-6 p-3 border-2 border-gray-700 rounded-md text-md bg-white text-gray-900 md:text-xl hover:bg-gray-900 hover:text-white transition duration-150 ease-in-out"
        onClick={() => {
          openLink(data.resume);
        }}
      >
        Download Résumé
      </button>
    </div>
  );
}

function Projects() {
  return (
    <div class="px-1 mt-16" id={anchors[1]}>
      <h2 class="text-gray-900 font-semibold text-3xl text-center c-underline">{anchors[1]}</h2>
      {data.projects.map((value, index) => (
        <div
          class="my-5 w-full lg:flex shadow-md cursor-pointer transform hover:scale-105 transition-all duration-150 ease-in-out"
          onClick={() => {
            openLink(value.link);
          }}
          key={index}
        >
          <div class="lg:border-t border-b border-l border-r border-gray-400 h-0 lg:h-auto lg:w-96 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img class="object-cover w-full h-80" src={value.image} alt={value.name}></img>
          </div>
          <div class="border-r border-b border-l border-gray-400 w-full lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
              <p class="text-gray-900 font-medium text-2xl my-3">{value.name}</p>
              {value.description.split("<br>").map((value, index) => (
                <p class="text-gray-700 text-base my-3" key={index}>
                  {value}
                </p>
              ))}
            </div>
            <div class="py-2 lg:py-4">
              {value.tags.map((v, i) => (
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-1" key={i}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <div class="px-1 mt-16" id={anchors[2]}>
      <h2 class="text-gray-900 font-semibold text-3xl text-center c-underline">{anchors[2]}</h2>
      <div class="flex justify-around mt-5">
        {data.socials.map((value, index) => (
          <a class="transform hover:scale-105 transition-all duration-150 ease-in-out w-20" href={value.link} target="_blank" rel="noopener" key={index}>
            <img class="h-10 w-10 rounded-full mx-auto mb-3" src={"dist/icons/" + value.icon} alt={value.name} />
            <p class="text-gray-700 text-center hidden md:block">{value.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div class="mt-16 mb-2 flex justify-between">
      <p class="inline-block text-gray-900 text-xs text-center">© {new Date().getFullYear()} LOWYIYIU.COM</p>
      <p class="inline-block text-gray-900 text-xs text-center">Made with ❤ by Low Yiyiu</p>
    </div>
  );
}

function App() {
  return (
    <div class="container mx-auto px-3 md:px-16 lg:px-24 xl:px-32 py-3">
      <div class="grid grid-cols-1">
        <NavBar></NavBar>
        <About></About>
        <Projects></Projects>
        <Contact></Contact>
        <Copyright></Copyright>
      </div>
    </div>
  );
}

function animateAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function openLink(l) {
  let e = document.createElement("a");
  e.href = l;
  e.setAttribute("target", "_blank");
  e.click();
}

fetch("/data.json")
  .then((r) => r.json())
  .then((j) => {
    data = j;
    ReactDOM.render(<App></App>, document.getElementById("root"));
    animateAnchorScroll();
  });
