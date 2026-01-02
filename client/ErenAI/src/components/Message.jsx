const Message = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
