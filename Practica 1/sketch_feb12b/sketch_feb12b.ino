#include <TimeLib.h>

#include <dht.h>
dht DHT;
#define DHT11_PIN 2
#define DHT12_PIN 6
int volt = 3;
int volt2 = 4;
int volt3 = 5;
int volt4 = 7;
int s_analogica_mq135 = 0;
int SENSOR = 1;
int VALOR;
String retorno;
time_t fecha;

void setup() {
  Serial.begin(9600);
  pinMode(volt, OUTPUT);
  pinMode(volt2, OUTPUT);
  pinMode(volt3, OUTPUT);
  pinMode(volt4, OUTPUT);
  digitalWrite(volt, true);
  digitalWrite(volt2, true);
  digitalWrite(volt3, true);
  digitalWrite(volt4, true);
}

void loop() {
  //-------------------- Sensor de CO2----------------
  s_analogica_mq135 = analogRead(0);
  //-------------------- Sensor de Luz----------------
  VALOR = analogRead(SENSOR);
  //-------------------- Sensor de Humedad ------------
  int lectura = analogRead(A2);
  delay(500);
  //---------------------Sensor de Temperatura interna --------
  DHT.read11(DHT11_PIN);
  int dato1 = DHT.temperature;
  //---------------------Sensor de Temperatura externa --------
  DHT.read11(DHT12_PIN);
  int dato2 = DHT.temperature;
  //---------------------Retorno------------------------------
  delay(2000);
  String CO2 = "\"CO2\": ";
  CO2.concat(s_analogica_mq135);
  String Iluminacion =  "\"Iluminacion\": ";
  Iluminacion.concat(VALOR);
  String humedad = "\"Humedad\": ";
  humedad.concat(lectura);
  String Tempint = "\"TemperaturaInterna\": ";
  Tempint.concat(dato1);
  String Tempext = "\"TemperaturaExterna\": ";
  Tempext.concat(dato2);
  retorno =  CO2 + " ," + Iluminacion + " ," + humedad + " ," + Tempint + " ," + Tempext + "}";
  Serial.println(retorno);
}
