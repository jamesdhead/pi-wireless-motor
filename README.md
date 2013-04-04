Intended for raspberry pi's.

Get Pi's IP with `ifconfig`. You will need it later.

To run, use sftp to transfer to Pi then `cd` into the directory, type `npm install`. When it finishes run the script by `sudo node app.js` (it requires sudo privileges because GPIO requires them. Feel free to mess around with the pin numbers).

When it is running, go to your desktop/mobile/any(device connected to the same wifi) and open the browser (Firefox/Chrome, IE will not work). enter the IP address of the Pi like so: `192.168.1.11:3000`. The server runs on port `3000`. Then you can press keys `j`, `k`, `l`, and `i` to move. To stop press `o`.
