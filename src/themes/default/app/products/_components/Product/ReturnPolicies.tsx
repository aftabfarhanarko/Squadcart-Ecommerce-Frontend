interface ReturnPoliciesProps {
  content?: string;
}

const ReturnPolicies = ({ content }: ReturnPoliciesProps) => {
  if (!content) {
    return (
      <div className="text-gray-600 text-sm">
        Return policy information is not available right now.
      </div>
    );
  }

  return (
    <div className="prose max-w-none prose-sm sm:prose-base">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ReturnPolicies;
