cache <- read.csv(file = './nocache.csv', head = TRUE)
long <- as.numeric(cache$longest_transaction)

sumario <- summary(cache)
head(sumario)
png('latencia_maxima_no_cache.png', width = 7, height = 7, units = 'in', res = 300)
boxplot(long, 
    horizontal = TRUE, 
    main = "Latencia sin cache",
    xlab = "Segundos",
    ylab = "",
    col = "orange"
)
grid(20, NA, lwd = 2)

dev.off()