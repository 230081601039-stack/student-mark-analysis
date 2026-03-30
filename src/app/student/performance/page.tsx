
"use client"

import { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, BookOpen, Target, BrainCircuit } from 'lucide-react';
import { getPerformanceSummary, PerformanceSummaryOutput } from '@/ai/flows/ai-performance-summary';
import { aiStudyAidQuestions, AiStudyAidQuestionsOutput } from '@/ai/flows/ai-study-aid-questions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function StudentPerformance() {
  const student = MOCK_STUDENTS[0];
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<PerformanceSummaryOutput | null>(null);
  const [practice, setPractice] = useState<AiStudyAidQuestionsOutput | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const summaryResult = await getPerformanceSummary({
        rollNumber: student.rollNumber,
        name: student.name,
        subjectMarks: student.marks
      });
      setSummary(summaryResult);

      const practiceResult = await aiStudyAidQuestions({
        areasForImprovement: summaryResult.recommendations,
        numQuestions: 3,
        questionType: 'multiple_choice'
      });
      setPractice(practiceResult);
    } catch (error) {
      console.error("Failed to fetch insights", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell userRole="student" userName={student.name}>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                AI Performance Insights
              </CardTitle>
              <CardDescription>
                Get personalized analysis and study aid based on your current marks.
              </CardDescription>
            </div>
            <Button onClick={generateInsights} disabled={loading} size="lg">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-5 w-5" />}
              {summary ? 'Regenerate Analysis' : 'Analyze My Performance'}
            </Button>
          </CardHeader>
        </Card>

        {summary && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{summary.summary}"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <BookOpen className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-accent/10 p-4 text-sm leading-relaxed whitespace-pre-line">
                  {summary.recommendations}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {practice && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Recommended Practice Questions
              </CardTitle>
              <CardDescription>
                AI-generated questions focusing on your identified areas for improvement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {practice.questions.map((q, idx) => (
                  <AccordionItem value={`item-${idx}`} key={idx}>
                    <AccordionTrigger className="text-left font-semibold">
                      Question {idx + 1}: {q.question.substring(0, 80)}...
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-base font-medium mb-2">{q.question}</p>
                      {q.options && (
                        <div className="grid grid-cols-1 gap-2">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="rounded-md border p-3 bg-muted/50 text-sm">
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="rounded-lg border-2 border-green-500/20 bg-green-500/5 p-4 mt-4">
                        <p className="font-bold text-green-700 mb-1">Correct Answer: {q.correctAnswer}</p>
                        <p className="text-sm text-muted-foreground">{q.explanation}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
