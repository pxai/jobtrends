#!/bin/bash
START=$1 || 1
END=$2 || 1680

echo Starting from $START to $END

for (( i=$START; i<=$END; i++ ))
do 
    sleep 5
    node src/scripts/selenium/promiseMongo.js ${i}; 
done

# Note: this kind of range does not work in bash
#for i in {`echo $1`..`echo $2`}
