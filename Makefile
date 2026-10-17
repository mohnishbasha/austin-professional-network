# Convenience wrapper around the npm scripts. Run `make help` for targets.
.DEFAULT_GOAL := help
.PHONY: help install dev build preview validate test check clean ci

help: ## List available targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

node_modules: package.json package-lock.json
	npm install
	@touch node_modules

install: node_modules ## Install dependencies

ci: ## Clean install exactly from package-lock.json
	npm ci

dev: node_modules ## Start the local dev server
	npm run dev

build: node_modules ## Build the static site into dist/
	npm run build

preview: build ## Serve the production build locally
	npm run preview

validate: ## Validate src/data/events.json
	npm run validate:data

test: build ## Build, then run the test suite
	npm test

check: node_modules ## Validate data, build, and test (run before every commit)
	npm run check

clean: ## Remove build output and caches
	rm -rf dist .astro
