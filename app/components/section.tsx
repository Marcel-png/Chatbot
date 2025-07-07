interface Message {
    sender: "user" | "bot";
    text: string;
  }
  
interface MainSectionProps {
    messages: Message[];
    loading: boolean;
  }
  
  export default function MainSection({ messages, loading }: MainSectionProps) {
    return (
      <main className="flex-grow overflow-auto mt-16 mb-20 px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col text-justify  space-y-1">
              {msg.sender === "user" && <p className="text-lg font-bold text-black text-justify">Moi</p>}
              {msg.sender === "bot" && <p className="text-lg font-bold text-blue-400 items-star ">ChatBot</p>}
              <p className={`text-lg p-2 rounded-lg text-black ${msg.sender === "user" ? "bg-blue-200 text-end w-auto" : "bg-gray-200 text-left"}`}>
                {msg.text}
              </p>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-500"></span>
            </div>
          )}
        </div>
      </main>
    );
  }
  