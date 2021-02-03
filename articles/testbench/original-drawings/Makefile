IMAGES = debugwindow-select-annotated

SRCIMAGES := $(foreach file, $(IMAGES), $(file).svg)
TRGIMAGES_HI := $(foreach file, $(IMAGES), ../img/$(file)-hi.png)
TRGIMAGES_LO := $(foreach file, $(IMAGES), ../img/$(file)-lo.png)

images: $(TRGIMAGES_HI) $(TRGIMAGES_LO) FORCE

$(TRGIMAGES_HI): ../img/%-hi.png: %.svg
	inkscape --export-png $@ --export-dpi=300 --export-area-drawing $<

$(TRGIMAGES_LO): ../img/%-lo.png: %.svg
	inkscape --export-png $@ --export-dpi=90 --export-area-drawing $<

FORCE:
