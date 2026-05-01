/**
 * Prompt templates for the lesson generator.
 *
 * Keeping prompts in a dedicated module (rather than inline string literals
 * in the handler) makes them reviewable as data, easier to version, and
 * trivially swappable.
 */

export function buildLessonPlanPrompt({ topic, grade, subject, duration, learningObjectives }) {
  const gradeText = grade ? `for ${grade} grade` : '';
  const subjectText = subject ? `in ${subject}` : '';
  const durationText = duration ? `(${duration} minutes)` : '';
  const objectivesText = learningObjectives ? `\n\nLearning Objectives:\n${learningObjectives}` : '';

  return `Create a comprehensive lesson plan ${gradeText} ${subjectText} ${durationText} on the topic: "${topic}"${objectivesText}

Please structure the lesson plan with the following sections:
1. Lesson Title
2. Grade Level
3. Subject
4. Duration
5. Learning Objectives (3-5 specific, measurable objectives)
6. Materials Needed
7. Lesson Introduction (hook/engagement activity)
8. Main Content (detailed step-by-step activities)
9. Guided Practice
10. Independent Practice
11. Assessment/Evaluation
12. Closure/Summary
13. Extension Activities (optional)
14. Differentiation Strategies (for diverse learners)
15. Homework/Follow-up (if applicable)

Make the lesson plan practical, engaging, and aligned with educational best practices. Use clear, actionable language.`;
}
