# funda-auto-negotiation-filter

A google chrome extension which automatically filters houses which are in negotiation. This means those houses have on of the following labels:

- "Verkocht onder voorbehoud"
- "Onder optie"
- "Onder bod"

Funda does offer functionality to filter those houses for you, but this options is completely at the bottom of the page. This extension implements it's own algorithm to detect those houses and shows a badge how many houses were filtered. By clicking the badge those houses can be shown again.

Do note that this is a simple extension and the functionality is always enabled. Either disable this extension in google chrome or uninstall it completely.

Since websites constantly update, this extension may break in future releases of the funda website. This extension breaks when funda either changes the selectors or url.
- url change: please edit the manifest.json
- selector change: edit lines 2 and 3 of funda-filter.json

This extension is maintained by me for the duration I am looking for a house myself. If I don't end up using funda's option to only list available houses: this reduces the pagination as well.. (was fun to create this extension though!)
