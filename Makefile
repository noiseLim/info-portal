run-dev:
	docker run -d -p 3000:3000 -v '/Users/noiselim/projects/info-portal:/app' -v /app/node_modules --rm info-portal