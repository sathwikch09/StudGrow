import {
  Student,
  Teacher,
  Subject,
  Exam,
  MonthlyAssessment,
  Doubt,
  AttendanceRecord,
  Review,
  BehaviourRecord,
  DisciplineRecord,
  ReportCard,
  LibraryResource,
} from '../types';

export const DEMO_STUDENT: Student = {
  id: 'STU-8042',
  rollNumber: '08',
  name: 'Aarav Sharma',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
  classGrade: 8,
  section: 'A',
  dob: '14/05/2012',
  pinHash: '1405',
  parentName: 'Rajesh & Meena Sharma',
  parentContact: '+91 98451 22340',
  email: 'aarav.sharma@studgrow.edu',
  address: 'Plot 42, Hitech City Road, Hyderabad, Telangana',
  streakDays: 14,
  xp: 2840,
  level: 6,
  classRank: 5,
  totalStudentsInClass: 42,
  rankTrend: 'up',
  attendancePercentage: 94.5,
  monthlyAverageScore: 82,
};

export const DEMO_TEACHER: Teacher = {
  id: 'TCH-102',
  name: 'Dr. Sunita Rao',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  subjects: ['Mathematics', 'Science'],
  assignedClasses: ['8A', '8B', '9A', '10B'],
  email: 'sunita.rao@studgrow.edu',
  role: 'teacher',
};

