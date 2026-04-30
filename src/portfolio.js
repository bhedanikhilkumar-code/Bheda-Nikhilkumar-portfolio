export function getCategories(projects = []) {
  return ["All", ...Array.from(new Set(projects.map((project) => project.category))).sort((a, b) => a.localeCompare(b))];
}

export function filterProjects(projects = [], category = "All") {
  if (!category || category === "All") return [...projects];
  return projects.filter((project) => project.category === category);
}

export function featuredProjects(projects = []) {
  return projects.filter((project) => project.featured);
}

export function uniqueStack(projects = []) {
  return Array.from(new Set(projects.flatMap((project) => project.stack))).sort((a, b) => a.localeCompare(b));
}

export function buildPortfolioSummary({ projects = [], skills = [], metrics = [] } = {}) {
  const categories = getCategories(projects).filter((category) => category !== "All");
  return {
    totalProjects: projects.length,
    featuredCount: featuredProjects(projects).length,
    categoryCount: categories.length,
    categories,
    skillCount: skills.length,
    metricCount: metrics.length,
  };
}

export function projectSearchIndex(project) {
  return [project.title, project.category, project.description, project.impact, ...(project.stack || [])]
    .join(" ")
    .toLowerCase();
}

export function searchProjects(projects = [], query = "") {
  const normalized = String(query).trim().toLowerCase();
  if (!normalized) return [...projects];
  return projects.filter((project) => projectSearchIndex(project).includes(normalized));
}

export function repoSlug(url = "") {
  const match = String(url).match(/github\.com\/(.+)$/i);
  return match ? match[1].replace(/\/$/, "") : url;
}

export function validateProject(project) {
  const required = ["title", "category", "description", "repo", "impact"];
  const missing = required.filter((field) => !project[field]);
  if (missing.length) {
    return { ok: false, missing };
  }
  if (!Array.isArray(project.stack) || project.stack.length < 2) {
    return { ok: false, missing: ["stack"] };
  }
  return { ok: true, missing: [] };
}
