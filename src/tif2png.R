library(raster)

raster_data <- raster('../img/2010_2018_raster_proyectado.tif')

crs(raster_data) <- "+proj=longlat +datum=WGS84 +no_defs +ellps=WGS84 +towgs84=0,0,0" 

plot(raster_data)

hist(raster_data,
     breaks = 5,
     main = "Histograma",
     xlab = "Probabilidad de presencia" , ylab = "Number of Pixels",)

reclass_df <- c(0, 0.2, 1,
                0.2, 0.4, 2,
                0.4, 0.6, 3,
                0.6, 0.8, 4,
                0.8, 1, 5)

reclass_m <- matrix(reclass_df,
                    ncol = 3,
                    byrow = TRUE)

picudo_classified <- reclassify(raster_data,
                             reclass_m)


barplot(picudo_classified,
        main = "Number of pixels in each class")

picudo_classified[picudo_classified == 0] <- NA

png("../img/mapa_distribucion_potencial_2010-2018.png")     
par(bg=NA)
plot(raster_data, bty="n", box = FALSE, axes = FALSE, legend = FALSE)
dev.off()
                                                                          