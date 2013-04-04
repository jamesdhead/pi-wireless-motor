#!/bin/bash

i="0"

while [ $i -lt 4 ]
do
echo "1" > /sys/class/gpio/gpio14/value
echo "1" > /sys/class/gpio/gpio15/value
echo "1" > /sys/class/gpio/gpio23/value
echo "1" > /sys/class/gpio/gpio24/value

echo "0" > /sys/class/gpio/gpio14/value
echo "0" > /sys/class/gpio/gpio24/value
sleep 0.2
echo "1" > /sys/class/gpio/gpio14/value
echo "1" > /sys/class/gpio/gpio15/value
echo "1" > /sys/class/gpio/gpio23/value
echo "1" > /sys/class/gpio/gpio24/value
sleep 2
echo "1" > /sys/class/gpio/gpio14/value
echo "1" > /sys/class/gpio/gpio15/value
echo "1" > /sys/class/gpio/gpio23/value
echo "1" > /sys/class/gpio/gpio24/value

echo "0" > /sys/class/gpio/gpio15/value
echo "0" > /sys/class/gpio/gpio23/value
sleep 0.2
echo "1" > /sys/class/gpio/gpio14/value
echo "1" > /sys/class/gpio/gpio15/value
echo "1" > /sys/class/gpio/gpio23/value
echo "1" > /sys/class/gpio/gpio24/value
sleep 2
done
