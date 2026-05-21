export default function SubmissionCard({
  submission,
}) {
  return (
    <div className="border p-4 rounded">

      <p>
        <strong>User:</strong>
        {submission.username}
      </p>

      <p>
        <strong>Prompt:</strong>
        {submission.prompt}
      </p>

      <p>
        <strong>Status:</strong>
        {submission.status}
      </p>

      {submission.output && (
        <p>
          <strong>Output:</strong>
          {submission.output}
        </p>
      )}

    </div>
  );
}