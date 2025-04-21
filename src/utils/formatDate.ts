interface DateFormatOptions {
  year: "numeric";
  month: "long";
  day: "numeric";
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString.replace(" ", "T")); 
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as DateFormatOptions);
};

export default formatDate;
