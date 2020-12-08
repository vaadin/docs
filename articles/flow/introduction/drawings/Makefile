SVG = architecture concepts-component events-classdiagram
RASTERIMAGES = architecture concepts-component events-classdiagram

RASTERSRCIMAGES := $(foreach file, $(RASTERIMAGES), $(file).svg)
RASTERIMAGES := $(foreach file, $(RASTERIMAGES), ../images/$(file).png)
SVGTRGIMAGES := $(foreach file, $(SVG), ../images/$(file).svg)

images: $(RASTERIMAGES) $(SVGTRGIMAGES) FORCE

$(RASTERIMAGES): ../images/%.png: %.svg
	inkscape --export-png $@ --export-dpi=300 --export-area-page $<

$(SVGTRGIMAGES): ../images/%.svg: %.svg
	inkscape $< --export-text-to-path -l $@

FORCE:
