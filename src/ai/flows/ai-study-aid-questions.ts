'use server';
/**
 * @fileOverview A Genkit flow for generating practice questions and explanations.
 *
 * - aiStudyAidQuestions - A function that generates practice questions and explanations based on student performance data.
 * - AiStudyAidQuestionsInput - The input type for the aiStudyAidQuestions function.
 * - AiStudyAidQuestionsOutput - The return type for the aiStudyAidQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiStudyAidQuestionsInputSchema = z.object({
  areasForImprovement: z
    .string()
    .describe(
      "A description of the student's areas for improvement, specific topics, or subjects where the AI has identified weaknesses."
    ),
  subject: z
    .string()
    .optional()
    .describe('The specific subject area for which to generate questions.'),
  numQuestions: z
    .number()
    .int()
    .min(1)
    .max(10)
    .default(3)
    .describe('The number of practice questions to generate (1-10).'),
  questionType: z
    .enum(['multiple_choice', 'short_answer'])
    .default('multiple_choice')
    .describe('The type of questions to generate (multiple_choice or short_answer).'),
});
export type AiStudyAidQuestionsInput = z.infer<typeof AiStudyAidQuestionsInputSchema>;

const AiStudyAidQuestionsOutputSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe('The practice question.'),
        options: z
          .array(z.string())
          .optional()
          .describe('Options for multiple-choice questions. Only present for multiple_choice questions.'),
        correctAnswer: z.string().describe('The correct answer to the question.'),
        explanation: z.string().describe('A detailed explanation for the correct answer.'),
      })
    )
    .describe('An array of practice questions and their explanations.'),
});
export type AiStudyAidQuestionsOutput = z.infer<typeof AiStudyAidQuestionsOutputSchema>;

export async function aiStudyAidQuestions(
  input: AiStudyAidQuestionsInput
): Promise<AiStudyAidQuestionsOutput> {
  return aiStudyAidQuestionsFlow(input);
}

const aiStudyAidQuestionsPrompt = ai.definePrompt({
  name: 'aiStudyAidQuestionsPrompt',
  input: { schema: AiStudyAidQuestionsInputSchema },
  output: { schema: AiStudyAidQuestionsOutputSchema },
  prompt: `You are an intelligent tutor designed to help students improve their understanding.
Based on the student's performance insights and specific areas for improvement, generate {{{numQuestions}}} practice questions.

Areas for improvement/topics: {{{areasForImprovement}}}
{{#if subject}}Subject: {{{subject}}}{{/if}}
Question Type: {{{questionType}}}

For each question:
1. Provide the question.
2. If the question type is 'multiple_choice', provide 4 distinct options (A, B, C, D) for the question.
3. Provide the correct answer.
4. Provide a detailed explanation for the correct answer, suitable for a student.

Ensure the output is valid JSON matching the provided schema.`,
});

const aiStudyAidQuestionsFlow = ai.defineFlow(
  {
    name: 'aiStudyAidQuestionsFlow',
    inputSchema: AiStudyAidQuestionsInputSchema,
    outputSchema: AiStudyAidQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await aiStudyAidQuestionsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate study aid questions.');
    }
    return output;
  }
);
