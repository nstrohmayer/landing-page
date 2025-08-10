import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-black py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Your Ideas, Made Real. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;