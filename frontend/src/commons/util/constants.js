export const APP_URL_DEV = "";

export const categories = [
  { id: "BUSINESS_AND_ECONOMICS", label: "Biznes i ekonomia", icon: "work" },
  { id: "EDUCATION", label: "Edukacja", icon: "school" },
  { id: "ENGINEERING", label: "Inynieria", icon: "settings" },
  { id: "MEDICINE", label: "Medycyna", icon: "stethoscope" },
  { id: "NATURAL", label: "Przyroda", icon: "psychiatry" },
  { id: "HUMANISTIC", label: "Nauki humanistyczne", icon: "neurology" },
  { id: "SOCIAL", label: "Nauki społeczne", icon: "group" },
  { id: "SCIENCE", label: "Nauki ścisłe", icon: "science" },
  { id: "ARTS", label: "Sztuka i kultura", icon: "palette" },
  { id: "INFORMATION", label: "Technologie Informacyjne", icon: "computer" },
];

export const defaultFilters = {
  stationary: true,
  universityType: ["PUBLIC"],
};

export const filterStructure = [
  {
    id: "universityType",
    label: "Typ uczelni",
    type: "select",
    options: [
      { label: "Publiczna", value: "PUBLIC" },
      { label: "Prywatna", value: "PRIVATE" },
    ],
  },
  {
    id: "level",
    label: "Poziom studiów",
    type: "select",
    options: [
      { label: "I stopnia (inżynierskie)", value: "1inz" },
      { label: "I stopnia (licencjackie)", value: "1lic" },
      { label: "II stopnia", value: "2" },
      { label: "Jednoliste magisterskie", value: "2jednolite" },
    ],
  },
  {
    id: "finalsSubjects",
    label: "Przedmioty maturalne",
    type: "select",
    options: [
      { label: "matematyka", value: "matematyka" },
      { label: "język polski", value: "język polski" },
      { label: "język obcy nowożytny", value: "język obcy nowożytny" },
      { label: "biologia", value: "biologia" },
      { label: "chemia", value: "chemia" },
      { label: "filozofia", value: "filozofia" },
      { label: "fizyka", value: "fizyka" },
      { label: "geografia", value: "geografia" },
      { label: "historia", value: "historia" },
      { label: "historia muzyki", value: "historia muzyki" },
      { label: "historia sztuki", value: "historia sztuki" },
      { label: "informatyka", value: "informatyka" },
      {
        label: "język łaciński i kultura antyczna",
        value: "język łaciński i kultura antyczna",
      },
      { label: "wiedza o społeczeństwie", value: "wiedza o społeczeństwie" },
    ],
  },
  {
    id: "interests",
    label: "Zainteresowania",
    type: "select",
    options: [
      { label: "Analiza danych", value: "Analiza Danych" },
      { label: "Analiza finansowa", value: "Analiza Finansowa" },
      { label: "Badania medyczne", value: "Badania Medyczne" },
      {
        label: "Biotechnologia środowiskowa",
        value: "Biotechnologia Środowiskowa",
      },
      { label: "Fizyka eksperymentalna", value: "Fizyka Eksperymentalna" },
      { label: "Fizyka teoretyczna", value: "Fizyka Teoretyczna" },
      { label: "Globalny marketing", value: "Globalny Marketing" },
      { label: "Governance IT", value: "Governance IT" },
      { label: "Inżynieria samochodowa", value: "Inżynieria Samochodowa" },
      { label: "Międzynarodowe finanse", value: "Międzynarodowe Finanse" },
      { label: "Modelowanie matematyczne", value: "Modelowanie Matematyczne" },
      { label: "Opieka nad pacjentem", value: "Opieka Nad Pacjentem" },
      { label: "Operacje górnicze", value: "Operacje Górnicze" },
      { label: "Planowanie finansowe", value: "Planowanie Finansowe" },
      { label: "Planowanie przestrzenne", value: "Planowanie Przestrzenne" },
      { label: "Polityka gospodarcza", value: "Polityka Gospodarcza" },
      { label: "Przywództwo", value: "Przywództwo" },
      { label: "Programowanie", value: "Programowanie" },
      {
        label: "Projektowanie elektroniki",
        value: "Projektowanie Elektroniki",
      },
      { label: "Projektowanie sprzętu", value: "Projektowanie Sprzętu" },
      { label: "Robotyka", value: "Robotyka" },
      { label: "Studia środowiskowe", value: "Studia Środowiskowe" },
      { label: "Strategia biznesowa", value: "Strategia Biznesowa" },
      {
        label: "Zarządzanie międzykulturowe",
        value: "Zarządzanie Międzykulturowe",
      },
      { label: "Zastosowania biomedyczne", value: "Zastosowania Biomedyczne" },
      {
        label: "Zrównoważone zarządzanie zasobami",
        value: "Zrównoważone Zarządzanie Zasobami",
      },
    ],
  },
  {
    id: "occupations",
    label: "Zawód po studiach",
    type: "select",
    options: [
      { label: "Analityk biznesowy", value: "Analityk Biznesowy" },
      { label: "Analityk danych", value: "Analityk Danych" },
      { label: "Analityk finansowy", value: "Analityk Finansowy" },
      { label: "Badacz fizyczny", value: "Badacz Fizyczny" },
      { label: "Biotechnolog", value: "Biotechnolog" },
      { label: "Controller finansowy", value: "Controller Finansowy" },
      { label: "Dyplomata", value: "Dyplomata" },
      { label: "Ekonomista", value: "Ekonomista" },
      { label: "Geograf", value: "Geograf" },
      { label: "Inżynier elektroniki", value: "Inżynier Elektroniki" },
      { label: "Inżynier górnik", value: "Inżynier Górnik" },
      { label: "Inżynier komputerowy", value: "Inżynier Komputerowy" },
      { label: "Inżynier mechanik", value: "Inżynier Mechanik" },
      { label: "Inżynier oprogramowania", value: "Inżynier Oprogramowania" },
      {
        label: "Konsultant ds. polityki gospodarczej",
        value: "Konsultant ds. Polityki Gospodarczej",
      },
      { label: "Księgowy", value: "Księgowy" },
      { label: "Lekarz", value: "Lekarz" },
      { label: "Manager", value: "Manager" },
      { label: "Nauczyciel akademicki", value: "Nauczyciel Akademicki" },
      { label: "Programista", value: "Programista" },
      { label: "Programista sprzętu", value: "Programista Sprzętu" },
      { label: "Projektant maszyn", value: "Projektant Maszyn" },
      {
        label: "Projektant układów elektronicznych",
        value: "Projektant Układów Elektronicznych",
      },
      {
        label: "Specjalista ds. badań biomedycznych",
        value: "Specjalista ds. Badań Biomedycznych",
      },
      {
        label: "Specjalista ds. badań medycznych",
        value: "Specjalista ds. Badań Medycznych",
      },
      {
        label: "Specjalista ds. analizy numerycznej",
        value: "Specjalista ds. Analizy Numerycznej",
      },
      {
        label: "Specjalista ds. informatyki zarządczej",
        value: "Specjalista ds. Informatyki Zarządczej",
      },
      {
        label: "Specjalista ds. międzynarodowych stosunków gospodarczych",
        value: "Specjalista ds. Międzynarodowych Stosunków Gospodarczych",
      },
      {
        label: "Specjalista ds. zarządzania zasobami ludzkimi",
        value: "Specjalista ds. Zarządzania Zasobami Ludzkimi",
      },
      {
        label: "Specjalista ds. zrównoważonego rozwoju",
        value: "Specjalista ds. Zrównoważonego Rozwoju",
      },
      { label: "Urbanista", value: "Urbanista" },
    ],
  },
];

export const results = [
  {
    id: 0,
    imageUrl:
      "https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3494&q=80",
    name: "Politechnika Śląska",
    location: "Katowice",
  },
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1581362072978-14998d01fdaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2756&q=80",
    name: "Akademia Górniczo-Hutnicza",
    location: "Kraków",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3538&q=80",
    name: "Uniwersytet Jagielloński",
    location: "Kraków",
  },
];
