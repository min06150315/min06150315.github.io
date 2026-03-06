export const PageHeader = ({
  title,
  contents,
}: {
  title: string;
  contents: readonly string[];
}) => {
  return (
    <div className="pb-8">
      <h1 className="pb-4 text-4xl md:text-5xl font-extrabold tracking-tight">
        {title}
      </h1>
      <div className="flex flex-col space-y-2">
        {contents.map((content, index) => (
          <p key={index} className="text-base-gray leading-relaxed break-keep">
            {content}
          </p>
        ))}
      </div>
    </div>
  );
};