export const CLASS_STUDENTS: Student[] = [
  DEMO_STUDENT,
  {
    id: 'STU-8001',
    rollNumber: '01',
    name: 'Ananya Reddy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '02/03/2012',
    pinHash: '0203',
    parentName: 'Kishore Reddy',
    parentContact: '+91 98480 11223',
    email: 'ananya.r@studgrow.edu',
    address: 'Banjara Hills, Road 12, Hyderabad',
    streakDays: 21,
    xp: 3420,
    level: 7,
    classRank: 1,
    totalStudentsInClass: 42,
    rankTrend: 'same',
    attendancePercentage: 98,
    monthlyAverageScore: 94,
  },
  {
    id: 'STU-8002',
    rollNumber: '02',
    name: 'Kabir Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '18/07/2012',
    pinHash: '1807',
    parentName: 'Vikram Verma',
    parentContact: '+91 97001 44556',
    email: 'kabir.v@studgrow.edu',
    address: 'Madhapur Phase 2, Hyderabad',
    streakDays: 18,
    xp: 3150,
    level: 7,
    classRank: 2,
    totalStudentsInClass: 42,
    rankTrend: 'up',
    attendancePercentage: 96,
    monthlyAverageScore: 91,
  },
  {
    id: 'STU-8003',
    rollNumber: '03',
    name: 'Diya Krishnan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '29/11/2012',
    pinHash: '2911',
    parentName: 'Sridhar Krishnan',
    parentContact: '+91 99882 33441',
    email: 'diya.k@studgrow.edu',
    address: 'Gachibowli, Hyderabad',
    streakDays: 16,
    xp: 2980,
    level: 6,
    classRank: 3,
    totalStudentsInClass: 42,
    rankTrend: 'up',
    attendancePercentage: 95,
    monthlyAverageScore: 88,
  },
  {
    id: 'STU-8004',
    rollNumber: '04',
    name: 'Rohan Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '11/01/2012',
    pinHash: '1101',
    parentName: 'Prakash Deshmukh',
    parentContact: '+91 91234 56789',
    email: 'rohan.d@studgrow.edu',
    address: 'Kukatpally, Hyderabad',
    streakDays: 12,
    xp: 2890,
    level: 6,
    classRank: 4,
    totalStudentsInClass: 42,
    rankTrend: 'down',
    attendancePercentage: 92,
    monthlyAverageScore: 84,
  },
  {
    id: 'STU-8009',
    rollNumber: '09',
    name: 'Pooja Hegde',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '22/09/2012',
    pinHash: '2209',
    parentName: 'Srinivas Hegde',
    parentContact: '+91 98492 88471',
    email: 'pooja.h@studgrow.edu',
    address: 'Kondapur, Hyderabad',
    streakDays: 9,
    xp: 2410,
    level: 5,
    classRank: 6,
    totalStudentsInClass: 42,
    rankTrend: 'down',
    attendancePercentage: 93,
    monthlyAverageScore: 80,
  },
  {
    id: 'STU-8015',
    rollNumber: '15',
    name: 'Karthik Teja',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '05/06/2012',
    pinHash: '0506',
    parentName: 'Venkat Rao',
    parentContact: '+91 94401 23984',
    email: 'karthik.t@studgrow.edu',
    address: 'Miyapur, Hyderabad',
    streakDays: 5,
    xp: 1820,
    level: 4,
    classRank: 12,
    totalStudentsInClass: 42,
    rankTrend: 'same',
    attendancePercentage: 88,
    monthlyAverageScore: 72,
  },
  {
    id: 'STU-8022',
    rollNumber: '22',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '19/10/2012',
    pinHash: '1910',
    parentName: 'Manish Patel',
    parentContact: '+91 98251 90876',
    email: 'sneha.p@studgrow.edu',
    address: 'Jubilee Hills, Hyderabad',
    streakDays: 7,
    xp: 1950,
    level: 4,
    classRank: 9,
    totalStudentsInClass: 42,
    rankTrend: 'up',
    attendancePercentage: 91,
    monthlyAverageScore: 77,
  },
  {
    id: 'STU-8031',
    rollNumber: '31',
    name: 'Tanmay Das',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '30/12/2012',
    pinHash: '3012',
    parentName: 'Debashis Das',
    parentContact: '+91 98300 11982',
    email: 'tanmay.d@studgrow.edu',
    address: 'Begumpet, Hyderabad',
    streakDays: 3,
    xp: 1240,
    level: 3,
    classRank: 28,
    totalStudentsInClass: 42,
    rankTrend: 'down',
    attendancePercentage: 81,
    monthlyAverageScore: 61,
  },
  {
    id: 'STU-8040',
    rollNumber: '40',
    name: 'Zoya Khan',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    classGrade: 8,
    section: 'A',
    dob: '08/08/2012',
    pinHash: '0808',
    parentName: 'Tariq Khan',
    parentContact: '+91 98491 55678',
    email: 'zoya.k@studgrow.edu',
    address: 'Mehdipatnam, Hyderabad',
    streakDays: 2,
    xp: 980,
    level: 2,
    classRank: 34,
    totalStudentsInClass: 42,
    rankTrend: 'down',
    attendancePercentage: 78,
    monthlyAverageScore: 54,
  },
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    code: 'MATH-08',
    color: '#4F46E5', // Indigo
    accentColor: '#EEF2FF',
    iconName: 'Calculator',
    totalChapters: 6,
    completedChapters: 4,
    masteryPercentage: 78,
    weakConceptsCount: 1, // Fractions Word Problems
    chapters: [
      {
        id: 'math-ch1',
        subjectId: 'maths',
        title: 'Rational Numbers & Operations',
        classGrade: 8,
        order: 1,
        concepts: [
          {
            id: 'c-frac-1',
            chapterId: 'math-ch1',
            subjectId: 'maths',
            title: 'Equivalent Fractions & Simplification',
            estimatedMinutes: 10,
            difficulty: 'Easy',
            masteryScore: 92,
            masteryLevel: 'Mastered',
            summary: 'Understanding how to multiply or divide numerator and denominator by the same number without changing value.',
            explanations: {
              basic: 'Two fractions are equivalent when they represent the exact same portion of a whole, even if they have different numbers. For example, 1/2 of a pizza is the exact same amount as 2/4 or 4/8 of that pizza.',
              detailed: 'Mathematically, if you have a fraction a/b (where b ≠ 0), multiplying or dividing both a and b by any non-zero integer k gives (a · k) / (b · k), which equals a/b. To simplify a fraction to its lowest terms, divide both numerator and denominator by their Greatest Common Divisor (GCD).',
              visual: {
                diagramType: 'fractions',
                caption: 'Visualizing 1/2 vs 2/4 vs 4/8 slices of equal circles',
                steps: [
                  'Step 1: Divide circle into 2 equal parts. Shade 1 part = 1/2.',
                  'Step 2: Cut each slice in half: now 4 parts total, with 2 shaded = 2/4.',
                  'Step 3: Cut each slice in half again: now 8 parts, with 4 shaded = 4/8.',
                  'Conclusion: The shaded area remains exactly 50% in all cases.'
                ]
              },
              example: {
                scenario: 'Aarav has 6 out of 10 chocolates. Diya has 3 out of 5 chocolates. Who has a larger share?',
                solution: 'Divide Aarav’s fraction (6/10) by 2 on both sides: 6 ÷ 2 = 3, and 10 ÷ 2 = 5. So 6/10 = 3/5. Both Aarav and Diya have the exact same share!'
              },
              simpler: 'Think of a chocolate bar broken into 4 squares. If you eat 2 squares, you ate half the bar (2 out of 4 is the same as 1 out of 2).'
            },
            keyTakeaways: [
              'Multiplying top and bottom by the same number keeps the value unchanged.',
              'Dividing top and bottom by their GCD brings the fraction to simplest form.',
              'Cross-multiplication check: a/b = c/d if and only if a · d = b · c.'
            ],
            questions: [
              {
                id: 'q-eq-1',
                conceptId: 'c-frac-1',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'Which of the following fractions is equivalent to 3/4?',
                options: ['6/8', '6/12', '9/15', '4/3'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Multiply both top (3) and bottom (4) by the number 2.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '3 × 2 = 6, and 4 × 2 = ?', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '3/4 = (3×2)/(4×2) = 6/8.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Multiplying both 3 and 4 by 2 gives 6/8. Both equal 0.75.',
                  commonMistake: 'Adding numbers instead of multiplying (e.g. thinking (3+3)/(4+8)).',
                  stepByStep: ['3/4 × 2/2 = 6/8', 'Both represent 75% of a whole.']
                },
                tags: ['fractions', 'equivalent', 'class8']
              },
              {
                id: 'q-eq-2',
                conceptId: 'c-frac-1',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'Simplify the fraction 15/25 to its lowest terms:',
                options: ['3/5', '1/5', '5/3', '3/10'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Find the largest number that divides both 15 and 25.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Both 15 and 25 end in 5, so both are divisible by 5.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '15 ÷ 5 = 3 and 25 ÷ 5 = 5, giving 3/5.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'The GCD of 15 and 25 is 5. Dividing both gives 3/5.',
                  commonMistake: 'Only dividing the top number or choosing 1/5.',
                  stepByStep: ['GCD(15, 25) = 5', '15 ÷ 5 = 3', '25 ÷ 5 = 5', 'Result = 3/5']
                },
                tags: ['simplification', 'gcd']
              },
              {
                id: 'q-eq-3',
                conceptId: 'c-frac-1',
                type: 'true-false',
                difficulty: 'Easy',
                prompt: 'True or False: The fractions 4/6 and 6/9 are equivalent.',
                options: ['True', 'False'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Simplify both fractions to their lowest terms.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '4/6 simplifies to 2/3. Does 6/9 also simplify to 2/3?', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '6/9 ÷ 3/3 = 2/3. Since both equal 2/3, they are equivalent.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Both 4/6 and 6/9 reduce to 2/3, so they are equal.',
                  commonMistake: 'Looking only at the differing numbers without simplifying.',
                  stepByStep: ['4/6 = 2/3', '6/9 = 2/3', 'Both are equal!']
                },
                tags: ['true-false', 'fractions']
              },
              {
                id: 'q-eq-4',
                conceptId: 'c-frac-1',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'If 5/7 = x/35, what is the value of x?',
                options: ['25', '20', '30', '35'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'What number did we multiply 7 by to get 35?', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '7 × 5 = 35. Multiply the top number (5) by 5 as well.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '5 × 5 = 25.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Since denominator is multiplied by 5 (7 × 5 = 35), numerator must be multiplied by 5 (5 × 5 = 25).',
                  commonMistake: 'Adding 28 to the top because 35 - 7 = 28.',
                  stepByStep: ['Scale factor = 35 / 7 = 5', 'x = 5 × 5 = 25']
                },
                tags: ['algebra-prep', 'scale-factor']
              },
              {
                id: 'q-eq-5',
                conceptId: 'c-frac-1',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'Which pair of fractions are NOT equivalent?',
                options: ['2/3 and 8/12', '4/5 and 12/15', '3/7 and 9/28', '5/6 and 25/30'],
                correctAnswer: 2,
                hints: [
                  { level: 1, type: 'nudge', text: 'Test each pair by cross-multiplication (a × d = b × c).', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Look at 3/7 and 9/28: 3 × 3 = 9, but 7 × 3 = 21, not 28.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '3 × 28 = 84, while 7 × 9 = 63. Since 84 ≠ 63, 3/7 ≠ 9/28.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '3/7 multiplied by 3/3 is 9/21, not 9/28. Hence 3/7 and 9/28 are not equivalent.',
                  commonMistake: 'Assuming 28 is divisible by 7 so the fraction must be equal.',
                  stepByStep: ['Check 3/7 vs 9/28: 3 × 28 = 84, 7 × 9 = 63. Not equal!']
                },
                tags: ['comparison', 'fractions']
              },
              {
                id: 'q-eq-6',
                conceptId: 'c-frac-1',
                type: 'fill-blank',
                difficulty: 'Hard',
                prompt: 'Fill in the blank: What is the denominator when 7/9 is written as an equivalent fraction with numerator 42?',
                options: ['54'],
                correctAnswer: '54',
                hints: [
                  { level: 1, type: 'nudge', text: 'Find what 7 was multiplied by to equal 42.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '42 ÷ 7 = 6. Now multiply the denominator 9 by 6.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '9 × 6 = 54.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '42 / 7 = 6. Multiplying denominator by 6 gives 9 × 6 = 54.',
                  commonMistake: 'Calculating 42 + 2 = 44.',
                  stepByStep: ['Multiplier = 42 ÷ 7 = 6', 'Denominator = 9 × 6 = 54']
                },
                tags: ['fill-blank', 'hard']
              },
              {
                id: 'q-eq-7',
                conceptId: 'c-frac-1',
                type: 'mcq',
                difficulty: 'Hard',
                prompt: 'If (2x + 1)/10 = 1/2, what is the value of x?',
                options: ['2', '3', '4', '5'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Convert 1/2 to an equivalent fraction with denominator 10.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '1/2 = 5/10. That means 2x + 1 must equal 5.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '2x + 1 = 5 → 2x = 4 → x = 2.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '1/2 is equivalent to 5/10. Equating numerators: 2x + 1 = 5 → 2x = 4 → x = 2.',
                  commonMistake: 'Forgetting to subtract 1 before dividing by 2.',
                  stepByStep: ['(2x + 1)/10 = 5/10', '2x + 1 = 5', '2x = 4', 'x = 2']
                },
                tags: ['algebra', 'challenge']
              },
              {
                id: 'q-eq-8',
                conceptId: 'c-frac-1',
                type: 'mcq',
                difficulty: 'Hard',
                prompt: 'A cake is cut into 24 equal slices. If Priya eats 3/8 of the cake, how many slices did she eat?',
                options: ['9', '6', '12', '8'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Find an equivalent fraction for 3/8 with a denominator of 24.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '8 × 3 = 24. So multiply numerator 3 by 3.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '3/8 = 9/24, so she ate 9 slices.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '3/8 of 24 = (3/8) × 24 = 3 × 3 = 9 slices.',
                  commonMistake: 'Dividing 24 by 8 and stopping at 3.',
                  stepByStep: ['Total slices = 24', '1/8 of 24 = 3 slices', '3/8 of 24 = 3 × 3 = 9 slices']
                },
                tags: ['word-problem', 'real-life']
              }
            ]
          },
          {
            id: 'c-frac-2',
            chapterId: 'math-ch1',
            subjectId: 'maths',
            title: 'Addition & Subtraction of Unlike Fractions',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            masteryScore: 68,
            masteryLevel: 'Learning',
            prerequisiteConceptId: 'c-frac-1',
            summary: 'Finding the Least Common Denominator (LCD) to add or subtract fractions with different bottom numbers.',
            explanations: {
              basic: 'You cannot add slices of different sizes directly (like adding 1 half and 1 third). First, cut both into equal small pieces using a common denominator, then add the tops.',
              detailed: 'To add a/b + c/d: 1) Find the LCM of b and d. 2) Convert both fractions to equivalent fractions having this LCM as their denominator. 3) Add or subtract the numerators and keep the common denominator: (a·d + b·c) / (b·d). 4) Simplify.',
              visual: {
                diagramType: 'fractions',
                caption: 'Converting 1/2 + 1/3 into 3/6 + 2/6 = 5/6',
                steps: [
                  'Step 1: Slice 1/2 into 3 equal pieces = 3/6.',
                  'Step 2: Slice 1/3 into 2 equal pieces = 2/6.',
                  'Step 3: Combine pieces together: 3/6 + 2/6 = 5/6.'
                ]
              },
              example: {
                scenario: 'Rahul drank 2/5 liter of milk in the morning and 1/3 liter in the evening. How much milk did he drink in total?',
                solution: 'LCM of 5 and 3 is 15. 2/5 = 6/15 and 1/3 = 5/15. Total = 6/15 + 5/15 = 11/15 liter.'
              },
              simpler: 'Before you can add fractions, their bottom numbers MUST be the same. Change them to the same bottom number first!'
            },
            keyTakeaways: [
              'Never add the denominators together (e.g., 1/2 + 1/3 is NOT 2/5).',
              'Use the LCM of denominators to find the common base.',
              'Always reduce the final sum or difference to simplest terms.'
            ],
            questions: [
              {
                id: 'q-add-1',
                conceptId: 'c-frac-2',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'What is the sum of 1/4 + 2/4?',
                options: ['3/4', '3/8', '2/8', '1/2'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'The denominators are already identical (4). Just add the top numbers.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '1 + 2 = 3. The denominator stays 4.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '1/4 + 2/4 = 3/4.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'When denominators match, add only numerators: (1+2)/4 = 3/4.',
                  commonMistake: 'Adding the denominators: 4 + 4 = 8 (wrong!).',
                  stepByStep: ['Denominator = 4', 'Numerator = 1 + 2 = 3', 'Result = 3/4']
                },
                tags: ['addition', 'same-denominator']
              },
              {
                id: 'q-add-2',
                conceptId: 'c-frac-2',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'Calculate 1/3 + 1/6:',
                options: ['1/2', '2/9', '2/6', '5/6'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Convert 1/3 into an equivalent fraction with denominator 6.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '1/3 = 2/6. Now add 2/6 + 1/6.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '2/6 + 1/6 = 3/6 = 1/2.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '1/3 = 2/6. Then 2/6 + 1/6 = 3/6, which simplifies to 1/2.',
                  commonMistake: 'Adding straight across: (1+1)/(3+6) = 2/9.',
                  stepByStep: ['LCM(3, 6) = 6', '1/3 = 2/6', '2/6 + 1/6 = 3/6', '3/6 simplifies to 1/2']
                },
                tags: ['unlike-fractions']
              },
              {
                id: 'q-add-3',
                conceptId: 'c-frac-2',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'What is 3/4 - 1/2?',
                options: ['1/4', '2/2', '1/2', '2/4'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Rewrite 1/2 with denominator 4.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '1/2 = 2/4. Now subtract: 3/4 - 2/4.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '3/4 - 2/4 = 1/4.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '3/4 - 2/4 = 1/4.',
                  commonMistake: 'Thinking 3/4 - 1/2 = 2/2 = 1.',
                  stepByStep: ['1/2 = 2/4', '3/4 - 2/4 = 1/4']
                },
                tags: ['subtraction']
              },
              {
                id: 'q-add-4',
                conceptId: 'c-frac-2',
                type: 'mcq',
                difficulty: 'Hard',
                prompt: 'Evaluate: 2/5 + 3/7',
                options: ['29/35', '5/12', '27/35', '31/35'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'LCM of 5 and 7 is 35.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '2/5 = 14/35 and 3/7 = 15/35.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '14/35 + 15/35 = 29/35.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '(2 × 7 + 3 × 5) / 35 = (14 + 15) / 35 = 29/35.',
                  commonMistake: 'Adding straight across to get 5/12.',
                  stepByStep: ['LCM = 35', '2/5 = 14/35', '3/7 = 15/35', 'Sum = 29/35']
                },
                tags: ['lcm', 'hard']
              },
              {
                id: 'q-add-5',
                conceptId: 'c-frac-2',
                type: 'fill-blank',
                difficulty: 'Hard',
                prompt: 'Calculate 5/6 - 1/4 in simplest form. (Type answer as p/q)',
                options: ['7/12'],
                correctAnswer: '7/12',
                hints: [
                  { level: 1, type: 'nudge', text: 'Find LCM of 6 and 4 (it is 12).', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '5/6 = 10/12 and 1/4 = 3/12.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '10/12 - 3/12 = 7/12.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'LCM(6,4) = 12. (10 - 3)/12 = 7/12.',
                  commonMistake: 'Using 24 instead of 12 and forgetting to simplify.',
                  stepByStep: ['LCM(6,4) = 12', '10/12 - 3/12 = 7/12']
                },
                tags: ['fill-blank', 'subtraction']
              },
              {
                id: 'q-add-6',
                conceptId: 'c-frac-2',
                type: 'true-false',
                difficulty: 'Easy',
                prompt: 'True or False: 1/2 + 1/2 = 1',
                options: ['True', 'False'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Half plus half equals one whole.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '2/2 = 1.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '(1+1)/2 = 2/2 = 1.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '1/2 + 1/2 = 2/2 = 1.',
                  commonMistake: 'None, fundamental identity.',
                  stepByStep: ['1/2 + 1/2 = 2/2 = 1']
                },
                tags: ['true-false']
              },
              {
                id: 'q-add-7',
                conceptId: 'c-frac-2',
                type: 'mcq',
                difficulty: 'Hard',
                prompt: 'Solve: 1 1/2 + 2 1/3 (Mixed fractions)',
                options: ['3 5/6', '3 2/5', '3 1/6', '4 1/6'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Add whole numbers (1+2=3), then add fractions (1/2 + 1/3).', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '1/2 + 1/3 = 3/6 + 2/6 = 5/6.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '3 + 5/6 = 3 5/6.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Sum of whole parts: 1+2=3. Sum of fractional parts: 1/2 + 1/3 = 5/6. Combined = 3 5/6.',
                  commonMistake: 'Converting to improper fractions incorrectly.',
                  stepByStep: ['1 + 2 = 3', '1/2 + 1/3 = 5/6', 'Result = 3 5/6']
                },
                tags: ['mixed-fractions']
              },
              {
                id: 'q-add-8',
                conceptId: 'c-frac-2',
                type: 'mcq',
                difficulty: 'Hard',
                prompt: 'A water tank is 5/8 full. If 1/4 of the tank is drained, what fraction remains filled?',
                options: ['3/8', '4/8', '2/8', '1/2'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Subtract: 5/8 - 1/4.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Convert 1/4 to 2/8.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '5/8 - 2/8 = 3/8.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '5/8 - 1/4 = 5/8 - 2/8 = 3/8.',
                  commonMistake: 'Adding instead of subtracting.',
                  stepByStep: ['Initial = 5/8', 'Drained = 2/8', 'Remaining = 5/8 - 2/8 = 3/8']
                },
                tags: ['word-problem']
              }
            ]
          },
          {
            id: 'c-frac-3',
            chapterId: 'math-ch1',
            subjectId: 'maths',
            title: 'Word Problems on Fractions (Weak Spot)',
            estimatedMinutes: 20,
            difficulty: 'Hard',
            masteryScore: 48,
            masteryLevel: 'Needs Help',
            prerequisiteConceptId: 'c-frac-2',
            summary: 'Translating real-world word problems into fractions, division, and multi-step calculations.',
            explanations: {
              basic: 'Word problems hide mathematical operations behind stories. Words like "shared equally" mean division; "fraction of the remainder" requires two steps.',
              detailed: 'When solving fraction word problems: 1) Identify the whole (usually 1 or a given quantity). 2) Translate key phrases: "of" means multiply, "left" or "remainder" means subtract from 1 or total. 3) Draw a bar model to represent shares before calculating.',
              visual: {
                diagramType: 'fractions',
                caption: 'Bar modeling for "Remaining" fraction problems',
                steps: [
                  'Step 1: Draw a full bar representing total budget (100%).',
                  'Step 2: Shade 1/3 spent on food.',
                  'Step 3: The unshaded part is 2/3 (the remainder).',
                  'Step 4: Take half of that remainder = 1/2 × 2/3 = 1/3 on books.'
                ]
              },
              example: {
                scenario: 'Ananya had ₹600. She spent 1/3 of it on books and 1/4 of the remainder on stationery. How much money is left?',
                solution: 'Spent on books = 1/3 × 600 = ₹200. Remainder = 600 - 200 = ₹400. Spent on stationery = 1/4 × 400 = ₹100. Money left = 400 - 100 = ₹300.'
              },
              simpler: 'Always find what is LEFT before calculating the next part. Break the story down into one sentence at a time.'
            },
            keyTakeaways: [
              '"Fraction of" means multiply: 3/4 of 40 = 3/4 × 40.',
              'Check if the question asks for fraction of the TOTAL or fraction of the REMAINDER.',
              'Estimate your answer first: if she had ₹600 and spent money, the answer must be less than ₹600.'
            ],
            questions: [
              {
                id: 'q-wp-1',
                conceptId: 'c-frac-3',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'A box has 60 marbles. If 2/5 of them are blue, how many marbles are blue?',
                options: ['24', '20', '30', '15'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Multiply total marbles (60) by 2/5.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'First divide 60 by 5 = 12. Then multiply 12 by 2.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '12 × 2 = 24.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '2/5 of 60 = (60 ÷ 5) × 2 = 12 × 2 = 24 blue marbles.',
                  commonMistake: 'Calculating 60 - 2/5.',
                  stepByStep: ['60 × (2/5) = (60/5) × 2 = 12 × 2 = 24']
                },
                tags: ['word-problem', 'intro']
              },
              {
                id: 'q-wp-2',
                conceptId: 'c-frac-3',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'Kavita reads 3/7 of a 140-page book on Saturday and 2/7 on Sunday. How many pages remain unread?',
                options: ['40 pages', '60 pages', '80 pages', '50 pages'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Find total fraction read: 3/7 + 2/7.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'She read 5/7 of the book. Unread fraction = 1 - 5/7 = 2/7.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '2/7 of 140 = (140 ÷ 7) × 2 = 20 × 2 = 40 pages.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Total read = 5/7. Remaining = 2/7. 2/7 of 140 = 40 pages.',
                  commonMistake: 'Calculating the pages read (100) instead of unread pages.',
                  stepByStep: ['Read fraction = 5/7', 'Unread fraction = 2/7', 'Unread pages = (2/7) × 140 = 40']
                },
                tags: ['pages', 'remainder']
              },
              {
                id: 'q-wp-3',
                conceptId: 'c-frac-3',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'A rope of length 12 meters is cut into equal pieces of length 3/4 meter each. How many pieces are obtained?',
                options: ['16', '12', '9', '18'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Divide total length (12) by length of each piece (3/4).', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Dividing by 3/4 is the same as multiplying by 4/3.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '12 × (4/3) = 4 × 4 = 16 pieces.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '12 ÷ (3/4) = 12 × (4/3) = 16 pieces.',
                  commonMistake: 'Multiplying 12 by 3/4 to get 9 (which is smaller than 12!).',
                  stepByStep: ['Pieces = 12 ÷ (3/4)', '= 12 × (4/3)', '= 4 × 4 = 16']
                },
                tags: ['division', 'word-problem']
              },
              {
                id: 'q-wp-4',
                conceptId: 'c-frac-3',
                type: 'mcq',
                difficulty: 'Hard',
                prompt: 'Suresh spent 1/4 of his monthly income on rent, 2/5 on groceries, and saved the remaining ₹7,000. What is his total monthly income?',
                options: ['₹20,000', '₹25,000', '₹18,000', '₹22,000'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Add the fractions spent: 1/4 + 2/5.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '1/4 + 2/5 = 5/20 + 8/20 = 13/20 spent. Savings = 7/20.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '7/20 of income = ₹7,000 → 1/20 = ₹1,000 → Total = ₹20,000.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Fraction spent = 13/20. Fraction saved = 7/20. If 7/20 is ₹7,000, then total income = 7000 × (20/7) = ₹20,000.',
                  commonMistake: 'Assuming 7/20 means ₹700 instead of ₹7,000.',
                  stepByStep: [
                    'Spent = 1/4 + 2/5 = 13/20',
                    'Saved = 1 - 13/20 = 7/20',
                    '7/20 × Income = 7000',
                    'Income = 7000 × 20 / 7 = ₹20,000'
                  ]
                },
                tags: ['income', 'multi-step', 'adaptive-favorite']
              },
              {
                id: 'q-wp-5',
                conceptId: 'c-frac-3',
                type: 'fill-blank',
                difficulty: 'Hard',
                prompt: 'If 3/8 of a number is 27, what is 2/3 of that same number?',
                options: ['48'],
                correctAnswer: '48',
                hints: [
                  { level: 1, type: 'nudge', text: 'Find the original number first.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '3/8 of N = 27 → N = 27 × 8 / 3 = 72.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: 'Now find 2/3 of 72 = 24 × 2 = 48.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Number = 27 × (8/3) = 72. Then 2/3 of 72 = 48.',
                  commonMistake: 'Stopping after finding 72 without taking 2/3 of it.',
                  stepByStep: ['N = 27 × 8 / 3 = 72', '2/3 of 72 = 48']
                },
                tags: ['two-step', 'fill-blank']
              },
              {
                id: 'q-wp-6',
                conceptId: 'c-frac-3',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'In a class of 40 students, 1/2 like cricket, 1/4 like football, and the rest like badminton. How many like cricket?',
                options: ['20', '10', '15', '25'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Half of 40 students like cricket.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '40 ÷ 2 = ?', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '40 / 2 = 20.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '1/2 of 40 = 20 students.',
                  commonMistake: 'None.',
                  stepByStep: ['40 / 2 = 20']
                },
                tags: ['sports', 'easy']
              },
              {
                id: 'q-wp-7',
                conceptId: 'c-frac-3',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'From the same class of 40 students (1/2 cricket, 1/4 football, rest badminton), how many students like badminton?',
                options: ['10', '15', '20', '8'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Cricket = 20, Football = 1/4 of 40 = 10.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Cricket + Football = 20 + 10 = 30. Rest like badminton.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '40 - 30 = 10 students.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Cricket = 20, Football = 10. Badminton = 40 - (20 + 10) = 10.',
                  commonMistake: 'Subtracting 20 and forgetting to subtract football.',
                  stepByStep: ['Cricket: 20', 'Football: 10', 'Total: 30', 'Badminton: 40 - 30 = 10']
                },
                tags: ['subtraction', 'rest']
              },
              {
                id: 'q-wp-8',
                conceptId: 'c-frac-3',
                type: 'true-false',
                difficulty: 'Medium',
                prompt: 'True or False: If you spend half of your money, and then spend half of what is left, you will have 1/4 of your original money remaining.',
                options: ['True', 'False'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Try it with ₹100.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Spend 50 → 50 left. Spend half of 50 (25) → 25 left.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: '25 is 1/4 of 100. True!', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '1 - 1/2 = 1/2 left. 1/2 × 1/2 = 1/4 spent. Remaining = 1/2 - 1/4 = 1/4.',
                  commonMistake: 'Thinking half and half leaves zero.',
                  stepByStep: ['Initial = 1', 'After first spend = 1/2', 'Half of 1/2 = 1/4', 'Remainder = 1/4. True!']
                },
                tags: ['logic', 'true-false']
              }
            ]
          }
        ]
      },
      {
        id: 'math-ch2',
        subjectId: 'maths',
        title: 'Linear Equations in One Variable',
        classGrade: 8,
        order: 2,
        concepts: [
          {
            id: 'c-lin-1',
            chapterId: 'math-ch2',
            subjectId: 'maths',
            title: 'Balancing Linear Equations',
            estimatedMinutes: 12,
            difficulty: 'Easy',
            masteryScore: 85,
            masteryLevel: 'Good',
            summary: 'Performing identical operations on both Left Hand Side (LHS) and Right Hand Side (RHS).',
            explanations: {
              basic: 'An equation is like a weighing balance. Whatever you add, subtract, multiply, or divide on one side, you MUST do on the other side to keep it balanced.',
              detailed: 'Given ax + b = c, we isolate x by first subtracting b from both sides (ax = c - b) and then dividing both sides by a (x = (c - b)/a).',
              visual: {
                diagramType: 'geometry',
                caption: 'Weighing scale balance concept: LHS = RHS',
                steps: [
                  'Scale balanced: [ 2x + 3 ] = [ 11 ]',
                  'Remove 3 weights from both pans: [ 2x ] = [ 8 ]',
                  'Divide both sides by 2: [ x ] = [ 4 ]'
                ]
              },
              example: {
                scenario: 'Solve 3x + 7 = 22.',
                solution: 'Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5.'
              },
              simpler: 'Undo operations in reverse order: undo plus with minus, undo multiply with divide.'
            },
            keyTakeaways: [
              'Whatever you do to the left side, do to the right side.',
              'Isolate the variable term first, then isolate the variable itself.'
            ],
            questions: [
              {
                id: 'q-lin-1',
                conceptId: 'c-lin-1',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'If x + 7 = 15, what is the value of x?',
                options: ['8', '22', '7', '9'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Subtract 7 from both sides.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '15 - 7 = ?', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: 'x = 15 - 7 = 8.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'x = 15 - 7 = 8.',
                  commonMistake: 'Adding 7 to 15 to get 22.',
                  stepByStep: ['x + 7 - 7 = 15 - 7', 'x = 8']
                },
                tags: ['algebra', 'linear']
              },
              {
                id: 'q-lin-2',
                conceptId: 'c-lin-1',
                type: 'mcq',
                difficulty: 'Medium',
                prompt: 'Solve: 4x - 5 = 19',
                options: ['6', '5', '7', '4'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Add 5 to both sides first.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: '4x = 19 + 5 = 24. Now divide by 4.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: 'x = 24 ÷ 4 = 6.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: '4x = 19 + 5 = 24 → x = 6.',
                  commonMistake: 'Subtracting 5 again instead of adding.',
                  stepByStep: ['4x - 5 + 5 = 19 + 5', '4x = 24', 'x = 6']
                },
                tags: ['two-step']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'General Science',
    code: 'SCI-08',
    color: '#06B6D4', // Cyan
    accentColor: '#ECFEFF',
    iconName: 'Atom',
    totalChapters: 6,
    completedChapters: 5,
    masteryPercentage: 86,
    weakConceptsCount: 0,
    chapters: [
      {
        id: 'sci-ch1',
        subjectId: 'science',
        title: 'Cell Structure and Microorganisms',
        classGrade: 8,
        order: 1,
        concepts: [
          {
            id: 'c-cell-1',
            chapterId: 'sci-ch1',
            subjectId: 'science',
            title: 'Plant vs Animal Cells Organelles',
            estimatedMinutes: 15,
            difficulty: 'Medium',
            masteryScore: 88,
            masteryLevel: 'Good',
            summary: 'Distinguishing features: cell wall, chloroplasts, and large central vacuole in plant cells.',
            explanations: {
              basic: 'Both plant and animal cells have a nucleus and cell membrane, but plant cells have rigid cell walls and green chloroplasts for photosynthesis.',
              detailed: 'Plant cells possess three unique structures: 1) Cell Wall (cellulose) for structural rigidity. 2) Chloroplasts containing chlorophyll to synthesize glucose from sunlight. 3) A large central vacuole maintaining turgor pressure. Animal cells lack cell walls and chloroplasts and have smaller vacuoles.',
              visual: {
                diagramType: 'atom',
                caption: 'Cell comparison diagram',
                steps: [
                  'Plant Cell: Outer Cell Wall + Inner Membrane + Green Chloroplasts + Large Central Vacuole.',
                  'Animal Cell: Only Cell Membrane + Nucleus + Mitochondria + Small Vacuoles.'
                ]
              },
              example: {
                scenario: 'Why can plants withstand strong winds and heavy rain while animals must seek shelter?',
                solution: 'The rigid cellulose cell wall provides mechanical strength and prevents plant cells from bursting under osmotic pressure.'
              },
              simpler: 'Plant cells have a hard protective "brick wall" around them; animal cells are soft and flexible.'
            },
            keyTakeaways: [
              'Chloroplasts are found ONLY in plant cells (for making food from sunlight).',
              'Cell wall is made of cellulose and provides shape.',
              'Mitochondria is the powerhouse of BOTH plant and animal cells.'
            ],
            questions: [
              {
                id: 'q-cell-1',
                conceptId: 'c-cell-1',
                type: 'mcq',
                difficulty: 'Easy',
                prompt: 'Which organelle is found in plant cells but NOT in animal cells?',
                options: ['Chloroplast', 'Mitochondria', 'Nucleus', 'Ribosome'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Think about which organelle makes plants green.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'Plants make their own food using this organelle.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: 'Chloroplasts capture sunlight for photosynthesis.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'Chloroplasts contain chlorophyll for photosynthesis and are unique to photosynthetic plants and algae.',
                  commonMistake: 'Confusing mitochondria (which both have) with chloroplasts.',
                  stepByStep: ['Plants have chloroplasts for photosynthesis', 'Animal cells do not have chloroplasts']
                },
                tags: ['cells', 'biology']
              },
              {
                id: 'q-cell-2',
                conceptId: 'c-cell-1',
                type: 'true-false',
                difficulty: 'Easy',
                prompt: 'True or False: The cell membrane is present in both plant and animal cells.',
                options: ['True', 'False'],
                correctAnswer: 0,
                hints: [
                  { level: 1, type: 'nudge', text: 'Every living cell needs a membrane to hold its contents.', xpPenalty: 2 },
                  { level: 2, type: 'clue', text: 'In plants, the membrane is just inside the cell wall.', xpPenalty: 5 },
                  { level: 3, type: 'near-solution', text: 'True. Both cell types have a plasma membrane.', xpPenalty: 10 }
                ],
                explanation: {
                  whyCorrect: 'All eukaryotic cells, whether plant or animal, have a selectively permeable cell membrane.',
                  commonMistake: 'Thinking plants only have a cell wall and no membrane.',
                  stepByStep: ['Animal: Membrane is outermost layer', 'Plant: Membrane lies inside cell wall', 'Both have it!']
                },
                tags: ['true-false', 'cells']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English Language',
    code: 'ENG-08',
    color: '#EC4899', // Pink
    accentColor: '#FDF2F8',
    iconName: 'BookOpen',
    totalChapters: 5,
    completedChapters: 4,
    masteryPercentage: 84,
    weakConceptsCount: 0,
    chapters: []
  },
  {
    id: 'social',
    name: 'Social Science',
    code: 'SOC-08',
    color: '#F59E0B', // Amber
    accentColor: '#FFFBEB',
    iconName: 'Globe',
    totalChapters: 6,
    completedChapters: 4,
    masteryPercentage: 74,
    weakConceptsCount: 1,
    chapters: []
  },
  {
    id: 'telugu',
    name: 'Telugu Language',
    code: 'TEL-08',
    color: '#8B5CF6', // Violet
    accentColor: '#F5F3FF',
    iconName: 'Languages',
    totalChapters: 5,
    completedChapters: 3,
    masteryPercentage: 80,
    weakConceptsCount: 0,
    chapters: []
  },
  {
    id: 'cs',
    name: 'Computer Science',
    code: 'CS-08',
    color: '#10B981', // Emerald
    accentColor: '#ECFDF5',
    iconName: 'Code',
    totalChapters: 4,
    completedChapters: 3,
    masteryPercentage: 91,
    weakConceptsCount: 0,
    chapters: []
  }
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'ex-01',
    title: 'Mathematics Mid-Term Assessment',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    date: '2026-11-01', // 2 days away!
    daysRemaining: 2,
    durationMinutes: 90,
    totalMarks: 80,
    syllabus: [
      'Chapter 1: Rational Numbers & Equivalent Fractions',
      'Chapter 2: Linear Equations in One Variable',
      'Chapter 3: Understanding Quadrilaterals'
    ],
    isUrgent: true,
    status: 'upcoming'
  },
  {
    id: 'ex-02',
    title: 'General Science Term Exam',
    subjectId: 'science',
    subjectName: 'Science',
    date: '2026-11-06',
    daysRemaining: 7,
    durationMinutes: 90,
    totalMarks: 80,
    syllabus: [
      'Cell Structure and Organelles',
      'Microorganisms: Friend and Foe',
      'Force and Pressure'
    ],
    isUrgent: false,
    status: 'upcoming'
  },
  {
    id: 'ex-03',
    title: 'English Language Diagnostic',
    subjectId: 'english',
    subjectName: 'English',
    date: '2026-10-15',
    daysRemaining: 0,
    durationMinutes: 60,
    totalMarks: 50,
    syllabus: ['Reading Comprehension', 'Active & Passive Voice', 'Formal Letter Writing'],
    isUrgent: false,
    status: 'completed',
    scoredMarks: 44,
    classAverage: 38,
    grade: 'A+'
  },
  {
    id: 'ex-04',
    title: 'Social Science Unit Test',
    subjectId: 'social',
    subjectName: 'Social Science',
    date: '2026-10-08',
    daysRemaining: 0,
    durationMinutes: 60,
    totalMarks: 50,
    syllabus: ['The Indian Constitution', 'Resources and Development'],
    isUrgent: false,
    status: 'completed',
    scoredMarks: 39,
    classAverage: 35,
    grade: 'A'
  }
];

export const MOCK_MONTHLY_ASSESSMENTS: MonthlyAssessment[] = [
  { month: 'Jul', studentScore: 72, classAverage: 68 },
  { month: 'Aug', studentScore: 76, classAverage: 71 },
  { month: 'Sep', studentScore: 81, classAverage: 73 },
  { month: 'Oct', studentScore: 86, classAverage: 74 },
];

export const MOCK_DOUBTS: Doubt[] = [
  {
    id: 'd-101',
    studentId: 'STU-8042',
    studentName: 'Aarav Sharma',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    conceptTitle: 'Word Problems on Fractions',
    questionText: 'When a question says "1/4 of the remainder", why can we not simply subtract 1/4 from the whole 1?',
    createdAt: 'Yesterday at 4:30 PM',
    status: 'Answered',
    teacherReply: {
      teacherName: 'Dr. Sunita Rao',
      replyText: 'Excellent question Aarav! "Remainder" refers only to what was left after the first expenditure, NOT the original whole. If you had ₹100 and spent ₹50, the remainder is ₹50. One-fourth of ₹50 is ₹12.50, whereas 1/4 of ₹100 is ₹25. Always calculate the remaining portion first!',
      repliedAt: 'Yesterday at 6:15 PM'
    }
  },
  {
    id: 'd-102',
    studentId: 'STU-8042',
    studentName: 'Aarav Sharma',
    subjectId: 'science',
    subjectName: 'Science',
    conceptTitle: 'Cell Organelles',
    questionText: 'Do plant cells also have mitochondria since they already have chloroplasts to make energy?',
    createdAt: 'Today at 11:20 AM',
    status: 'Open'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    teacherName: 'Dr. Sunita Rao',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    subject: 'Mathematics',
    date: '24 Oct 2026',
    rating: 5,
    comment: 'Aarav has shown outstanding improvement in Linear Equations! His problem-solving speed has increased by 40%. Continuing to practice fraction word problems will help him secure top rank.',
    category: 'Academics'
  },
  {
    id: 'rev-2',
    teacherName: 'Mr. David Paul',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    subject: 'English',
    date: '18 Oct 2026',
    rating: 4,
    comment: 'Very enthusiastic in literature discussions and group debates. Vocabulary is strong; focus slightly more on punctuation in essays.',
    category: 'Participation'
  }
];

export const MOCK_BEHAVIOUR: BehaviourRecord[] = [
  {
    id: 'beh-1',
    date: '26 Oct 2026',
    points: 15,
    title: 'Assisted peer during lab activity',
    category: 'Helping Peer',
    awardedBy: 'Dr. Sunita Rao'
  },
  {
    id: 'beh-2',
    date: '20 Oct 2026',
    points: 20,
    title: 'Completed 14-day study streak',
    category: 'Consistent Practice',
    awardedBy: 'StudGrow AI'
  },
  {
    id: 'beh-3',
    date: '12 Oct 2026',
    points: 10,
    title: 'Led Science Quiz Team to victory',
    category: 'Leadership',
    awardedBy: 'Mrs. Lakshmi Devi'
  }
];

export const MOCK_DISCIPLINE: DisciplineRecord[] = [
  {
    id: 'disc-1',
    date: '04 Sep 2026',
    issue: 'Forgot Science Lab manual for practicals',
    status: 'Resolved',
    actionTaken: 'Brought duplicate copy next day, completed assignment on time.',
    teacherName: 'Dr. Sunita Rao'
  }
];

export const MOCK_REPORT_CARD: ReportCard = {
  term: 'Mid-Term',
  academicYear: '2026-2027',
  marks: [
    { subject: 'Mathematics', maxMarks: 100, scoredMarks: 86, grade: 'A', remarks: 'Strong analytical skills' },
    { subject: 'Science', maxMarks: 100, scoredMarks: 91, grade: 'A+', remarks: 'Excellent conceptual grasp' },
    { subject: 'English', maxMarks: 100, scoredMarks: 88, grade: 'A', remarks: 'Creative & articulate' },
    { subject: 'Social Science', maxMarks: 100, scoredMarks: 82, grade: 'A', remarks: 'Good historical understanding' },
    { subject: 'Telugu', maxMarks: 100, scoredMarks: 84, grade: 'A', remarks: 'Good reading fluency' },
    { subject: 'Computer Science', maxMarks: 100, scoredMarks: 96, grade: 'A+', remarks: 'Exceptional logic & code' }
  ],
  totalMarks: 600,
  percentage: 87.8,
  overallGrade: 'A',
  teacherRemarks: 'Aarav is a disciplined, inquisitive student with strong academic consistency. With continued practice in fraction word problems, he will achieve top honors.',
  attendanceDays: 86,
  totalWorkingDays: 91
};

export const MOCK_LIBRARY: LibraryResource[] = [
  {
    id: 'lib-1',
    title: 'NCERT Class 8 Mathematics Complete Interactive Guide',
    type: 'ebook',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    classGrade: 8,
    fileSize: '14.2 MB',
    downloadsCount: 1420,
    isOfflineCached: true
  },
  {
    id: 'lib-2',
    title: 'Cell Organelles 3D Animated Video Lecture',
    type: 'video',
    subjectId: 'science',
    subjectName: 'Science',
    classGrade: 8,
    duration: '14 mins',
    downloadsCount: 890,
    isOfflineCached: true
  },
  {
    id: 'lib-3',
    title: 'Linear Equations Quick Formula Sheet & Mind Map',
    type: 'notes',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    classGrade: 8,
    fileSize: '2.4 MB',
    downloadsCount: 2310,
    isOfflineCached: false
  },
  {
    id: 'lib-4',
    title: '2025 Mid-Term Mathematics Solved Question Paper',
    type: 'paper',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    classGrade: 8,
    fileSize: '4.1 MB',
    downloadsCount: 3100,
    isOfflineCached: true
  }
];
