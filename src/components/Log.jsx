export default function Log({ stepsLog }) {
  const lastThreeLogs = stepsLog.slice(0, 3); //new array contains last 3 logs
  return (
    <ol id="log">
      {lastThreeLogs.map((step) => (
        <li key={step.coor}>
          {step.pl} selected {step.coor}
        </li>
      ))}
    </ol>
  );
}
