import React from 'react';

const CommunityPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      username: "EnglishLearner01",
      title: "Just completed my first 50 lessons! 🎉",
      content: "So excited to share that I've just completed 50 lessons in English Adventure!",
      likes: 23,
      comments: 5,
      type: "achievement"
    },
    {
      id: 2,
      username: "StudyBuddy",
      title: "Help with Present Perfect Tense?",
      content: "Hi everyone! I'm struggling with understanding when to use Present Perfect vs Simple Past.",
      likes: 8,
      comments: 12,
      type: "question"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Community</h1>
        <p className="text-gray-600">Connect with fellow learners</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Posts */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">
                    {post.username.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{post.username}</div>
                  <div className="text-sm text-gray-500">{post.type}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <button className="hover:text-indigo-600">👍 {post.likes} likes</button>
                <button className="hover:text-indigo-600">💬 {post.comments} comments</button>
                <button className="hover:text-indigo-600">🔗 Share</button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Study Groups</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">A1 Beginners</div>
                <div className="text-sm text-gray-500">45 members</div>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Business English</div>
                <div className="text-sm text-gray-500">28 members</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div className="text-sm">
                  <div className="font-medium">Level Master</div>
                  <div className="text-gray-500">Reached level 25</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
