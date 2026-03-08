const Typography = ({ content }: { content: string }) => {
  return (
    <h1 className="pb-4 text-4xl md:text-5xl font-extrabold tracking-tight">
      {content}
    </h1>
  );
};

export default Typography;
