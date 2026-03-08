import Typography from './Typography';

export const PageHeader = ({
  title,
  contents,
}: {
  title: string;
  contents: readonly string[];
}) => {
  return (
    <div className="pb-8">
      <Typography content={title} />
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
