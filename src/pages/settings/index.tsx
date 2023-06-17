import React from 'react';
import Header from '@/modules/Header';

function Index() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow justify-center items-center flex-col">
        <div className="text-center">
          <h1 className="text-black">Page under construction</h1>
        </div>
        <div className="text-center mt-3">
          <h1 className="text-gray-600">Coming soon ...</h1>
        </div>
      </div>
    </main>
  );
}

export default Index;
