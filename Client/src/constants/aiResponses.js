// Pool of mock AI responses keyed loosely by topic keywords
export const AI_RESPONSES = [
  "That's a great question! Let me think through this carefully. Based on my training data, I can provide a comprehensive overview of the topic you've raised.",
  "Absolutely! Here's what I know about that: The concept you're describing has several interesting dimensions worth exploring. First, let's consider the foundational principles...",
  "I appreciate your curiosity! This is a fascinating area. To give you the most accurate response, I'll break this down into key points:\n\n1. **Core concept** — The fundamental idea here is...\n2. **Practical implications** — In real-world scenarios, this means...\n3. **Further reading** — I'd recommend exploring related topics such as...",
  "Great point! Here's a concise breakdown:\n\n• The primary factor is context-awareness\n• Secondary considerations include performance and scalability\n• Always validate your assumptions with empirical data",
  "That's an interesting perspective! Let me offer a balanced view. On one hand, there are clear advantages — efficiency, clarity, and maintainability. On the other hand, trade-offs exist that depend heavily on your specific use case.",
  "I'm happy to help with that! The answer depends on a few variables, but generally speaking: modern best practices suggest a pragmatic, iterative approach rather than a rigid framework.",
  "Certainly! Here's a simple example to illustrate:\n\n```javascript\nconst result = data\n  .filter(item => item.active)\n  .map(item => ({ ...item, processed: true }));\nconsole.log(result);\n```\n\nThis pattern keeps your logic clean and composable.",
  "Excellent question! The short answer is: it depends. For smaller projects, simplicity wins. For larger, distributed systems, robustness and fault-tolerance should take priority.",
];

/**
 * Returns a random AI response string
 */
export const getRandomAIResponse = () => {
  return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
};
