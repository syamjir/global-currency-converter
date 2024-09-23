function CustomDateInput() {
  const today = new Date();
  const dateForInput = today.toISOString().split("T")[0];

  return (
    <input
      type="date"
      readOnly
      value={dateForInput}
      className="h-12 w-full rounded border-2 border-primary p-4"
    />
  );
}

export default CustomDateInput;
