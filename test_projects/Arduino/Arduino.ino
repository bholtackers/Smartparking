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
int selected_nfc = 1;
int counter = 0;

bool carParked0 = false;
bool carParked1 = false;
bool carParked2 = false;
bool carParked3 = false;


void setup() {

  Wire.begin();
  Serial.begin(9600);
  Serial.println("NDEF Reader");
  // put your setup code here, to run once:

  // Using input pullups for the tact switches

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
  } else if (selected_nfc == 3) {
    readNFC(selected_nfc);
  }

  if ( (counter % 1) == 0 && counter != 0) {
    switchNFC();
  }
  counter++;
  delay(20);
}

void readNFC(int selected) {

  if (selected == 0) {
    if (nfc0.tagPresent())
    {
      Serial.println("Car found on space 0!");
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
          carParked0 = true;
        }
      }
    } else {
      if (carParked0 == false) {
        Serial.println(carParked0);
        Serial.println("No car found on space 0");
      }
      else {
        carParked0 = false;
        Serial.println("Car left parking space 0");
      }
    }
  } else if (selected == 1) {
    if (nfc1.tagPresent())
    {
      Serial.println("Car found on space 1!");
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
        }
      }
    } else {
      Serial.println("No car found on space 1");
    }
  } else if (selected == 2) {
    if (nfc2.tagPresent())
    {
      Serial.println("Car found on space 2!");
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
        }
      }
    }  else {
      Serial.println("No car found on space 2");
    }
  } else if (selected == 3) {
    if (nfc3.tagPresent())
    {
      Serial.println("Car found on space 3!");
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

        }
      }
    }  else {
      Serial.println("No car found on space 3");
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
    I2CMulti.switchToBus(3);
    selected_nfc = 3;
  }
  else if (selected_nfc == 3) {
    I2CMulti.switchToBus(0);
    selected_nfc = 0;
  }
}
