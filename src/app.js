import { metrics, profile, projects, skills, timeline } from "./data.js";
import { buildPortfolioSummary, filterProjects, getCategories, repoSlug, uniqueStack } from "./portfolio.js";

const elements = {
  navToggle: document.querySelector(".nav-toggle"),
  navLinks: document.querySelector("#nav-links"),
  projectCount: document.querySelector("#project-count"),
  signalGrid: document.querySelector("#signal-grid"),
  stats: document.querySelector("#stats"),
  projectFilters: document.querySelector("#project-filters"),
  projectGrid: document.querySelector("#project-grid"),
  skillCloud: document.querySelector("#skill-cloud"),
  timelineList: document.querySelector("#timeline-list"),
  year: document.querySelector("#year"),
};

const summary = buildPortfolioSummary({ projects, skills, metrics });
let activeCategory = "All";

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderSignals() {
  elements.projectCount.textContent = `${summary.totalProjects}+`;
  const signals = [
    { label: "Featured", value: summary.featuredCount },
    { label: "Categories", value: summary.categoryCount },
    { label: "Skills", value: summary.skillCount },
    { label: "Stack Tags", value: uniqueStack(projects).length },
  ];

  elements.signalGrid.innerHTML = "";
  for (const signal of signals) {
    const item = createElement("div", "signal-card");
    item.append(createElement("strong", "", String(signal.value)));
    item.append(createElement("span", "", signal.label));
    elements.signalGrid.append(item);
  }
}

function renderStats() {
  elements.stats.innerHTML = "";
  for (const metric of metrics) {
    const card = createElement("article", "metric-card");
    card.append(createElement("span", "", metric.label));
    card.append(createElement("strong", "", metric.value));
    card.append(createElement("p", "", metric.detail));
    elements.stats.append(card);
  }
}

function renderFilters() {
  elements.projectFilters.innerHTML = "";
  for (const category of getCategories(projects)) {
    const button = createElement("button", `filter-button ${category === activeCategory ? "is-active" : ""}`, category);
    button.type = "button";
    button.addEventListener("click", () => {
      activeCategory = category;
      renderFilters();
      renderProjects();
    });
    elements.projectFilters.append(button);
  }
}

function renderProjects() {
  elements.projectGrid.innerHTML = "";
  const visibleProjects = filterProjects(projects, activeCategory);

  for (const project of visibleProjects) {
    const card = createElement("article", "project-card");
    const header = createElement("div", "project-header");
    header.append(createElement("span", "project-category", project.category));
    if (project.featured) header.append(createElement("span", "featured-pill", "Featured"));

    const title = createElement("h3", "", project.title);
    const description = createElement("p", "", project.description);
    const impact = createElement("p", "project-impact", project.impact);

    const stack = createElement("div", "stack-list");
    for (const tech of project.stack) stack.append(createElement("span", "", tech));

    const repo = createElement("a", "project-link", `View ${repoSlug(project.repo)}`);
    repo.href = project.repo;
    repo.target = "_blank";
    repo.rel = "noreferrer";

    card.append(header, title, description, impact, stack, repo);
    elements.projectGrid.append(card);
  }
}

function renderSkills() {
  elements.skillCloud.innerHTML = "";
  for (const skill of skills) {
    elements.skillCloud.append(createElement("span", "skill-pill", skill));
  }
}

function renderTimeline() {
  elements.timelineList.innerHTML = "";
  for (const [index, item] of timeline.entries()) {
    const row = createElement("article", "timeline-item");
    row.append(createElement("span", "timeline-index", String(index + 1).padStart(2, "0")));
    const copy = createElement("div", "timeline-copy");
    copy.append(createElement("h3", "", item.title));
    copy.append(createElement("p", "", item.description));
    row.append(copy);
    elements.timelineList.append(row);
  }
}

function bindNavigation() {
  elements.navToggle.addEventListener("click", () => {
    const expanded = elements.navToggle.getAttribute("aria-expanded") === "true";
    elements.navToggle.setAttribute("aria-expanded", String(!expanded));
    elements.navLinks.classList.toggle("is-open", !expanded);
  });

  for (const link of elements.navLinks.querySelectorAll("a")) {
    link.addEventListener("click", () => {
      elements.navToggle.setAttribute("aria-expanded", "false");
      elements.navLinks.classList.remove("is-open");
    });
  }
}

function init() {
  document.title = `${profile.name} — ${profile.role}`;
  elements.year.textContent = String(new Date().getFullYear());
  renderSignals();
  renderStats();
  renderFilters();
  renderProjects();
  renderSkills();
  renderTimeline();
  bindNavigation();
}

init();
