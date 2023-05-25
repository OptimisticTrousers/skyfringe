const ChatLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <img
        style={{
          maxInlineSize: "100%",
        }}
        src={"/images/loader.gif"}
        alt="loader"
      />
    </div>
  );
};

export default ChatLoading;
