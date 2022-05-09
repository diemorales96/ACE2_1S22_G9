#include <DHT.h>

unsigned long contador = 0;

// Definimos el pin digital donde se conecta el sensor
#define DHTPIN 2
// Dependiendo del tipo de sensor
#define DHTTYPE DHT11
// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);

int volt = 5;
int volt2 = 6;
int chispazo = 30;
int s_analogica_mq135 = 0;
int sensorT = 0;
String retorno;
int motor = 31;
bool gas;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial1.begin(9600);
  // Comenzamos el sensor DHT
  dht.begin();
  pinMode(volt, OUTPUT);
  digitalWrite(volt, true);
  pinMode(volt2, OUTPUT);
  digitalWrite(volt2, true);
  pinMode(chispazo, OUTPUT);
  pinMode(motor, OUTPUT);
  gas = false;
}

void loop() {
  
  opciones();
  // put your main code here, to run repeatedly:
  //-------------------- Gas----------------
  s_analogica_mq135 = analogRead(A0);
  //----------------Temperatura---------------
  sensorT = analogRead(A1);
  // Leemos la temperatura en grados centígrados (por defecto)
  int t = dht.readTemperature();
  //---------------------Retorno------------------------------
  //delay(2000);
  Espera(2000);
  String bioGas = "\"BioGas\": ";
  bioGas.concat(s_analogica_mq135);
  String Tempint = "\"Temperatura\": ";
  //Tempint.concat(sensorT * 5 * 100 / 1024);
  Tempint.concat(t);
  String estado = "";
  if(gas){
    estado = "\"estado\": 1";
  }
  else{
    estado = "\"estado\": 0";
    }
  retorno =  bioGas + " ," + Tempint + " ," + estado + "}";
  Serial.println(retorno);
}


void opciones(){
  
 String algo="";
  while(Serial1.available()>0){
   algo +=(char)Serial1.read();
  }
  if(algo!=""){
    if(algo=="1"){
      enviarMsj("Se abrio paso de gas:  ","Gas abierto");   
      gas = true;
      digitalWrite(motor, true);
      Espera(3000);
      digitalWrite(motor, false);
    }else if(algo=="2"){
      enviarMsj("Se cerro paso de gas:  ","Gas cerrado");
      gas = false;
      digitalWrite(motor, true);
      Espera(3000);
      digitalWrite(motor, false);
    }else if(algo=="3"){
      digitalWrite(chispazo, true);
      Espera(3000);
      digitalWrite(chispazo, false);
      Espera(2000);
      digitalWrite(chispazo, true);
      Espera(2000);
      digitalWrite(chispazo, false);
      Espera(1000);
      enviarMsj("Se dio chispazo:  ","Chispa");
      digitalWrite(chispazo, true);
      Espera(1000);
      digitalWrite(chispazo, false);
    }else if(algo=="4"){
 
    }
  }
  Espera(500);
}

void enviarMsj(String msj1, String msj2){
  Serial1.println(msj2);
}

void Espera(unsigned long valor)
{
  contador = millis() + valor;
 do {
         
      } while (contador>=millis()); 
}

void print_tiempo(unsigned long tiempo_millis){
    Serial.print("Tiempo: ");
    Serial.print(tiempo_millis/1000);
    Serial.print("s - ");
}
