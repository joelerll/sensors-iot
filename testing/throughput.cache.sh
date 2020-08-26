#!/bin/bash

touch througthput.cache.csv

echo "availability,throughput,request_per_second,fecha_inicio,fecha_fin" > througthput.cache.csv
num=50

for i in {1..11}
do
   
   echo "Running test ${num}"
   inicio=$(date +"%T")
   data=$(siege -c$num -t15S --content-type "application/json" 'http://ec2-3-16-15-210.us-east-2.compute.amazonaws.com/api/inamhi/page POST {"end_date": "2020-08-25 17:00:00", "id_esta": 63813, "init_date": "2020-08-10 16:00:00", "name": "GUAYAQUIL (FACULTAD CCNN)", "type": "METEOROLOGICA" }')
   fin=$(date +"%T")
   format=$(jq -r '.availability,.throughput' <<< $data)
   format=$(echo "$format" | awk '{print $1","}' | tr -d '[\n]')
   echo "$format$num,$inicio,$fin" >> througthput.cache.csv
   num=$(($num + 75))
done

# Median :52.37
# Median :51.27