function StatusMessage({ isMaxReached, isMinReached, count }) {
  if (isMaxReached) {
    return (
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <p className="text-sm text-yellow-800 font-medium">
          Maximum value reached!
        </p>
      </div>
    );
  }

  if (isMinReached && count === 0) {
    return (
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p className="text-sm text-blue-800 font-medium">
          Counter is at minimum value
        </p>
      </div>
    );
  }

  return null;
}

export default StatusMessage;

