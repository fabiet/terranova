import React from 'react';
import { testRLS, testInsert } from '../utils/test-rls';

const TestRLS: React.FC = () => {
  const handleTestRLS = async () => {
    await testRLS();
  };

  const handleTestInsert = async () => {
    await testInsert();
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4">RLS Test Panel</h3>
      <div className="space-y-2">
        <button
          onClick={handleTestRLS}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
        >
          Test RLS (SELECT should fail)
        </button>
        <button
          onClick={handleTestInsert}
          className="w-full bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded"
        >
          Test INSERT (should work)
        </button>
      </div>
      <p className="text-gray-300 text-sm mt-4">
        Check browser console for results. RLS test should show "denied" and INSERT should succeed.
      </p>
    </div>
  );
};

export default TestRLS; 