



const ChatHeader = ({ isConnected, themeClasses, showHidden }) => (
  <div className={`${themeClasses.header} text-white p-4 flex justify-between items-center`}>
    <div className="flex items-center space-x-3">
  {/* Logo image */}
  <img src="/images/rudolf.ico" alt="rudolf" className="w-8 h-8 rounded-full" />

      <div>
        <h1 className="text-xl font-bold">Rudolf Assistant</h1>
        <p className="text-sm opacity-80">Your Personal Portfolio AI</p>
      </div>
    </div>
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
      isConnected
        ? showHidden ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
        : showHidden ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
    }`}>
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
      {isConnected ? 'Local LLM' : 'Disconnected'}
    </div>
  </div>
);

export default ChatHeader;
