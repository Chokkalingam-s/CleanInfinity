import time
import board
import busio
from adafruit_pn532.i2c import PN532_I2C
import requests

# Setup I2C and PN532 NFC module
i2c = busio.I2C(board.SCL, board.SDA)
pn532 = PN532_I2C(i2c, debug=False)

# Check firmware version of PN532
ic, ver, rev, support = pn532.firmware_version
print(f"Found PN532 with firmware version: {ver}.{rev}")

# Function to read NFC UID
def read_nfc_uid():
    uid = pn532.read_passive_target(timeout=0.5)
    if uid is not None:
        # Convert UID to hexadecimal format
        uid_hex = ''.join([f"{i:02X}" for i in uid])
        print(f"NFC UID detected: {uid_hex}")
        return uid_hex
    return None

# Function to send NFC UID to server
def send_scan_to_server(uid):
    url = "https://cleaninfinity-production.up.railway.app/process-nfc"  #Needed update of ip/backendUrl
    data = {'nfcUid': uid}

    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("Scan processed successfully.")
        elif response.status_code == 201:
            print("NFC UID added successfully.")
        else:
            print(f"Error: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to server: {e}")

# Main loop to read and send NFC UID
def main():
    print("Waiting for NFC tag...")
    while True:
        uid = read_nfc_uid()  # Read UID from NFC scanner
        if uid:
            send_scan_to_server(uid)  # Send the UID to the server
            print("Waiting 10 seconds before reading the next tag...")
            time.sleep(10)  # Wait for 10 seconds before reading the next tag

# Run the program
if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Program interrupted.")
