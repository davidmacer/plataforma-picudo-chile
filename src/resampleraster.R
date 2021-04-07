# Importa librerías
library(raster)

# Importa ráster
raster_data <- raster('img/2010_2018_raster_proyectado.tif')

# Crea ráster que se usará para interpolar
raster_bbox <- bbox(raster_data)

raster_interpolacion <- raster(nrows=1800, ncols=1800, xmn=raster_bbox[1], xmx=raster_bbox[3], 
                               ymn=raster_bbox[2], ymx=raster_bbox[4], vals=NULL)

raster_interpolado <- resample(raster_data, raster_interpolacion, method='bilinear')

writeRaster(raster_interpolado, './img/2010_2018_raster_interpolado.tiff', format = 'GTiff', overwrite = T)