#!/bin/bash

touch cache.csv

echo "transactions,availability,elapsed_time,data_transferred,response_time,transaction_rate,throughput,concurrency,successful_transactions,failed_transactions,longest_transaction,shortest_transaction,inicio,fin" > cache.csv

for i in {1..10}
do
   echo "Running test ${i}"
   inicio=$(date +"%T")
   data=$(siege -c50 -t60S --content-type "application/json" 'http://ec2-3-16-15-210.us-east-2.compute.amazonaws.com/api/inamhi/page POST {"end_date": "2020-08-25 17:00:00", "id_esta": 63813, "init_date": "2020-08-10 16:00:00", "name": "GUAYAQUIL (FACULTAD CCNN)", "type": "METEOROLOGICA" }')
   fin=$(date +"%T")
   format=$(jq -r '.transactions, .availability, .elapsed_time, .data_transferred, .response_time, .transaction_rate, .throughput, .concurrency, .successful_transactions, .failed_transactions, .longest_transaction, .shortest_transaction' <<< $data)
   format=$(echo "$format" | awk '{print $1","}' | tr -d '[\n]')
   echo "$format$inicio,$fin" >> cache.csv
   sleep 5
done