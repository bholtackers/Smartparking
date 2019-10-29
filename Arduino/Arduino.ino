#if 0
#include <SPI.h>
#include <PN532_SPI.h>
#include <PN532.h>
#include <NfcAdapter.h>

PN532_SPI pn532spi(SPI, 10);
//NfcAdapter nfc = NfcAdapter(pn532spi);
#else

#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

PN532_I2C pn532_i2c(Wire);

NfcAdapter nfc0 = NfcAdapter(pn532_i2c);
NfcAdapter nfc1 = NfcAdapter(pn532_i2c);
NfcAdapter nfc2 = NfcAdapter(pn532_i2c);
NfcAdapter nfc3 = NfcAdapter(pn532_i2c);

#endif

#include <I2CMux.h>

#define I2CMulti_Addr 0x70

I2CMux I2CMulti(I2CMulti_Addr);
int selected_nfc = 4;
int counter = 0;

bool carParked0 = false;
bool carParked1 = false;
bool carParked2 = false;
bool carParked3 = false;


void setup() {
  Wire.begin();
  Serial.begin(9600);
  // put your setup code here, to run once:

  I2CMulti.switchToBus(selected_nfc);
  nfc0.begin();
  nfc1.begin();
  nfc2.begin();
  nfc3.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (selected_nfc == 0) {
    readNFC(selected_nfc);
  } else if (selected_nfc == 1) {
    readNFC(selected_nfc);
  } else if (selected_nfc == 2) {
    readNFC(selected_nfc);
  } else if (selected_nfc == 4) {
    readNFC(selected_nfc);
  }

  if ( (counter % 1) == 0 && counter != 0) {
    switchNFC();
  }
  counter++;
  delay(100);
}

void readNFC(int selected) {
  delay(500);
  if (selected == 0) {
    Serial.println("0");
    if (nfc0.tagPresent())
    {
      if (carParked0 == true) {
        messageJSON("1", "","Still parked");
      } else {
        NfcTag tag = nfc0.read();
        if (tag.hasNdefMessage()) // every tag won't have a message
        {
          NdefMessage message = tag.getNdefMessage();
          // cycle through the records, printing some info from each
          int recordCount = message.getRecordCount();
          for (int i = 0; i < recordCount; i++)
          {
            NdefRecord record = message.getRecord(i);
            // There's no generic processing for the payload, it's returned as a byte[]
            int payloadLength = record.getPayloadLength();
            byte payload[payloadLength];
            record.getPayload(payload);

            // Force the data into a String
            String payloadAsString = "";
            for (int c = 0; c < payloadLength - 3; c++) {
              payloadAsString += (char)payload[c + 3];
            }
            Serial.println(payloadAsString);
            messageJSON("1", payloadAsString, "parked");
            carParked0 = true;
          }
        }
      }
    } else {
      if (carParked0 == true) {
        carParked0 = false;
        messageJSON("1", "", "left");
      }
    }
  } else if (selected == 1) {
    Serial.println("1");
    if (nfc1.tagPresent())
    {
      if (carParked1 == true) {
        messageJSON("2", "","Still parked");
      } else {
        NfcTag tag = nfc1.read();
        if (tag.hasNdefMessage()) // every tag won't have a message
        {
          NdefMessage message = tag.getNdefMessage();
          // cycle through the records, printing some info from each
          int recordCount = message.getRecordCount();
          for (int i = 0; i < recordCount; i++)
          {
            NdefRecord record = message.getRecord(i);
            // There's no generic processing for the payload, it's returned as a byte[]
            int payloadLength = record.getPayloadLength();
            byte payload[payloadLength];
            record.getPayload(payload);

            // Force the data into a String
            String payloadAsString = "";
            for (int c = 0; c < payloadLength - 3; c++) {
              payloadAsString += (char)payload[c + 3];
            }
            Serial.println(payloadAsString);
            messageJSON("2", payloadAsString, "parked");
            carParked1 = true;

          }
        }
      }
    } else {
      if (carParked1 == true) {
        carParked1 = false;
        messageJSON("2", "", "left");
      }
    }
  } else if (selected == 2) {
    Serial.println("2");
    if (nfc2.tagPresent())
    {
      if (carParked2 == true) {
        messageJSON("3", "","Still parked");
      } else {
        NfcTag tag = nfc2.read();
        if (tag.hasNdefMessage()) // every tag won't have a message
        {
          NdefMessage message = tag.getNdefMessage();
          // cycle through the records, printing some info from each
          int recordCount = message.getRecordCount();
          for (int i = 0; i < recordCount; i++)
          {
            NdefRecord record = message.getRecord(i);
            // There's no generic processing for the payload, it's returned as a byte[]
            int payloadLength = record.getPayloadLength();
            byte payload[payloadLength];
            record.getPayload(payload);

            // Force the data into a String
            String payloadAsString = "";
            for (int c = 0; c < payloadLength - 3; c++) {
              payloadAsString += (char)payload[c + 3];
            }
            Serial.println(payloadAsString);
            messageJSON("3", payloadAsString, "parked");
            carParked2 = true;
          }
        }
      }
    } else {
      if (carParked2 == true) {
        carParked2 = false;
        messageJSON("3", "", "left");
      }
    }
  } else if (selected == 4) {
    Serial.println("3");
    if (nfc3.tagPresent())
    {
      if (carParked3 == true) {
        messageJSON("4", "","Still parked");
      } else {
        NfcTag tag = nfc3.read();
        if (tag.hasNdefMessage()) // every tag won't have a message
        {
          NdefMessage message = tag.getNdefMessage();
          // cycle through the records, printing some info from each
          int recordCount = message.getRecordCount();
          for (int i = 0; i < recordCount; i++)
          {
            NdefRecord record = message.getRecord(i);
            // There's no generic processing for the payload, it's returned as a byte[]
            int payloadLength = record.getPayloadLength();
            byte payload[payloadLength];
            record.getPayload(payload);

            // Force the data into a String
            String payloadAsString = "";
            for (int c = 0; c < payloadLength - 3; c++) {
              payloadAsString += (char)payload[c + 3];
            }
            Serial.println(payloadAsString);
            messageJSON("4", payloadAsString, "parked");
            carParked3 = true;

          }
        }
      }
    } else {
      if (carParked3 == true) {
        carParked3 = false;
        messageJSON("4", "", "left");
      }
    }
  }
}

void switchNFC() {

  if (selected_nfc == 0)
  {
    I2CMulti.switchToBus(1);
    selected_nfc = 1;
  }
  else if (selected_nfc == 1) {
    I2CMulti.switchToBus(2);
    selected_nfc = 2;
  }
  else if (selected_nfc == 2) {
    I2CMulti.switchToBus(4);
    selected_nfc = 4;
  }
  else if (selected_nfc == 4) {
    I2CMulti.switchToBus(0);
    selected_nfc = 0;
  }
}

void messageJSON(String spot, String car, String parkingStatus) {
  String jsonMessage = "";
  if (car == "") {
    jsonMessage = "{\"Spot\":\"" + spot + "\",\"Status\":\"" + parkingStatus + "\"}";
  } else {
    jsonMessage = "{\"Spot\":\"" + spot + "\",\"Car\":\"" + car + "\",\"Status\":\"" + parkingStatus + "\"}";
  }
  Serial.println(jsonMessage);
}
