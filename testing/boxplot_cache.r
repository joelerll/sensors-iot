cache <- read.csv(file = './cache.csv', head = TRUE)
long <- as.numeric(cache$longest_transaction)

sumario <- summary(cache)
head(sumario)
png('latencia_maxima_cache.png', width = 7, height = 7, units = 'in', res = 300)
boxplot(long, 
    horizontal = TRUE, 
    main = "Latencia con cache",
    xlab = "Segundos",
    ylab = "",
    col = "orange"
)
grid(20, NA, lwd = 2)

dev.off()