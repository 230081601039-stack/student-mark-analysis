'use server';
/**
 * @fileOverview This file provides an AI-powered tool to analyze student marks,
 * generate a concise performance summary, and offer personalized recommendations for improvement.
 *
 * - getPerformanceSummary - A function to retrieve the AI-generated performance summary and recommendations.
 * - PerformanceSummaryInput - The input type for the getPerformanceSummary function.
 * - PerformanceSummaryOutput - The return type for the getPerformanceSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PerformanceSummaryInputSchema = z.object({
  rollNumber: z.string().describe('The roll number of the student.'),
  name: z.string().describe('The name of the student.'),
  subjectMarks: z.array(
    z.object({
      subject: z.string().describe('The name of the subject.'),
      marks: z.number().min(0).max(100).describe('The marks obtained in the subject (0-100).'),
    })
  ).describe('An array of subject marks for the student.'),
});
export type PerformanceSummaryInput = z.infer<typeof PerformanceSummaryInputSchema>;

const PerformanceSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the student\'s academic performance.'),
  recommendations: z.string().describe('Personalized recommendations for areas of improvement.'),
});
export type PerformanceSummaryOutput = z.infer<typeof PerformanceSummaryOutputSchema>;

const performanceSummaryPrompt = ai.definePrompt({
  name: 'performanceSummaryPrompt',
  input: { schema: PerformanceSummaryInputSchema },
  output: { schema: PerformanceSummaryOutputSchema },
  prompt: `You are an expert academic advisor. Your task is to analyze a student's academic performance based on their subject marks.

Student Name: {{{name}}}
Roll Number: {{{rollNumber}}}

Subject Marks:
{{#each subjectMarks}}
- {{subject}}: {{marks}}
{{/each}}

Based on the provided marks, generate a concise summary of the student's performance, highlighting strengths and weaknesses. Then, provide personalized recommendations for improvement areas. Be encouraging and constructive.
`,
});

const performanceSummaryFlow = ai.defineFlow(
  {
    name: 'performanceSummaryFlow',
    inputSchema: PerformanceSummaryInputSchema,
    outputSchema: PerformanceSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await performanceSummaryPrompt(input);
    return output!;
  }
);

export async function getPerformanceSummary(input: PerformanceSummaryInput): Promise<PerformanceSummaryOutput> {
  return performanceSummaryFlow(input);
}
