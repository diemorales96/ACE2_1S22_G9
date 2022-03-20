int volt = 3;
int volt2 = 4;
int volt3 = 5;
int volt4 = 7;
int volt5 = 2;
int volt6 = 22;
int volt7 = 24;
int volt8 = 26;
int s_analogica_mq135 = 0;
int SENSOR = 1;
int VALOR;
String retorno;
const int pinNivel = A0;
int sensorNivel = 0;
const int pinTurbidez = A1; 
const int pinTurbidezIn = A3;

void setup() {
  Serial.begin(9600);
  pinMode(volt, OUTPUT);
  pinMode(volt2, OUTPUT);
  pinMode(volt3, OUTPUT);
  pinMode(volt4, OUTPUT);
  pinMode(volt6, OUTPUT);
  digitalWrite(volt, true);
  digitalWrite(volt2, true);
  digitalWrite(volt3, true);
  digitalWrite(volt4, true);
  digitalWrite(volt6, true);
  digitalWrite(volt7, true);
  digitalWrite(volt8, true);
}

void loop() {
  analogWrite(2, 66);
  //-------------------- Sensor de Humedad ------------
  int lectura = analogRead(A2);
  delay(500);
  //-------------------- Sensor de Nivel Agua ------------
  int sensorNivel = analogRead(pinNivel); 
  delay(500);
  //-------------------- Sensor de Turbidez ------------
  int sensorTurbidez = analogRead(pinTurbidez); 
  delay(500);
   //-------------------- Sensor de PH ------------
  int sensorTurbidezIn = analogRead(pinTurbidezIn); 
  delay(500);
  //---------------------Retorno------------------------------
  delay(2000);
  
  
  String nivelAgua = "\"NivelAgua\": ";
  nivelAgua.concat(sensorNivel);
  String humedad = "\"Humedad\": ";
  humedad.concat(lectura);
  String turbidez = "\"Turbidez\": ";
  turbidez.concat(sensorTurbidez);
  String turbidezin = "\"TurbidezIn\": ";
  turbidezin.concat(sensorTurbidezIn);
  retorno =  nivelAgua + " ," + humedad + " ," + turbidez + " ," + turbidezin  + "}";
  Serial.println(retorno);
}
