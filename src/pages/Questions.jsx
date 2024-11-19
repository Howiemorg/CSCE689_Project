import React from 'react'

const Questions = () => {
  return (
    <div>Questions</div>
  )
}

export default Questions

const loadQuestions = async (topic) => {
    const response = await fetch("/database.json");
  
    if (!response.ok || response.status !== 200) {
        throw new Response(JSON.stringify("Could not fetch topics."), {
          headers: {
            "Content-Type": "application/json; utf-8",
          },
          status: 500,
        });
      }
  
    const json = await response.json();

    if(!topic){
        return json.questions
    }

    const questions = json.questions.filter((question) => question.topic === topic)
    return questions;
  };
  
  export const loader = async ({ request, params }) => {
    return await loadQuestions(params.topicId);
  };