import React from 'react';

const LessonsPage: React.FC = () => {
  const lessons = [
    { id: 1, title: "Basic Greetings", level: "A1", type: "vocabulary", progress: 100 },
    { id: 2, title: "Numbers 1-20", level: "A1", type: "vocabulary", progress: 80 },
    { id: 3, title: "Present Simple", level: "A2", type: "grammar", progress: 60 },
    { id: 4, title: "Family Members", level: "A1", type: "vocabulary", progress: 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Lessons</h1>
        <p className="text-gray-600">Master English step by step</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                lesson.level === 'A1' ? 'bg-green-100 text-green-800' :
                lesson.level === 'A2' ? 'bg-blue-100 text-blue-800' : 
                'bg-purple-100 text-purple-800'
              }`}>
                {lesson.level}
              </span>
              <span className="text-sm text-gray-500 capitalize">{lesson.type}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">{lesson.title}</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{lesson.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${lesson.progress}%` }}
                ></div>
              </div>
            </div>
            
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              {lesson.progress === 0 ? 'Start Lesson' : lesson.progress === 100 ? 'Review' : 'Continue'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
