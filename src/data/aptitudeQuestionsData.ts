import { AptitudeQuestion } from '../types/placement';

export const aptitudeQuestionsBank: AptitudeQuestion[] = [
  // ============================================
  // 1. QUANTITATIVE APTITUDE
  // ============================================
  {
    id: 'apt-quant-1',
    category: 'Quantitative Aptitude',
    subtopic: 'Percentages',
    difficulty: 'Easy',
    company: 'TCS NQT',
    question: 'A fruit seller had some apples. He sells 40% of the apples and still has 420 apples left. How many apples did he have originally?',
    options: ['588 apples', '600 apples', '700 apples', '720 apples'],
    correctAnswer: 2,
    explanation: 'If 40% of apples were sold, the remaining apples represent 60% of the initial stock. Let the initial stock be X. Therefore, 60% of X = 420 => 0.6 * X = 420 => X = 420 / 0.6 = 700 apples.',
    formula: 'Remaining Percentage = 100% - Sold Percentage; Total = (Remaining Count / Remaining %) * 100',
    shortcutTrick: '60% = 420 => 10% = 70 => 100% = 700. Can be solved mentally in under 5 seconds.'
  },
  {
    id: 'apt-quant-2',
    category: 'Quantitative Aptitude',
    subtopic: 'Profit & Loss',
    difficulty: 'Medium',
    company: 'Infosys',
    question: 'A trader sells two articles at Rs. 990 each. On one he gains 10% and on the other he loses 10%. What is his overall gain or loss percentage on the entire transaction?',
    options: ['No gain, no loss', '1% loss', '1% gain', '2% loss'],
    correctAnswer: 1,
    explanation: 'When two articles are sold at the same selling price (SP), one at a gain of X% and the other at a loss of X%, there is always a net loss given by (X / 10)^2 %. Here X = 10, so Net Loss = (10 / 10)^2 % = 1^2 % = 1% loss.',
    formula: 'Net Loss % = (Common Gain or Loss % / 10)^2',
    shortcutTrick: 'Direct formula: Loss % = (x^2 / 100) = (100 / 100) = 1% loss.'
  },
  {
    id: 'apt-quant-3',
    category: 'Quantitative Aptitude',
    subtopic: 'Time and Work',
    difficulty: 'Medium',
    company: 'Wipro',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: ['5/9', '4/9', '1/3', '2/9'],
    correctAnswer: 1,
    explanation: 'LCM of 12 and 18 is 36 units (total work). A does 36/12 = 3 units/day. B does 36/18 = 2 units/day. Together they do 3 + 2 = 5 units/day. In 4 days, they complete 4 * 5 = 20 units. Remaining work = 36 - 20 = 16 units. Remaining fraction = 16 / 36 = 4/9.',
    formula: 'Efficiency = Total Work (LCM) / Days',
    shortcutTrick: 'Assume total work = 36 units. Combined daily work = 5. In 4 days = 20 done, 16 left. 16/36 = 4/9.'
  },
  {
    id: 'apt-quant-4',
    category: 'Quantitative Aptitude',
    subtopic: 'Speed, Time and Distance',
    difficulty: 'Medium',
    company: 'Cognizant',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long at the same speed?',
    options: ['65 seconds', '89 seconds', '85 seconds', '100 seconds'],
    correctAnswer: 1,
    explanation: 'Speed of train = Distance / Time = 240 m / 24 s = 10 m/s. To cross the platform, total distance to cover = Train length + Platform length = 240 + 650 = 890 m. Time taken = 890 / 10 = 89 seconds.',
    formula: 'Time to cross platform = (Train length + Platform length) / Speed',
    shortcutTrick: 'Speed is 10 m/s. Total distance = 240 + 650 = 890. 890 / 10 = 89 s.'
  },
  {
    id: 'apt-quant-5',
    category: 'Quantitative Aptitude',
    subtopic: 'Permutations & Probability',
    difficulty: 'Hard',
    company: 'Amazon',
    question: 'Two dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on top is a prime number?',
    options: ['5/12', '7/18', '1/2', '15/36'],
    correctAnswer: 0,
    explanation: 'Total sample space = 6 * 6 = 36 outcomes. Possible prime sums between 2 and 12 are: 2, 3, 5, 7, 11.\nSum 2: (1,1) [1]\nSum 3: (1,2),(2,1) [2]\nSum 5: (1,4),(2,3),(3,2),(4,1) [4]\nSum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) [6]\nSum 11: (5,6),(6,5) [2]\nTotal favorable outcomes = 1 + 2 + 4 + 6 + 2 = 15. Probability = 15 / 36 = 5/12.',
    formula: 'P(Event) = Favorable Outcomes / Total Possible Outcomes',
    shortcutTrick: 'Memorize standard dice sum frequencies: sums 2,3,5,7,11 give 1+2+4+6+2 = 15. 15/36 = 5/12.'
  },
  {
    id: 'apt-quant-6',
    category: 'Quantitative Aptitude',
    subtopic: 'Averages and Ratios',
    difficulty: 'Easy',
    company: 'Accenture',
    question: 'The average age of a class of 30 students is 14 years. If the teacher’s age is included, the average age increases by 1 year. What is the age of the teacher?',
    options: ['44 years', '45 years', '46 years', '48 years'],
    correctAnswer: 1,
    explanation: 'Total age of 30 students = 30 * 14 = 420. With the teacher, total people = 31 and new average = 15. Total age of 31 people = 31 * 15 = 465. Age of teacher = 465 - 420 = 45 years.',
    formula: 'Teacher age = New Average + (Initial Count * Increase in Average)',
    shortcutTrick: '15 + 30 * 1 = 45 years. Calculated in 3 seconds.'
  },

  // ============================================
  // 2. LOGICAL REASONING
  // ============================================
  {
    id: 'apt-logic-1',
    category: 'Logical Reasoning',
    subtopic: 'Blood Relations',
    difficulty: 'Easy',
    company: 'TCS NQT',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctAnswer: 2,
    explanation: '"My mother\'s only son" refers to Suresh himself (since Suresh is speaking and says "only son"). So the boy is the son of Suresh. Therefore, Suresh is the boy’s father.',
    shortcutTrick: 'Decode backwards: "My mother" -> "Only son of my mother" = Suresh -> "Son of Suresh" = Suresh\'s son.'
  },
  {
    id: 'apt-logic-2',
    category: 'Logical Reasoning',
    subtopic: 'Coding-Decoding',
    difficulty: 'Medium',
    company: 'Infosys',
    question: 'In a certain code language, if "SYSTEM" is coded as "SYSMET" and "NEARER" is coded as "AENRER", then how will "FRACTION" be coded in that language?',
    options: ['CARFNOIT', 'ARFCITNO', 'CARFTION', 'ACRFITNO'],
    correctAnswer: 0,
    explanation: 'The word of 6 letters is split into two halves of 3 letters each and each half is reversed:\nSYS -> SYS (or reverse S-Y-S), TEM -> MET.\nNEARER: NEA -> AEN, RER -> RER.\nFRACTION has 8 letters: split into 4 and 4: FRAC and TION.\nReverse FRAC -> CARF. Reverse TION -> NOIT.\nCombining gives CARFNOIT.',
    shortcutTrick: 'Even length word split into halves and reverse each half individually.'
  },
  {
    id: 'apt-logic-3',
    category: 'Logical Reasoning',
    subtopic: 'Syllogisms',
    difficulty: 'Medium',
    company: 'Capgemini',
    question: 'Statements:\n1. All cats are dogs.\n2. All dogs are birds.\nConclusions:\nI. All cats are birds.\nII. Some birds are dogs.',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Neither I nor II follows', 'Both I and II follow'],
    correctAnswer: 3,
    explanation: 'From "All A are B" and "All B are C", it follows immediately that "All A are C" (All cats are birds, so I follows). Also, if "All dogs are birds", it inherently implies "Some birds are dogs" (so II follows). Thus, both conclusions follow.',
    shortcutTrick: 'Venn Diagram concentric circles: Cats inside Dogs, Dogs inside Birds. All Cats are inside Birds, and Birds overlap Dogs.'
  },
  {
    id: 'apt-logic-4',
    category: 'Logical Reasoning',
    subtopic: 'Direction Sense',
    difficulty: 'Easy',
    company: 'Wipro',
    question: 'Rohan walks 10 km towards North. From there he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?',
    options: ['5 km West', '5 km North-East', '7 km East', '5 km North'],
    correctAnswer: 1,
    explanation: 'Net displacement in North-South direction = 10 North - 6 South = 4 km North. Displacement in East-West = 3 km East. Net distance = sqrt(4^2 + 3^2) = sqrt(16 + 9) = sqrt(25) = 5 km in the North-East direction.',
    formula: 'Pythagorean displacement: d = sqrt(x^2 + y^2)'
  },
  {
    id: 'apt-logic-5',
    category: 'Logical Reasoning',
    subtopic: 'Number & Letter Series',
    difficulty: 'Medium',
    company: 'TCS',
    question: 'Find the next term in the series: 3, 7, 15, 31, 63, ?',
    options: ['95', '127', '126', '131'],
    correctAnswer: 1,
    explanation: 'Look at the pattern: 3 * 2 + 1 = 7; 7 * 2 + 1 = 15; 15 * 2 + 1 = 31; 31 * 2 + 1 = 63. The next number is 63 * 2 + 1 = 126 + 1 = 127. Alternatively: 2^2 - 1 = 3, 2^3 - 1 = 7, 2^4 - 1 = 15, 2^5 - 1 = 31, 2^6 - 1 = 63, 2^7 - 1 = 127.',
    shortcutTrick: 'Each term is 2^(n+1) - 1. For n=6, 2^7 - 1 = 128 - 1 = 127.'
  },

  // ============================================
  // 3. VERBAL ABILITY
  // ============================================
  {
    id: 'apt-verb-1',
    category: 'Verbal Ability',
    subtopic: 'Sentence Correction & Grammar',
    difficulty: 'Medium',
    company: 'Cognizant',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'Neither the project manager nor the software engineers was available for the standup.',
      'Neither the project manager nor the software engineers were available for the standup.',
      'Neither the project manager or the software engineers was available for the standup.',
      'Neither the project manager nor the software engineers are been available for the standup.'
    ],
    correctAnswer: 1,
    explanation: 'When subjects are connected by "neither... nor", the verb must agree with the subject closest to it (Rule of Proximity). "Software engineers" is plural and adjacent to the verb, so the plural verb "were" is required.',
    shortcutTrick: 'In "Neither A nor B", verb agrees with B.'
  },
  {
    id: 'apt-verb-2',
    category: 'Verbal Ability',
    subtopic: 'Vocabulary & Synonyms',
    difficulty: 'Easy',
    company: 'Infosys',
    question: 'Choose the word that is most nearly SYNONYMOUS with "PRAGMATIC":',
    options: ['Idealistic', 'Theoretical', 'Practical', 'Elusive'],
    correctAnswer: 2,
    explanation: '"Pragmatic" means dealing with things sensibly and realistically based on practical rather than theoretical considerations. Hence, "Practical" is the exact synonym.',
    shortcutTrick: 'Pragmatic = Practical / Action-oriented.'
  },
  {
    id: 'apt-verb-3',
    category: 'Verbal Ability',
    subtopic: 'Vocabulary & Antonyms',
    difficulty: 'Medium',
    company: 'TCS NQT',
    question: 'Choose the word that is most nearly OPPOSITE in meaning to "CANDID":',
    options: ['Frank', 'Deceitful', 'Blunt', 'Honest'],
    correctAnswer: 1,
    explanation: '"Candid" means truthful, straightforward, and sincere. Frank and blunt are synonyms. "Deceitful" (misleading, untruthful) is the antonym.',
    shortcutTrick: 'Candid = Honest. Opposite = Deceitful / Secretive.'
  },
  {
    id: 'apt-verb-4',
    category: 'Verbal Ability',
    subtopic: 'Para Jumbles',
    difficulty: 'Hard',
    company: 'Accenture',
    question: 'Arrange the sentences in logical sequence:\nP: Software developers continuously integrate changes into a shared repository.\nQ: Automated tests verify each check-in to detect defects early.\nR: Continuous Integration is a cornerstone practice of modern DevOps.\nS: As a result, software teams can release updates faster and with higher confidence.',
    options: ['R - P - Q - S', 'P - Q - R - S', 'S - R - P - Q', 'R - Q - P - S'],
    correctAnswer: 0,
    explanation: 'Sentence R introduces the overarching topic (Continuous Integration). Sentence P explains the action (developers integrating changes). Sentence Q describes what follows the action (automated tests verifying). Sentence S provides the outcome/conclusion ("As a result... release updates faster"). Thus, R - P - Q - S.',
    shortcutTrick: 'Identify opening definition sentence (R) and concluding sentence (S with "As a result"). Only R-P-Q-S matches.'
  },

  // ============================================
  // 4. DATA INTERPRETATION
  // ============================================
  {
    id: 'apt-di-1',
    category: 'Data Interpretation',
    subtopic: 'Tables & Percentages',
    difficulty: 'Medium',
    company: 'TCS NQT',
    question: 'A company recorded employee department counts: Engineering: 240, Marketing: 80, Operations: 120, HR: 40, Product: 120. What percentage of total employees belong to Engineering?',
    options: ['35%', '40%', '45%', '50%'],
    correctAnswer: 1,
    explanation: 'Total employees = 240 + 80 + 120 + 40 + 120 = 600. Engineering count = 240. Percentage = (240 / 600) * 100 = 24 / 60 * 100 = 4 / 10 * 100 = 40%.',
    formula: 'Percentage = (Subgroup / Total) * 100',
    shortcutTrick: '240 out of 600. 24 / 60 = 4/10 = 40%.'
  },
  {
    id: 'apt-di-2',
    category: 'Data Interpretation',
    subtopic: 'Bar Charts & Growth',
    difficulty: 'Medium',
    company: 'Wipro',
    question: 'Quarterly revenues of a SaaS firm in 2025: Q1: $50M, Q2: $65M, Q3: $78M, Q4: $97.5M. What is the percentage increase in revenue from Q1 to Q4?',
    options: ['85%', '90%', '95%', '100%'],
    correctAnswer: 2,
    explanation: 'Increase in revenue = Q4 - Q1 = $97.5M - $50M = $47.5M. Percentage increase = (47.5 / 50) * 100 = 47.5 * 2 = 95%.',
    formula: 'Percentage Growth = ((Final - Initial) / Initial) * 100',
    shortcutTrick: 'Dividing by 50 and multiplying by 100 is simply multiplying the absolute difference by 2: 47.5 * 2 = 95%.'
  },

  // ============================================
  // 5. PUZZLES & ANALYTICAL REASONING
  // ============================================
  {
    id: 'apt-puz-1',
    category: 'Puzzles & Analytical',
    subtopic: 'Clocks & Calendars',
    difficulty: 'Medium',
    company: 'Infosys',
    question: 'At what angle are the hands of a clock inclined when the time is 3:30?',
    options: ['70 degrees', '75 degrees', '80 degrees', '85 degrees'],
    correctAnswer: 1,
    explanation: 'Angle formula: theta = |(30 * H) - (11/2 * M)|. For H = 3, M = 30: theta = |(30 * 3) - (11/2 * 30)| = |90 - 165| = |-75| = 75 degrees.',
    formula: 'Angle = |30*H - 5.5*M| degrees',
    shortcutTrick: 'Minute hand is at 6 (180 deg). Hour hand at 3:30 is halfway between 3 and 4 (90 + 15 = 105 deg). 180 - 105 = 75 deg.'
  },
  {
    id: 'apt-puz-2',
    category: 'Puzzles & Analytical',
    subtopic: 'Seating Arrangement',
    difficulty: 'Hard',
    company: 'Amazon',
    question: 'Five people P, Q, R, S, and T sit in a row facing North. S is between T and Q. Q is to the immediate left of R. P is to the immediate left of T. Who is sitting in the exact middle of the row?',
    options: ['P', 'Q', 'S', 'T'],
    correctAnswer: 2,
    explanation: '1. P is immediate left of T: P, T.\n2. S is between T and Q: P, T, S, Q.\n3. Q is immediate left of R: P, T, S, Q, R.\nThe full row arrangement from left to right is: P, T, S, Q, R. The middle person is S.',
    shortcutTrick: 'Construct piecewise chains: PT + TSQ + QR = P T S Q R.'
  },

  // ============================================
  // 6. COMPANY-STYLE MOCK TESTS (TCS, INFOSYS, WIPRO, ACCENTURE)
  // ============================================
  {
    id: 'apt-mock-1',
    category: 'Company Mock Test',
    subtopic: 'TCS NQT Cognitive',
    difficulty: 'Medium',
    company: 'TCS NQT',
    question: 'If 12 men can complete a project in 15 days working 8 hours a day, how many days will 10 men take to complete twice the work working 9 hours a day?',
    options: ['30 days', '32 days', '36 days', '40 days'],
    correctAnswer: 1,
    explanation: 'Work equivalence formula: (M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2.\n(12 * 15 * 8) / 1 = (10 * D2 * 9) / 2\n1440 / 1 = (90 * D2) / 2 = 45 * D2\nD2 = 1440 / 45 = 32 days.',
    formula: '(M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2',
    shortcutTrick: '1440 / 45 = 32. Direct cancellation.'
  },
  {
    id: 'apt-mock-2',
    category: 'Company Mock Test',
    subtopic: 'Infosys Pseudo-code & Logic',
    difficulty: 'Medium',
    company: 'Infosys',
    question: 'What will be the output of the following pseudo-code?\nInteger a = 5, b = 10, c = 2\nc = (a ^ b) + (b >> 1)\nPrint c',
    options: ['17', '18', '20', '22'],
    correctAnswer: 2,
    explanation: '1. a ^ b = 5 XOR 10: 5 is 0101 in binary, 10 is 1010. 0101 XOR 1010 = 1111 (15 in decimal).\n2. b >> 1 = 10 right shifted by 1 = 5.\n3. c = 15 + 5 = 20.',
    shortcutTrick: '5 XOR 10 = 15. 10 >> 1 = 5. 15 + 5 = 20.'
  },
  {
    id: 'apt-mock-3',
    category: 'Company Mock Test',
    subtopic: 'Accenture Critical Reasoning',
    difficulty: 'Easy',
    company: 'Accenture',
    question: 'In a code, COMPUTER is written as RFUVQNPC. How will MEDICINE be written in the same code?',
    options: ['EOJDEJFM', 'EOJDJEFM', 'MFEDJJOE', 'MFEJDJOE'],
    correctAnswer: 1,
    explanation: '1. The first letter C becomes the last letter C.\n2. The last letter R becomes the first letter R.\n3. The intermediate letters are reversed and each shifted +1 forward:\nO (+1) = P, M (+1) = N, P (+1) = Q, U (+1) = V, T (+1) = U, E (+1) = F.\nFor MEDICINE:\nFirst letter M becomes last letter M. Last letter E becomes first letter E.\nRemaining letters EDICIN in reverse order: N, I, C, I, D, E.\nAdd +1 to each: N+1=O, I+1=J, C+1=D, I+1=J, D+1=E, E+1=F.\nResult: E + OJDJEF + M = EOJDJEFM.',
    shortcutTrick: 'Check the first and last letters first: E....M. Eliminates 2 options immediately.'
  }
];
