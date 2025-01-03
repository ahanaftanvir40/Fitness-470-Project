

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from 'lucide-react'

const predefinedQuestions = [
    "How many calories should I eat to lose weight?",
    "What's the best exercise for building muscle?",
    "How often should I work out?",
    "What's a good post-workout meal?",
    "How can I improve my flexibility?"
]

const fitnessResponses = {
    "how many calories should i eat to lose weight?": "The number of calories you should eat to lose weight depends on factors like your age, gender, height, weight, and activity level. Generally, creating a deficit of 500 calories per day can lead to about 1 pound of weight loss per week. Consult with a nutritionist for personalized advice.",
    "what's the best exercise for building muscle?": "Compound exercises like squats, deadlifts, bench presses, and rows are excellent for building muscle. These exercises work multiple muscle groups simultaneously and stimulate overall muscle growth. Remember to progressively increase the weight and maintain proper form.",
    "how often should i work out?": "For general fitness, aim for at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic activity per week, along with strength training for all major muscle groups at least twice a week. However, the ideal frequency depends on your specific goals and current fitness level.",
    "what's a good post-workout meal?": "A good post-workout meal should include both protein and carbohydrates. Protein helps repair and build muscle, while carbs replenish energy stores. Examples include a chicken breast with brown rice and vegetables, a protein shake with a banana, or Greek yogurt with berries and granola.",
    "how can i improve my flexibility?": "To improve flexibility, incorporate regular stretching into your routine. Try dynamic stretches before workouts and static stretches after. Yoga and Pilates are also excellent for improving flexibility. Aim to stretch major muscle groups for 10-30 seconds each, at least 2-3 times a week. Remember to warm up before stretching to prevent injury."
}

function ChatBot() {
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = (message) => {
        if (message.trim() === '') return;

        console.log('User message:', message);


        setMessages((prev) => [...prev, { text: message, isUser: true }]);

        const lowerCaseMessage = message.trim().toLowerCase();
        console.log('Processed message:', lowerCaseMessage);

        const response =
            fitnessResponses[lowerCaseMessage] ||
            "I'm sorry, I can only answer fitness-related questions. Could you please ask something about exercise, nutrition, or general fitness?";

        setTimeout(() => {
            console.log('Bot response:', response);
            setMessages((prev) => [...prev, { text: response, isUser: false }]);
        }, 500);

        setInputValue('');
    };

    const handleQuestionClick = (question) => {
        handleSendMessage(question)
    }

    return (
        <Card className="fixed bottom-24 right-10 w-96 h-[70vh] shadow-xl z-50 bg-gray-50 border-2 border-slate-200">
            <CardHeader>
                <CardTitle>AI Fitness Trainer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg p-3 ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="mb-4">
                    <p className="mb-2 font-semibold">Suggested Questions:</p>
                    <div className="flex flex-wrap gap-2">
                        {predefinedQuestions.map((question, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuestionClick(question)}
                            >
                                {question}
                            </Button>
                        ))}
                    </div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                    }}
                    className="flex space-x-2"
                >
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your fitness question..."
                        className="flex-grow bg-white outline-none"
                    />
                    <Button type="submit" className='bg-blue-400 hover:bg-blue-300'>
                        <Send className="h-4 w-4 text-black/60" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ChatBot

