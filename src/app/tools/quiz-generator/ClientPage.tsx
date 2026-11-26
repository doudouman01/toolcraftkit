"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "quiz-generator";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  type: "mc" | "tf";
}

/* ─── QUESTION TEMPLATES ─── */
const TEMPLATES: Record<string, { mc: { q: string; opts: string[]; ci: number }[]; tf: { q: string; answer: boolean }[] }> = {
  science: {
    mc: [
      { q: "What is the chemical symbol for water?", opts: ["H2O", "CO2", "NaCl", "O2"], ci: 0 },
      { q: "Which planet is known as the Red Planet?", opts: ["Venus", "Mars", "Jupiter", "Saturn"], ci: 1 },
      { q: "What gas do plants absorb from the atmosphere?", opts: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], ci: 2 },
      { q: "How many bones are in the adult human body?", opts: ["186", "206", "226", "256"], ci: 1 },
      { q: "What is the speed of light in km/s?", opts: ["150,000", "200,000", "300,000", "400,000"], ci: 2 },
      { q: "What is the smallest unit of matter?", opts: ["Molecule", "Cell", "Atom", "Electron"], ci: 2 },
      { q: "Which element has the atomic number 1?", opts: ["Helium", "Oxygen", "Carbon", "Hydrogen"], ci: 3 },
      { q: "What force keeps planets in orbit?", opts: ["Magnetism", "Gravity", "Friction", "Inertia"], ci: 1 },
      { q: "What organ pumps blood in the human body?", opts: ["Lungs", "Brain", "Liver", "Heart"], ci: 3 },
      { q: "What is the pH of pure water?", opts: ["5", "7", "9", "10"], ci: 1 },
      { q: "Which vitamin is produced by sunlight?", opts: ["A", "B12", "C", "D"], ci: 3 },
      { q: "What is the hardest natural substance?", opts: ["Gold", "Iron", "Diamond", "Quartz"], ci: 2 },
      { q: "How many chromosomes do humans have?", opts: ["23", "44", "46", "48"], ci: 2 },
      { q: "What is the largest organ in the human body?", opts: ["Liver", "Brain", "Skin", "Heart"], ci: 2 },
      { q: "What type of rock is formed by volcanic activity?", opts: ["Sedimentary", "Metamorphic", "Igneous", "Mineral"], ci: 2 },
      { q: "What is the main gas in Earth's atmosphere?", opts: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], ci: 2 },
      { q: "What particle has a positive charge?", opts: ["Electron", "Neutron", "Proton", "Photon"], ci: 2 },
      { q: "Which planet has the most moons?", opts: ["Jupiter", "Saturn", "Uranus", "Neptune"], ci: 1 },
      { q: "What is the boiling point of water in Celsius?", opts: ["90°C", "100°C", "110°C", "120°C"], ci: 1 },
      { q: "What is DNA short for?", opts: ["Deoxyribose Nucleic Acid", "Deoxyribonucleic Acid", "Dinucleotide Acid", "Dinitrogen Acid"], ci: 1 },
    ],
    tf: [
      { q: "The Sun is a star.", answer: true },
      { q: "Humans use 100% of their brain.", answer: false },
      { q: "Sound travels faster than light.", answer: false },
      { q: "Water is made of hydrogen and oxygen.", answer: true },
      { q: "Diamonds are made of carbon.", answer: true },
      { q: "Lightning never strikes the same place twice.", answer: false },
      { q: "Antibiotics kill viruses.", answer: false },
      { q: "The Great Wall of China is visible from space.", answer: false },
      { q: "Octopuses have three hearts.", answer: true },
      { q: "Gold is the most conductive metal.", answer: false },
      { q: "Venus is the hottest planet in the solar system.", answer: true },
      { q: "Red blood cells carry oxygen.", answer: true },
      { q: "Sharks are mammals.", answer: false },
      { q: "The Sahara is the largest desert on Earth.", answer: false },
      { q: "Bananas are berries.", answer: true },
      { q: "Mars has a thicker atmosphere than Earth.", answer: false },
      { q: "Photosynthesis produces oxygen.", answer: true },
      { q: "The Pacific Ocean is the largest ocean.", answer: true },
      { q: "Bats are blind.", answer: false },
      { q: "Pluto is classified as a dwarf planet.", answer: true },
    ],
  },
  history: {
    mc: [
      { q: "In which year did World War II end?", opts: ["1943", "1944", "1945", "1946"], ci: 2 },
      { q: "Who was the first President of the United States?", opts: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], ci: 2 },
      { q: "Which empire built the Colosseum?", opts: ["Greek", "Roman", "Ottoman", "Byzantine"], ci: 1 },
      { q: "What year did the Berlin Wall fall?", opts: ["1987", "1989", "1991", "1993"], ci: 1 },
      { q: "Who discovered America in 1492?", opts: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "Amerigo Vespucci"], ci: 2 },
      { q: "The French Revolution began in which year?", opts: ["1776", "1789", "1799", "1804"], ci: 1 },
      { q: "Who was the first man on the Moon?", opts: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], ci: 2 },
      { q: "Which country was not part of the Allied Powers in WWII?", opts: ["USA", "UK", "Italy", "USSR"], ci: 2 },
      { q: "The Renaissance began in which country?", opts: ["France", "England", "Italy", "Spain"], ci: 2 },
      { q: "Who wrote the Declaration of Independence?", opts: ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"], ci: 1 },
      { q: "What was the longest war in US history?", opts: ["Civil War", "Vietnam War", "War in Afghanistan", "War of 1812"], ci: 2 },
      { q: "Which ancient civilization built the pyramids?", opts: ["Roman", "Greek", "Egyptian", "Mesopotamian"], ci: 2 },
      { q: "Who painted the ceiling of the Sistine Chapel?", opts: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], ci: 2 },
      { q: "In what year did the Titanic sink?", opts: ["1910", "1912", "1914", "1916"], ci: 1 },
      { q: "Which empire was ruled by Genghis Khan?", opts: ["Ottoman", "Roman", "Mongol", "Persian"], ci: 2 },
      { q: "What was the Cold War primarily between?", opts: ["USA and China", "USA and USSR", "UK and Germany", "France and Russia"], ci: 1 },
      { q: "Who invented the printing press?", opts: ["Thomas Edison", "Johannes Gutenberg", "Nikola Tesla", "Alexander Bell"], ci: 1 },
      { q: "The Industrial Revolution started in which country?", opts: ["France", "Germany", "England", "USA"], ci: 2 },
      { q: "What year did the Roman Empire fall?", opts: ["376 AD", "410 AD", "476 AD", "500 AD"], ci: 2 },
      { q: "Who was known as the Iron Lady?", opts: ["Angela Merkel", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"], ci: 1 },
    ],
    tf: [
      { q: "The Great Fire of London was in 1666.", answer: true },
      { q: "Napoleon was born in France.", answer: false },
      { q: "The Cold War involved direct military combat.", answer: false },
      { q: "Cleopatra was Greek by heritage.", answer: true },
      { q: "The first Olympic Games were held in Rome.", answer: false },
      { q: "The Magna Carta was signed in 1215.", answer: true },
      { q: "Alexander the Great was from Sparta.", answer: false },
      { q: "The USSR was dissolved in 1991.", answer: true },
      { q: "Vikings wore horned helmets.", answer: false },
      { q: "The Mona Lisa was stolen from the Louvre in 1911.", answer: true },
      { q: "Queen Victoria ruled for over 60 years.", answer: true },
      { q: "The first computer was built in the 1800s.", answer: true },
      { q: "The Hundred Years' War lasted exactly 100 years.", answer: false },
      { q: "Gandhi led India's independence movement.", answer: true },
      { q: "The Panama Canal connects the Atlantic and Pacific.", answer: true },
      { q: "Ancient Romans used lead pipes for plumbing.", answer: true },
      { q: "The telephone was invented in the 20th century.", answer: false },
      { q: "Columbus believed he had reached India.", answer: true },
      { q: "The Aztec Empire was in South America.", answer: false },
      { q: "Paper was invented in China.", answer: true },
    ],
  },
  technology: {
    mc: [
      { q: "What does CPU stand for?", opts: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Power Unit"], ci: 0 },
      { q: "Who founded Apple Inc.?", opts: ["Bill Gates", "Steve Jobs", "Elon Musk", "Jeff Bezos"], ci: 1 },
      { q: "What programming language is used for web styling?", opts: ["HTML", "JavaScript", "CSS", "Python"], ci: 2 },
      { q: "What does HTML stand for?", opts: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "HyperText Making Language"], ci: 0 },
      { q: "Which company developed the Android OS?", opts: ["Apple", "Microsoft", "Google", "Samsung"], ci: 2 },
      { q: "What is the main purpose of RAM?", opts: ["Long-term storage", "Temporary data storage", "Internet connection", "Graphics rendering"], ci: 1 },
      { q: "What year was the iPhone first released?", opts: ["2005", "2006", "2007", "2008"], ci: 2 },
      { q: "What is the most used programming language in 2024?", opts: ["Java", "C++", "JavaScript", "Rust"], ci: 2 },
      { q: "What does AI stand for?", opts: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Applied Informatics"], ci: 1 },
      { q: "Who created the World Wide Web?", opts: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Linus Torvalds"], ci: 2 },
      { q: "What is blockchain primarily used for?", opts: ["Email", "Decentralized record-keeping", "Video streaming", "GPS navigation"], ci: 1 },
      { q: "Which company makes the GPU brand GeForce?", opts: ["AMD", "Intel", "Nvidia", "Qualcomm"], ci: 2 },
      { q: "What does SSD stand for?", opts: ["Solid State Drive", "Super Speed Disk", "System Storage Device", "Serial Signal Drive"], ci: 0 },
      { q: "What is the name of Meta's VR headset?", opts: ["HoloLens", "Quest", "Vive", "Index"], ci: 1 },
      { q: "Which protocol is used for secure web browsing?", opts: ["HTTP", "FTP", "HTTPS", "SMTP"], ci: 2 },
      { q: "What language does most AI/ML research use?", opts: ["Java", "C#", "Python", "Ruby"], ci: 2 },
      { q: "Who is the CEO of Tesla?", opts: ["Tim Cook", "Satya Nadella", "Elon Musk", "Jeff Bezos"], ci: 2 },
      { q: "What does IoT stand for?", opts: ["Internet of Things", "Integration of Technology", "Internal Operation Tool", "Information on Track"], ci: 0 },
      { q: "What is the cloud in cloud computing?", opts: ["A weather system", "Remote servers on the internet", "A type of hard drive", "A wireless protocol"], ci: 1 },
      { q: "Which company developed ChatGPT?", opts: ["Google", "Meta", "OpenAI", "Anthropic"], ci: 2 },
    ],
    tf: [
      { q: "The first computer mouse was made of wood.", answer: true },
      { q: "5G is the fifth generation of mobile networks.", answer: true },
      { q: "Python was named after Monty Python.", answer: true },
      { q: "The first email was sent in 1991.", answer: false },
      { q: "Linux is a proprietary operating system.", answer: false },
      { q: "USB stands for Universal Serial Bus.", answer: true },
      { q: "Moore's Law is about memory capacity.", answer: false },
      { q: "Java and JavaScript are the same language.", answer: false },
      { q: "The first website is still online today.", answer: true },
      { q: "Quantum computers use qubits.", answer: true },
      { q: "Wi-Fi stands for Wireless Fidelity.", answer: false },
      { q: "Bitcoin was created by Satoshi Nakamoto.", answer: true },
      { q: "SQL is a programming language.", answer: false },
      { q: "GPT stands for Generative Pre-trained Transformer.", answer: true },
      { q: "The first smartphone was the iPhone.", answer: false },
      { q: "HTTPS encrypts data in transit.", answer: true },
      { q: "RAM is a form of permanent storage.", answer: false },
      { q: "Machine learning is a subset of AI.", answer: true },
      { q: "The internet and the World Wide Web are the same thing.", answer: false },
      { q: "Ethernet was invented at Xerox PARC.", answer: true },
    ],
  },
  geography: {
    mc: [
      { q: "What is the largest continent by area?", opts: ["Africa", "North America", "Europe", "Asia"], ci: 3 },
      { q: "Which river is the longest in the world?", opts: ["Amazon", "Nile", "Yangtze", "Mississippi"], ci: 1 },
      { q: "What is the capital of Australia?", opts: ["Sydney", "Melbourne", "Canberra", "Brisbane"], ci: 2 },
      { q: "Which country has the most people?", opts: ["USA", "India", "China", "Indonesia"], ci: 1 },
      { q: "What is the smallest country in the world?", opts: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], ci: 1 },
      { q: "Which ocean is the deepest?", opts: ["Atlantic", "Indian", "Arctic", "Pacific"], ci: 3 },
      { q: "Mount Everest is in which mountain range?", opts: ["Andes", "Alps", "Rockies", "Himalayas"], ci: 3 },
      { q: "What is the driest continent?", opts: ["Africa", "Australia", "Antarctica", "Asia"], ci: 2 },
      { q: "Which country has the most time zones?", opts: ["Russia", "USA", "France", "China"], ci: 2 },
      { q: "What is the capital of Canada?", opts: ["Toronto", "Vancouver", "Ottawa", "Montreal"], ci: 2 },
      { q: "Which desert is the largest hot desert?", opts: ["Gobi", "Kalahari", "Sahara", "Arabian"], ci: 2 },
      { q: "What sea separates Europe and Africa?", opts: ["Black Sea", "Red Sea", "Mediterranean", "Caspian"], ci: 2 },
      { q: "Which country is known as the Land of the Rising Sun?", opts: ["China", "Japan", "Thailand", "Korea"], ci: 1 },
      { q: "What is the longest mountain range in the world?", opts: ["Himalayas", "Rockies", "Alps", "Andes"], ci: 3 },
      { q: "Which African country has the largest economy?", opts: ["South Africa", "Egypt", "Nigeria", "Kenya"], ci: 2 },
      { q: "What is the capital of Brazil?", opts: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"], ci: 2 },
      { q: "Which strait separates Asia from North America?", opts: ["Gibraltar", "Malacca", "Bering", "Hormuz"], ci: 2 },
      { q: "What is the most spoken language in the world?", opts: ["English", "Mandarin Chinese", "Spanish", "Hindi"], ci: 1 },
      { q: "Which European country is shaped like a boot?", opts: ["Spain", "Greece", "Italy", "Portugal"], ci: 2 },
      { q: "What is the largest lake in the world by surface area?", opts: ["Lake Superior", "Caspian Sea", "Lake Victoria", "Lake Baikal"], ci: 1 },
    ],
    tf: [
      { q: "Africa is a country.", answer: false },
      { q: "Iceland is covered mostly in ice.", answer: false },
      { q: "Russia spans two continents.", answer: true },
      { q: "The Amazon Rainforest is in Africa.", answer: false },
      { q: "There are 7 continents on Earth.", answer: true },
      { q: "Mount Kilimanjaro is in Kenya.", answer: false },
      { q: "The Dead Sea is the lowest point on land.", answer: true },
      { q: "Canada is the largest country by area.", answer: false },
      { q: "The Equator passes through Brazil.", answer: true },
      { q: "Antarctica has no permanent population.", answer: true },
      { q: "The Nile flows south to north.", answer: true },
      { q: "Greenland is part of North America geographically.", answer: true },
      { q: "Tokyo is the most populated city in the world.", answer: true },
      { q: "Switzerland has a coastline.", answer: false },
      { q: "Australia is both a country and a continent.", answer: true },
      { q: "The Sahara Desert is growing.", answer: true },
      { q: "There are 50 countries in Europe.", answer: false },
      { q: "Lake Baikal is the deepest lake in the world.", answer: true },
      { q: "Panama is in South America.", answer: false },
      { q: "The Pacific Ring of Fire has the most volcanoes.", answer: true },
    ],
  },
  sports: {
    mc: [
      { q: "How many players are on a soccer team?", opts: ["9", "10", "11", "12"], ci: 2 },
      { q: "Which country has won the most FIFA World Cups?", opts: ["Germany", "Italy", "Argentina", "Brazil"], ci: 3 },
      { q: "What sport is played at Wimbledon?", opts: ["Golf", "Tennis", "Cricket", "Polo"], ci: 1 },
      { q: "How many points is a touchdown worth in American football?", opts: ["3", "5", "6", "7"], ci: 2 },
      { q: "Which NBA player is known as 'The King'?", opts: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Stephen Curry"], ci: 2 },
      { q: "What is the diameter of a basketball hoop in inches?", opts: ["16", "18", "20", "22"], ci: 1 },
      { q: "In which sport is the term 'birdie' used?", opts: ["Tennis", "Badminton", "Golf", "Cricket"], ci: 2 },
      { q: "How long is a marathon in miles?", opts: ["20.2", "24.2", "26.2", "28.2"], ci: 2 },
      { q: "Which country invented cricket?", opts: ["Australia", "India", "England", "South Africa"], ci: 2 },
      { q: "What color card means ejection in soccer?", opts: ["Yellow", "Blue", "Red", "Green"], ci: 2 },
      { q: "How many sets does a man play in a Grand Slam tennis final?", opts: ["3", "4", "5", "6"], ci: 2 },
      { q: "Which Olympic Games were held in Tokyo?", opts: ["2016", "2020", "2024", "2028"], ci: 1 },
      { q: "What is the national sport of Japan?", opts: ["Judo", "Sumo", "Karate", "Kendo"], ci: 1 },
      { q: "How many holes in a standard golf course?", opts: ["9", "16", "18", "20"], ci: 2 },
      { q: "Which country hosts the Tour de France?", opts: ["Italy", "Spain", "France", "Belgium"], ci: 2 },
      { q: "What sport uses a shuttlecock?", opts: ["Tennis", "Squash", "Badminton", "Ping Pong"], ci: 2 },
      { q: "How many rings are in the Olympic logo?", opts: ["4", "5", "6", "7"], ci: 1 },
      { q: "Which F1 driver has the most World Championships?", opts: ["Ayrton Senna", "Michael Schumacher", "Lewis Hamilton", "Max Verstappen"], ci: 2 },
      { q: "What is the highest score in a single frame of bowling?", opts: ["200", "250", "300", "350"], ci: 2 },
      { q: "In which city were the 2024 Summer Olympics held?", opts: ["Tokyo", "London", "Paris", "Los Angeles"], ci: 2 },
    ],
    tf: [
      { q: "A rugby ball is round.", answer: false },
      { q: "Michael Phelps has won more than 20 Olympic gold medals.", answer: true },
      { q: "Soccer is called 'football' in most countries.", answer: true },
      { q: "The Super Bowl is played in baseball.", answer: false },
      { q: "Table tennis originated in England.", answer: true },
      { q: "A basketball game has four quarters.", answer: true },
      { q: "The FIFA World Cup is held every 2 years.", answer: false },
      { q: "Tiger Woods is a professional tennis player.", answer: false },
      { q: "Ice hockey uses a puck.", answer: true },
      { q: "The Boston Marathon is the oldest annual marathon.", answer: true },
      { q: "A boxing ring is actually circular.", answer: false },
      { q: "Cricket matches can last 5 days.", answer: true },
      { q: "Usain Bolt's 100m record is under 9.5 seconds.", answer: true },
      { q: "Golf was invented in Scotland.", answer: true },
      { q: "NBA games have 3 periods.", answer: false },
      { q: "Volleyball was invented in the USA.", answer: true },
      { q: "Formula 1 cars use diesel fuel.", answer: false },
      { q: "The World Series is a baseball competition.", answer: true },
      { q: "Surfing will be an Olympic sport.", answer: true },
      { q: "A standard soccer match is 80 minutes.", answer: false },
    ],
  },
  music: {
    mc: [
      { q: "How many keys does a standard piano have?", opts: ["76", "82", "88", "92"], ci: 2 },
      { q: "Which band recorded 'Bohemian Rhapsody'?", opts: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"], ci: 2 },
      { q: "What instrument has 6 strings by default?", opts: ["Violin", "Guitar", "Bass", "Ukulele"], ci: 1 },
      { q: "Which musical term means 'gradually getting louder'?", opts: ["Diminuendo", "Staccato", "Crescendo", "Fortissimo"], ci: 2 },
      { q: "What genre originated in New Orleans?", opts: ["Country", "Blues", "Jazz", "Rock"], ci: 2 },
      { q: "Which note is the 'concert pitch' standard?", opts: ["C", "D", "A", "G"], ci: 2 },
      { q: "How many strings does a standard violin have?", opts: ["3", "4", "5", "6"], ci: 1 },
      { q: "Who is known as the 'King of Pop'?", opts: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"], ci: 2 },
      { q: "What tempo marking means 'very fast'?", opts: ["Adagio", "Andante", "Allegro", "Presto"], ci: 3 },
      { q: "Which instrument is largest in the string family?", opts: ["Cello", "Viola", "Double Bass", "Harp"], ci: 2 },
      { q: "What is the BPM range for 'Allegro'?", opts: ["60-80", "80-100", "120-156", "160-200"], ci: 2 },
      { q: "Which genre is Kendrick Lamar known for?", opts: ["Rock", "Jazz", "Hip-Hop", "R&B"], ci: 2 },
      { q: "What does 'forte' mean in music?", opts: ["Soft", "Loud", "Slow", "Fast"], ci: 1 },
      { q: "How many notes are in a chromatic scale?", opts: ["7", "8", "12", "14"], ci: 2 },
      { q: "Which woodwind instrument uses a double reed?", opts: ["Flute", "Clarinet", "Oboe", "Saxophone"], ci: 2 },
      { q: "What is the lowest male singing voice?", opts: ["Tenor", "Baritone", "Bass", "Alto"], ci: 2 },
      { q: "Which decade saw the birth of rock and roll?", opts: ["1940s", "1950s", "1960s", "1970s"], ci: 1 },
      { q: "What is the time signature of a waltz?", opts: ["2/4", "3/4", "4/4", "6/8"], ci: 1 },
      { q: "Who composed 'The Four Seasons'?", opts: ["Mozart", "Bach", "Vivaldi", "Beethoven"], ci: 2 },
      { q: "What DAW does most electronic music producers use?", opts: ["Word", "Ableton Live", "Photoshop", "Excel"], ci: 1 },
    ],
    tf: [
      { q: "A sharp raises a note by one semitone.", answer: true },
      { q: "Mozart composed over 600 works.", answer: true },
      { q: "The trumpet is a woodwind instrument.", answer: false },
      { q: "K-Pop originated in South Korea.", answer: true },
      { q: "Autotune was invented in 2010.", answer: false },
      { q: "A metronome helps keep time.", answer: true },
      { q: "Reggae music originated in Jamaica.", answer: true },
      { q: "The electric guitar was invented before the acoustic.", answer: false },
      { q: "Beyoncé started in Destiny's Child.", answer: true },
      { q: "A DJ creates music by playing pre-recorded tracks.", answer: true },
      { q: "Beethoven was deaf when he composed his 9th Symphony.", answer: true },
      { q: "MIDI stands for Musical Instrument Digital Interface.", answer: true },
      { q: "The ukulele has 6 strings.", answer: false },
      { q: "Spotify was founded in Sweden.", answer: true },
      { q: "Opera originated in Italy.", answer: true },
      { q: "A flat lowers a note by one semitone.", answer: true },
      { q: "The harmonica is a percussion instrument.", answer: false },
      { q: "BTS is a K-Pop group.", answer: true },
      { q: "The saxophone was invented in Belgium.", answer: true },
      { q: "EDM stands for Electronic Dance Music.", answer: true },
    ],
  },
  movies: {
    mc: [
      { q: "Who directed 'Inception'?", opts: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"], ci: 1 },
      { q: "What is the highest-grossing film of all time?", opts: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars"], ci: 1 },
      { q: "Which actor played Jack in 'Titanic'?", opts: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Matt Damon"], ci: 2 },
      { q: "What year was the first 'Star Wars' film released?", opts: ["1975", "1977", "1979", "1980"], ci: 1 },
      { q: "Which studio created 'Toy Story'?", opts: ["DreamWorks", "Disney", "Pixar", "Warner Bros"], ci: 2 },
      { q: "Who plays Wolverine in the X-Men films?", opts: ["Chris Evans", "Robert Downey Jr.", "Hugh Jackman", "Chris Hemsworth"], ci: 2 },
      { q: "What is the fictional metal in 'Black Panther'?", opts: ["Adamantium", "Vibranium", "Kryptonite", "Unobtanium"], ci: 1 },
      { q: "Which film won Best Picture at the 2020 Oscars?", opts: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"], ci: 2 },
      { q: "What genre is 'The Shining'?", opts: ["Comedy", "Sci-Fi", "Horror", "Drama"], ci: 2 },
      { q: "Who directed 'Pulp Fiction'?", opts: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Coen Brothers"], ci: 1 },
      { q: "How many 'Harry Potter' films are there?", opts: ["6", "7", "8", "9"], ci: 2 },
      { q: "What is Indiana Jones' real first name?", opts: ["Henry", "James", "John", "William"], ci: 0 },
      { q: "Which animated film features a fish named Nemo?", opts: ["Shark Tale", "Finding Nemo", "The Little Mermaid", "Moana"], ci: 1 },
      { q: "Who directed 'Schindler's List'?", opts: ["Spielberg", "Scorsese", "Kubrick", "Coppola"], ci: 0 },
      { q: "What year did the MCU start with 'Iron Man'?", opts: ["2006", "2008", "2010", "2012"], ci: 1 },
      { q: "Which Pixar film is about emotions?", opts: ["Up", "Soul", "Inside Out", "Coco"], ci: 2 },
      { q: "Who plays the Joker in 'The Dark Knight'?", opts: ["Jack Nicholson", "Jared Leto", "Heath Ledger", "Joaquin Phoenix"], ci: 2 },
      { q: "What is the name of Simba's father?", opts: ["Scar", "Mufasa", "Rafiki", "Zazu"], ci: 1 },
      { q: "Which franchise features a DeLorean time machine?", opts: ["Terminator", "Back to the Future", "Doctor Who", "Star Trek"], ci: 1 },
      { q: "What is Darth Vader's real name?", opts: ["Luke Skywalker", "Han Solo", "Anakin Skywalker", "Obi-Wan Kenobi"], ci: 2 },
    ],
    tf: [
      { q: "The Godfather was released in 1972.", answer: true },
      { q: "Avatar was directed by Steven Spielberg.", answer: false },
      { q: "The first James Bond film was 'Dr. No'.", answer: true },
      { q: "Frozen is the highest-grossing animated film.", answer: true },
      { q: "Tom Hanks voiced Woody in Toy Story.", answer: true },
      { q: "The Matrix was released in 2001.", answer: false },
      { q: "Jurassic Park used only CGI dinosaurs.", answer: false },
      { q: "Shrek won the first Academy Award for Best Animated Feature.", answer: true },
      { q: "Leonardo DiCaprio won his first Oscar for Titanic.", answer: false },
      { q: "The Lord of the Rings trilogy was filmed in New Zealand.", answer: true },
      { q: "Disney's 'Frozen' is based on a Hans Christian Andersen story.", answer: true },
      { q: "Mad Max: Fury Road has minimal dialogue.", answer: true },
      { q: "Citizen Kane is often called the greatest film ever made.", answer: true },
      { q: "The first Avengers film came out in 2010.", answer: false },
      { q: "Morgan Freeman narrated 'March of the Penguins'.", answer: true },
      { q: "Rocky is based on a true story.", answer: false },
      { q: "WALL-E takes place on Earth.", answer: false },
      { q: "Alfred Hitchcock directed 'Psycho'.", answer: true },
      { q: "The Lion King was Disney's first animated musical.", answer: false },
      { q: "Gollum says 'My precious' in Lord of the Rings.", answer: true },
    ],
  },
  literature: {
    mc: [
      { q: "Who wrote '1984'?", opts: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], ci: 1 },
      { q: "What is the first book of the Bible?", opts: ["Exodus", "Leviticus", "Genesis", "Psalms"], ci: 2 },
      { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], ci: 1 },
      { q: "What is the longest novel ever published?", opts: ["War and Peace", "In Search of Lost Time", "Don Quixote", "Les Misérables"], ci: 1 },
      { q: "Who created Sherlock Holmes?", opts: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "Ian Fleming"], ci: 1 },
      { q: "What genre is 'Dune'?", opts: ["Fantasy", "Horror", "Science Fiction", "Mystery"], ci: 2 },
      { q: "Who wrote 'Pride and Prejudice'?", opts: ["Charlotte Brontë", "Jane Austen", "Mary Shelley", "Virginia Woolf"], ci: 1 },
      { q: "In which language was 'Don Quixote' originally written?", opts: ["Portuguese", "Italian", "Spanish", "French"], ci: 2 },
      { q: "Who wrote 'The Great Gatsby'?", opts: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], ci: 1 },
      { q: "What is Harry Potter's middle name?", opts: ["James", "Albus", "Sirius", "Arthur"], ci: 0 },
      { q: "Who wrote 'One Hundred Years of Solitude'?", opts: ["Pablo Neruda", "Jorge Luis Borges", "Gabriel García Márquez", "Isabel Allende"], ci: 2 },
      { q: "What animal is in the title of George Orwell's political allegory?", opts: ["Dog", "Horse", "Farm animals", "Pig"], ci: 2 },
      { q: "Who wrote 'The Odyssey'?", opts: ["Sophocles", "Virgil", "Homer", "Plato"], ci: 2 },
      { q: "What genre is Stephen King known for?", opts: ["Romance", "Horror", "Comedy", "Historical Fiction"], ci: 1 },
      { q: "Which Brontë sister wrote 'Wuthering Heights'?", opts: ["Charlotte", "Anne", "Emily", "All three"], ci: 2 },
      { q: "Who is the author of 'The Alchemist'?", opts: ["Paulo Coelho", "Gabriel García Márquez", "Haruki Murakami", "Khaled Hosseini"], ci: 0 },
      { q: "What dystopian novel features a society that burns books?", opts: ["1984", "Brave New World", "Fahrenheit 451", "The Handmaid's Tale"], ci: 2 },
      { q: "Which Tolkien book was published first?", opts: ["The Lord of the Rings", "The Silmarillion", "The Hobbit", "Unfinished Tales"], ci: 2 },
      { q: "Who wrote 'Crime and Punishment'?", opts: ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"], ci: 1 },
      { q: "What is the first word in the novel 'Moby-Dick'?", opts: ["Once", "Call", "The", "Captain"], ci: 1 },
    ],
    tf: [
      { q: "J.K. Rowling was rejected by 12 publishers before Harry Potter was accepted.", answer: true },
      { q: "Mark Twain is a pen name.", answer: true },
      { q: "The Bible is the best-selling book of all time.", answer: true },
      { q: "To Kill a Mockingbird was written by Harper Lee.", answer: true },
      { q: "Frankenstein was written by a man.", answer: false },
      { q: "Agatha Christie is the best-selling fiction author of all time.", answer: true },
      { q: "Lord of the Flies is about children on a desert island.", answer: true },
      { q: "The first printed book was the Gutenberg Bible.", answer: true },
      { q: "Charles Dickens wrote 'Les Misérables'.", answer: false },
      { q: "Dr. Seuss's real name was Theodor Geisel.", answer: true },
      { q: "'Brave New World' was written before '1984'.", answer: true },
      { q: "Stephen King wrote 'The Shining'.", answer: true },
      { q: "The word 'robot' comes from a Czech play.", answer: true },
      { q: "Oscar Wilde was Irish.", answer: true },
      { q: "Hemingway wrote 'The Grapes of Wrath'.", answer: false },
      { q: "The first novel ever written is considered to be 'Don Quixote'.", answer: false },
      { q: "Roald Dahl wrote 'Charlie and the Chocolate Factory'.", answer: true },
      { q: "Anna Karenina was written by Dostoevsky.", answer: false },
      { q: "The Hunger Games is a dystopian novel.", answer: true },
      { q: "Edgar Allan Poe is credited with inventing the detective fiction genre.", answer: true },
    ],
  },
  food: {
    mc: [
      { q: "What is the main ingredient in guacamole?", opts: ["Tomato", "Avocado", "Pepper", "Onion"], ci: 1 },
      { q: "Which country is sushi from?", opts: ["China", "Korea", "Japan", "Thailand"], ci: 2 },
      { q: "What is the most consumed fruit in the world?", opts: ["Apple", "Banana", "Orange", "Mango"], ci: 1 },
      { q: "Which spice is the most expensive by weight?", opts: ["Vanilla", "Saffron", "Cinnamon", "Cardamom"], ci: 1 },
      { q: "What type of pastry is a croissant?", opts: ["Puff", "Shortcrust", "Laminated", "Choux"], ci: 2 },
      { q: "Which nut is used to make marzipan?", opts: ["Walnut", "Cashew", "Almond", "Pistachio"], ci: 2 },
      { q: "What gives bread its holes?", opts: ["Baking soda", "Yeast", "Salt", "Sugar"], ci: 1 },
      { q: "Which vitamin is abundant in citrus fruits?", opts: ["A", "B12", "C", "D"], ci: 2 },
      { q: "What is tofu made from?", opts: ["Rice", "Wheat", "Soybeans", "Corn"], ci: 2 },
      { q: "Which country produces the most coffee?", opts: ["Colombia", "Ethiopia", "Vietnam", "Brazil"], ci: 3 },
      { q: "What is the main ingredient in hummus?", opts: ["Lentils", "Chickpeas", "Black beans", "Peanuts"], ci: 1 },
      { q: "What cheese is traditionally used on pizza Margherita?", opts: ["Cheddar", "Parmesan", "Mozzarella", "Gouda"], ci: 2 },
      { q: "Which spice gives curry its yellow color?", opts: ["Paprika", "Cumin", "Turmeric", "Ginger"], ci: 2 },
      { q: "What is the most eaten food in the world?", opts: ["Bread", "Rice", "Potatoes", "Pasta"], ci: 1 },
      { q: "Which fruit has its seeds on the outside?", opts: ["Raspberry", "Strawberry", "Blueberry", "Blackberry"], ci: 1 },
      { q: "What is wasabi traditionally made from?", opts: ["Horseradish", "Wasabi plant root", "Green peppers", "Mustard"], ci: 1 },
      { q: "Which country invented pizza?", opts: ["Greece", "France", "Italy", "Spain"], ci: 2 },
      { q: "How many taste sensations can humans detect?", opts: ["3", "4", "5", "6"], ci: 2 },
      { q: "What is the most popular spice in the world?", opts: ["Salt", "Pepper", "Cumin", "Garlic"], ci: 1 },
      { q: "Which mushroom is the most widely cultivated?", opts: ["Shiitake", "Button mushroom", "Oyster", "Portobello"], ci: 1 },
    ],
    tf: [
      { q: "Honey never expires.", answer: true },
      { q: "Peanuts are tree nuts.", answer: false },
      { q: "Chocolate comes from a fruit.", answer: true },
      { q: "Carrots were originally purple.", answer: true },
      { q: "Bananas are herbs.", answer: true },
      { q: "Sushi means 'raw fish'.", answer: false },
      { q: "Coffee beans are actually seeds.", answer: true },
      { q: "Coconut water can be used as blood plasma.", answer: true },
      { q: "Almonds are seeds, not nuts.", answer: true },
      { q: "White chocolate contains cocoa butter.", answer: true },
      { q: "Ketchup was once sold as medicine.", answer: true },
      { q: "Apples float in water.", answer: true },
      { q: "Popcorn is a type of corn.", answer: true },
      { q: "Lobster was once considered food for the poor.", answer: true },
      { q: "Tomatoes are vegetables.", answer: false },
      { q: "Spam stands for 'Spiced Ham'.", answer: false },
      { q: "Cashews grow on trees hanging below a fruit.", answer: true },
      { q: "Green and red peppers are the same plant.", answer: true },
      { q: "Pasta was invented in China.", answer: false },
      { q: "Wasabi served in most restaurants is actually horseradish.", answer: true },
    ],
  },
  business: {
    mc: [
      { q: "What does CEO stand for?", opts: ["Chief Executive Officer", "Chief Engineering Officer", "Corporate Executive Officer", "Central Executive Office"], ci: 0 },
      { q: "What is the world's most valuable company (2024)?", opts: ["Amazon", "Google", "Apple", "Microsoft"], ci: 2 },
      { q: "What does ROI stand for?", opts: ["Rate of Income", "Return on Investment", "Revenue on Interest", "Ratio of Income"], ci: 1 },
      { q: "Which company was founded in a garage in 1976?", opts: ["Microsoft", "Google", "Apple", "Amazon"], ci: 2 },
      { q: "What is a 'bull market'?", opts: ["Declining prices", "Rising prices", "Stable prices", "Volatile prices"], ci: 1 },
      { q: "What does B2B mean?", opts: ["Back to Business", "Business to Business", "Build to Buy", "Brand to Brand"], ci: 1 },
      { q: "Which social media platform did Mark Zuckerberg create?", opts: ["Twitter", "Instagram", "Facebook", "Snapchat"], ci: 2 },
      { q: "What is the purpose of a balance sheet?", opts: ["Track sales", "Show assets and liabilities", "Record employees", "Plan marketing"], ci: 1 },
      { q: "What type of company is 'LLC'?", opts: ["Limited Labor Company", "Limited Liability Company", "Long-term Leasing Corporation", "Legal Lending Company"], ci: 1 },
      { q: "What is 'venture capital'?", opts: ["A type of loan", "Investment in startups", "Government funding", "Insurance product"], ci: 1 },
      { q: "Which country has the largest GDP?", opts: ["China", "Japan", "USA", "Germany"], ci: 2 },
      { q: "What does KPI stand for?", opts: ["Key Performance Indicator", "Key Profit Index", "Knowledge Process Integration", "Key Priority Item"], ci: 0 },
      { q: "What is an IPO?", opts: ["Initial Public Offering", "Internal Product Operation", "Investment Portfolio Option", "Integrated Payment Order"], ci: 0 },
      { q: "Who wrote 'The Lean Startup'?", opts: ["Peter Thiel", "Eric Ries", "Tim Ferriss", "Reid Hoffman"], ci: 1 },
      { q: "What is 'bootstrapping' in business?", opts: ["Hiring rapidly", "Self-funding a startup", "Outsourcing work", "Filing for bankruptcy"], ci: 1 },
      { q: "What does SaaS stand for?", opts: ["Software as a Service", "System as a Solution", "Sales as a Strategy", "Security as a Standard"], ci: 0 },
      { q: "Which company is associated with 'just-in-time' manufacturing?", opts: ["Ford", "Toyota", "BMW", "General Motors"], ci: 1 },
      { q: "What is a P&L statement?", opts: ["Profit and Loss", "Price and Liability", "Production and Logistics", "Planning and Lending"], ci: 0 },
      { q: "What is the stock ticker for Amazon?", opts: ["AMZ", "AMZN", "AMAZN", "AZN"], ci: 1 },
      { q: "What is 'scalability' in business?", opts: ["Cost reduction", "Ability to grow efficiently", "Employee training", "Tax planning"], ci: 1 },
    ],
    tf: [
      { q: "Amazon started as an online bookstore.", answer: true },
      { q: "Warren Buffett is known as the Oracle of Omaha.", answer: true },
      { q: "A startup must have at least 2 founders.", answer: false },
      { q: "NASDAQ is the oldest stock exchange in the US.", answer: false },
      { q: "Revenue and profit are the same thing.", answer: false },
      { q: "Google was originally called BackRub.", answer: true },
      { q: "An angel investor typically invests in early-stage startups.", answer: true },
      { q: "Inflation means prices are decreasing.", answer: false },
      { q: "Jeff Bezos founded Amazon.", answer: true },
      { q: "A unicorn is a startup valued at over $1 billion.", answer: true },
      { q: "The NYSE is located on Wall Street.", answer: true },
      { q: "Elon Musk founded Tesla.", answer: false },
      { q: "SWOT analysis includes Strengths and Weaknesses.", answer: true },
      { q: "A 401(k) is a type of retirement account.", answer: true },
      { q: "The gig economy involves long-term employment contracts.", answer: false },
      { q: "Apple's first product was the Macintosh.", answer: false },
      { q: "Cryptocurrency is regulated by central banks worldwide.", answer: false },
      { q: "Break-even point is when revenue equals costs.", answer: true },
      { q: "Samsung is a Japanese company.", answer: false },
      { q: "Shopify is a Canadian company.", answer: true },
    ],
  },
  nature: {
    mc: [
      { q: "What is the largest animal on Earth?", opts: ["African Elephant", "Blue Whale", "Giraffe", "Colossal Squid"], ci: 1 },
      { q: "How many legs does a spider have?", opts: ["6", "8", "10", "12"], ci: 1 },
      { q: "What is the fastest land animal?", opts: ["Lion", "Cheetah", "Horse", "Gazelle"], ci: 1 },
      { q: "Which tree produces acorns?", opts: ["Maple", "Pine", "Oak", "Birch"], ci: 2 },
      { q: "How long can a camel go without water?", opts: ["3 days", "1 week", "2 weeks", "1 month"], ci: 2 },
      { q: "What is a group of wolves called?", opts: ["Flock", "Herd", "Pack", "School"], ci: 2 },
      { q: "Which bird can fly backwards?", opts: ["Eagle", "Hummingbird", "Sparrow", "Penguin"], ci: 1 },
      { q: "What percentage of Earth's water is freshwater?", opts: ["3%", "10%", "25%", "50%"], ci: 0 },
      { q: "Which animal has the longest lifespan?", opts: ["Elephant", "Whale", "Tortoise", "Parrot"], ci: 2 },
      { q: "What is the tallest type of grass?", opts: ["Wheat", "Bamboo", "Sugar cane", "Corn"], ci: 1 },
      { q: "How many hearts does an octopus have?", opts: ["1", "2", "3", "4"], ci: 2 },
      { q: "What is the smallest bird in the world?", opts: ["Sparrow", "Bee Hummingbird", "Wren", "Finch"], ci: 1 },
      { q: "Which ecosystem has the highest biodiversity?", opts: ["Desert", "Tundra", "Rainforest", "Ocean"], ci: 2 },
      { q: "What animal is a 'joey'?", opts: ["Baby deer", "Baby kangaroo", "Baby bear", "Baby rabbit"], ci: 1 },
      { q: "How do dolphins sleep?", opts: ["On the surface", "With one eye open", "Underwater", "They don't sleep"], ci: 1 },
      { q: "What is the largest flower in the world?", opts: ["Sunflower", "Rafflesia", "Lotus", "Titan Arum"], ci: 1 },
      { q: "Which animal produces the loudest sound?", opts: ["Elephant", "Lion", "Blue Whale", "Howler Monkey"], ci: 2 },
      { q: "What do bees collect from flowers?", opts: ["Water", "Nectar", "Seeds", "Leaves"], ci: 1 },
      { q: "Which animal can change its color?", opts: ["Gecko", "Chameleon", "Iguana", "Frog"], ci: 1 },
      { q: "What is the largest type of penguin?", opts: ["King", "Emperor", "Gentoo", "Adélie"], ci: 1 },
    ],
    tf: [
      { q: "Trees produce oxygen.", answer: true },
      { q: "All snakes are venomous.", answer: false },
      { q: "Koalas are bears.", answer: false },
      { q: "A group of flamingos is called a 'flamboyance'.", answer: true },
      { q: "Whales are fish.", answer: false },
      { q: "Sunflowers follow the sun.", answer: true },
      { q: "Polar bears have black skin.", answer: true },
      { q: "Goldfish have a 3-second memory.", answer: false },
      { q: "Elephants are afraid of mice.", answer: false },
      { q: "Seahorses mate for life.", answer: true },
      { q: "A snail can sleep for 3 years.", answer: true },
      { q: "Butterflies taste with their feet.", answer: true },
      { q: "Owls can turn their heads 360 degrees.", answer: false },
      { q: "Honey is made from bee vomit.", answer: true },
      { q: "Tigers have striped skin, not just fur.", answer: true },
      { q: "Cows have four stomachs.", answer: true },
      { q: "Starfish have brains.", answer: false },
      { q: "Sloths can hold their breath for 40 minutes.", answer: true },
      { q: "Flamingos are naturally pink.", answer: false },
      { q: "An ostrich's eye is bigger than its brain.", answer: true },
    ],
  },
  art: {
    mc: [
      { q: "Who painted the Mona Lisa?", opts: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Botticelli"], ci: 2 },
      { q: "What art movement is Salvador Dalí associated with?", opts: ["Cubism", "Impressionism", "Surrealism", "Pop Art"], ci: 2 },
      { q: "Which museum houses the Mona Lisa?", opts: ["British Museum", "Uffizi Gallery", "Louvre", "Met"], ci: 2 },
      { q: "What primary colors make orange?", opts: ["Red and Blue", "Red and Yellow", "Yellow and Blue", "Red and Green"], ci: 1 },
      { q: "Who is known for painting water lilies?", opts: ["Renoir", "Monet", "Manet", "Degas"], ci: 1 },
      { q: "What is the art of folding paper called?", opts: ["Calligraphy", "Origami", "Ikebana", "Kirigami"], ci: 1 },
      { q: "Which sculptor created 'The Thinker'?", opts: ["Donatello", "Bernini", "Rodin", "Michelangelo"], ci: 2 },
      { q: "What art style uses dots to form images?", opts: ["Impressionism", "Cubism", "Pointillism", "Abstract"], ci: 2 },
      { q: "Who painted 'Starry Night'?", opts: ["Monet", "Van Gogh", "Picasso", "Renoir"], ci: 1 },
      { q: "What is chiaroscuro?", opts: ["A paint type", "Light and shadow contrast", "A sculpture technique", "A color theory"], ci: 1 },
      { q: "Who is considered the father of Pop Art?", opts: ["Andy Warhol", "Roy Lichtenstein", "Jasper Johns", "Richard Hamilton"], ci: 0 },
      { q: "What medium is watercolor paint mixed with?", opts: ["Oil", "Water", "Turpentine", "Acrylic"], ci: 1 },
      { q: "Which period came first: Baroque or Renaissance?", opts: ["Baroque", "Renaissance", "They were simultaneous", "Neither"], ci: 1 },
      { q: "What color do you get by mixing blue and yellow?", opts: ["Purple", "Orange", "Green", "Brown"], ci: 2 },
      { q: "Who painted 'The Persistence of Memory' (melting clocks)?", opts: ["Picasso", "Dalí", "Magritte", "Ernst"], ci: 1 },
      { q: "What is a fresco?", opts: ["Oil painting", "Painting on wet plaster", "Watercolor technique", "Wood carving"], ci: 1 },
      { q: "Which artist cut off part of his own ear?", opts: ["Picasso", "Monet", "Van Gogh", "Dalí"], ci: 2 },
      { q: "What is the complementary color of red?", opts: ["Blue", "Yellow", "Green", "Orange"], ci: 2 },
      { q: "Which art movement rejected traditional aesthetics?", opts: ["Impressionism", "Realism", "Dadaism", "Romanticism"], ci: 2 },
      { q: "What does 'impasto' refer to?", opts: ["Thin paint layers", "Thick paint application", "Paint removal", "Color mixing"], ci: 1 },
    ],
    tf: [
      { q: "Pablo Picasso was Spanish.", answer: true },
      { q: "Oil painting dries faster than acrylic.", answer: false },
      { q: "The Statue of Liberty was a gift from France.", answer: true },
      { q: "Banksy's real identity is publicly known.", answer: false },
      { q: "Photography is considered a form of fine art.", answer: true },
      { q: "The color wheel was invented by Isaac Newton.", answer: true },
      { q: "Impressionism originated in France.", answer: true },
      { q: "Frida Kahlo was Mexican.", answer: true },
      { q: "Abstract art always has a clear subject.", answer: false },
      { q: "The Sistine Chapel ceiling was painted by Raphael.", answer: false },
      { q: "Van Gogh sold only one painting during his lifetime.", answer: true },
      { q: "Ceramics is one of the oldest art forms.", answer: true },
      { q: "Pop Art emerged in the 1980s.", answer: false },
      { q: "Sculpture can be additive or subtractive.", answer: true },
      { q: "CMYK is used for digital screen colors.", answer: false },
      { q: "Leonardo da Vinci was left-handed.", answer: true },
      { q: "Modern art and contemporary art are the same thing.", answer: false },
      { q: "Graffiti originated in New York City.", answer: true },
      { q: "Rembrandt was Dutch.", answer: true },
      { q: "Gouache paint is opaque.", answer: true },
    ],
  },
  math: {
    mc: [
      { q: "What is the value of Pi to two decimal places?", opts: ["3.12", "3.14", "3.16", "3.18"], ci: 1 },
      { q: "What is the square root of 144?", opts: ["10", "11", "12", "14"], ci: 2 },
      { q: "What is 15% of 200?", opts: ["20", "25", "30", "35"], ci: 2 },
      { q: "How many sides does a hexagon have?", opts: ["5", "6", "7", "8"], ci: 1 },
      { q: "What is 7 × 8?", opts: ["54", "56", "58", "62"], ci: 1 },
      { q: "What is the next prime number after 7?", opts: ["8", "9", "10", "11"], ci: 3 },
      { q: "What is the sum of angles in a triangle?", opts: ["90°", "180°", "270°", "360°"], ci: 1 },
      { q: "What is 2 to the power of 10?", opts: ["512", "1024", "2048", "4096"], ci: 1 },
      { q: "What is the formula for the area of a circle?", opts: ["2πr", "πr²", "πd", "2πr²"], ci: 1 },
      { q: "What number system uses only 0 and 1?", opts: ["Decimal", "Hexadecimal", "Binary", "Octal"], ci: 2 },
      { q: "What is the factorial of 5 (5!)?", opts: ["20", "60", "100", "120"], ci: 3 },
      { q: "What is the Pythagorean theorem?", opts: ["a+b=c", "a²+b²=c²", "a×b=c", "a/b=c"], ci: 1 },
      { q: "How many degrees in a right angle?", opts: ["45", "60", "90", "180"], ci: 2 },
      { q: "What is the mean of 2, 4, 6, 8, 10?", opts: ["4", "5", "6", "7"], ci: 2 },
      { q: "What is 1/4 as a percentage?", opts: ["20%", "25%", "30%", "40%"], ci: 1 },
      { q: "What shape has 8 sides?", opts: ["Heptagon", "Octagon", "Nonagon", "Decagon"], ci: 1 },
      { q: "What is the value of the golden ratio (approx)?", opts: ["1.414", "1.618", "1.732", "2.236"], ci: 1 },
      { q: "What is the LCM of 4 and 6?", opts: ["8", "10", "12", "24"], ci: 2 },
      { q: "How many zeros in a million?", opts: ["5", "6", "7", "8"], ci: 1 },
      { q: "What is the derivative of x²?", opts: ["x", "2x", "x²", "2"], ci: 1 },
    ],
    tf: [
      { q: "Zero is an even number.", answer: true },
      { q: "Every square is a rectangle.", answer: true },
      { q: "Pi is a rational number.", answer: false },
      { q: "The sum of angles in a quadrilateral is 360°.", answer: true },
      { q: "1 is a prime number.", answer: false },
      { q: "Infinity is a number.", answer: false },
      { q: "A negative times a negative is positive.", answer: true },
      { q: "The square root of 2 is rational.", answer: false },
      { q: "All squares are rhombuses.", answer: true },
      { q: "0.999... equals 1.", answer: true },
      { q: "There are more rational numbers than irrational numbers.", answer: false },
      { q: "A parallelogram has two pairs of parallel sides.", answer: true },
      { q: "The number e is approximately 2.718.", answer: true },
      { q: "Division by zero is defined.", answer: false },
      { q: "Every prime number is odd.", answer: false },
      { q: "The longest side of a right triangle is the hypotenuse.", answer: true },
      { q: "Fibonacci sequence starts with 0 and 1.", answer: true },
      { q: "10% of 10% is 1%.", answer: true },
      { q: "A cube has 8 faces.", answer: false },
      { q: "Statistics is a branch of mathematics.", answer: true },
    ],
  },
  psychology: {
    mc: [
      { q: "Who is considered the father of psychoanalysis?", opts: ["Carl Jung", "B.F. Skinner", "Sigmund Freud", "Abraham Maslow"], ci: 2 },
      { q: "What does IQ stand for?", opts: ["Intelligence Quality", "Intelligence Quotient", "Internal Question", "Intellectual Qualification"], ci: 1 },
      { q: "Which hierarchy has 'self-actualization' at the top?", opts: ["Erikson's stages", "Kohlberg's stages", "Maslow's hierarchy", "Bloom's taxonomy"], ci: 2 },
      { q: "What is the fear of spiders called?", opts: ["Acrophobia", "Claustrophobia", "Arachnophobia", "Agoraphobia"], ci: 2 },
      { q: "What type of conditioning did Pavlov demonstrate?", opts: ["Operant", "Classical", "Social", "Cognitive"], ci: 1 },
      { q: "What brain region controls emotions?", opts: ["Cerebellum", "Frontal lobe", "Limbic system", "Brain stem"], ci: 2 },
      { q: "What is cognitive dissonance?", opts: ["Memory loss", "Holding contradictory beliefs", "Sleep disorder", "Learning disability"], ci: 1 },
      { q: "Who developed the theory of multiple intelligences?", opts: ["Piaget", "Gardner", "Vygotsky", "Sternberg"], ci: 1 },
      { q: "What is the Dunning-Kruger effect?", opts: ["Fear of failure", "Overestimating one's ability", "Memory distortion", "Social anxiety"], ci: 1 },
      { q: "Which neurotransmitter is associated with happiness?", opts: ["Cortisol", "Adrenaline", "Serotonin", "Melatonin"], ci: 2 },
      { q: "What is the placebo effect?", opts: ["Drug side effect", "Improvement from belief in treatment", "Allergic reaction", "Withdrawal symptom"], ci: 1 },
      { q: "Who proposed the stages of cognitive development?", opts: ["Freud", "Piaget", "Erikson", "Skinner"], ci: 1 },
      { q: "What is REM sleep?", opts: ["Deep sleep", "Rapid Eye Movement sleep", "Recovery sleep", "Relaxation sleep"], ci: 1 },
      { q: "What does the Stanford Prison Experiment study?", opts: ["Memory", "Authority and conformity", "Learning", "Perception"], ci: 1 },
      { q: "What is groupthink?", opts: ["Creative brainstorming", "Conformity in groups suppressing dissent", "Mass hysteria", "Peer pressure"], ci: 1 },
      { q: "Which lobe of the brain handles vision?", opts: ["Frontal", "Temporal", "Parietal", "Occipital"], ci: 3 },
      { q: "What is the fight-or-flight response?", opts: ["A sleep disorder", "Stress response to danger", "A type of therapy", "A cognitive bias"], ci: 1 },
      { q: "Who developed the concept of the collective unconscious?", opts: ["Freud", "Jung", "Adler", "Maslow"], ci: 1 },
      { q: "What is confirmation bias?", opts: ["Seeking info that confirms beliefs", "Rejecting all information", "Trusting authority", "Following trends"], ci: 0 },
      { q: "How many senses are traditionally recognized?", opts: ["4", "5", "6", "7"], ci: 1 },
    ],
    tf: [
      { q: "Humans only use 10% of their brain.", answer: false },
      { q: "Short-term memory can hold about 7 items.", answer: true },
      { q: "Dreaming occurs during REM sleep.", answer: true },
      { q: "Psychology is considered a natural science.", answer: false },
      { q: "Depression is just feeling sad.", answer: false },
      { q: "Mirror neurons are involved in empathy.", answer: true },
      { q: "Introversion is a personality disorder.", answer: false },
      { q: "Stress can affect physical health.", answer: true },
      { q: "IQ is the only measure of intelligence.", answer: false },
      { q: "Sigmund Freud was Austrian.", answer: true },
      { q: "Phobias are a type of anxiety disorder.", answer: true },
      { q: "Memory is stored in one specific brain area.", answer: false },
      { q: "Color can influence mood and behavior.", answer: true },
      { q: "PTSD only affects military veterans.", answer: false },
      { q: "The brain continues to develop until about age 25.", answer: true },
      { q: "Multitasking is efficient for complex work.", answer: false },
      { q: "Body language accounts for over 50% of communication.", answer: true },
      { q: "Emotional intelligence can be developed.", answer: true },
      { q: "All memories are accurate recordings of events.", answer: false },
      { q: "Laughter has measurable health benefits.", answer: true },
    ],
  },
  languages: {
    mc: [
      { q: "How many official languages does the UN have?", opts: ["4", "5", "6", "7"], ci: 2 },
      { q: "Which language has the most native speakers?", opts: ["English", "Spanish", "Mandarin Chinese", "Hindi"], ci: 2 },
      { q: "What is the most translated book in the world?", opts: ["Harry Potter", "The Bible", "Don Quixote", "The Quran"], ci: 1 },
      { q: "Which language uses the Cyrillic alphabet?", opts: ["Greek", "Arabic", "Russian", "Hebrew"], ci: 2 },
      { q: "What language family does English belong to?", opts: ["Romance", "Slavic", "Germanic", "Celtic"], ci: 2 },
      { q: "How many characters does the Chinese writing system have?", opts: ["26", "About 1,000", "About 10,000", "Over 50,000"], ci: 3 },
      { q: "Which language reads right to left?", opts: ["Japanese", "Korean", "Arabic", "Hindi"], ci: 2 },
      { q: "What is an 'umlaut'?", opts: ["A tense", "Two dots above a vowel", "A conjunction", "A verb form"], ci: 1 },
      { q: "Which language is 'Esperanto'?", opts: ["Ancient language", "Constructed language", "Extinct language", "Dialect"], ci: 1 },
      { q: "How many tones does Mandarin Chinese have?", opts: ["2", "3", "4", "5"], ci: 2 },
      { q: "Which Romance language is closest to Latin?", opts: ["Spanish", "French", "Italian", "Romanian"], ci: 2 },
      { q: "What writing system does Korean use?", opts: ["Kanji", "Hiragana", "Hangul", "Devanagari"], ci: 2 },
      { q: "What does 'polyglot' mean?", opts: ["A type of bird", "Someone who speaks many languages", "A writing system", "A dialect"], ci: 1 },
      { q: "Which language has the longest alphabet?", opts: ["Russian", "Arabic", "Khmer", "Thai"], ci: 2 },
      { q: "What is the study of language called?", opts: ["Philology", "Linguistics", "Etymology", "Phonetics"], ci: 1 },
      { q: "Which country has the most languages?", opts: ["India", "Papua New Guinea", "Indonesia", "Nigeria"], ci: 1 },
      { q: "What is a 'cognate'?", opts: ["A verb tense", "Words with common origin across languages", "A grammatical error", "A dialect"], ci: 1 },
      { q: "What language is 'Namaste' from?", opts: ["Arabic", "Hindi", "Thai", "Japanese"], ci: 1 },
      { q: "Which language uses three writing systems?", opts: ["Chinese", "Arabic", "Japanese", "Korean"], ci: 2 },
      { q: "What is the most studied second language in the world?", opts: ["Spanish", "French", "Mandarin", "English"], ci: 3 },
    ],
    tf: [
      { q: "There are over 7,000 languages in the world.", answer: true },
      { q: "French was once the international language of diplomacy.", answer: true },
      { q: "Japanese and Chinese use the same writing system.", answer: false },
      { q: "Sanskrit is still widely spoken in India.", answer: false },
      { q: "Spanish and Portuguese are mutually intelligible.", answer: true },
      { q: "Sign languages are universal.", answer: false },
      { q: "Finnish and Hungarian are related languages.", answer: true },
      { q: "English has more words than any other language.", answer: true },
      { q: "All Chinese dialects use the same writing system.", answer: true },
      { q: "Latin is a dead language.", answer: true },
      { q: "Korean was invented by a king.", answer: true },
      { q: "Hindi and Urdu are essentially the same spoken language.", answer: true },
      { q: "The word 'alphabet' comes from Greek.", answer: true },
      { q: "Swahili is only spoken in one country.", answer: false },
      { q: "Basque is related to Spanish.", answer: false },
      { q: "Icelandic has changed very little in 1,000 years.", answer: true },
      { q: "The word 'tsunami' is Japanese.", answer: true },
      { q: "Arabic numerals were invented in Arabia.", answer: false },
      { q: "Welsh is a Celtic language.", answer: true },
      { q: "Esperanto was created in the 19th century.", answer: true },
    ],
  },
  health: {
    mc: [
      { q: "How many hours of sleep do adults need?", opts: ["4-5", "5-6", "7-9", "10-12"], ci: 2 },
      { q: "What vitamin is best for immune health?", opts: ["A", "B", "C", "K"], ci: 2 },
      { q: "What is the recommended daily water intake for adults?", opts: ["1 liter", "2 liters", "3 liters", "4 liters"], ci: 1 },
      { q: "Which organ filters blood?", opts: ["Heart", "Lungs", "Kidneys", "Liver"], ci: 2 },
      { q: "What is a normal resting heart rate for adults?", opts: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"], ci: 1 },
      { q: "Which macronutrient provides the most calories per gram?", opts: ["Carbohydrates", "Protein", "Fat", "Fiber"], ci: 2 },
      { q: "What does BMI stand for?", opts: ["Body Mass Index", "Body Muscle Indicator", "Basal Metabolic Input", "Basic Measurement Index"], ci: 0 },
      { q: "How many calories are in one gram of protein?", opts: ["2", "4", "7", "9"], ci: 1 },
      { q: "What is the largest muscle in the body?", opts: ["Biceps", "Quadriceps", "Gluteus Maximus", "Latissimus Dorsi"], ci: 2 },
      { q: "Which mineral is essential for strong bones?", opts: ["Iron", "Zinc", "Calcium", "Potassium"], ci: 2 },
      { q: "What is normal blood pressure?", opts: ["100/60", "120/80", "140/90", "160/100"], ci: 1 },
      { q: "How many major food groups are there?", opts: ["3", "4", "5", "6"], ci: 2 },
      { q: "What type of exercise improves cardiovascular health?", opts: ["Stretching", "Weightlifting", "Aerobic", "Balance training"], ci: 2 },
      { q: "What does SPF stand for in sunscreen?", opts: ["Sun Protection Factor", "Skin Protection Formula", "Solar Power Filter", "Sun Proof Finish"], ci: 0 },
      { q: "Which organ produces insulin?", opts: ["Liver", "Kidney", "Pancreas", "Stomach"], ci: 2 },
      { q: "How many bones does an adult human have?", opts: ["186", "196", "206", "216"], ci: 2 },
      { q: "What is the recommended weekly exercise for adults?", opts: ["30 min", "75 min", "150 min", "300 min"], ci: 2 },
      { q: "Which type of cholesterol is 'good'?", opts: ["LDL", "HDL", "VLDL", "Total"], ci: 1 },
      { q: "What food group is the primary source of fiber?", opts: ["Dairy", "Meat", "Fruits & Vegetables", "Oils"], ci: 2 },
      { q: "What is the normal body temperature in Celsius?", opts: ["35°C", "36.1°C", "37°C", "38°C"], ci: 2 },
    ],
    tf: [
      { q: "Drinking water helps with weight loss.", answer: true },
      { q: "Cracking your knuckles causes arthritis.", answer: false },
      { q: "Eggs raise cholesterol dangerously.", answer: false },
      { q: "Walking 10,000 steps daily is a proven health guideline.", answer: false },
      { q: "Meditation can reduce blood pressure.", answer: true },
      { q: "Carbohydrates are inherently bad for you.", answer: false },
      { q: "Sleep deprivation affects cognitive function.", answer: true },
      { q: "Stretching before exercise prevents injury.", answer: false },
      { q: "Dark chocolate has health benefits in moderation.", answer: true },
      { q: "You should drink 8 glasses of water a day.", answer: false },
      { q: "Sitting for long periods increases health risks.", answer: true },
      { q: "Vitamin D can be produced by sun exposure.", answer: true },
      { q: "Muscle weighs more than fat per volume.", answer: true },
      { q: "Green tea has antioxidant properties.", answer: true },
      { q: "Sugar causes hyperactivity in children.", answer: false },
      { q: "Deep breathing activates the parasympathetic nervous system.", answer: true },
      { q: "All bacteria are harmful.", answer: false },
      { q: "Exercise releases endorphins.", answer: true },
      { q: "You lose most body heat through your head.", answer: false },
      { q: "Intermittent fasting has potential health benefits.", answer: true },
    ],
  },
};

const TOPICS = Object.keys(TEMPLATES);

function generateQuiz(topic: string, count: number, difficulty: string, qType: string): Question[] {
  const topicKey = TOPICS.includes(topic.toLowerCase()) ? topic.toLowerCase() : TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const pool = TEMPLATES[topicKey];
  const questions: Question[] = [];
  const usedMc = new Set<number>();
  const usedTf = new Set<number>();

  for (let i = 0; i < count; i++) {
    const useType = qType === "tf" ? "tf" : qType === "mc" ? "mc" : Math.random() > 0.5 ? "tf" : "mc";
    if (useType === "tf" && pool.tf.length > usedTf.size) {
      let idx: number;
      do { idx = Math.floor(Math.random() * pool.tf.length); } while (usedTf.has(idx));
      usedTf.add(idx);
      const t = pool.tf[idx];
      questions.push({ question: t.q, options: ["True", "False"], correctIndex: t.answer ? 0 : 1, type: "tf" });
    } else if (pool.mc.length > usedMc.size) {
      let idx: number;
      do { idx = Math.floor(Math.random() * pool.mc.length); } while (usedMc.has(idx));
      usedMc.add(idx);
      const m = pool.mc[idx];
      if (difficulty === "hard") {
        const shuffled = [...m.opts].sort(() => Math.random() - 0.5);
        const newCi = shuffled.indexOf(m.opts[m.ci]);
        questions.push({ question: m.q, options: shuffled, correctIndex: newCi, type: "mc" });
      } else {
        questions.push({ question: m.q, options: [...m.opts], correctIndex: m.ci, type: "mc" });
      }
    }
  }
  return questions;
}

export default function ClientPage() {
  const { user, isPro } = useAuth();
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [topic, setTopic] = useState("science");
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [qType, setQType] = useState("mix");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [usage, setUsage] = useState(0);
  const limit = 3;
  const period = "day";
  const [currentQ, setCurrentQ] = useState(0);

  const handleGenerate = useCallback(async () => {
    if (!isPro && user) {
      try {
        const res = await fetch("/api/usage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "check" }) });
        const data = await res.json();
        if (data.usage !== undefined) setUsage(data.usage);
        if (data.usage >= limit) return;
      } catch {}
    }
    const qs = generateQuiz(topic, count, difficulty, qType);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setSubmitted(false);
    setCurrentQ(0);
    if (!isPro && user) {
      try {
        const res = await fetch("/api/usage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "record" }) });
        const data = await res.json();
        if (data.usage) setUsage(data.usage);
      } catch {}
    }
  }, [topic, count, difficulty, qType, isPro, user]);

  const selectAnswer = (qi: number, oi: number) => {
    if (submitted) return;
    const copy = [...answers];
    copy[qi] = oi;
    setAnswers(copy);
  };

  const handleSubmit = () => setSubmitted(true);
  const score = submitted ? answers.filter((a, i) => a === questions[i]?.correctIndex).length : 0;

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none" };
  const btn: React.CSSProperties = { padding: "12px 28px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 600, cursor: "pointer" };
  const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "16px" };

  return (
    <>
      <ToolSchema name="Quiz Generator" description="Generate interactive quizzes on any topic. Multiple choice, true/false, scored results." slug="quiz-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Quiz Generator", url: "https://toolcraftkit.com/tools/quiz-generator" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>Quiz Generator</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "24px" }}>Generate and take interactive quizzes on popular topics. Choose your settings and test your knowledge.</p>
        <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

        {questions.length === 0 && (
          <div style={card}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Topic</label>
                <select value={topic} onChange={e => setTopic(e.target.value)} style={inp}>
                  {TOPICS.map(t => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Questions</label>
                <select value={count} onChange={e => setCount(Number(e.target.value))} style={inp}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={inp}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Type</label>
                <select value={qType} onChange={e => setQType(e.target.value)} style={inp}>
                  <option value="mix">Mix</option>
                  <option value="mc">Multiple Choice</option>
                  <option value="tf">True / False</option>
                </select>
              </div>
            </div>
            <button onClick={handleGenerate} style={btn}>Generate Quiz</button>
          </div>
        )}

        {questions.length > 0 && !submitted && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontWeight: 600, color: "#374151" }}>Question {currentQ + 1} of {questions.length}</span>
              <span style={{ fontSize: "13px", color: "#9ca3af" }}>{answers.filter(a => a !== null).length} answered</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "#e5e7eb", borderRadius: "3px", marginBottom: "20px" }}>
              <div style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, height: "6px", background: "#0D9488", borderRadius: "3px", transition: "width 0.3s" }} />
            </div>
            <div style={card}>
              <p style={{ fontSize: "17px", fontWeight: 600, marginBottom: "16px", color: "#111827" }}>{questions[currentQ].question}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {questions[currentQ].options.map((opt, oi) => (
                  <button key={oi} onClick={() => selectAnswer(currentQ, oi)} style={{ padding: "12px 16px", borderRadius: "8px", border: answers[currentQ] === oi ? "2px solid #0D9488" : "1px solid #d1d5db", background: answers[currentQ] === oi ? "#f0fdfa" : "#fff", cursor: "pointer", textAlign: "left", fontSize: "15px", fontWeight: answers[currentQ] === oi ? 600 : 400 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
              <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{ ...btn, background: currentQ === 0 ? "#d1d5db" : "#6b7280", cursor: currentQ === 0 ? "default" : "pointer" }}>Previous</button>
              {currentQ < questions.length - 1 ? (
                <button onClick={() => setCurrentQ(currentQ + 1)} style={btn}>Next</button>
              ) : (
                <button onClick={handleSubmit} disabled={answers.includes(null)} style={{ ...btn, background: answers.includes(null) ? "#d1d5db" : "#0D9488" }}>Submit Quiz</button>
              )}
            </div>
          </div>
        )}

        {submitted && (
          <div>
            <div style={{ ...card, textAlign: "center", background: score / questions.length >= 0.7 ? "#f0fdf4" : score / questions.length >= 0.4 ? "#fefce8" : "#fef2f2" }}>
              <div style={{ fontSize: "48px", fontWeight: 800, color: score / questions.length >= 0.7 ? "#16a34a" : score / questions.length >= 0.4 ? "#ca8a04" : "#dc2626" }}>{score}/{questions.length}</div>
              <p style={{ fontSize: "18px", fontWeight: 600, color: "#374151", marginTop: "8px" }}>
                {score / questions.length >= 0.9 ? "Excellent!" : score / questions.length >= 0.7 ? "Great job!" : score / questions.length >= 0.4 ? "Not bad!" : "Keep studying!"}
              </p>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>{Math.round((score / questions.length) * 100)}% correct</p>
            </div>
            {questions.map((q, qi) => {
              const correct = answers[qi] === q.correctIndex;
              return (
                <div key={qi} style={{ ...card, borderLeft: `4px solid ${correct ? "#16a34a" : "#dc2626"}` }}>
                  <p style={{ fontWeight: 600, marginBottom: "8px" }}>{qi + 1}. {q.question}</p>
                  {q.options.map((opt, oi) => (
                    <div key={oi} style={{ padding: "6px 12px", marginBottom: "4px", borderRadius: "6px", fontSize: "14px", background: oi === q.correctIndex ? "#dcfce7" : oi === answers[qi] ? "#fee2e2" : "transparent", fontWeight: oi === q.correctIndex || oi === answers[qi] ? 600 : 400, color: "#374151" }}>
                      {opt} {oi === q.correctIndex && "✓"} {oi === answers[qi] && oi !== q.correctIndex && "✗"}
                    </div>
                  ))}
                </div>
              );
            })}
            <button onClick={() => { setQuestions([]); setAnswers([]); setSubmitted(false); }} style={{ ...btn, marginTop: "16px" }}>New Quiz</button>
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}
