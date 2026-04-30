import test from "node:test";
import assert from "node:assert/strict";

import { metrics, projects, skills } from "../src/data.js";
import {
  buildPortfolioSummary,
  featuredProjects,
  filterProjects,
  getCategories,
  repoSlug,
  searchProjects,
  uniqueStack,
  validateProject,
} from "../src/portfolio.js";

test("project data is complete and review-ready", () => {
  assert.ok(projects.length >= 6);
  for (const project of projects) {
    assert.deepEqual(validateProject(project), { ok: true, missing: [] });
    assert.match(project.repo, /^https:\/\/github\.com\/bhedanikhilkumar-code\//);
  }
});

test("category helpers expose portfolio filters", () => {
  const categories = getCategories(projects);
  assert.equal(categories[0], "All");
  assert.ok(categories.includes("Mobile"));
  assert.ok(categories.includes("AI"));
  assert.ok(filterProjects(projects, "Mobile").every((project) => project.category === "Mobile"));
  assert.equal(filterProjects(projects, "All").length, projects.length);
});

test("featured projects and stack summary are derived from data", () => {
  assert.ok(featuredProjects(projects).length >= 4);
  const stack = uniqueStack(projects);
  assert.ok(stack.includes("Flutter"));
  assert.ok(stack.includes("JavaScript"));
});

test("portfolio summary returns recruiter-friendly metrics", () => {
  const summary = buildPortfolioSummary({ projects, skills, metrics });
  assert.equal(summary.totalProjects, projects.length);
  assert.equal(summary.skillCount, skills.length);
  assert.equal(summary.metricCount, metrics.length);
  assert.ok(summary.categoryCount >= 5);
});

test("searchProjects finds projects by stack and problem space", () => {
  assert.ok(searchProjects(projects, "flutter").length >= 2);
  assert.equal(searchProjects(projects, "nonexistent-query").length, 0);
  assert.ok(searchProjects(projects, "manifest").some((project) => project.title === "FileManager"));
});

test("repoSlug creates clean GitHub labels", () => {
  assert.equal(repoSlug("https://github.com/bhedanikhilkumar-code/money-king"), "bhedanikhilkumar-code/money-king");
});
