int maxHume = 2;
int maxCO = 4;
int maxLumi = 3;
int maxTemp = 3;

//variables para tomar los valores que vienen del arduino
int CO2Arduino = 0;
int IluminacionArduino = 0;
int HumedadArduino = 0;
int TemperaturaIntArduino = 0;
int TemperaturaExtArduino =0;

int imageHume = 0;
int imageCO = 0;
int imageLumi = 0;
int imageTemp = 0;
PImage Fondo;

PImage [] images = new PImage[maxHume];
PImage [] dioxido = new PImage[maxCO];
PImage [] lumini = new PImage[maxLumi];
PImage [] temp = new PImage[maxTemp];

void setup() {
  size(602, 506);
  noFill();
  strokeWeight (5);


  Fondo = loadImage("Fondo.jpg");


  //*************************************
  //          Animar Humedad
  //*************************************

  for (int i = 0; i < images.length; i++) {
    images[i] = loadImage("hume" + i + ".png");
  }

  //*************************************
  //           Animar CO2
  //*************************************

  for (int j = 0; j < dioxido.length; j++) {
    dioxido[j] = loadImage("co2" + j + ".png");
  }

  //*************************************
  //           Animar Luz
  //*************************************

  for (int k = 0; k < lumini.length; k++) {
    lumini[k] = loadImage("luz" + k + ".png");
  }

  //*************************************
  //           Animar Temperatura
  //*************************************

  for (int m = 0; m < temp.length; m++) {
    temp[m] = loadImage("temp" + m + ".png");
  }
  frameRate(2);
  imageMode(CENTER);
}


void draw() {

  //getData();
  background(Fondo);


  //*************************************
  //           Animar Humeda
  //*************************************

  rect (30, 70, 160, 130);

  image(images[imageHume], 70, 150);
  imageHume = (imageHume+1) % images.length;

  textSize (18);
  text ("Nivel de Humedad", 40, 90);

  textSize (40);
  text (HumedadArduino + " %", 100, 160);

  //*************************************
  //           Animar CO2
  //*************************************

  rect (210, 70, 170, 130);

  image(dioxido[imageCO], 250, 150);
  imageCO = (imageCO+1) % dioxido.length;

  textSize (18);
  text ("Nivel de CO2", 220, 90);

  textSize (40);
  text (CO2Arduino, 280, 150);
  text ("ppm", 280, 175);

  //*************************************
  //           Animar Luz
  //*************************************

  rect (395, 70, 170, 130);

  image(lumini[imageLumi], 430, 150);
  imageLumi = (imageLumi+1) % lumini.length;

  textSize (18);
  text ("Nivel de Iluminación", 400, 90);

  textSize (40);
  text (IluminacionArduino + " Lm", 455, 160);

  //**********************************************
  //           Animar Temperatura Interna
  //**********************************************

  rect (110, 270, 170, 130);

  image(temp[imageTemp], 150, 350);
  imageTemp = (imageTemp+1) % temp.length;

  textSize (20);
  text ("Temp. Interna", 130, 300);

  textSize (40);
  text (TemperaturaIntArduino + "°C", 170, 360);

  //**********************************************
  //           Animar Temperatura Externa
  //**********************************************

  rect (310, 270, 170, 130);

  image(temp[imageTemp], 350, 350);
  imageTemp = (imageTemp+1) % temp.length;

  textSize (20);
  text ("Temp. Externa", 330, 300);

  textSize (40);
  text (TemperaturaExtArduino + "°C", 370, 360);
}

void getData() {
  String[]json = loadStrings("http://localhost:5000/api/data");
  for (String s : json) {
    println(s);
  }

  saveStrings("data.json", json);

  JSONObject jobj = loadJSONObject("data.json");


  JSONArray eventsJSONArray = jobj.getJSONArray("events");
  println(eventsJSONArray);
  for (int i = 0; i < eventsJSONArray.size(); i++) {
    JSONObject eventObject = eventsJSONArray.getJSONObject(i);
    printEventDetails(eventObject);
  }
}


void printEventDetails(JSONObject guildEvent) {
  //Asignacion de valores a las variables
  CO2Arduino = guildEvent.getInt("CO2");
  IluminacionArduino = 600 - guildEvent.getInt("Iluminacion");
  HumedadArduino = 100 - ((guildEvent.getInt("Humedad")*100)/1024);
  TemperaturaIntArduino = guildEvent.getInt("TemperaturaInterna");
  TemperaturaExtArduino = guildEvent.getInt("TemperaturaExterna");

  println("Fecha:" + guildEvent.getString("Fecha"));
  println("CO2: " + guildEvent.getInt("CO2"));
  println("Iluminacion:"+ guildEvent.getInt("Iluminacion"));
  println("Humedad:" + guildEvent.getInt("Humedad"));
  println("TemperaturaInterna:" + guildEvent.getInt("TemperaturaInterna"));
  println("TemperaturaExterna:" + guildEvent.getInt("TemperaturaExterna"));
  println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
}
