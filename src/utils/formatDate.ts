interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  year: "numeric";
  month: "long";
  day: "numeric";
  timeZone?: "America/Bogota";
}

const formatDate = (dateString: string): string => {
  // Handle both ISO format (2025-04-21T20:30:30.118Z) and Storyblok format (2025-04-21 20:30:30)
  const normalizedDateString = dateString.includes(" ")
    ? dateString.replace(" ", "T")
    : dateString;

  const options: DateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Bogota",
  };

  try {
    const date = new Date(normalizedDateString);

    // Fallback for invalid dates
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateString}`);
      return "Fecha inválida";
    }

    return date.toLocaleDateString("es-CO", options);
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return "Fecha inválida";
  }
};

export default formatDate;
