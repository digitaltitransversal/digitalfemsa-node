test:
	npm run test
node:
	rm -rf api && \
	rm -rf model && \
	docker run --rm \
	 -v ${PWD}:/local openapitools/openapi-generator-cli:v7.2.0 generate \
	 -i https://raw.githubusercontent.com/digitalfemsa/openapi/main/_build/api.yaml \
	 -g typescript-axios \
	 -o /local \
	 -c /local/config-node.json  \
	 --global-property apiDocs=true   \
	 --global-property apiTests=true \
 	 --global-property modelTests=true

update-version:
	@if [ -z "$(VERSION)" ]; then \
		echo "Usage: make update-version VERSION=1.0.1"; \
		exit 1; \
	fi
	@echo "Updating version to $(VERSION)..."
	@echo "$(VERSION)" > VERSION
	@sed -i '' 's/"version": "[^"]*"/"version": "$(VERSION)"/' package.json
	@sed -i '' 's/"npmVersion": "[^"]*"/"npmVersion": "$(VERSION)"/' config-node.json
	@sed -i '' 's|"App/v2 NodeBindings/" \+ "[^"]*"|"App/v2 NodeBindings/" + "$(VERSION)"|' common.ts
	@sed -i '' 's|\[\x27DigitalFemsa::\x27, "[^"]*"\]\.join(\x27\x27)|[\x27DigitalFemsa::\x27, "$(VERSION)"]\.join(\x27\x27)|' common.ts
	@echo "✨ Version updated to $(VERSION) successfully!"
