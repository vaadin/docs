# Convert SVG images to publishable format
# - PDF edition may require raster rendering
# - Browsers with SVG support require converting text to paths

SVGIMAGES = newproject-flowchart

RASTERSRCIMAGES := $(foreach file, $(SVGIMAGES), $(file).svg)
RASTERIMAGES_HI := $(foreach file, $(SVGIMAGES), ../images/$(file).png)
SVGTRGIMAGES := $(foreach file, $(SVGIMAGES), ../images/$(file).svg)

images: $(RASTERIMAGES_HI) $(SVGTRGIMAGES) FORCE

# Convert to raster images
$(RASTERIMAGES_HI): ../images/%.png: %.svg
	inkscape --export-png $@ --export-dpi=300 --export-area-page $<

# Convert text to paths
$(SVGTRGIMAGES): ../images/%.svg: %.svg
	inkscape $< --export-text-to-path --export-area-page -l $@

FORCE:
