export const getPromptByStudyType = function({studyType, topics}) {
    if (!studyType) {
        throw new Error('Invalid arguments: studyType and topics are required.');
    }

    switch (studyType) {
        case 'Flashcard':
            return `Generate flashcards on topics: ${topics} In json format with this structure: {front :"", back: ""}. Maximum 15. The front can be a question, keyword or concept and the back is the answer.`;
        case 'Quiz':
            return `Generate Quiz on topics: ${topics} In json format with this structure: {quizTitle: "", questions: [
            {
            question: "",
            options: ["option1","option2"],
            answer: [0,1]
            multiSelect: true
            } Maxmimum 10 questions.`;
        default:
            return `Provide study material for: ${topics.join(', ')}.`;
    }
}
