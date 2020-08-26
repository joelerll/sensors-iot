# convert factor to numeric for convenience

cache <- read.csv(file = './througthput.cache.csv', head = TRUE)
nocache <- read.csv(file = './througthput.nocache.csv', head = TRUE)
throughput <- as.numeric(cache$throughput)
request <- as.numeric(cache$request_per_second)

nothroughput <- as.numeric(nocache$throughput)
norequest <- as.numeric(nocache$request_per_second)

Orange$Tree <- as.numeric(Orange$Tree)
ntrees <- max(Orange$Tree)

# get the range for the x and y axis
xrange <- range(cbind(request,norequest))
yrange <- range(cbind(throughput,nothroughput))
png('throughput.png', width = 7, height = 7, units = 'in', res = 300)
plot(xrange, yrange, xlim=range(xrange), ylim=range(yrange), type="n", xlab="HTTP request por segundo",
   ylab="Throughput", pch=16 )
colors <- rainbow(2)
linetype <- c(1:2)
plotchar <- seq(18,18+ntrees,1)
head(plotchar)
lines(request, throughput, type = "b", lwd=1.5, lty=linetype[1], col="red", pch=16)
lines(norequest, nothroughput, type = "b", lwd=1.5, lty=linetype[2], col="blue", pch=16)

title("Throughput", "")

legend(xrange[1], 0.5, c("Cache", "Sin Cache"), cex=0.8, col=c("red", "blue"),
   pch=plotchar, lty=linetype)

dev.off()

