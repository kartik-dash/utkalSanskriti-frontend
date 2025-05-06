import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-lg text-gray-500">Software Engineer</p>
            <p className="text-sm text-gray-400 mt-1">johndoe@example.com</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="mt-8 flex flex-wrap justify-around gap-8 text-center">
          <div>
            <h3 className="text-xl font-medium text-gray-700">Posts</h3>
            <p className="text-2xl font-semibold text-blue-600">120</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-700">Followers</h3>
            <p className="text-2xl font-semibold text-blue-600">1,234</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-700">Following</h3>
            <p className="text-2xl font-semibold text-blue-600">543</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">About Me</h3>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet venenatis erat. Ut
            vehicula libero at turpis aliquet, ac tincidunt dui malesuada. Morbi non ante in lectus
            feugiat scelerisque.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Contact</h3>
          <ul className="mt-4 space-y-4 text-gray-600">
            <li className="flex items-center">
              <span className="material-icons mr-4 text-blue-600">phone</span>
              <span>+1 (123) 456-7890</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons mr-4 text-blue-600">email</span>
              <span>johndoe@example.com</span>
            </li>
            <li className="flex items-center">
              <span className="material-icons mr-4 text-blue-600">location_on</span>
              <span>San Francisco, CA</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <span className="material-icons">twitter</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600"
          >
            <span className="material-icons">github</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            <span className="material-icons">linkedin</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
